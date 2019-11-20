const path = require('path');

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MonogoDBStore = require('connect-mongodb-session')(session);
//const expressHbs = require('express-handlebars');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

//-------- sequelize
// const sequelize = require('./util/database');
// const Product = require('./models/products');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const _mongodburi = 'mongodb+srv://arturlee:Tuning95@shop-r5y0a.mongodb.net/shop'

const app = express();
const store = new MonogoDBStore({
    uri: _mongodburi,
    collection: 'sessions'
})

//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
//app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// db.execute('Select * from products')
//     .then(() => { })
//     .catch(() => { });

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'hello',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


//---mongoose connection
mongoose.connect(_mongodburi)
    .then(result => {
        console.log('Connected')
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
//------mongodb connection
// mongoConnect(() => {
//     app.listen(3000)
// })

//-------- Sequelize 
// Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, {through: OrderItem});

// sequelize
//     //.sync({force:true})
//     .sync()
//     .then(result => {
//         return User.findByPk(1);
//         //console.log(result);
//         //app.listen(3000);
//     })
//     .then(user => {
//         if (!user) {
//             return User.create({ name: 'lee', email: 'atu@lee.com' })
//         }
//         return user;
//     })
//     .then(user => {
//         //console.log(user);
//         return user.createCart();   
//     }).then(cart => app.listen(3000))
//     .catch(err => {
//         console.log(err)
//     });


