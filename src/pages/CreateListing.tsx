import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Play, Square, Languages, Loader2, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { extractProductDetails } from '../utils/aiExtraction';
import { VoiceWaveform } from '../components/VoiceWaveform';

export function CreateListing() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const navigate = useNavigate();
  const { updateCurrentProduct } = useProducts();

  const languages = [
    { code: 'hi-IN', name: 'हिंदी / Hindi' },
    { code: 'ta-IN', name: 'தமிழ் / Tamil' },
    { code: 'en-IN', name: 'English' },
    { code: 'bn-IN', name: 'বাংলা / Bengali' },
    { code: 'te-IN', name: 'తెలుగు / Telugu' },
    { code: 'mr-IN', name: 'मराठी / Marathi' }
  ];

  const sampleTexts = {
    'hi-IN': 'मैं लाल रंग की साड़ी बेचता हूँ, कीमत है 2500 रुपए, सिल्क की बनी है',
    'ta-IN': 'நான் சிவப்பு நிற புடவை விற்கிறேன், விலை 2500 ரூபாய், பட்டு பொருள்',
    'en-IN': 'I am selling red color saree, price is 2500 rupees, made of silk material'
  };

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLanguage;
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('माइक्रोफ़ोन एक्सेस की अनुमति दें / Please allow microphone access');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const processWithAI = async () => {
    if (!transcript.trim()) {
      alert('पहले कुछ बोलें / Please speak something first');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const extractedDetails = extractProductDetails(transcript);
      updateCurrentProduct({
        ...extractedDetails,
        voiceTranscript: transcript
      });
      
      navigate('/preview/new');
    } catch (error) {
      console.error('Error processing with AI:', error);
      alert('प्रोसेसिंग में त्रुटि / Error in processing');
    } finally {
      setIsProcessing(false);
    }
  };

  const useSampleText = () => {
    const sampleText = sampleTexts[selectedLanguage as keyof typeof sampleTexts] || sampleTexts['en-IN'];
    setTranscript(sampleText);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            नया उत्पाद जोड़ें / Create New Listing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            अपने उत्पाद के बारे में बताएं - नाम, कीमत, रंग, साइज़, मात्रा
          </p>
        </div>

        {/* Language Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Languages className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900">भाषा चुनें / Select Language</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Recording Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="mb-8">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all transform hover:scale-105 ${
                  isRecording
                    ? 'bg-red-500 voice-recording shadow-2xl'
                    : 'bg-gradient-to-r from-orange-500 to-green-500 shadow-lg hover:shadow-xl'
                }`}
              >
                {isRecording ? <MicOff size={48} /> : <Mic size={48} />}
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-white opacity-30 animate-ping"></div>
                )}
              </button>
            </div>

            {isRecording && <VoiceWaveform />}

            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-900">
                {isRecording ? 'सुन रहे हैं... / Listening...' : 'माइक दबाकर बोलना शुरू करें'}
              </p>
              
              {audioBlob && !isRecording && (
                <button
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isPlaying ? <Square size={18} /> : <Play size={18} />}
                  <span>{isPlaying ? 'Playing...' : 'Play Recording'}</span>
                </button>
              )}

              <button
                onClick={useSampleText}
                className="mx-auto block px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-all"
              >
                नमूना टेक्स्ट उपयोग करें / Use Sample Text
              </button>
            </div>
          </div>
        </div>

        {/* Transcript Section */}
        {transcript && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              आपने कहा / What You Said:
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-800 leading-relaxed">{transcript}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setTranscript('')}
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                साफ़ करें / Clear
              </button>
              <button
                onClick={processWithAI}
                disabled={isProcessing}
                className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-green-600 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>प्रोसेसिंग... / Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>AI से विवरण निकालें / Extract with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            सुझाव / Tips:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• उत्पाद का नाम स्पष्ट रूप से बताएं</li>
            <li>• कीमत रुपयों में बताएं</li>
            <li>• रंग, साइज़, मात्रा का ज़िक्र करें</li>
            <li>• सामग्री या ब्रांड का नाम दें</li>
            <li>• Speak product name clearly</li>
            <li>• Mention price in rupees</li>
            <li>• Include color, size, quantity</li>
            <li>• Add material or brand details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}