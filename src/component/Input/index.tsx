interface InputData {
  name: string;
  value: any;
  label: string;
  type: string | undefined;
  error: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  name,
  value,
  label,
  type = "text",
  error,
  handleChange,
}: InputData) {
  return (
    <div className="form-floating">
      <input
        id={name}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        value={value}
        type={type}
        onChange={handleChange}
      />
      <label htmlFor="tipo" className="form-label">
        {label}
      </label>
      <small>{error}</small>
    </div>
  );
}
