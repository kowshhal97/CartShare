package com.cartShare.Aspects;

import com.cartShare.entity.OrderOfAUser;
import com.cartShare.Exception.CustomException;
import com.cartShare.entity.Pool;
import com.cartShare.entity.PoolUser;
import com.cartShare.entity.User;
import com.cartShare.repository.PoolRepo;
import com.cartShare.repository.PoolUserRepo;
import com.cartShare.repository.UserRepository;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(1)
public class OrderAspect {


    @Autowired
    UserRepository userRepository;
    
    @Autowired
    PoolRepo poolRepo;

    @Autowired
    PoolUserRepo poolUserRepo;
    
    @Pointcut("execution(public * com.cartShare.controller.OrderController.*(..))")
    public void allOrderMethods() {

    }

    @Before("execution(public * com.cartShare.controller.OrderController.createAnOrderForAUser(..))")
    public void orderPlaceValidate(JoinPoint joinPoint) throws Exception {
        User user=userRepository.findById((long)joinPoint.getArgs()[2]).get();
        if(user.getAddress()==null){
            throw new CustomException("Address not entered");
        }
        Pool pool=poolRepo.findById((long)joinPoint.getArgs()[1]).get();
        for(OrderOfAUser orderOfAUser:pool.getCurrentOrder().getOrders()){
            if(orderOfAUser.getUser().getUser().getId() == (long)joinPoint.getArgs()[2]) {
            	throw new CustomException("You already have an order!");
            }
            
        }
    }
    

    @Before("execution(public * com.cartShare.controller.OrderController.updatePoolOrder(..))")
    public void updatePoolOrderValidate(JoinPoint joinPoint) throws Exception {
    	
    		User user = userRepository.findById((long)joinPoint.getArgs()[1]).get();
    		if(user==null){
                throw new CustomException("User not found");
            }
 
    }
    
    
    
    @Before("execution(public * com.cartShare.controller.OrderController.getUnPickedUpOrders(..))")
    public void getUnPickedUpOrdersValidate(JoinPoint joinPoint) throws Exception {
    		System.out.println((long)joinPoint.getArgs()[0]);
    		Pool pool = poolRepo.findById((long)joinPoint.getArgs()[0]).get();

    		if(pool == null) {
    			throw new CustomException("Pool not found");
    	    }
    }
    
    @Before("execution(public * com.cartShare.controller.OrderController.getPoolOrder(..))")
    public void getOrderPoolValidate(JoinPoint joinPoint) {
    	
    		System.out.println((long)joinPoint.getArgs()[0]);
    		Pool pool = poolRepo.findById((long)joinPoint.getArgs()[0]).get();
    		if(pool == null) {
    			throw new CustomException("Pool not found");
    		}
    }
    
    @Before("execution(public * com.cartShare.controller.OrderController.getOrderOfAUser(..))")
    public void getOrderOfAUserValidate(JoinPoint joinPoint) throws Exception {
    		PoolUser poolUser = poolUserRepo.findById((long)joinPoint.getArgs()[0]).get();
    		if(poolUser == null) {
    			throw new CustomException("PoolUser not found");
    		}
    }
}
