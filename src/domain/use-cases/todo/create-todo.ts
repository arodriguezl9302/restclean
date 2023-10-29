import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities";
import { TodoReposesitory } from "../../repositories";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoReposesitory) {}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
