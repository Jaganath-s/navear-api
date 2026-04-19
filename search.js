export default async function handler(req, res) {

const query = req.query.q
const lat = req.query.lat
const lon = req.query.lon

const GOOGLE_KEY = "YOUR_GOOGLE_API_KEY"

const url =
`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&keyword=${query}&rankby=distance&key=${GOOGLE_KEY}`

const r = await fetch(url)
const data = await r.json()

if (!data.results || data.results.length === 0) {
  res.json({ error: "No place found" })
  return
}

const place = data.results[0]

res.json({
name: place.name,
lat: place.geometry.location.lat,
lon: place.geometry.location.lng
})

}
