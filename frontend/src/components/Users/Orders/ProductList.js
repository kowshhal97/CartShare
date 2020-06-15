import React, { Component } from 'react'
import ProductItem from './ProductItem'

class ProductList extends Component {
    
    render() {

        return (
            <div className="ui-items" style={{ paddingTop: "2%", paddingLeft: "5%"}}>
                
                {this.props.list?this.props.list.map((product) => {
                    return <ProductItem key={product.id} product={product} details={this.props.orderDetails} status={this.props.status} pickedUpBy={this.props.pickedUpBy}/>
                }):null}
            </div>
        );
    }
}   
export default ProductList;