package com.cartShare.models;

import com.cartShare.entity.OrderedProduct;

public class OrderedProductsShallow {
    Long id;
    ProductsShallowForm product;
    String quantity;

    public OrderedProductsShallow convertToForm(OrderedProduct orderedProduct,ProductsShallowForm product){
        OrderedProductsShallow op=new OrderedProductsShallow();
        op.setQuantity(orderedProduct.getQuantity());
        op.setId(orderedProduct.getId());
        op.product=product;
        return op;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductsShallowForm getProduct() {
        return product;
    }

    public void setProduct(ProductsShallowForm product) {
        this.product = product;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
