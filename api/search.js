export default async function handler(req, res) {

  const { q, lat, lon } = req.query;

  if (!q || !lat || !lon) {
    return res.status(400).json({ error: "missing parameters" });
  }

  try {

    const query =
      `https://www.google.com/maps/search/${encodeURIComponent(q)}+near+${lat},${lon}`;

    const response = await fetch(query, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    const match = html.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

    if (!match) {
      return res.status(404).json({ error: "location not found" });
    }

    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);

    res.json({
      name: q,
      lat: latitude,
      lon: longitude
    });

  } catch (err) {

    res.status(500).json({ error: "search failed" });

  }

}
