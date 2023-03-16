import { ErrorMessage } from "@hookform/error-message";

const FormInputField = ({ title, name, errors, register, type }) => {
  return (
    <div className="flex  flex-col gap-1 w-full md:w-2/5">
      <span className="text-placeholder">{title}</span>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <span className="text-danger">{message}</span>}
      />
      <input
        type={type || "text"}
        {...register(name, {
          minLength: 1,
          required: `${title} is required`,
        })}
        className="outline-none px-4 py-1 rounded-md bg-subSection"
      />
    </div>
  );
};

export default FormInputField;
