import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
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


    render(){
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container py-4">
                    <div class="columns is-vcentered is-centered">
                        <div class={`column ${this.state.content?.size!=undefined?this.state.content.size:'is-6'}`}>
                            <div class={this.getClassNames(["content"], this.state.content?.classList)} {...this.getAnimationProps(this.state.content?.animation)}>
                                {this.state.content?.text[this.state.context.lang]!=undefined &&
                                    <div dangerouslySetInnerHTML={{ __html: this.md.render(this.state.content.text[this.state.context.lang]) }} />
                                }
                                {this.state.content?.buttons!=undefined && this.buttonsRenderJSX(this.state.content.buttons)}
                            </div>
                        </div>
                        {this.state.buttons!=undefined &&
                            <div class="column">{this.buttonsRenderJSX(this.state.buttons)}</div>
                        }
                    </div>
                </div>
            </section>,
            this
        );
        this.addEvents();
    }

}

customElements.define("cta-banner", CtaBanner)
