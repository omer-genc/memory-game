import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openCard, closeCard, openedSelector, matched } from '../../redux/cardSlice'
import './Card.css'

const Card = ({ item }) => {
    const opened = useSelector(openedSelector)
    const dispatch = useDispatch()
    const [styles, setStyles] = React.useState("")

    const imageUrl = `https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/${item.name}.png`

    useEffect(() => {
        console.log("rerender")
        if (opened.length === 2) {
            if (opened[0].name === opened[1].name) {
                dispatch(matched({ id: opened[0].id }))
                dispatch(matched({ id: opened[1].id }))
                return
            }
            setTimeout(() => {
                dispatch(closeCard({ id: opened[0].id }))
                dispatch(closeCard({ id: opened[1].id }))
            }, 1000)
        }


    }, [opened, dispatch])

    useEffect(() => {
        if (item.matched){
            setStyles("flip-card-opened flip-card-mached")
            return
        }    
        if (item.opened){
            setStyles("flip-card-opened")
            return
        }
        setStyles("")
    }, [item.opened, item.matched])


    const handleClick = () => {
        if (item.matched || item.opened || opened.length === 2)
            return
        dispatch(openCard({ id: item.id }))
    }


    return (
        <div className={`flip-card ${styles}`} onClick={handleClick}>

            <div className="flip-card-inner">
                <div className="flip-card-front">
                    {!item.matched && "?"}
                </div>
                <div className="flip-card-back">
                    <img src={imageUrl} alt={item.name} />
                    
                </div>
            </div>
        </div>
    )
}

export default Card
