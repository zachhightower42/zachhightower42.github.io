import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Business {
    private String businessName;
    private ArrayList<Branch> branchList = new ArrayList<>();

    //Constructor
    public Business(String businessName) {
        this.businessName = businessName;
    }

    //getter
    public String getBusinessName() {
        return businessName;
    }

    //setter
    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }
    //adders
    public  void addBranch(String branchLocation, int yearOpened){
        branchList.add(new Branch(branchLocation,yearOpened));
    }
   public void addEmployeeBusiness(int index,String one,String two,int three){
       branchList.get(index).addEmployee(one, two, three);
   }
    //reading from the text file, may need to put this in business instead of here
    public void readAndPassData() throws FileNotFoundException {
        File file = new File("src/main/TitanCommunication.txt");
        Scanner scan = new Scanner(file);
        while (scan.hasNextLine()) {
            int index = -1;
            String line = scan.nextLine();
            String[] titanData = line.split(",");
            if (titanData.length == 2) { //branch
                branchList.add(new Branch(titanData[0], Integer.parseInt(titanData[1])));
                ++index;
            } else {//employee
                branchList.get(index).addEmployee(titanData[0], titanData[1], Integer.parseInt(titanData[2]));
            }
        }
        scan.close();
    }

    //data printer
    public void printAllData() {
        for (int i = 0; i < branchList.size(); i++) {
            System.out.printf(branchList.get(i).toString());
            branchList.get(i).printEmployees();
        }
    }
    //printer for just branches
    public void printBranches() {
        for (int i = 0; i < branchList.size(); i++) {
            System.out.println(i + " Branch location -" + branchList.get(i).getBranchLocation() + "Year of opening -" + branchList.get(i).getYearOpened());
        }
    }
    //printer for just one branch
    public void printOneBranch(int selected) {
            System.out.println("Branch location -" + branchList.get(selected).getBranchLocation() + "Year of opening -" + branchList.get(selected).getYearOpened());
        }

    //user controls
    //editing branch information
    public void editBranch(){
        boolean exit = false;
        boolean exit2 = false;
        Scanner keyboard3 = new Scanner(System.in);
        System.out.println("Would you like to audit one of the branch offices?");
        System.out.println("Please type Y or N");
        String input;
        input = keyboard3.nextLine();
        if (input.equals("Y")){
            while (exit == false){
                System.out.println("Branch offices available for selection:");
                for (int i =0;i<branchList.size();i++){
                    printBranches();
                }
                System.out.println("Which branch would you like to audit?");
                System.out.println("Enter the number of the branch to select, or press N to quit out");
                String inputSelection;
                inputSelection = keyboard3.nextLine();
                if (inputSelection.equals("N")){
                    exit = true;
                }
                else {
                    printOneBranch(Integer.parseInt(inputSelection));
                    while (exit2 == false){
                        System.out.println("What would you like to audit?\n"+
                                "1| Branch's Location\n"+
                                "2| The year of its opening (for tax purposes)\n"+
                                "Enter the number next to the option or enter N to quit out\n");
                        String option;
                        option = keyboard3.nextLine();
                        if (option.equals("N")){
                            exit2 = true;
                            branchList.get(Integer.parseInt(inputSelection)).editEmployee();
                        }
                        else {
                            int optionParse = Integer.parseInt(option);
                            if (optionParse == 1){
                                System.out.println("What should this branch's new location be?");
                                String newLocation;
                                newLocation = keyboard3.nextLine();
                                branchList.get(optionParse).setBranchLocation(newLocation);
                                System.out.println("The branch's new location is -"+branchList.get(optionParse).getBranchLocation());
                            }
                            else if (optionParse ==2){
                                System.out.println("What should this branch's year of opening be?");
                                String newOpenYear;
                                newOpenYear = keyboard3.nextLine();
                                branchList.get(optionParse).setYearOpened(Integer.parseInt(newOpenYear));
                                System.out.println("This branch's new year of opening is -"+branchList.get(optionParse).getYearOpened());
                            }
                        }
                        branchList.get(Integer.parseInt(inputSelection)).editEmployee();
                    }
                }
            }

        }
    }
    //user Business editing
    public void userBusinessEdit() {
        boolean exit = false;
        System.out.print("Welcome to the auditor for " + businessName);
        Scanner keyboard = new Scanner(System.in);
        System.out.print("\nAn overview of the business follows \n--------\n");
        printAllData();
        while (exit == false) {
            System.out.println("Would you like to audit anything about "+businessName+ " today?");
            System.out.println("Please type Y or N");
            String input;
            input = keyboard.nextLine();
            if (input.equals("Y")) {
                System.out.println("Would you like to change the name of the business?");
                System.out.println("Please type Y or N");
                input = keyboard.nextLine();
                if (input.equals("Y")) {
                    System.out.println("What should we rebrand to?");
                    String newBusinessName;
                    newBusinessName = keyboard.nextLine();
                    setBusinessName(newBusinessName);
                    System.out.println("We have rebranded to " + businessName);
                    editBranch();
                } else if (input.equals("N")) {
                    System.out.println("Would you like to audit any of the branches or employees?");
                    String input2;
                    input2 = keyboard.nextLine();
                    if (input2.equals("Y")) {
                        editBranch();
                    } else {
                        System.out.println("How many copies of the data do you need?");
                        System.out.println("Please enter a positive whole number.");
                        int printNum;
                        printNum = keyboard.nextInt();
                        if (printNum == 0) {
                            exit = true;
                        } else {
                            for (int i = 0; i < printNum; i++) {
                                printAllData();
                            }
                        }
                    }
                    exit = true;
                }
            }
        }
    }
}



/*
Business – the attributes: a business name, and a Branch list (again an
array or ArrayList, it is up to you).

 */