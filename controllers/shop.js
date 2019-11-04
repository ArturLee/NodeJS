const Product = require('../models/products');

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

exports.getOrders = (req, res, nxt) => {
  res.render('shop/orders', {
    //prods: products,
    pageTitle: 'Your order',
    path: '/orders',
  });
};

exports.getCheckout = (req,res,nxt) => {
  res.render('shop/checkout', {
    //prods: products,
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}