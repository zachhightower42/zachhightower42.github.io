public class Driver {


    public static void main(String[] args) {
        Group groupDriver;
        groupDriver = new Group();
        groupDriver.addMember(0,"Bob Jones",29);
        groupDriver.addMember(1,"Susan Little",23);
        groupDriver.addMember(2,"Kathy White",21);
        groupDriver.addMember(3,"John Smith",27);
        groupDriver.addMember(4,"Mike Ross",48);
        groupDriver.addMember(5,"Jennifer Hunt",32);
        groupDriver.addMember(6,"Walter Brown",55);
        groupDriver.addMember(7,"Samantha Goings",47);
        groupDriver.addMember(8,"Steve Barber",86);
        groupDriver.addMember(9,"Terry Manson",37);
        System.out.println(groupDriver.sumArray(0)/10.0);
        groupDriver.getSort(groupDriver.memberArray, 0,9);
        for (int i = 0; i < 10; i++) {
            System.out.print(groupDriver.memberArray[i].toString());
            System.out.print("\n------\n");
        }
    }
}
