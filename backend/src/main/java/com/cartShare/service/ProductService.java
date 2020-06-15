package com.cartShare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cartShare.entity.Product;
import com.cartShare.entity.Store;
import com.cartShare.models.ProductsShallowForm;
import com.cartShare.repository.ProductRepository;
import com.cartShare.repository.StoreRepository;
import com.cartShare.requests.ProductRequest;
import com.cartShare.requests.ProductToAllStores;

@Service
public class ProductService {

	@Autowired
	ProductRepository productrepository;

	@Autowired
	StoreRepository storerepository;

	public ProductsShallowForm addProduct(ProductRequest productrequest) throws Exception {
		Product product = new Product();

		product.setName(productrequest.getName());
		product.setDescription(productrequest.getDescription());
		product.setImageUrl(productrequest.getImageUrl());
		product.setPrice(productrequest.getPrice());
		product.setQuantity(productrequest.getQuantity());
		product.setUnitType(productrequest.getUnitType());
//		product.setSku(productrequest.getSku());
		Long storeId = productrequest.getStoreid();

		product.setStoreid(storeId);

		Store store = storerepository.findById(storeId).get();

		if (store != null)
			product.setStore(store);

		Product res = productrepository.save(product);

		ProductsShallowForm shallowForm = new ProductsShallowForm();
		ProductsShallowForm productShallow = shallowForm.convertToShallowForm(res);

		return productShallow;
	}

	public Object addProductToAllStores(@Valid ProductToAllStores productrequest) {
		Product product = new Product();

		product.setName(productrequest.getName());
		product.setDescription(productrequest.getDescription());
		product.setImageUrl(productrequest.getImageUrl());
		product.setPrice(productrequest.getPrice());
		product.setQuantity(productrequest.getQuantity());
		product.setUnitType(productrequest.getUnitType());
//		product.setSku(productrequest.getSku());
	
		
		for(Long id : productrequest.getStores())
		{
			Store store = new Store();
			store.setId(id);
			product.setStore(store);
			product.setStoreid(id);
			productrepository.save(product);
		}

//		product.setStoreid(storeId);
//
//		Store store = storerepository.findById(storeId).get();
//
//		if (store != null)
//			product.setStore(store);
//
//		Product res = productrepository.save(product);
//
//		ProductsShallowForm shallowForm = new ProductsShallowForm();
//		ProductsShallowForm productShallow = shallowForm.convertToShallowForm(res);

		return new ResponseEntity<Object>("Added product Succesfuly", HttpStatus.OK);
//		return null;
	}

	public ProductsShallowForm updateProduct(ProductRequest productrequest, Long storeid, Long sku) throws Exception {

		Product product = productrepository.findBySkuAndStoreid(sku, storeid);

		product.setName(productrequest.getName());
		product.setDescription(productrequest.getDescription());
		product.setImageUrl(productrequest.getImageUrl());
		product.setPrice(productrequest.getPrice());
		product.setQuantity(productrequest.getQuantity());
		product.setUnitType(productrequest.getUnitType());
		product.setSku(sku);

		product.setStoreid(storeid);

		Store store = storerepository.findById(storeid).get();

		if (store != null)
			product.setStore(store);

		Product res = productrepository.save(product);

		ProductsShallowForm shallowForm = new ProductsShallowForm();
		ProductsShallowForm productShallow = shallowForm.convertToShallowForm(res);

		return productShallow;

	}

	public ResponseEntity<?> deleteProduct(Long storeid, Long sku) throws Exception {

		productrepository.deleteProductByStoreIdandsku(storeid, sku);

		return new ResponseEntity<Object>("Deleted product", HttpStatus.OK);
	}
	public List<ProductsShallowForm> getAllProductsOfStore() throws Exception {

		List<Product> products = new ArrayList<>();
		products = productrepository.findAll();
//		products = productrepository.findAllByStoreId(storeid);

		List<ProductsShallowForm> shallowProducts = new ArrayList<>();
		for (int i = 0; i < products.size(); i++) {
			ProductsShallowForm shallowForm = new ProductsShallowForm();
			ProductsShallowForm productShallow = shallowForm.convertToShallowForm(products.get(i));
			shallowProducts.add(productShallow);

		}
		return shallowProducts;
	}
	public List<ProductsShallowForm> getAllProductsOfStore(Long storeid) throws Exception {

		List<Product> products = new ArrayList<>();
		products = productrepository.findAll();
		products = productrepository.findAllByStoreId(storeid);

		List<ProductsShallowForm> shallowProducts = new ArrayList<>();
		for (int i = 0; i < products.size(); i++) {
			ProductsShallowForm shallowForm = new ProductsShallowForm();
			ProductsShallowForm productShallow = shallowForm.convertToShallowForm(products.get(i));
			shallowProducts.add(productShallow);

		}
		return shallowProducts;
	}

}
