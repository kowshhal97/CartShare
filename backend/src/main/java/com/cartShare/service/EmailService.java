package com.cartShare.service;

import java.util.Optional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.cartShare.entity.OrderOfAUser;
import com.cartShare.entity.User;
import com.cartShare.repository.OrderOfAUserRepository;
import com.cartShare.repository.PoolRepo;
import com.cartShare.repository.PoolUserRepo;
import com.cartShare.repository.UserRepository;
import com.cartShare.requests.MessageRequest;

@Service
public class EmailService {
	
	@Autowired
	UserRepository userrepository;
	
	@Autowired
	OrderOfAUserRepository orderOfAUserRepository;
	
	@Autowired
	private JavaMailSender mailSender;
	
	public String sendEmail(MessageRequest messageRequest, long sender, long receiver) throws MessagingException {
	
		String receive=userrepository.findById(receiver).get().getEmail();
		
		MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper msg=new MimeMessageHelper(message,true);
        msg.setTo(receive);
        
        msg.setSubject(messageRequest.getSubject());
        msg.setText(messageRequest.getMessage());
        
        mailSender.send(message);
        
        return "Sent";
	}	
	
	public Object orderEmail(long id) {
		Optional<OrderOfAUser> o = orderOfAUserRepository.findById(id);
		return o;
	}	
}
