# Macros
## Pax Equus

**Basic roll**
{% raw %}
`&{template:default} {{name=?{What is the roll}}} {{Roll=[[1d20 + ?{Modifier|0}]]}} {{Action=*?{Any added info about roll}*}} {{TN=20}} {{CRIT on=[[20 + ?{Modifier|0}]]}}`
{% endraw %}
 This roll is made up of queries to the user using the `?{}` command in roll20 and a few other neat little tricks to allow for a nice looking display.
 
 ![Basic Roll Example](zachhightower42.github.io/pax/roll examples images/ex for pax basic roll 1.png)

**Initiative roll basic**
{% raw %}
`/roll 1d10+<put Finesse number here> &{tracker} Initiative`
{% endraw %}
*PLEASE PAY ATTENTION TO THIS*

You cannot use this roll as a regular macro in the macros section. You need to place this specifically in the ABILITIES section on your character sheet. 

The easiest way to get full function out of this is to put it under abilities as something like Init or Initiative, and set it to show as a token action. That way, when you need to roll initiative, you can simply click your character token, press the button, and your initiative will be rolled and added to the tracker automatically. 

**Initiative roll autocall**
{% raw %}
`/roll 1d10 + @{Finesse} &{tracker} Initiative`
{% endraw %}
This is the same as the above, except it automatically uses the value set in an associated attribute called Finesse (case sensitive)

You can get this to work by making a new attribute, naming it Finesse (please note that this is case sensitive, so finesse would not work if you just copy pasted the roll above), and then setting the *Current* value for Finesse to whatever your finesse modifier is. 

**Weapon rolls**
{% raw %}
`&{template:default} {{name=Biggus Stickus}} {{Roll=[[1d20 + ?{Modifier|0}]]}} {{Location=[[1d12 + ?{Loc. Mod|0}]]}} {{Weapon Info= **DAM** 9 | **RNG** 1 | **Fire Rate** 2 | Light | Requires Contested Roll | +4 to Hit Dice when the Aggressor}}  {{TN=20}} {{CRIT on=[[20 + ?{Modifier|0}]]}}`
{% endraw %}
This is a basic roll for shooting someone with a thing.

It queries you for most of what you'd need to put in. 
HOWEVER
You do need to copy paste the actual weapon info in the spot for weapon info, so it will neatly display all the actual facts you need to be aware of for your given thingajig. 

You should also copy paste the name of the weapon into the spot currently occupied by Biggus Stickus


**Damage Calculation**
{% raw %}
`&{template:default} {{name=Damage Calculator}} {{Damage=[[?{Weapon Damage} * ?{Location Mod.|0-2 Grazed,0.5|3-4 Lower Torso,1|5-6 Forelegs,0.75|7-8 Hind Legs,1|9 Gizzard,1.5|10  Shoulder,1.5|11 Flank,1.5|12 Upper Chest,2|13 Head,3| 13 alternate Gun,1}]]}} {{Effect=?{Location Effect|0-2 Grazed,Grazed|3-4 Lower Torso,Lower Torso|5-6 Forelegs, Forelegs Crippled|7-8 Hind Legs, Hind Legs Crippled|9 Gizzard, Gizzard|10  Shoulder, Shoulder Crippled|11 Flank, Flank Crippled|12 Upper Chest, Upper Chest|13 Head, Head| 13 alternate Weapon, Weapon Disarmed}}}`
{% endraw %}
All you have to do is enter the damage, and then put in the location, it will give you the amount of damage done and what kind of effect it had, if any, on the place you shot. 

Currently it only goes up to calculating headshots, because in virtually all scenarios that's all that will be needed. 

## Sarge's Bug Game and Delve

**Basic roll**
{% raw %}
`&{template:default} {{name=?{What is the roll}}} {{?{Attribute 1}=[[1d?{Attribute 1 die type}]]}} {{?{Attribute 2}=[[1d?{Attribute 2 die type}]]}} {{?{Attribute 3}=[[1d?{Attribute 3 die type}]]}}`
{% endraw %}
 This roll is made up of queries to the user using the `?{}` command in roll20 and a few other neat little tricks to allow for a nice looking display. It only allows for three different conditions on the roll.
 
 ![Basic Roll Example](zachhightower42.github.io/pax/roll examples images/bug game basic example roll.png)


**Effect Roll**
{% raw %}
`&{template:default} {{name=?{What is the roll}}} {{Result=[[?{first value}+?{second value}]]}} {{Effect=?{dice effect class}}}`
{% endraw %}
This roll is made up of queries to the user using the `?{}` command in roll20 and a few other neat little tricks to allow for a nice looking display. It takes in three values from the user and displays the effects of the roll so that you can see how it actually resolves.
 
 ![Effect Roll Example](zachhightower42.github.io/pax/roll examples images/bug game effect roll example.png)
