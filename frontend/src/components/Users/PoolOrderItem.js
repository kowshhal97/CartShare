import React, { Component } from 'react'
import ProductList from './Orders/ProductList';

class PoolOrderItem extends Component {
    render() {
        console.log(this.props.productList)
        return (
            <div>
                <ProductList list={this.props.productList}/>
            </div>

        )
    }
}

export default PoolOrderItem;