import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // Replace this with the actual business number including country code (e.g., 947XXXXXXXX for Sri Lanka)
  // Do not include the '+' sign, spaces, or dashes.
  const phoneNumber = "94763961078";
  const message =
    "Hello Deelectaa Cafe! I would like to know more about your menu and reservations.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[99] bg-[#128C4A] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-4xl relative z-10 drop-shadow-md" />

      {/* Ping Animation Ring */}

      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-white text-stone-800 px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap font-bold text-sm border border-stone-100">
        Chat with us!
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-stone-100 rotate-45"></div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
