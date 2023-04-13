class CalcController {

    constructor(){
    
        this._audio = new Audio('click.mp3')
        this._audioOnOff = false
        this._lastOperator = ''
        this._lastNumber = ''
        
        this._operation = [] 
        this._displayCalcEl = document.querySelector("#display")
         this._dateEl = document.querySelector("#data")
         this._timeEl = document.querySelector("#hora") 
         this._currentDateEl = document.querySelector("#hora")
         this.initialize()
         this.initButtonEvents()
         this.initKeyboard()
         
         
         

    }

    initialize(){

        
       this.setDisplayDateTime()
       this.pasteFromClipboard()

       document.querySelectorAll('.btn-ac').forEach(btn=>{

           btn.addEventListener('dblclick', e=>{

             this.toggleAudio()

           })

       })


        setInterval(()=>{

            this.setDisplayDateTime()
            
        }, 1000)

        this._displayCalcEl.innerHTML = 0

    }

toggleAudio(){

   //this._audioOnOff = (this._audioOnOff) ? false : true (abaixo o metodo mais curto)

    this._audioOnOff = !this._audioOnOff

   
}

playAudio(){

    if(this._audioOnOff){

       this._audio.currentTime = 0
        this._audio.play()

    }
}



pasteFromClipboard(){

    document.addEventListener('paste', e=>{

        let text = e.clipboardData.getData('Text')

       this.displayCalc = parseFloat(text)
       
    

    })

}

copyToClipboard(){

   let  input = document.createElement('input')

   input.value = this.displayCalc

   document.body.appendChild(input)

   input.select()

   document.execCommand('Copy')

   input.remove()


}


initKeyboard(){

        document.addEventListener('keyup', e=> {

            this.playAudio()

         switch (e.key){

            case "Escape": 
                this.clearAll()
            break

            case "Backspace":
                this.cancelEntry()
            break

            case "+":
            case "-":
            case "*":
            case "/":
            case "%":
                this.addOperation(e.key)
            break

            case "Enter":
            case "=":
                this.calc()
            break

            case ".":
            case ',': 
                this.addDot()
            break

            

            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(e.key))
            break

            case 'c':

                if (e.ctrlKey) this.copyToClipboard()
                break

           
        }
       
        })
    
    }

    addEventListenerAll(element, events, fn){

            events.split(' ').forEach(event => {

                element.addEventListener(event, fn, false)

            })

        }

    clearAll(){
        this._operation = []
        this._lastNumber = ""
        this. _lastOperator = ""

        this.setLastNumberToDisplay()
        
        
    }
    
    cancelEntry(){
        this._operation.pop()

        this.setLastNumberToDisplay()
    }

    igual(){
        
        
    }

   getLastOperation(){
       
        return  this._operation[this._operation.length-1]
    }

    setLastOperation(value){

        this._operation[this._operation.length - 1] = value
    }
    
    isOperator(value){

        return (['+', '-', '*','%', '/'].indexOf(value) > -1)
       
    }

    pushOperation(value){

        this._operation.push(value)

        if (this._operation.length > 3) {

            this.calc()
            
        }
    }

    getResult(){

        try{
        
            return eval(this._operation.join(""))
        
        } catch(e){

            setTimeout(() => {

                this.setError()
                
            }, 1);
            
            
        } 


    }
    
    
    
    calc(){

        
        let last = ""
        
        this._lastOperator = this.getLastItem(true)

        if (this._operation.length < 3){

        let firstItem = this._operation[0]
        this._operation = [firstItem, this._lastOperator, this._lastNumber]
        
        
        }

        if (this._operation.length > 3) {

            last = this._operation.pop()
            this._lastNumber = this.getResult()

        } else if (this._operation.length == 3) {
            
             this._lastNumber = this.getLastItem(false)

        }

        
        
        let result = this.getResult()

        if (last == '%'){

            result /= 100

            this._operation =  [result]

            } else {

            this._operation =  [result]

            if (last) this._operation.push(last)
        }

        this.setLastNumberToDisplay()
    }
    
    
    getLastItem(isOperator = true){

        let lastItem

            for (let i = this._operation.length-1; i >= 0; i-- ){

                
                if (this.isOperator(this._operation[i]) == isOperator) {

                    lastItem = this._operation[i]
                    break
                }
                
            }

            if (!lastItem) {

                lastItem = (isOperator) ? this._lastOperator : this._lastNumber
            }

            return lastItem

        
    }
    
    
    console
    setLastNumberToDisplay(){

       let lastNumber = this.getLastItem(false)

        if (!lastNumber) lastNumber = 0

        this.displayCalc = lastNumber

    }
    
    
    addOperation(value){

    
       if (isNaN(this.getLastOperation())) {

           if (this.isOperator(value)) {

                this.setLastOperation(value)
                
        }  else {

                this.pushOperation(value)

                this.setLastNumberToDisplay()
        }


        } else {

            if(this.isOperator(value)){

                this.pushOperation(value)
            
            } else {
                
                let newValue = this.getLastOperation().toString() + value.toString()
            this.setLastOperation(newValue)

            this.setLastNumberToDisplay()

            }
           
            
            
        }
        
        

    }

addDot(){

        let lastOperation = this.getLastOperation()

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1 ) return
        
        if (this.isOperator(lastOperation) || !lastOperation){

            this.pushOperation('0.')
        
        } else {
            
            this.setLastOperation(lastOperation.toString() + ".")
        }

        this.setLastNumberToDisplay()
    }

setError(){
        this.displayCalc = "ERROR"
    }

    
    execBtn(value){

        this.playAudio()

        switch (value){

            case "ac": 
                this.clearAll()
            break

            case "ce":
                this.cancelEntry()
            break

            case "soma":
                this.addOperation('+')
            break

            case "subtracao":
                this.addOperation('-')
            break

            case "multiplicacao":
                this.addOperation('*')
            break

            case "divisao":
                this.addOperation('/')
            break

            case "porcento":
                this.addOperation('%')
            break

            case "igual":
                this.calc()
            break

            case "ponto":
                this.addDot()
            break

            

            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value))
            break

            default:
                this.setError()
            break

            
        
        }


    }  

    initButtonEvents(){

        let buttons = document.querySelectorAll('#buttons > g, #parts > g')

        buttons.forEach((btn, index) => {
            
             this.addEventListenerAll(btn, "click drag", arg=> {

                let textBtn = btn.className.baseVal.replace("btn-", "")
                
                this.execBtn(textBtn)

                //console.log(textBtn)


                })   
            
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", arg=>{

                btn.style.cursor = "pointer"
            })

        })

        }



    setDisplayDateTime(){
        
        this.dateEl = this.currentDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })
        this.timeEl = this.currentDate.toLocaleTimeString("pt-BR")
    }    


    get displayCalc(){
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(valor){
        
        if (valor.toString().length > 10){

            this.setError()
            return false
        }

        this._displayCalcEl.innerHTML = valor
    }

    get currentDate(){
        return this.currentDate
    }

    set currentDate(valor){
        return this.currentDate = valor
    }

    get timeEl(){
        return this._timeEl.innerHTML
    }

    set timeEl(valor){
        return this._timeEl.innerHTML = valor
    }

    get dateEl(){
        return this._dateEl.innerHTML
    }

    set dateEl(valor){
        return this._dateEl.innerHTML = valor

    }

    get currentDate(){
        return new Date()
    }

    set currentDateEl(valor){
        return this._currentDateEl.innerHTML = valor

    }

}