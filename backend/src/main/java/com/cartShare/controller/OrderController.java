package com.cartShare.controller;

import com.cartShare.entity.OrderOfAUser;
import com.cartShare.requests.MessageRequest;
import com.cartShare.requests.orderRequests.CreateOrderForAUser;
import com.cartShare.requests.orderRequests.PickUpOrderRequest;
import com.cartShare.requests.orderRequests.UpdateOrderForAPool;
import com.cartShare.requests.orderRequests.UpdateStatus;
import com.cartShare.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;


@Transactional
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @PostMapping(value = "/user/{poolId}/{userId}")
    public ResponseEntity<Object> createAnOrderForAUser(@RequestBody CreateOrderForAUser orderForAUser, @PathVariable("poolId") Long poolId,
                                                        @PathVariable("userId") Long userId) throws MessagingException {

        return orderService.createOrderForAUser(orderForAUser, userId, poolId);
    }


    @PostMapping(value = "/{poolId}/{storeId}")
    public ResponseEntity<Object> createPoolOrder(@PathVariable("poolId") Long poolId, @PathVariable("storeId") Long storeId) {

        return orderService.createOrderForThePool(storeId, poolId);
    }

    @PutMapping(value = "/{poolId}/{userId}")
    public ResponseEntity<Object> updatePoolOrder(@PathVariable("poolId") Long poolId, @PathVariable("userId") Long userId,
                                                  @RequestBody UpdateOrderForAPool updateRequest) {
        return orderService.updateDeliverer(updateRequest, userId, poolId);

    }


    @PutMapping(value = "/status/{orderOfAUserId}")
    public ResponseEntity<Object> updateStatus(@PathVariable("orderOfAUserId") Long id, @RequestBody UpdateStatus updateRequest) throws MessagingException {
        return orderService.updateStatusForAnOrder(id, updateRequest);
    }

    @GetMapping(value = "/{poolId}")
    public ResponseEntity<Object> getPoolOrder(@PathVariable("poolId") Long id) {
        return orderService.getOrderOfAPool(id);
    }

    @GetMapping(value = "/user/{poolUserId}")
    public ResponseEntity<Object> getOrderOfAUser(@PathVariable("poolUserId") Long id) {
        return orderService.getOrderOfAUser(id);
    }

    @GetMapping(value = "/deliveryInstructions/{poolUserId}")
    public ResponseEntity<Object> getDeliveryInstructions(@PathVariable("poolUserId") Long id) {
        return orderService.getDeliveryInstructions(id);

    }


    @PutMapping(value = "/pickUp")
    public ResponseEntity<Object> pickUpOrder(@RequestBody PickUpOrderRequest pickUpOrderRequest) throws MessagingException {
        return orderService.PickUpOrder(pickUpOrderRequest);
    }

    @GetMapping(value = "/getUnPickedUpOrders/{poolId}")
    public ResponseEntity<Object> getUnPickedUpOrders(@PathVariable("poolId") Long id){
        return orderService.getUnPickeduporders(id);

    }

    @PostMapping(value = "/notDelivered/{orderOfAUserId}")
    public ResponseEntity<Object> notDeliveredEmail(@PathVariable("orderOfAUserId") Long id) {
        return orderService.notDeliveredEmail(id);
    }


    @PostMapping(value = "/PlacedWithPickups/{orderOfAUserIdOfDeliverer}")
    public ResponseEntity<Object> orderPlacedWithPickups(@RequestBody PickUpOrderRequest pickUpOrderRequest,@PathVariable("orderOfAUserIdOfDeliverer") Long id) throws MessagingException {
        return orderService.orderPlaceWithPickUpEmail(pickUpOrderRequest,id);
    }

    @PostMapping(value = "/onlyPickup}")
    public ResponseEntity<Object> onlyPickup(@RequestBody PickUpOrderRequest pickUpOrderRequest) throws MessagingException {
        return orderService.onlyPickups(pickUpOrderRequest);
    }



}
