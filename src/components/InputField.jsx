import "../assets/css/input_field.css";

export default function InputField({ label, type, setValue }) {
  return (
    <div className="input-group">
      <label htmlFor={type} className="label">{label}</label>
      <input
        autoComplete="off"
        name={type}
        id={type}
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
