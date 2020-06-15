package com.cartShare.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import ch.qos.logback.core.subst.Token.Type;

import java.util.List;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @OneToMany(mappedBy = "createdBy",fetch = FetchType.LAZY)
    @JsonIgnoreProperties("createdBy")
    private List<Store> storesCreated;
    private String name;
    private String email;

    private String emailVerified;
    private String password;
    
    private String provider;
    
    public Long getId() {
        return id;
    }


	public String getProvider() {
		return provider;
	}


	public void setProvider(String provider) {
		this.provider = provider;
	}


	public String getEmailVerified() {
		return emailVerified;
	}


	public void setEmailVerified(String emailVerified) {
		this.emailVerified = emailVerified;
	}


	public void setId(Long id) {
        this.id = id;
    }

    public List<Store> getStoresCreated() {
        return storesCreated;
    }

    public void setStoresCreated(List<Store> storesCreated) {
        this.storesCreated = storesCreated;
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
