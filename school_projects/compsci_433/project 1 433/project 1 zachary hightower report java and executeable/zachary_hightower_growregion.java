import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.Arrays;
import java.util.ArrayList;

public class zachary_hightower_growregion {
    //Global variable declaration
    private static int width;
    private static int height;
    private static int targetIntensity;
    private static int[][] image2DPixelized;
    private static boolean[][] checkedPixels;
    private static int[][] TwoD_List;
    private static final int Magic_Num = 2;


    public static void main(String[] CommandLineArgument) {
        //Main method that contains our sub methods. The program is split out into these sub methods
        // so that it's easier to read and easier to debug.
        if (validateCommandLineArguments(CommandLineArgument)) {
            //I'm including the prints for the programmer's name and the file name here, because it's a little
            // clearer than having it be part of the print for the values, I think.
            System.out.println("Zachary Hightower");
            System.out.println(CommandLineArgument[0]);
            targetIntensity = Integer.parseInt(CommandLineArgument[1]);
            processImage(CommandLineArgument[0]);
        } else {
            //This helps to provide a good error message for any inputs that end
            // up in the wrong form. It gives what failure it is, and an example of how to fix it.
            System.out.println("User input failure, argument must be of the form \n java WIP_growregion <image file name> <pixel intensity value 0-255>");
        }
    }

    private static boolean validateCommandLineArguments(String[] args) {
        //A quick method to validate the CL argument
        return args.length == 2;
    }

    private static void processImage(String filename) {
        //This is our method for processing the image fully.
        //It's mostly a place where the reading, region growth, and error handling
        //can be consolidated in a clean, presentable method.
        try {
            readImageFile(filename);
            findRegionsAndPrintResults();
        } catch (FileNotFoundException e) {
            System.out.println("ERROR READING IMAGE FILE: " + e.getMessage());
        }
    }

    private static void readImageFile(String filename) throws FileNotFoundException {
        //This method is where we read in the image file and make it into a usable 2D array
        //Though before we actually do that, we run the method for gathering the
        //dimensions of the image.
        File file = new File(filename);
        Scanner fileScanner = new Scanner(file);

        initializeImageProperties(fileScanner);
        //This is where we populate the 2D array with pixels from the image
        //We also begin an array of checkedPixels
        //These two function like the board of a battleship game and the pegs that you
        //stick into the board to indicate hits.
        for (int rowIndex = 0; rowIndex < height; ++rowIndex) {
            for (int columnIndex = 0; columnIndex < width; ++columnIndex) {
                image2DPixelized[rowIndex][columnIndex] = fileScanner.nextInt();
                checkedPixels[rowIndex][columnIndex] = false;
            }
        }

        fileScanner.close();
    }

    private static void initializeImageProperties(Scanner fileScanner) {
        //This is the method that gives the variables for the image properties in the
        // program the actual values they need. It also initializes our two arrays used in the
        // prior method and another List used later in the program, which I had to name
        // TwoDList, because Java got angry at me having a 2 in front of it
        // and told me to change that. The last arraylist is essentially the area of the image
        //in the columns, and the Magic Number of the image in the rows.
        String[] WandH_String = fileScanner.nextLine().split(" ");
        width = Integer.parseInt(WandH_String[1]);
        height = Integer.parseInt(WandH_String[2]);
        image2DPixelized = new int[height][width];
        checkedPixels = new boolean[height][width];
        TwoD_List = new int[Magic_Num][height * width + 1];
    }

    private static void findRegionsAndPrintResults() {
        //This method is the one that calls our search function, and prints the results
        //We used nested loops again to go through row by row, column by column in the
        //2D matrix we have.
        //Once we've grown the region, we call the print function.
        ArrayList<Integer> recordedIntensities = new ArrayList<>();
        int numberOfRecordedIntensities = 0;

        for (int rowIndex2 = 0; rowIndex2 < height; ++rowIndex2) {
            for (int columnIndex2 = 0; columnIndex2 < width; ++columnIndex2) {
                if (image2DPixelized[rowIndex2][columnIndex2] == targetIntensity && !checkedPixels[rowIndex2][columnIndex2]) {
                    int regionSize = growConnectedRegion(rowIndex2, columnIndex2);
                    recordedIntensities.add(regionSize+1);
                    ++numberOfRecordedIntensities;
                }
            }
        }

        printResults(recordedIntensities, numberOfRecordedIntensities);
    }

    private static int growConnectedRegion(int startRow, int startColumn) {
        //This is the method that actually grows the regions based on the targetIntensity
        //picked by the command line argument.
        int regionSize = targetIntensity;

        checkedPixels[startRow][startColumn] = true;
        TwoD_List[0][0] = startRow;
        TwoD_List[1][0] = startColumn;
        int listIndex = 0;

        while (listIndex >= 0) {
            int listValue0 = TwoD_List[0][listIndex];
            int listValue1 = TwoD_List[1][listIndex--];

            //Growing out of the region's pixels around the one we've picked.
            for (int rowIndex3 = -1; rowIndex3 < 2; ++rowIndex3) {
                for (int columnIndex3 = -1; columnIndex3 < 2; ++columnIndex3) {
                    int neighborRow = listValue0 + rowIndex3;
                    int neighborColumn = listValue1 + columnIndex3;
                    if (isValidPixel(neighborRow, neighborColumn) && !checkedPixels[neighborRow][neighborColumn]) {
                        checkedPixels[neighborRow][neighborColumn] = true;
                        if (image2DPixelized[neighborRow][neighborColumn] == targetIntensity) {
                            ++regionSize;
                            TwoD_List[0][++listIndex] = neighborRow;
                            TwoD_List[1][listIndex] = neighborColumn;
                        }
                    }
                }
            }
        }

        return regionSize;
    }

    private static boolean isValidPixel(int row, int column) {
        return row >= 0 && row < height && column >= 0 && column < width;
    }

    private static void printResults(ArrayList<Integer> recordedIntensities, int numberOfRecordedIntensities) {
        //This is the print method. Though it does slightly more than printing by first sticking all
        // the recordedIntensities from our ArrayList into another array so we can use the in-built
        // sort on it and have a neatly arranged result as indicated by the results shown in the
        // pdf. Then it prints everything out in the same format as shown in the pdf.
        Integer[] intensitiesArraySortable = recordedIntensities.toArray(new Integer[0]);
        Arrays.sort(intensitiesArraySortable);
        System.out.print(numberOfRecordedIntensities);

        for (Integer integer : intensitiesArraySortable) {
            System.out.print(", " + integer);
        }
        System.out.println(" ");
    }
}
