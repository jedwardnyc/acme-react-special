import React from 'react';

const Products = (props)=>{
  const { selectedProd, selectedSpecialProd, specialProd, regularProd, toggleSpecial, toggleRegular, onSave } = props;
  return(
    <div>
      <h1> Acme Product Specials </h1>
      <h2> We've got {specialProd.length} special products</h2>
      <div style={{ display:'flex' }}>
        <div style={{ flex: '50%'}}>
          <h3><strong>Primary Products</strong></h3>
          <form onSubmit={onSave}>
          <select onChange={toggleSpecial} value={selectedProd.id}>
            <option value = '-1'> --choose-- </option> 
          {
            regularProd.map( product => {
              return <option key={product.id} value={product.id}> {product.name} </option>
            })
          }
          </select>
          <button disabled={selectedSpecialProd.id ? false : true} className='btn btn-primary'>Make Special</button>
          </form>
        </div>
        <div style={{ flex: '50%'}}>
          <h3><strong>Special Products</strong></h3>
          <form onSubmit={onSave}>
          <select onChange={toggleSpecial} value={selectedSpecialProd.id}>
            <option value = '-1'> --choose-- </option> 
            {
            specialProd.map( product => { 
              return <option key = {product.id} value={product.id}> {product.name} </option>
            })
          }
          </select>
          <button disabled={selectedProd.id ? false : true}  className='btn btn-primary'>Make Regular</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;