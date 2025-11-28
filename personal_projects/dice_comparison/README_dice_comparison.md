Tool for comparing dice rolls between a regular set of dice and a set of dice that explode. 


# dice_comparison_1.py

Currently I want to compare how likely it would be to get 1 to 5 hits on a set of ten dice given the following two sets of conditions. 

Conditions 1

- The dice are six sided
- Hits are on 5 or 6

Conditions 2

- The dice are seven sided
- Hits are on 6 or 7
- The dice explode, meaning that any rolled six or seven adds an additional die that is then rolled to check if it is a six or a seven, so on, and so forth


Test the conditions and show in the ouput the probability of the following for Conditions 1 and 2

- How often there are no hits
- How often at least 1 hit
- How oftenat least 2 hits
- How often at least 3 hits
- How often at least 4 hits
- How often at least 5 hits
- How often at least 7 hits
- How often at least 8 hits
- How often at least 9 hits
- How often at least 10 hits
- How often there are more then 10 hits


Put these in a bar graph for easy comparison

Language python
libraries needed, random, numpy, pandas, dataframes, matplotlib

Ended up restructuring it to count for the max amount of dice that will generally be usable by a single player, 20. 

Findings show that it is, on large scale, much better to take the dice that always explode versus the dice that do not always explode. 


# dice_comparison_2.py

A variation on the simulation from before, but this time using a tweaked set of conditions. 

Under these conditions, the rolls will be made in groups of 10, which will simulate rouhgly how many rolls will occur in a given 'session' of the simulated roleplaying game. 

The rolls will now each be assigned threshholds. Roll threshholds will be the amount of hits to succeed for the given roll. These threshholds will be randomly assigned from 1 to 6. 

A random amount of rolls from each 'session' will be important rolls. These simulate rolls that the player really wants to succeed. The amount of important rolls will be anywhere from 0 to 5 and will be assigned randomly for each 'session' 

The dice variants simulated will be the following

Dice 1
- These simulated players have 2 uses of 're-roll and add' 
- When an important roll does not succeed, the simulated player will use 're-roll and add' this will re-roll all the dice and add any dice that hit in the re-roll to the amount of hits from the first dice roll.
- Dice are six sided
- Hits occur on a five or a six
- Dice never explode

Dice 2
- These simulated players have 2 uses of 'sexy dice'
- When an important roll is reasonably difficult with a threshhold of 3 to 6, the simulated player will use 'sexy dice.' This will roll double the amount of dice that would normally be used, with the dice exploding, meaning any hit causes another die to be rolled, which can hit, and cause another die to be rolled, so on and so forth
- Hits occur on a five or a six
- Dice only explode when the player uses 'sexy dice'

Dice 3
- The dice are seven sided
- Hits are on 6 or 7
- The dice always explode, meaning that any rolled six or seven adds an additional die that is then rolled to check if it is a six or a seven, so on, and so forth

Test the conditions and show in the ouput the probability of the following for Dice 1 to 3
- How often there are no hits
- How often the player succeeds all the rolls in a session
- How often the player succeeds 3/4 of the rolls in a session
- How often the player succeeds 1/2 of the rolls in a session
- How often the player succeeds 1/4 of the rolls in a session
- How often the player succeeds none of the rolls in a session
- How often a player rolls higher than necessary for their rolls across all sessions
*Note:* I added more conditions to this later so that I could measure a few more facets of how the dice would perform in these simulated sessions. Average failure rate, over-success rate, important roll success, and important roll failure were all added later. Reasons for adding them and what they measure will be in the Findings section. 



# Findings
![[final graph for dice probabilties for 404 system.png]]

Only the final graph is being included here, since it measures everything that the previous iteration did and more. 

Overall, the behavior of the three dice variants are comparable. Dice 1 and 2, represented by black and green on the graph, perform about the same. The most significant differentiation between the two is that, under the simulated conditions, dice 1 is less likely to use their special than dice 2. Eyeballing this, there is about a 0.1 gap between the two. This is enough that I'd say the difference there is significant

The other remarkable point is the gap between dice 3 and dice 1 and 2 in important roll success and important roll failure. There's a stark difference of about 0.3 between our dice 1 and 2 and dice 3. This means that if you're going with dice 3, you will have a much higher rate of failure on important rolls than someone using dice 1 or 2. 

Now as far as what impact this has on game design and the actual ethos behind why one set of dice would be picked over another. Dice 1 is meant to be the solid, dependable type that can be used without a lot of effort put behind prior planning. If something goes badly, this dice variant gives the player a ripcord to pull so they can try again. Dice 2 is in the same style, but it requires the player to *know* that a roll is important beforehand and pull this ripcord before making the roll. Dice variant 3 is always active, but the benefits it provides are entirely out of the player's control. 

As far as game design and character design, the variants are meant to represent the following

Dice 1: Low risk, dependable function. The player doesn't need to constantly think about what they're getting into or what their rolls are going to do. Best ease of use, least chance that something goes awry. This will pull in players and characters that don't want to range into the more gambling heavy elements of the other two dice variants

Dice 2: A little more risk, greater chance of highs, and a good measure of control. There's more chance involved in this one, but overall, it functions about the same as dice 1, trading off the ease of use for greater possible rewards. 

Dice 3: High risk, high reward, always on. No ripcord elements to this one, this one is pretty clearly for gambling on the really high highs to offset the low lows. Big gap in dependability compared to the other two dice variants, but that could be made up for if its in a party that can help to cushion the blow of rolling low. 