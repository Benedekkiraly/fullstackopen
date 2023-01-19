import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, bad, neutral}) => {

  const all = (good + bad + neutral);
  console.log(all)
  const positive = good/all +"%";
  const average = (good * 1 + bad * -1)/all;

  return {all,positive,average}

}

const History = ({good, bad, neutral})  => {
  const statistics = Statistics({good, bad, neutral});
  console.log(statistics.all)
  console.log(good,bad,neutral)
  if(good === 0 && bad === 0 && neutral === 0)
    {return (<h1>No Feedbacks has been given yet!</h1>)}
  else { return(
  <table>
  <tbody>
  <tr>
    <td>Number of good reviews:</td>
    <td>{String(good)}</td>
  </tr>
  <tr>
    <td>Number of neutral reviews:</td>
    <td>{String(neutral)}</td>
  </tr>
  <tr>
    <td>Number of bad reviews:</td>
    <td>{String(bad)}</td>
  </tr>
  <tr>
    <td>All</td>
    <td>{String(statistics.all)}</td>
  </tr>
  <tr>
    <td>Positive</td>
    <td>{String(statistics.positive)}</td>
  </tr>
  <tr>
    <td>Average</td>
    <td>{String(statistics.average)}</td>
  </tr>
  </tbody>
</table>)
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {setGood(good+1)}  
  const handleNeutralFeedback = () => {setNeutral(neutral+1)}
  const handleBadFeedback = () => {setBad(bad+1)}
  const removeHistory = () => {
    setBad(0)
    setGood(0)
    setNeutral(0)}
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodFeedback} text='Good'></Button>
      <Button handleClick={handleBadFeedback} text='Bad'></Button>
      <Button handleClick={handleNeutralFeedback} text='Neutral'></Button>
      <Button handleClick={removeHistory} text = 'Clear history'></Button>
      <h1>Statistics</h1>
      <History good ={good} bad = {bad} neutral = {neutral}/>
    </div>
  )
  }
export default App