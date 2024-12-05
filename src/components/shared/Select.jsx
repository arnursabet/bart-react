export const Select = ({ icon, label, options, ...props }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        {icon && (
          <span className="input-icon">
            <img src={icon} alt={`${label} icon`} />
          </span>
        )}
        <select {...props}>
          {options.map(({ value, label, disabled }) => (
            <option key={value} value={value} disabled={disabled}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}; 