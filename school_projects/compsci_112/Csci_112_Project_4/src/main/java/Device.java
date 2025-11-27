public abstract class Device implements MACaddress {
    /** Do not make any changes to this class.
     */

    private String manufacturer;
    private String modelName;
    private double baseCost;
    private String deviceSize;
    protected String MACaddress;

    public Device() {
        manufacturer = "";
        modelName = "";
        baseCost = 0.0;
        deviceSize = "";
        MACaddress = "";
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public void setBaseCost(double baseCost) {
        this.baseCost = baseCost;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public void setScreenSize(String deviceSize) {
        this.deviceSize = deviceSize;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public double getBaseCost() {
        return baseCost;
    }

    public String getModelName() {
        return modelName;
    }

    public String getDeviceSize() {
        return deviceSize;
    }

    public String getMACaddress() {
        return MACaddress;
    }

    public abstract void addCustomer(String name, String address, String email);

    public void printDevice(){
        System.out.printf("A new %s %s %s\n", manufacturer, modelName, deviceSize);
        System.out.printf("MAC address: %s and a base cost of: $%.2f\n", MACaddress, baseCost);
        System.out.println("The specific features are:");
    }

    public double calculateFinalCost() {
        return baseCost;
    }
}
