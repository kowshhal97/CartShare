package com.cartShare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cartShare.entity.Admin;
import com.cartShare.entity.Store;
import com.cartShare.entity.User;

@Repository
public interface StoreRepository extends JpaRepository<Store,Long> {
	
	 Optional<Store> getStoreByName(String name);
	 
	 List<Store> findAllByCreatedBy(Admin CreatedBy);

}
