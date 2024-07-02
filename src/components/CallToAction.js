import { AppElement } from "@buyerjourney/bj-core";

export class CallToAction extends AppElement {

    #default = {
      alignment:"centered",
      height:"large"
    };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.updateClassList();
    }

    handleEvent(event) {
        if (event.type === "click") {
            let eventName;
            if(this.state.eventName===undefined){
              eventName = "user:click-call2Action"
            }else {
              eventName = this.state.eventName
            }
            const clickFunnel = new CustomEvent(eventName,{
            detail:{click:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        }
    }

    render(){
        this.innerHTML =  /* html */`
        <div ${`id="${this.state.id}-content"`} ${this.getClasses(["hero", "is-small"], this.state.classList)}  ${this.setAnimation(this.state.animation)}>
        <div class="hero-body">
          <div class="container has-text-centered">
            <p ${this.getClasses(["title"], this.state.title?.classList)} ${this.setAnimation(this.state.title.animation)}>
                ${this.state.title.text[this.state.context.lang]}
            </p>
            <p ${this.getClasses(["subtitle"], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle.animation)}>
            ${this.state.subtitle.text[this.state.context.lang]}
            </p>
            <button id="${ this.state.button.id }" ${this.getClasses(["button"], this.state.button?.classList)}  ${this.setAnimation(this.state.button.animation)}> ${this.state.button.text[this.state.context.lang]}</button>
          </div>
        </div>
        </div>
        `
    let btnCall2Action = this.querySelector(".button");
    btnCall2Action.addEventListener("click",this);
    }

}



customElements.define("call-to-action", CallToAction)
