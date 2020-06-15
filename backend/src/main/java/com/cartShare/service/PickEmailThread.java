package com.cartShare.service;

import com.cartShare.entity.OrderOfAUser;
import com.cartShare.entity.OrderedProduct;
import com.cartShare.entity.Product;
import com.cartShare.entity.User;
import com.cartShare.models.PickUpMail;
import com.cartShare.requests.orderRequests.PickUpOrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.LinkedList;
import java.util.List;

@Component
public class PickEmailThread implements Runnable {

    @Autowired
    PickUpMail pickUpMail;


    public  PickEmailThread(){

    }


    @Autowired
    private JavaMailSender mailSender;


    public void deliveryInstructionsEmail(List<OrderOfAUser> deliveries, User deliverer) throws MessagingException {
        MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper msg=new MimeMessageHelper(message,true);
        msg.setTo(deliverer.getEmail());
        msg.setSubject("Delivery instructions for your picked order");
        int flag=1;
        String text="";
        int count=1;
        for(OrderOfAUser i:deliveries){
            User deliveryTo=i.getUser().getUser();
//            if(deliveryTo.getId()==deliverer.getId()){
//                continue;
//            }
            String deliverySno=Integer.toString(flag);
            text+=deliverySno+" .";
            text+="\tOrder for "+deliveryTo.getScreenName()+"\n";
            for(OrderedProduct orderedProduct:i.getOrderedProducts()){
                Product product=orderedProduct.getProductOrdered();
                String sno=Integer.toString(count);

                text+="\t\t"+sno+". "+"Item= "+product.getName()+" "+"Quantity= "+orderedProduct.getQuantity()+"\n";
                count++;
            }
            text+="\tDelivery Address:"+"\n";
            text+="\t\t"+deliveryTo.getScreenName()+"\n";
            text+="\t\t"+deliveryTo.getAddress().getStreetName()+"\n";
            text+="\t\t"+deliveryTo.getAddress().getStreetNumber()+"\n";
            text+="\t\t"+deliveryTo.getAddress().getCity()+"\n";
            text+="\t\t"+deliveryTo.getAddress().getState()+"\n";
            text+="\t\t"+deliveryTo.getAddress().getZip()+"\n";

        }
        msg.setText(text);
        mailSender.send(message);
    }
    public void pickUpEmail() throws MessagingException {
        List<OrderOfAUser> order=pickUpMail.getPickUpEmails();
        if(order.size()>0) {
            User deliverer = order.get(0).getDeliveredBy().getUser();
            for (OrderOfAUser i : order) {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper msg = new MimeMessageHelper(message, true);
                msg.setTo(i.getUser().getUser().getEmail());
                msg.setSubject("Order Pickup");
                if (i.getUser().getUser().getId() != deliverer.getId()) {
                    msg.setText("Your order has been Picked Up by " + deliverer.getScreenName());
                } else {
                    msg.setSubject("Order Pickup");
                    msg.setText("You have picked up all your deliveries!");
                }
                mailSender.send(message);
            }
            deliveryInstructionsEmail(order, deliverer);
        }
    }

    @Override
    public void run() {
        try {
            pickUpEmail();

        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }
}
