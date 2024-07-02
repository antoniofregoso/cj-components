import { AppElement } from "@buyerjourney/bj-core";
import { Remarkable } from "remarkable";

export class TextInfo extends AppElement {

    #default = {
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    
    handleEvent(event) {
              if (event.type === "click") {
                  let eventName;
                  if(this.state.buttons.eventName===undefined){
                    eventName = "user:click-image-text"
                  }else {
                    eventName = this.state.buttons.eventName
                  }
                  const clickFunnel = new CustomEvent(eventName,{
                  detail:{source:event.target.id},
                  bubbles: true,
                  composed: true
              });
              this.dispatchEvent(clickFunnel);
              }
          }
      
      
      
      
      

    render(){
        this.innerHTML =  /* html */`
        <div ${this.getClasses(["section","container"], this.state?.classList)}>    
        ${this.getTitles(this.state)}   
         ${this.state.description?.text[this.state.context.lang]!=undefined?`
         <p ${this.getClasses(['content'], this.state.description?.classList)} ${this.setAnimation(this.state.description?.animation)}> ${this.md.render(this.state.description?.text[this.state.context.lang])}</p>`:''}  
            ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}  
        </div>`;
        this.addEvents();
    }


}

customElements.define("text-info", TextInfo)