import { TodoEntity } from "../../entities";
import { TodoReposesitory } from "../../repositories";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly repository: TodoReposesitory) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}
