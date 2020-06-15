package com.cartShare.Aspects;

import java.util.List;
import java.util.Optional;

import com.cartShare.Exception.CustomException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.cartShare.entity.Order ;
import com.cartShare.entity.OrderOfAUser;
import com.cartShare.entity.OrderedProduct;
import com.cartShare.entity.Store;
import com.cartShare.repository.StoreRepository;

@Aspect
@org.springframework.core.annotation.Order(0)
@Component
public class StoreAspect {

	@Autowired
	StoreRepository storeRepo ;
	
	
	
	@Before("execution(public * com.cartShare.controller.*.DeleteStore(..))")
	public void deleteStore(JoinPoint joinPoint) {
		Long storeId = ((Long) joinPoint.getArgs()[0]);
		Optional<Store> str = storeRepo.findById(storeId);
		System.out.println("Before deletion store");
		if(str== null)
			throw new CustomException("Store Not Found");
//			return new ResponseEntity<>("Store Not Found", HttpStatus.BAD_REQUEST);
//			throw new Exception("Store Not Found");
		if(str.get().getCurrentOrders() != null)
			throw new CustomException("Store Has Unfullfilled Orders");
//			return new ResponseEntity<>("Store Has Unfullfilled Orders", HttpStatus.BAD_REQUEST);
//			throw new Exception("Store Has Unfullfilled Orders"); 
//		return null;
	
	}
	
	@Before("execution(public * com.cartShare.controller.ProductController.DeleteProduct(..))")
	public void deleteProduct(JoinPoint joinPoint)  throws Throwable {
		Long storeId = ((Long) joinPoint.getArgs()[0]);
		Long sku = ((Long) joinPoint.getArgs()[1]);
		Optional<Store> str = storeRepo.findById(storeId);
		System.out.println("BEfore deletion Product");
		if(str== null)
			throw new CustomException("Store Not found");
		
		List<Order> orders = str.get().getCurrentOrders();
		if(orders != null)
		{
			for(Order order : orders)
			{
				 List<OrderOfAUser> ordersOfAUser = order.getOrders();
				 for(OrderOfAUser orderOfAUser :ordersOfAUser )
				 {
					List<OrderedProduct> orderedProducts = orderOfAUser.getOrderedProducts();
					for(OrderedProduct orderedProduct : orderedProducts)
					{
						if(orderedProduct.getProductOrdered().getStoreid() == storeId && orderedProduct.getProductOrdered().getSku() == sku )
						{
							throw new CustomException("Product Has Unfullfilled Orders");
//							return new ResponseEntity<>("Product Has Unfullfilled Orders", HttpStatus.BAD_REQUEST);
//							throw new Exception("Product Has Unfullfilled Orders");
						}
					}
				 }
			}
		}
	
	}
	
	
}
