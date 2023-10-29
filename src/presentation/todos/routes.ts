import { Router } from "express";
import { TodoController } from "./controller";
import {
  TodoDatasourceImpl,
  TodoRepositoryImpl,
} from "./../../infraestructure";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const todoRespository = new TodoRepositoryImpl(datasource);
    const todoController = new TodoController(todoRespository);

    router.post("/", todoController.createTodo);
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
