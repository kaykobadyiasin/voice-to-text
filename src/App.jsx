
import 'regenerator-runtime/runtime'; // Import regenerator-runtime
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from 'react';


function App() {

  const [language, setLanguage] = useState('en');
  const [textCopy, setTextCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textCopy);


  const startListening = () => SpeechRecognition.startListening({ continuous: true, language })

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  return (
    <>
      <div>
        <h1 className="text-5xl text-center py-5 capitalize font-semibold bg-[#0F1B34] text-white">Voice to text</h1>

        <div className='flex justify-center mt-10'>
          <button onClick={() => setLanguage('en')} className="px-5 py-3 bg-blue-500 text-white rounded-lg border-transparent border-2 focus:border-gray-200 font-semibold">Language English</button>
        </div>
        <div onClick={() => setTextCopy(transcript)} className="max-w-3xl min-h-96 mx-auto border mt-10 rounded-lg p-5 shadow-md flex flex-col justify-between" >

          {/* texts  */}
          <div className='text-gray-600'>
            {!transcript ? 'Start voice...' : transcript}
          </div>

          {/* buttons  */}
          <div className="flex justify-between">
            <button onClick={setCopied} className="px-5 py-3 bg-blue-500 text-white rounded-lg border-transparent border-2 focus:border-gray-200 font-semibold">{!isCopied ? 'Copy text' : 'Copied!'}</button>
            <button onClick={startListening} className="px-5 py-3 bg-blue-800 text-white rounded-lg border-transparent border-2 focus:border-gray-200 font-semibold">Start Listening</button>
            <button onClick={SpeechRecognition.stopListening} className="px-5 py-3 bg-red-500 text-white rounded-lg border-transparent border-2 focus:border-gray-200 font-semibold">Stop Listening</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
