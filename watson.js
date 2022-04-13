require('dotenv').config();
const CURL = require("child_process");
const fs = require('fs')
const URL = process.env.WATSON_URL
const token = process.env.WATSON_API_KEY

exports.watsonSpeechToText = async function(file) {

  let transcript = '';
  let command = 'curl -X POST -u "apikey:' + token + '" --header "Content-Type: audio/flac" --data-binary @' + file + ' "' + URL + '/v1/recognize"'
  let child = CURL.exec(command)

  child.stdout.pipe(process.stdout)
  
  child.on('error', function(statusCode, data, headers) {
    console.log(data)
    process.exit()
  })

  child.stdout.on('data', function(data) {
    JSON.parse(data).results.forEach(result => {
      transcript = transcript + result.alternatives[0].transcript + "\r\n"
    })

    fs.writeFileSync('transcript.txt', transcript)
    console.log('Done transcribing video to transcript.txt');
  });

  child.on('exit', function() {
    process.exit()
  })
}
