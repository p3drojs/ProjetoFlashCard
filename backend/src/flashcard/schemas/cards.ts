import {Schema, model } from 'mongoose';
import { cardsTypes } from './../types/cards'

const cardsSchema = new Schema<cardsTypes>({
    deckId: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true }
}, {timestamps:true});

export default model("decks", cardsSchema)