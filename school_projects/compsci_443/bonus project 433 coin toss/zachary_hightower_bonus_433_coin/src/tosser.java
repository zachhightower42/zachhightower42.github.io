import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;



    public class tosser {
        public static void main(String[] args) {
            System.out.println("In this coin battle, Bob will give Alice no quarter. He's going to show us who the real tosser is.");
            if (args.length != 2) {
                System.out.println("Incorrect argument structure. Formula is:tosser {#tosses} {#trials}");
                return;
            }

            int coins = Integer.parseInt(args[0]);
            int games = Integer.parseInt(args[1]);

            randomGame(coins);

            findTheoreticalProbabilities(coins);

            findExperimentalProbabilities(coins, games);
        }

        private static void randomGame(int coins) {
            System.out.println("####\nRandom Game\n");
            int aScore = 0, bScore = 0;
            boolean prevGame = new Random().nextBoolean();

            for (int i = 0; i < coins - 1; i++) {
                boolean toss = new Random().nextBoolean();
                if (prevGame) {
                    if (toss) {
                        aScore++;
                    } else {
                        bScore++;
                    }
                }
                prevGame = toss;
            }

            System.out.println("Alice's score: " + aScore);
            System.out.println("Bob's score: " + bScore);
            if (aScore > bScore) {
                System.out.println("Alice annihilates Bob!");
            } else if (aScore < bScore) {
                System.out.println("Bob beats Alice!");
            } else {
                System.out.println("Tie, everyone loses!");
            }
        }

        private static void findExperimentalProbabilities(int coins, int trials) {
            int aliceWon = 0, bobWon = 0, tie = 0;

            for (int i = 0; i < trials; i++) {
                int aScore = 0, bScore = 0;
                boolean prevGame = new Random().nextBoolean();

                for (int j = 0; j < coins - 1; j++) {
                    boolean toss = new Random().nextBoolean();
                    if (prevGame) {
                        if (toss) {
                            aScore++;
                        } else {
                            bScore++;
                        }
                    }
                    prevGame = toss;
                }

                if (aScore > bScore) {
                    aliceWon++;
                } else if (aScore < bScore) {
                    bobWon++;
                } else {
                    tie++;
                }
            }

            BigDecimal pAliceWon = BigDecimal.valueOf(aliceWon).divide(BigDecimal.valueOf(trials), 5, RoundingMode.HALF_UP);
            BigDecimal pBobWon = BigDecimal.valueOf(bobWon).divide(BigDecimal.valueOf(trials), 5, RoundingMode.HALF_UP);
            BigDecimal pTie = BigDecimal.valueOf(tie).divide(BigDecimal.valueOf(trials), 5, RoundingMode.HALF_UP);

            System.out.println("####\nExperiment Probabilities\n");
            System.out.println("P(A),Chance that Alice wins = " + pAliceWon);
            System.out.println("P(B),Chance that Bob wins = " + pBobWon);
            System.out.println("P(tie),Chance for a tie = " + pTie);
        }

        private static void findTheoreticalProbabilities(int n) {
            int[] scoreH = new int[2 * n + 1];
            int[] scoreT = new int[2 * n + 1];

            scoreH[n - 1] = 1;
            scoreH[n + 1] = 1;
            scoreT[n] = 2;

            for (int i = 3; i <= n; i++) {
                int[] total = sumArrays(scoreH, scoreT);
                scoreH = sumOffsetArrays(scoreH, scoreT);
                scoreT = total;
            }

            int[] total = sumArrays(scoreH, scoreT);
            int tieScore = total[n];
            int aliceScore = 0;
            for (int i = n + 1; i < total.length; i++) {
                aliceScore += total[i];
            }
            int bobScore = 0;
            for (int i = 0; i < n; i++) {
                bobScore += total[i];
            }

            BigDecimal possibleOutcomes = BigDecimal.valueOf(aliceScore + bobScore + tieScore);
            BigDecimal pAlice = BigDecimal.valueOf(aliceScore).divide(possibleOutcomes, 5, RoundingMode.HALF_UP);
            BigDecimal pBob = BigDecimal.valueOf(bobScore).divide(possibleOutcomes, 5, RoundingMode.HALF_UP);
            BigDecimal pTie = BigDecimal.valueOf(tieScore).divide(possibleOutcomes, 5, RoundingMode.HALF_UP);

            System.out.println("####\nTheoretical Probabilities\n");
            System.out.println("P(A),Chance that Alice wins = " + pAlice);
            System.out.println("P(B),Chance that Bob wins = " + pBob);
            System.out.println("P(tie),Chance for a tie = " + pTie);
        }

        private static int[] sumArrays(int[] scoreH, int[] scoreT) {
            int[] addedArray = new int[scoreH.length];
            for (int i = 0; i < scoreH.length; i++) {
                addedArray[i] = scoreH[i] + scoreT[i];
            }
            return addedArray;
        }

        private static int[] sumOffsetArrays(int[] scoreH, int[] scoreT) {
            int[] addedArray = new int[scoreH.length];
            for (int i = 1; i < scoreH.length - 1; i++) {
                addedArray[i] = scoreH[i - 1] + scoreT[i + 1];
            }
            return addedArray;
        }
    }




