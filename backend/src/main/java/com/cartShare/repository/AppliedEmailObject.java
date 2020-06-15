package com.cartShare.repository;

import org.springframework.stereotype.Component;

@Component
public class AppliedEmailObject {

	private String text ;
	private String reciever ;
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getReciever() {
		return reciever;
	}
	public void setReciever(String reciever) {
		this.reciever = reciever;
	}
}
