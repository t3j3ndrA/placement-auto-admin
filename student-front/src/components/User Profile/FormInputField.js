import { ErrorMessage } from "@hookform/error-message";

const getDefaultValue = (type) => {
  if (type === "number") return 0;
  return "";
};

const FormInputField = ({
  title,
  name,
  errors,
  register,
  type,
  isRequired,
}) => {
  return (
    <div className="flex  flex-col gap-1 w-full md:w-2/5">
      <span className="">
        {title} {isRequired === true ? " *" : ""}
      </span>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="text-red-700">{message}</span>
        )}
      />
      <input
        type={type || "text"}
        defaultValue={type == "number" ? 0 : ""}
        {...register(
          name,
          isRequired === true
            ? {
                minLength: 1,
                required: `${title} is required`,
              }
            : {}
        )}
        className="outline-none px-4 py-1 rounded-md border-[1px] border-gray-600  "
      />
    </div>
  );
};

export default FormInputField;
