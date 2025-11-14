import React, { useState } from "react";

type Credentials = {
  email: string;
  password: string;
  remember?: boolean;
};

type LoginPageProps = {
  // optional callback to handle successful login (for integration)
  onLogin?: (creds: Credentials) => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // simple client-side validation
  function validate() {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email.";

    if (!password) errs.password = "Password is required.";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate an API call. Replace this with your real auth call.
      await new Promise((r) => setTimeout(r, 1000));

      // Mock success criteria: email contains "@" and password length >= 6
      setMessage("Logged in successfully.");
      onLogin?.({ email, password, remember });
    } catch (err) {
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSocialLogin(provider: "google" | "github") {
    // Replace with real OAuth flow
    setMessage(`Redirecting to ${provider} login...`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue to your account</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <label className="block mb-3">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.email ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600" id="email-error">
                {errors.email}
              </p>
            )}
          </label>

          <label className="block mb-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-xs text-indigo-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.password ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="your strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-600" id="password-error">
                {errors.password}
              </p>
            )}
          </label>

          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center text-sm">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded text-indigo-600"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>

            <button
              type="button"
              className="text-sm text-indigo-600 hover:underline"
              onClick={() => setMessage("Password reset flow (stub) — implement in your app.")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="text-xs text-gray-400">or continue with</div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-2 py-2 rounded-lg border hover:bg-gray-50"
            aria-label="Sign in with Google"
          >
            <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path fill="#4285f4" d="M533.5 278.4c0-18.6-1.5-37.1-4.6-55.1H272v104.3h147.4c-6.4 34.9-25.6 64.5-54.6 84v69.9h88.2c51.6-47.5 81.5-117.6 81.5-203.1z"/>
              <path fill="#34a853" d="M272 544.3c73.7 0 135.6-24.5 180.8-66.6l-88.2-69.9c-24.5 16.5-55.8 26.2-92.6 26.2-71 0-131.3-47.9-152.9-112.2H27.4v70.6C72.3 490.1 165.4 544.3 272 544.3z"/>
              <path fill="#fbbc04" d="M119.1 321.8c-9.8-29.2-9.8-60.6 0-89.8V161.4H27.4c-36.6 72.8-36.6 159.2 0 232l91.7-71.6z"/>
              <path fill="#ea4335" d="M272 107.7c39.9 0 75.8 13.7 104 40.6l78-78C407.6 24.3 345.6 0 272 0 165.4 0 72.3 54.2 27.4 137.3l91.7 70.6C140.7 155.6 201 107.7 272 107.7z"/>
            </svg>
            <span className="text-sm">Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-2 py-2 rounded-lg border hover:bg-gray-50"
            aria-label="Sign in with GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path fill="currentColor" d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.78 3.1 8.83 7.4 10.26.54.1.74-.24.74-.53 0-.26-.01-1-.01-1.97-3.01.65-3.64-.73-3.88-1.4-.13-.35-.7-1.4-1.2-1.68-.4-.2-.97-.69-.01-.7.9-.01 1.54.83 1.76 1.18 1.03 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.7-.31-5.54-1.36-5.54-6.04 0-1.33.47-2.41 1.24-3.26-.12-.31-.54-1.57.12-3.27 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3.01-.41c1.02.01 2.05.14 3.01.41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.7.24 2.96.12 3.27.77.85 1.24 1.93 1.24 3.26 0 4.69-2.85 5.73-5.56 6.03.41.36.77 1.07.77 2.16 0 1.56-.01 2.82-.01 3.2 0 .29.2.64.75.53 4.3-1.44 7.4-5.48 7.4-10.26C23.1 5.33 18.27.5 12 .5z"/>
            </svg>
            <span className="text-sm">GitHub</span>
          </button>
        </div>

        {message && (
          <div className="mt-4 text-sm text-center text-indigo-700">{message}</div>
        )}

        <footer className="mt-6 text-center text-sm text-gray-500">
          <span>Don’t have an account? </span>
          <button
            onClick={() => setMessage("Sign up flow (stub) — implement in your app.")}
            className="text-indigo-600 hover:underline"
          >
            Create one
          </button>
        </footer>
      </div>
    </div>
  );
}
