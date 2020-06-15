package com.cartShare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.cartShare.entity.Order;
import com.cartShare.entity.OrderOfAUser;
import com.cartShare.entity.PoolUser;
import com.cartShare.entity.User;

import java.util.List;

@Transactional
public interface OrderOfAUserRepository extends JpaRepository<OrderOfAUser, Long> {
	
	public OrderOfAUser findByOrdergroupAndOrderedByAndStatusNot(Order ord, PoolUser puser,String status);


	public List<OrderOfAUser> findAllByOrderedBy(PoolUser orderedBy);
}
