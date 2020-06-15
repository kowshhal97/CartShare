package com.cartShare.requests.orderRequests;

import java.util.List;

public class UpdateOrderForAPool {
    List<EachDelivery> deliveries;

    public List<EachDelivery> getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(List<EachDelivery> deliveries) {
        this.deliveries = deliveries;
    }
}
