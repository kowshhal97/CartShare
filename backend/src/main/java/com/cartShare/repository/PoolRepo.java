package com.cartShare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cartShare.entity.Pool;

@Transactional
@Repository
public interface PoolRepo extends JpaRepository<Pool, Long> {

	List<Pool> findByNameLikeAndNeighbourhoodNameLikeAndZipCodeLike(String name , String nName , String zipCode);
	
	Pool findByNameOrPoolId(String name , String poolId);

	Pool findByName(String name);
	
}
