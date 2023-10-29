import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  GetTodo,
  GetTodos,
  CreateTodo,
  TodoReposesitory,
  UpdateTodo,
  DeleteTodo,
} from "../../domain";

export class TodoController {
  constructor(private readonly todoRepository: TodoReposesitory) {}

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(404).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(404).json({ error }));
  };

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.status(200).json(todos))
      .catch((error) => res.status(404).json({ error }));
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(404).json({ error }));
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(404).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(404).json({ error }));
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(404).json({ error }));
  };
}
