export default function FormWrapper({ title, onSubmit, children }) {
  return (
    <form onSubmit={onSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">{title}</h1>
      {children}
    </form>
  );
}