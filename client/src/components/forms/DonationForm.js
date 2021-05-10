import React, { useState } from 'react'

const DonationForm = () => {

  const [currentTotal, setCurrentTotal] = useState(2586)
  const [randomNumber, setRandomNumber] = useState(0)

  const handleDonation = (event) => {
    setCurrentTotal(currentTotal + parseInt(event.target.value))
  }

  const handleRandomDonation = () => {
    const randomDonation = Math.floor(Math.random() * 250) + 1
    setRandomNumber(randomDonation)
  }

  const handleYes = () => {
    setCurrentTotal(currentTotal + parseInt(randomNumber))
    setRandomNumber(0)
  }

  const handleNo = () => {
    setCurrentTotal(currentTotal)
    setRandomNumber(0)
  }

  return (
    <>
      <a id="donations"></a>
      <div className="donation-grid">
        <h4>Please donate to help us support the Global Alliance of National Parks</h4>
        <div className="donation-buttons-group">
          <button onClick={handleDonation} className="ui basic button donation-button" value="10">£10</button>
          <button onClick={handleDonation} className="ui basic button donation-button" value="20">£20</button>
          <button onClick={handleRandomDonation} className="ui basic button donation-button" value="random">Generate a random amount! (You can amend if it is not quite right)</button>
        </div>
        <p>Your random donation today is: £{randomNumber}</p><p>Happy to proceed?</p>
        <div className="donation-confirmation-buttons">
          <button onClick={handleYes} className="ui basic tiny button donation-confirm">Yes</button>
          <button onClick={handleNo} className="ui basic tiny button donation-cancel">No</button>
        </div>
        <h3>£<span className="current-total">{currentTotal}</span> ...and counting. Thank you!</h3>


      </div>
    </>
  )
}

export default DonationForm