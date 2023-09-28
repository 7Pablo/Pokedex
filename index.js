//Import express for handling requests and axios to handel API requests
import express from "express";
import axios from "axios";

//Create an app with express, define a port, and fetch the API URL.
const app = express();
const port = 3000;
const pokeURL = "https://pokeapi.co/api/v2/pokemon/";

//Middleware to parse incoming requests bodies
app.use(express.urlencoded( { extended: true }));

//Middleware that serves static files in the public directory
app.use(express.static("public"));

//Get handler that retrieves information of the Pokeapi and renders the home page
app.get("/", async (req, res) => {
    try{
        const result = await axios.get(pokeURL + "pikachu");
        res.render("index.ejs", { content: result.data });
    } catch(error) {
        res.status(500).send("Failed to make request: ", error.message);
    }
});

//Post handler that uses the request body to update the content information. If an error occurs the user is redirected to the home page. 
app.post("/", async (req, res) => {
    try{
        const result = await axios.get(pokeURL + req.body.pokeName);
        res.render("index.ejs", { content: result.data});
    } catch(error) {
        console.error("Failed to fetch pokemon:", error.message);
        res.redirect("/");

    }
});

//Method that starts the server and listens for requests on port 3000
app.listen(port, () => {
    console.log("Server running on port " + port);
});