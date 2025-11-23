import React, { useState } from "react";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    setJoke(null);

    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Random Joke</h2>
        <p>Click the button to fetch a fresh one.</p>

        <button onClick={fetchJoke} style={styles.button}>
          {loading ? "Fetching..." : "Fetch Joke"}
        </button>

        {/* Error State */}
        {error && (
          <div style={{ marginTop: "15px" }}>
            <p style={{ color: "red" }}>
              Could not fetch a joke. Try again.
            </p>
            <button onClick={fetchJoke} style={styles.retry}>
              Try again
            </button>
          </div>
        )}

        {/* Joke Display */}
        {joke && !error && (
          <div style={{ marginTop: "20px" }}>
            <p>{joke.setup}</p>
            <p><b>{joke.punchline}</b></p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f3f4f6",
  },
  card: {
    width: "450px",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial",
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  retry: {
    marginTop: "5px",
    padding: "6px 12px",
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default App;
