package com.cartShare.models;

import com.cartShare.entity.Address;
import com.cartShare.entity.User;

public class UserShallowForm {
	
	Long id;
    String screenName;
    String nickName;
    String email;
    Address address;
    Long credits ;
    String status ;

	public Long getCredits() {
		return credits;
	}

	public void setCredits(Long credits) {
		this.credits = credits;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public  UserShallowForm convertToUserShallowForm (User user)
	{
		UserShallowForm usf = new UserShallowForm();
		usf.setId(user.getId());
		usf.setScreenName(user.getScreenName());
		usf.setNickName(user.getNickName());
		usf.setAddress(user.getAddress());
		usf.setEmail(user.getEmail());
		return usf ;
		
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
