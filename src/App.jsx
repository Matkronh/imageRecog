import UploadBlock from "./components/UploadBlock"
import ResultBlock from "./components/ResultBlock"
import styles from './styles/imgrec.module.css'

function App() {
  return (
    <>
      <div className={styles.frameDiv}>
        <UploadBlock/>
        {/* <ResultBlock/> */}
      </div>
    </>
  )
}

export default App
