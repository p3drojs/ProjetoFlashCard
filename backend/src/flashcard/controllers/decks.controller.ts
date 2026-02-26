import { Request, Response } from "express";
import DecksService from "../services/decks.service";

class DecksController{
    async create(req: Request, res: Response){
        return DecksService.createDeck(req.body);
    }
    async getAll(req: Request, res: Response){
        return DecksService.list;
    }
    async update(req: Request, res: Response){
        return DecksService.update(req.body, String(req.params));
    }
    async delete(req: Request, res: Response){
        return DecksService.delete;
    }
}

export default new DecksController()