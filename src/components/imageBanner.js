import { AppElement } from "@buyerjourney/bj-core";
import SimpleParallax from "simple-parallax-js/vanilla";
import { Remarkable } from "remarkable";

export class ImageBanner extends AppElement {
    #default = {
        cardsWidth:4
    };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    handleEvent(event) {
        if (event.type === "click") {
            let eventName;
            if(this.state.buttons.eventName===undefined){
              eventName = "user:click-image-banner"
            }else {
              eventName = this.state.buttons.eventName
            }
            const clickFunnel = new CustomEvent(eventName,{
            detail:{source:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        }
    }

    addEvents(){
        let buttons = this.querySelectorAll("button");
        if (buttons.length>0){
          buttons.forEach((item)=>{
            item.addEventListener("click",this)
          });    
        }  
      }

    render(){
        this.innerHTML =  /* html */`
           <div class="container py-4">
            ${this.getTitles()}
            <div class="columns is-centered">
                <div class="column ${this.state.image?.size!=undefined?this.state.image.size:'is-6'}">
                <figure ${this.getClasses(["image"], this.state.image?.classList)} ${this.setAnimation(this.state.image?.animation)}>
                    <img src="${this.state.image?.src}">
                </figure>
                ${this.state.description?.text[this.state.context.lang]!=undefined?`
                    <div ${this.getClasses(["content"], this.state.description?.classList)} ${this.setAnimation(this.state.description?.animation)}>
                        ${this.md.render(this.state.description?.text[this.state.context.lang])}
                    </div>`:''}  
                 ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}
                </div>
            </div>
        </div>
        `
        this.addEvents();
        if(this.state.image?.paralax!=undefined){
            var image = this.querySelector('img')   
            new SimpleParallax(image,this.state.image.paralax) 
        }
    }


}

customElements.define("image-banner", ImageBanner)