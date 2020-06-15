package com.cartShare.requests;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.cartShare.entity.Store;

public class ProductRequest {
	
	    private Long storeid;
	    
	    private Long sku;
	    
	    private String name;
	    
	    private String description;
	    private String imageUrl;
	    
	    private String unitType;
	  
	    private double price;
	    
	    private int quantity;
	    
	    
	    
	    public Long getSku() {
			return sku;
		}
		public void setSku(Long sku) {
			this.sku = sku;
		}
		public Long getStoreid() {
			return storeid;
		}
		public void setStoreid(Long storeid) {
			this.storeid = storeid;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getImageUrl() {
			return imageUrl;
		}
		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}
		public String getUnitType() {
			return unitType;
		}
		public void setUnitType(String unitType) {
			this.unitType = unitType;
		}
		public double getPrice() {
			return price;
		}
		public void setPrice(double price) {
			this.price = price;
		}
		public int getQuantity() {
			return quantity;
		}
		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}
		    

}
