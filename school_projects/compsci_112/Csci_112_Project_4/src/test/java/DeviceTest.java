import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class DeviceTest {
    //for device test superclass
    //there's no non-empty constructor
    //therefore
    //device dObject = new subclass ()
    //for the empty constructor test
    //assertNotNull
    //test the setters and getters
@Test
void constructorTest(){
    Device testDevice = new Laptop("", 0.0, "", "",
            "", "", false, false, 0.0);
    assertNotNull(testDevice);
}
    @Test
    void setManufacturer() {
        Device testDevice = new Laptop("APPLE", 0.0, "", "",
                "", "", false, false, 0.0);
        testDevice.setManufacturer("SONY");
        assertEquals("SONY", testDevice.getManufacturer());
    }

    @Test
    void setBaseCost() {
        Device testDevice = new Laptop("", 200.0, "", "",
                "", "", false, false, 0.0);
        testDevice.setBaseCost(300.0);
        assertEquals(300.0, testDevice.getBaseCost());
    }

    @Test
    void setModelName() {
        Device testDevice = new Laptop("", 0.0, "Modelname", "",
                "", "", false, false, 0.0);
        testDevice.setModelName("Modelname");
        assertEquals("Modelname", testDevice.getModelName());
    }

    @Test
    void setScreenSize() {
        Device testDevice = new Laptop("", 0.0, "", "600x800",
                "", "", false, false, 0.0);
        testDevice.setScreenSize("600x800");
        assertEquals("600x800", testDevice.getDeviceSize());
    }

    @Test
    void getManufacturer() {
        Device testDevice = new Laptop("THIS", 0.0, "", "",
                "", "", false, false, 0.0);
        assertEquals("THIS", testDevice.getManufacturer());
    }

    @Test
    void getBaseCost() {
        Device testDevice = new Laptop("", 200.0, "", "",
                "", "", false, false, 0.0);
        assertEquals(200.0, testDevice.getBaseCost());
    }

    @Test
    void getModelName() {
        Device testDevice = new Laptop("", 0.0, "ModelName", "",
                "", "", false, false, 0.0);
        assertEquals("ModelName", testDevice.getModelName());
    }

    @Test
    void getDeviceSize() {
        Device testDevice = new Laptop("", 0.0, "", "600x800",
                "", "", false, false, 0.0);
        assertEquals("600x800", testDevice.getDeviceSize());
    }

    @Test
    void getMACaddress() {
        Device testDevice = new Laptop("", 200.0, "", "",
                "", "", false, false, 0.0);
        assertNotNull(testDevice.getMACaddress());
    }
}