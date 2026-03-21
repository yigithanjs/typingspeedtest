export default function Results({timer, wpm, accuracy, passageTimer, selectedMode, passageWPM}) {
    return(
        <div id='results'>
            <div>
                <h4>WPM: </h4>
                <span id='wpm'>{selectedMode === "timed" ? wpm : passageWPM}</span>
            </div>
            <div>
                <h4>Accuracy: </h4>
                <span id='accuracy'>{accuracy}%</span>
            </div>
            <div>
                <h4>Time: </h4>
                <span id='time'>
                {selectedMode === 'timed'
                    ? `0:${timer < 10 ? `0${timer}` : timer === 61 ? '60' : timer}`
                    : `0:${passageTimer < 10 ? `0${passageTimer}` : passageTimer}`}
                </span>

            </div>
        </div>
    )
}