package com.cartShare.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties("poolUser")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(unique = true)
    private String screenName;
    @Column(unique = true)
    private String nickName;
    private String email;
    private String password;
    private Address address;

    public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}


	private String EmailVerified;
   
    private String provider;
    
	public String getEmailVerified() {
		return EmailVerified;
	}

	public void setEmailVerified(String emailVerified) {
		EmailVerified = emailVerified;
	}

	
    @OneToOne( cascade = CascadeType.ALL )
    @JsonIgnoreProperties("user")
    private PoolUser poolUser;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public PoolUser getPoolUser() {
        return poolUser;
    }

    public void setPoolUser(PoolUser poolUser) {
        this.poolUser = poolUser;
    }

}
