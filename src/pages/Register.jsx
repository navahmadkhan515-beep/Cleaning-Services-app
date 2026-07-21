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

const getPasswordStrength = (value = "") => {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score; // 0-4
};

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-red-400",
  "bg-red-400",
  "bg-amber-400",
  "bg-lime-500",
  "bg-primary",
];

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password", "");
  const strength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    // simulate request latency so the loading state is visible; replace with real signup call
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Register submitted:", data);
    toast.success("Account created!");
    navigate("/login");
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
          <h1 className="mt-4 text-2xl font-semibold">Create your account</h1>
          <p className="mt-1 text-sm text-muted">
            Book and manage cleanings in one place.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              aria-invalid={!!errors.name}
              className={`rounded-lg border bg-base px-4 py-2.5 text-sm outline-none transition focus:border-primary ${
                errors.name ? "border-red-400" : "border-ink/15"
              }`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs text-red-500">Name is required</span>
            )}
          </div>

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
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                aria-invalid={!!errors.password}
                className={`w-full rounded-lg border bg-base px-4 py-2.5 pr-11 text-sm outline-none transition focus:border-primary ${
                  errors.password ? "border-red-400" : "border-ink/15"
                }`}
                {...register("password", { required: true, minLength: 8 })}
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
            {errors.password?.type === "required" && (
              <span className="text-xs text-red-500">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-xs text-red-500">
                Use at least 8 characters
              </span>
            )}

            {password.length > 0 && (
              <div className="mt-1">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i < strength ? strengthColors[strength] : "bg-ink/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted">
                  {strengthLabels[strength]}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                aria-invalid={!!errors.confirmPassword}
                className={`w-full rounded-lg border bg-base px-4 py-2.5 pr-11 text-sm outline-none transition focus:border-primary ${
                  errors.confirmPassword ? "border-red-400" : "border-ink/15"
                }`}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
              >
                {showConfirm ? (
                  <HiOutlineEyeOff size={18} />
                ) : (
                  <HiOutlineEye size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message ||
                  "Please confirm your password"}
              </span>
            )}
          </div>

          <label className="flex items-start gap-2 text-sm text-muted">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-ink/25 text-primary focus:ring-primary"
              {...register("terms", { required: true })}
            />
            <span>
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-semibold text-primary hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-semibold text-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <span className="-mt-3 text-xs text-red-500">
              You must agree before continuing
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </motion.div>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
