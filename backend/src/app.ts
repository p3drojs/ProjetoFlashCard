import express from "express";
import mongoose from 'mongoose';
import { routes } from  './routes';

class App{
    public express: express.Application
    
    constructor(){
        this.express = express();
        this.database();
        this.middleware();
        this.routes();
    }

    public middleware(){
        this.express.use(express.json());
    }

    public async database(){
        try {
            await mongoose.connect('mongodb://0.0.0.0:27017/mongo');
            console.log("Sucesso ao conectar no banco!");
        } catch (error) {
            console.log("Deu erro!");
        }
    }

    public routes(){
        this.express.use(routes)
    }
}

export default new App().express