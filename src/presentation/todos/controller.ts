import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

const todos = [
  { id: 1, name: "todos df mani", date: new Date() },
  { id: 2, name: "todos df mani 3", date: null },
  { id: 3, name: "todos df mani 4", date: new Date() },
];

export class TodoController {
  constructor() {}

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(404).json({ error });

    const todo = await prisma.todo.create({ data: createTodoDto! });
    return res.json(todo);
  };

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(404).json({ error: `ID argument is not a number` });

    const todo = await prisma.todo.findUnique({ where: { id } });
    return todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id: ${id} not found` });
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(404).json({ error });

    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo)
      return res.status(404).json({ error: `TODO with id: ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });
    return res.status(200).json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(404).json({ error: `ID argument is not a number` });

    // const todo = todos.find((todo) => todo.id === id);
    // if (!todo)
    //   return res.status(404).json({ error: `TODO with id: ${id} not found` });

    const todo = await prisma.todo.delete({ where: { id } });

    return res.json(todo);
  };
}
