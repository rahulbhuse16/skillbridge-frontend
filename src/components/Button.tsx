export default function Button({
  children,
  onClick,
  variant = "primary",
}: any) {
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-green-500 hover:bg-green-600 text-white",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition ${styles[variant]} cursor-pointer`}
    >
      {children}
    </button>
  );
}