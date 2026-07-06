import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class TextAccordion extends AppElement {

    #default = {
        context:{
            lang:"en"
        }
    }

    constructor(props={}){
        super();
        this.eventName = "user:click-text-accordion";
        this.state = this.initState(this.#default, props);
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
            if (event.target.tagName==='BUTTON'){
                if(this.state.buttons.eventName!=undefined){
                    this.eventName = this.state.buttons.eventName
                }
                const clickFunnel = new CustomEvent(this.eventName,{
                detail:{source:event.target.id},
                bubbles: true,
                composed: true
                })
            this.dispatchEvent(clickFunnel);
            }else if (event.target.tagName==='DIV'){
                let items = this.querySelectorAll(".message");
                items.forEach((item)=>{
                    item.querySelector(".message-header  span").innerHTML= "&plus;";
                    let content = item.querySelector(".message-body");
                    content.classList.add("is-hidden")
                });
                event.target.querySelector("span").innerHTML= "&minus;";
                let content = event.target.parentNode.querySelector(".message-body");
                content.classList.remove("is-hidden");
            }
        }

    }

    addEvents(){
        let buttons = this.querySelectorAll("button");
        let items = this.querySelectorAll(".message-header");
        if (buttons.length>0){
            buttons.forEach((item)=>{
            item.addEventListener("click",this)
            });
        }
        if (items.length>0){
            items.forEach((item)=>{
                item.addEventListener("click",this)
            });
        }
    }

    #SetAnimation(){
        if (this.state.accordion?.animation!=undefined){
            let messages = this.querySelectorAll(".message-body");
            messages.forEach((message)=>{
                message.classList.add('animate__animated', `animate__${this.state.accordion.animation?.effect}`)
                if (this.state.accordion.animation?.speed!=undefined){
                    message.classList.add(`animate__${this.state.accordion.animation.speed}`)
                }
                if (this.state.accordion.animation?.repeat!=undefined){
                    message.classList.add(`animate__repeat-${this.state.accordion.animation.repeat}`)
                }
                if (this.state.accordion.animation?.delay!=undefined){
                    message.classList.add(`animate__delay-${this.state.accordion.animation.delay}`)
                }
            });
        }
    }

    #getItems(){
        if (!(this.state.accordion?.items.length>0)) return [];
        return this.state.accordion.items.map((el, i) => (
            <div class={this.getClassNames(["message", "mb-1"], this.state.accordion?.classList)} key={i}>
                <div class="message-header">
                    {el.header?.text[this.state.context.lang]!=undefined?el.header.text[this.state.context.lang]:''}
                    <span class="accordion-icon" aria-hidden="true">&plus;</span>
                </div>
                <div class="message-body is-hidden">
                    {el.content?.text[this.state.context.lang]!=undefined &&
                        <span dangerouslySetInnerHTML={{ __html: this.md.render(el.content.text[this.state.context.lang]) }} />
                    }
                </div>
            </div>
        ));
    }

    render(){
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container py-4">
                    {this.getTitlesJSX()}
                    <div class={this.getClassNames(["content"], this.state.content?.classList)} {...this.getAnimationProps(this.state.content?.animation)}>
                        {this.#getItems()}
                    </div>
                    {this.state.buttons!=undefined && this.buttonsRenderJSX(this.state.buttons)}
                    {this.state.epilogue?.text[this.state.context.lang]!=undefined &&
                        <div class={this.getClassNames(["content"], this.state.epilogue?.classList)} dangerouslySetInnerHTML={{ __html: this.md.render(this.state.epilogue.text[this.state.context.lang]) }} />
                    }
                </div>
            </section>,
            this
        )
        this.#SetAnimation()
        this.addEvents();
    }

}

customElements.define("text-accordion", TextAccordion)
