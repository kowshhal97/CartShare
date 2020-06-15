package com.cartShare.repository;

import com.cartShare.entity.OrderedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderedProductRepo extends JpaRepository<OrderedProduct, Long> {

}
