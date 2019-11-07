const db = require('../util/database');

const Cart = require('./cart')

module.exports = class Product {
  constructor(id, title, image, description, price) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;
    this.description = description;
  }

  save() {
    db.execute('insert into product (title,price,image,description) values (?,?,?,?)',[this.title, this.price, this.image, this.description]);
  }

  static deleteById(id) {
    
  }

  static fetchAll(cb) {
    return db.execute('Select * from products');
  }

  static findById(id, cb) {
    return db.execute('select * from product Where products.id = ?', [id]);
  }
};
