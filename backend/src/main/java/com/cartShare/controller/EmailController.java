package com.cartShare.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cartShare.requests.MessageRequest;
import com.cartShare.service.EmailService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class EmailController {

	@Autowired
	EmailService emailservice;
	
	@PostMapping(value = "/email/{sender}/{receiver}")
	public ResponseEntity<?> sendMessage(@RequestBody MessageRequest messageRequest, @PathVariable long sender, @PathVariable long receiver) throws MessagingException {
	 
	 try
	 {
	 String res=emailservice.sendEmail(messageRequest, sender, receiver);
	
	 if(res.equals("Sent"))
	 {
		 return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("email sent!");
	 }else
	 {
		 return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Error");
	 }
	 }catch(Exception e)
	 {
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Error");
	 }
		
		
	}
	
	@GetMapping(value = "/email/{orderId}")
	public Object orderMail(@PathVariable long orderId) {
		return "hello";
		//return emailservice.orderEmail(orderId);
		//return new ResponseEntity<>("email sent!", HttpStatus.OK);
	}
	
}
