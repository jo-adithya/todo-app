import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { RadioButton } from '../form/RadioButton';
import { TodoItemProps } from 'types';

export const TodoItem = ({
  id,
  todo,
  completed,
  updateStatus,
  deleteTodo,
}: TodoItemProps) => {
  return (
    <div className="pl-5 pr-4 py-4 bg-white text-dark-primary flex items-center ">
      <RadioButton checked={completed} onToggle={() => updateStatus(id)} />
      <div className={`mx-4 relative flex-auto truncate`}>
        <span
          className={`${
            completed ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          } origin-left transition duration-[.4s] ease-in-out absolute w-[calc(100%+14px)] h-[1px] bg-dark-primary top-1/2 -translate-x-[7px] -translate-y-[50%]`}
        ></span>
        {todo}
      </div>
      <button
        onClick={() => deleteTodo(id)}
        className="hover:bg-primary w-10 h-10 flex-none flex justify-center items-center rounded-full transition duration-[.4s] ease-in-out"
      >
        <DeleteOutlineIcon />
      </button>
    </div>
  );
};
