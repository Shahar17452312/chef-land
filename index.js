import express from "express";
import bodyParser  from "body-parser";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY;
const app=express();
const port=3000;


app.use(express.static("public"));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/recipe",async (req,res)=>{
    try {
        const reuslt= await axios.get("https://api.api-ninjas.com/v1/recipe?query="+req.body.data,{
            headers:{
                'X-Api-Key':apiKey
            }
        });
        console.log(reuslt.data[0].ingredients);
    } catch (error) {
        console.log(error.message);
        
    }

});




app.listen(port,(req,res)=>{
    console.log("Server is running on port "+port);
});