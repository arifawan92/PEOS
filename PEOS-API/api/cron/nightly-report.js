export default async function handler(req, res) {
  // Ye report hai
  const report = {
    date: new Date().toLocaleString("en-PK", {timeZone: "Asia/Karachi"}),
    tasks_completed: 3,
    tasks_pending: 5,
    server_status: "PEOS is awake",
    message: "Sir, raat ko sab theek raha. Subah 5 tasks karne hain."
  };

  console.log("NIGHTLY REPORT:", report);

  return res.status(200).json({ status: "Report Generated", data: report });
}