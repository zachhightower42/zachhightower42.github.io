public class Tablet extends Device{
    private String storageCapacity;
    private boolean keyboard;
    private boolean stylus;
    private double finalCost;
    private Customer bob;
    private String deviceType = "T";
//genned toString
    @Override
    public String toString() {
        return "SOLD\n" +
                "   We sold a new: " + getManufacturer()+ " brand, "+getModelName()+ ", Tablet\n" +
                "   MAC Address: " + getMACaddress() + "\n" +
                "   Device Size/Dimensions: " + getDeviceSize() +"\n"+
                "   Base Cost: $"+getBaseCost()+"\n"+
                "OPTIONAL FEATURES CHOSEN\n"+
                "   StorageCapacity: " + storageCapacity + "\n" +
                "   Keyboard: " + keyboard + "\n" +
                "   Stylus: " + stylus +"\n"+
                "   FINAL COST: " + finalCost +
                "\n"+"CUSTOMER INFORMATION"+
                "\n" + bob;
    }

    //constructor
    public Tablet(String manufacturer, double baseCost, String modelName, String deviceSize,String storageCapacity,
                  boolean keyboard, boolean stylus, double finalCost) {
        super.setManufacturer(manufacturer);
        super.setBaseCost(baseCost);
        super.setModelName(modelName);
        super.setScreenSize(deviceSize);
        this.storageCapacity = storageCapacity;
        this.keyboard = keyboard;
        this.stylus = stylus;
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
        if (storageCapacity == "64GB"){
            double newCost = baseCost + 0.00;
            baseCost=newCost;
            newCost=0.0;
            if (keyboard==true){
                 newCost = baseCost + 250.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}
            }
        }
        else if (storageCapacity == "256GB"){
            double newCost = baseCost + 500.00;
            baseCost=newCost;
            newCost=0.0;
            if (keyboard==true){
                 newCost = baseCost + 250.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}
            }
        }
        else if (storageCapacity == "512GB"){
            double newCost = baseCost + 1000.00;
            baseCost=newCost;
            newCost=0.0;
            if (keyboard==true){
                newCost = baseCost + 250.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}
            }
        }
        else if (storageCapacity == "1TB"){
            double newCost = baseCost + 1500.00;
            baseCost=newCost;
            newCost=0.0;
            if (keyboard==true){
                newCost = baseCost + 250.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}
            }
        }
        else if (storageCapacity == "2TB"){
            double newCost = baseCost + 2000.00;
            baseCost=newCost;
            newCost=0.0;
            if (keyboard==true){
                newCost = baseCost + 250.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}
            }
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
    //getters
    public double getFinalCost() {
        return finalCost;
    }
    public Customer getBob() {
        return bob;
    }

}
