package com.cartShare.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.cartShare.repository.AppliedEmailObject;

@Component
public class ApplyEmailThread implements Runnable {
	
	@Autowired
	AppliedEmailObject aplliedEmailObject ;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public void sendEmail() throws MessagingException {
		MimeMessage msg = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(msg, true);
		helper.setTo(aplliedEmailObject.getReciever());
		helper.setFrom("yashtrivedi618@gmai.com");
		helper.setSubject("Pool Join Request");
		helper.setText(aplliedEmailObject.getText(), true);
		javaMailSender.send(msg);
	}

	@Override
	public void run() {
		try {
			sendEmail();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
