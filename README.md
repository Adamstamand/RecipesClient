# Recipe App

This project is an Angular web app where users can view and create new recipes. Each recipe has its own specific page that is generated when a user makes a new recipe.

## Home Page

The home page displays all of the recipes that are public. All users of the site can view these recipes. Users can click on the name of any recipe and they will be redirected to the page that displays all of the information about that recipe.

## Log In / Register

For everything that is not the home page or a public recipe, the user will have to log in or register to access it. The log in page displays both the log in and register forms. Each form element has validations that need to be met. If those validations are not met, then the submit button will be greyed out and the user will be unable to submit their log in attempt. Error messages appear beneath the element that does not meet the required validations. On a successful log in or register attempt, the user will be redirected to the add a recipe page.

## Recipe Form Component

The recipe form component is a reusable form that is used on both the add a recipe and the dashboard pages. The form contains all of the information required about a recipe. All elements are required aside from the photo element. Each form element has validations that need to be met. If those validations are not met, then error messages will appear beneath that element. The ingredient and instruction lists allow you to sort and delete items of their respective list, in case you decide to change the order of your inputs, or you want to delete one of your inputs. 

## Add Recipe
Users must be logged in to an account to access this page.

This page uses the recipe form component. Users can input all of the information about the recipe they want to create. They have to meet all of the validations set on the form, and if they do, the submit button will be active and they have the ability to submit their recipe. The submit button sends a post request to the backend. If the request succeeds, the user is redirected to the page for the recipe that they have just created.

## Dashboard
Users must be logged in to an account to access this page.

The dashboard page has 3 main sections: My Recipes, Edit One Of Your Recipes, and Delete A Recipe.

The My Recipes section displays all of the recipes that the user has created. It separates the recipes based on the privacy that has been set for that recipe.

The Edit One Of Your Recipes section has a select box that contains every recipe the user has created. When they select one of their recipes, the recipe form component will appear and it will contain all of the information about the recipe they have selected. They can then edit any of the values about that recipe. If their edits meet the required validations, the submit button will be active and they can submit their edit request. The submit button sends a put request to the backend. If the request succeeds, the user is redirected to the page for that recipe. The new recipe page will display the recipe with all of the information updated to match what the user has just submitted.

The Delete A Recipe section has a select box that contains every recipe the user has created. Users can select any of the recipes from that list, and click the delete button. This immediately remove the recipe from their lists, and it will send a delete request to the backend. If the request succeeds, the recipe is deleted from the database.
