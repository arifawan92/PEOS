let failCount = 0;
const MAX_FAILS = 3;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: "error", message: "Only POST allowed" });
  }

  try {
    // 1. Self Health Check
    const memUsage = process.memoryUsage().heapUsed / 1024 / 1024; // MB mein
    console.log(`Current Memory: ${memUsage.toFixed(2)} MB`);

    // 2. Criteria: Agar memory 500MB se zyada hai to problem hai
    if (memUsage > 500) {
      failCount++;
      console.log(`HEAL TRIGGERED. Fail Count: ${failCount}`);
    } else {
      failCount = 0; // theek hai to reset
    }

    // 3. Give Up Criteria
    if (failCount >= MAX_FAILS) {
      return res.status(503).json({ 
        status: "critical", 
        message: "Giving up. 3 auto-heals failed. Manual intervention needed." 
      });
    }

    // 4. Heal Action: Yahan tum cache clear, db reconnect etc kar sakte ho
    global.gc && global.gc(); // Garbage collection force

    return res.status(200).json({ 
      status: "success", 
      message: "PEOS Auto-Heal Completed",
      memoryMB: memUsage.toFixed(2),
      failCount: failCount
    });

  } catch (error) {
    failCount++;
    return res.status(500).json({ status: "error", message: error.message });
  }
}