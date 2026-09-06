export default function handler(req, res) {
  try {
    res.status(200).json({ 
      target: "HIT", 
      status: 200, 
      msg: "API WORKING" 
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}