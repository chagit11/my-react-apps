import React from 'react';
import styled from 'styled-components';
import { ContainerStyled } from '../../--styled/ContainerStyled'


const Timer_ = styled.div`
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
    const hoursRef = React.useRef(0)
    const minutesRef = React.useRef(0)
    const secondsRef = React.useRef(0)
    const [targetDispRef, setTargetDispRef] = React.useState()
    const [startTouch, setStartTouch] = React.useState(0)
    const [endTouch, setEndTouch] = React.useState(0)
    // 
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
    // 
    const onclickDisplay = (direc, disp, setDisp, to) => {
        if(direc==='+') {
            if(disp===to) setDisp(0)
            else setDisp(disp+1)
        } 
        if(direc==='-') {
            if(disp===0) setDisp(to)
            else setDisp(disp-1)
        }
    }
    // 
    const ontouchDisplay = (ref) => {
        ref.current.addEventListener('touchstart', (e) => {
            e.preventDefault()
            setTargetDispRef(ref.current)
            setStartTouch(e.changedTouches[0].clientY.toFixed(0))
        })
        ref.current.addEventListener('touchmove', (e) => {
            e.preventDefault()
            setEndTouch(e.changedTouches[0].clientY.toFixed(0))
        })
    }
    // 
    const setvalueOntouchDiplay = (disp, setDisp, to) => {
        if(startTouch<endTouch) {
            if(disp>to-1) setDisp(0)
            else if(Math.abs(startTouch-endTouch)%8===0) setDisp(disp+1)
        }
        if(startTouch>endTouch) {
            if(disp===0) setDisp(to)
            else if(Math.abs(startTouch-endTouch)%8===0) setDisp(disp-1)
        }
    }
    //
    React.useEffect(() => {
        ontouchDisplay(hoursRef)
        ontouchDisplay(minutesRef)
        ontouchDisplay(secondsRef)
    }, [])
    React.useEffect(() => {
        if(targetDispRef===hoursRef.current) setvalueOntouchDiplay(hours, setHours, 23)
        if(targetDispRef===minutesRef.current) setvalueOntouchDiplay(minutes, setMinutes, 59)
        if(targetDispRef===secondsRef.current) setvalueOntouchDiplay(seconds, setSeconds, 59)
    }, [endTouch])
    // 
    return (
        <Timer_ as={ContainerStyled} className='timer'>
            <div className='display'>
                {/* <div className="items hours">
                    <input 
                        ref={hoursRef}  
                        onWheel={(e)=> onwheelDisplay(e, hours, setHours, 23)} 
                        onChange={(e)=>setHours(e.target.value)} 
                        value={hours<10 ? `0${hours}` : hours} 
                    />
                    <span>ч.</span>
                </div> */}
                {/* <div onWheel={(e)=> onwheelDisplay(e, minutes, setMinutes, 59)} ref={minutesRef} className="items minutes">
                    <input onChange={()=>setMinutes(minutes)} value={minutes<10 ? `0${minutes}` : minutes} />
                    <span>мин.</span>
                </div> */}
                {/* <div onWheel={(e)=> onwheelDisplay(e, seconds, setSeconds, 59)} ref={secondsRef} className="items seconds">
                    <input onChange={()=>setSeconds(seconds)} value={seconds<10 ? `0${seconds}` : seconds} />
                    <span>с.</span>
                </div> */}
                <div onWheel={(e)=> onwheelDisplay(e, hours, setHours, 23)} ref={hoursRef} className="items hours">
                    <div onClick={()=> onclickDisplay('+', hours, setHours, 23)} className='up-arrow'></div>
                    <div className='value'>{hours<10 ? `0${hours}` : hours} ч.</div>
                    <div onClick={()=> onclickDisplay('-', hours, setHours, 23)} className='down-arrow'></div>
                </div>
                <div onWheel={(e)=> onwheelDisplay(e, minutes, setMinutes, 59)} ref={minutesRef} className="items minutes">
                    <div onClick={()=> onclickDisplay('+', minutes, setMinutes, 59)} className='up-arrow'></div>
                    <div className='value'>{minutes<10 ? `0${minutes}` : minutes} мин.</div>
                    <div onClick={()=> onclickDisplay('-', minutes, setMinutes, 59)} className='down-arrow'></div>
                </div>
                <div onWheel={(e)=> onwheelDisplay(e, seconds, setSeconds, 59)} ref={secondsRef} className="items seconds">
                    <div onClick={()=> onclickDisplay('+', seconds, setSeconds, 59)} className='up-arrow'></div>
                    <div className='value'>{seconds<10 ? `0${seconds}` : seconds} с.</div>
                    <div onClick={()=> onclickDisplay('-', seconds, setSeconds, 59)} className='down-arrow'></div>
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
