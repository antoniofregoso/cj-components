import { FunnelElement } from "./FunnelElement";
import SimpleParallax from "simple-parallax-js";

export class ImageText extends FunnelElement {

    #default = {
        textAlign:"left"
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("text-align",this.state.textAlign);
        this.setAttribute("img-pos",this.state.imgPos);
        if (this.state.imgWide===true)
        {
            this.setAttribute("img-wide",this.state.imgWide);
        }
        this.classList.add('columns','is-vcentered', 'is-gapless');
        this.updateClassList();
    }

    static get observedAttributes() {
        return ["text-align", "img-pos", "img-wide"];
      }
      
      attributeChangedCallback(name, old, now) {
        this.render()
      }
      
      handleEvent(event) {
              if (event.type === "click") {
                  let eventName;
                  if(this.state.buttons.eventName===undefined){
                    eventName = "user:click-image-text"
                  }else {
                    eventName = this.state.buttons.eventName
                  }
                  const clickFunnel = new CustomEvent(eventName,{
                  detail:{click:event.target.id},
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
        let img = /* html */`
            <div  ${this.getClasses(["column"], this.state.image.classList)}>
                <figure class="image" ${this.setAnimation(this.state.image?.animation)}>
                    <img src="${this.state.image.src}" >
                </figure>
            </div>
            `
        let text = /* html */`  
        <div ${this.getClasses(["column"], this.state.classList)}>
            <div  class="content p-4">       
                ${this.state.title?.text[this.state.context.lang]!=undefined?`<h1 ${this.getClasses(["title"], this.state.title?.classList)}  ${this.setAnimation(this.state.title?.animation)}>
                    ${this.state.title.text[this.state.context.lang]}
                </h1>`:''}
                ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`<h2 ${this.getClasses(["subtitle"], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle?.animation)}>
                    ${this.state.subtitle.text[this.state.context.lang]}
                </h2>`:''}
                ${this.state.description?.text[this.state.context.lang]!=undefined?`<p ${this.getClasses([], this.state.description?.classList)} ${this.setAnimation(this.state.description?.animation)}>
                    ${this.state.description?.text[this.state.context.lang]}
                </p>`:''}    
                ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}               
            </div>
        </div>
            `
        this.innerHTML =  /* html */`
                ${this.state.imgPos==='right'?text:img}
                ${this.state.imgPos==='right'?img:text}
        `
        this.addEvents()
        if(this.state.paralax!=undefined){
            var image = this.querySelector('img')   
            new SimpleParallax(image,this.state.paralax) 
        }
    }


}

customElements.define("image-text", ImageText)