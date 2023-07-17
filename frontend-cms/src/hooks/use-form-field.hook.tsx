import { useTranslate } from "@refinedev/core";
import { useFormContext } from "react-hook-form";

type UseFormField = {
  fieldName: string;
  i18nPath: string;
};

export const useFormField = ({ fieldName, i18nPath }: UseFormField) => {
  if (!fieldName) throw new Error(`[useFormField] invalid fieldName`);

  const formContext = useFormContext();
  const translate = useTranslate();

  const {
    formState: { errors },
  } = formContext;

  const error = (errors as any)?.[fieldName];
  const hasError = !!error;
  const errorMessage = error?.message;

  return {
    fieldName,
    hasError,
    errorMessage,
    formContext,
    label: translate(`${i18nPath}.${fieldName}`),
  };
};
