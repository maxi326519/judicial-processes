interface SelectProps {
  name: string;
  value: any;
  label: string;
  list: Array<any>;
  error?: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * @prop { string } name - Input name and id
 * @prop { any } value - Input value
 * @prop { string } label - Input label
 * @prop { Array<string> } list - Items to drop down list
 * @prop { string | undefined} error - Error message to display
 * @prop { () => void } handleChange - Function for onChange input
 */
export default function SelectInput({
  name,
  value,
  label,
  list,
  error,
  handleChange,
}: SelectProps) {
  return (
    <div className="form-floating">
      <select
        id={name}
        name={name}
        className={`form-select ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={handleChange}
      >
        <option value="">Seleccionar</option>
        {list &&
          list.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
      </select>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <small>{error}</small>
    </div>
  );
}
