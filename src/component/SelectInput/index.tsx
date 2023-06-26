interface SelectInputData {
  name: string;
  value: any;
  label: string;
  list: Array<any>;
  error: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function SelectInput({
  name,
  value,
  label,
  list,
  error,
  handleChange,
}: SelectInputData) {
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
        {list.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label htmlFor="tipo" className="form-label">
        {label}
      </label>
      <small>{error}</small>
    </div>
  );
}
