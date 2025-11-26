Grading Scale 10/10
Qs 1-5 count as 1 each
Q6 count as 1.25
Q7 count as 2.00
Q8 count as 1.75
Sub questions in 6 counts as .15 each
Sub questions in 5 counts as .14 each

Q1
 `import three libaries: "pandas", "numpy"`
 `[TODO]`
`import pandas as pd`
`import numpy as np`
`import matplotlib.pyplot as plt`
Q2
 `upload "wages_quiz.csv" dataset to the Google Colab`
 `"wages_quiz.csv" can be first downloaded from the Course Website`
 `or can be downloaded from the link below`
 `https://drive.google.com/file/d/12r2ksvGkYnA0DXYP9Ov32u4mUlcdDSlG/view?usp=sharing`
 `[TODO]`
`DONE`
 `now, you can load dataset from wages_quiz.csv into a pandas dataframe using function`
 `[TODO]`
`df = pd.read_csv('./wages_quiz.csv')`
Q3
`Print out the first 5 rows of the datast`
`[TODO]`
`df.head()`
Q4
1 Missing value
Q5
Data type of year is **discrete**
Data type of age is **discrete**
Data type of race is **nomial**
Data type of education is **ordinal**
Data type of jobclass is **nomial**
Data type of health_ins is **nomial**
Data type of wage is **continuous**
Q6
 Answer: The number of people that have "Advanced Degree" is 426
  6.1 Answer: 1544
  6.2  Answer: 917
  6.3  Answer: 4
  6.4  Answer: 111.70761425192795
  6.5  Answer: 104.921506533664
  6.6 Answer: 112.568859
  6.7  Answer: Asian (120.288)
  6.8  Answer: 339
6.9 Answer: 42.34074074074074
Q7
 `If you are above 30 years old and`
 `are an "College Grad" ("4. College Grad"),`
 `you are looking for a job in the "Information" jobclass,`
 `during salary negotiation, the employer offers a wage of 100,`
 `will you accept the job offer or you will negotiate?`
 `[TODO]`
`mask = df.apply(lambda x: x['age'] > 30 and \`
`x['education'] == '4. College Grad'\`
`and x['jobclass'] == '2. Information', axis=1)`
`df[mask]['wage'].describe()`
 `PLEASE EXPLAIN`
 `[TODO]`
`df[mask]['wage'].plot(kind='box')`
`plt.axhline(y=100)`
`plt.axhline(y=290, c='red')`
![[Pasted image 20240308163131.png]]

  `Similiar to the previous question...`
**Answer:** No negotiations because the offer is already high (290), which is way above the average or even the
maximum found in the dataset OR although the offer is already high (290), which is way above the average
or even the maximium found in the dataset, I still want to negotiate
Q8
`Please imput the missing value(s) that you previously found in the dataset`
`[TODO]`
`df.info()`
`mask = pd.isna(df)['wage']`
`df[mask]`
`mask2 = df.apply(lambda x: x['jobclass'] == "1. Industrial",`
`axis = 1)`
`replace = df[mask2]['wage'].mean()`
`df.iloc[2996, 6] = replace`
 `Confirm that there are no more missing values`
`This command should return TRUE`
`(~pd.isna(df)).sum().sum() == df.shape[0]*df.shape[1]`

