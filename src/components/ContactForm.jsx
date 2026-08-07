import { useState } from 'react';
import './ContactForm.css';

export default function ContactForm({ serviceTitle }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    // TODO: заменить на реальный эндпоинт приёма лидов (свой backend, а не wp-admin/admin-ajax.php
    // хоста dotsoft.gr — форма Contact Form 7 в оригинале предполагает тот же домен и здесь работать не будет).
    setTimeout(() => setStatus('sent'), 700);
  }

  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <div>
          <span className="eyebrow">Ζητήστε προσφορά</span>
          <h2 className="contact__title">Ενδιαφέρεστε για {serviceTitle};</h2>
          <p>Στείλτε μας τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας.</p>
        </div>

        {status === 'sent' ? (
          <div className="contact__success">✓ Το μήνυμά σας στάλθηκε. Θα επικοινωνήσουμε σύντομα.</div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Ονοματεπώνυμο*" required />
            <input type="text" placeholder="Φορέας*" required />
            <input type="email" placeholder="Email*" required />
            <input type="tel" placeholder="Τηλέφωνο*" required />
            <textarea placeholder="Μήνυμα*" rows={5} required />
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Αποστολή…' : 'Αποστολή'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
