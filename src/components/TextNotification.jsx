import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class TextNotification extends AppElement {

  #default = {
    context:{
            lang:"en"
    }
  }

    constructor(props={}){
        super();
        this.eventName = "user:click-text-notification";
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
              <div class="container">
                  <div class={this.getClassNames(["notification"], this.state.classList)} {...this.getAnimationProps(this.state?.animation)}>
                      <button class="delete"></button>
                      <div dangerouslySetInnerHTML={{ __html: this.md.render(this.state.message?.text[this.state.context.lang]) }} />
                  </div>
              </div>
          </section>,
          this
      );
      this.addEvents();
  }

}

customElements.define("text-notification", TextNotification)
