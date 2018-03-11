const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL||'postgres://localhost/acme_special_db')

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
  },
  isSpecial: {
    type: Sequelize.BOOLEAN,
  }
})

const syncAndSeed = ()=>{
  conn.sync({force: true})
    .then(()=>{
      return Promise.all([
        Product.create({name: 'Foo', isSpecial: false}),
        Product.create({name: 'Bar', isSpecial: false}),
        Product.create({name: 'Bazz', isSpecial: true}),
      ])
    })
}

module.exports={
  models: {
    Product
  },
  syncAndSeed
}