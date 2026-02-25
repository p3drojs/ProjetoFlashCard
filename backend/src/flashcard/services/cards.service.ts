import Cards from "../schemas/cards";
import { cardsTypes } from "../types/cards";

class CardsServices{
    async create(card:cardsTypes):Promise<cardsTypes>{
        const newCard = Cards.create(card);
        return newCard;
    }
    async update(card:cardsTypes):Promise<cardsTypes>{
        const newCard = Cards.create(card);
        return newCard;
    }
    async delete(card:cardsTypes):Promise<cardsTypes>{
        const newCard = Cards.create(card);
        return newCard;
    }
    async list():Promise<cardsTypes[]>{
        const cards =  Cards.find();
        return cards;
    }
}