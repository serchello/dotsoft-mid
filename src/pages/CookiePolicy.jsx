import Layout from '../components/Layout.jsx';

export default function CookiePolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-10 py-8">Πολιτική Cookies</h1>
        <div className="prose prose-invert max-w-none text-gray-800">
          <p>Εδώ θα μπει το κείμενο της πολιτικής cookies.</p>
        </div>
      </div>
    </Layout>
  );
}