// RC == Result Clicked
function copyRC() {
    const res = document.getElementById('result')

    if (res.getAttribute('value') === '') {
        alert('Field is empty! First generate password')
    }

    else {
        navigator.clipboard.writeText(res.getAttribute('value'))
        alert('Successfully copied!')
    }
}

function clearRC() {
    document.location.href = '/'
}

const elements = (<div><button type="button" class="additionalButtons" id="copyResult" onClick={copyRC}>Copy password</button><button type="button" class="additionalButtons" id="clearResult" onClick={clearRC}>Clear result</button></div>)
const addBtn = document.getElementById("addBtn")

ReactDOM.render(elements, addBtn)
