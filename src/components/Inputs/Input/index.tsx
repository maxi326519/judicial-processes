interface InputProps {
  name: string;
  value: any;
  label: string;
  type?: string;
  formulated?: boolean;
  error?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @prop { string } name - Input name and id
 * @prop { any } value - Input value
 * @prop { string } label - Input label
 * @prop { string | undefined } type - Input type
 * @prop { string | undefined} error - Error message to display
 * @prop { boolean | undefined} formulated - If input should be disabled
 * @prop { () => void } handleChange - Function for onChange input
 */
export default function Input({
  name,
  value,
  label,
  type = "text",
  error = "",
  formulated = false,
  handleChange,
}: InputProps) {
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
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <small>{error}</small>
    </div>
  );
}
