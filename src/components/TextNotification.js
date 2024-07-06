import { AppElement } from "@buyerjourney/bj-core";
import { Remarkable } from "remarkable";


export class TextNotification extends AppElement {

    constructor(props={}){
        super();
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    static get observedAttributes() {
        return [];
      }
      
    attributeChangedCallback(name, old, now) {
        this.render()
      }

      handleEvent(event){
        if (event.type === "click") {
            let eventName;
            if(this.state.eventName===undefined){
              eventName = "user:click-text-notification"
            }else {
              eventName = this.state.buttons.eventName
            }
            const clickFunnel = new CustomEvent(eventName,{
            detail:{source:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        this.classList.add("is-hidden");
        }
    }

    render(){
      this.innerHTML =  /* html */`
      <div class="container">
          <div ${this.getClasses(["notification"], this.state.classList)} ${this.setAnimation(this.state?.animation)}>
          <button class="delete"></button>
          ${this.md.render(this.state?.text[this.state.context.lang])}
          </div>
      </div>
      `;
      this.addEvents();
  }

}

customElements.define("text-notification", TextNotification)