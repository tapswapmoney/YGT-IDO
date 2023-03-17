import React, { useState } from 'react'
import './App.css'
import Web3 from 'web3'

const qoutationModes = {
  bnb: 'bnb',
  ygt: 'ygt',
}

function App() {
  const [qoutationMode, setQoutationMode] = useState(qoutationModes.bnb)
  const [bnb, setBnb] = useState('')
  const [ygt, setYgt] = useState('')

  const [accountAddress, setAccountAddress] = useState('')

  const connect = async () => {
    /**
     * @dev connect to metamask
     */

    const web3 = new Web3(Web3.givenProvider)

    const account: string[] = await web3.eth.getAccounts()

    setAccountAddress(account[0])
  }

  const deposite = async () => {
    const web3 = new Web3(Web3.givenProvider)
    const token = new web3.eth.Contract(
      JSON.parse(
        '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Purchase","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"WithdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"availableToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposite","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract TapSwap","name":"_token","type":"address"},{"internalType":"uint256","name":"_availabletoken","type":"uint256"}],"name":"initialise","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startEnd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract TapSwap","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]',
      ),
      '0xcb34e1c9d84716462f3bf293167a973807986a0b',
    )

    const account = await web3.eth.getAccounts()

    const depositeValue =
      qoutationMode === qoutationModes.bnb ? bnb : getBNBForYgt()
    await token.methods.deposite().send({
      from: account[0],
      value: web3.utils.toWei(`${depositeValue}`, 'ether'),
    })
  }

  const getYgtTokens = () => {
    if (bnb.length > 0 && bnb.match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/)) {
      const web3 = new Web3(Web3.givenProvider)
      const depositValue: any = web3.utils.toWei(bnb, 'ether')

      return (depositValue / 2100000000000000).toFixed(2)
    }
    return '0'
  }

  const getBNBForYgt = () => {
    if (ygt.length > 0 && ygt.match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/)) {
      const ygtValue: any = ygt

      return ygtValue * 0.0021
    }
    return '0'
  }

  const qoutationBNB = (
    <>
      BNB
      <br />
      <input
        type="text"
        value={bnb}
        onChange={({ target: { value } }) => setBnb(value)}
      />
      <button onClick={deposite}>Deposite</button>
      <span>YGT Tokens: {getYgtTokens()}</span>
    </>
  )

  const qoutationYGT = (
    <>
      YGT
      <br />
      <input
        type="text"
        value={ygt}
        onChange={({ target: { value } }) => setYgt(value)}
      />
      <button onClick={deposite}>Deposite</button>
      <span>BNB: {getBNBForYgt()}</span>
    </>
  )

  const toggleQoutationModes = () => {
    if (qoutationMode === qoutationModes.bnb) {
      setQoutationMode(qoutationModes.ygt)
    } else {
      setQoutationMode(qoutationModes.bnb)
    }
  }
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={toggleQoutationModes}>Toggle Qoutation Modes</button>
      <br />
      {accountAddress.length === 0 && (
        <button onClick={connect}>Connect</button>
      )}
      <br />
      {qoutationMode === qoutationModes.bnb ? qoutationBNB : qoutationYGT}
    </div>
  )
}

export default App
