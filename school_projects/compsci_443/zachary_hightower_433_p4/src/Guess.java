import java.util.Scanner;

public class Guess {
    private static int[][] costs;
    private static int[][] guesses;

    public static void main(String[] args) {
        int m;
        int n;
        int switcher = 0;


        if (args.length == 2 || args.length == 3) {
            m = Integer.parseInt(args[0]);
            n = Integer.parseInt(args[1]);
            if (args.length == 3) {
                switcher = Integer.parseInt(args[2]);
            }
        } else {
            userManual();
            return;
        }

        createTablesFindMin(m, n);

        switch (switcher) {
            case 0:
                findMinGuesses(m, n);
                break;
            case 1:
                awakenZOLTAR(m, n);
                break;
            default:
                System.out.println("Invalid input");
                userManual();
        }
    }
    private static void userManual() {
        System.out.println("Input must be in the form:");
        System.out.println("java -jar Guess.jar <m> <n> <switcher>");
        System.out.println("m is the # of guess tokens");
        System.out.println("n is the upper range of the targer number. I.e. 0 -> n");
        System.out.println("switcher is what allows the user to pick between option 0 or 1");
        System.out.println("option 0, finds the minimum number of guesses necessary to guess target number with given amount of tokens and range");
        System.out.println("option 1, the program engages ZOLTAR and he reads the mind of the player to find out what number they're thinking of");
    }
    private static void createTablesFindMin(int m, int n) {
        costs = new int[m + 1][n + 1];
        guesses = new int[m + 1][n + 1];

        for (int i = 1; i <= n; ++i) {
            costs[1][i] = i;
            guesses[1][i] = 1;
        }

        for (int i = 1; i <= m; ++i) {
            costs[i][1] = 1;
            guesses[i][1] = 1;
        }

        for (int i = 2; i <= m; ++i) {
            for (int j = 2; j <= n; ++j) {
                int minCost = n + 1;

                for (int k = 1; k <= j; ++k) {
                    int cost = Math.max(costs[i - 1][k - 1], costs[i][j - k]) + 1;
                    if (cost < minCost) {
                        minCost = cost;
                        guesses[i][j] = k;
                    }
                }
                costs[i][j] = minCost;
            }
        }
    }

    private static void findMinGuesses(int m, int n) {
        System.out.println("Zachary Hightower");
        System.out.printf("For a target number between 0 and %d, with %d chips, it takes at most %d questions to identify the target number in the worst case.\n", n, m, costs[m][n]);
    }


    private static void awakenZOLTAR(int m, int n) {
        Scanner scanner = new Scanner(System.in);
        int remainingTokens = m;
        int targetNum = n;
        int currentGuess = guesses[remainingTokens][targetNum];
        int questionNum = 0;
        int sum = 0;

        System.out.println("Zachary Hightower");
        System.out.println("I am ZOLTAR reader of fortunes and minds.");
        System.out.printf("Call to mind a number between 0 and %d, and ZOLTAN shall read your mind\n", n);

        do {
            System.out.printf("Tokens remaining : %d. Guess # %d: Is the number less than %d? (Y/N) ", remainingTokens, ++questionNum, sum + currentGuess);
            char answer = scanner.next().charAt(0);
            if (answer != 'Y' && answer != 'y') {
                targetNum -= currentGuess;
                sum += currentGuess;
            } else {
                remainingTokens--;
                targetNum = currentGuess - 1;
            }

            currentGuess = guesses[remainingTokens][targetNum];
        } while (currentGuess != 0);

        System.out.printf("ZOLTAR has read your mind Your number is...~~ %d ~~\n", sum);
    }

}
