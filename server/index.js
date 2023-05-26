const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const connectDataBase = require('./model/connectDataBase');
const Router = require('./Router/Routes.Router');
const NotesRouter = require('./Router/Notes.Router');
const authentication = require('./middleware/authentication.middleware');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/auth', Router);
app.use(authentication); // Apply authentication middleware
app.use('/api/note', NotesRouter);

app.all('*', (req, res, next) => {
  res.status(404).send('Not Found What Are you Looking For!');
});

connectDataBase().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening from http://localhost:${PORT}/`);
  });
});
