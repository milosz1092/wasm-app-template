const express = require('express');
const app = express();

app.use(function (req, res, next) {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(express.static('dist'));

app.listen(3000);
