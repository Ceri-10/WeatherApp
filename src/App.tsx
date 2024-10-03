import styles from './App.module.css'
import Form from './Form/Form'

function App() {

  return (
    <>
    <h1 className={styles.title}>Buscador de clima</h1>
    <div className={styles.container}>
    <Form />
    </div>
    </>
  )
}

export default App
