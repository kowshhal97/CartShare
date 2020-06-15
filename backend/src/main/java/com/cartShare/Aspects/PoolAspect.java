package com.cartShare.Aspects;

import com.cartShare.Exception.CustomException;
import com.cartShare.entity.PoolUser;
import com.cartShare.entity.User;
import com.cartShare.models.ApplyPoolRequestBody;
import com.cartShare.repository.PoolUserRepo;
import com.cartShare.repository.UserRepository;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.cartShare.entity.Pool;
import com.cartShare.models.NewPoolRequestBody;
import com.cartShare.repository.PoolRepo;

import java.util.Optional;

@Aspect
@Order(0)
@Component
public class  PoolAspect {
	
	@Autowired
	PoolRepo poolRepo ;

	@Autowired
	PoolUserRepo poolUserRepo ;

	@Autowired
	UserRepository userRepo ;

	@Pointcut("execution(public * com.cartShare.controller.*.newPool(..)) || execution(public * com.cartShare.controller.*.updatePool(..)))")
	public void poolCreationandUpdation() {

	}

	@Before("execution(public * com.cartShare.controller.*.applyPool(..))")
	public void beforeapplyPool(JoinPoint joinPoint) throws Throwable {
		ApplyPoolRequestBody request =((ApplyPoolRequestBody) joinPoint.getArgs()[0]);
		Optional<User> usr = userRepo.findById(request.getUserId());
		if(usr == null)
			throw new CustomException("User Doesn't Exist");

		PoolUser poolUser = poolUserRepo.findByUser(usr.get());
		if(poolUser != null)
			throw new CustomException("User Has been allready registered for a pool");

	}
	
	@Before("execution(public * com.cartShare.controller.*.updatePool(..)) || execution(public * com.cartShare.controller.*.newPool(..)) ")
	public void beforNewPool(JoinPoint joinPoint)  throws Throwable {
		NewPoolRequestBody poolRequestBody = ((NewPoolRequestBody) joinPoint.getArgs()[0]);
		
		System.out.println("In Aspect of pool");
		
		if(poolRequestBody.getId() != null)
		{
		Pool pool =	poolRepo.findByName(poolRequestBody.getName());
			if(pool != null && pool.getId() != poolRequestBody.getId())
			{
				throw new CustomException("Pool Name Allready Present");
//				return new ResponseEntity<>("Pool Name Allready Present", HttpStatus.BAD_REQUEST);
			}
			
			
		}
		else
		{
			Pool pool =	poolRepo.findByNameOrPoolId(poolRequestBody.getName(),poolRequestBody.getPoolId());
			if(pool != null)
			{
				throw new CustomException("Pool Id Allready Present");
//				return new ResponseEntity<>("Pool Id Allready Present", HttpStatus.BAD_REQUEST);
			}
		}
//		return null;
	
	
	}

}
