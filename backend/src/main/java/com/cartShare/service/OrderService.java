package com.cartShare.service;

import com.cartShare.entity.*;
import com.cartShare.models.*;
import com.cartShare.repository.*;
import com.cartShare.requests.MessageRequest;
import com.cartShare.requests.orderRequests.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.LinkedList;
import java.util.List;


@Service
public class OrderService {
    @Autowired
    OrderRepository orderTable;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    ProductRepository productTable;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PoolRepo poolRepo;

    @Autowired
    StoreRepo storeRepo;

    @Autowired
    OrderOfAUserRepository orderOfAUserRepository;

    @Autowired
    OrderedProductRepo orderedProductRepo;

    @Autowired
    UserRepository userTable;

    @Autowired
    PoolUserRepo poolUserRepo;

    @Autowired
    PickEmailThread pickEmailThread;

    @Autowired
    PickUpMail pickUpMail;

    @Autowired
    OrderPlaceEmailThread orderPlacedMail;

    @Autowired
    OrderConfirmationMail orderConfirmationMail;

    @Autowired
    OrderDeliveredEmailThread orderDeliveredEmailThread;

    @Autowired
    OrderDeliveredEmail orderDeliveredEmail;

    public String getStatusOfUser(int credits){
        if(credits<=-6){
            return "red";
        }
        else if(credits<=-4){
            return "yellow";
        }
        else{
            return "green";
        }
    }



    public boolean AlreadyExistingOrderCheck(Long poolId,Long userId){
        Pool pool=poolRepo.findById(poolId).get();
        for(OrderOfAUser orderOfAUser:pool.getCurrentOrder().getOrders()){
            if(orderOfAUser.getUser().getUser().getId()==userId)
            return true;
        }
        return false;
    }

    public String getDetailsOfTheOrder(OrderOfAUser orderOfAUser,String spacing) {
        String text = "";
        int count = 1;
        for (OrderedProduct orderedProduct : orderOfAUser.getOrderedProducts()) {
            Product product = orderedProduct.getProductOrdered();
            String sno = Integer.toString(count);
            text = text + spacing + sno + ". " + "Item= " + product.getName() + " " + "Quantity= " + orderedProduct.getQuantity() + "\n";
            count++;
        }
        return text;
    }



    public ResponseEntity<Object> orderPlaceWithPickUpEmail(PickUpOrderRequest mail,Long orderOfDelivererId) throws MessagingException {
        MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper msg=new MimeMessageHelper(message,true);
       OrderOfAUser orderOfAUser= orderOfAUserRepository.findById(orderOfDelivererId).get();
       User user=orderOfAUser.getUser().getUser();
       msg.setTo(user.getEmail());
       String text="";
       text+="Your Order Confirmation:\n";
       text+=getDetailsOfTheOrder(orderOfAUserRepository.findById(orderOfDelivererId).get(),"");
       text+="Pick Up Requests:\n";
       int flag=1;
       if(mail.getPickupRequests()!=null) {
           for (OrderOfUserRequest i : mail.getPickupRequests()) {
               text += Integer.toString(flag) + ".\n" + getDetailsOfTheOrder(orderOfAUserRepository.findById(i.getOrderOfAUserId()).get(), "\t");
           }
       }
       msg.setSubject("Order Confirmation email!");
       msg.setText(text);
       mailSender.send(message);
       return new ResponseEntity<>("Mail sent!",HttpStatus.OK);
    }

    public ResponseEntity<Object> onlyPickups(PickUpOrderRequest pickUpOrderRequest) throws MessagingException {
        MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper msg=new MimeMessageHelper(message,true);
        String text="";
        text+="Pick Up Requests:\n";
        int flag=1;
        for(OrderOfUserRequest i:pickUpOrderRequest.getPickupRequests()){
            text+=Integer.toString(flag)+".\n"+getDetailsOfTheOrder(orderOfAUserRepository.findById(i.getOrderOfAUserId()).get(),"\t");
        }
        msg.setSubject("Pick Ups slelected Email!");
        msg.setText(text);
        mailSender.send(message);
        return new ResponseEntity<>("Mail sent!",HttpStatus.OK);
    }

    public ResponseEntity<Object> notDeliveredEmail(Long orderForAUserId){
        OrderOfAUser notDeliveredOrder=orderOfAUserRepository.findById(orderForAUserId).get();
        SimpleMailMessage msg = new SimpleMailMessage();
        PoolUser deliverer=notDeliveredOrder.getDeliveredBy();
        msg.setFrom("notifications.applications@gmail.com");
        msg.setTo(deliverer.getUser().getEmail());
        msg.setSubject("Deliver not recieved");
        msg.setText("Hello "+deliverer.getUser().getScreenName()+" We have recieved a complaint that the deliver of Mr."+notDeliveredOrder.getUser().getUser().getScreenName()+" has not been recieved, Kindly look into it!");
        mailSender.send(msg);
        return new ResponseEntity<>("email sent!",HttpStatus.OK);
    }



