"use client";

import { useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/lib/features/auth/auth.thunk";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  // Redirect after login
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-400/70  rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email / Username */}
          <InputField
            icon={<Mail size={18} />}
            placeholder="Email or Username"
            error={errors.emailOrUsername}
            {...register("emailOrUsername", { required: true })}
          />

          {/* Password */}
          <InputField
            icon={<Lock size={18} />}
            type="password"
            placeholder="Password"
            error={errors.password}
            {...register("password", { required: true })}
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-purple-600  text-white font-semibold
            hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Google */}
        <button
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 
          hover:bg-gray-50 transition"
        >
          <GoogleIcon />
          <span className="text-sm font-medium">
            Continue with Google
          </span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-indigo-600 cursor-pointer font-medium hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);
