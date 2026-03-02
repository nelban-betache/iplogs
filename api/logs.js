// api/logs.js
export default async function handler(req, res) {
 if (req.method === 'GET') {
 // Retrieve logs from a file or database
 let logs = [];
 try {
 const response = await fetch('https://your-vercel-project.vercel.app/api/logs');
 const data = await response.json();
 logs = data.logs;
 } catch (error) {
 console.error('Error fetching logs:', error);
 }

 res.status(200).json({ logs });
 } else if (req.method === 'POST') {
 const { logs } = req.body;
 // Save logs back to a file or database
 try {
 // For simplicity, we're using a JSON file here. In a real application, you might use a database.
 const fs = require('fs');
 const path = require('path');
 const filePath = path.join(process.cwd(), 'logs.json');
 fs.writeFileSync(filePath, JSON.stringify({ logs }, null, 2));
 res.status(200).json({ message: 'Logs saved successfully' });
 } catch (error) {
 console.error('Error saving logs:', error);
 res.status(500).json({ message: 'Failed to save logs' });
 }
 } else {
 res.setHeader('Allow', ['GET', 'POST']);
 res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
