export interface TodoType {
  title: string;
  description: string;
  done: boolean;
}

interface TodoInput {
  todo: TodoType;
}

export function Todo({ todo }: TodoInput) {
  return (
    <div className="border-amber-50 p-5 m-5">
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <p className="font-semibold">
        Status: {todo.done ? "Completed" : "Pending"}
      </p>
    </div>
  );
}
