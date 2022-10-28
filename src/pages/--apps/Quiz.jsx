import { useState } from 'react';
import './_sass/Quiz.scss'
    
    

const questions = [
    {
      title: 'React - это ... ?',
      variants: ['библиотека', 'фреймворк', 'приложение'],
      correct: 0,
    },
    {
      title: 'Компонент - это ... ',
      variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
      correct: 1,
    },
    {
      title: 'Что такое JSX?',
      variants: [
        'Это простой HTML',
        'Это функция',
        'Это тот же HTML, но с возможностью выполнять JS-код',
      ],
      correct: 2,
    },
  ];
  
  function Result({correct, newgame}) {
    return (
      <div className="result">
        <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
        <h2>Вы отгадали {correct} ответа из 10</h2>
        <button onClick={newgame}>Попробовать снова</button>
      </div>
    );
  }
  
  function Game({step, question, onClickVariant}) {
    const percentage = Math.round((step/questions.length)*100)
    console.log(percentage)
    return (
      <>
        <div className="progress">
          <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
        </div>
        <h1>{question.title}</h1>
        <ul>
          {
            question.variants.map((text, index) => (
                <li key={text} onClick={()=>onClickVariant(index)}>{text}</li>
            ))
          }
        </ul>
      </>
    );
  }
  



export const Quiz = ({...props}) => {
    const [step, setStep] = useState(0)
    const [correct, setCorrect] = useState(0)
    const question = questions[step]
    const onClickVariant = (index) => {
        setStep(step+1)
        if(index===question.correct) setCorrect(correct+1)
    }
    const newgame = () => {
        setStep(0)
        setCorrect(0)
    }
    return (
        <>
            <div className='quiz' {...props}>
                <div className='quiz-wrapper' {...props}>
                    {
                        step !== questions.length 
                            ? (<Game step={step} question={question} onClickVariant={onClickVariant} />)
                            : (<Result correct={correct} newgame={newgame} />)
                    }
                </div>
            </div>
        </>
    );
}
