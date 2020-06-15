package com.cartShare.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class AppliedMembers {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    
    @OneToOne()
    @JsonIgnoreProperties("poolUser")
    User user;

    String status;

    @ManyToOne
    @JsonIgnoreProperties("appliedMembers")
    Pool appliedPool;

    @OneToOne()
    @JsonIgnoreProperties("currentPool")
    PoolUser referencedBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Pool getAppliedPool() {
        return appliedPool;
    }

    public void setAppliedPool(Pool appliedPool) {
        this.appliedPool = appliedPool;
    }

    public PoolUser getReferencedBy() {
        return referencedBy;
    }

    public void setReferencedBy(PoolUser referencedBy) {
        this.referencedBy = referencedBy;
    }


}

