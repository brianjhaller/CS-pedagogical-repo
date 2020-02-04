// import in express and path
const express = require('express');
const app = express();
const path = require('path');

// serve up all static assets (js and css) using express.static
app.use(express.static(path.resolve(__dirname, 'src')));

// serve up index.html on a get request to '/'
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
})

// make a middleware error catch
app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
})

// make a page error catch
app.all('*', (req, res) => {
    res.status(404).send('<h1 style="color:red">404: Page not found!</h1>');
})

// start the server
app.listen(3000, () => console.log("Server listening on port 3000"));