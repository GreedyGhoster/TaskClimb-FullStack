import React, { useCallback, useMemo } from "react";
import { Controller, RegisterOptions } from "react-hook-form";
import { objUtils } from "../../../utils";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export interface FormTextFieldProps
  extends Omit<
    TextFieldProps,
    "label" | "value" | "onChange" | "onBlur" | "error" | "helperText"
  > {
  name: string;
  control?: any;
  label?: string;
  defaultValue?: string;
  rules?: RegisterOptions;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  control,
  defaultValue,
  rules,
  type,
  autoFocus,
  variant,
  ...rest
}) => {
  const isNumber = useMemo(() => type === "number", [type]);
  const handleChange = useCallback(
    (onChange: (...event: any[]) => void, val: string | null) => {
      if (isNumber) {
        onChange(objUtils.isNil(val) ? null : Number(val));
      } else {
        onChange(val);
      }
    },
    [isNumber]
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || null}
      rules={rules}
      render={({
        field: { onChange, ref, value, ...field },
        fieldState: { error },
      }) => (
        <TextField
          {...field}
          label={label}
          inputRef={ref}
          variant={variant}
          value={objUtils.isNil(value) ? "" : value}
          onChange={(e) => handleChange(onChange, e.target.value || null)}
          error={!!error}
          helperText={error ? error.message : null}
          type={type}
          autoFocus={autoFocus}
          {...rest}
        />
      )}
    />
  );
};
