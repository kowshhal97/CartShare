package com.cartShare.models;

import com.cartShare.entity.Address;
import com.cartShare.entity.User;

public class AppliedMemberShallowForm {
	
	Long id;
    String screenName;
    String nickName;
    String email;
    Address address;
    Long poolId ;
    String poolName ;
    String referenceByName;
    Long referenceById ;
    String status;
    public String getReferenceByName() {
		return referenceByName;
	}
	public void setReferenceByName(String referenceByName) {
		this.referenceByName = referenceByName;
	}
	public Long getReferenceById() {
		return referenceById;
	}
	public void setReferenceById(Long referenceById) {
		this.referenceById = referenceById;
	}
	public  AppliedMemberShallowForm convertToUserShallowForm (User user,Long poolId,String status,Long referenceId, String referenceByName,String poolName)
	{
    	AppliedMemberShallowForm usf = new AppliedMemberShallowForm();
		usf.setId(user.getId());
		usf.setScreenName(user.getScreenName());
		usf.setNickName(user.getNickName());
		usf.setAddress(user.getAddress());
		usf.setPoolName(poolName);
		usf.setEmail(user.getEmail());
		usf.setPoolId(poolId);
		usf.setStatus(status);
		usf.setReferenceByName(referenceByName);
		usf.setReferenceById(referenceId);
		return usf ;	}
    public String getPoolName() {
		return poolName;
	}
	public void setPoolName(String poolName) {
		this.poolName = poolName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getScreenName() {
		return screenName;
	}
	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public Long getPoolId() {
		return poolId;
	}
	public void setPoolId(Long poolId) {
		this.poolId = poolId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
