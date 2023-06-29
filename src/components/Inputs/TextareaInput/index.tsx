interface TextAreaInputData {
  name: string;
  value: any;
  label: string;
  error: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function TextAreaInput({
  name,
  value,
  label,
  error,
  handleChange,
}: TextAreaInputData) {
  return (
    <div className="form-floating">
      <textarea
        id={name}
        name={name}
        className={`form-control ${error ? "is-invalid" : ""}`}
        style={{ height: "200px"}}
        value={value}
        onChange={handleChange}
      />
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <small>{error}</small>
    </div>
  );
}
