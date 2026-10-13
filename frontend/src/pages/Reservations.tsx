import { useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";
import axios from "axios";

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requested = new Date(
      formData.date + "T" + formData.time + ":00+05:30",
    );
    if (!Number.isFinite(requested.getTime()) || requested <= new Date()) {
      setErrorMessage("Please choose a future booking date and time.");
      return;
    }
    setErrorMessage("");
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "/_/backend/api";
      await axios.post(
        `${API_URL}/reservations`,
        { ...formData, guests: Number(formData.guests) },
        { timeout: 15000 },
      );
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        "We could not send your booking request. Please try again or call +94 76 396 1078.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-stone-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-2xl shadow-stone-200 text-center max-w-lg mx-6"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <FiCheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Booking Request Received
          </h2>
          <p className="text-stone-600 mb-8">
            Thank you, {formData.name}. We've received your request for{" "}
            {formData.date} at {formData.time}. Our team will contact you to
            confirm availability.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-stone-900 transition-all shadow-lg shadow-primary/20"
          >
            Make Another Booking
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Reservations
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8 leading-tight">
              Reserve Your Table <br /> at Deelectaa
            </h1>
            <p className="text-stone-600 text-lg mb-10 leading-relaxed">
              Whether it's a romantic dinner, a business brunch, or a casual
              coffee date, send us a booking request and our team will confirm
              your table.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-stone-700">
                <FiCalendar className="text-primary" size={24} />
                <span>Available daily for breakfast, lunch & dinner</span>
              </div>
              <div className="flex items-center space-x-4 text-stone-700">
                <FiUsers className="text-primary" size={24} />
                <span>Groups of up to 12 people can book online</span>
              </div>
              <div className="flex items-center space-x-4 text-stone-700">
                <FiClock className="text-primary" size={24} />
                <span>Please arrive within 15 minutes of your booking</span>
              </div>
            </div>

            <div className="mt-12 p-8 bg-stone-900 rounded-3xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="font-bold text-xl mb-2 relative z-10">
                Need a Private Event?
              </h4>
              <p className="text-stone-400 mb-6 relative z-10">
                For parties larger than 12 or private venue hire, please contact
                our events team directly.
              </p>
              <a
                href="mailto:deelectaacafe@gmail.com"
                className="inline-block border border-white/30 px-6 py-2 rounded-full hover:bg-primary hover:border-primary transition-all relative z-10"
              >
                Email Events Team
              </a>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      placeholder="+94 76 396 1078"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      min={new Intl.DateTimeFormat("en-CA", {
                        timeZone: "Asia/Colombo",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date())}
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary outline-none transition-all bg-white"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary outline-none transition-all bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="specialRequests"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary outline-none transition-all"
                    placeholder="Any dietary requirements or special occasions?"
                  ></textarea>
                </div>
                <p role="alert" className="text-primary text-sm">
                  {errorMessage}
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${
                    loading
                      ? "bg-stone-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-stone-900 shadow-primary/20"
                  }`}
                >
                  {loading ? "Processing..." : "Request a Reservation"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
