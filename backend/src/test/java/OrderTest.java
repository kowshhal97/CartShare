//import java.net.URI;
//
//import org.junit.After;
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.web.client.RestTemplate;
//
//
//@RunWith(SpringRunner.class)
//public class OrderTest {
//
//	public void setup(){
//
//
//    }
//
//    @Test
//    public void ordertest1() throws Exception {
//        RestTemplate restTemplate = new RestTemplate();
//        final String baseUrl = "http://35.155.66.64:" + "8080" + "/order/user/4";
//        URI uri = new URI(baseUrl);
//        ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
//
//        Assert.assertEquals(200, result.getStatusCodeValue());
//        //Assert.assertEquals('1', result.getBody().charAt(7));
//    }
//
//   @Test
//   public void ordertest2() throws Exception {
//       RestTemplate restTemplate = new RestTemplate();
//       final String baseUrl = "http://35.155.66.64:" + "8080" + "/order/user/3";
//       URI uri = new URI(baseUrl);
//       ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
//       System.out.println(result.getStatusCodeValue());
//       Assert.assertEquals(200, result.getStatusCodeValue());
//   }
//
//    @After
//    public void tearDown(){
//    }
//
//}