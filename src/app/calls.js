import Image from 'next/image'
import styles from './page.module.css'
import '../../public/fonts/font.css'
import Donna from '../../public/images/donna.jpg'
import Jeff from '../../public/images/jeff.jpg'
import James from '../../public/images/james.jpg'
import Mark from '../../public/images/mark.jpg'
import Lauren from '../../public/images/lauren.jpg'
import Erica from '../../public/images/erica.jpg'

const Calls = ({ handleAudioSubmit, handleAudioFormChange}) => {

  return (
    <div>
      <header className={styles.header}>
        <h1 style={{ fontFamily: 'Roboto Black' }}>CallCraft AI <span className={styles.span}>Demo</span></h1>
        <article style={{ fontFamily: 'Roboto Regular' }} className={styles.article} >
          <p>Harness the power of artificial intelligence to provide comprehensive performance reviews of your sales calls.</p>
        </article>
      </header>
      <main className={styles.form}>
        <form onSubmit={handleAudioSubmit} style={{ fontFamily: 'Roboto Light' }}>
          <div className={styles.flexwrap}>
            <div className={styles.labels}>
              <input className={styles.radio} type="radio" id="call-1" name="select-call" value="call-1.mp3" onChange={handleAudioFormChange}></input>
              <label htmlFor="call-1">Call between Donna and Carolyn</label>
              <div className={styles.flexColumn}>
                <Image className={styles.img} src={Donna} width={300} height={200} alt="woman wearing headset working at a call center"/>
                <audio controls className={styles.audio}><source src="/audio/call-1.mp3" type="audio/mp3"/></audio>
              </div>
            </div>
            <div className={styles.labels}>
              <input className={styles.radio} type="radio" id="call-2" name="select-call" value="call-2.mp3" onChange={handleAudioFormChange}></input>
              <label htmlFor="call-2">Call between Jeff and Anthony</label>
              <div className={styles.flexColumn}>
                <Image className={styles.img} src={Jeff} width={300} height={200} alt="man wearing headset working in the office"/>
                <audio controls className={styles.audio}><source src="/audio/call-2.mp3" type="audio/mp3"/></audio>
              </div>
            </div>
            <div className={styles.labels}>
              <input className={styles.radio} type="radio" id="call-3" name="select-call" value="call-3.mp3" onChange={handleAudioFormChange}></input>
              <label htmlFor="call-3">Call between James and Marco</label>
              <div className={styles.flexColumn}>
                <Image className={styles.img} src={James} width={300} height={200} alt="man wearing headset working in the office"/>
                <audio controls className={styles.audio}><source src="/audio/call-3.mp3" type="audio/mp3"/></audio>
              </div>
            </div>
            <div>
              <div className={styles.labels}>
                <input className={styles.radio} type="radio" id="call-4" name="select-call" value="call-4.wav" onChange={handleAudioFormChange}></input>
                <label htmlFor="call-4">Call between Mark and Colin</label>
                <div className={styles.flexColumn}>
                  <Image className={styles.img} src={Mark} width={300} height={200} alt="man taking a phone call at work"/>
                  <audio controls className={styles.audio}><source src="/audio/call-4.wav" type="audio/wav"/></audio>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.labels}>
                <input className={styles.radio} type="radio" id="call-5" name="select-call" value="call-5.wav" onChange={handleAudioFormChange}></input>
                <label htmlFor="call-5">Call between Lauren and John</label>
                <div className={styles.flexColumn}>
                  <Image className={styles.img} src={Lauren} width={300} height={200} alt="woman taking a phone call at work"/>
                  <audio controls className={styles.audio}><source src="/audio/call-5.wav" type="audio/wav"/></audio>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.labels}>
                <input className={styles.radio} type="radio" id="call-6" name="select-call" value="call-6.mp3" onChange={handleAudioFormChange}></input>
                <label htmlFor="call-6">Call between Eric and Josh</label>
                <div className={styles.flexColumn}>
                  <Image className={styles.img} src={Erica} width={300} height={200} alt="woman wearing a headset while working"/>
                  <audio controls className={styles.audio}><source src="/audio/call-6.mp3" type="audio/mp3"/></audio>
                </div>
              </div> 
            </div>
          </div>
          <div className={styles.padding}>
            <button type="submit" className={styles.btn}>Next</button>  
          </div>
        </form>
      </main>
    </div>
  );
};

export default Calls;