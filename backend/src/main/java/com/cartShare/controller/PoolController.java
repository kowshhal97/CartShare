package com.cartShare.controller;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.cartShare.models.ApplyPoolRequestBody;
import com.cartShare.models.NewPoolRequestBody;
import com.cartShare.service.PoolService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping(value = "/")
public class PoolController {

	@Autowired
	PoolService poolSvc;

	@PostMapping(value = "pool")
	public ResponseEntity<Object> newPool(@RequestBody NewPoolRequestBody request) {

		return new ResponseEntity<>(poolSvc.createPool(request), HttpStatus.OK);
	}

	@PutMapping(value = "pool")
	public ResponseEntity<Object> updatePool(@RequestBody NewPoolRequestBody request) {
		return new ResponseEntity<>(poolSvc.updatePoolDetails(request), HttpStatus.OK);
	}

	@PutMapping(value = "exitpool")
	public ResponseEntity<Object> exitPool(HttpServletRequest request) {
		return new ResponseEntity<>(poolSvc.exitPool(Long.parseLong(request.getParameter("poolUserId"))),
				HttpStatus.OK);
	}

	@GetMapping(value = "poolDetails")
	public ResponseEntity<Object> getPoolShallowForm(HttpServletRequest request) {

		return new ResponseEntity<>(poolSvc.getPoolDetails(Long.parseLong(request.getParameter("poolId"))),
				HttpStatus.OK);
	}

	@GetMapping(value = "allPoolDetails")
	public ResponseEntity<Object> getAllPoolShallowForm(HttpServletRequest request) {
		try {
			return new ResponseEntity<>(poolSvc.getAllPoolDetails(request.getParameter("poolName"),
					request.getParameter("neighbourhoodName"), request.getParameter("zipCode")), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(value = "poolCompleteDetails")
	public ResponseEntity<Object> getPoolDeepForm(HttpServletRequest request) {
		return new ResponseEntity<>(poolSvc.getPoolCompleteDetails(Long.parseLong(request.getParameter("poolId"))),
				HttpStatus.OK);
	}

	@GetMapping(value = "user/poolCompleteDetails")
	public ResponseEntity<Object> getPoolDeetailsOfUser(HttpServletRequest request) {
		try {
			return new ResponseEntity<>(poolSvc.getPoolDeetailsOfUser(Long.parseLong(request.getParameter("userId"))),
					HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping(value = "pool")
	public ResponseEntity<Object> deletePool(HttpServletRequest request) {
		return new ResponseEntity<>(poolSvc.deletePoolDetails(Long.parseLong(request.getParameter("poolId"))),
				HttpStatus.OK);
	}

	@PostMapping(value = "applyPool")
	public ResponseEntity<Object> applyPool(@RequestBody ApplyPoolRequestBody request) throws MessagingException {

		return new ResponseEntity<>(poolSvc.applyPool(request), HttpStatus.OK);
	}

	@GetMapping(value = "applyPool")
	public ResponseEntity<Object> applyPoolFromMail(HttpServletRequest request) {
		
		try {
			return new ResponseEntity<>(poolSvc.applyPoolFromMail(request), HttpStatus.OK);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

	}

}
