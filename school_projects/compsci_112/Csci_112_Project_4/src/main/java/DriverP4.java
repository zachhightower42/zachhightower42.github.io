import java.util.ArrayList;

public class DriverP4 {
    /*
Name: Zachary Hightower
Current Date: 4/11/2023
Sources Consulted:Consulted Java T point for information about substrings, consulted notes provided by instructor,
previous labs, previous projects, consulted with TA Sydney, spoke about project with my roommate Hudson
By submitting this work, I attest that it is my original work and that I did not violate the University of Mississippi
 academic policies set forth in the M book.
*/
    public static void main(String[] args) {
System.out.print("Welcome to the online store inventory checker!\n-------------\n");
//arraylist
        ArrayList<Device> devices = new ArrayList<>();
        //laptops
        devices.add(new Laptop("APPLE", 500.00, "Mactop 100", "300x200",
                "256GB", "8GB", true, true, 0.0));
        devices.add(new Laptop("TOSHIBA", 600.00, "Tosh XL", "600x500",
                "512GB", "16GB", false, true, 0.0));
        devices.add(new Laptop("EVIL CORP", 700.00, "Slim Sinister", "200x100",
                "1TB", "32GB", false, true, 0.0));
        devices.add(new Laptop("MICROSOFT", 800.00, "Rooty Tooty Rebooty", "800x600",
                "1TB", "32GB", false, false, 0.0));
        devices.add(new Laptop("SONY", 900.00, "Sony Starwave", "150x150",
                "256GB", "32GB", true, true, 0.0));
        //tablets
        devices.add(new Tablet("BONY", 100.00, "Bony Browsemachine", "80x80",
                "64GB", true, true, 0.0));
        devices.add(new Tablet("TABBY", 200.00, "Meowsquare", "50x50",
                "256GB", false, true, 0.0));
        devices.add(new Tablet("HENDRICKS COMPUTING", 300.00, "Super Surfer", "120x120",
                "512GB", false, false, 0.0));
        devices.add(new Tablet("APPLE", 400.00, "iPear 23", "90x90",
                "1TB", true, true, 0.0));
        devices.add(new Tablet("LUTHER CORP", 500.00, "Silver Surfer", "130x130",
                "2TB", false, true, 0.0));
        devices.add(new Tablet("SNAPPLE", 600.00, "Peach T100", "100x100",
                "64GB", false, false, 0.0));
        //watches
        devices.add(new Watch("ORANGE", 100.00, "O-Wrist", "30x30", "Orange"
                , "Regular", 0.0));
        devices.add(new Watch("TIMEX", 200.00, "Calculatron 3000", "40x40", "Black"
                , "Flex-Strength", 0.0));
        devices.add(new Watch("ROLEX", 500.00, "Fancy Latin Name", "25x25", "Golden Rose"
                , "Limited Edition Rose Gold", 0.0));
        //adding customers
            devices.get(0).addCustomer("Johnson Abernathy", "523 Rosewood Circle", "jabernat@aim.com");
            devices.get(1).addCustomer("Henry 'Wizzo' Spencer", "99 Fork's Pass", "Wizkid@gmail.com");
            devices.get(2).addCustomer("A. Skeleton", "130 Bones Boulevard", "bad2thebone@usa.net");
            devices.get(3).addCustomer("Professor Hayle", "83 Old Growth Way", "i<3coffeecreamer@aol.com");
            devices.get(4).addCustomer("V Silverhand", "86 Pacifia Park Street", "cyberpunk@gmail.com");
            devices.get(5).addCustomer("G. Houl", "500 Cemetery Cross", "cannibalchef220@aim.com");
            devices.get(6).addCustomer("Felix", "100 Chatty Catty Crescent", "kitty13@gmail.com");
            devices.get(7).addCustomer("Fred Hewitt", "12 Fruiting Body Boulevard", "fruitsalad@gmail.com");
            devices.get(8).addCustomer("Sunny Disposition", "332 Ray Lane", "herecomesthesun37@usa.net");
            devices.get(9).addCustomer("Not A. Villain", "52 Gotham Drive", "kiteman@aol.com");
            devices.get(10).addCustomer("Sandy Sedge", "42 Sugar Tea Tops", "supersandy93@aim.com");
            devices.get(11).addCustomer( "Snoopy", "23 Peanuts Place", "dogfighter1994@aol.com");
            devices.get(12).addCustomer("Fry Farnsworth", "83 New New York Street", "icecube32@gmail.com");
            devices.get(13).addCustomer( "Million Billiams", "11 Billion Avenue", "fatstacks@usa.net");
        //for loop printing
        for (int i = 0; i < devices.size(); i++) {
            devices.get(i).printDevice();
            System.out.print("\n------\n");
        }
        System.out.print("Thank you for using the online store inventory checker!\n-------------\nGoodbye!\n" +
                "Fun fact: Brushing your teeth both ways before you cross the street is proven to reduce the risk of " +
                "heart disease.");
    }
}
