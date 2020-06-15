package com.cartShare.models;

import com.cartShare.entity.Admin;
import com.cartShare.entity.User;

public class AdminShallowForm {
	
	private Long id;
	private String name;
    private String email;
    private String password;

    
    public  AdminShallowForm convertToAdminShallowForm (Admin admin)
	{
    	AdminShallowForm asf = new AdminShallowForm();
        asf.setId(admin.getId());
		asf.setEmail(admin.getEmail());
		asf.setName(admin.getName());
		asf.setPassword(admin.getPassword());
		return asf ;
		
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


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}
    
    

}
