import java.io.File;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.Scanner;
import java.util.Stack;

public class Instructor_growregion {
    // Global variables
    public static int val;
    public static int width;
    public static int height;
    public static int[][] img;
    public static int[][] queue;
    public static boolean[][] visited;

    Instructor_growregion() {
        // Default constructor
    }

    public static void main(String[] CommandLineArgument) {
        // Check for the correct number of command line arguments
        if (CommandLineArgument.length == 2) {
            String filename = CommandLineArgument[0];
            val = Integer.parseInt(CommandLineArgument[1]);
            System.out.println("Zachary Hightower");
            System.out.println(filename);

            int i;
            int j;
            try {
                // Read image file and extract width, height, and pixel values
                File file0 = new File(filename);
                Scanner fileScan = new Scanner(file0);
                String[] WandH_String = fileScan.nextLine().split(" ");
                width = Integer.parseInt(WandH_String[1]);
                height = Integer.parseInt(WandH_String[2]);
                img = new int[height][width];
                visited = new boolean[height][width];

                // Populate the image array and initialize the visited array
                for(i = 0; i < height; ++i) {
                    for(j = 0; j < width; ++j) {
                        img[i][j] = fileScan.nextInt();
                        visited[i][j] = false;
                    }
                }

                fileScan.close();
            } catch (FileNotFoundException e) {
                System.out.println("ERROR READING IMAGE FILE: " + e.getMessage());
            }

            // Using a stack to store recorded intensities
            Stack<Integer> recordedIntensities = new Stack<>();
            int NumberOfRecordedIntensities = 0;
            queue = new int[2][height * width + 1];

            // Iterate through the image pixels
            for(int index = 0; index < height; ++index) {
                for(i = 0; i < width; ++i) {
                    // Check if the pixel value matches the specified value and is not visited
                    if (img[index][i] == val && !visited[index][i]) {
                        j = 0;
                        int index2 = 0;
                        visited[index][i] = true;
                        queue[0][j] = index;
                        queue[1][j] = i;
                        int var8 = 1;

                        // Use BFS to explore the connected region
                        while(j <= index2) {
                            int queueValue0 = queue[0][j];
                            int queueValue1 = queue[1][j++];

                            // Explore neighboring pixels
                            for(int index3 = -1; index3 < 2; ++index3) {
                                for(int innerIndex3 = -1; innerIndex3 < 2; ++innerIndex3) {
                                    int var13 = queueValue0 + index3;
                                    int var14 = queueValue1 + innerIndex3;
                                    if (var13 != -1 && var13 != height && var14 != -1 && var14 != width && !visited[var13][var14]) {
                                        visited[var13][var14] = true;
                                        if (img[var13][var14] == val) {
                                            ++var8;
                                            queue[0][++index2] = var13;
                                            queue[1][index2] = var14;
                                        }
                                    }
                                }
                            }
                        }

                        // Push the intensity of the connected region onto the stack
                        recordedIntensities.push(var8);
                        ++NumberOfRecordedIntensities;
                    }
                }
            }

            // Convert the stack to an array, sort it, and print the results
            Integer[] intensitiesArraySortable = recordedIntensities.toArray(new Integer[0]);
            Arrays.sort(intensitiesArraySortable);
            System.out.printf("%d", NumberOfRecordedIntensities);

            for(i = 0; i < intensitiesArraySortable.length; ++i) {
                System.out.printf(", %d", intensitiesArraySortable[i]);
            }

            System.out.print("\n");
        } else {
            System.out.println("Incorrect number of command line arguments.");
        }
    }
}
