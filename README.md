<h1>Movie Theater Application</h1>

 Assembled the back end of a movie website allowing any user to search for their favorite movies using CRUD methods for reviews, and viewing theaters and movies that are showing. Applied router and controller functions to retrieve a user's specific requests using Node.js, Express, and Knex.

<h2>Installation Instructions</h2>

---

To install the backend in this repository:
1. Fork and clone the code by using the `Fork` button at the top of the page
2. cd into the `movies-back-end` folder
3. run `npm install`
4. run `npm run start:dev`

`npm run start:dev` will start the server allowing you to acces the database and make HTTP requests to view data

To install the frontend in this repository:
1. cd into the `movie-front-end` folder
2. run `npm install`
3. run `npm start`

`npm start` will open a web page on a localhost page allowing you to view the data pulled by your backend. 



<h2>Description</h2>

The back end of this repo is split into 3 sections to allow data to be returned for movies, reviews, and theaters
---

<h3> Movies </h3>

Movies has list and read functionality pulling a full list of movies currently in theaters from the data base and allowing you to view specific movies by id. 

<h3> Reviews </h3>

Reviews has list, read, update, and destroy functionality. It allows you to view reviews based on a selected movie and add critic information to the review. It also allows you to update the current score of the review in real time and delete a specific review for the currently viewed movie.

<h3> Theaters </h3>

Theaters only has list functionality. When viewing the theaters tab, you are returned a list of theaters with the movies currently being played at each location. 
