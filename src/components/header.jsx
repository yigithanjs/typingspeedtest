export default function Header({selectedMode, pbTimed = 0, pbPassage = 0}) {
    
    return(
        <header>
        <div>
            <img src="/assets/images/logo-large.svg" alt="Typing speed test" id='desktop-logo'/>
            <img src="/assets/images/logo-small.svg" alt="Typing speed test" id='mobile-logo'/>
        </div>

        <div>
            <img src="/assets/images/icon-personal-best.svg" alt="pb" />
            <h4 id='pb'>Best: <span className='score-related'>
            {
                selectedMode === "timed" ? pbTimed : pbPassage
            }    
            </span> <span className='score-related'>WPM</span></h4>
        </div>
        </header>
    )

}