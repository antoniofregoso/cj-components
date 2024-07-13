import { AppElement } from "@buyerjourney/bj-core";
import { Remarkable } from "remarkable";


export class CtaBanner extends AppElement {

    #default = {
      context:{
                lang:"en"
            }
      }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
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

    render(){
    	this.innerHTML =  /* html */`
      <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)}>
            <div class="container py-4">
              <div class="columns is-vcentered">
                <div class="column">
                   <div ${this.getClasses(["content"], this.state.content?.classList)}>
                   ${this.state.content?.text[this.state.context.lang]!=undefined?this.md.render(this.state.content.text[this.state.context.lang]):""}
                    </div>
                </div>
                <div class="column">
                    ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''} 
                </div>
              </div>
            </div>
    </section>
      `;
    	this.addEvents();

    }

}

customElements.define("cta-banner", CtaBanner)