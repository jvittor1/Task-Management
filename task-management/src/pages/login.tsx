import { MdEmail } from "react-icons/md";
import Image from "../assets/image-background.svg";
import Button from "../components/button";
import Input from "../components/input";
import { FaLock } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6),
});

type CreateUserFormData = z.infer<typeof LoginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = (): Promise<string> => {
    setLoading(true);
    setIsDisabled(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Login successful");
        setLoading(false);
        setIsDisabled(false);
      }, 2000);
    });
  };

  return (
    <section className="flex h-screen w-full gap-5 bg-zinc-900 text-zinc-100">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-indigo-500">Login</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex w-72 flex-col gap-2 lg:w-[26rem]"
        >
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

          <Button
            label="Login"
            type="submit"
            progress={loading}
            isDisabled={isDisabled}
          />

          <span>
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-500 hover:underline">
              Signup
            </a>
          </span>
        </form>
      </div>

      <div className="hidden flex-1 flex-col items-center justify-center bg-indigo-700 px-14 md:flex">
        <img className="w-[30rem]" src={Image} alt="Background Image" />
      </div>
    </section>
  );
}
