export default function Button({ type = "button", children, onClick, variant = "baseV"})
 {

  const base = "w-full rounded-lg py-2 transition font-medium";

  const variants = {
    baseV: "bg-blue-600 text-white hover:bg-blue-700",
    form: "w-full bg-blue-600 text-white py-2 hover:bg-blue-700 rounded-lg" ,
    back: "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300",
    add: "px-[100px] bg-blue-600 text-white py-2 hover:bg-blue-700 rounded-lg",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}