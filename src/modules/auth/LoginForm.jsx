import { useState } from "react";
import {
  IconHeartHandshake,
  IconEye,
  IconEyeOff,
  IconLoader2,
} from "@tabler/icons-react";
import { Link , useNavigate} from "react-router-dom";

const MIN_PASSWORD_LENGTH = 6;

const validate = ({ username, password }) => {
  const errors = {};

  if (!username.trim()) errors.username = "Username is required";

  if (!password) errors.password = "Password is required";
  else if (password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;

  return errors;
};

const inputClass = (hasError) =>
  `block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900
   placeholder:text-gray-400 transition focus:outline-none focus:ring-2 ${
     hasError
       ? "border-red-500 focus:ring-red-200"
       : "border-gray-300 focus:border-gray-900 focus:ring-gray-200"
   }`;

export default function LoginForm({ onSubmit }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(values);
  const showError = (name) => touched[name] && errors[name];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });

    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit?.({
        username: values.username.trim(),
        password: values.password,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-3 w-full flex justify-center items-center py-5 bg-white shadow-sm rounded-2xl">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm rounded-2xl px-7"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
            <IconHeartHandshake
              size={34}
              stroke={1.8}
              className="text-blue-600"
              aria-hidden="true"
            />
          </span>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
            Hello Again!
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Welcome back! Please log in to
            <br />
            continue to your account.
          </p>
        </div>

        {/* Fields */}
        <div className="mt-8 space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(showError("username"))}
              aria-describedby={
                showError("username") ? "username-error" : undefined
              }
              className={`mt-1.5 ${inputClass(showError("username"))}`}
            />

            {showError("username") && (
              <p
                id="username-error"
                role="alert"
                className="mt-1.5 text-xs text-red-600"
              >
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <a
                href="#"
                className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="relative mt-1.5">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("password"))}
                aria-describedby={
                  showError("password") ? "password-error" : undefined
                }
                className={`pr-11 ${inputClass(showError("password"))}`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                {showPassword ? (
                  <IconEyeOff size={19} stroke={1.8} aria-hidden="true" />
                ) : (
                  <IconEye size={19} stroke={1.8} aria-hidden="true" />
                )}
              </button>
            </div>

            {showError("password") && (
              <p
                id="password-error"
                role="alert"
                className="mt-1.5 text-xs text-red-600"
              >
                {errors.password}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && (
            <IconLoader2
              size={17}
              className="animate-spin"
              aria-hidden="true"
            />
          )}
          {submitting ? "Logging in..." : "Log in"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            to="/store/register" replace
            className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
