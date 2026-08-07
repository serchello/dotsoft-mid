import './RelatedServices.css';

export default function RelatedServices({ items, currentTitle }) {
  const filtered = items?.filter((i) => i.name !== currentTitle);
  if (!filtered?.length) return null;

  return (
    <section className="related">
      <div className="container">
        <h2>Δείτε περισσότερα προϊόντα</h2>
        <div className="related__track">
          {filtered.map((item) => (
            <a key={item.name} href={item.href} className="related__card">
              {item.logo && <img src={item.logo} alt="" className="related__logo" />}
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
