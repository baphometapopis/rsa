export const RadioButton = ({ options, selectedOption, onOptionChange }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center ",
        alignItems: "center",
      }}
    >
      {options.map((option) => (
        <label className="mx-1" key={option}>
          <input className="mx-1"
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={onOptionChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};
