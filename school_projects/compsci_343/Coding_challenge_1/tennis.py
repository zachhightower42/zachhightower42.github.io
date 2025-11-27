import random
# This is a short program that decides, based on the randomized input data, whether to go
# and play tennis today. I hope this illustrates how a very basic decision tree might work
# with the first main split being whether or not the indoor court is open, which is the best
# deciding factor of if one should consider the weather when playing tennis.
# The other factors come in after that and a conclusion can be reached based on the various
# splits on weather.
chance_of_rain = random.randint(0, 100)
chance_of_sun = random.randint(0, 100)
chance_of_hail = random.randint(0, 100)
chance_of_sleet = random.randint(0, 100)
chance_of_snow = random.randint(0, 100)
chance_of_cloudy = random.randint(0, 100)
good_partner = random.randint(0, 1)
indoor_court = random.choice([True, False])
tennis_time = False
negatives: int = 0
while not tennis_time:
    if indoor_court:
        print("The indoor court is open!")
        print("It's a good day for tennis no matter the weather. Let's grab our rackets.")
        tennis_time = True
    else:
        print("Let's check the weather at the courts today...")
        if chance_of_sun > chance_of_cloudy:
            print("It looks like there's a good chance the sun is out today...")
            negatives = negatives - 1
        if good_partner > 0:
            print("I'm looking forward to playing with my friend...")
            negatives = negatives - good_partner
        if chance_of_snow > 30:
            print("Seems there's a chance of snow...")
            negatives = negatives + 1
        if chance_of_rain > 50:
            print("There's more than a coin flip's chance of rain...")
            negatives = negatives + 1
        if chance_of_sleet > 40:
            print("There's sleet in the forecast...")
            negatives = negatives + 1
        if chance_of_hail > 20:
            print("It might hail...")
            negatives = negatives + 1
        if negatives > 1:
            print("I'm not sure about the weather, lets stay in and play checkers.")
            tennis_time = True
        else:
            print("It's still a good day for tennis. Let's grab our rackets.")
            tennis_time = True
