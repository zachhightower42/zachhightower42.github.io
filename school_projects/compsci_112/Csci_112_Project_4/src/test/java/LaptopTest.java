import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class LaptopTest {

    @Test
    void addCustomer() {
        Laptop testLaptop = new Laptop("",0.0,"","",""
        ,"",false,false,0.0);
        testLaptop.addCustomer("bob","here","email");
        assertEquals("bob",testLaptop.getBob().getName());
        assertEquals("here",testLaptop.getBob().getAddress());
        assertEquals("email",testLaptop.getBob().getEmail());
    }

    @Test
    void generateMACaddress() {
        Laptop testLaptop = new Laptop("HIT",0.0,"","",""
                ,"",false,false,0.0);
        testLaptop.generateMACaddress();
        assertNotNull(testLaptop.getMACaddress());
    }

    @Test
    void calculateFinalCost() {
        Laptop testLaptop = new Laptop("HIT",100.0,"Modname","100x100","512GB"
                ,"16GB",false,false,0.0);
        testLaptop.calculateFinalCost();
        assertEquals(750.0,testLaptop.getFinalCost());
    }
}