package com.cartShare.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cartShare.entity.Admin;
import com.cartShare.entity.Product;
import com.cartShare.entity.Store;

    @Transactional
	@Repository
	public interface ProductRepository extends JpaRepository<Product,Long> {
		
		@Modifying
		@Query(value="delete from Product p where p.storeid=:storeid and p.sku=:sku")
		void deleteProductByStoreIdandsku(Long storeid, Long sku);

		List<Product> findAllByStoreId(Long storeid);

		Product findBySkuAndStoreid(Long sku,Long storeid);
}
