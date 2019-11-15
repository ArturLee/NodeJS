const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, image, null, req.user._id);
  product
    .save()
    .then(result => {
      console.log('Created Product');
      res.redirect('/admin/products')
    }).catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    // Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    }).catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImage = req.body.image;
  const updatedDescription = req.body.description;
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImage,
    prodId
  ); //this will save in the database or update the current one
  product.save()
    .then(result => {
      console.log('updated PRodcut')
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  
  Product.deleteById(prodId)
    .then(result => {
      console.log("destroyed");
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/product',
      });
    })
    .catch(err => console.log(err));
};