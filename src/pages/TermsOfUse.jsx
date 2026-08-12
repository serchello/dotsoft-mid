import Layout from '../components/Layout.jsx';

export default function TermsOfUse() {
  return (
    <Layout title="Όροι Χρήσης" description="Οι όροι χρήσης της DOTSOFT">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-10 py-8">Όροι Χρήσης</h1>
        <div className="prose prose-invert max-w-none text-gray-800">
          <p>Εδώ θα μπει το κείμενο των όρων χρήσης.</p>
        </div>
      </div>
    </Layout>
  );
}
