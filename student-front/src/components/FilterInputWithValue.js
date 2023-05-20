const FilterInputWithValue = ({
  title,
  name,
  onChangeFun,
  value,
  type,
  min,
  max,
}) => {
  return (
    <div className={`flex  flex-col gap-1 w-full md:w-1/6 `}>
      <span className="text-placeholder">{title}</span>
      <input
        type={type || "text"}
        name={name}
        value={value ? value : ""}
        onChange={(e) => {
          onChangeFun(e);
        }}
        className={`outline-none px-4 py-1 rounded-md bg-alternate`}
      />
    </div>
  );
};

export default FilterInputWithValue;
