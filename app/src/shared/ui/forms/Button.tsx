interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <button
      className={`bg-dark-primary px-6 py-3 rounded-md text-white  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
