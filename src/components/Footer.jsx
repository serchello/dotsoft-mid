import { useState } from 'react';

export default function Footer({ contact = {} }) {
  const [form, setForm] = useState({ name: '', company: '', email: '' });
  const [status, setStatus] = useState('idle');

  const address = contact?.address || 'Ποσειδώνος 71, Θεσσαλονίκη Πυλαία, 55535';
  const email = contact?.email || 'info@dotsoft.gr';
  const phone = contact?.phone || '+30 2310 500181';
  const fax = contact?.fax || '+30 2310 551844';
  const gemh = contact?.gemh || '059277904000';

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 600);
  }

  return (
    <footer className="relative overflow-hidden text-white">
      <div className="relative">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[70%] px-14 sm:px-16 pb-14 pt-14 bg-[#1f2e32]">
            <a href="/" className="inline-flex items-center gap-2">
              <img src="/images/logo_footer.png" alt="DOTSOFT" className="h-9 w-auto" />
            </a>

            <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="text-md font-semibold tracking-wide text-white/70">Επικοινωνία</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <ContactRow icon={<IconBuilding />}>{address}</ContactRow>
                  <ContactRow icon={<IconMail />}>
                    <a href={`mailto:${email}`} className="hover:text-[#7ac142]">{email}</a>
                  </ContactRow>
                  <ContactRow icon={<IconPhone />}>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-[#7ac142]">{phone}</a>
                  </ContactRow>
                  <ContactRow icon={<IconFax />}>{fax}</ContactRow>
                  <ContactRow icon={<IconId />}>Αρ.ΓΕΜΗ: {gemh}</ContactRow>
                </ul>
              </div>

              <div>
                <h3 className="text-md font-semibold tracking-wide text-white/70">Εγγραφείτε στο Newsletter!</h3>

                {status === 'sent' ? (
                  <p className="mt-4 rounded border border-[#7ac142]/40 bg-[#7ac142]/10 px-4 py-3 text-sm text-[#7ac142]">
                    ✓ Εγγραφήκατε επιτυχώς στο newsletter.
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 max-w-md">
                    <FooterInput name="name" placeholder="Ονοματεπώνυμο *" value={form.name} onChange={handleChange} />
                    <FooterInput name="company" placeholder="Φορέας *" value={form.company} onChange={handleChange} />
                    <FooterInput name="email" type="email" placeholder="Διεύθυνση Email *" value={form.email} onChange={handleChange} />
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="mt-1 w-full border-b border-white/20 py-3 text-center text-sm font-medium text-white/90 transition hover:border-[#7ac142] hover:text-[#7ac142] disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Αποστολή…' : 'Εγγραφείτε!'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-[30%] md:min-h-[450px] md:bg-cover md:bg-center md:bg-no-repeat" 
               style={{ backgroundImage: `url('/images/Background.png')` }} />
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-[#19272B]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-4 py-6 text-xs text-white/80 sm:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3 order-1">
            <SocialIcon href="#" label="Facebook">
              <img src="/images/svg/facebook.svg" alt="Facebook" className="h-7 w-7" />
            </SocialIcon>
            <SocialIcon href="#" label="YouTube">
              <img src="/images/svg/youtube.svg" alt="YouTube" className="h-7 w-7" />
            </SocialIcon>
            <SocialIcon href="#" label="LinkedIn">
              <img src="/images/svg/linkedin.svg" alt="LinkedIn" className="h-7 w-7" />
            </SocialIcon>
          </div>

          <p className="order-3 text-center md:order-2 text-[#f1ffff]">
            © Copyright DOTSOFT SA {new Date().getFullYear()}. All Rights Reserved.
          </p>

          <div className="order-2 flex flex-col items-center gap-1 text-center md:order-3 md:items-end md:text-right text-[#ffffff]">
            <div className="flex gap-4">
              <a href="#" className="hover:text-white text-[#ffffff]">Πολιτική Cookies</a>
              <a href="#" className="hover:text-white text-[#ffffff]">Όροι Χρήσης</a>
            </div>
            <a href="#" className="hover:text-white">Προσωπικά Δεδομένα</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactRow({ icon, children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-[#7ac142]">{icon}</span>
      <span className="text-[#ffffff]">{children}</span>
    </li>
  );
}

function FooterInput(props) {
  return (
    <input
      {...props}
      required
      className="mb-4 w-full border-b border-white/20 bg-transparent pb-2 text-sm text-white placeholder-white/50 outline-none transition focus:border-[#7ac142]"
    />
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a href={href} aria-label={label} className="flex items-center justify-center rounded-full transition hover:scale-110 hover:opacity-80">
      {children}
    </a>
  );
}

function IconBuilding() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21h18M5 21V6l7-3 7 3v15M9 9h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 6l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5c0 9.4 6.6 16 16 16l2-4-5-2-2 2c-2.5-1-4-2.5-5-5l2-2-2-5H3z" />
    </svg>
  );
}
function IconFax() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 3h9v6H6zM4 9h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V9zM8 14h8" />
    </svg>
  );
}
function IconId() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M7 9h4M7 12h6M7 15h3" />
    </svg>
  );
}