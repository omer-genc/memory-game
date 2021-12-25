import React from 'react'
import { useSelector } from 'react-redux'
import { scoreSelector } from '../../redux/cardSlice'
import './Score.css'

const Score = () => {
    const score = useSelector(scoreSelector)
    return (
        <div className='score'>
            <h2>SCORE: {score}</h2>
        </div>
    )
}

export default Score
