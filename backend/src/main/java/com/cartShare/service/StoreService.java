package com.cartShare.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cartShare.entity.Address;
import com.cartShare.entity.Admin;
import com.cartShare.entity.Store;
import com.cartShare.repository.AdminRepository;
import com.cartShare.repository.StoreRepository;
import com.cartShare.requests.StoreRequest;
import org.springframework.stereotype.Service;

import com.cartShare.entity.Product;
import com.cartShare.models.ProductsShallowForm;
import com.cartShare.models.StoreShallowForm;
import com.cartShare.repository.StoreRepo;


@Service
public class StoreService {
	
	@Autowired
	StoreRepository storerepository;
	
	@Autowired
	AdminRepository adminrepository;
  
    @Autowired
    StoreRepo storeRepo;
	
	public ResponseEntity<Object> addStore(StoreRequest storerequest) throws Exception
	{
		Store store=new Store();
		 
		 String createdBy = storerequest.getCreatedBy();
		 
		 store.setName(storerequest.getName());
		
		 Address address=new Address();
			
			if(storerequest.getStreetNumber()!=null)
			   address.setStreetNumber(storerequest.getStreetNumber());
			if(storerequest.getStreetName()!=null)
			   address.setStreetName(storerequest.getStreetName());
			if(storerequest.getCity()!=null)
			   address.setCity(storerequest.getCity());
			if(storerequest.getState()!=null)
			   address.setState(storerequest.getState());
			if(storerequest.getZip()!=null)
			   address.setZip(storerequest.getZip());
			
			store.setAddress(address);
	 
			
	    if(createdBy!=null || createdBy!="")
		{
			try
			{
			 Admin admin= adminrepository.findByEmail(createdBy).get();
			 
			 store.setCreatedBy(admin);
			
			}catch(Exception e)
			{
				return new ResponseEntity<Object>("Admin email id does not exist", HttpStatus.BAD_REQUEST);
			}
		}
		
		Store res=storerepository.save(store);
		
		StoreShallowForm shallowForm=new StoreShallowForm();
		
		StoreShallowForm productShallow = shallowForm.convertToStoreShallowForm(res);
		
		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(productShallow);
		
	}

	public ResponseEntity<Object> updateStore(StoreRequest storerequest,Long storeid) throws Exception
	{
		 Store store = storerepository.findById(storeid).get();
		
		 String createdBy= storerequest.getCreatedBy();
		 store.setName(storerequest.getName());
		
		 Address address=new Address();
			
			if(storerequest.getStreetNumber()!=null)
			   address.setStreetNumber(storerequest.getStreetNumber());
			if(storerequest.getStreetName()!=null)
			   address.setStreetName(storerequest.getStreetName());
			if(storerequest.getCity()!=null)
			   address.setCity(storerequest.getCity());
			if(storerequest.getState()!=null)
			   address.setState(storerequest.getState());
			if(storerequest.getZip()!=null)
			   address.setZip(storerequest.getZip());
			
			store.setAddress(address);
	 
		  if(createdBy!=null || createdBy!="")
			{
			  try
				{
				 Admin admin= adminrepository.findByEmail(createdBy).get();
				 if(admin!=null)
				  store.setCreatedBy(admin);
				
				}catch(Exception e)
				{
					return new ResponseEntity<Object>("Admin email id does not exist", HttpStatus.BAD_REQUEST);
				}
		  }
		  
		 Store res= storerepository.save(store);
			
			StoreShallowForm shallowForm=new StoreShallowForm();
			
			StoreShallowForm productShallow = shallowForm.convertToStoreShallowForm(res);
			
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(productShallow);
			
	}
	public ResponseEntity<Object> deleteStore(Long id) throws Exception
	{
		Optional<Store> store=storerepository.findById(id);
		
		if(store!=null)
		{
		   if(store.get().getCurrentOrders().isEmpty())
		   {
			   storerepository.deleteById(id);
			   return new ResponseEntity<Object>("Store deleted successfully", HttpStatus.OK);
		   }
		   else
			  return new ResponseEntity<Object>("Store cannot be deleted as there are products available in the store", HttpStatus.OK);
		}else
		{
			return new ResponseEntity<Object>("Store does not exist with the given name", HttpStatus.BAD_REQUEST);
		}
	}
	public Store StoreById(Long storeid) throws Exception
	{
		
	Store store=storerepository.findById(storeid).get();
		
	 return store;
	}
	
	public List<Store> storesOfAdmin(Admin admin) throws Exception
	{
		
	List<Store> stores=storerepository.findAllByCreatedBy(admin);
	
	System.out.println("the stores are "+stores);
	 return stores;
  }
	
	public List<ProductsShallowForm> getAllProductsOfStore(Long storeId)
	{
		Optional<Store> store = storeRepo.findById(storeId) ;
		if(store != null)
		{
			List<Product> allProducts = store.get().getProducts();
			List<ProductsShallowForm> psfList  = new ArrayList<ProductsShallowForm>();
			for(Product product : allProducts)
			{
				ProductsShallowForm psf = new ProductsShallowForm();
				psf = psf.convertToShallowForm(product);
				psfList.add(psf);
			}
			return psfList ;
		}
		return null ;
	}

	public List<Store> allStores() {
		// TODO Auto-generated method stub
		
		return storeRepo.findAll();
	}
}
