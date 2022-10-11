import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, elapsedTime: 0, timerLimit: 25}

  onStartBtn = () => {
    const {isTimerRunning} = this.state
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))

    if (isTimerRunning === false) {
      this.timerId = setInterval(() => {
        this.setState(prevState => ({elapsedTime: prevState.elapsedTime + 1}))
      }, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  onPlusButtonCLick = () => {
    const {isTimerRunning} = this.state
    console.log(isTimerRunning)
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 1,
        elapsedTime: 0,
      }))
    }
  }

  onMinusButtonCLick = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
        elapsedTime: 0,
      }))
    }
  }

  onResetBtnClick = () => {
    this.setState({isTimerRunning: false, elapsedTime: 0, timerLimit: 25})
    clearInterval(this.timerId)
  }

  getTimeInMinSecFormat = () => {
    const {timerLimit, elapsedTime} = this.state
    const remainingTime = timerLimit * 60 - elapsedTime
    let min = Math.floor(remainingTime / 60)
    let sec = remainingTime % 60
    min = min <= 9 ? `0${min}` : min
    sec = sec <= 9 ? `0${sec}` : sec

    if (min === '00' && sec === '00') {
      clearInterval(this.timerId)
    }
    console.log(min, sec)
    return {min, sec}
  }

  render() {
    const {isTimerRunning, timerLimit} = this.state

    const {min = 0, sec = 0} = this.getTimeInMinSecFormat()

    const startStoptext = isTimerRunning ? 'Pause' : 'Start'

    const playPauseIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playPauseIconAlt = isTimerRunning ? 'pause icon' : 'play icon '
    const timerStatus = isTimerRunning ? 'running' : 'paused'

    return (
      <div className="container">
        <div className="contain-container">
          <h1 className="timer-heading">Digital timer</h1>
          <div className="sub-container">
            <div className="timer-elements-container">
              <div className="timer-display-container">
                <div>
                  <h1 className="timer-time-paragraph">
                    {min}:{sec}
                  </h1>
                  <p className="timer-time-status">{timerStatus}</p>
                </div>
              </div>
            </div>
            <div className="timer-setting-container">
              <div className="btn-container">
                <button
                  onClick={this.onStartBtn}
                  className="play-button"
                  type="button"
                >
                  <img
                    src={playPauseIcon}
                    alt={playPauseIconAlt}
                    className="play-icon"
                  />
                  {startStoptext}
                </button>
                <button
                  onClick={this.onResetBtnClick}
                  className="play-button"
                  type="button"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-icon"
                  />
                  Reset
                </button>
              </div>
              <p className="timer-limit-paragraph">Set Timer Limit</p>
              <div className="timer-plus-minus-container">
                <button
                  onClick={this.onMinusButtonCLick}
                  className="plus-button"
                  type="button"
                >
                  -
                </button>
                <p className="timer-value">{timerLimit}</p>
                <button
                  onClick={this.onPlusButtonCLick}
                  className="plus-button"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
