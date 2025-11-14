import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // your login logic here
  };

  return (
    <form onSubmit={handleSubmit} className="…your-styles…">
      <label>
        Email or Username  
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Password  
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>

      <label style={{ display: "block", marginTop: "8px" }}>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={e => setShowPassword(e.target.checked)}
        />
        {" "}Show Password
      </label>

      <button type="submit">
        Login
      </button>
    </form>
  );
}
