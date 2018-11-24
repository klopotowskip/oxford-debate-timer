const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

const isLocal = (app.get('env') === 'development') ? true : false;
const port = isLocal ? 3000 : process.env.PORT;


//Determines, that protocol name in res.redirect() is trustworthy
app.enable('trust proxy');

const handleNotFound = (req, res, next) => {
  res.redirect('localhost:3000');
}

//Redirect all http calls to https unless in local development mode
app.use((req, res, next) => {
  if(isLocal || req.secure) next();
  else res.redirect(`https://${req.headers.host}`);
});


//Try to serve static content
app.use(express.static(publicPath));

//Handle not found pages and redirect them to root
app.use(handleNotFound);

app.listen(port, () => {
  console.log("Starting production server on port", port);
});
