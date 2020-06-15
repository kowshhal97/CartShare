package com.cartShare.models;

import java.util.List;

public class GetDeliveryInstructionsOfAUser {

    List<DeliveryShallowForm> deliveries;

    public List<DeliveryShallowForm> getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(List<DeliveryShallowForm> deliveries) {
        this.deliveries = deliveries;
    }
}
