package com.cartShare.models;

import com.cartShare.entity.User;
import org.springframework.stereotype.Component;

@Component
public class OrderDeliveredEmail {
    User deliverer;
    User reciever;

    public User getDeliverer() {
        return deliverer;
    }

    public void setDeliverer(User deliverer) {
        this.deliverer = deliverer;
    }

    public User getReciever() {
        return reciever;
    }

    public void setReciever(User reciever) {
        this.reciever = reciever;
    }
}
