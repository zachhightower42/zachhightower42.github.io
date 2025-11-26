
**Question 1:** Go through each sentence and add count how many positive words there are, how many negative words there are, and ignore any neutral words that are not represented in the lexicon dictionaries. Sum them like so, PW - NW = S, using S as a stand in for solution. Then, if your results is positive, the sentiment is recorded as positive by the sentiment analysis. If it is negative, it is recorded as negative. If it is 0, then it is recorded as neutral. 

**Question 2:** This is a ratio of how many correct answers the sentiment analysis gave, over the amount of total answers. I accepted any answers like 2/6 or 3/6 if you got the previous question correct, since there is one that is negative ground truth, unlike what the question says. If you got the first question wrong, I checked to see if your ratio is accurate to what you said the answers were in the first part, and gave credit. 

**Question 3:** What we're specifically looking for here is recognition that stemming removes suffixes, and may result in non words. Lemmatization goes to a base word or a synonym and always results in real words. 

**Question 4:** The first 3 questions here are disregarded, due to issues with differentiation in stemming v. lemmatization. The last four should be, were -> (to) be ( lemmatization ) , formality -> formaliti ( stemming ) ,  guilty -> guilti ( stemming ) , political -> polit ( stemming) Remember, stemming is essentially cutting any suffixes off the word, and returning that. Lemmatization forces it to the root word, or a synonym. Stemming can results in non-words, lemmatization always gives real words. 

**Question 5:** What we need here is a sentence that will result in a false positive or a false negative when put into the sentiment analysis algorithm. Then, an explanation of how it causes that false positive or false negative. Example, I'm sure the movies was great for some people. This causes the sentiment analysis to rank the comment positively, but the actual intent is to show that it wasn't great, for whoever left this comment. Meaning we've got a False Positive.

**Question 6:** Bag of words extraction is just taking each word from sentences 4, 5, and 6, then counting the number of times each word occurs. Example. The word it occurs 0 times in the fourth sentence, 1 time in the fifth sentence, and 2 times in the sixth sentence. So the it column would look like 0, 1, 2 reading from top to bottom.

test
