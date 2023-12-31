// pages/api/sendAudio.js
import axios from 'axios';
import fs from 'fs';
require('dotenv').config();
 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const path = require('path');

    const assembly = axios.create({
      baseURL: 'https://api.assemblyai.com',
      headers: {
        authorization: process.env.API_KEY,
        'content-type': 'application/json',
      },
    });

    const selectedFile = req.body.audio;
    const file = path.join(process.cwd(), 'public', 'audio', selectedFile);

    let question1 = req.body.q1;
    let question2 = req.body.q2;

    if (!question1) {
      question1 = "Did the sales rep effectively identify the customer's needs and pain points?";
    }

    if (!question2) {
      question2 = "Did the sales rep listen to the customer’s needs and preferences and tailor their approach accordingly?";
    }

    try {
      const data = fs.readFileSync(file); // Read the audio file

      // Upload the audio file to AssemblyAI for transcription
      const uploadResponse = await assembly.post('/v2/upload', data);
      const audioUrl = uploadResponse.data.upload_url;

      // Request transcription
      const transcriptionResponse = await assembly.post('/v2/transcript', {
        audio_url: audioUrl,
        speaker_labels: true,
        speakers_expected: 2,
        sentiment_analysis: true,
        entity_detection: true,
      });

      const transcriptId = transcriptionResponse.data.id;

      // Interval for checking transcript completion
      const refreshInterval = 5000; // 5 seconds (adjust as needed)

      const checkCompletionInterval = setInterval(async () => {
        const transcript = await assembly.get(`/v2/transcript/${transcriptId}`);
        const transcriptStatus = transcript.data.status;

        if (transcriptStatus !== 'completed') {
          console.log(`Transcript Status: ${transcriptStatus}`);
        } else {
          console.log('Transcription Completed');
          const sentimentResults = transcript.data.sentiment_analysis_results;
          const entityDetectionResults = transcript.data.entities;
          clearInterval(checkCompletionInterval);

          const context = 'This is a sales call.';

          const dataObjSum = {
            transcript_ids: [transcriptId],
            context: context,
            answer_format: 'A short paragraph',
          };

          const dataObjQA = {
            transcript_ids: [transcriptId],
            questions: [
              {
                question: question1,
                context: context,
                answer_format: '<answer>. <reason>',
              },
              {
                question: question2,
                context: context,
                answer_format: '<answer>. <reason>',
              },
              {
                question: 'Did the customer leave the call satisfied?',
                context: context,
                answer_format: '<answer>. <reason>',
              },
              {
                question: 'Was the sales rep knowledgeable about the product or service they were selling?',
                context: context,
                answer_format: '<answer>. <reason>',
              },
              {
                question: 'How would you rate the overall professionalism and courtesy of the sales rep,with 1 being poor and 10 being excellent?',
                context: context,
                answer_format: '<answer>. <reason>',
              },
            ],
          };

          const dataObjTask = {
            transcript_ids: [transcriptId],
            prompt: 'You are a coach. Provide a list of steps the salesperson can take to improve their sales tactics.',
            context: context,
            answer_format: 'Bullet point list.',
          };

          const dataObjAction = {
            transcript_ids: [transcriptId],
            context: 'Return a list of action items the the salesperson should take note of.',
            context: context,
          };

          try {
            const qaPromise = assembly.post('/lemur/v3/generate/question-answer', dataObjQA);
            const summaryPromise = assembly.post('/lemur/v3/generate/summary', dataObjSum);
            const taskPromise = assembly.post('/lemur/v3/generate/task', dataObjTask);
            const actionItemPromise = assembly.post('/lemur/v3/generate/action-items', dataObjAction);

            const [
              qaResponse,
              summaryResponse,
              taskResponse,
              actionItemResponse,
            ] = await Promise.all([
              qaPromise,
              summaryPromise,
              taskPromise,
              actionItemPromise,
            ]);

            const qa = qaResponse.data.response;
            const summary = summaryResponse.data.response;
            const tasks = taskResponse.data.response;
            const actions = actionItemResponse.data.response;

            res.status(200).json({ call: selectedFile, sentiments: sentimentResults, entities: entityDetectionResults, qa: qa, summary: summary, tasks: tasks, actions: actions });
          } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Something went wrong!' });
          }
        }
      }, refreshInterval);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
