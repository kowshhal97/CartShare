package com.cartShare.models;

import com.cartShare.entity.OrderOfAUser;
import com.cartShare.entity.OrderedProduct;

import java.util.List;

public class GetOrderOfAUserModel {

    Long id;
    List<OrderedProductsShallow> orderedProducts;
    UserShallowForm pickedUpBy;
    String status;

    public UserShallowForm getPickedUpBy() {
        return pickedUpBy;
    }

    public void setPickedUpBy(UserShallowForm pickedUpBy) {
        this.pickedUpBy = pickedUpBy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GetOrderOfAUserModel convert(List<OrderedProductsShallow> orderedProductsShallow, OrderOfAUser orderOfAUser,String status,UserShallowForm pickedUpBy){
        GetOrderOfAUserModel getOrderOfAUserModel=new GetOrderOfAUserModel();
        getOrderOfAUserModel.orderedProducts=orderedProductsShallow;
        getOrderOfAUserModel.id=orderOfAUser.getId();
        getOrderOfAUserModel.status=status;
        getOrderOfAUserModel.pickedUpBy=pickedUpBy;
        return getOrderOfAUserModel;
    }

    public List<OrderedProductsShallow> getOrderedProducts() {
        return orderedProducts;
    }

    public void setOrderedProducts(List<OrderedProductsShallow> orderedProducts) {
        this.orderedProducts = orderedProducts;
    }
}
