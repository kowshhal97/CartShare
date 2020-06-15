package com.cartShare.models;

import com.cartShare.entity.Order;
import com.cartShare.entity.OrderOfAUser;

import java.util.List;

public class GetOrderOfAPoolModel {

    Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GetOrderOfAPoolModel convert(Order order,List<GetOrderOfAUserModel> getOrderOfAUserModel){
        GetOrderOfAPoolModel getOrderOfAPoolModel= new GetOrderOfAPoolModel();
        getOrderOfAPoolModel.id=order.getId();
        getOrderOfAPoolModel.orderOfAUserList=getOrderOfAUserModel;
        return getOrderOfAPoolModel;
    }

    public List<GetOrderOfAUserModel> getOrderOfAUserList() {
        return orderOfAUserList;
    }

    public void setOrderOfAUserList(List<GetOrderOfAUserModel> orderOfAUserList) {
        this.orderOfAUserList = orderOfAUserList;
    }

    List<GetOrderOfAUserModel> orderOfAUserList;


}
