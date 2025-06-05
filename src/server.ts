import express, { Application, Response } from 'express';
import dotenv from 'dotenv';



dotenv.config(); // Load environment variables from .env file

const app:Application = express(); // Create an Express application

 
const PORT = process.env.PORT || 3000; // Set the port from environment variables or default to 5000

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

//default route
app.get('/',(req,res:Response)=>{
    res.send('Welcome to Express API Backend with drizle ORM and PostgreSQL');
})


//Start server
 
app.listen(PORT,()=>{
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})