import {Schema, model } from 'mongoose';
import { decksTypes } from './../types/decks'

const decksSchema = new Schema<decksTypes>({
    title: { type: String, required: true },
    ownerid: { type: Number, required: true }
}, {timestamps:true});

export default model("decks", decksSchema)