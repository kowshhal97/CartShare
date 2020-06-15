package com.cartShare.controller;


import java.util.List;
import java.util.Optional;

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
import com.cartShare.entity.Store;
import com.cartShare.requests.StoreRequest;
import com.cartShare.service.StoreService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping(value = "/admin/store/")
public class StoreController {
	
	@Autowired
	StoreService storeservice;
	
	  @PostMapping(value = "/add/")
	  public ResponseEntity<Object> addStore(@Valid @RequestBody StoreRequest storerequest) throws Exception
	   {
		return storeservice.addStore(storerequest);
				
	   }
	 
	    @PutMapping(value = "/update/{storeid}")
		public ResponseEntity<?> UpdateStore(@PathVariable("storeid")Long storeid,@Valid @RequestBody StoreRequest storerequest)
		{
			
		       try {
					return storeservice.updateStore(storerequest,storeid);
				} catch (Exception e) {
					
				return new ResponseEntity<>("Could not update Store", HttpStatus.BAD_REQUEST);
				}
		}
	 
	 @DeleteMapping(value = "/delete/{storeid}")
		public ResponseEntity<?> DeleteStore(@PathVariable("storeid")Long storeid)
		{
		 try {
			return storeservice.deleteStore(storeid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
				
		}
	 
	 @GetMapping(value = "/{storeId}")
	 public ResponseEntity<?> StoreById(@PathVariable("storeId")Long storeid)
		{
		 
		Store store = null;
		try {
			store = storeservice.StoreById(storeid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(store);
		 
		}
	 
	 @GetMapping(value = "/allStores/{adminId}")
	 public ResponseEntity<?> StoresOfAdmin(@PathVariable("adminId")Long adminId)
		{
		 
		List<Store> stores = null;
		try {
			Admin admin=new Admin();
			admin.setId(adminId);
			stores = storeservice.storesOfAdmin(admin);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(stores);
		 
		}
	 @GetMapping(value = "/allStores")
	 public ResponseEntity<?> AllStores()
		{
		 
		List<Store> stores = null;
		try {
			
			stores = storeservice.allStores();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(stores);
		 
		}

}
