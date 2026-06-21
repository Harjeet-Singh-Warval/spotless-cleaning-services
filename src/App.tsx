import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import HowItWorks from "./components/HowItWorks";
import BeforeAfter from "./components/BeforeAfter";
import QuoteForm from "./components/QuoteForm";
import MapArea from "./components/MapArea";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import { Send, Phone, Mail, MapPin, Sparkles, Check, ChevronDown, HelpCircle } from "lucide-react";

export default function App() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryService, setInquiryService] = useState("general");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState<string | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGeneralInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryPhone.trim()) return;

    setIsInquirySubmitting(true);
    setTimeout(() => {
      setIsInquirySubmitting(false);
      setInquirySuccess(`Thank you, ${inquiryName}! We received your support message and will dispatch a care specialist to connect with you within 30 minutes!`);
      setInquiryName("");
      setInquiryEmail("");
      setInquiryPhone("");
      setInquiryMsg("");
    }, 1000);
  };

  const faqs = [
    {
      q: "Are the cleaning supplies included in your service estimates?",
      a: "Yes, absolutely! Our professional squads arrive with a fully stocked inventory of EPA-certified eco-friendly solvents, microfiber linens, HEPA-filter vacuums, and custom hardwood conditioners. You are never expected to supply anything, unless you specifically prefer a bespoke solution."
    },
    {
      q: "Can I schedule cleaning appointments when I am away?",
      a: "Yes. In fact, over 75% of our recurring residential clients prefer to be away during cleaning hours. You can securely leave access codes or lockbox instructions in our booking notes. Every specialist is fully licensed, background-screened, and liability bonded for your ultimate peace of mind."
    },
    {
      q: "What happens if I need to cancel or reshift my appointment?",
      a: "We understand that lives are dynamic. You can reschedule or cancel any appointment free of charge up to 24 hours prior to our scheduled arrival. Appointments cancelled after that threshold are subject to a nominal $40 scheduling lock fee."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-sky-500 selection:text-white antialiased text-slate-800">
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* 2. Hero Header Banner */}
      <Hero />

      {/* 3. Core Services Grid Overview */}
      <Services />

      {/* 4. Trust Badges / Why Choose Us */}
      <WhyChooseUs />

      {/* 5. 3-Step Process (Book -> Clean -> Relax) */}
      <HowItWorks />

      {/* 6. High Standards Transformations Slider (Before/After) */}
      <BeforeAfter />

      {/* 7. Instant Cost Calculator & Full Booking Dispatch */}
      <QuoteForm />

      {/* 8. Interactive Regional Coverage Maps + General Callback Contacts */}
      <section id="service-map-zone" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Interactive County Map - 6 columns */}
            <div className="lg:col-span-6">
              <MapArea />
            </div>

            {/* Quick General Inquiry / Contact form - 6 columns */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase bg-sky-50 text-sky-700 px-3 py-1 rounded-full">
                    General Inquiries
                  </span>
                  <h3 className="font-sans font-black text-2xl text-slate-900 mt-3">
                    Have Custom Questions? Connect with Us!
                  </h3>
                  <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                    If you need help setting up corporate contracts, have complex estate setups, or simply want to speak to our service coordinator directly, drop us your details below.
                  </p>
                </div>

                {inquirySuccess ? (
                  <div className="mt-8 bg-emerald-50 border border-emerald-100 text-emerald-800 p-5 rounded-2xl text-sm leading-relaxed text-center animate-in fade-in duration-150">
                    <div className="w-12 h-12 bg-white rounded-full text-emerald-500 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
                      ✓
                    </div>
                    <strong>Inquiry Logged!</strong>
                    <p className="mt-1.5 text-xs text-emerald-700">{inquirySuccess}</p>
                    <button
                      onClick={() => setInquirySuccess(null)}
                      className="mt-4 text-xs font-bold text-sky-600 underline cursor-pointer hover:text-sky-550"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleGeneralInquirySubmit} className="mt-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Marcus Aurelius"
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="e.g. aurelius@stoic.com"
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="e.g. (800) 555-0100"
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Service Preference</label>
                        <select
                          value={inquiryService}
                          onChange={(e) => setInquiryService(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                        >
                          <option value="general">General Support</option>
                          <option value="residential">Residential Weekly</option>
                          <option value="corporate">Corporate Contract</option>
                          <option value="custom">Post-Construction</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Message</label>
                      <textarea
                        rows={3}
                        value={inquiryMsg}
                        onChange={(e) => setInquiryMsg(e.target.value)}
                        placeholder="Detail your requirements so our squad is ready when calling..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isInquirySubmitting}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Send inquiry to Dispatch</span>
                      <Send className="w-3.5 h-3.5 text-sky-400" />
                    </button>
                  </form>
                )}

                {/* Secure call link */}
                <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">Prefer voice support?</p>
                    <p className="text-slate-500 mt-0.5">
                      Call our representative directly at{" "}
                      <a href="tel:+18005550199" className="text-sky-600 font-extrabold hover:underline">
                        (800) 555-0199
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Verified Reviews & Testimonials Carousel */}
      <Testimonials />

      {/* 10. Our Story / About Us details */}
      <AboutUs />

      {/* Elegant Mini FAQ section because premium sites help resolve conversions */}
      <section className="py-20 bg-sky-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-700 bg-sky-100/50 px-3 py-1 rounded-full">
              Faqs
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 leading-tight">
              Common Questions & Quick Answers
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40"
                  >
                    <span className="font-sans font-bold text-sm md:text-base text-slate-800 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-sky-500 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180 text-sky-600" : ""}`} />
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-40 border-t border-slate-50" : "max-h-0"
                    }`}
                  >
                    <p className="p-5 text-xs md:text-sm text-slate-550 leading-relaxed text-slate-600">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Footer details */}
      <Footer />

      {/* 12. Float chat assistant driven by server Gemini */}
      <ChatWidget />
    </div>
  );
}
