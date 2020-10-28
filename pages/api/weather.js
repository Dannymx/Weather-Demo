export default async (req, res) => {
  const params = new URLSearchParams({
    ...req.query,
    appid: process.env.WEATHER_API_KEY,
  })

  const query = `${process.env.WEATHER_API_URL}?${params}`

  console.log(query)

  const request = await fetch(query).then((r) => r.json())

  res.statusCode = 200
  res.json(request)
}
