public class Laptop extends Device{
    //attribute declaration
    private Customer bob;
    private String storageCapacity;
    private String RAM;
    private boolean touchScreen;
    private boolean stylus;
    private double finalCost;
    private String deviceType = "L";
//genned toString
    @Override
    public String toString() {
        return "SOLD\n" +
                "   We sold a new: " + getManufacturer()+ " brand, "+getModelName()+ ", Laptop\n" +
                "   MAC Address: " + getMACaddress() + "\n" +
                "   Device Size/Dimensions: " + getDeviceSize() +"\n"+
                "   Base Cost: $"+getBaseCost()+"\n"+
                "OPTIONAL FEATURES CHOSEN\n"+
                "   StorageCapacity: " + storageCapacity + "\n" +
                "   RAM: " + RAM + "\n" +
                "   TouchScreen: " + touchScreen +"\n"+
                "   Stylus: " + stylus +"\n"+
                "   FINAL COST: " + finalCost +
                "\n"+"CUSTOMER INFORMATION"+
                "\n" + bob;
    }

    //constructor
public Laptop(String manufacturer, double baseCost, String modelName, String deviceSize,String storageCapacity,
              String RAM, boolean touchScreen, boolean stylus, double finalCost) {
    super.setManufacturer(manufacturer);
    super.setBaseCost(baseCost);
    super.setModelName(modelName);
    super.setScreenSize(deviceSize);
    this.storageCapacity = storageCapacity;
    this.RAM = RAM;
    this.touchScreen = touchScreen;
    this.stylus = stylus;
    this.finalCost = finalCost;
    bob=new Customer();
}
//adding customer
    @Override
    public void addCustomer(String name, String address, String email) {
        bob.setName(name);
        bob.setAddress(address);
        bob.setEmail(email);
    }
//generate mac address
    @Override
    public void generateMACaddress() {
    MACaddress = getManufacturer().substring(0,2)+":"+ (int)((Math.random()*(99))+35) + "-"+ deviceType+ (int)((Math.random()*(70))+15) + ":"+(int)((Math.random()*(6000))+3500);
    }
    //calculating final cost
    @Override
    public double calculateFinalCost() {
        double baseCost = getBaseCost();
        if (storageCapacity == "256GB"){
            if (RAM.equals("8GB")){
                double newCost = baseCost + 0;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}

            }
            else if (RAM.equals("16GB")){
                double newCost = baseCost + 150.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}

            }
            else { double newCost = baseCost + 300.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}
            }
        }
        else if(storageCapacity=="512GB"){
            double newCost = baseCost + 500.0;
            baseCost=newCost;
            newCost=0.0;
            if (RAM.equals("8GB")){
                newCost = baseCost + 0.0;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}

            }
            else if (RAM.equals("16GB")){
                newCost = baseCost + 150.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}

            }
            else {  newCost = baseCost + 300.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}

            }
        }
        else if (storageCapacity=="1TB"){
            double newCost = baseCost + 1000.0;
            baseCost=newCost;
            newCost=0.0;
            if (RAM.equals("8GB")){
                 newCost = baseCost + 0.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}

            }
            else if (RAM.equals("16GB")){
                newCost = baseCost + 150.00;
                baseCost=newCost;
                newCost=0.0;
                if (stylus==true){
                    newCost = baseCost + 99.00;
                    baseCost=newCost;}

            }
            else {  newCost = baseCost + 300.00;
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
    @Override
    public void printDevice() {
        calculateFinalCost();
        generateMACaddress();
        System.out.print(toString());
    }
    //getters
    public Customer getBob() {
        return bob;

    }
    public double getFinalCost() {
        return finalCost;
    }
    }

