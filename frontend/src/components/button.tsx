interface ButtonProps {
  varient: "primary" | "destructive";
  classname?: String;
  disabled: boolean;
  name: String;
}

export const Button = ({ varient, disabled, name, classname }: ButtonProps) => {
  const varients = {
    primary:
      "px-8 py-4 font-mono text-sm uppercase border-2 border-black transition-all duration-200 disabled-cursor-not-allowed bg-black text-white hover:bg-orange-600 hover:border-orange-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:cursor-pointer",
    //move shadow right -> move shadow down
    destructive:
      "px-8 py-4 font-mono text-sm uppercase border-2 border-black transition-all duration-200 disabled-cursor-not-allowed bg-red-600 text-white hover:bg-red-700 hover:border-orange-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:cursor-pointer",
  };
  return (
    <button disabled={disabled} className={`${varients[varient]} ${classname}`}>
      {name}
    </button>
  );
};
