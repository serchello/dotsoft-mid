import './StatusScreens.css';

export function LoadingScreen() {
  return (
    <div className="status-screen">
      <div className="skeleton skeleton--eyebrow" />
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line short" />
    </div>
  );
}

export function ErrorScreen({ message, onRetry }) {
  return (
    <div className="status-screen status-screen--error">
      <span className="eyebrow" style={{ '--accent-live': '#f2795a' }}>
        Σφάλμα φόρτωσης
      </span>
      <h2>Δεν βρέθηκαν δεδομένα υπηρεσίας</h2>
      <p>{message}</p>
      <p className="status-screen__hint">
        Πιθανή αιτία: το WordPress REST API του dotsoft.gr δεν επιστρέφει header
        <code> Access-Control-Allow-Origin</code>, οπότε το fetch από άλλο domain μπλοκάρεται από CORS.
        Δείτε το README για proxy λύση.
      </p>
      {onRetry && (
        <button className="btn btn-ghost" onClick={onRetry}>
          Δοκιμάστε ξανά
        </button>
      )}
    </div>
  );
}
