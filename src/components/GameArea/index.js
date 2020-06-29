import React from "react"
import './style.css'
import PropTypes from "prop-types"
import { GameWinnersList } from "../GameWinnersList"


export const GameArea = ({ arrayGameField, userMode, gameWinner, handleClick }) => {
  return (
    <div className="game-wrapper">
      <h4 className="game-winner">{gameWinner ? `${gameWinner} won!` : ''}</h4>
      <div className="game-area" style={{ maxWidth: `${50 * userMode}px` }}>
        {arrayGameField.map(element => {

          return (
            <div style={{
              background:
                element.status === 2
                  ? '#00E871'
                  : element.status === 1
                    ? '#42D8E8'
                    : element.status === 3
                      ? '#E85A5F'
                      : '#fff'
            }} className="game-area-item" key={element.id}
            onClick={() => handleClick(element.id, element.status)} />
          )
        })}
      </div>
    </div>
  )
}

GameWinnersList.propTypes = {
  arrayGameField: PropTypes.array,
  handleClick: PropTypes.func,
  gameWinner: PropTypes.string,
}

