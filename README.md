# YouTube Video Transcriber, Using Watson

A simple and free YouTube Video Transcriber using IBM's Watson. I got frustrated trying to use the other ones on GitHub that either didn't work or were unsupported or both. The goal of this project is to provide everyone with a simple transcriber with minimal dependencies and to keep supporting it.

This is a fork of an older, seemingly abandoned [project](https://github.com/alexzywiak/youtube-transcriber).

## Installation

You'll need to have [homebrew](https://brew.sh/) and [node](https://nodejs.org/en/download/) installed in order to run this.

You will also need an IBM account with [Watson Speech to Text](https://www.ibm.com/cloud/watson-speech-to-text?utm_content=SRCWW) enabled. You'll need to install the [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cli-getting-started#overview) as well. As of 4/12/2022 IBM offers 500 hours a month of transcription for free. Your instance will come with a specific apikey and a url.

Install youtube-dl and ffmpeg.

```bash
brew install youtube-dl
pip install ffmpeg
```
Clone the repo and run NPM install.

```bash
git clone https://github.com/johnlewissims/simple-youtube-transcriber.git
cd simple-youtube-transcriber
npm install
```

Rename .example.env to .env and update WATSON_URL and WATSON_API_KEY to your Watson url and apikey.

## Usage

Use this command to transcribe the video.

```bash
node index.js transcribe VIDEOID
```

The VIDEOID can be found in the YouTube Video's URL. For example, in this URL... 
```bash
https://www.youtube.com/watch?v=C0DPdy98e4c
```
the ID is C0DPdy98e4c

Once the command has run, a text file will be saved to the project folder with the transcript.