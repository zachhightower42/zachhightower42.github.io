import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WatchTest {

    @Test
    void addCustomer() {
        Watch testWatch = new Watch("",0.0,"","",""
                ,"",0.0);
        testWatch.addCustomer("bob","here","email");
        assertEquals("bob",testWatch.getBob().getName());
        assertEquals("here",testWatch.getBob().getAddress());
        assertEquals("email",testWatch.getBob().getEmail());
    }

    @Test
    void generateMACaddress() {
        Watch testWatch = new Watch("HIT",0.0,"","",""
                ,"",0.0);
        testWatch.generateMACaddress();
        assertNotNull(testWatch.getMACaddress());
    }

    @Test
    void calculateFinalCost() {
        Watch testWatch = new Watch("MAN",100.0,"Mod","10x10","Blue"
                ,"Flex-Strength",0.0);
        testWatch.calculateFinalCost();
        assertEquals(250.0,testWatch.getFinalCost());
    }
}