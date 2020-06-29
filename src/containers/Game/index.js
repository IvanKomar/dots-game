import React from "react"
import './style.css'
import {connect} from "react-redux"
import {
  getGameMode,
  setUserMode,
  setUserName,
  setUserModeError,
  setUserNameError,
  startUserGame,
  changeElementStatus,
  endUserGame,
  getWinners,
  setWinners
} from "../../actions"
import {GameMode, GameArea, GameWinnersList} from "../../components"


class Game extends React.Component {
    
  componentDidMount() {
    this.props.getGameMode()
    this.props.getWinners()
  }

    handleChangeName = (event) => {
      const {value} = event.target
      this.props.setUserName(value)
    };
  
    handleChangeMode = (event) => {
      const {value} = event.target
      this.props.setUserMode(value)

    };
    
    handleClick = (id, status) => {
      if (status === 1) {
        this.props.changeElementStatus(id, 2)
      }

    };

    handleSubmit = (event) => {
      event.preventDefault()
      const {userName, userMode} = this.props
      if (userName.trim() === '') {
        this.props.setUserNameError("Enter user name")
        return false
      } else if (userMode === '') {
        this.props.setUserModeError("Choose user mode")
        return false
      } else {
        this.props.startUserGame()
        this.interval()
      }
    };


    sendUserWinners = (user) => {
      this.props.endUserGame(user)
      this.props.setWinners(this.sendData())
    };

    sendData = () => {
      const {gameWinner} = this.props
      const date = new Date()
      const month = date.toLocaleString('default', {month: 'long'})
      const dateToSend = `${date.toTimeString().slice(0, 5)} ${date.getDate()} ${month}  ${date.getFullYear()}`


      return {
        winner: gameWinner,
        date: dateToSend
      }
    };


    interval = () => {
      const interval = setInterval(() => {
        const {arrayGameField} = this.props
        const inactiveCell = arrayGameField.filter((item) => item.status === 0)
        const activeCell = arrayGameField.filter((item) => item.status === 1)
        const userCell = arrayGameField.filter((item) => item.status === 2)
        const compCell = arrayGameField.filter((item) => item.status === 3)

        if (userCell.length > arrayGameField.length / 2) {
          clearInterval(interval)
          this.sendUserWinners(this.props.userName)
          return false

        }
        if (compCell.length > arrayGameField.length / 2) {
          clearInterval(interval)
          this.sendUserWinners("Computer")
          return false

        }

        if (activeCell.length) {
          const activeCellIdx = activeCell.findIndex(element => element.status === 1)
          const activeCellId = activeCell[activeCellIdx].id
          const idx = arrayGameField.findIndex(element => element.id === activeCellId)
          const id = arrayGameField[idx].id
          this.props.changeElementStatus(id, 3)
        } else if (inactiveCell.length) {
          const ridx = Math.floor((Math.random() * inactiveCell.length))
          const inActiveCellId = inactiveCell[ridx].id

          const idx = arrayGameField.findIndex(element => element.id === inActiveCellId)
          const id = arrayGameField[idx].id
          this.props.changeElementStatus(id, 1)
        } else {
          clearInterval(interval)
        }

      }, this.props.delay)
    };


    render() {
      const {
        loading, gameMode, userMode, userName, userNameError, userModeError,
        arrayGameField, getWinners, startGame, winners, gameWinner, endGame
      } = this.props
      return (
        <div className="container">
          <h1>Game In Dots</h1>
          <div className="wrapper-area">
            <div>

              <GameMode gameMode={gameMode}
                userName={userName}
                userMode={userMode}
                userNameError={userNameError}
                userModeError={userModeError}
                handleSubmit={this.handleSubmit}
                startGame={startGame}
                endGame={endGame}
                handleChangeName={this.handleChangeName}
                handleChangeMode={this.handleChangeMode}
              />

              <GameArea arrayGameField={arrayGameField}
                handleClick={this.handleClick}
                userMode={userMode}
                gameWinner={gameWinner}/>
            </div>


            <GameWinnersList getWinners={getWinners}
              winners={winners} loading={loading}/>
          </div>
        </div>
      )
    }
}

function mapStateToProps(state) {
  const {
    loading, gameSetting, gameMode, userSetting, userName, userMode, userModeError, userNameError,
    arrayGameField, startGame, winners, gameWinner, endGame, delay
  } = state

  return {
    loading,
    gameSetting,
    delay,
    gameMode,
    userSetting,
    userName,
    userMode,
    userNameError,
    userModeError,
    arrayGameField,
    startGame,
    winners,
    gameWinner,
    endGame

  }
}

const mapDispatchToProps = {
  getGameMode,
  getWinners,
  setUserName,
  setUserMode,
  setUserModeError,
  setUserNameError,
  startUserGame,
  changeElementStatus,
  endUserGame,
  setWinners

}
export default connect(mapStateToProps, mapDispatchToProps)(Game)