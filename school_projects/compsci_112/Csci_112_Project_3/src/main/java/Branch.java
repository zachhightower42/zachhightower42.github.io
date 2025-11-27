import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Branch {
    private String branchLocation;
    private int yearOpened;
    private int employeeCount;
    private ArrayList<Employee> employees = new ArrayList<>();

    public Branch(String branchLocation, int yearOpened) {
        this.branchLocation = branchLocation;
        this.yearOpened = yearOpened;
        this.employeeCount = 0;
    }
//getters
    public String getBranchLocation() {
        return branchLocation;
    }
    public int getYearOpened() {
        return yearOpened;
    }
//setters
    public void setBranchLocation(String branchLocation) {
        this.branchLocation = branchLocation;
    }
    public void setYearOpened(int yearOpened) {
        this.yearOpened = yearOpened;
    }
    //adders
    public  void addBranch(String branchLocation, int yearOpened){
        Branch nextBranch = new Branch(branchLocation,yearOpened);
    }
    public void addEmployee(String employeeName, String employeePosition, int employeeSalary){
        employees.add(new Employee(employeeName, employeePosition,employeeSalary));
    }
    //toString
    public String toString(){
        String s = "Our branch in "+branchLocation+" has been providing quality service since "+yearOpened+"!\n"+
                "A list of our fine employees at this branch, their positions, and their salaries.\n";
        return s;
    }
    //print method for employees within the branch
    public void printEmployees(){
        for (int i = 0; i < employees.size(); i++) {
            System.out.println(i+".| Name: "+employees.get(i).getEmployeeName()+ "|Position: "+employees.get(i).getEmployeePosition()+" |Salary: "+employees.get(i).getEmployeeSalary());
        }
    }
    //print method for a single employee in the branch
    public void printOneEmployee(int selected){
        System.out.println("Name: "+employees.get(selected).getEmployeeName()+ "|Position: "+employees.get(selected).getEmployeePosition()+" |Salary: "+employees.get(selected).getEmployeeSalary());
    }
    //editing an employee inside the branch
    public void editEmployee(){
        boolean exit = false;
        boolean exit2 = false;
        Scanner keyboard2 = new Scanner(System.in);
        System.out.println("Would you like to audit an employee in this branch?");
        System.out.println("Please type Y or N");
        String input;
        input = keyboard2.nextLine();
        if (input.equals("Y")){
            while (exit == false){
                System.out.println("Employees in this branch:");
                for (int i =0;i<employees.size();i++){
                    printEmployees();
                }
                System.out.println("Which employee would you like to audit?");
                System.out.println("Enter the number of the employee to select, or press N to quit out");
                String inputSelection;
                inputSelection = keyboard2.nextLine();
                if (inputSelection.equals("N")){
                    exit = true;
                }
                else {
                   printOneEmployee(Integer.parseInt(inputSelection));
                    while (exit2 == false){
                        System.out.println("What would you like to audit?\n"+
                                "1| Employee's name\n"+
                                "2| Employee's position in the company\n"+
                                "3| Employee's salary (you monster)\n"+
                                "Enter the number next to the option or enter N to quit out\n");
                        String option;
                        option = keyboard2.nextLine();
                        if (option.equals("N")){
                            exit2 = true;
                        }
                        else {
                            int optionParse = Integer.parseInt(option);
                            if (optionParse == 1){
                                System.out.println("What should this employee's new name be?");
                                String newName;
                                newName = keyboard2.nextLine();
                                employees.get(optionParse).setEmployeeName(newName);
                                System.out.println("The employee's new name is -"+ employees.get(optionParse).getEmployeeName());
                            }
                            else if (optionParse ==2){
                                System.out.println("What should this employee's position be?");
                                String newPosition;
                                newPosition = keyboard2.nextLine();
                                employees.get(optionParse).setEmployeePosition(newPosition);
                                System.out.println("This employee's position is now -"+employees.get(optionParse).getEmployeePosition());
                            }
                            else if (optionParse == 3){
                                System.out.println("What should this employee's new salary be?");
                                String newSalary;
                                newSalary = keyboard2.nextLine();
                                employees.get(optionParse).setEmployeeSalary(Integer.parseInt(newSalary));
                                System.out.println("This employee's new salary is -"+employees.get(optionParse).getEmployeeSalary());
                            }

                            }
                        }
                    }
                }

            }
        }

    }

/*
Branch – the attributes: the location, the year the branch opened, and an
Employee list (an array or ArrayList, it is up to you).
 */