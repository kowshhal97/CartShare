package com.cartShare.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.util.HashMap;
import java.util.List;

@JsonIgnoreProperties({"orderBelongsTo","orders","store","orderedPool"})
@Entity
@Table(name = "pool_order")
@Cacheable
@org.hibernate.annotations.Cache(usage= CacheConcurrencyStrategy.READ_WRITE)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;


    @OneToMany(mappedBy = "ordergroup", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("ordergroup")
    List<OrderOfAUser> orders;

    @ManyToOne
    @JsonIgnoreProperties("currentOrders")
    Store store;

    @OneToOne
    @JsonIgnoreProperties({"ordergroup","currentPool","currentOrder","members"})
    Pool orderedPool;
    


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<OrderOfAUser> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderOfAUser> orders) {
        this.orders = orders;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Pool getOrderedPool() {
        return orderedPool;
    }

    public void setOrderedPool(Pool orderedPool) {
        this.orderedPool = orderedPool;
    }



}
