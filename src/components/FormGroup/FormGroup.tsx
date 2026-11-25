import type { UseFormRegisterReturn } from "react-hook-form";

type FormGroupProps = {
  errorMsg: string | undefined;
  formClassName?: string;
  inputId: string;
  label: string;
  maxLength?: number;
  placeholder?: string;
  registration: UseFormRegisterReturn;
};

export const FormGroup = ({
  errorMsg,
  formClassName = "",
  inputId,
  label,
  maxLength,
  placeholder,
  registration,
}: FormGroupProps) => {
  return (
    <div className={formClassName}>
      <label className="text-sm font-bold" htmlFor={inputId}>
        {label}
      </label>
      <input
        {...registration}
        className="rounded-md border border-gray-400 p-3 w-full my-1"
        id={inputId}
        maxLength={maxLength ?? undefined}
        placeholder={placeholder}
      />
      {errorMsg && <p className="text-sm font-bold text-red-500">{errorMsg}</p>}
    </div>
  );
};
