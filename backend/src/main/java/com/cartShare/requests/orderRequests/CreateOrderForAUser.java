package com.cartShare.requests.orderRequests;

import java.util.List;

public class CreateOrderForAUser {

    List<CreateProductInAnOrder> product;
    String pickedUpBy;

    public String getPickedUpBy() {
        return pickedUpBy;
    }

    public void setPickedUpBy(String pickedUpBy) {
        this.pickedUpBy = pickedUpBy;
    }

    public List<CreateProductInAnOrder> getProduct() {
        return product;
    }

    public void setProduct(List<CreateProductInAnOrder> product) {
        this.product = product;
    }
}
