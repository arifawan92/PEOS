export default function handler(req, res) {
  res.status(200).json({ 
    target: "HIT", 
    status: 200, 
    msg: "PEOS API IS LIVE - NO LOOP" 
  })
}