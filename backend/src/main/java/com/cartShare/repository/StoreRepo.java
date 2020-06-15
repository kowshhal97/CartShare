package com.cartShare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cartShare.entity.Pool;
import com.cartShare.entity.Store;

@Transactional
@Repository
public interface StoreRepo extends JpaRepository<Store, Long>  {

}
