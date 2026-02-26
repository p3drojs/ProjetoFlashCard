import { Request, Response } from "express";
import cardsService from "../services/cards.service";

class CardController{
    async create(req:Request, res:Response){
        res.status(200);
        return await cardsService.create(req.body);
    }
    async getAll(req:Request, res:Response){
        res.status(200);
        return await cardsService.list;
    }
    async delete(req:Request, res:Response){
        res.status(200);
        return cardsService.delete(String(req.params));
    }
    async update(req:Request, res:Response){
        res.status(200);
        return cardsService.update(req.body,String(req.params));
    }
}

export default new CardController();