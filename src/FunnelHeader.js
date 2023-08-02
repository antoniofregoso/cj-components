import { FunnelElement } from "./FunnelElement";

export class FunnelHeader extends FunnelElement {

    #default = {brandSrc:"https://bulma.io/images/bulma-logo.png"};

    #i18n = false;

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`header-${Math.floor(Math.random() * 100)}`);
        
    } 
    
    appendLanguageSelector(el){
        this.#i18n = el;
    }

    render(){
        this.innerHTML =  /* html */`
            <header>
            <nav ${this.getClasses(["navbar"], this.state.classList)} role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                <img class="navbar-item"  src="${this.state.brand.src}" width="180" height="28">
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-end">
                        ${this.#i18n!=false?`<div id="i18nh" class="navbar-item"></div>`:''}
                    </div>
                </div>
            </nav>
        </header>
        `
        if (this.#i18n != false){
            this.querySelector('#i18nh').appendChild(this.#i18n);
        }
        let burger = this.querySelector('.navbar-burger');
        let menu = this.querySelector('.navbar-menu');
        burger.addEventListener('click',()=>{
            burger.classList.toggle("is-active")
            menu.classList.toggle("is-active")
        }) 
    }



}

customElements.define("funnel-header", FunnelHeader)