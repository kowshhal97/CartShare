package com.cartShare.models;


import com.cartShare.entity.Address;
import com.cartShare.entity.User;

public class UserDeepForm {
	
	Long id;
    String screenName;
    String nickName;
    String email;
    Address address;
    PoolShallowForm poolDetails ;
	public  UserDeepForm convertToUserDeepForm (User user,PoolShallowForm psf)
	{
		UserDeepForm usf = new UserDeepForm();
		usf.setId(user.getId());
		usf.setScreenName(user.getScreenName());
		usf.setNickName(user.getNickName());
		usf.setAddress(user.getAddress());
		usf.setEmail(user.getEmail());
		usf.setPoolDetails(psf);
		
		return usf ;
		
	}
	public PoolShallowForm getPoolDetails() {
		return poolDetails;
	}
	public void setPoolDetails(PoolShallowForm poolDetails) {
		this.poolDetails = poolDetails;
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


}
