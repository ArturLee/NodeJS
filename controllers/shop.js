const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    }).catch(err => {
      console.log(err)
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({where: {id: prodId}})
  // .then(products => {
  //   res.render('shop/product-detail', {
  //     product: products[0],
  //     pageTitle: products[0].title,
  //     path: '/products'
  //   });
  // })
  //  .catch(err => console.log(err))
  Product.findByPk(prodId)
  .then(product => {
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product.title,
      path: '/products'
    });
  }).catch(err => console.log(err))
};

exports.getIndex = (req, res, nxt) => {
  Product.findAll()
    .then(product => {
      res.render('shop/index', {
        prods: product,
        pageTitle: 'Shop',
        path: '/'
      });
    }).catch(err => {
      console.log(err)
    });
};

exports.getCart = (req, res, nxt) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, quantity: cartProductData.quantity });
        }
      }
      res.render('shop/cart', {
        //prods: products,
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, nxt) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart')
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
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