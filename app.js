const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/user/:name', (req, res) => {
  res.render('user', { title: 'User', name: req.params.name });
});

app.post('/submit', (req, res) => {
  console.log(req.body);
  res.send('Success');
});

app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'public', 'image.png');
  res.download(file, (err) => {
    if (err) {
      console.error('Error downloading the file:', err);
      res.status(500).send('Could not download the file.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
