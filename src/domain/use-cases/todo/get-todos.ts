import { TodoEntity } from "../../entities";
import { TodoReposesitory } from "../../repositories";

export interface GetTodosUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
  constructor(private readonly repository: TodoReposesitory) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}
