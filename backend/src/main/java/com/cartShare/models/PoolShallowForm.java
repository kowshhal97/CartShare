package com.cartShare.models;

import com.cartShare.entity.Pool;

public class PoolShallowForm {
	Long id;
	String poolId;
	String name;
	String neighbourhoodName;
	String description;
	String zipCode;
	UserShallowForm poolLeader;
	
	public PoolShallowForm convertToPoolShallowForm(Pool pool , UserShallowForm user)
	{
		PoolShallowForm psf = new PoolShallowForm();
		psf.setId(pool.getId());
		psf.setPoolId(pool.getPoolId());
		psf.setDescription(pool.getDescription());
		psf.setNeighbourhoodName(pool.getNeighbourhoodName());
		psf.setZipCode(pool.getZipCode());
		psf.setName(pool.getName());
		psf.setPoolLeader(user);
		return psf;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPoolId() {
		return poolId;
	}
	public void setPoolId(String poolId) {
		this.poolId = poolId;
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
	public UserShallowForm getPoolLeader() {
		return poolLeader;
	}
	public void setPoolLeader(UserShallowForm poolLeader) {
		this.poolLeader = poolLeader;
	}

}
