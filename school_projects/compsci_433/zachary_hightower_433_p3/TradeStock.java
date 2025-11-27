import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class TradeStock {
    // Algorithm name getter
    static String getAlgorithmName(int algorithm) {
        switch (algorithm) {
            case 1:
                return "Brute Force Approach";
            case 2:
                return "Theta(n log n) Divide and Conquer";
            default:
                return "Algorithm not Implemented. List of Implemented Algorithms: Brute Force - 1, Divide and Conquer - 2";
        }
    }
    // Result class to handle structure of output and contain variables for use throughout
    // the program
    static class Result {
        int buyIndex;
        int sellIndex;
        double profit;

        Result(int buyIndex, int sellIndex, double profit) {
            this.buyIndex = buyIndex;
            this.sellIndex = sellIndex;
            this.profit = profit;
        }
    }
    // Stock price reader
    static float[] binReader(String fileName) throws IOException {
        try (DataInputStream dis = new DataInputStream(new FileInputStream(fileName))) {
            int numOfPrices = dis.readInt();
            float[] prices = new float[numOfPrices];
            for (int i = 0; i < numOfPrices; i++) {
                prices[i] = dis.readFloat();
            }
            return prices;
        }
    }

    // Brute force for finding our maximum profit
    static Result bruteForceMaxProfit(float[] prices) {
        int buyIndex = 0;
        int sellIndex = 0;
        double maxProfit = Double.NEGATIVE_INFINITY;

        for (int i = 0; i < prices.length - 1; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                double tempProfit = prices[j] - prices[i];
                if (tempProfit > maxProfit) {
                    maxProfit = tempProfit;
                    buyIndex = i;
                    sellIndex = j;
                }
            }
        }

        return new Result(buyIndex, sellIndex, maxProfit);
    }

    // Divide and conquer approach for finding max profit in n log n time complexity
    static Result maxProfitDivideAndConquer(float[] prices, int low, int high) {
        if (high <= low) {
            return new Result(-1, -1, 0);
        }

        // Find mid-point
        int mid = (low + high) / 2;

        // Recursive calls
        Result leftResult = maxProfitDivideAndConquer(prices, low, mid);
        Result rightResult = maxProfitDivideAndConquer(prices, mid + 1, high);

        // Variables for finding crossMax
        float minPrice = Float.MAX_VALUE;
        float maxPrice = Float.MIN_VALUE;
        int buyIndex = -1;
        int sellIndex = -1;

        // Min on left and max on right
        for (int i = low; i <= high; i++) {
            if (i <= mid && prices[i] < minPrice) {
                minPrice = prices[i];
                buyIndex = i;
            }
            if (i > mid && prices[i] > maxPrice) {
                maxPrice = prices[i];
                sellIndex = i;
            }
        }

        // Find max profit between left, cross, and right
        double crossMaxProfit = maxPrice - minPrice;

        // Handle three usual cases and edge case of no profit
        Result maxProfitResult;
        if (leftResult.profit == Double.NEGATIVE_INFINITY && rightResult.profit == Double.NEGATIVE_INFINITY &&
                crossMaxProfit < 0) {
            // No profit found edge case
            maxProfitResult = new Result(buyIndex, sellIndex, crossMaxProfit);
        } else if (leftResult.profit >= rightResult.profit && leftResult.profit >= crossMaxProfit) {
            maxProfitResult = leftResult;
        } else if (rightResult.profit >= leftResult.profit && rightResult.profit >= crossMaxProfit) {
            maxProfitResult = rightResult;
        } else {
            maxProfitResult = new Result(buyIndex, sellIndex, crossMaxProfit);
        }

        return maxProfitResult;
    }

    public static void main(String[] args) {
        // CL validator
        if (args.length != 2) {
            System.err.println("Usage: java TradeStock <filename> <algorithm>");
            System.exit(1);
        }

        String fileName = args[0];
        int algorithm = Integer.parseInt(args[1]);

        try {
            float[] prices = binReader(fileName);
            Result result;
            if (algorithm == 1) {
                result = bruteForceMaxProfit(prices);
            } else if (algorithm == 2) {
                result = maxProfitDivideAndConquer(prices, 0, prices.length - 1);
            } else {
                System.err.println("Algorithm not Implemented. List of Implemented Algorithms: Brute Force - 1, Divide and Conquer - 2");
                return;
            }

            // Output structure and error handler
            System.out.println("Zachary Hightower");
            System.out.println(fileName);
            System.out.println(getAlgorithmName(algorithm));
            System.out.println("Bought: " + result.buyIndex + ", Sold: " + result.sellIndex + ", Profit: " + result.profit);
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            System.exit(1);
        } catch (NumberFormatException e) {
            System.err.println("Invalid algorithm number: " + args[1]);
            System.exit(1);
        }
    }
}
