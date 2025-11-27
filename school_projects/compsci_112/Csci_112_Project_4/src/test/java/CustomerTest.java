import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CustomerTest {

    @Test
    void testNotNull(){
        Customer testCustomer = new Customer();
        assertNotNull(testCustomer);
    }
    @Test
    void getName() {
        Customer testCustomer = new Customer();
        testCustomer.setName("Bob");
        assertEquals("Bob", testCustomer.getName());
    }

    @Test
    void getAddress() {
        Customer testCustomer = new Customer();
        testCustomer.setAddress("County Way");
        assertEquals("County Way", testCustomer.getAddress());
    }

    @Test
    void getEmail() {
        Customer testCustomer = new Customer();
        testCustomer.setEmail("superduper@gmail.com");
        assertEquals("superduper@gmail.com", testCustomer.getEmail());
    }

    @Test
    void setName() {
        Customer testCustomer = new Customer();
        testCustomer.setName("Jeff");
        assertEquals("Jeff", testCustomer.getName());
    }

    @Test
    void setAddress() {
        Customer testCustomer = new Customer();
        testCustomer.setAddress("Rosewood");
        assertEquals("Rosewood", testCustomer.getAddress());
    }

    @Test
    void setEmail() {
        Customer testCustomer = new Customer();
        testCustomer.setEmail("bippityboops@usa.net");
        assertEquals("bippityboops@usa.net", testCustomer.getEmail());
    }
}