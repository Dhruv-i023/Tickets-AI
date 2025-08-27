import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-base-100 via-base-200 to-base-300">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <h1 className="text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Manage Support Tickets with AI
        </h1>
        <p className="text-lg text-base-content/80 max-w-2xl mb-10">
          Say goodbye to manual ticketing. Let AI categorize, prioritize, and 
          accelerate your support workflows. Built for teams that want speed 
          and clarity.
        </p>

        <div className="flex gap-4">
          <Link to="/signup" className="btn btn-primary btn-lg rounded-full shadow-lg hover:scale-105 transition">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline btn-lg rounded-full hover:scale-105 transition">
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-base-100/70 backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center mb-12">Why TicketsAI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 rounded-2xl shadow-xl bg-base-200 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">AI Automation</h3>
            <p className="text-base-content/70">
              Tickets are automatically categorized and prioritized with 
              intelligent AI models, saving your team hours of work.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-xl bg-base-200 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
            <p className="text-base-content/70">
              Share, assign, and resolve issues together in a centralized hub 
              built for modern support teams.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-xl bg-base-200 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
            <p className="text-base-content/70">
              Gain insights into response times, ticket loads, and performance 
              metrics to improve your support efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-primary to-secondary text-base-100">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Join now and transform your ticketing process with AI-powered tools.
        </p>
        <Link
          to="/signup"
          className="btn btn-lg rounded-full bg-base-100 text-primary font-semibold hover:bg-base-200 shadow-lg"
        >
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-base-content/70">
        © {new Date().getFullYear()} TicketsAI. All rights reserved.
      </footer>
    </div>
  );
}
