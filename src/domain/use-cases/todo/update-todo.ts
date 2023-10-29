import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities";
import { TodoReposesitory } from "../../repositories";

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoReposesitory) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(dto);
  }
}
