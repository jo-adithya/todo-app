import { Todo } from './components/todo/TodoManager';

function App() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-bg gap-8">
      <h1 className="font-extralight text-[6rem] tracking-[.3rem] text-primary">
        Todos
      </h1>
      <Todo />
    </div>
  );
}

export default App;
