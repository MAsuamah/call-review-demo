'use client';
import dynamic from 'next/dynamic';
import Questions from './questions.js';
import Error from './error.js';
import Calls from './calls';
import Loading from './loading';
import { useState, useEffect } from 'react';
import './style.css'


export default function Home () {

  const Results = dynamic(() => import('./results'), { ssr: false });
  const [currentPage, handlePageChange] = useState('Calls');
  const [audio, setAudio] = useState(null);
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [speakers, setSpeakers] = useState([])
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [sentiments, setSentiments] = useState('')
  const [entities, setEntities] = useState('')
  const [qa, setQA] = useState('')
  const [actions, setAction] = useState('')
  const [tasks, setTasks] = useState('')
  const [error, setError] = useState('')
  const [pdf, setPDF] = useState('')

  const changePage = (page) => {
    handlePageChange(page)
  }

  const handleAudioSubmit = (event) => {
    event.preventDefault();
    changePage('Questions')
  }

  const handleQuestionsSubmit = async (event) => {
    event.preventDefault();
    changePage('Loading')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sendAudio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio: audio, q1: q1, q2: q2 }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if(data.call === '../public/audio/call-1.mp3') {
          setSpeakers(['Donna', 'Carolyn']) 
        }

        if(data.call === '../public/audio/call-2.mp3') {
          setSpeakers(['Jeff', 'Anthony']) 
        }

        if(data.call === '../public/audio/call-3.mp3') {
          setSpeakers(['James', 'Marco']) 
        }

        if(data.call === '../public/audio/call-4.wav') {
          setSpeakers(['Mark', 'Colin']) 
        }

        if(data.call === '../public/audio/call-5.wav') {
          setSpeakers(['Lauren', 'John'])
        }

        if(data.call === '../public/audio/call-6.mp3') {
          setSpeakers(['Erica', 'Josh']) 
        }

        setSummary(data.summary)
        setAction(data.actions)
        setTasks(data.tasks)
        setEntities(data.entities)
        setQA(data.qa)
        setSentiments(data.sentiments)
        changePage('Results')
      } else {
        const error = await response.json();
        setError(error.error);
        changePage('Error')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleAudioFormChange = (event) => {
    setAudio(event.target.value)
  }

  const handleQuestionFormChange = (event) => {

    if(event.target.name === 'q1') {
      setQ1(event.target.value)
    }

    if(event.target.name === 'q2') {
      setQ2(event.target.value)
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'Calls':
        return <Calls 
                handleAudioFormChange={handleAudioFormChange}
                handleAudioSubmit={handleAudioSubmit}
               />;
      case 'Questions':
        return <Questions 
                audio={audio}
                handleQuestionsSubmit={handleQuestionsSubmit}
                handleQuestionFormChange={handleQuestionFormChange}
               />;
      case 'Loading':
        return <Loading />;
      case 'Error':
        return <Error
               error={error} 
              />;          
      case 'Results':
        return <Results 
                speaker={speakers}
                title={title}
                summary={summary}
                actions={actions}
                tasks={tasks}
                sentiments={sentiments}
                entities={entities}
                qa={qa}
                pdf={pdf}
              />;
      default:
        return <Calls />;
    }
  };

  useEffect(() => {
    setTitle(`${speakers[0]} and ${speakers[1]}`)
    setPDF(`${speakers[0]}-${speakers[1]}`)
  }, [speakers]) 

  return (
    <div className="App" >
      <div>{renderPage(currentPage)}</div>
    </div>
  )
}
