export class TodoEntity {
  constructor(
    public id: number,
    public name: string,
    public completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, name, completedAt } = object;
    if (!id) throw "ID is required";
    if (!name) throw "NAME is required";

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw "CompletedAt is not a valid date";
      }
    }

    return new TodoEntity(id, name, completedAt);
  }
}
