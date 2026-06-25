export default function handler(req, res) {
  const country = req.headers['x-vercel-ip-country'] || 'IN'

  res.status(200).json({ country })
}
