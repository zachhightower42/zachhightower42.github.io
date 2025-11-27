//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import java.util.Scanner;

class InstructorGuess {
    public static int m = 2;
    public static int n = 3;
    public static int option = 0;
    public static int[][] costs;
    public static int[][] guesses;

    InstructorGuess() {
    }

    public static void main(String[] var0) {
        System.out.println("Yixin Chen");
        if (var0.length == 2) {
            m = Integer.parseInt(var0[0]);
            n = Integer.parseInt(var0[1]);
        } else {
            if (var0.length != 3) {
                System.out.printf("Usage: java Guess m n option\n");
                System.out.printf("Usage: java -jar Guess.jar m n option\n");
                System.out.printf("       m:            the number of chips\n");
                System.out.printf("       n:            the range of target number\n");
                System.out.printf("       option:       0 - show minimum number of questions\n");
                System.out.printf("                     1 - show the table of minimum number of questions\n");
                System.out.printf("                     2 - show the table of minimum number of questions and the optimal guesses\n");
                System.out.printf("                     3 - play the game with user as the referee\n");
                return;
            }

            m = Integer.parseInt(var0[0]);
            n = Integer.parseInt(var0[1]);
            option = Integer.parseInt(var0[2]);
        }

        costs = new int[m + 1][n + 1];
        guesses = new int[m + 1][n + 1];

        int var2;
        for(var2 = 1; var2 <= n; ++var2) {
            costs[1][var2] = var2;
            guesses[1][var2] = 1;
        }

        for(var2 = 1; var2 <= m; ++var2) {
            costs[var2][1] = 1;
            guesses[var2][1] = 1;
        }

        int var3;
        int var4;
        for(var2 = 2; var2 <= m; ++var2) {
            for(var3 = 2; var3 <= n; ++var3) {
                costs[var2][var3] = n + 1;

                for(var4 = 1; var4 <= var3; ++var4) {
                    int var1 = costs[var2 - 1][var4 - 1] > costs[var2][var3 - var4] ? costs[var2 - 1][var4 - 1] + 1 : costs[var2][var3 - var4] + 1;
                    if (var1 < costs[var2][var3]) {
                        costs[var2][var3] = var1;
                        guesses[var2][var3] = var4;
                    }
                }
            }
        }

        if (option == 0 || option == 3) {
            System.out.printf("For a target number between 0 and %d, with %d chips, it takes at most %d questions to identify the target number in the worst case.\n", n, m, costs[m][n]);
        }

        if (option == 1 || option == 2) {
            for(var2 = 1; var2 <= m; ++var2) {
                for(var3 = 1; var3 <= n; ++var3) {
                    System.out.printf("costs[%d][%d] = %d, ", var2, var3, costs[var2][var3]);
                }

                System.out.printf("\n");
            }
        }

        if (option == 2) {
            for(var2 = 1; var2 <= m; ++var2) {
                for(var3 = 1; var3 <= n; ++var3) {
                    System.out.printf("guesses[%d][%d] = %d, ", var2, var3, guesses[var2][var3]);
                }

                System.out.printf("\n");
            }
        }

        if (option == 3) {
            Scanner var10 = new Scanner(System.in);
            var4 = m;
            int var5 = n;
            int var6 = guesses[var4][var5];
            int var7 = 0;
            int var8 = 1;
            System.out.printf("Please pick a number between 0 and %d in your mind, and let's play the game. :-|\n", n);

            do {
                System.out.printf("Number of Chips Remaining = %d. Question %d: Is the target integer less than %d? (Y/N) ", var4, var8++, var7 + var6);
                char var9 = var10.next().charAt(0);
                if (var9 != 'Y' && var9 != 'y') {
                    var5 -= var6;
                    var7 += var6;
                } else {
                    --var4;
                    var5 = var6 - 1;
                }

                var6 = guesses[var4][var5];
            } while(var6 != 0);

            System.out.printf("I nailed it! The target number is %d!! ;-)\n", var7);
        }

    }
}
