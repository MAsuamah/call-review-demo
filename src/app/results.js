'use client';
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import styles from './page.module.css'
import '../../public/fonts/font.css'

const Results = ({summary, title, actions, tasks, qa, sentiments, entities, speaker, pdf}) => {
  const contentRef = useRef(null);

  const downloadAsPDF = () => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const pdfOptions = {
      margin: [15, -15],
      filename: `${pdf}`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' },
     pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().from(content).set(pdfOptions).save();
  };

  return (
    <div className={styles.respage}>
      <div className={styles.right} > 
        <button className={styles.btnpdf} onClick={downloadAsPDF}>Download as PDF</button>
      </div>   
      <div className={styles.review} ref={contentRef}>
        <h1><span className={styles.span}>Call between </span>{title}</h1>
        <div className={styles.resbox}>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
        <div className={styles.resbox}>
        <h2>Transcript Sentiment</h2>
          {sentiments.map(sentiment => (
            <p key={sentiment.start} className={`${sentiment.sentiment.toLowerCase()}`}>{sentiment.speaker === 'A' ? `${speaker[0]}: ${sentiment.text}` : `${speaker[1]}: ${sentiment.text}`} - {sentiment.sentiment}</p>
          ))}
        </div>
        <div className={styles.resbox}>
        <h2>Q & A</h2>
          {qa.map((question, index) => (
            <div key={index}>
              <h3>Question: {question.question} </h3>
              <p>Answer: {question.answer}</p>
            </div>
          ))}
        </div>
        <div className={styles.resbox}>
          <h2>Action Items</h2> 
          <pre className={styles.pre}>{actions}</pre>
        </div>
        <div className={styles.resbox}>
          <h2>Call Feedback</h2>
          <pre className={styles.pre}>{tasks}</pre>
        </div>
        <div className={styles.resbox} style={{marginBottom: 0 }}>
          <h2>Index</h2>
            <table className={styles.index}>
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Text</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {entities.map(entity => (
                  <tr key={entity.start}>
                    <td>{entity.entity_type}</td>
                    <td>{entity.text}</td>
                    <td>{entity.start}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Results;
