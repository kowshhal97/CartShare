package com.cartShare.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderedProduct {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	String quantity;

	@OneToOne
	@JsonIgnoreProperties({"products","store"})
	Product productOrdered;

	@ManyToOne
	@JsonIgnoreProperties("orderedProducts")
	OrderOfAUser orderBelongsTo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public Product getProductOrdered() {
		return productOrdered;
	}

	public void setProductOrdered(Product productOrdered) {
		this.productOrdered = productOrdered;
	}

	public OrderOfAUser getOrderBelongsTo() {
		return orderBelongsTo;
	}

	public void setOrderBelongsTo(OrderOfAUser orderBelongsTo) {
		this.orderBelongsTo = orderBelongsTo;
	}

}
