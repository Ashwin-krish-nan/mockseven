Food Delivery App Backend


##User side:
register endpoint:/api/register
registering the user into the food delivery app

login endpoint:/api/login
login the user into the food delivery app

reset password:/api/user/:id/reset
This endpoint should allow users to reset the password identified by user id, providing the current password and new password in the body.


##restauraunt:

/api/restaurants:
This endpoint should return a list of all available restaurants.

/api/restaurants/:id:
This endpoint should return the details of a specific restaurant identified by its ID.

/api/restaurants/:id/menu:
This endpoint should return the menu of a specific restaurant identified by its ID.


/api/restaurants/:id/menu:
This endpoint should allow the user to add a new item to a specific restaurants menu identified by it id.

/api/restaurants/:id/menu/:id:
This endpoint should allow the user to delete a particular menu item identified by its id from a specific restaurant.


/api/orders:
this endpoint should allow the user to place an order.

/api/orders/:id:
This endpoint should return the details of a specific order identified by its ID.

/api/orders/:id:
This endpoint should allow users to update the status of a specific order identified by its ID.



