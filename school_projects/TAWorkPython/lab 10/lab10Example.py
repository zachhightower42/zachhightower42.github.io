# a. Create empty dictionary for order information
order_info = {}

# b. Add item to dictionary with name as key and cost as value
order_info["hamburger"] = 12.99
order_info["fries"] = 4.99
order_info["drink"] = 2.99

# c. Calculate total by summing dictionary values
order_total = sum(order_info.values())

# d. Add order total to dictionary with "total" as key
order_info["total"] = order_total

# e. Print all order information using for loop
for item, price in order_info.items():
    print(f"{item}: ${price:.2f}")
