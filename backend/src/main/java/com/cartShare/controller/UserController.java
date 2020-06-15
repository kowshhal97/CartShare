package com.cartShare.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cartShare.entity.Admin;
import com.cartShare.entity.User;
import com.cartShare.models.AdminShallowForm;
import com.cartShare.models.UserShallowForm;
import com.cartShare.repository.AdminRepository;
import com.cartShare.repository.UserRepository;
import com.cartShare.requests.AdminSignupRequest;
import com.cartShare.requests.LoginRequest;
import com.cartShare.requests.SignupRequest;
import com.cartShare.service.UserService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping(value = "/")
public class UserController {
	
	@Autowired
	UserService userservice;
	
	@Autowired
	UserRepository userrepository;
	
	@Autowired
	AdminRepository adminrepository;
	
	@PostMapping(value = "/signup/")
	public ResponseEntity<?> signUpUser(@Valid @RequestBody SignupRequest signuprequest)
	{
		try {
				User user=userservice.signupUser(signuprequest);
				if(user!=null)
					return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(user);
				else
					return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Cannot register user");
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Cannot register user");
			}
	}
	
	@PostMapping(value = "/admin/signup/")
	public ResponseEntity<?> signUpAdmin(@Valid @RequestBody AdminSignupRequest adminsignuprequest)
	{
		 String email= adminsignuprequest.getEmail();
		 if(!email.substring(email.indexOf("@")).equals("@sjsu.edu")){
		      return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Not a Admin"); 
         }
		try {
			 Admin admin=userservice.signupAdmin(adminsignuprequest);
			 if(admin!=null)
				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(admin);
			 else
				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Cannot register user");
				} catch (Exception e1) {
				   return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Cannot register user");
				}		
		}
	@PostMapping(value = "/admin/emailVerification/")
	public ResponseEntity<?> emailVerification(@Valid @RequestBody AdminSignupRequest adminsignuprequest)
	{
			try {
				Admin signupUser = userservice.signupAdmin(adminsignuprequest);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return new ResponseEntity<>("Admin user registered successfully", HttpStatus.OK);
		
		}
	    @PostMapping(value = "/login/")
		public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginrequest)
        {	
          try {
			UserShallowForm user=userservice.loginUser(loginrequest);
				if(user!=null)
					return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(user);
				else
					return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body("Login UnSucessful");
					
			} catch (Exception e) {
				// TODO Auto-generated catch block
				return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body("Login UnSucessful");
			}
	    
		} 
	    
	    @PostMapping(value = "/admin/login/")
		public ResponseEntity<?> loginAdmin(@Valid @RequestBody LoginRequest loginrequest)
		{
	    	try {
	    		AdminShallowForm admin=userservice.loginAdmin(loginrequest);
				if(admin!=null)
					return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(admin);
				else
					return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body("Login UnSucessful");
					
			} catch (Exception e) {
				// TODO Auto-generated catch block
				return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(e);
			}
	    
		} 
	    @GetMapping(value = "/user/profiledetails/{email}")
		public ResponseEntity<?> Userprofile(@PathVariable("email")String email)
		{
	    	try {
				UserShallowForm user=userservice.profileDetails(email);
				if(user!=null)
				{
				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(user);
				}else
				{
				return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body("User does not exist");
				}
			} catch (Exception e1) {
			return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body("User does not exist");
			}
	    
		} 
	    
	    @GetMapping(value = "/userExists/{email}")
		public ResponseEntity<?> UserExists(@PathVariable("email")String email)
		{
	    	try {
	    	User user=userrepository.findByEmail(email).get();
	    	
	    	if(user!=null)
	    	{
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(user);
	    	}else
	    	{return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(false);
	    	}
	    	}catch(Exception e)
	    	{
	    	return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(false);
	    	}
	    	
		}
	    @GetMapping(value = "/adminExists/{email}")
		public ResponseEntity<?> AdminExists(@PathVariable("email")String email)
		{
	    	try {
	    	Admin user=adminrepository.findByEmail(email).get();
	    	
	    	if(user!=null)
	    	{
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(user);
	    	}else
	    	{
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(false);
	    	}
	    	}catch(Exception e)
	    	{
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(false);
	    	}
	    	
		}
	    @DeleteMapping(value = "/removeAdmin/{email}")
		public ResponseEntity<?> deleteAdmin(@PathVariable("email")String email)
		{
	    	try {
	    	Admin user=adminrepository.findByEmail(email).get();
	    	
	    	if(user!=null)
	    	{
	    		adminrepository.deleteById(user.getId());
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("deleted");
	    	}else
	    	{
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Admin not exist");
	    	}
	    	}catch(Exception e)
	    	{
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Admin not exist");
	    	}
	    	
		}
	    
	    @DeleteMapping(value = "/removeUser/{email}")
		public ResponseEntity<?> deleteUser(@PathVariable("email")String email)
		{
	    	try {
	    	User user=userrepository.findByEmail(email).get();
	    	
	    	if(user!=null)
	    	{
	    		userrepository.deleteById(user.getId());
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("deleted");
	    	}else
	    	{
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("User not exist");
	    	}
	    	}catch(Exception e)
	    	{
	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("User not exist");
	    	}
	    	
		}
	    @PutMapping(value = "/user/updateProfile/{email}")
		public ResponseEntity<?> updateProfile(@PathVariable("email")String email,@RequestBody SignupRequest signuprequest)
		{
	    	try {
				UserShallowForm user=userservice.updateProfile(email,signuprequest);
				if(user!=null)
				{
				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(user);
				}else
				{
				return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body("Cannot update Profile");
				}
			} catch (Exception e1) {
			return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body("Cannot update Profile");
			}
	    
		} 
}
