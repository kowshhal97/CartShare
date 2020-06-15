package com.cartShare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cartShare.entity.Test;
import com.cartShare.repository.TestTableRepository;



@Service
public class ApiService {
	@Autowired
	private TestTableRepository testTable;
	
	@Autowired
	private TestTableRepository testTableRepository ;
	
	public Test saveName(Test request)  {
		
		Test t1 = new Test();
		
		t1.setName(request.getName());
	
		Test a=testTable.save(t1);
		return a;
	}


}
