package com.cartShare.controller;

import java.util.List;

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

import com.cartShare.entity.Product;
import com.cartShare.models.ProductsShallowForm;
import com.cartShare.requests.ProductRequest;
import com.cartShare.requests.ProductToAllStores;
import com.cartShare.requests.StoreRequest;
import com.cartShare.service.ProductService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping(value = "/admin/product/")
public class ProductController {

	@Autowired
	ProductService productservice;
	
	@PostMapping(value = "/allstores")
	public ResponseEntity<?> addProductToAllStores(@Valid @RequestBody ProductToAllStores productrequest) {
		try {
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
					.body(productservice.addProductToAllStores(productrequest));

		} catch (Exception e) {
			return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON)
					.body("Could not add the product");
		}
	}

	@PostMapping(value = "/add")
	public ResponseEntity<?> addProduct(@Valid @RequestBody ProductRequest productrequest) {
		try {
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
					.body(productservice.addProduct(productrequest));

		} catch (Exception e) {
			return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON)
					.body("Could not add the product");
		}
	}

	@PutMapping(value = "/{storeid}/{sku}")
	public ResponseEntity<?> UpdateProduct(@PathVariable("storeid") Long storeid, @PathVariable("sku") Long sku,
			@Valid @RequestBody ProductRequest productrequest) {
		try {
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON)
					.body(productservice.updateProduct(productrequest, storeid, sku));

		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON)
					.body("Could not update the product");
		}
	}

	@DeleteMapping(value = "/{storeid}/{sku}")
	public ResponseEntity<?> DeleteProduct(@PathVariable("storeid") Long storeid, @PathVariable("sku") Long sku) {
		try {
			productservice.deleteProduct(storeid, sku);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ResponseEntity<>("Deleted product successfully", HttpStatus.OK);
	}
	@GetMapping(value = "/all")
	public ResponseEntity<?> AllProductsOfAllStores() {
		List<ProductsShallowForm> products = null;
		try {
			products = productservice.getAllProductsOfStore();
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(products);
		} catch (Exception e) {
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Cannot retrieve products");
		}

	}
	@GetMapping(value = "/{storeid}")
	public ResponseEntity<?> AllProductsOfStore(@PathVariable("storeid") Long storeid) {
		List<ProductsShallowForm> products = null;
		try {
			products = productservice.getAllProductsOfStore(storeid);
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(products);
		} catch (Exception e) {
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Cannot retrieve products");
		}

	}

}
