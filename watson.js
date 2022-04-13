require('dotenv').config();
const CURL = require("child_process");
const fs = require('fs')
const URL = process.env.WATSON_URL
const token = process.env.WATSON_API_KEY
const model = process.env.MODEL

const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

exports.watsonSpeechToText = async function(file) {


  const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: token,
    }),
    serviceUrl: URL,
  });

  const params = {
    objectMode: true,
    contentType: 'audio/flac',
    model: model
  };

  const recognizeStream = speechToText.recognizeUsingWebSocket(params);
  fs.createReadStream(file).pipe(recognizeStream);

  // Listen for events.
  recognizeStream.on('data', function(event) { saveData(event); });
  recognizeStream.on('error', function(event) { onEvent('Error:', event); });
  recognizeStream.on('close', function(event) { onEvent('Close:', event); });

  // Display events on the console.
  function onEvent(name, event) {
      console.log(name, JSON.stringify(event, null, 2));
  };

  function saveData(event) {
    let transcript = '';
    let stringify = JSON.stringify(event, null, 2);
    fs.writeFileSync('transcript.json', stringify)

    JSON.parse(stringify).results.forEach(result => {
      transcript = transcript + result.alternatives[0].transcript + "\r\n"
    })

    fs.writeFileSync('transcript.txt', transcript)
  };
}
