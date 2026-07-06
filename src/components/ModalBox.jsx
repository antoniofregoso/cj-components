import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";

export class ModalBox extends AppElement {

    #default = {
        context:{
          lang:"en"
      }
        };

    constructor(props={}){
        super();
        this.eventName = "user:click-modal-box";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    static get observedAttributes() {
        return ["active"];
      }

    attributeChangedCallback(name, old, now) {
        if (name === 'active') {
            if (now !== null) {
                this.querySelector('.modal').classList.add('is-active');
            } else {
                this.querySelector('.modal').classList.remove('is-active');
            }
        }
      }

    handleEvent(event) {
        if (event.type === "click") {
            if (event.target.ariaLabel==='close'){
                this.querySelector(".modal").classList.remove("is-active");
                this.removeAttribute('active');
            }

        }
    }

    #image(){
        return (
            <>
                <div class="modal-content">
                    <p class={this.getClassNames(["image"], this.state.image?.classList)} {...this.getAnimationProps(this.state.image?.animation)}>
                        <img src={this.state.image.src!=undefined? this.state.image.src:''} alt={this.state.image.alt!=undefined? this.state.image.alt:''} />
                    </p>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
            </>
        );
    }

    #card(){
        return (
            <div class={this.getClassNames(["modal-card"], this.state.card?.classList)} {...this.getAnimationProps(this.state.card.animation)}>
                <header class={this.getClassNames(["modal-card-head"], this.state.card.title?.classList)} {...this.getAnimationProps(this.state.card.title?.animation)}>
                    {this.state.card.title?.text[this.state.context.lang]!=undefined && <p class="modal-card-title">{this.state.card.title.text[this.state.context.lang]}</p>}
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class={this.getClassNames(["modal-card-body"], this.state.card.content?.classList)} {...this.getAnimationProps(this.state.card.content?.animation)}>
                    <div class="content">
                        {this.state.card.content?.text[this.state.context.lang] &&
                            <span dangerouslySetInnerHTML={{ __html: this.md.render(this.state.card.content.text[this.state.context.lang]) }} />
                        }
                    </div>
                </section>
            </div>
        );
    }

    #message() {
        return (
            <div class="modal-content">
                <article class={this.getClassNames(["message"], this.state.message?.classList)} {...this.getAnimationProps(this.state.message?.animation)}>
                    <div class="message-header">
                        <p dangerouslySetInnerHTML={{ __html: this.md.render(this.state.message.header?.text[this.state.context.lang]) }} />
                        <button class="delete" aria-label="close"></button>
                    </div>
                    <div class="message-body" dangerouslySetInnerHTML={{ __html: this.md.render(this.state.message.body?.text[this.state.context.lang]) }} />
                </article>
            </div>
        );
    }

    #getContent(){
        if (this.state.image!=undefined){
            return this.#image();
        }else if (this.state.card!=undefined){
            return this.#card();
        }else if(this.state.message!=undefined){
            return this.#message();
        }else return <p>There is no content to display</p>;
    }

    render(){
        render(
            <div class="modal">
                <div class="modal-background"></div>
                {this.#getContent()}
            </div>,
            this
        );
        this.addEvents();
    }

}

customElements.define("modal-box", ModalBox)
