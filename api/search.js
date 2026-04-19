export default async function handler(req, res) {

  const { q, lat, lon } = req.query;

  if (!q || !lat || !lon) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const OLA_KEY = "j85oYrhSLfT3wAJJFfkzpYRspIDapGLOu9gj4hdz";

  try {

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

    function haversine(lat1, lon1, lat2, lon2) {

      const R = 6371000;

      const toRad = x => x * Math.PI / 180;

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    }

    let nearest = null;
    let minDistance = Infinity;

    for (const place of data.predictions) {

      const plat = place.geometry.location.lat;
      const plon = place.geometry.location.lng;

      const dist = haversine(
        parseFloat(lat),
        parseFloat(lon),
        plat,
        plon
      );

      if (dist < minDistance) {
        minDistance = dist;
        nearest = place;
      }
    }

    res.json({
      name: nearest.description,
      lat: nearest.geometry.location.lat,
      lon: nearest.geometry.location.lng,
      distance: minDistance
    });

  } catch (error) {

    res.status(500).json({ error: "API request failed" });

  }

}
