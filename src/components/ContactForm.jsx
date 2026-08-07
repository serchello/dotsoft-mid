import { useState } from 'react';

export default function ContactForm({ serviceTitle }) {
  const [form, setForm] = useState({
    subject: serviceTitle || '',
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 600);
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#1a3a2a]">
          Χρειάζεστε περισσότερες πληροφορίες;
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Επικοινωνήστε μαζί μας και θα σας απαντήσουμε άμεσα
        </p>

        {status === 'sent' ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7ac142]/20 mb-4">
              <svg className="w-8 h-8 text-[#7ac142]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#1a3a2a]">Ευχαριστούμε!</h3>
            <p className="text-gray-600">Το μήνυμά σας στάλθηκε επιτυχώς.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Θέμα"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ac142] focus:border-transparent outline-none transition"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="ΟΝΟΜΑΤΕΠΩΝΥΜΟ *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ac142] focus:border-transparent outline-none transition"
              />
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="ΦΟΡΕΑΣ *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ac142] focus:border-transparent outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="EMAIL *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ac142] focus:border-transparent outline-none transition"
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="ΤΗΛΕΦΩΝΟ *"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ac142] focus:border-transparent outline-none transition"
              />
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="ΜΗΝΥΜΑ *"
              required
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ac142] focus:border-transparent outline-none transition resize-none"
            />

            <p className="text-sm text-gray-500">(Τα πεδία με * είναι υποχρεωτικά)</p>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-[#7ac142] text-white font-semibold rounded-lg hover:bg-[#6ab038] transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? 'Αποστολή…' : 'Αποστολή'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}