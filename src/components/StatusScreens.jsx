export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7ac142] border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Φόρτωση...</p>
      </div>
    </div>
  );
}

export function ErrorScreen({ message }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Κάτι πήγε στραβά</h2>
        <p className="text-gray-600">{message || 'Προσπαθήστε ξανά αργότερα.'}</p>
      </div>
    </div>
  );
}