    public ResponseEntity<Object> createOrderForAUser(CreateOrderForAUser orderForAUser, Long userId, Long poolId) {

        if (AlreadyExistingOrderCheck(poolId, userId)) {
            return new ResponseEntity<>("You already have an order!", HttpStatus.METHOD_NOT_ALLOWED);
        }
        OrderOfAUser newOrder = new OrderOfAUser();
        List<OrderedProduct> orders = new LinkedList<>();
        for (CreateProductInAnOrder i : orderForAUser.getProduct()) {
            OrderedProduct orderedProduct = new OrderedProduct();
            Product product = productTable.findBySkuAndStoreid(i.getSku(), i.getStoreId());
            orderedProduct.setProductOrdered(product);
            orderedProduct.setQuantity(i.getQuantity());
            orders.add(orderedProduct);
        }

        User user = userRepository.findById(userId).get();
        newOrder.setUser(user.getPoolUser());

        PoolUser poolUser = user.getPoolUser();
        if (orderForAUser.getPickedUpBy().equals("self")) {
            newOrder.setDeliveredBy(poolUser);
        } else {
            int credits = poolUser.getCredits();
            credits--;
            poolUser.setCredits(credits);

            poolUser.setConstributionStatus(getStatusOfUser(poolUser.getCredits()));

        }
        Order currentorder = poolRepo.findById(poolId).get().getCurrentOrder();
        currentorder.getOrders().add(newOrder);
        newOrder.setOrdergroup(currentorder);
        newOrder.setOrderedProducts(orders);
        newOrder.setStatus("Order Placed!");
        OrderOfAUser savedOrder=orderOfAUserRepository.save(newOrder);
        poolUser.getMyOrder().add(newOrder);
        for (OrderedProduct i : orders) {
            i.setOrderBelongsTo(newOrder);
            orderedProductRepo.save(i);
        }

        poolUserRepo.save(poolUser);

        if (!orderForAUser.getPickedUpBy().equals("self")) {
            Thread orderEmailThread = new Thread(orderPlacedMail, "orderPlacedEmail");
            orderConfirmationMail.setOrderOfAUser(newOrder);
            orderEmailThread.start();
        }
        return new ResponseEntity<>(savedOrder.getId(), HttpStatus.OK);

    }


    public ResponseEntity<Object> createOrderForThePool(Long storeId,Long poolId){


        Store selectedStore=storeRepo.findById(storeId).get();
        Pool currentPool=poolRepo.findById(poolId).get();
        Order newOrderOfPool=new Order();
        newOrderOfPool.setStore(selectedStore);
        newOrderOfPool.setOrderedPool(currentPool);
        currentPool.setCurrentOrder(newOrderOfPool);
        selectedStore.getCurrentOrders().add(newOrderOfPool);

        newOrderOfPool = orderTable.save(newOrderOfPool);
        poolRepo.save(currentPool);

        return new ResponseEntity<>(newOrderOfPool.getId(),HttpStatus.OK);
    }


    public ResponseEntity<Object> updateDeliverer(UpdateOrderForAPool updateRequest,Long userId, Long poolId){
        PoolUser deliverer=userRepository.findById(userId).get().getPoolUser();
        int credits=deliverer.getCredits();
        List<OrderOfAUser>deliveries=deliverer.getDeliveries();
        if(deliveries==null){
            deliveries= new LinkedList<>();
        }
        for(EachDelivery i :updateRequest.getDeliveries()){
            OrderOfAUser orderOfAUser=orderOfAUserRepository.findById(i.getOrderOfAUserId()).get();
            deliveries.add(orderOfAUser);
            orderOfAUser.setDeliveredBy(deliverer);
            orderOfAUserRepository.save(orderOfAUser);
            credits++;
        }
        deliverer.setCredits(credits);
        deliverer.setConstributionStatus(getStatusOfUser(credits));
        poolUserRepo.save(deliverer);

        return new ResponseEntity<>("deliverer updated",HttpStatus.OK);
    }


