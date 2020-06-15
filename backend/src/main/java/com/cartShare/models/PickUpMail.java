package com.cartShare.models;

import com.cartShare.entity.OrderOfAUser;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PickUpMail {
    List<OrderOfAUser> pickUpEmails;

    public List<OrderOfAUser> getPickUpEmails() {
        return pickUpEmails;
    }

    public void setPickUpEmails(List<OrderOfAUser> pickUpEmails) {
        this.pickUpEmails = pickUpEmails;
    }
}
