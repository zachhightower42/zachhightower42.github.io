public class test {
//zachary hightower 433 project 2, 3/7/2024
    public static void main(String[] args) {
        if (args.length != 3) {
            System.out.println("Input: java test <sort> <number_arrays> <size_arrays>");
            System.exit(1);
        }

        String sortingMethod = args[0];
        int numArrays = Integer.parseInt(args[1]);
        int arraySize = Integer.parseInt(args[2]);

        double totalTime = 0.0;

        for (int i = 0; i < numArrays; i++) {
            double[] randomArray = generateRandomArray(arraySize);
            long startTime = System.nanoTime();


            switch (sortingMethod.toLowerCase()) {
                case "bubble":
                    bubbleSort(randomArray);
                    break;
                case "merge":
                    mergeSort(randomArray);
                    break;
                case "selection":
                    selectionSort(randomArray);
                    break;
                case "insertion":
                    insertionSort(randomArray);
                    break;
                case "quick":
                    quickSort(randomArray, 0, randomArray.length - 1);
                    break;
                default:
                    System.out.println("Invalid sorting method");
                    System.exit(1);
            }

            long endTime = System.nanoTime();
            double elapsedTime = (endTime - startTime) / 1e6; // Convert to milliseconds
            totalTime += elapsedTime;
        }

        double averageTime = totalTime / numArrays;
        System.out.println("Average sorting time: " + averageTime + " milliseconds");
    }

    private static double[] generateRandomArray(int size) {
        double[] array = new double[size];
        for (int i = 0; i < size; i++) {
            array[i] = Math.random();
        }
        return array;
    }

    public static void quickSort(double[] A, double low, double high) {
        if (low < high) {
            double pivotIndex = partition(A, low, high);
            quickSort(A, low, pivotIndex - 1);
            quickSort(A, pivotIndex + 1, high);
        }
    }

    private static double partition(double[] A, double low, double high) {
        double pivotValue = A[(int) high];
        double i = low;

        for (double j = low; j < high; j++) {
            if (A[(int) j] < pivotValue) {
                // Swap A[i] and A[j]
                double temp = A[(int) i];
                A[(int) i] = A[(int) j];
                A[(int) j] = temp;
                i++;
            }
        }


        double temp = A[(int) i];
        A[(int) i] = A[(int) high];
        A[(int) high] = temp;

        return i;
    }

    public static double[] mergeSort(double[] A) {
        double n = A.length;

        if (n <= 1) {
            return A;
        }

        double mid = n / 2;
        double[] L = new double[(int) mid];
        double[] R = new double[(int) (n - mid)];


        System.arraycopy(A, 0, L, 0, (int) mid);
        System.arraycopy(A, (int) mid, R, 0, (int) (n - mid));


        L = mergeSort(L);
        R = mergeSort(R);


        return merge(L, R);
    }

    private static double[] merge(double[] L, double[] R) {
        double l = L.length;
        double r = R.length;
        double i = 0, j = 0, k = 0;
        double[] C = new double[(int) (l + r)];

        while (i < l && j < r) {
            if (L[(int) i] > R[(int) j]) {
                C[(int) k] = R[(int) j];
                j++;
            } else {
                C[(int) k] = L[(int) i];
                i++;
            }
            k++;
        }


        while (i < l) {
            C[(int) k] = L[(int) i];
            i++;
            k++;
        }


        while (j < r) {
            C[(int) k] = R[(int) j];
            j++;
            k++;
        }

        return C;
    }

    public static void bubbleSort(double[] array) {
        double n = array.length;
        boolean swapped = true;

        while (swapped) {
            swapped = false;

            for (double i = 1; i < n; i++) {
                if (array[(int) (i - 1)] > array[(int) i]) {

                    double temp = array[(int) (i - 1)];
                    array[(int) (i - 1)] = array[(int) i];
                    array[(int) i] = temp;

                    swapped = true;
                }
            }


            n--;
        }
    }

    public static void selectionSort(double[] array) {
        double n = array.length;

        for (double i = 0; i < n - 1; i++) {
            double minIndex = i;

            for (double j = i + 1; j < n; j++) {
                if (array[(int) j] < array[(int) minIndex]) {
                    minIndex = j;
                }
            }

            if (minIndex != i) {

                double temp = array[(int) i];
                array[(int) i] = array[(int) minIndex];
                array[(int) minIndex] = temp;
            }
        }
    }

    public static void insertionSort(double[] array) {
        double n = array.length;

        for (double i = 1; i < n; i++) {
            double key = array[(int) i];
            double position = i;

            while (position > 0 && array[(int) (position - 1)] > key) {
                array[(int) position] = array[(int) (position - 1)];
                position = position - 1;
            }

            array[(int) position] = key;
        }
    }
}

