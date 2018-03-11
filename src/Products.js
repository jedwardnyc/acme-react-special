import React from 'react';

const Products = (props)=>{
  const { products, toggleSpecial, productId, onSave, onSaveSpecial } = props;
  return(
    <div style={{ display:'flex' }}>
      <div style={{ flex: '50%'}}>
        <h3><strong>Primary Products</strong></h3>
        <form onSubmit={onSave}>
        <select value={productId} onChange={toggleSpecial}>
          <option value = '-1'> --choose-- </option> 
        {
          products.map( product => {
            return product.isSpecial ? null : <option key={product.id} value={product.id}> {product.name} </option>
          })
        }
        </select>
        <button disabled={productId>0 ? false : true} className='btn btn-primary'>Make Special</button>
        </form>
      </div>
      <div style={{ flex: '50%'}}>
        <h3><strong>Special Products</strong></h3>
        <form onSubmit={onSaveSpecial}>
        <select value={productId} onChange={toggleSpecial}>
          <option value = '-1'> --choose-- </option> {
          products.map( product => { 
            return product.isSpecial ? <option key = {product.id} value={product.id}> {product.name} </option> : null
          })
        }
        </select>
        <button disabled={productId >0 ? false : true}  className='btn btn-primary'>Make Regular</button>
        </form>
      </div>
    </div>
  );
};

export default Products;