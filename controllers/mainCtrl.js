module.exports = {

  getAllProducts: function(req, res, next)  {
    var dbInstance = req.app.get('db');

    dbInstance.read_products()
    .then(function(products)  {
      res.status(200).json(products)
    })
  },

  getSingleProduct: function(req, res, next)  {
    var dbInstance = req.app.get('db');

    dbInstance.read_product(req.params.id)
    .then(function(getProduct)  {
      res.status(200).json(getProduct)
    })
  },

  createProduct: function(req, res, next) {
    var dbInstance = req.app.get('db');
    const {name, description, price, imageurl} = req.body //<-- Destructuring example(es6), easier way to say "var name = req.body.name, var descript = req.body.description, etc..."
    var inputs = [name, description, price, imageurl] // <--way to reset so that the object keys are entered in the correct order into the database, by being placed in this array(ordered list)

    dbInstance.create_product(inputs) //<-- now same as saying "([req.body.name, req.body.description, req.body.price, req.body.imageurl]) "
    .then(function(createProduct) {
      res.status(200).json(createProduct)
    })
  },

  updateProduct: function(req, res, next) {
    var dbInstance = req.app.get('db');

    dbInstance.update_product([req.body.description, req.params.id])
    .then(function(updateProduct) {
      res.status(200).json(updateProduct)
    })
  },

  destroyProduct: function(req, res, next)  {
    var dbInstance = req.app.get('db');

    dbInstance.delete_product(req.params.id)
    .then(function(destroyProduct)  {
      res.status(200).json(destroyProduct)
    })
  }

}
