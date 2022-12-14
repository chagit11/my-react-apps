import React from 'react';
import styled from 'styled-components';
import { ContainerStyled } from '../../--styled/ContainerStyled'


const Timer_ = styled.div`
    border: 5px solid #de8901;
    @media screen and ( max-width:  1440px ) {
        margin-top: 100px;
    }
    @media screen and ( max-width:  768px ) {
        .display {
            grid-template-columns: repeat(3, 120px) !important;
            gap: 15px !important;
        }
        .value {
            font-weight: 800 !important;
            font-size: 24px !important;
        }
    }
    @media screen and ( max-width:  425px ) {
        .display {
            grid-template-columns: repeat(3, 90px) !important;
            gap: 10px !important;
        }
        .value {
            font-weight: 800 !important;
            font-size: 22px !important;
        }
    }
    .display {
        padding: 30px;
        background-color: #000;
        justify-content: center;
        /* align-content: center; */
        display: grid;
        grid-template-columns: repeat(3, 150px);
        gap: 30px;
        .items {
            padding: 5px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            .up-arrow, .down-arrow {
                width: 0;
                height: 0;
                border-left: 50px solid transparent;
                border-right: 50px solid transparent;
                opacity: 0.5;
                cursor: pointer;
                &:hover {
                    opacity: 0.9;
                }
            }
            .up-arrow {
                margin-bottom: 15px;
                border-bottom: 25px solid #000;
            }
            .down-arrow {
                margin-top: 15px;
                border-top: 25px solid #000;
            }
            .value {
                font-weight: 900;
                font-size: 30px;
                text-align: center;
                color: #a3a3a3;
            }

        }
    }
    //
    .buttons {
        padding: 30px;
        background-color: #000;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: max-content;
        gap: 30px;
        justify-content: center;
        .btn {
            padding: 5px 15px;
            background-color: #fff;
            font-size: 22px;
            cursor: pointer;
            &:hover {
                transform: translateY(-3px);
            }
            &.start {
                color: green;
            }
            &.pause {
                color: blue;
            }
            &.stop {
                color: red;
            }
        }
    }
`


    
export const Timer = ({...props}) => {
    const [hours, setHours] = React.useState(0)
    const [minutes, setMinutes] = React.useState(0)
    const [seconds, setSeconds] = React.useState(0)
    // 
    const dispRef = React.useRef(null)
    const idIntervalRef = React.useRef()
    // const hoursRef = React.useRef(0)
    // const minutesRef = React.useRef(0)
    // const secondsRef = React.useRef(0)
    // const [targetDispRef, setTargetDispRef] = React.useState()
    // const [startTouch, setStartTouch] = React.useState(0)
    // const [endTouch, setEndTouch] = React.useState(0)
    // 
    // -- func-> wheel Display --
    const onwheelDisplay = (e, disp, setDisp, to) => {
        if(e.deltaY===100) {
            if(disp===to) setDisp(0)
            else setDisp(disp+1)
        } 
        if(e.deltaY===-100) {
            if(disp===0) setDisp(to)
            else setDisp(disp-1)
        }
    }
    // -- func-> click Display --
    const plusMinusDisplay = (direc, setDisp, to) => {
        if(direc==='+') {
            setDisp(disp => {
                if(disp===to) return 0
                else return disp+1
            })
        } 
        if(direc==='-') {
            setDisp(disp => {
                if(disp===0) return to
                else return disp-1
            })
        }
    }
    // -- up down mouse arrows --
    React.useEffect(() => {
        // -- arrows up down
        const uparrows = [
            dispRef.current.querySelector('.hours .up-arrow'),
            dispRef.current.querySelector('.minutes .up-arrow'),
            dispRef.current.querySelector('.seconds .up-arrow'),
            dispRef.current.querySelector('.hours .down-arrow'),
            dispRef.current.querySelector('.minutes .down-arrow'),
            dispRef.current.querySelector('.seconds .down-arrow'),
        ]
        // -- 
        const mouseUpDownArrows = (e) => {
            e.preventDefault()
            const changeDisps = () => {
                if(e.target.parentElement.classList.contains('hours')) {
                    if(e.target.classList.contains('up-arrow')) plusMinusDisplay('+', setHours, 23)
                    if(e.target.classList.contains('down-arrow')) plusMinusDisplay('-', setHours, 23)
                } 
                if(e.target.parentElement.classList.contains('minutes')) {
                    if(e.target.classList.contains('up-arrow')) plusMinusDisplay('+', setMinutes, 59)
                    if(e.target.classList.contains('down-arrow')) plusMinusDisplay('-', setMinutes, 59)
                } 
                if(e.target.parentElement.classList.contains('seconds')) {
                    if(e.target.classList.contains('up-arrow')) plusMinusDisplay('+', setSeconds, 59)
                    if(e.target.classList.contains('down-arrow')) plusMinusDisplay('-', setSeconds, 59)
                }
            }
            changeDisps()
            let ts = new Date().getTime()
            idIntervalRef.current = setInterval(()=> {
                if(new Date().getTime() - ts > 500) changeDisps()
            }, 100)
        }
        // --
        const stopInterv = () => {
            clearInterval(idIntervalRef.current)
        }
        // -- 
        uparrows.forEach(t => {
            t.addEventListener('mousedown', mouseUpDownArrows)
            t.addEventListener('touchstart', mouseUpDownArrows)
            t.addEventListener('mouseup', stopInterv)
            t.addEventListener('touchend', stopInterv)
        })
        // -- 
        return () => {
            uparrows.forEach(t => {
                t.removeEventListener('mousedown', mouseUpDownArrows)
                t.removeEventListener('touchstart', mouseUpDownArrows)
                t.removeEventListener('mouseup', stopInterv)
                t.removeEventListener('touchend', stopInterv)
            })
        }
    })
    // 
   /*  const ontouchDisplay = (ref) => {
        ref.current.addEventListener('touchstart', (e) => {
            e.preventDefault()
            setTargetDispRef(ref.current)
            setStartTouch(e.changedTouches[0].clientY.toFixed(0))
        })
        ref.current.addEventListener('touchmove', (e) => {
            e.preventDefault()
            setEndTouch(e.changedTouches[0].clientY.toFixed(0))
        })
    } */
    // 
   /*  const setvalueOntouchDiplay = (disp, setDisp, to) => {
        if(startTouch<endTouch) {
            if(disp>to-1) setDisp(0)
            else if(Math.abs(startTouch-endTouch)%8===0) setDisp(disp+1)
        }
        if(startTouch>endTouch) {
            if(disp===0) setDisp(to)
            else if(Math.abs(startTouch-endTouch)%8===0) setDisp(disp-1)
        }
    } */
    //
    /* React.useEffect(() => {
        ontouchDisplay(hoursRef)
        ontouchDisplay(minutesRef)
        ontouchDisplay(secondsRef)
    }, [])
    React.useEffect(() => {
        if(targetDispRef===hoursRef.current) setvalueOntouchDiplay(hours, setHours, 23)
        if(targetDispRef===minutesRef.current) setvalueOntouchDiplay(minutes, setMinutes, 59)
        if(targetDispRef===secondsRef.current) setvalueOntouchDiplay(seconds, setSeconds, 59)
    }, [endTouch]) */
    // 
    return (
        <Timer_ as={ContainerStyled} className='timer'>
            <div ref={dispRef} className='display'>
                <div onWheel={(e)=> onwheelDisplay(e, hours, setHours, 23)} className="items hours">
                    <div className='up-arrow'></div>
                    <div className='value'>{hours<10 ? `0${hours}` : hours} ??.</div>
                    <div className='down-arrow'></div>
                </div>
                <div onWheel={(e)=> onwheelDisplay(e, minutes, setMinutes, 59)} className="items minutes">
                    <div className='up-arrow'></div>
                    <div className='value'>{minutes<10 ? `0${minutes}` : minutes} ??.</div>
                    <div className='down-arrow'></div>
                </div>
                <div onWheel={(e)=> onwheelDisplay(e, seconds, setSeconds, 59)} className="items seconds">
                    <div className='up-arrow'></div>
                    <div className='value'>{seconds<10 ? `0${seconds}` : seconds} ??.</div>
                    <div className='down-arrow'></div>
                </div>
            </div>
            <div className="buttons">
                <div className="btn start">Start</div>
                <div className="btn pause">Pause</div>
                <div className="btn stop">Stop</div>
            </div>
        </Timer_>
    );
}
