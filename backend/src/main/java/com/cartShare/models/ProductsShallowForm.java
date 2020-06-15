package com.cartShare.models;

import com.cartShare.entity.Product;

public class ProductsShallowForm {
	
	    Long storeid;
	    Long sku;
	    String name;
	    String storeName ;



	String description;
	    String imageUrl;
	    String unitType;
	    double price;
	    int quantity;
		public ProductsShallowForm convertToShallowForm (Product p)
	    {
	    	ProductsShallowForm psf = new ProductsShallowForm();
	    	psf.setStoreid(p.getStoreid());
	    	psf.setDescription(p.getDescription());
	    	psf.setImageUrl( p.getImageUrl());
	    	psf.setSku(p.getSku());
	    	psf.setName(p.getName());
	    	psf.setUnitType(p.getUnitType());
	    	psf.setPrice(p.getPrice());
	    	psf.setStoreName(p.getStore().getName());
	    	psf.setQuantity(p.getQuantity());
	    	return psf;
	    }
	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
		public Long getStoreid() {
			return storeid;
		}

		public void setStoreid(Long storeid) {
			this.storeid = storeid;
		}

		public Long getSku() {
			return sku;
		}

		public void setSku(Long sku) {
			this.sku = sku;
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
