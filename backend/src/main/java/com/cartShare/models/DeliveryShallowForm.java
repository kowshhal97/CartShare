package com.cartShare.models;

public class DeliveryShallowForm {
    GetOrderOfAUserModel order;
    UserShallowForm deliveryDetails;

    public GetOrderOfAUserModel getOrder() {
        return order;
    }

    public void setOrder(GetOrderOfAUserModel order) {
        this.order = order;
    }

    public DeliveryShallowForm convert(GetOrderOfAUserModel orderOfAUserModel,UserShallowForm userShallowForm){
        DeliveryShallowForm deliveryShallowForm=new DeliveryShallowForm();
        deliveryShallowForm.order=orderOfAUserModel;
        deliveryShallowForm.deliveryDetails=userShallowForm;
        return deliveryShallowForm;
    }

    public UserShallowForm getDeliveryDetials() {
        return deliveryDetails;
    }

    public void setDeliveryDetials(UserShallowForm deliveryDetials) {
        this.deliveryDetails = deliveryDetials;
    }
}