    public ResponseEntity<Object> getDeliveryInstructions(Long poolUserId){
        List<OrderOfAUser> deliveries=poolUserRepo.findById(poolUserId).get().getDeliveries();
        List<DeliveryShallowForm> deliveryShallowFormList=new LinkedList<>();
        for(OrderOfAUser i:deliveries){
            if(i.getStatus().equals("Delivered")){
                continue;
            }
            List<OrderedProduct> orderedProduct=i.getOrderedProducts();
            List<OrderedProductsShallow> orderedProductsShallowList=new LinkedList<>();
            for(OrderedProduct j:orderedProduct){
                ProductsShallowForm productsShallowForm=new ProductsShallowForm();
                productsShallowForm=productsShallowForm.convertToShallowForm(j.getProductOrdered());
                OrderedProductsShallow orderedProductsShallow=new OrderedProductsShallow();
                orderedProductsShallow=orderedProductsShallow.convertToForm(j,productsShallowForm);
                orderedProductsShallowList.add(orderedProductsShallow);
            }
            GetOrderOfAUserModel getOrderOfAUserModel=new GetOrderOfAUserModel();
            getOrderOfAUserModel=getOrderOfAUserModel.convert(orderedProductsShallowList,i,i.getStatus(),null);
            UserShallowForm userShallowForm =new UserShallowForm();
            userShallowForm=userShallowForm.convertToUserShallowForm(i.getUser().getUser());
            DeliveryShallowForm deliveryShallowForm=new DeliveryShallowForm();
            deliveryShallowForm=deliveryShallowForm.convert(getOrderOfAUserModel,userShallowForm);
            deliveryShallowFormList.add(deliveryShallowForm);
        }
        return new ResponseEntity<>(deliveryShallowFormList,HttpStatus.OK);
    }




    public ResponseEntity<Object> getOrderOfAUser(Long poolUserId){
        OrderOfAUser orderOfAUser=null;
        PoolUser poolUser=poolUserRepo.findById(poolUserId).get();
        Order order=poolUser.getCurrentPool().getCurrentOrder();
        if(order==null||order.getOrders().size()==0){
            List<OrderOfAUser> allOrders=orderOfAUserRepository.findAllByOrderedBy(poolUser);

            if(allOrders==null||allOrders.size()==0){
                return new ResponseEntity<>(null,HttpStatus.OK);
            }
            orderOfAUser=allOrders.get(allOrders.size()-1);
        }
        else {
            for (OrderOfAUser i : order.getOrders()) {
                if (i.getUser().getId() == poolUserId) {
                    orderOfAUser = i;
                    break;
                }
            }
        }
        assert orderOfAUser != null;
        List<OrderedProduct> orderedProduct=orderOfAUser.getOrderedProducts();
        List<OrderedProductsShallow> orderedProductsShallowList=new LinkedList<>();
        for(OrderedProduct j:orderedProduct){
            ProductsShallowForm productsShallowForm=new ProductsShallowForm();
            productsShallowForm=productsShallowForm.convertToShallowForm(j.getProductOrdered());
            OrderedProductsShallow orderedProductsShallow=new OrderedProductsShallow();
            orderedProductsShallow=orderedProductsShallow.convertToForm(j,productsShallowForm);
            orderedProductsShallowList.add(orderedProductsShallow);
        }
        GetOrderOfAUserModel getOrderOfAUserModel=new GetOrderOfAUserModel();
        UserShallowForm pickedUpBy=new UserShallowForm();
        PoolUser deliverer=orderOfAUser.getDeliveredBy();
        if(deliverer==null){
            pickedUpBy=null;
        }
        else {
            pickedUpBy = pickedUpBy.convertToUserShallowForm(deliverer.getUser());
        }
        getOrderOfAUserModel=getOrderOfAUserModel.convert(orderedProductsShallowList,orderOfAUser,orderOfAUser.getStatus(),pickedUpBy);
        return new ResponseEntity<>(getOrderOfAUserModel,HttpStatus.OK);
    }


    public ResponseEntity<Object> getUnPickeduporders(Long poolId){
            List<OrderOfAUser> orders = poolRepo.findById(poolId).get().getCurrentOrder().getOrders();
            List<GetOrderOfAUserModel> orderOfAUserModelList = new LinkedList<>();
            for (OrderOfAUser i : orders) {
                if(i.getDeliveredBy()!=null){
                    continue;
                }
                List<OrderedProduct> orderedProduct = i.getOrderedProducts();
                List<OrderedProductsShallow> orderedProductsShallowList = new LinkedList<>();
                for (OrderedProduct j : orderedProduct) {
                    ProductsShallowForm productsShallowForm = new ProductsShallowForm();
                    productsShallowForm = productsShallowForm.convertToShallowForm(j.getProductOrdered());
                    OrderedProductsShallow orderedProductsShallow = new OrderedProductsShallow();
                    orderedProductsShallow = orderedProductsShallow.convertToForm(j, productsShallowForm);
                    orderedProductsShallowList.add(orderedProductsShallow);
                }
                GetOrderOfAUserModel getOrderOfAUserModel = new GetOrderOfAUserModel();
                getOrderOfAUserModel = getOrderOfAUserModel.convert(orderedProductsShallowList, i,i.getStatus(),null);
                orderOfAUserModelList.add(getOrderOfAUserModel);
            }
            return new ResponseEntity<>(orderOfAUserModelList, HttpStatus.OK);
//        }catch (NullPointerException e){
//            return new ResponseEntity<>(new LinkedList<>(),HttpStatus.OK);
//        }
    }


