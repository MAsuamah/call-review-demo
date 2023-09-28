import Image from 'next/image'
import Spinner from '../../public/images/spinner.gif'
import styles from './page.module.css'

const Loading = () => {
  return (
    <main className={styles.load}>
      <p>Generating your call review...</p>
      <Image src={Spinner} alt="loading spinner"/>
    </main>
  )
};

export default Loading;