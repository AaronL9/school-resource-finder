import "../assets/css/input_field.css";

export default function InputField({ label, type }) {
  return (
    <div className="input-group">
      <label className="label">{label}</label>
      <input
        autoComplete="off"
        name={type}
        id={type}
        className="input"
        type={type}
      />
      <div />
    </div>
  );
}
