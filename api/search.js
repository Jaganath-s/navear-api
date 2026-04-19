export default async function handler(req, res) {

  const { q, lat, lon } = req.query;

  if (!q || !lat || !lon) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {

    const OLA_API_KEY = "PASTE_YOUR_OLA_KEY_HERE";

    const url =
      "https://api.olamaps.io/places/v1/search?q=" +
      encodeURIComponent(q) +
      "&location=" +
      lat + "," + lon;

    const response = await fetch(url, {
      headers: {
        "x-api-key": j85oYrhSLfT3wAJJFfkzpYRspIDapGLOu9gj4hdz
      }
    });

    const data = await response.json();

    if (!data.places || data.places.length === 0) {
      return res.status(404).json({ error: "No place found" });
    }

    const place = data.places[0];

    res.json({
      name: place.name,
      lat: place.lat,
      lon: place.lng
    });

  } catch (error) {

    res.status(500).json({ error: "API request failed" });

  }

}
