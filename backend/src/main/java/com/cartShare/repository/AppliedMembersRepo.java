package com.cartShare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cartShare.entity.AppliedMembers;
import com.cartShare.entity.User;

@Transactional
@Repository
public interface AppliedMembersRepo extends JpaRepository<AppliedMembers, Long>{
	
	List<AppliedMembers> findByUser(User user);

}
