package com.cartShare.service;

import com.cartShare.entity.OrderOfAUser;
import com.cartShare.entity.OrderedProduct;
import com.cartShare.entity.Product;
import com.cartShare.entity.User;
import com.cartShare.models.OrderConfirmationMail;
import com.cartShare.models.PickUpMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class OrderPlaceEmailThread implements Runnable {


    @Autowired
    OrderConfirmationMail orderConfirmationMail;

    @Autowired
    private JavaMailSender mailSender;

    public void orderPlacedMail(OrderOfAUser order) throws MessagingException {
        MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper msg=new MimeMessageHelper(message,true);
        User user=order.getUser().getUser();
        msg.setTo(user.getEmail());
        msg.setSubject("Order Confirmation");
        String text="order Contents\n";
        int count=1;
        for(OrderedProduct orderedProduct:order.getOrderedProducts()){
            Product product=orderedProduct.getProductOrdered();
            String sno=Integer.toString(count);
            text=text+sno+". "+"Item= "+product.getName()+" "+"Quantity= "+orderedProduct.getQuantity()+"\n";
            count++;
        }
        text+="Your Order will be Delivered by one of your fellow poolers, we will notify you when someone picks up your order from the store.";
        msg.setText(text);
        mailSender.send(message);
    }

    @Override
    public void run() {
        try {
            orderPlacedMail(orderConfirmationMail.getOrderOfAUser());
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }
}
