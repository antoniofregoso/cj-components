import { FunnelElement } from "./FunnelElement";

export class LanguajeSelector extends FunnelElement {

    #default = {};

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`i18n-${Math.floor(Math.random() * 5)}`);
        this.setAttribute("value", this.state.context.lang||'en');  
    }
    handleEvent(event) {
        if (event.type === "click") {
            const selectLang = new CustomEvent("user:select-lang",{
            detail:{lang:event.target.id.slice(4)},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(selectLang);
        }
    }

    static get observedAttributes() {
        return ["value"];
      }

      attributeChangedCallback(name, old, now) {
        if (now==='value'){
            this.state.context.lang = now

        }}

    getButtons(){
        let lngButtons = ``;
        Object.entries(this.state.lngs).forEach(([key, value])=>{
            lngButtons += `<button id="btn-${key}" class="${this.buttonLang(key)}">${value}</button>`
        
        });
        return lngButtons        
    }

    addEvents(){
        Object.entries(this.state.lngs).forEach(([key, value])=>{  
            this.querySelector(`#btn-${key}`).addEventListener("click",this)
        });
    }

    render(){
        this.innerHTML =  /* html */`
            <div class="buttons are-small">
                ${this.getButtons()}
            </div>
        `
        this.addEvents();
    }

    buttonLang(button){
        return button===this.getAttribute("value")?'button is-focused is-info"':'button'
    }


}

customElements.define("languaje-selector", LanguajeSelector)