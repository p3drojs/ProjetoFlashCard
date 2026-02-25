import { Router } from "express";
import cardsController from "./flashcard/controllers/cards.controller";

const routes = Router();

routes.post("/cards", cardsController.create);
routes.put("/cards", cardsController.update);
routes.get("/cards", cardsController.getAll);
routes.delete("/cards", cardsController.delete);

export { routes };