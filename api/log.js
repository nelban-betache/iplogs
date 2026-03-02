// api/log.js
export default async function handler(req, res) {
 if (req.method === 'POST') {
 const { ip, lat, lon, time } = req.body;

 // Retrieve existing logs from a file or database
 let logs = [];
 try {
 const response = await fetch('https://your-vercel-project.vercel.app/api/logs');
 const data = await response.json();
 logs = data.logs;
 } catch (error) {
 console.error('Error fetching existing logs:', error);
 }

 // Add new log
 logs.push({ ip, lat, lon, time });

 // Save logs back to a file or database
 try {
 const response = await fetch('https://your-vercel-project.vercel.app/api/logs', {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify({ logs }),
 });
 if (response.ok) {
 res.status(200).json({ message: 'Log saved successfully' });
 } else {
 res.status(500).json({ message: 'Failed to save log' });
 }
 } catch (error) {
 console.error('Error saving log:', error);
 res.status(500).json({ message: 'Failed to save log' });
 }
 } else {
 res.setHeader('Allow', ['POST']);
 res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
