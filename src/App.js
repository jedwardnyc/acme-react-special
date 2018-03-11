import React, {Component} from 'react';
import Products from './Products';
import axios from 'axios';

export default class App extends Component{
  constructor(){
    super()
    this.state = {
      products: [],
      productId: '',
    }
    this.toggleSpecial = this.toggleSpecial.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onUpdateSpecial = this.onUpdateSpecial.bind(this)
    this.onSaveSpecial = this.onSaveSpecial.bind(this)
  }
  
  componentDidMount(){
    axios.get('/api/products')
      .then(res => res.data)
      .then( products => this.setState({ products }))
  }

  toggleSpecial(ev){
    ev.preventDefault()
    this.setState({productId: ev.target.value})
  }

  onSave(ev){
    ev.preventDefault()
    const { products, productId } = this.state
    const product = products.find( product => product.id === productId*1 )
    this.onUpdateSpecial(product)
  }

  onSaveSpecial(ev){
    ev.preventDefault()
    const { products, productId } = this.state
    const product = products.find( product => product.id === productId*1 )
    this.onUpdateSpecial(product)
  }

  onUpdateSpecial(product){
    const special = product.isSpecial ? false : true
    axios.put(`/api/products/${product.id}`, product)
      .then(result => result.data)
      .then( product => {
        const products = this.state.products.map(_product=>{
          if(_product.id === product.id*1){
            product.isSpecial = special
            return product
          }
          return _product
        })
        this.setState({ products })
      })
  }

  render(){
    const { products, productId } = this.state;
    const { toggleSpecial, onSave, onSaveSpecial } = this;
    const specialLength = products.filter( product => product.isSpecial).length;
    return(
      <div>
        <h1> Acme Product Specials </h1>
        <h2> We've got {specialLength} special products</h2>
        <Products products={products} productId={productId} onSaveSpecial={onSaveSpecial} toggleSpecial={toggleSpecial} onSave={onSave}/>
      </div>
    ) 
  }
}