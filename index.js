const express = require('express');
const logger = require('morgan');
const path = require('path')
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const floofRouter = require('./routes/floofs');

const app = express();
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// Method Override
app.use(
    methodOverride((req, res) => {
        if (req.body && req.body._method) {
            const method = req.body._method;
            return method;
        }
    })
);

app.use(cookieParser());

app.use((req,res, next) => {
    const username = req.cookies.username || '';
    res.locals.username = username;
    next();
  })

app.use('/floofs', floofRouter);
app.use('/', floofRouter);

// app.get("/", (req, res) => {
//     res.render("home");
// });

app.get("/sign_in", (req, res) => {
    res.render("sign_in");
});

app.post('/sign_in', (req, res) => {
    const username = req.body.username;
    res.cookie('username', username);
    res.redirect('/');
});

app.post('/sign_out', (req, res) => {
res.clearCookie('username');
res.redirect('/');
});

const PORT = 3000;
const DOMAIN = 'localhost';

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening at http://${DOMAIN}:${PORT}`);
})