I think the function you've got written in there is a little too complex in this portion. 
![[Pasted image 20240318155624.png]]

It would be much easier to use the data frame of the lexicon file that you have here. 
![[Pasted image 20240318155700.png]]

And use the following code to make a usable dict with it. 

`newDict = df.set_index('term').to_dict()['score']`

Then you can call newDict to check and see if it worked. It should have a result like the following. 

![[Pasted image 20240318155857.png]]
