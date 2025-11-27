public class Member {
    //attributes
    private int age;
    private String name;
    //constructor
    public Member(int age, String name) {
        this.age = age;
        this.name = name;
    }
    //setters and getters
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    //toString
    @Override
    public String toString() {
        return "Member\n" +
                "age=" + age +"\n"+
                "name='" + name +"\n";
    }
}
