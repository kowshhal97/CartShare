package com.cartShare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cartShare.entity.Test;

@Transactional
@Repository
public interface TestTableRepository extends JpaRepository<Test, Long> {

}
