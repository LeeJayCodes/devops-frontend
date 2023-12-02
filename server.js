const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'static')));

// Define other routes or API endpoints as needed
// ...

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});