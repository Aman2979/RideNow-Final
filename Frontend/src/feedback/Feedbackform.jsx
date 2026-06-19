import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRating";

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        navigate("/Home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setErrMsg("Please select a star rating.");
      return;
    }

    setStatus("sending");
    setErrMsg("");

    try {
      // await axios.post("/feedback/createfeedback", { ...form, rating });
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/feedback/createfeedback`,
        {
          ...form,
          rating,
        },
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setRating(0);
    } catch (err) {
      setStatus("error");
      setErrMsg(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-5xl mb-3">💬</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Send Us Feedback
          </h2>
          <p className="text-black-400 text-sm mt-2">
            We'd love to hear your thoughts!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-900">
              Full Name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                transition placeholder-gray-300"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-900">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                transition placeholder-gray-300"
            />
          </div>

          {/* Star Rating */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-900">
              Rating
            </label>
            <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
              <StarRating rating={rating} setRating={setRating} />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-900">
              Your Feedback
            </label>
            <textarea
              name="message"
              placeholder="Write your feedback here..."
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                transition placeholder-gray-300 resize-none"
            />
          </div>

          {/* Error Message */}
          {errMsg && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              <span>❌</span>
              <span>{errMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className={`w-full py-3.5 rounded-xl text-white font-semibold text-base
              transition-all duration-200 mt-1
              ${
                status === "sending"
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-200"
              }`}
          >
            {status === "sending" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Feedback"
            )}
          </button>
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate("/Home")}
            className="w-full py-3.5 rounded-xl bg-gray-200 hover:bg-gray-300
      text-gray-800 font-semibold text-base transition-all duration-200
      active:scale-95"
          >
            Cancel
          </button>
        </form>

        {/* Success Message */}
        {status === "success" && (
          <div className="mt-6 flex flex-col items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-6 py-5 text-center animate-pulse">
            <span className="text-4xl">✅</span>
            <p className="text-green-700 font-semibold text-base">
              Thank you for your feedback!
            </p>
            <p className="text-green-500 text-sm">
              Redirecting you in 3 seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
