import React from "react"
import { Spinner } from "../Spinner"
import './style.css'
import PropTypes from 'prop-types'

export const GameWinnersList = ({winners, loading}) => {

  return (
    <div className="winner-wrapper">
      <h2 className="winners-title">Leader Board</h2>
      {loading ? <Spinner/> :
        winners.map((item) => {
          return (
            <div key={item.id} className="winners">
              <div className="winners-item">{item.winner}</div>
              <div className="winners-item">{item.date}</div>
            </div>
          )
        })
      }
    </div>
  )
}

GameWinnersList.propTypes = {
  winners: PropTypes.array,
  loading: PropTypes.bool,
}



