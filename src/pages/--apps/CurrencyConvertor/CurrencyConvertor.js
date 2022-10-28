import React from 'react';
import { Block } from './Block';
import '../_sass/CurrencyConvertor.scss';

export const CurrencyConvertor = () => {
  // const [rates, setRates] = React.useState({})
  const ratesRef = React.useRef({})
  const [fromCurrency, setFromCurrency] = React.useState('RUB')
  const [toCurrency, setToCurrency] = React.useState('USD')
  const [fromPrice, setFromPrice] = React.useState(0)
  const [toPrice, setToPrice] = React.useState(1)
  // 
  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then(resp => resp.json())
      .then(json => {
        ratesRef.current = json.rates
        onChangeToPrice(1)
      })
      .catch(err => {
        alert('Ошибка при получении данных!')
        console.warn(err)
      })
      .finally(() => {
        console.log('finally...')
      })
  }, [])
  // 
  
  // 
  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setToPrice(result)
    setFromPrice(value)
  }
  // 
  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
    setFromPrice(result)
    setToPrice(value)
  }
  // 
  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency, fromPrice])
  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency, toPrice])
  // 
  return (
    <div className="currency-convertor">
      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice}
        />
      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={setToCurrency} 
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}



