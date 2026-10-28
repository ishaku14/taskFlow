import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import { Eye, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/authSchemas";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axios";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const registered = location.state?.registered;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    //submit details to the server
    try {
      const res = await api.post(`/auth/login`, data);
      login(res.data.user, res.data.accessToken);
      navigate("/");

      reset();
    } catch (err) {
      if (err.response) {
        setError("root.serverError", {
          message: err.response?.data.error || "Login failed. Try again"
        });
      } else {
        setError("root.serverError", {
          message: "Could not reach server. Try again."
        });
      }
    }
  };

  return (
    <>
      {registered && (
        <div role="status" className="mb-6 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-green-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Account created successfully. Please log in.</p>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-sm font-medium text-slate-500">
                TaskFlow
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Workspace
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-500 mt-1">
              Sign in to your account to continue managing your tasks
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <span className="text-xs text-slate-400">Work or personal</span>
              </div>
              <input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-700 text-[0.8rem]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                {/* <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </a> */}
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password"
                  required
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="button"
                  aria-label="show password"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-700 text-[0.8rem]">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errors.root?.serverError && (
              <p className="text-red-700 text-[0.8rem]">
                {errors.root.serverError.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer active:bg-indigo-500`}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
