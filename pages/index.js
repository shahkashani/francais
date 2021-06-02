export default function Home() {
  return (
    <div className="container">
      <div className="grid">
        <a href="/passe-compose" className="card">
          <h3>Passé composé</h3>
        </a>
        <a href="/conjugaison" className="card">
          <h3>Conjugaison</h3>
          <p>Être, aller &amp; avoir</p>
        </a>
        <a href="/prepositions" className="card">
          <h3>Prepositions</h3>
        </a>
        <a href="/preposition-locutions" className="card">
          <h3>Preposition Locutions</h3>
        </a>
      </div>

      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 40%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0055a4;
          border-color: #0055a4;
        }

        .card h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 1rem 0 0 0;
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
