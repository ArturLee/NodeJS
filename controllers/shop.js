const Product = require('../models/products');
const Cart = require('../models/cart');
const Order = require('../models/order');

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
        product: product,
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
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            pageTitle: 'Your Cart',
            path: '/cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    }).then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        //get the old quantity and add to the new quantity
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    }).then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    }).then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
  // Product.findByPk(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    }).then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        }).catch(err => console.log(err))
    }).then(result =>{
      //to clean the cart and put everything on checkout!
      fetchedCart.setProducts(null);
    }).then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, nxt) => {
  req.user.getOrders({include:['products']})
  .then(orders => {
    res.render('shop/orders', {
      //prods: products,
      pageTitle: 'Your order',
      path: '/orders',
      order: orders
    });
  })
  .catch(err => console.log(err));
  
};

exports.getCheckout = (req, res, nxt) => {
  res.render('shop/checkout', {
    //prods: products,
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}