var watson = require('./watson');
var youtube = require('./youtube');
var path = require('path');

var flags = process.argv.slice(2);

if(flags[0] === 'transcribe'){
	youtube.getYouTubeAudio(flags[1]).then(function(){
		console.log('Uploading audio to Watson...');
		watson.watsonSpeechToText(path.join(__dirname, 'file.flac'))
	});
} else if(flags[0] === 'test') {
	watson.watsonSpeechToText('/Users/johnsims/Projects/Youtube/test-file.flac')
}
