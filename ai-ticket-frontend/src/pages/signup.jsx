import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/login");
      } else {
        console.log(data)
        // alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex overflow-hidden">
    {/* Left Side - AI Image */}
    <div className="hidden lg:flex w-1/2">
      <img
        src="../../public/signup.jpg"
        alt="AI Illustration"
        className="w-full h-200 object-cover"
      />
    </div>

    {/* Right Side - Signup Form */}
    <div className="flex w-full lg:w-1/2 items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <form onSubmit={handleSignup} className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
);

}
