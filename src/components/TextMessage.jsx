import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class TextMessage extends AppElement {

    #default = {
        context:{
            lang:"en"
    }
}

    constructor(props={}){
        super();
        this.eventName = "user:click-text-message";
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
        if (event.type === "click") {
            if(this.state.buttons?.eventName!=undefined){
                this.eventName = this.state.buttons.eventName
            }
            const clickFunnel = new CustomEvent(this.eventName,{
            detail:{source:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        this.classList.add("is-hidden");
        }
    }

    render(){
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container my-4">
                    <div class="columns is-centered">
                        <div class={`column ${this.state?.size!=undefined?this.state.size:'is-4'}`}>
                            <div class={this.getClassNames(["message"], this.state.classList)} {...this.getAnimationProps(this.state?.animation)}>
                                <div class="message-header">
                                    <p dangerouslySetInnerHTML={{ __html: this.md.render(this.state.header?.text[this.state.context.lang]) }} />
                                    {this.state.erasable===true && <button class="delete" aria-label="delete"></button>}
                                </div>
                                <div class="message-body" dangerouslySetInnerHTML={{ __html: this.md.render(this.state.body?.text[this.state.context.lang]) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>,
            this
        );
        if (this.state.erasable===true){
            this.addEvents();
        }
    }

}

customElements.define("text-message", TextMessage)
