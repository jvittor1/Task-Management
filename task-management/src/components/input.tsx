import { UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  icon: IconType;
  register: UseFormRegister<any>;
  name: string;
  value?: string;
}

export default function Input(props: InputProps) {
  return (
    <div className="mt-4 flex w-full flex-col gap-1 text-zinc-100">
      <label>{props.label}</label>
      <div className="relative">
        <input
          value={props.value}
          type={props.type}
          placeholder={props.placeholder}
          {...props.register(props.name)}
          className="w-full rounded border-2 border-transparent p-2 pr-10 text-zinc-800 outline-none focus:border-2 focus:border-indigo-500"
        />

        <div className="absolute right-2 top-[50%] flex w-6 translate-y-[-50%] items-center justify-center text-indigo-500">
          <props.icon />
        </div>
      </div>
    </div>
  );
}
