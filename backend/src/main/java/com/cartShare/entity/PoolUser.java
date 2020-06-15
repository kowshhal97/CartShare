package com.cartShare.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity

public class PoolUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @OneToOne()
    @JsonIgnoreProperties("poolUser")
    User user;


    @ManyToOne
    @JsonIgnoreProperties("members")
    Pool currentPool;
    
    @OneToMany(mappedBy = "orderedBy",cascade = CascadeType.ALL )
    @JsonIgnoreProperties({"members","orderedPool"})
    List<OrderOfAUser> myOrders;


    String constributionStatus;

    @OneToMany(mappedBy = "deliveredBy" ,  cascade = CascadeType.ALL)
    @JsonIgnoreProperties("deliveredBy")
    List<OrderOfAUser> deliveries;

    public List<OrderOfAUser> getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(List<OrderOfAUser> deliveries) {
        this.deliveries = deliveries;
    }

    public List<OrderOfAUser> getMyOrder() {
        return myOrders;
    }

    public void setMyOrder(List<OrderOfAUser> myOrder) {
        this.myOrders = myOrder;
    }


    int credits;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Pool getCurrentPool() {
        return currentPool;
    }

    public void setCurrentPool(Pool currentPool) {
        this.currentPool = currentPool;
    }

    public String getConstributionStatus() {
        return constributionStatus;
    }

    public void setConstributionStatus(String status) {
        this.constributionStatus = status;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }


}
