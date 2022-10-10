import createLift from "./components/lift"
import createFloor from "./components/floor"
import { createDownButton , createUpButton } from "./components/buttons"
import "./styles.css"


 class ListSimulator {

    liftCount : number
    floor : number
    
    constructor(liftCount = 4 , floor = 6) {

        this.liftCount = liftCount
        this.floor = floor
        this.getLiftandFloor()
        // this.appendLiftAndFloor()
    }

    // Get number of lift and floor from user
    getLiftandFloor(){
        let inuputWrapper = document.createElement('div');
        inuputWrapper.className = "input-wrapper"
        let input = document.createElement('input');
        input.type = "number"
        input.placeholder = "Enter number of lift"
        input.className = "lift-input"
        let input2 = document.createElement('input');
        input2.type = "number"
        input2.placeholder = "Enter number of floor"    
        inuputWrapper.appendChild(input);
        inuputWrapper.appendChild(input2);
        document.body.appendChild(inuputWrapper);
        let button = document.createElement('button');
        button.innerHTML = "Submit"
        button.className = "submit-button"
        inuputWrapper.appendChild(button);
        button.addEventListener('click',()=>{
            this.liftCount = input.valueAsNumber
            this.floor = input2.valueAsNumber
            this.appendLiftAndFloor()
            inuputWrapper.remove()
        }
        )

    }

  // generate html for floors and lift on the basis of the number of floors and lifts
  
   generateLift (){

    let liftWrapper = document.createElement('div');
    liftWrapper.className = "lift-wrapper"
    let lift = createLift();
    for(let i = 0; i < this.liftCount; i++){
    
        liftWrapper.appendChild(lift).setAttribute('floor',`${1}`)

    }

    return liftWrapper;

   }

     // Now we need to generate buttons for each floor

     generateButtons(floor : number ){
        let buttons = document.createElement('div');
        buttons.className = "buttons-wrapper"
        let upButton = createUpButton()
        let DownButton = createDownButton();

        buttons.appendChild(upButton);
        buttons.appendChild(DownButton);
        buttons.setAttribute('floor',`${floor}`)

        // add eventListenet to the buttons
        upButton.addEventListener('click',()=>{
          
            this.liftUp(floor)

        })
    
        DownButton.addEventListener('click',()=>{
            this.liftUp(floor)
        })

        return buttons
    }


    // We also need to append buttons to each floor and add floor number to each floor as well as ground floor class to the last floor.
    // Now we need to append the lift to the floor

    generateFloor (){
        let floorWrapper = document.createElement('div');
        floorWrapper.className = "floor-wrapper"
        for(let i = 0; i < this.floor; i++){
            let floor = createFloor();

            // append floor number to each floor
            floor.innerHTML = `${this.floor-i}` // Reverse counting of floor number

            // add floor attribute to each floor
            floor.setAttribute('floor',`${this.floor-i}`)
            floor.appendChild(this.generateButtons(this.floor-i));
            floorWrapper.appendChild(floor);


            if(i===this.floor-1){
                floor.classList.add('ground')
                // aplend lift to the last floor
                for(let i = 0; i < this.liftCount; i++){
                    floor.appendChild(this.generateLift());
                }
            }

        }

        return floorWrapper
    }

    // Once lift and floor are generated, we need to append them to the body

    appendLiftAndFloor(){
        document.body.appendChild(this.generateFloor());

    }




        liftUp(floor : number){
            const lift = document.querySelectorAll('.lift') as NodeListOf<HTMLElement>
            const floorElement = document.querySelector(`[floor="${floor}"]`) as HTMLElement

            // Find the nearest lift to the floor

            let nearestLift = lift[0]
            let nearestLiftFloor = Number(nearestLift.getAttribute('floor'))
            for(let i = 0; i < lift.length; i++){
                let liftFloor = Number(lift[i].getAttribute('floor'))
              
                if(Math.abs(liftFloor - floor)  < Math.abs(nearestLiftFloor - floor)){
                    nearestLift = lift[i]
                    nearestLiftFloor = liftFloor
                }

            }




            // Move the lift to the floor        
            lift.forEach((lift)=>{
               if(lift.getAttribute('floor') === floorElement.getAttribute('floor')){
                return
               }
                else{
                    // Move the nearest lift to the floor
                    if(lift === nearestLift){

                    // Move the lift to the floor with slow animation

                    lift.style.transition = "all 1s ease-in-out"



                    
                    // Add some animation to the lift 
                    // lift.classList.add('lift-animation')
                    lift.style.top = `${floorElement.offsetTop +20}px`
                    lift.setAttribute('floor',`${floorElement.getAttribute('floor')}`)

                   
                    }
                    else{
                        return
                    }

                }
            })



           

          

            


            
 



        


         



        }
 }

const simulateList = new ListSimulator();


