import Progress from "./progress";

interface ButtonProps {
  label: string;
  type: "submit" | "button";
  progress: boolean;
  isDisabled: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <>
      <button
        type={props.type}
        disabled={props.isDisabled}
        className={`mt-6 flex items-center justify-center rounded border-none py-3 font-semibold transition duration-150 ease-in-out ${props.type === "submit" ? "bg-indigo-600 text-zinc-100 hover:bg-indigo-700" : "border-2 border-indigo-600 bg-zinc-100 text-indigo-500 hover:bg-zinc-200"}`}
      >
        {props.progress ? <Progress /> : props.label}
      </button>
    </>
  );
}
