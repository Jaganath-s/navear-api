export default async function handler(req, res) {

const query = req.query.q
const lat = req.query.lat
const lon = req.query.lon

const url =
`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`

const r = await fetch(url,{
headers:{
"User-Agent":"NavEar"
}
})

const data = await r.json()

if (!data || data.length === 0) {
res.json({error:"No place found"})
return
}

res.json({
name:data[0].display_name,
lat:data[0].lat,
lon:data[0].lon
})

}
