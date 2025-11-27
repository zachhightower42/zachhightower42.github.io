import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class DriverP3 {
    //Everything should be finished except for writing tests, getting the read below to work right,
    //and cleanup
    public static void main(String[] args) throws FileNotFoundException {
        Business titanCommunication = new Business("Titan Communication");
        File file = new File("src/main/TitanCommunication.txt");
        Scanner scan = new Scanner(file);
        while (scan.hasNextLine()) {
            int index = 0;
            String line = scan.nextLine();
            String[] titanData = line.split(",");
            if (titanData.length == 2) { //branch
                titanCommunication.addBranch(titanData[0], Integer.parseInt(titanData[1]));
                ++index;
            } else {//employee
                titanCommunication.addEmployeeBusiness(index,titanData[0], titanData[1], Integer.parseInt(titanData[2]));
            }
        }
        scan.close();
        //titanCommunication.userBusinessEdit();
        titanCommunication.printBranches();
    }
}
/*
DriverP3 -  The driver should not have any methods other than the main
and should not have the logic to make changes except for the Business name.
 Your driver should have a Business Object
 (none of the other classes should be instantiated in the Driver).
 Junit test classes with necessary tests methods for each Object class
(does not include the Driver). DO THIS WHEN EVERYTHING ELSE FUNCTIONS

Your program will need to:

    • Keep all attributes safe ~ got it

    • read from the provided file and pass the data to create a Business with Branch’s including their Employees.
    ~got the above bit in business class
    place methods for reading and filling in the branch portion
    ~I think this is covered in the same readData method

    • print Welcoming and Good-bye messages
    Place these in business

    • allow the user to modify (change) any value stored by the Business, Branch, or Employee classes
     (e.g., any name, location, etc..), and the ability to remove an Employee from a Branch. These will require methods
      (some you will have already made by simply writing the normal methods of a class).

    • be able to print all the info about the Business, Branch’s, and Employees as many times as the user wants to or
     to exit the program.
 */
