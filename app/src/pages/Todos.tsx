import { TodoManager } from "../components/todo/TodoManager";

export const Todos = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="font-extralight text-[6rem] tracking-[.3rem] text-primary">
        Todos
      </h1>
      <TodoManager />
    </div>
  );
};
