const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.get('/sum', (req, res) => {
  const sum = (a, b) => a + b

  const a = parseInt(req.query['a'])
  const b = parseInt(req.query['b'])

  res.json({'sum': sum(a, b)})
})

app.post('/reverseCase', (req, res) => {
  const reverseCase = ch => ch.toLowerCase() === ch ? ch.toUpperCase() : ch.toLowerCase()
  const reverseStringCase = str => str.split('').map(ch => reverseCase(ch)).join('')

  const reqStr = req.body['string']

  res.json({'reversedStringCase': reverseStringCase(reqStr)})
})

app.post('/reverseArray', (req, res) => {
  const reverseArr = arr => arr.reverse()

  const reqArr = req.body['array']

  res.json(reverseArr(reqArr))
})

http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})