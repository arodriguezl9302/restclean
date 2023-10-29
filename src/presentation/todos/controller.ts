import { Request, Response } from "express";

const todos = [
  { id: 1, name: "todos df mani", date: new Date() },
  { id: 2, name: "todos df mani 3", date: null },
  { id: 3, name: "todos df mani 4", date: new Date() },
];

export class TodoController {
  constructor() {}

  public createTodo = (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name)
      return res.status(404).json({ error: "Name property is required" });

    const newTodo = {
      id: todos.length + 1,
      name,
      date: null,
    };

    todos.push(newTodo);

    return res.json(newTodo);
  };

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(404).json({ error: `ID argument is not a number` });

    const todo = todos.find((todo) => todo.id === id);
    return todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id: ${id} not found` });
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(404).json({ error: `ID argument is not a number` });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `TODO with id: ${id} not found` });

    const { name } = req.body;
    if (!name)
      return res.status(404).json({ error: "Name property is required" });

    todo.name = name;
    return res.status(200).json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(404).json({ error: `ID argument is not a number` });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `TODO with id: ${id} not found` });

    todos.splice(todos.indexOf(todo), 1);
    return res.json(todo);
  };
}
