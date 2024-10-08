import Alert from './Alert/Alert'
import styles from './App.module.css'
import WeatherDetail from './components/WeatherDetail'
import Form from './Form/Form'
import useWeather from './hooks/useWeather'
import Spinner from './Spinner/Spinner'

function App() {

  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />

        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
