package com.cartShare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cartShare.entity.PoolUser;
import com.cartShare.entity.User;

@Transactional
@Repository
public interface PoolUserRepo extends JpaRepository<PoolUser, Long> {
	
	public  PoolUser findByUser(User user);

}
