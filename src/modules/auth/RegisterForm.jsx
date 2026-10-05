import { useState } from "react";
import {
  IconHeartHandshake,
  IconEye,
  IconEyeOff,
  IconLoader2,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;

const validate = ({ name, mobile, email, password, confirmPassword }) => {
  const errors = {};

  if (!name.trim()) errors.name = "Name is required";

  if (!mobile) errors.mobile = "Mobile number is required";
  else if (!MOBILE_REGEX.test(mobile))
    errors.mobile = "Enter a valid 10-digit mobile number";

  if (!email.trim()) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(email.trim()))
    errors.email = "Enter a valid email address";

  if (!password) errors.password = "Password is required";
  else if (password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;

  if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
  else if (confirmPassword !== password)
    errors.confirmPassword = "Passwords do not match";

  return errors;
};

const inputClass = (hasError) =>
  `block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900
   placeholder:text-gray-400 transition focus:outline-none focus:ring-2 ${
     hasError
       ? "border-red-500 focus:ring-red-200"
       : "border-gray-300 focus:border-gray-900 focus:ring-gray-200"
   }`;

function Field({ name, label, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="mt-1.5">{children}</div>

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordInput({ hasError, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={show ? "text" : "password"}
        className={`pr-11 ${inputClass(hasError)}`}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
      >
        {show ? (
          <IconEyeOff size={19} stroke={1.8} aria-hidden="true" />
        ) : (
          <IconEye size={19} stroke={1.8} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export default function RegisterForm({ onSubmit }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const errors = validate(values);
  const showError = (name) => touched[name] && errors[name];

  const handleChange = (e) => {
    const { name } = e.target;
    // Mobile accepts digits only, max 10
    const value =
      name === "mobile"
        ? e.target.value.replace(/\D/g, "").slice(0, 10)
        : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Shared props for every input
  const bind = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": Boolean(showError(name)),
    "aria-describedby": showError(name) ? `${name}-error` : undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      mobile: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit?.({
        name: values.name.trim(),
        mobile: values.mobile,
        email: values.email.trim(),
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
        className="w-full max-w-sm rounded-2xl"
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
            Create Account
          </h2>

          <p className=" text-sm leading-6 text-gray-500">
            Join us today! Fill in the details
            <br />
            below to get started.
          </p>
        </div>

        {/* Fields */}
        <div className="mt-6 space-y-4">
          {/* Name */}
          <Field name="name" label="Name" error={showError("name")}>
            <input
              {...bind("name")}
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className={inputClass(showError("name"))}
            />
          </Field>

          {/* Mobile */}
          <Field
            name="mobile"
            label="Mobile (WhatsApp)"
            error={showError("mobile")}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                +91
              </span>

              <input
                {...bind("mobile")}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                className={`pl-12 ${inputClass(showError("mobile"))}`}
              />
            </div>
          </Field>

          {/* Email */}
          <Field name="email" label="Email" error={showError("email")}>
            <input
              {...bind("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass(showError("email"))}
            />
          </Field>

          {/* Password */}
          <Field name="password" label="Password" error={showError("password")}>
            <PasswordInput
              {...bind("password")}
              hasError={showError("password")}
              autoComplete="new-password"
              placeholder="At least 6 characters"
            />
          </Field>

          {/* Confirm Password */}
          <Field
            name="confirmPassword"
            label="Confirm Password"
            error={showError("confirmPassword")}
          >
            <PasswordInput
              {...bind("confirmPassword")}
              hasError={showError("confirmPassword")}
              autoComplete="new-password"
              placeholder="Re-enter your password"
            />
          </Field>
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
          {submitting ? "Creating account..." : "Sign up"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to={"/store/login"}
            replace
            href="#"
            className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
