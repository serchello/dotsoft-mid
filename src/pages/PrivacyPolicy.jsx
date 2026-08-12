import Layout from '../components/Layout.jsx';

export default function PrivacyPolicy() {
  return (
    <Layout title="Πολιτική Προστασίας Δεδομένων" description="Η πολιτική προστασίας δεδομένων της DOTSOFT">
      <div className="container mx-auto px-4 max-w-4xl ">
        <h1 className="text-3xl font-bold mb-10 py-8">Πολιτική Προστασίας Δεδομένων</h1>
        <div className="prose prose-invert max-w-none text-gray-800">
          <p>Εδώ θα μπει το κείμενο της πολιτικής προστασίας δεδομένων.</p>
        </div>
      </div>
    </Layout>
  );
}