import React from "react"
import PropTypes from 'prop-types'
import './style.css'

export const GameMode = ({gameMode, userMode, userName, userModeError, userNameError, handleSubmit, startGame, endGame, handleChangeMode, handleChangeName}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-mode">
          <div className="form-mode__group">
            <select onChange={handleChangeMode} value={userMode} disabled={startGame ? "disabled" : ""}>
              <option value="">Pick game mode</option>
              {gameMode.map(item => {
                return (
                  <option value={item.field} key={item.id}>{item.mode}</option>
                )
              })}
            </select>
            {userModeError ? <span className="form-error">{userModeError}</span> : ''}
          </div>
          <div className="form-mode__group">
            <input type="text" placeholder="Enter your name" value={userName}
              disabled={startGame ? "disabled" : ""}
              onChange={handleChangeName}/>
            {userNameError ? <span className="form-error">{userNameError}</span> : ''}
          </div>
          <div className="form-mode__group">
            <button disabled={startGame ? "disabled" : ""}>{endGame ? "Play again" : "Play"}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

GameMode.propTypes = {
  gameMode: PropTypes.array,
  endGame: PropTypes.bool,
  startGame: PropTypes.bool,
  handleSubmit: PropTypes.func,
  userModeError: PropTypes.string,
  userNameError: PropTypes.string,
  handleChangeMode: PropTypes.func,
  handleChangeName: PropTypes.func,
}




