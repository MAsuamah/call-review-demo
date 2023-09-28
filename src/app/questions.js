import styles from './page.module.css'
import '../../public/fonts/font.css'

const Questions = ({ handleQuestionsSubmit, handleQuestionFormChange }) => {
  return (
    <main className={styles.qpage}>
      <p style={{ fontFamily: 'Roboto Bold' }} className={styles.qtxt}>Ask Questions you have about the call or click "Generate Review" with the pre-written questions.</p>
      <form onSubmit={handleQuestionsSubmit}>
        <input  className={styles.input} type="text" id="q1" name="q1" onChange={handleQuestionFormChange} placeholder="Did the sales rep effectively identify the customer's needs and pain points?"/><br/>
        <input className={styles.input} type="text" id="q2" name="q2" onChange={handleQuestionFormChange} placeholder="Did the sales rep listen to the customer’s needs and preferences and tailor their approach accordingly?"/><br/>
        <button className={styles.btngen} type="submit">Generate Review</button>  
      </form>
    </main>
  )
};

export default Questions;