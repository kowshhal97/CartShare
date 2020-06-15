package com.cartShare.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cartShare.entity.Address;
import com.cartShare.entity.Admin;
import com.cartShare.entity.Pool;
import com.cartShare.entity.PoolUser;
import com.cartShare.entity.User;
import com.cartShare.models.AdminShallowForm;
import com.cartShare.models.PoolShallowForm;
import com.cartShare.models.UserDeepForm;
import com.cartShare.models.UserShallowForm;
import com.cartShare.repository.AdminRepository;
import com.cartShare.repository.PoolRepo;
import com.cartShare.repository.PoolUserRepo;
import com.cartShare.repository.UserRepository;
import com.cartShare.requests.AdminSignupRequest;
import com.cartShare.requests.LoginRequest;
import com.cartShare.requests.SignupRequest;

@RequiredArgsConstructor
@Service
public class UserService {

	@Autowired
	UserRepository userrepository;

	@Autowired
	PoolRepo poolRepo;

	@Autowired
	PoolUserRepo poolUserRepos;

	@Autowired
	AdminRepository adminrepository;

	public User signupUser(SignupRequest signuprequest) throws Exception {

		User user = new User();
		user.setScreenName(signuprequest.getScreenName());
		user.setNickName(signuprequest.getNickName());
		user.setEmail(signuprequest.getEmail().toLowerCase());
		user.setPassword(signuprequest.getPassword());
		user.setEmailVerified(signuprequest.getEmailVerified());
		Address address=new Address();
		
		if(signuprequest.getStreetNumber()!=null)
		   address.setStreetNumber(signuprequest.getStreetNumber());
		if(signuprequest.getStreetName()!=null)
		   address.setStreetName(signuprequest.getStreetName());
		if(signuprequest.getCity()!=null)
		   address.setCity(signuprequest.getCity());
		if(signuprequest.getState()!=null)
		   address.setState(signuprequest.getState());
		if(signuprequest.getZip()!=null)
		   address.setZip(signuprequest.getZip());
		
		if(signuprequest.getProvider()!=null)
		{
			user.setProvider(signuprequest.getProvider());
		}
		
		user.setAddress(address);

		User res = userrepository.save(user);

		return res;

		
		
	}
	
	public Admin signupAdmin(AdminSignupRequest adminsignuprequest) throws Exception
	{
	
		Admin user=new Admin();
	
		user.setName(adminsignuprequest.getName());
		user.setEmail(adminsignuprequest.getEmail().toLowerCase());
		if(adminsignuprequest.getPassword()!=null)
		{
			user.setPassword(adminsignuprequest.getPassword());
		}
		if(adminsignuprequest.getEmailVerified()!=null)
		{
			user.setEmailVerified(adminsignuprequest.getEmailVerified());
		}
		if(adminsignuprequest.getProvider()!=null)
		{
			user.setProvider(adminsignuprequest.getProvider());
		}
		
		
		Admin res=adminrepository.save(user);
		
return res;

	}

	
	public UserShallowForm loginUser(LoginRequest loginrequest) throws Exception
	{
		String email=loginrequest.getEmail().toLowerCase();
    	
    	String password= loginrequest.getPassword();
		try
		{
		User userobject = userrepository.findByEmail(email).get();
		
		if(userobject != null)
		{
			if(userobject.getPassword().equals(password))
			{
				UserShallowForm usershallow=new UserShallowForm();
				UserShallowForm shallowUser=usershallow.convertToUserShallowForm(userobject);
				return shallowUser;
			}
			else
				return null;
		}else
		{
			return null;
		}
		}catch(Exception e)
		{
			return null;
		}
			
	}

	
	public AdminShallowForm loginAdmin(LoginRequest loginrequest) throws Exception
	{
		
		String email=loginrequest.getEmail().toLowerCase();
    	
    	String password= loginrequest.getPassword();
		try
		{
		Admin userobject = adminrepository.findByEmail(email).get();
		
		if(userobject != null)
		{
			if(userobject.getPassword().equals(password))
			{
				AdminShallowForm adminShallow=new AdminShallowForm();
				
				AdminShallowForm ShallowAdmin=adminShallow.convertToAdminShallowForm(userobject);
				
				return ShallowAdmin;
			}
			else
				return null;
			}
		} catch (Exception e) {
			return null;
		}
return null;
	}
	public UserShallowForm profileDetails(String email) throws Exception
	{
		try
		{
			
		User user = userrepository.findByEmail(email).get();
		PoolUser puser =  poolUserRepos.findByUser(user);


		UserShallowForm usershallow=new UserShallowForm();
		UserShallowForm shallowUser=usershallow.convertToUserShallowForm(user);
		if(puser != null) {
			shallowUser.setCredits((long) puser.getCredits());
			shallowUser.setStatus(puser.getConstributionStatus());
		}
		
	    return shallowUser;
		
		}catch(Exception e){
			
		  return null;	
		
		}
		
	}
	
	public UserShallowForm updateProfile(String email,SignupRequest signuprequest) throws Exception
	{
		try
		{
		User user = userrepository.findByEmail(email).get();
		
		user.setScreenName(signuprequest.getScreenName());
		
		if(signuprequest.getNickName()!=null)
		 user.setNickName(signuprequest.getNickName());
		
		user.setEmail(email.toLowerCase());
		
		if(user.getPassword()!=null)
		 user.setPassword(user.getPassword());
		
		user.setEmailVerified(user.getEmailVerified());
		Address address=new Address();
		
		if(signuprequest.getStreetNumber()!=null)
		   address.setStreetNumber(signuprequest.getStreetNumber());
		if(signuprequest.getStreetName()!=null)
		   address.setStreetName(signuprequest.getStreetName());
		if(signuprequest.getCity()!=null)
		   address.setCity(signuprequest.getCity());
		if(signuprequest.getState()!=null)
		   address.setState(signuprequest.getState());
		if(signuprequest.getZip()!=null)
		   address.setZip(signuprequest.getZip());
		
		user.setAddress(address);
		
		User res=userrepository.save(user);
		
		UserShallowForm usershallow=new UserShallowForm();
		UserShallowForm shallowUser=usershallow.convertToUserShallowForm(res);
		
	    return shallowUser;
		
		
		}catch(Exception e){
			
		return null;	
		
		}
		
	}
	
}
