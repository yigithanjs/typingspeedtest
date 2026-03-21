

export default function InfoPanel({ selectedDifficulty, setSelectedDifficulty, isFirstButtonOpen, handleFirstButtonClick , selectedMode, setSelectedMode, isSecondButtonOpen, handleSecondButtonClick }) {
    return(
        <>
            <section id='settings'>
                  <div className='articlesParent'>
                    <button onClick={handleFirstButtonClick}>
                      <span>{selectedDifficulty ? selectedDifficulty : 'Difficulty'}</span> <span><img src="/assets/images/icon-down-arrow.svg" alt="downarrow" /></span>
                    </button>
        
              {isFirstButtonOpen && (
                    <article>
                      <label>
                        <button className={`btn-l ${selectedDifficulty === 'easy' ? 'selected' : ''}`} onClick={() => setSelectedDifficulty('easy')}></button> Easy
                      </label>
                      <label>
                          <button className={`btn-l ${selectedDifficulty === 'medium' ? 'selected' : ''}`} id='med' onClick={() => setSelectedDifficulty('medium')}></button> Medium
                      </label>
                      <label>
                          <button className={`btn-l ${selectedDifficulty === 'hard' ? 'selected' : ''}`} onClick={() => setSelectedDifficulty('hard')}></button> Hard
                      </label>
                    </article> )}
                  </div>
        
                  <div className='articlesParent'>
                    <button onClick={handleSecondButtonClick}>
                      <span>Timed (60s)</span> <span><img src="/assets/images/icon-down-arrow.svg" alt="downarrow" /></span>
                    </button>
        
              {isSecondButtonOpen && (
                    <article>
                      <label>
                        <button className={`btn-l ${selectedMode === 'timed' ? 'selected' : ''}`} onClick={() => setSelectedMode('timed')}></button> Timed (60s)
                      </label>
                      <label id='ll'>
                          <button className={`btn-l ${selectedMode === 'passage' ? 'selected' : ''}`} onClick={() => setSelectedMode('passage')}></button> Passage
                      </label>
                    </article>
              )}
                  </div>
                  
                  
                </section>
        
                <section id='settings-desktop'>
                <div>
                  <h3>Difficulty:</h3>
                  <button className={`btn-d ${selectedDifficulty === 'easy' ? 'selected2' : ''}`} onClick={() => setSelectedDifficulty('easy')}>Easy</button>
                  <button className={`btn-d ${selectedDifficulty === 'medium' ? 'selected2' : ''}`} onClick={() => setSelectedDifficulty('medium')}>Medium</button>
                  <button className={`btn-d ${selectedDifficulty === 'hard' ? 'selected2' : ''}`} onClick={() => setSelectedDifficulty('hard')}>Hard</button>
                </div>
                <div>
                  <h3>Mode:</h3>
                  <button className={`btn-d ${selectedMode === 'timed' ? 'selected2' : ''}`} onClick={() => setSelectedMode('timed')}>Timed (60s)</button>
                  <button className={`btn-d ${selectedMode === 'passage' ? 'selected2' : ''}`} onClick={() => setSelectedMode('passage')}>Passage</button>
                </div>
              </section>
              </>
    )
}