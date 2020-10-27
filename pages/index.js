import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [location, setLocation] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-6xl">⛅</h1>
        <h1 className={styles.title}>Weather Demo</h1>

        <p className={styles.description}>
          Search weather data by typing
          <code className={styles.code}>Location, Zip Code</code> separated by a
          comma. Enter to search.
        </p>

        <div className="w-full block">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="my-2 shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 text-3xl leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Location, Zip Code"
              onChange={(e) => setLocation({ location: e.currentTarget.value })}
            ></input>
          </form>
        </div>
      </main>
    </div>
  );
}
