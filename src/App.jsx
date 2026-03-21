import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/header'
import Results from './components/results'
import InfoPanel from './components/infoPanel'
import { useRef } from 'react'

function App() {
  const [timer, setTimer] = useState(61)
  const [isRunning, setIsRunning] = useState(false)

  const [isFirstButtonOpen, setIsFirstButtonOpen] = useState(false)
  const [isSecondButtonOpen, setIsSecondButtonOpen] = useState(false)

  const textareaRef = useRef(null);

  function handleFirstButtonClick() {
    setIsFirstButtonOpen((prev) => !prev)
  }

  function handleSecondButtonClick() {
    setIsSecondButtonOpen((prev) => !prev)
  }


  const [selectedDifficulty, setSelectedDifficulty] = useState("easy")
  const [selectedMode, setSelectedMode] = useState("timed")

 function startTimer() {
  setCompletedCorrectChars(0)
  setTotalTypedChars(0)
  setAccuracy(100)
  setWpm(0)
  setPassageWPM(0)
  setPassageTimer(0)
  setUserAt(0)
  if(selectedMode === 'passage') {
    setIsRunning(true)
  }else {
    setTimer(60)
  }

    setIsRunning(true)
    setUserInput('')
  }

  function restartTest(){
    textareaRef.current?.focus();
    startTimer()
  }

  {/* **************** */}
    const [passageTimer, setPassageTimer] = useState(0)
    
    useEffect(() => {
    if(selectedMode === "timed"){
      return
    }

    if (!isRunning) {
      return
    }

    const intervalP = setInterval(() => {
      setPassageTimer((currentTimer) => currentTimer + 1)
    }, 1000)

    

    return () => {
      clearInterval(intervalP)
    }
  }, [isRunning, selectedMode])

  {/* **************** */}

  useEffect(() => {
    if(selectedMode === "passage"){
      return
    }

    if (!isRunning || timer <= 0) {
      timer <= 0 && setIsRunning(false)
      return
    }

    const interval = setInterval(() => {
      setTimer((currentTimer) => currentTimer - 1)
    }, 1000)

    

    return () => {
      clearInterval(interval)
    }
  }, [isRunning, selectedMode]) 

  useEffect(() => {
      if (timer <= 0) {
          setIsRunning(false)
      }
    }, [timer])

    useEffect(() => {
      if(isRunning){
        textareaRef.current.focus();
      }
    }, [isRunning])

    useEffect(() => {
      let rawT = localStorage.getItem("pb-timed")
      if(rawT) setPbTimed(JSON.parse(rawT))

      let rawP = localStorage.getItem("pb-passage")
      if(rawP) setPbPassage(JSON.parse(rawP))
    }, [])


    const [pbTimed, setPbTimed] = useState(0)
    const [pbPassage, setPbPassage] = useState(0)
    const [currentSituation, setCurrentSituation] = useState("complete")
    

    useEffect(() => {
      if((wpm || passageWPM) && !isRunning){
        if(selectedMode === "timed" && wpm !== 0){
          let rawtimedBest = localStorage.getItem("pb-timed")
          if(!rawtimedBest){
            localStorage.setItem("pb-timed", JSON.stringify(0))
            rawtimedBest = localStorage.getItem("pb-timed")
          }
          let timedBest = rawtimedBest ? JSON.parse(rawtimedBest) : null

          if (timedBest === 0) {
            setCurrentSituation("baseline")
          } else if((timedBest || timedBest === 0) && timedBest < wpm){
            setCurrentSituation("pb")
          } else {
            setCurrentSituation("complete")
          }

          if((timedBest || timedBest === 0) && timedBest < wpm){
            localStorage.setItem("pb-timed", JSON.stringify(wpm))
            setPbTimed(wpm)
          }

        } else if(selectedMode === "passage" && passageWPM !== 0){
          let rawpassageBest = localStorage.getItem("pb-passage")
          if(!rawpassageBest){
            localStorage.setItem("pb-passage", JSON.stringify(0))
            rawpassageBest = localStorage.getItem("pb-passage")
          }
          let passageBest = rawpassageBest ? JSON.parse(rawpassageBest) : null

          if (passageBest === 0) {
            setCurrentSituation("baseline")
          } else if((passageBest || passageBest === 0) && passageBest < passageWPM){
            setCurrentSituation("pb")
          } else {
            setCurrentSituation("complete")
          }

          if((passageBest || passageBest === 0) && passageBest < passageWPM){
            localStorage.setItem("pb-passage", JSON.stringify(passageWPM))
            setPbPassage(passageWPM)
          }

        }
      }
    }, [isRunning])

  const [easyTexts, setEasyTexts] = useState([])
  const [mediumTexts, setMediumTexts] = useState([])
  const [hardTexts, setHardTexts] = useState([])

  const [easySplittedText, setEasySplittedText] = useState([])
  const [mediumSplittedText, setMediumSplittedText] = useState([])
  const [hardSplittedText, setHardSplittedText] = useState([])

  const [userInput, setUserInput] = useState('')
  const [targetInput, setTargetInput] = useState(() => userInput.split(''))

  const [userAt, setUserAt] = useState(0)

  function handleUserInput(e) {
    setUserInput(e.target.value)
    setTargetInput(e.target.value.split(''))
    console.log(targetInput)

  }

  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data.json')
      const data = await response.json()

      setEasyTexts(data.easy)
      setMediumTexts(data.medium)
      setHardTexts(data.hard)     
    }
     fetchData()
  }, [])

  const [completedCorrectChars, setCompletedCorrectChars] = useState(0)
  const [totalTypedChars, setTotalTypedChars] = useState(0)

  function getActiveSplitText() {
    if (selectedDifficulty === 'easy') {
      return easySplittedText
    }

    if (selectedDifficulty === 'medium') {
      return mediumSplittedText
    }

    return hardSplittedText
  }



  function getCurrentCorrectChars() {
    const activeSplitText = getActiveSplitText()
    let currentCorrectChars = 0

    for (let i = 0; i < userInput.length; i++) {
      if (activeSplitText[i] === userInput[i]) {
        currentCorrectChars++
      } 
    }

    return currentCorrectChars
  }

  const [passageWPM, setPassageWPM] = useState(0)

  function howManySame(){
    const currentCorrectChars = getCurrentCorrectChars()
    const correctChars = currentCorrectChars + completedCorrectChars
    const typedChars = userInput.length + totalTypedChars
    const elapsedSeconds = 60 - timer
    const passageT = passageTimer

    if(selectedMode === "timed"){
      if (elapsedSeconds === 0) {
        setWpm(0)
      } else {
        const elapsedMinutes = elapsedSeconds / 60
        const wpmm = (correctChars / 5) / elapsedMinutes
        setWpm(Math.round(wpmm))
      }
    } else {
      if (passageT === 0) {
        setPassageWPM(0)
      } else {
        const elapsedMinPassage = passageT / 60
        const wpmp = (correctChars / 5) / elapsedMinPassage
        setPassageWPM(Math.round(wpmp))
      }
    }

    if (typedChars === 0) {
      setAccuracy(100)
    } else {
      setAccuracy(Math.round((correctChars / typedChars) * 100))
    }
  }

  useEffect(() => {
    if (!easyTexts[userAt]) {
      return
    }

    if(selectedDifficulty === 'easy'){
      setEasySplittedText(easyTexts[userAt].text.split(''))
    } else if(selectedDifficulty === 'medium'){
      setMediumSplittedText(mediumTexts[userAt].text.split(''))
    } else if(selectedDifficulty === 'hard'){
      setHardSplittedText(hardTexts[userAt].text.split(''))
    }

    if(userInput.length > 0 && userInput.length === easySplittedText.length && userAt < easyTexts.length - 1 && selectedDifficulty === 'easy' && selectedMode === 'timed'){
      const currentCorrectChars = getCurrentCorrectChars()
      setUserInput('')
      setCompletedCorrectChars((prev) => prev + currentCorrectChars)
      setTotalTypedChars((prev) => prev + userInput.length)
      setUserAt((prev) => prev + 1)
    } else if(userInput.length > 0 && userInput.length === mediumSplittedText.length && userAt < mediumTexts.length - 1 && selectedDifficulty === 'medium' && selectedMode === 'timed'){
      const currentCorrectChars = getCurrentCorrectChars()
      setUserInput('')
      setCompletedCorrectChars((prev) => prev + currentCorrectChars)
      setTotalTypedChars((prev) => prev + userInput.length)
      setUserAt((prev) => prev + 1)
    } else if(userInput.length > 0 && userInput.length === hardSplittedText.length && userAt < hardTexts.length - 1 && selectedDifficulty === 'hard' && selectedMode === 'timed'){
      const currentCorrectChars = getCurrentCorrectChars()
      setUserInput('')
      setCompletedCorrectChars((prev) => prev + currentCorrectChars)
      setTotalTypedChars((prev) => prev + userInput.length)
      setUserAt((prev) => prev + 1)
    } else if(selectedMode === 'passage' && userInput.length > 0 && userInput.length === easySplittedText.length && selectedDifficulty === 'easy' || selectedMode === 'passage' && userInput.length > 0 && userInput.length === mediumSplittedText.length && selectedDifficulty === 'medium' || selectedMode === 'passage' && userInput.length > 0 && userInput.length === hardSplittedText.length && selectedDifficulty === 'hard'){
      setIsRunning(false)
    }
  }, [easyTexts, mediumTexts, hardTexts, userAt, selectedDifficulty, userInput])

  useEffect(() => {
    setIsRunning(false)
    setTimer(61)
    setPassageTimer(0)
    setUserInput('')
    setUserAt(0)
    setWpm(0)
    setPassageWPM(0)
    setAccuracy(100)
    setCompletedCorrectChars(0)
    setTotalTypedChars(0)
  }, [selectedDifficulty, selectedMode])
  

    useEffect(() => {
      if (isRunning && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [isRunning])

    useEffect(() => {
      howManySame()
    }, [userInput, timer, completedCorrectChars, totalTypedChars, passageTimer, selectedMode])

    function resultPageScenarios(){
      if(currentSituation === "pb"){
        return {
          title: "High Score Smashed!",
          description: "You're getting faster. That was incredible typing.",
          src: "assets/images/icon-new-pb.svg"
        }
      }
      
      if(currentSituation === "baseline"){
        return {
          title: "Baseline Established!",
          description: "You've set the bar. Now the real challenge begins. Time to beat it.",
          src: "assets/images/icon-completed.svg"
        }
      }

      return {
        title: "Test Complete!",
        description: "Solid run. Keep pushing to beat your high score.",
        src: "assets/images/icon-completed.svg"
      }
    }

    const resultScenario = resultPageScenarios()

  return (
    <>
    <Header selectedMode={selectedMode} pbTimed={pbTimed} pbPassage={pbPassage}/>

    {(wpm || passageWPM) && !isRunning ? (
      <section id='end'>
        <div className='endDiv head'>
          <span className='outerEffect'>
            <span className='outEffect'>
              <img src={resultScenario.src} alt="completed" />
            </span>
          </span>
          <h3>
            {resultScenario.title}
          </h3>
          <p>{resultScenario.description}</p>
        </div>
        <div className='endDiv foot'>
          <div>
            <h4>WPM</h4>
            <span>{selectedMode === "timed" ? wpm : passageWPM}</span>
          </div>
          <div>
            <h4>Accuracy</h4>
            <span>{accuracy}%</span>
          </div>
          <div>
            <h4>Characters</h4>
            <span>
              <span className='comcor'>{completedCorrectChars + getCurrentCorrectChars()}</span>
              <span className='slash'>/</span>
              <span className='comwro'>{totalTypedChars + userInput.length - (completedCorrectChars + getCurrentCorrectChars())}</span>
            </span>
          </div>
        </div>
        <button className='resend' onClick={startTimer}>Beat This Score <img src="assets\images\icon-restart.svg" alt="restart"/></button>
      </section>
    ) : (
      <>
    <section id="info-panel">
          <Results timer={timer} wpm={wpm} accuracy={accuracy} passageTimer={passageTimer} selectedMode={selectedMode} passageWPM={passageWPM}/>
          <InfoPanel 
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            isFirstButtonOpen={isFirstButtonOpen}
            handleFirstButtonClick={handleFirstButtonClick}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            isSecondButtonOpen={isSecondButtonOpen}
            handleSecondButtonClick={handleSecondButtonClick}
          />
    </section>

    <section id='container-bb'>
      <div>
        {/* Top div is for the blurry page */}
       {!isRunning ? (
         <div className='blurryDiv'>
           <button onClick={startTimer}>Start Typing Test</button>
           <p>Or click the text and start typing</p>
         </div>
       ) : null}

        {/* Bottom div is for the input field and the text features */}
        <div className='txtDiv'>

          {/* userInput.length === easySplittedText.length && userAt < easyTexts.length - 1 ? userAt++ : null */}
         
        {selectedDifficulty === 'easy' && easySplittedText.map((char, index) => (
          <span key={index} className={
            userInput[index] === char
              ? 'correct'
              : char === ' ' && index < userInput.length
                ? 'wrong-space'
                : index < userInput.length
                  ? 'wrong'
                  : index === userInput.length ? 'current' : ''
          }>
            {char}
          </span>
        ))}

        {selectedDifficulty === 'medium' && mediumSplittedText.map((char, index) => (
          <span key={index} className={
            userInput[index] === char
              ? 'correct'
              : char === ' ' && index < userInput.length
                ? 'wrong-space'
                : index < userInput.length
                  ? 'wrong'
                  : index === userInput.length ? 'current' : ''
          }>
            {char}
          </span>
        ))}

        {selectedDifficulty === 'hard' && hardSplittedText.map((char, index) => (
          <span key={index} className={
            userInput[index] === char
              ? 'correct'
              : char === ' ' && index < userInput.length
                ? 'wrong-space'
                : index < userInput.length
                  ? 'wrong'
                  : index === userInput.length ? 'current' : ''
          }>
            {char}
          </span>
        ))}

        <textarea className='inp' ref={textareaRef} disabled={!isRunning} spellCheck={false} autoCorrect='off' autoCapitalize='off' autoComplete='off' value={userInput} onChange={handleUserInput}/>
       
       
        </div>
      </div>

    </section>
    <div className='res'>
    {isRunning && (
        <button id='restartBtn' onClick={restartTest}>
          Restart test <img src="assets\images\icon-restart.svg" alt="restart" />
        </button>
    )}
    </div>
    </>
    )}
    </>
  )
}

export default App
