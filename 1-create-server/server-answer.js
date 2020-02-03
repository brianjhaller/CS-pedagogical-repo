// import in express and path
const express = require('express');
const app = express();
const path = require('path');

// serve up all static assets (js and css) using express.static
app.use(express.static(path.resolve(__dirname, 'src')));

// serve up index.html on a get request to '/'
app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'index.html'));
})

// make an error catch




// start the server
app.listen(3000, () => console.log("Server listening on port 3000"));