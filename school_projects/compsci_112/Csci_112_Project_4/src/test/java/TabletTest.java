import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TabletTest {

    @Test
    void addCustomer() {
        Tablet testTablet = new Tablet("",0.0,"","",""
                ,false,false,0.0);
        testTablet.addCustomer("bob","here","email");
        assertEquals("bob",testTablet.getBob().getName());
        assertEquals("here",testTablet.getBob().getAddress());
        assertEquals("email",testTablet.getBob().getEmail());
    }

    @Test
    void generateMACaddress() {
        Tablet testTablet = new Tablet("HIT",0.0,"","",""
                ,false,false,0.0);
        testTablet.generateMACaddress();
        assertNotNull(testTablet.getMACaddress());
    }

    @Test
    void calculateFinalCost() {
        Tablet testTablet = new Tablet("MAN",100.0,"Mod","80x80","256GB"
                ,true,false,0.0);
        testTablet.calculateFinalCost();
        assertEquals(850.0,testTablet.getFinalCost());
    }
}