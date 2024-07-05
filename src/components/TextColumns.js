import { AppElement } from "@buyerjourney/bj-core";
import { Remarkable } from "remarkable";


export class TextColumns extends AppElement {

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

    }

    addEvents(){

    }

    render(){
        this.innerHTML =  /* html */`
        <div class="container py-4">
            ${this.getTitles()}
            <div ${this.getClasses(["content"], this.state.content?.classList)} ${this.setAnimation(this.state.content?.animation)}>
            ${this.md.render(this.state.content?.text[this.state.context.lang])}
            </div>
            <div class="columns">
                <div class="column">
                    <div ${this.getClasses(["content"], this.state.leftColumn?.classList)} ${this.setAnimation(this.state.leftColumn?.animation)}>
                        ${this.md.render(this.state.leftColumn?.text[this.state.context.lang])}
                    </div>
                </div> 
                <div class="column">
                    <div ${this.getClasses(["content"], this.state.rightColumn?.classList)} ${this.setAnimation(this.state.rightColumn?.animation)}>
                        ${this.md.render(this.state.rightColumn?.text[this.state.context.lang])}
                    </div>
                </div> 
            </div>
             ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''} 
        </div>
        `;

    }

}

customElements.define("text-columns", TextColumns)