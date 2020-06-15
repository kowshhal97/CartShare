package com.cartShare.models;


import java.util.List;

import com.cartShare.entity.Pool;

public class PoolCompleteDetails {

	Long id;
    String poolId ;
    String name;
    String neighbourhoodName;
    String description;
    String zipCode;
    List<UserShallowForm> members;
    
    UserShallowForm poolLeader;
    List<AppliedMemberShallowForm> appliedMembers;
    public PoolDeepForm convertToPoolDeepForm(Pool pool , List<UserShallowForm> members , UserShallowForm poolLeader , List<AppliedMemberShallowForm> appliedMembers  )
	{
    	PoolDeepForm psf = new PoolDeepForm();
		psf.setId(pool.getId());
		psf.setPoolId(pool.getPoolId());
		psf.setDescription(pool.getDescription());
		psf.setNeighbourhoodName(pool.getNeighbourhoodName());
		psf.setZipCode(pool.getZipCode());
		psf.setName(pool.getName());
		psf.setPoolLeader(poolLeader);
		psf.setMembers(members);
		psf.setAppliedMembers(appliedMembers);
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
	public List<UserShallowForm> getMembers() {
		return members;
	}
	public void setMembers(List<UserShallowForm> members) {
		this.members = members;
	}
	public UserShallowForm getPoolLeader() {
		return poolLeader;
	}
	public void setPoolLeader(UserShallowForm poolLeader) {
		this.poolLeader = poolLeader;
	}
	public List<AppliedMemberShallowForm> getAppliedMembers() {
		return appliedMembers;
	}
	public void setAppliedMembers(List<AppliedMemberShallowForm> appliedMembers) {
		this.appliedMembers = appliedMembers;
	}
    
}
