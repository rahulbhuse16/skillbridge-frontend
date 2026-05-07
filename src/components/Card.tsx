export default function Card({ children }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {children}
    </div>
  );
}