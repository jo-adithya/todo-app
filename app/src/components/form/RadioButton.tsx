import React, { useRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';

import './RadioButton.css';

export const RadioButton = ({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef<NodeJS.Timer | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const radioBg = e.target as HTMLElement;
    if (radioBg.classList.contains('ping')) {
      clearInterval(ref.current as NodeJS.Timer);
      radioBg.classList.remove('ping');
    }
    radioBg.classList.add('ping');
    const id = setTimeout(() => radioBg.classList.remove('ping'), 400);
    ref.current = id;

    onToggle();
  };

  return (
    <div
      onClick={handleClick}
      className={`${checked ? 'bg-dark-primary border-dark-primary' : 'bg-none border-primary'} flex-none radio border-[1px] rounded-full w-7 h-7 cursor-pointer relative transition duration-[.4s] ease-in-out`}
    >
      <div className="absolute bg-primary/50 w-full h-full rounded-full opacity-0"></div>
    </div>
  );
};
