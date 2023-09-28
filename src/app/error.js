'use client';
import Image from 'next/image'
import Sweat from '../../public/images/sweat.png'
import styles from './page.module.css'

const Error = ({error}) => {
  return (
    <main className={styles.load}>
      <p>{error}</p>
      <Image className={styles.img} src={Sweat} width={300} height={300} alt="sweat emoji image"/>
    </main>
  )
};

export default Error;