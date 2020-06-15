package com.cartShare.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.Id;

public class ProductId implements Serializable{
	public static final long serialVersionUID = 1L;
	private Long sku;
	 
	private Long storeid;

	public ProductId() {
		super();
		// TODO Auto-generated constructor stub
	}

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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((sku == null) ? 0 : sku.hashCode());
		result = prime * result + ((storeid == null) ? 0 : storeid.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProductId other = (ProductId) obj;
		if (sku == null) {
			if (other.sku != null)
				return false;
		} else if (!sku.equals(other.sku))
			return false;
		if (storeid == null) {
			if (other.storeid != null)
				return false;
		} else if (!storeid.equals(other.storeid))
			return false;
		return true;
	}

	
	
	

}
