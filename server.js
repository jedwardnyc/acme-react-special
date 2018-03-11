const express = require('express');
const app = express();
const db = require('./db')
const path = require('path')
const { Product } = db.models

app.use(require('body-parser').json())

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')))

app.get('/', (req,res,next)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/products', (req,res,next)=>{
  Product.findAll()
    .then(products => res.send(products))
})

app.put('/api/products/:id', (req,res,next)=>{
  Product.findById(req.params.id)
    .then(product => {
      Object.assign(product, req.body)
      return product.save()
    })
    .then(product => res.send(product))
})

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on port ${port}`));

db.syncAndSeed() 