export default async function handler(req, res) {

  const { q, lat, lon } = req.query;

  if (!q || !lat || !lon) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {

    const OLA_KEY = "j85oYrhSLfT3wAJJFfkzpYRspIDapGLOu9gj4hdz";

    const url =
      "https://api.olamaps.io/places/v1/autocomplete?input=" +
      encodeURIComponent(q) +
      "&location=" +
      lat +
      "," +
      lon +
      "&radius=5000";

    const response = await fetch(url, {
      headers: {
        "x-api-key": OLA_KEY
      }
    });

    const data = await response.json();

    if (!data.predictions || data.predictions.length === 0) {
      return res.status(404).json({ error: "No place found" });
    }

    const place = data.predictions[0];

    res.json({
      name: place.description,
      lat: place.geometry.location.lat,
      lon: place.geometry.location.lng
    });

  } catch (error) {

    res.status(500).json({ error: "API request failed" });

  }

}
