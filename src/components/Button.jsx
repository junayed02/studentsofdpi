const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      className={`bg-black
    text-white
    py-2
    px-6
    font-semibold
    tracking-wider
    border-2
    border-black
    hover:text-purple-600 hover:bg-transparent duration-300 rounded-lg ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
