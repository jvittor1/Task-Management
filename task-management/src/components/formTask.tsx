import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import TimePickerComponent from "./timePicker";
import ResponsiveDatePickers from "./datePicker";
import SelectButton from "./selectButton";
import { forwardRef, useImperativeHandle } from "react";
import { ITask } from "../interfaces/task";

interface FormTaskComponentProps {
  onClose: () => void;
  taskData?: ITask;
}

const TaskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    start_time: z.date({ required_error: "Start time is required" }),
    end_time: z.date({ required_error: "End time is required" }),
    date: z.date({ required_error: "Date is required" }),
    type: z.string().min(1, "Type is required"),
  })
  .refine((data) => data.end_time > data.start_time, {
    message: "End time must be later than start time",
    path: ["end_time"],
  })
  .transform((data) => ({
    ...data,
    start_time: data.start_time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    end_time: data.end_time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: data.date.toLocaleDateString([], {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    }),
  }));

type CreateTaskFormData = z.infer<typeof TaskSchema>;

const FormTaskComponent = forwardRef((props: FormTaskComponentProps, ref) => {
  if (props.taskData) {
    console.log(props.taskData);
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(TaskSchema),
  });

  const handleFormTaskSubmit = (data: CreateTaskFormData) => {
    console.log(data);
    props.onClose();
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(handleFormTaskSubmit)();
    },
  }));

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(handleFormTaskSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label className="text-zinc-100">Title</label>
        <input
          className="w-full rounded border-2 border-indigo-500 bg-transparent p-2 pr-10 text-zinc-100 outline-none focus:border-2 focus:border-indigo-500"
          type="text"
          {...register("title")}
          placeholder="Enter the task title"
          name="title"
          defaultValue={props.taskData?.title}
        />

        {errors.title && (
          <span className="text-red-500">*{errors.title.message}</span>
        )}
      </div>

      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <TimePickerComponent
            name="start_time"
            label="Start Time"
            control={control}
            defaultValue={props.taskData?.startTime}
          />
          {errors.start_time && (
            <span className="text-red-500">*{errors.start_time.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <TimePickerComponent
            name="end_time"
            label="End Time"
            control={control}
            defaultValue={props.taskData?.endTime}
          />
          {errors.end_time && (
            <span className="text-red-500">*{errors.end_time.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-zinc-100">Date</span>

        <ResponsiveDatePickers
          defaultValue={props.taskData?.date}
          control={control}
        />
        {errors.date && (
          <span className="text-red-500">*{errors.date.message}</span>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-1">
        <SelectButton defaultValue={props.taskData?.type} control={control} />
        {errors.type && (
          <span className="text-red-500">*{errors.type.message}</span>
        )}
      </div>
    </form>
  );
});

export default FormTaskComponent;
