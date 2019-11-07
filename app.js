const path = require('path');

const express = require('express');
const bodyparser= require('body-parser');
//const expressHbs = require('express-handlebars');

const errorController = require('./controllers/error');
const db= require('./util/database');

const app = express();

db.execute('Select * from products').then().catch();
//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
//app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000); 
