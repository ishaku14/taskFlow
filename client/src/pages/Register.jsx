import { Link } from "react-router";
import { Eye, CheckCircle2 } from 'lucide-react';

export default function Register() {
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
        <form className="space-y-5">
          {/* Full name */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                Full name <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400">Legal name</span>
            </div>
            <input id="fullName" type="text" placeholder="Jane Doe" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>

          {/* email */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-400">name@company.com</span>
            </div>
            <input id="email" type="email" placeholder="jane@example.com" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
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
              <input id="password" type="password" placeholder="At least 8 characters" className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Password strength hints */}
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                <inpu type="checkbox" disabled className="w-3.5 h-3.5 rounded-full border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                8+ characters
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                <input type="checkbox" disabled className="w-3.5 h-3.5 rounded-full border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Letters &amp; numbers
              </label>
            </div>
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
              <input id="confirmPassword" type="password" placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
            Create Account
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