import { useNavigate } from "react-router";
import { Link } from "react-router";
import { Eye, CheckCircle2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/authSchemas";
import { api } from "../api/axios";


export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit, 
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ 
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data) => {
    //submit to server
    try {
      const res = await api.post("/auth/register", data);
      navigate("/login", { state: { registered: true } });
      console.log(res.status);

      reset();
    } catch (err) {
      if (err.response) {
        setError("root.serverError", {
          message: err.response?.data.error || "Registration failed. Try again"
        });
        console.log(err.response)
      } else {
        console.log("cannot reach server")
        setError("root.serverError", {
          message: "Could not reach server. Try again."
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="text-sm text-slate-500 mt-1">
            Start organizing your projects and workflows with TaskFlow today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Full name */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                Full name <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400">Legal name</span>
            </div>
            <input 
              {...register("name")} required
              id="fullName" 
              type="text" 
              placeholder="Jane Doe" 
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              {errors.name && <p className="text-red-700 text-[0.8rem]">{errors.name.message}</p>}
          </div>

          {/* email */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400">name@company.com</span>
            </div>
            <input 
              {...register("email")}
              id="email" 
              autoComplete="email"
              type="email" placeholder="jane@example.com" 
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
            />
            {errors.email && <p className="text-red-700 text-[0.8rem]">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-amber-600 font-medium">Min. 8 characters</span>
            </div>
            <div className="relative">
              <input
                {...register("password")} required
                id="password" 
                type="password" 
                autoComplete="new-password"
                placeholder="At least 8 characters" 
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              <button type="button" aria-label="show password" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            {errors.password && <p className="text-red-700 text-[0.8rem]">{errors.password.message}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400">Passwords must match</span>
            </div>
            <div className="relative">
              <input 
                {...register("confirmPassword")} required
                id="confirmPassword" 
                type="password" 
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              <button type="button" aria-label="show password" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                <Eye className="w-4 h-4" />
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-700 text-[0.8rem]">{errors.confirmPassword.message}</p>}
          </div>
          {errors.root?.serverError && (
            <p className="text-red-700 text-[0.8rem]">
              {errors.root.serverError.message}
            </p>
          )}

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} className="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Footer link */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}