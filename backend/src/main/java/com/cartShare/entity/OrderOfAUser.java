package com.cartShare.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@JsonIgnoreProperties({"ordergroup","orderedProducts"})

public class OrderOfAUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @OneToMany(mappedBy = "orderBelongsTo")
    @JsonIgnoreProperties("orderBelongsTo")
    List<OrderedProduct> orderedProducts;


    @ManyToOne
    @JsonIgnoreProperties({"myOrder","orders","currentOrder"})
    Order ordergroup;

    @ManyToOne
    @JsonIgnoreProperties("poolUser")
    PoolUser orderedBy;

    @ManyToOne
    @JsonIgnoreProperties("deliveries")
    PoolUser deliveredBy;

    String status;

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

    public List<OrderedProduct> getOrderedProducts() {
        return orderedProducts;
    }

    public void setOrderedProducts(List<OrderedProduct> orderedProducts) {
        this.orderedProducts = orderedProducts;
    }

    public Order getOrdergroup() {
        return ordergroup;
    }

    public PoolUser getDeliveredBy() {
        return deliveredBy;
    }

    public void setDeliveredBy(PoolUser deliveredBy) {
        this.deliveredBy = deliveredBy;
    }

    public void setOrdergroup(Order ordergroup) {
        this.ordergroup = ordergroup;
    }

    public PoolUser getUser() {
        return orderedBy;
    }

    public void setUser(PoolUser user) {
        this.orderedBy = user;
    }


}
