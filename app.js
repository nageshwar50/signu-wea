const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const { signup, login, userInfo } = require('./controller');
//const { signupSchema, loginSchema } = require('./validator');


const app = express();
app.use(bodyParser.json());


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false})); 
// Routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

//app.post('/signup', signupSchema ,signup);
//app.post('/login', loginSchema  ,login);
//app.get('/userInfo/:email', userInfo);

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// const PORT = process.env.PORT || 3000;
app.listen(3001, () => {
  console.log(`Server is running on port ${3000}`);
});