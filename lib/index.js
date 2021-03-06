const express = require('express');
const cors = require('cors');
const render = require('./render');
const cache = require('memory-cache');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  res.type('.png');

  const c = cache.get(req.query.url);

  if (c !== null) {
    res.send(c);
  } else {
    const screenshot = await render(req.query.url || 'https://notfound.tobihrbr.gq', req.query);

    res.send(screenshot);
    cache.put(req.query.url, screenshot, 50000);
  }
});

app.listen(3000);
