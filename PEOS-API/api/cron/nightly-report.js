export default async function handler(req, res) {
  return res.status(200).json({ 
    status: "PEOS Alive!", 
    time: new Date().toISOString(),
    message: "Cron is working" 
  })
}