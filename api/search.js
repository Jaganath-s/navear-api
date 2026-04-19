export default async function handler(req, res) {

const query = req.query.q
const lat = req.query.lat
const lon = req.query.lon

const MAPPLS_KEY = "b7d84b6cfc33e01bbf1d544e6dedc77a"

const url =
`https://atlas.mappls.com/api/places/nearby/json?keywords=${query}&refLocation=${lat},${lon}&radius=2000&access_token=${MAPPLS_KEY}`

try {

const r = await fetch(url)
const data = await r.json()

if (!data.suggestedLocations || data.suggestedLocations.length === 0) {
res.json({error:"No place found"})
return
}

const place = data.suggestedLocations[0]

res.json({
name: place.placeName,
lat: place.latitude,
lon: place.longitude
})

}
catch(e)
{
res.json({error:"API failed"})
}

}
