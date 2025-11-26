Programming part
Each part 1.65 points each

Concept part
Each part .83
Sub questions Q2 .12 each
Sub questions Q3 .17 each

### Data Manipulation 1:
The dataset is kind of messy. For example, instead of just having “White” and “Asian” for the race column, the dataset has “**1.** White” and “**3.** Asian”, which is undesirable in our case. Your next sub-task is to clean up all the messy entries in the “sex”, “race”, “education”, “jobclass” and “health_ins” columns. Specifically, we want to remove all the numbers preceding the categorical values—i.e., transforming **“1. Male” -> “Male”,** **“3. Some College” -> “Some College”,** etc.

### **Data Manipulation 2:**

Let’s create a new column called **“wageclass”,** which categorizes the original numerical “wage” column into different categorical values: “one percent”, “upper class”,  “middle class”, and “low income”. Specifically, any wages >= 99% percentile are considered to be “one percent”, any wages >= 70% percentile are considered to be “upper class”, any wages >= 10% are considered as “middle class” and the rest of the wages are considered as “low income”. The first few rows of your data frame now should look like the one below.

### Data Manipulation 3:
Use the “get_dummies()” Pandas function to generate two dummy columns/series called “health_ins_No” and “health_ins_Yes”. The first one indicates if the corresponding “health_ins” is No and the second one indicates if the corresponding “health_ins” is Yes. The first few rows of your data frame now should look like the one below.
Use the “get_dummies()” Pandas function to generate two dummy columns/series called “health_ins_No” and “health_ins_Yes”. The first one indicates if the corresponding “health_ins” is No and the second one indicates if the corresponding “health_ins” is Yes. The first few rows of your data frame now should look like the one below.

### Coding Challenge 2- Concept Part:
**Q**1. What are the columns in the dataset?
 *The columns in the wages.csv dataset are ‘year’, ‘age’, ‘race’, ‘education’, ‘jobclass’,*
*‘heath_ins’, and ‘wage’. The columns we add in the challenge are ‘wageclass’,*
*‘health_ins_ No’ and ‘health_ins_ Yes’.*

**Q**2. For each column in the dataset, please determine what type of data,
**Q**ualitative or **Q**uantitative, is in each column. If a column is **Q**ualitative, determine
if it is “nominal” or “ordinal”.
 *Year, Age, and Wage are **Q**uantitative (Discrete for Year and Age, Wage in this example*
*is continuous). Race, jobclass, and health_ins are all nominal while education and*
*wageclass are ordinal. If we are analyzing the health_ins Yes and No columns then those*
*technically would be **Q**uantitative in the dataset but represent Yes and No values which*
*would be nominal.*

**Q**3. We want to look closer into the main column “wage”. We want to calculate some of the basic statistics such as “mean”, “variance”, “5% percentile”, “95% percentile”, and “median” of this column.
*=> Mean = 111.7*
*=> Variance = 1741.3*
*=> 5% Percentile = 61.2*
*=> 95% Percentile = 176.99*
*=> Median = 104.9*

**Q**4. Based on those statistics, what conclusions can you draw about the “wage” column?
 *I can conclude that the mean is around the 50% percentile, and that there is a high*
*variance so data points are very spread out from the mean. The median is similar to the*
*mean so the data set has an even distribution.*

**Q**5. Which race has the highest average wage across all the entries in the dataset?
 *The race with the highest average wage is Asian with an average of 120.3, surpassing*
*White with 112.6*

**Q**6. Which education background (“education” column) has the lowest wage across all the
entries in the dataset?
 *The “Some College” education background has the lowest minimum wage at 20.1, but*
*“< HS Grad” has the lowest average wage at 84.1.*