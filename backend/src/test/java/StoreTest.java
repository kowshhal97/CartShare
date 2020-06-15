//import com.cartShare.App;
//import com.cartShare.models.UserShallowForm;
//import com.cartShare.repository.UserRepository;
//import com.cartShare.requests.LoginRequest;
//import com.cartShare.requests.SignupRequest;
//import com.cartShare.service.UserService;
//import org.junit.After;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.web.client.RestTemplate;
//
//import java.net.URI;
//
//import static org.junit.Assert.*;
//
//@RunWith(SpringRunner.class)
//public class StoreTest {
//     @Before
//     public void setup(){
//
//
//     }
//
//     @Test
//     public void storetest1() throws Exception {
//         RestTemplate restTemplate = new RestTemplate();
//         final String baseUrl = "http://35.155.66.64:" + "8080" + "/admin/store/allStores/1";
//         URI uri = new URI(baseUrl);
//         ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
//
//         Assert.assertEquals(200, result.getStatusCodeValue());
//         Assert.assertEquals('1', result.getBody().charAt(7));
//     }
//
//    @Test
//    public void storetest2() throws Exception {
//        RestTemplate restTemplate = new RestTemplate();
//        final String baseUrl = "http://35.155.66.64:" + "8080" + "/admin/store/allStores/900";
//        URI uri = new URI(baseUrl);
//        ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);
//        Assert.assertEquals("[]", result.getBody());
//    }
//
//     @After
//     public void tearDown(){
//     }
//}
