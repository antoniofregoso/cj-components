import { AppElement } from "@buyerjourney/bj-core";
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
        if (name==='active'&&now===''){
            this.querySelector('.modal').classList.add('is-active')
        }
      }

    handleEvent(event) {
        if (event.type === "click") {
            if (event.target.ariaLabel==='close'){
                this.querySelector(".modal").classList.remove("is-active");
            }
            
        }
    }

    #image(){
        return /*HTML*/ `
        <div class="modal-content">
            <p ${this.getClasses(["image"], this.state.image?.classList)} ${this.setAnimation(this.state.image?.animation)}>
                <img src="${ this.state.image.src!=undefined? this.state.image.src:''}" alt="${ this.state.image.alt!=undefined? this.state.image.alt:''}">
            </p>
        </div>          
        <button class="modal-close is-large" aria-label="close"></button>    
        `
    }

    #card(props){
        return /*HTML*/`
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
            <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
            <div class="buttons">
                <button class="button is-success">Save changes</button>
                <button class="button">Cancel</button>
            </div>
            </footer>
        </div>
        `
    }

    #notification(props) {
        return /*HTML*/`
        <div class="modal-content">
            <div ${this.getClasses(["message"], props.classList)}>
                ${props.header?.text[this.state.context.lang]!=undefined?`
                <div class="message-header">
                <p>${props.header?.text[this.state.context.lang]}</p>
                <button class="delete" aria-label="close"></button>
            </div>
                `:``}               
                <div class="message-body">
                ${props.body?.text[this.state.context.lang]!=undefined?this.md.render(props.body?.text[this.state.context.lang]):''}
                </div>
            </div>
        </div>
        `
    }

    #getContent(){
        if (this.state.image?.src!=undefined){
            return this.#image();
        }
    }

    render(){
        this.innerHTML =  /* html */`
        <div class="modal is-active">
            <div class="modal-background"></div>
                ${this.#getContent()}
        </div>
        `;
        this.addEvents();
    }

}

customElements.define("modal-box", ModalBox)