package com.cartShare.service;

import com.cartShare.entity.User;
import com.cartShare.models.OrderDeliveredEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class OrderDeliveredEmailThread implements Runnable {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    OrderDeliveredEmail orderDeliveredEmail;

    public OrderDeliveredEmailThread(){

    }
    public void orderDeliveredEmail(User deliverer, User reciever) throws MessagingException {
        MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper msg=new MimeMessageHelper(message,true);
        msg.setTo(deliverer.getEmail());
        msg.setSubject("You have completed your delivery");
        msg.setText("Hello "+deliverer.getScreenName()+" you have completed the order to "+reciever.getScreenName());
        mailSender.send(message);
        msg.setTo(reciever.getEmail());
        msg.setSubject("Your delivery has been completed");
        msg.setText("Hello "+reciever.getScreenName()+" your delivery has been completed by "+deliverer.getScreenName());
        mailSender.send(message);
    }


    @Override
    public void run() {

        try {
            orderDeliveredEmail(orderDeliveredEmail.getDeliverer(),orderDeliveredEmail.getReciever());
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }
}
