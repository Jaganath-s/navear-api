export default async function handler(req, res) {

const { q, lat, lon } = req.query

const url =
`https://serpapi.com/search.json?engine=google_maps&type=search&q=${encodeURIComponent(q)}&ll=@${lat},${lon},14z&api_key=YOUR_SERPAPI_KEY`

try {

const r = await fetch(url)
const data = await r.json()

if (!data.local_results || data.local_results.length === 0) {
return res.status(404).json({ error: "no place found" })
}

const place = data.local_results[0]

res.json({
name: place.title,
lat: place.gps_coordinates.latitude,
lon: place.gps_coordinates.longitude
})

} catch (e) {
res.status(500).json({ error: "API request failed" })
}

}
