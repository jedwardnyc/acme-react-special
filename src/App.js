import React, {Component} from 'react';
import Products from './Products';
import axios from 'axios';

export default class App extends Component{
  constructor(){
    super()
    this.state = {
      selectedProd: {},
      selectedSpecialProd: {},
      specialProd: [],
      regularProd: []
    }
    this.toggleSpecial = this.toggleSpecial.bind(this)
    this.onSave = this.onSave.bind(this)
    this.makeRegular = this.makeRegular.bind(this)
    this.makeSpecial = this.makeSpecial.bind(this)
  }
  
  componentDidMount(){
    const specialProd = []
    const regularProd = []
    axios.get('/api/products')
      .then(res => res.data)
      .then( products => products.map( product =>{
        return product.isSpecial ? specialProd.push(product) : regularProd.push(product)
      }))
      .then(()=> this.setState({ specialProd, regularProd })) 
  }

  toggleSpecial(ev) {
    const id = ev.target.value
    const allProducts = this.state.specialProd.concat(this.state.regularProd)
    const prod = allProducts.find(product => product.id === id * 1)
    prod.isSpecial ? this.setState({ selectedProd: prod }) : this.setState({ selectedSpecialProd: prod })
  }

  onSave(ev){
    ev.preventDefault()
    this.state.selectedProd.name ? this.makeRegular(this.state.selectedProd) : this.makeSpecial(this.state.selectedSpecialProd)
  }

  makeRegular(product) {
    axios.put(`/api/products/${product.id}`, product)
      .then( res => res.data)
      .then( product => {
        const newProduct = this.state.specialProd.filter(_product => _product.id !== product.id)
        this.setState({ specialProd: newProduct, regularProd: [...this.state.regularProd, product] })
      })
      .then(() => this.setState({ selectedProd: {} }))
  }

  makeSpecial(product) {
    axios.put(`/api/products/${product.id}`, product)
      .then( res => res.data)
      .then( product => {
        const newProduct = this.state.regularProd.filter(_product => _product.id !== product.id)
        this.setState({ regularProd: newProduct, specialProd: [...this.state.specialProd, product] })
      })
      .then(() => this.setState({ selectedSpecialProd: {} }))
  }

  render(){
    const { selectedProd, selectedSpecialProd, specialProd, regularProd } = this.state;
    const { toggleSpecial, onSave, toggleRegular } = this;
    return(
      <div>
        
        <Products selectedProd={selectedProd} selectedSpecialProd={selectedSpecialProd} specialProd={specialProd} regularProd={regularProd} toggleSpecial={toggleSpecial} toggleRegular={toggleRegular} onSave={onSave}/>
      </div>
      ) 
  }
}