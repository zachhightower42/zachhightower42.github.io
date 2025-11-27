public class Watch extends Device{
    private String bandColor;
    private String bandType;
    private double finalCost;
    private Customer bob;
    private String deviceType = "T";
//genned toString
    @Override
    public String toString() {
        return "SOLD\n" +
                "   We sold a new: " + getManufacturer()+ " brand, "+getModelName()+ ", Watch\n" +
                "   MAC Address: " + getMACaddress() + "\n" +
                "   Device Size/Dimensions: " + getDeviceSize() +"\n"+
                "   Base Cost: $"+getBaseCost()+"\n"+
                "OPTIONAL FEATURES CHOSEN\n"+
                "   Band Color: " + bandColor + "\n" +
                "  Band Type: " + bandType+"\n" +
                "   FINAL COST: " + finalCost +
                "\n"+"CUSTOMER INFORMATION"+
                "\n" + bob;
    }

    //constructor
    public Watch(String manufacturer, double baseCost, String modelName, String deviceSize,String bandColor,
                String bandType, double finalCost) {
        super.setManufacturer(manufacturer);
        super.setBaseCost(baseCost);
        super.setModelName(modelName);
        super.setScreenSize(deviceSize);
        this.bandColor = bandColor;
        this.bandType = bandType;
        this.finalCost = finalCost;
        bob=new Customer();
    }
    //add customer
    @Override
    public void addCustomer(String name, String address, String email) {
        bob.setName(name);
        bob.setAddress(address);
        bob.setEmail(email);
    }
    //gen MAC
    @Override
    public void generateMACaddress() {
        MACaddress = getManufacturer().substring(0,2)+":"+ (int)((Math.random()*(99))+35) + "-"+ deviceType+ (int)((Math.random()*(70))+15) + ":"+(int)((Math.random()*(6000))+3500);
    }
    //calculating final cost
    @Override
    public double calculateFinalCost() {
        double baseCost = getBaseCost();
        if (bandType == "Standard"){
            double newCost = baseCost + 0.00;
            baseCost=newCost;
            newCost=0.0;
        }
        else if (bandType == "Flex-Strength"){
            double newCost = baseCost + 150.00;
            baseCost=newCost;
            newCost=0.0;
        }
        else if (bandType == "Limited Edition Rose Gold"){
            double newCost = baseCost + 500.00;
            baseCost=newCost;
            newCost=0.0;
        }
        finalCost=baseCost;
        return baseCost;
    }
    //printing
    @Override
    public void printDevice() {
        calculateFinalCost();
        generateMACaddress();
        System.out.println(toString());
    }
    public double getFinalCost() {
        return finalCost;
    }
    public Customer getBob() {
        return bob;
    }

}