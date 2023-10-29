import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoReposesitory } from "../../domain";

export class TodoController {
  constructor(private readonly todoRepository: TodoReposesitory) {}

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(404).json({ error });

    const todo = await this.todoRepository.create(createTodoDto!);
    return res.json(todo);
  };

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.status(200).json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await this.todoRepository.findById(id);
      return res.status(200).json(todo);
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(404).json({ error });

    try {
      const todo = await this.todoRepository.updateById(updateTodoDto!);
      return res.status(200).json(todo);
    } catch (error) {
      return res.status(404).json({ error });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await this.todoRepository.deleteById(id);
      return res.status(200).json(todo);
    } catch (error) {
      return res.status(404).json({ error });
    }
  };
}