    public ResponseEntity<Object> PickUpOrder(PickUpOrderRequest request) throws MessagingException {
        List<OrderOfUserRequest> pickUpRequests = request.getPickupRequests();
        List<OrderOfAUser> emails=new LinkedList<>();
        for (OrderOfUserRequest i : pickUpRequests) {
            OrderOfAUser orderOfAUser = orderOfAUserRepository.findById(i.getOrderOfAUserId()).get();
            if(orderOfAUser.getUser().getUser().getId()!=orderOfAUser.getDeliveredBy().getUser().getId()){
            orderOfAUser.setStatus("Picked Up");
            emails.add(orderOfAUser);}
            else{
                orderOfAUser.setStatus("Delivered");


                PoolUser deliverer = orderOfAUser.getDeliveredBy();


                Pool currentPool = deliverer.getCurrentPool();

                Order currentOrder = currentPool.getCurrentOrder();
                int count = 0;
                for (OrderOfAUser order : currentOrder.getOrders()) {
                    if (order.getStatus().equals("Delivered")) {
                        count++;
                    }
                }
                if (currentOrder.getOrders().size() == count) {
                    currentPool.setCurrentOrder(null);
                    currentOrder.setOrderedPool(null);
                    currentOrder.setStore(null);
                }
                poolRepo.save(currentPool);
                orderTable.save(currentOrder);
                //reset code and condition
            }


            orderOfAUserRepository.save(orderOfAUser);
        }


        Thread pickUpThread=new Thread(pickEmailThread,"pickUpThread");
        pickUpMail.setPickUpEmails(emails);
        pickUpThread.start();

        return new ResponseEntity<>("Pickups Done", HttpStatus.OK);
    }

    public ResponseEntity<Object> updateStatusForAnOrder(Long orderOfAUserId, UpdateStatus request) throws MessagingException {
        OrderOfAUser orderOfAUser = orderOfAUserRepository.findById(orderOfAUserId).get();
        orderOfAUser.setStatus(request.status);

        if (request.status.equals("Delivered")) {
            PoolUser deliverer = orderOfAUser.getDeliveredBy();


            Pool currentPool = deliverer.getCurrentPool();

            Order currentOrder = currentPool.getCurrentOrder();
            int count = 0;
            for (OrderOfAUser order : currentOrder.getOrders()) {
                if (order.getStatus().equals("Delivered")) {
                    count++;
                }
            }
            if (currentOrder.getOrders().size() == count) {
                currentPool.setCurrentOrder(null);
                currentOrder.setOrderedPool(null);
                currentOrder.setStore(null);
            }
            poolRepo.save(currentPool);
            orderTable.save(currentOrder);
            orderDeliveredEmail.setDeliverer(orderOfAUser.getDeliveredBy().getUser());
            orderDeliveredEmail.setReciever(orderOfAUser.getUser().getUser());
            Thread pickUpThread=new Thread(orderDeliveredEmailThread,"pickUpThread");
            pickUpThread.start();

        }
        orderOfAUserRepository.save(orderOfAUser);

        return new ResponseEntity<>("order updated to:" + request.status, HttpStatus.OK);
    }


    public ResponseEntity<Object> getOrderOfAPool(Long poolId) {
        try {
            List<OrderOfAUser> orders = poolRepo.findById(poolId).get().getCurrentOrder().getOrders();
            List<GetOrderOfAUserModel> orderOfAUserModelList = new LinkedList<>();
            for (OrderOfAUser i : orders) {
                List<OrderedProduct> orderedProduct = i.getOrderedProducts();
                List<OrderedProductsShallow> orderedProductsShallowList = new LinkedList<>();
                for (OrderedProduct j : orderedProduct) {
                    ProductsShallowForm productsShallowForm = new ProductsShallowForm();
                    productsShallowForm = productsShallowForm.convertToShallowForm(j.getProductOrdered());
                    OrderedProductsShallow orderedProductsShallow = new OrderedProductsShallow();
                    orderedProductsShallow = orderedProductsShallow.convertToForm(j, productsShallowForm);
                    orderedProductsShallowList.add(orderedProductsShallow);
                }
                GetOrderOfAUserModel getOrderOfAUserModel = new GetOrderOfAUserModel();
                getOrderOfAUserModel = getOrderOfAUserModel.convert(orderedProductsShallowList, i,i.getStatus(),null);
                orderOfAUserModelList.add(getOrderOfAUserModel);
            }
            return new ResponseEntity<>(orderOfAUserModelList, HttpStatus.OK);
        }catch (NullPointerException e){
           return new ResponseEntity<>(new LinkedList<>(),HttpStatus.OK);
        }
    }
}
