import { Router } from "express";
import cardsController from "./flashcard/controllers/cards.controller";
import decksController from "./flashcard/controllers/decks.controller";

const routes = Router();

routes.post("/cards", cardsController.create);
routes.put("/cards", cardsController.update);
routes.get("/cards", cardsController.getAll);
routes.delete("/cards", cardsController.delete);

routes.post("/decks", decksController.create);
routes.put("/decks", decksController.update);
routes.get("/decks", decksController.getAll);
routes.delete("/decks", decksController.delete);

export { routes };