import { useState } from "react";
import { Step0_Consent } from "./components/steps/step0";
import { Step1_UserInfo } from "./components/steps/step1";
import { Step2_MediaUsage } from "./components/steps/step2";
import { Step3_LikertGeneral } from "./components/steps/step3";
import { Step4_MusicPlayer } from "./components/steps/step4";
import { Step5_ThankYou } from "./components/steps/step5";

const songsToTest = [
  {
    id: 1,
    spotifyId: "4iZ4cOhNma2mf4d2s4uYI1",
    name: "Música Viral 1 (Ex: Envolver)",
  },
  {
    id: 2,
    spotifyId: "1Iq8oo9XkmmvCQiGOfORsE",
    name: "Música Viral 2 (Ex: Flowers)",
  },
  {
    id: 3,
    spotifyId: "0SiywuOBRc1dNUR8S1y0mH",
    name: "Música Viral 3 (Ex: As It Was)",
  },
];

export type FormData = {
  hasConsented: boolean;
  // Step 1
  age: string;
  location: string;
  institution: string;
  sex: string;
  // Step 2
  socialMedia: {
    tiktok: boolean;
    instagram: boolean;
    youtube: boolean;
  };
  screenTime: string;
  musicTime: string;
  // Step 3
  likert: {
    influence: number;
    friends: number;
    viral: number;
    listenedViral: number;
    recommended: number;
    multitask: number;
    discovery: number;
    exclusiveTime: number;
    timeDecreased: number;
    annoyedFast: number;
    recognizePart: number;
    playlistsImpacted: number;
  };
  // Step 4
  musicAnswers: {
    songId: number;
    spotifyId: string;
    heardBefore: string;
    knowArtist: string;
    knowAlbum: string;
    heardComplete: string;
    stoppedToListen: string;
    heard3Songs: string;
    encouragedToListenAlbum: string;
  }[];
};

const initialFormData: FormData = {
  hasConsented: false,
  age: "",
  location: "",
  institution: "",
  sex: "",
  socialMedia: { tiktok: false, instagram: false, youtube: false },
  screenTime: "",
  musicTime: "",
  likert: {
    influence: 0,
    friends: 0,
    viral: 0,
    listenedViral: 0,
    recommended: 0,
    multitask: 0,
    discovery: 0,
    exclusiveTime: 0,
    timeDecreased: 0,
    annoyedFast: 0,
    recognizePart: 0,
    playlistsImpacted: 0,
  },
  musicAnswers: [],
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateForm = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleMusicSubmit = (musicAnswer: FormData["musicAnswers"][0]) => {
    const newMusicAnswers = [...formData.musicAnswers, musicAnswer];
    updateForm({ musicAnswers: newMusicAnswers });

    if (currentSongIndex < songsToTest.length - 1) {
      setCurrentSongIndex((prev) => prev + 1);
    } else {
      nextStep();
    }
  };
  const submitData = async () => {
    console.log(
      "DADOS FINAIS DO FORMULÁRIO:",
      JSON.stringify(formData, null, 2)
    );
  };

  // Renderiza a etapa atual
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step0_Consent
            formData={formData}
            updateForm={updateForm}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <Step1_UserInfo
            formData={formData}
            updateForm={updateForm}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2_MediaUsage
            formData={formData}
            updateForm={updateForm}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3_LikertGeneral
            formData={formData}
            updateForm={updateForm}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4: {
        const song = songsToTest[currentSongIndex];
        return (
          <Step4_MusicPlayer
            key={song.id}
            song={song}
            onSubmit={handleMusicSubmit}
            prevStep={prevStep}
          />
        );
      }
      case 5:
        submitData();
        return <Step5_ThankYou formData={formData} />;
      default:
        return (
          <Step0_Consent
            formData={formData}
            updateForm={updateForm}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-800 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-10">
        {renderStep()}
      </div>
    </div>
  );
}

export default App;
