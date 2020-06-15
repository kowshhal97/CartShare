package com.cartShare.models;

import com.cartShare.entity.OrderOfAUser;
import org.springframework.stereotype.Component;

@Component
public class OrderConfirmationMail {
    OrderOfAUser orderOfAUser;

    public OrderOfAUser getOrderOfAUser() {
        return orderOfAUser;
    }

    public void setOrderOfAUser(OrderOfAUser orderOfAUser) {
        this.orderOfAUser = orderOfAUser;
    }
}
