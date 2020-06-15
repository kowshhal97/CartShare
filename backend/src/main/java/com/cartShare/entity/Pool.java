package com.cartShare.entity;

import java.util.List;

import javax.persistence.*;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage= CacheConcurrencyStrategy.READ_WRITE)
public class Pool {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	String poolId;
	String name;
	String neighbourhoodName;
	String description;
	String zipCode;




	@OneToMany(mappedBy = "currentPool", cascade = CascadeType.ALL , fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"currentPool","orderedPool"})
	List<PoolUser> members;

	@OneToOne()
	@JsonIgnoreProperties({"poolUser"})
	User poolLeader;

	@OneToMany(mappedBy = "appliedPool", orphanRemoval = true ,  fetch = FetchType.LAZY)
	@JsonIgnoreProperties("appliedPool")
	List<AppliedMembers> appliedMembers;

	@OneToOne(mappedBy = "orderedPool", cascade = CascadeType.ALL )
	@JsonIgnoreProperties("orderedPool")
	Order currentOrder;

	public Order getCurrentOrder() {
		return currentOrder;
	}

	public void setCurrentOrder(Order currentOrder) {
		this.currentOrder = currentOrder;
	}

	public String getPoolId() {
		return poolId;
	}

	public void setPoolId(String poolId) {
		this.poolId = poolId;
	}

	public List<AppliedMembers> getAppliedMembers() {
		return appliedMembers;
	}

	public void setAppliedMembers(List<AppliedMembers> appliedMembers) {
		this.appliedMembers = appliedMembers;
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

	public String getNeighbourhoodName() {
		return neighbourhoodName;
	}

	public void setNeighbourhoodName(String neighbourhoodName) {
		this.neighbourhoodName = neighbourhoodName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public List<PoolUser> getMembers() {
		return members;
	}

	public void setMembers(List<PoolUser> members) {
		this.members = members;
	}

	public User getPoolLeader() {
		return poolLeader;
	}

	public void setPoolLeader(User poolLeader) {
		this.poolLeader = poolLeader;
	}

}
