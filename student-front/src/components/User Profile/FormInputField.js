import { ErrorMessage } from "@hookform/error-message";

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
      <span className="text-placeholder">
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
        {...register(
          name,
          isRequired === true
            ? {
                minLength: 1,
                required: `${title} is required`,
              }
            : {}
        )}
        className="outline-none px-4 py-1 rounded-md bg-gray-700 focus:border-blue-500 focus:bg-gray-800"
      />
    </div>
  );
};

export default FormInputField;
