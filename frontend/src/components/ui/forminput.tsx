import { Form, Control, Path, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";

type FormInputProps<T extends FieldValues> = {
  control?: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  classname?: any;
  descriptive?: boolean;
};

export default function FormInput<T extends FieldValues>({ control, name, label, placeholder, type, disabled, classname, descriptive}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="font-semibold font-sans">{label}</FormLabel>
          <FormControl>
            {descriptive ? <Textarea {...field} placeholder={placeholder} className={`${classname}`} /> : <Input {...field} type={type} placeholder={placeholder} disabled={disabled} className={`w-full ${classname}`}/>}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
