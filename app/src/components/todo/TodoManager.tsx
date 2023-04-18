import React, { useState, useEffect } from "react";
import { useTodo } from "../../shared/hooks/useTodo";
import { TodoProps } from "../../shared/types/types";

import { TodoItem } from "./TodoItem";

enum FilterType {
  ALL,
  ACTIVE,
  COMPLETED,
}

export const Todo = () => {
  const [value, setValue] = useState("");
  const [active, setActive] = useState<FilterType>(FilterType.ALL);
  const {
    todoManager,
    addTodo,
    updateTodo,
    updateStatus,
    deleteTodo,
    clearTodo,
  } = useTodo();
  const [todos, setTodos] = useState<TodoProps>(todoManager.todos);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    addTodo(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAll = () => {
    setActive(FilterType.ALL);
    setTodos(todoManager.todos);
  };

  const handleCompleted = () => {
    setActive(FilterType.COMPLETED);
    setTodos(
      Object.fromEntries(
        Object.entries(todoManager.todos).filter(
          ([, { completed }]) => completed
        )
      )
    );
  };

  const handleActive = () => {
    setActive(FilterType.ACTIVE);
    setTodos(
      Object.fromEntries(
        Object.entries(todoManager.todos).filter(
          ([, { completed }]) => !completed
        )
      )
    );
  };

  useEffect(() => {
    setTodos(todoManager.todos);
  }, [todoManager.todos]);

  return (
    <div className="bg-white pb-4 min-h-[120px] w-[50vw] min-w-[430px] md:min-w-[483px] text-3xl font-light shadow-[0px_10px_20px_rgba(0,0,0,0.15)]">
      <input
        className="px-6 md:px-7 lg:px-8 py-3 md:py-[14px] lg:py-4 w-full outline-none placeholder:text-gray font-extralight"
        value={value}
        placeholder="What needs to be done?"
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      <div className="bg-primary w-[104%] shadow-[0px_8px_20px_rgba(0,0,0,0.15)] -translate-x-[2%]">
        <div className="flex flex-col gap-[.5px] w-full h-full max-h-[217px] overflow-auto">
          {Object.entries(todos).map((item) => (
            <TodoItem
              id={item[0]}
              todo={item[1].todo}
              completed={item[1].completed}
              updateStatus={updateStatus}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
        <div className="mt-[1.75px] w-full bg-white flex text-sm md:text-base lg:text-lg px-4 items-center h-11 text-dark-gray">
          <div className="w-[125px] md:w-[137px] lg:w-[150px] flex-none">
            {todoManager.activeLength} item{todoManager.activeLength > 1 && "s"}{" "}
            left
          </div>
          <div className="flex flex-auto justify-center">
            <button
              className={`${
                active === FilterType.ALL && "text-dark-primary"
              } transition-color duration-[.4s] ease-in-out h-full px-1 md:px-1.5 lg:px-2 `}
              onClick={handleAll}
            >
              All
            </button>
            <button
              className={`${
                active === FilterType.ACTIVE && "text-dark-primary"
              } transition-color duration-[.4s] ease-in-out h-full px-1 md:px-1.5 lg:px-2 `}
              onClick={handleActive}
            >
              Active
            </button>
            <button
              className={`${
                active === FilterType.COMPLETED && "text-dark-primary"
              } transition-color duration-[.4s] ease-in-out h-full px-1 md:px-1.5 lg:px-2 `}
              onClick={handleCompleted}
            >
              Completed
            </button>
          </div>
          <button
            className="w-[125px] md:w-[137px] lg:w-[150px] h-full flex-none text-right"
            onClick={() => clearTodo()}
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};
