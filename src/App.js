import axios from "axios"
import React from "react"

const baseUrl = "https://passgen-server.herokuapp.com/"

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            amount: 8, 
            ll: true,
            sl: true,
            num: true,
            sym: true, 
            pswd: ""
        }
    }

    render() {
        return (<div>
            <div id="form">
            <label htmlFor="amount">Amount of numbers:</label>
            <input type="number" id="amount" name="amount" min="1" max="10000" defaultValue="8" onChange={(e) => this.setState({ amount: e.target.value })} />
            <div id="checkboxes">
                <div>
                    <label htmlFor="LargeLetters">Large letters:</label>
                    <input type="checkbox" id="largeLetters" name="LargeLetters" value="LargeLetters" onChange={(e) => this.setState({ ll: e.target.checked })} defaultChecked />

                </div>

                <div>
                    <label htmlFor="SmallLetters">Small letters:</label>
                    <input type="checkbox" id="SmallLetters" name="SmallLetters" value="SmallLetters" onChange={(e) => this.setState({ sl: e.target.checked })} defaultChecked />
                </div>

                <div>
                    <label htmlFor="Numbers">Numbers:</label>
                    <input type="checkbox" id="numbers" name="Numbers" value="Numbers" onChange={(e) => this.setState({ num: e.target.checked })} defaultChecked />
                </div>

                <div>
                    <label htmlFor="Symbols">Another symbols:</label>
                    <input type="checkbox" id="symbols" name="Symbols" value="Symbols" onChange={(e) => this.setState({ sym: e.target.checked })} defaultChecked />
                </div>
            </div>

            <div>
                <input id="result" type="text" placeholder="There will be your password" value={this.state.pswd} readOnly />
                <br />
                <div id="addBtn">
                    <button type="button" className="additionalButtons" id="copyResult" onClick={this.copyRC}>Copy password</button>
                    <button type="button" className="additionalButtons" id="clearResult" onClick={this.clearRC}>Clear result</button>
                </div>
            </div>
                <br />
                <button id="gen_btn" onClick={() => this.genBtn(this.state.amount, this.state.ll, this.state.sl, this.state.num, this.state.sym)} type="submit">Generate!</button>
            </div>
        </div>)
    }

    genBtn(amount, ll, sl, num, sym) {
        if (ll == false && sl == false && num == false && sym == false) {
            alert('You must choose at least one set of symbols')
            return
        }

        if (amount > 10000 || amount < 1) {
            alert('You must enter number from 1 to 10000')
            return
        }

        const data = {"amount": amount, "ll": ll, "sl": sl, "num": num, "sym": sym}      

        axios.post(baseUrl, data)
        .then(((response) => {
            this.setState({pswd: response.data})
        }))
        .catch(function (error) {
            console.log(error)
        })
    }

    copyRC() {
        const res = document.getElementById('result')
    
        if (res.getAttribute('value') === '') {
            alert('Field is empty! First generate password')
        }
    
        else {
            navigator.clipboard.writeText(res.getAttribute('value'))
        }
    }
    
    clearRC = () => {
        this.setState({pswd: ''})
    }
}

export default App