import Head from "next/head"
import useSWR from "swr"
import { useState } from "react"
import styles from "../styles/Home.module.css"
import { getFahrenheit, getLocalTime } from "../utils/weather"

export default function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json())
  const [location, setLocation] = useState()
  const [searching, setSearching] = useState(false)
  const [params, setParams] = useState("")

  const { data, error } = useSWR(
    searching ? `/api/weather?${params}` : null,
    fetcher
  )

  console.log(data)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearching(true)

    setParams(new URLSearchParams(parseSearchParams()).toString())
  }

  const handleChange = (e) => {
    setLocation({ query: e.currentTarget.value })
  }

  const parseSearchParams = () => {
    if (location) {
      const query = location.query.split(",").map((el) => el.trim())
      // To keep it simple, let's just search in ZIP Codes from the US
      return query.length === 1 ? { q: query[0] } : { zip: `${query[1]},US` }
    }

    return false
  }

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
              onChange={(e) => handleChange(e)}
            ></input>
          </form>
        </div>

        {searching && data?.cod == "200" ? (
          <div className="text-center text-xl my-2">
            <h2 className="text-3xl">📍 {data.name}</h2>
            <p>Current temperature is: {getFahrenheit(data.main.temp)} F</p>
            <p>Local time: {getLocalTime(data.dt, data.timezone)} UTC</p>
          </div>
        ) : (
          <div>
            <p className="text-xl text-red-500">{data?.message}</p>
          </div>
        )}
      </main>
    </div>
  )
}
