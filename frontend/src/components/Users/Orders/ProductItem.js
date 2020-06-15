import React, { Component } from 'react';
import { Button } from '@material-ui/core'

const ProductItem = ({product, details}) => {
  console.log(details);
    return (
        <div className="ui segment">

        <div className='item container' style={{marginBottom: "10px", marginTop: "10px"}}>
        <div
          className='ui tiny image'
          style={{ float: 'left', marginRight: '10px' }}>
            {product.product.imageUrl?<img src={product.product.imageUrl} />:<img src="https://sainfoinc.com/wp-content/uploads/2018/02/image-not-available.jpg"/>}
        </div>
        <div className='content'>
          <a className='header'>
            <h4>{product.product.name}</h4>
          </a>
          <div className='meta'>
            <span className='ui medium header'>Price: ${product.product.price}</span>
            <span className="ui medium header"> | Quantity: {product.quantity}</span>
            <span className="ui medium header"> | Units: {product.product.unitType}</span>
          </div>
          <div className='ui small header'>
            <div>
              description: {product.product.description}
            </div>
          </div>
          <div className='extra'>
            
          </div>
        </div>
      </div>
      </div>
    );
  }
export default ProductItem;
