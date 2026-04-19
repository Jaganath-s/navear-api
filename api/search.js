export default async function handler(req, res) {

const query = req.query.q
const lat = req.query.lat
const lon = req.query.lon

const CLIENT_ID = "96dHZVzsAutmZhjoahEwrn5buFh4UYyBousoCGUQylaYN3vImZ4_-HAPb9eZ4_iKrot-c7eoBQl9cXN2yaJ0sA=="
const CLIENT_SECRET = "lrFxI-iSEg_bdmFqn7LhmTyqHeQ3dspgw5_TNAZqv1OUhIRqyxeGdLPMv6V5NNLkweThtK2aSCeO2ZJ6rkGheSbVd0fKhruv"

try {

// STEP 1 — Get OAuth token
const tokenRes = await fetch(
"https://outpost.mappls.com/api/security/oauth/token",
{
method: "POST",
headers: {
"Content-Type": "application/x-www-form-urlencoded"
},
body:
`grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}
)

const tokenData = await tokenRes.json()
const token = tokenData.access_token

// STEP 2 — Search nearby place
const searchURL =
`https://atlas.mappls.com/api/places/nearby/json?keywords=${query}&refLocation=${lat},${lon}&radius=2000`

const searchRes = await fetch(searchURL,{
headers:{
Authorization: `Bearer ${token}`
}
})

const data = await searchRes.json()

if(!data.suggestedLocations || data.suggestedLocations.length === 0){
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
catch(e){

res.json({error:"Search failed"})

}

}
