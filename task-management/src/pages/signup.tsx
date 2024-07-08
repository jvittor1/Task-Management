import { MdEmail, MdPerson } from "react-icons/md";
import Button from "../components/button";
import Input from "../components/input";
import { FaLock } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupSchema = z
  .object({
    name: z
      .string()
      .min(3)
      .transform((data) =>
        data
          .trim()
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" "),
      ),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof SignupSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const createUser = (data: any) => {
    console.log(data);
  };

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-zinc-900">
      <div className="flex w-72 flex-col items-center justify-center lg:w-[26rem]">
        <h1 className="mb-7 text-3xl font-bold text-indigo-500">Sign Up</h1>

        <form onSubmit={handleSubmit(createUser)} className="w-full">
          <div className="flex w-full flex-col gap-2">
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              icon={MdPerson}
              register={register}
              name="name"
            />

            {errors.name && (
              <span className="text-red-500">*{errors.name.message}</span>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              icon={MdEmail}
              register={register}
              name="email"
            />

            {errors.email && (
              <span className="text-red-500">*{errors.email.message}</span>
            )}

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={FaLock}
              register={register}
              name="password"
            />

            {errors.password && (
              <span className="text-red-500">*{errors.password.message}</span>
            )}

            <Input
              label="Password"
              type="password"
              placeholder="Confirm your password"
              icon={FaLock}
              register={register}
              name="confirmPassword"
            />

            {errors.confirmPassword && (
              <span className="text-red-500">
                *{errors.confirmPassword.message}
              </span>
            )}

            <Button label="Sign Up" type="submit" />

            <span className="text-zinc-100">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-500 hover:underline">
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
