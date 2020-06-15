package com.cartShare.requests.orderRequests;

import java.util.List;

public class PickUpOrderRequest {
    List<OrderOfUserRequest> pickupRequests;

    public List<OrderOfUserRequest> getPickupRequests() {
        return pickupRequests;
    }

    public void setPickupRequests(List<OrderOfUserRequest> pickupRequests) {
        this.pickupRequests = pickupRequests;
    }
}
