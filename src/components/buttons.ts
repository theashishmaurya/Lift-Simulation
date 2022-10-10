

const createUpButton = ()=>{

    const Upbutton = document.createElement('button')
    Upbutton.className = "up button"


    return Upbutton

}

const createDownButton = ()=>{
    const DownButton = document.createElement('button')
    DownButton.className="down button"


    return DownButton
}


export {createDownButton, createUpButton}