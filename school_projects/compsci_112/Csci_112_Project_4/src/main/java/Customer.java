public class Customer {
    //attributes
    private String name;
    private String address;
    private String email;

    //constructor
public Customer(){
this.name = name;
this. address = address;
this.email = email;
}
    //getters
    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }
    //setters
    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    //tostring
    @Override
    public String toString() {
        return "   "+getName()+"\n   "+getAddress()+"\n   "+getEmail()+"\n";
    }
}
