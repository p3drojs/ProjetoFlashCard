import Cards from "../schemas/cards";
import { cardsTypes } from "../types/cards";

class CardsServices{
    async create(card:cardsTypes):Promise<cardsTypes>{
        const newCard = Cards.create(card);
        return newCard;
    }
    async update(card:cardsTypes, cardId: String){
        const updateCard = Cards.findByIdAndUpdate(
            cardId,
            {
                $set: card,
                new: true
            }
        );
        return updateCard;
    }
    async delete(cardId: String){
        const newCard = Cards.findByIdAndDelete(cardId);
    }
    async list():Promise<cardsTypes[]>{
        const cards =  Cards.find();
        return cards;
    }
}

export default new CardsServices();