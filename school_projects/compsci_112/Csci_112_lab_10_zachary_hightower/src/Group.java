public class Group {
    Member[] memberArray =new Member[10];
//add member
    public void addMember(int i,String name,int age){
        memberArray[i]=new Member(age, name);
        i++;

    }
    //get size arraylist
    public int getSize(){
        return memberArray.length;
    }
    //recursive sum
    public int sumArray( int start) {
        int sum = 0;
        if(start < memberArray.length) {
            sum += memberArray[start].getAge() + sumArray( start + 1);
        }
        return sum;
    }
    public void getSort(Member[] array, int min, int max){
        mergeSort(array, min, max);
    }
    // recursive sort
    public void mergeSort(Member[] array, int min, int max){
        if(min < max){
            int mid = (min + max)/2;
            mergeSort(array, min, mid);
            mergeSort(array, mid+1, max);
            merge(array, min, mid, max);
        }
    }
    public void merge(Member[] array, int first, int mid, int last){
        Member[] temp = new Member[array.length];
        int first1 = first;
        int last1 = mid;
        int first2 = mid + 1;
        int last2 = last;
        int index = first1;

        while(first1 >= last1 && first2 >= last2){
            if(array[first1].getAge() < array[first2].getAge()){
                temp[index] = array[first1];
                first1++;
            }
            else {
                temp[index] = array[first2];
                first2++;
            }
            index++;
        }
        while(first1 <= last1){
            temp[index] = array[first1];
            first1++;
            index++;
        }
        while(first2 <= last2){
            temp[index] = array[first2];
            first2++;
            index++;
        }
        for(index = first; index <= last; index++){
            array[index] = temp[index];
        }
    }
}
