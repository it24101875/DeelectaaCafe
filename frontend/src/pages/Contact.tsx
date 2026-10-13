import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiCheckCircle } from "react-icons/fi";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "/_/backend/api";
      await axios.post(`${API_URL}/contact`, formData, { timeout: 15000 });
      setSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage(
        "Your message could not be sent. Please try again or email deelectaacafe@gmail.com.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Have questions or want to host an event? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 flex items-start space-x-6">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                <FiMail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">Email Us</h4>
                <p className="text-stone-600 text-sm">
                  deelectaacafe@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 flex items-start space-x-6">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                <FiPhone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">Call Us</h4>
                <p className="text-stone-600 text-sm">+94 76 396 1078</p>
                <p className="text-stone-600 text-sm">Open Everyday, 7am-9pm</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-stone-200/50 flex items-start space-x-6">
              <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                <FiMapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">Visit Us</h4>
                <p className="text-stone-600 text-sm">
                  445/1/1 Seeduwa Road, Kotugoda
                </p>
                <p className="text-stone-600 text-sm">Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-3xl shadow-xl shadow-stone-200/50 text-center h-full flex flex-col items-center justify-center border border-stone-100"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <FiCheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-stone-600 mb-6">
                  Thank you for reaching out. We will get back to you as soon as
                  possible.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-8 py-3 bg-stone-100 text-stone-900 rounded-xl font-bold hover:bg-stone-200 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-3xl shadow-xl shadow-stone-200/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="How can we help you?"
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
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Locations Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Find us in Kotugoda
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Visit us at 445/1/1 Seeduwa Road, Kotugoda.
            </p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-xl shadow-stone-200/50">
            <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-stone-100">
              <iframe
                src="https://maps.google.com/maps?q=7.1251258,79.9141511+(Deelectaa)&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kotugoda Cafe Location"
              ></iframe>
            </div>
            <div className="mt-6 mb-2 flex justify-center">
              <a
                href="https://maps.app.goo.gl/hgLJLWYBzKhGcFUV7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-stone-900 transition-all shadow-lg shadow-primary/20 flex items-center space-x-3 group"
              >
                <FiMapPin className="text-xl group-hover:scale-110 transition-transform" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
