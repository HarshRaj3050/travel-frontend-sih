import { useState } from "react";

type SignupProps = {
  onShowLogin?: () => void;
}

const Signup = ({ onShowLogin }: SignupProps) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    aadhaar: "",
    age: "",
    gender: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.phone || !form.aadhaar || !form.age || !form.gender || !form.password || !form.confirm) {
      setError("Please fill all fields.");
      return false;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be 10 digits.");
      return false;
    }
    if (!/^\d{12}$/.test(form.aadhaar)) {
      setError("Aadhaar must be 12 digits.");
      return false;
    }
    if (!/^[0-9]{1,3}$/.test(form.age) || Number(form.age) <= 0) {
      setError("Please enter a valid age.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Signup data", form);
    // TODO: call signup API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-md p-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded-md p-2" placeholder="10 digits" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Aadhaar</label>
              <input name="aadhaar" value={form.aadhaar} onChange={handleChange} className="w-full border rounded-md p-2" placeholder="12 digits" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input name="age" value={form.age} onChange={handleChange} className="w-full border rounded-md p-2" type="number" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded-md p-2">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input name="password" value={form.password} onChange={handleChange} type="password" className="w-full border rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm password</label>
            <input name="confirm" value={form.confirm} onChange={handleChange} type="password" className="w-full border rounded-md p-2" />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button className="w-full bg-black text-white rounded-md py-2 font-medium">Create account</button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <button onClick={() => onShowLogin?.()} className="text-blue-600 underline">Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Signup;
