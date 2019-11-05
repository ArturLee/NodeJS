const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, nxt) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      // hasProducts: products.length > 0,
      // activeShop: true,
      // productCSS: true
    });
  });
};

exports.getCart = (req, res, nxt) => {
  res.render('shop/cart', {
    //prods: products,
    pageTitle: 'Your Cart',
    path: '/cart',
  });
};

exports.postCart = (req,res,nxt) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) =>{
      Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart')
};

exports.getOrders = (req, res, nxt) => {
  res.render('shop/orders', {
    //prods: products,
    pageTitle: 'Your order',
    path: '/orders',
  });
};

exports.getCheckout = (req, res, nxt) => {
  res.render('shop/checkout', {
    //prods: products,
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}