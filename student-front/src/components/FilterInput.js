const FilterInput = ({ title, name, onChangeFun, value }) => {
  return (
    <div className={`flex  flex-col gap-1 w-full md:w-1/6 `}>
      <span className="text-placeholder">{title}</span>
      <input
        name={name}
        onChange={(e) => {
          onChangeFun(e);
        }}
        className={`outline-none px-4 py-1 rounded-md bg-alternate`}
      />
    </div>
  );
};

export default FilterInput;
