package com.cartShare.models;

import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.cartShare.entity.Address;
import com.cartShare.entity.Admin;
import com.cartShare.entity.Order;
import com.cartShare.entity.OrderOfAUser;
import com.cartShare.entity.Pool;
import com.cartShare.entity.PoolUser;
import com.cartShare.entity.Product;
import com.cartShare.entity.Store;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class OrderShallowForm {
	
	
	    Long id;

	    UserShallowForm pickedUpBy;

	    List<OrderOfAUser> orders;

	    StoreShallowForm store;

	    PoolShallowForm orderedPool;
	    
	    String Status;

	    @JsonIgnoreProperties("store")
	    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
	    private List<Product> products;
}
