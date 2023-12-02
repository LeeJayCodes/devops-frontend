const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'test')));

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'static')));


// // Start the server
// app.listen(port, () => {
//     console.log(`Test server is running on port ${port}`);
// });

// Serve static files from the 'test' directory
app.use(express.static(path.join(__dirname, 'test')));

// Serve static files from the 'static' directory
app.use('/static', express.static(path.join(__dirname, 'static')));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test', 'index.html'));
});

app.listen(port, () => {
  console.log(`Test server is running at http://localhost:${port}`);
});