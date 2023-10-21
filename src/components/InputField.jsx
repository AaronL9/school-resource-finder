import "../assets/css/input_field.css";

export default function InputField({ id, label, type, setValue }) {
  return (
    <div className="input-group">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        autoComplete="off"
        name={type}
        id={id}
        className="input"
        type={type}
        onChange={(e) => setValue(e.target.value)}
        required
        autoCorrect="true"
      />
      <div />
    </div>
  );
}
