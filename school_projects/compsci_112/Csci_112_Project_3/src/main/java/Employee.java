public class Employee {
    private String employeeName;
    private String employeePosition;
    private int employeeSalary;
//Constructor
    public Employee(String employeeName, String employeePosition, int employeeSalary) {
        this.employeeName = employeeName;
        this.employeePosition = employeePosition;
        this.employeeSalary = employeeSalary;
    }
//getters
    public String getEmployeeName() {
        return employeeName;
    }

    public String getEmployeePosition() {
        return employeePosition;
    }

    public int getEmployeeSalary() {
        return employeeSalary;
    }
    //setters
    public void setEmployeeName(String newName){
        this.employeeName = employeeName;
    }
    public void setEmployeePosition(String newPosition){
        this.employeePosition = employeePosition;
    }
    public void setEmployeeSalary(int i){
        this.employeeSalary = employeeSalary;
    }
    //adder
}
/*
Employee – the attributes: a name, a position with the company, and a
salary.
 */