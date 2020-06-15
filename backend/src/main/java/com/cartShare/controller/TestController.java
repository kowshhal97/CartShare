package com.cartShare.controller;

import com.cartShare.entity.Test;
import com.cartShare.service.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping(value = "/")
public class TestController {

    @Autowired
    private ApiService apiService;

    @PostMapping
    public ResponseEntity<Object> testPost(@RequestBody Test request) {

        return new ResponseEntity<>(apiService.saveName(request), HttpStatus.OK);
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> testGet(@PathVariable("id") String id){
    	
        return new ResponseEntity<>("Get Working", HttpStatus.OK);
    }
}
