import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    // simulate request latency so the loading state is visible; replace with real auth call
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Login submitted:", data);
    toast.success("Logged in successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-ink/10 bg-surface p-8 shadow-xl shadow-ink/5 sm:p-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HiOutlineSparkles size={22} />
          </div>
          <h1 className="mt-4 text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted">
            Log in to manage your bookings.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              className={`rounded-lg border bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                errors.email ? "border-red-400" : "border-ink/15"
              }`}
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-xs text-red-500">Email is required</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-xs text-red-500">Enter a valid email</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                aria-invalid={!!errors.password}
                className={`w-full rounded-lg border bg-base px-4 py-2.5 pr-11 text-sm outline-none transition focus:border-primary ${
                  errors.password ? "border-red-400" : "border-ink/15"
                }`}
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={18} />
                ) : (
                  <HiOutlineEye size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500">Password is required</span>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-ink/25 text-primary focus:ring-primary"
              {...register("remember")}
            />
            Remember me
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </motion.div>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
