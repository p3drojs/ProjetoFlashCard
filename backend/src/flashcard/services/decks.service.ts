import Decks from "../schemas/decks";
import { decksTypes } from "../types/decks";

class DecksService{
    async createDeck(newDeck: decksTypes):Promise<decksTypes>{
        return Decks.create(newDeck);
    }
    async update (updateDeck: decksTypes, deckId: string){
        const updtDeck = Decks.findByIdAndUpdate(
            deckId,
            {
                $set: updateDeck,
                new: true
            }
        );
        return updtDeck;    
    }
    async delete(deckId: string){
        Decks.findByIdAndDelete(deckId);
    }
    async list(newDeck: decksTypes):Promise<decksTypes[]>{
        return Decks.find();
    }
}

export default new DecksService();