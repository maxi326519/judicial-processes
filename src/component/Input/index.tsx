interface InputData {
  name: string;
  value: any;
  label: string;
  type: string | undefined;
  formulated: boolean | undefined;
  error: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({
  name,
  value,
  label,
  type = "text",
  formulated,
  error,
  handleChange,
}: InputData) {
  return (
    <div className="form-floating">
      <input
        id={name}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        style={formulated ? { backgroundColor: "#f944" } : {}}
        value={
          type === "date"
            ? value
              ? value.toISOString().split("T")[0]
              : null
            : value
        }
        type={type}
        onChange={handleChange}
        disabled={formulated}
      />
      <label htmlFor="tipo" className="form-label">
        {label}
      </label>
      <small>{error}</small>
    </div>
  );
}
