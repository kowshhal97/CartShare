package com.cartShare.models;

import com.cartShare.entity.Address;
import com.cartShare.entity.Store;


public class StoreShallowForm {

	private Long id;
	
	private String name;

    private Address address;
    
    public StoreShallowForm convertToStoreShallowForm(Store store)
	{
    	StoreShallowForm ssf = new StoreShallowForm();
    	
    	ssf.setId(store.getId());
    	ssf.setAddress(store.getAddress());
    	ssf.setName(store.getName());
		
		return ssf ;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
    
    
}
