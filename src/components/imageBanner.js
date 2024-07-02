import { AppElement } from "@buyerjourney/bj-core";
import SimpleParallax from "simple-parallax-js";
import { Remarkable } from "remarkable";

export class ImageBanner extends AppElement {
    #default = {
        cardsWidth:4
    };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
    }

    render(){
        this.innerHTML =  /* html */`
            <div ${this.getClasses(["content"], this.state.classList)}>
                ${this.state.title?.text[this.state.context.lang]!=undefined?`
                <h1 ${this.getClasses([], this.state.title?.classList)}  ${this.setAnimation(this.state.title.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
                ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
                <h2 ${this.getClasses([], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2">`:``}
            </div>
            <div class="columns is-centered">
                <div class="column is-4">
                <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/256x256.png">
                </figure>
                </div>
            </div>
        `
        this.addEvents();
    }


}

customElements.define("image-banner", ImageBanner)