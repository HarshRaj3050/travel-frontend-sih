import { useState } from "react";

type LoginProps = {
  onShowSignup?: () => void;
}

const Login = ({ onShowSignup }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // placeholder validation
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    // For now, just log and clear
    console.log("Login submit", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full border rounded-md p-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border rounded-md p-2"
              placeholder="Your password"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button className="w-full bg-black text-white rounded-md py-2 font-medium">Sign in</button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <button onClick={() => onShowSignup?.()} className="text-blue-600 underline">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
