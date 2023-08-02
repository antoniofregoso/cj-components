import { FunnelElement } from "./FunnelElement";

export class HeroBanner extends FunnelElement {
  
    #default = {
      alignment:"centered",
      scrollButton:{
        color:"White"
      }
    };

constructor(props={}){
    super();
    this.state =this.initState(this.#default,props);
    this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
}  

static get observedAttributes() {
  return ["value", "alignment"];
}

attributeChangedCallback(name, old, now) {
  this.render()
}

handleEvent(event) {
        if (event.type === "click") {
            if (event.target.tagName==='BUTTON'){
              let eventName;
              if(this.state.buttons.eventName===undefined){
                eventName = "user:click-hero"
              }else {
                eventName = this.state.buttons.eventName
              }
              const clickFunnel = new CustomEvent(eventName,{
              detail:{click:event.target.id},
              bubbles: true,
              composed: true
              });
              this.dispatchEvent(clickFunnel);
            } else if (event.target.tagName==='path' || event.target.tagName==='svg'){
                this.scrollDown();
            }
        }
    }

scrollDown(){
  window.scroll({
  top: window.scrollY + window.innerHeight,
  left: 0,
  behavior: "smooth",
});
}



addEvents(){
  let buttons = this.querySelectorAll("button");
  if (buttons.length>0){
    buttons.forEach((item)=>{
      item.addEventListener("click",this)
    });    
  } 
  if (this.state.scrollButton===true){
    let scroolDown = this.querySelector(".scroll-down");
    scroolDown.addEventListener("click",this);
  }
}

#icon = /* svg */`<svg xmlns="http://www.w3.org/2000/svg" class="iconMedium" aria-hidden="true" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM127 281c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l71 71L232 136c0-13.3 10.7-24 24-24s24 10.7 24 24l0 182.1 71-71c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 393c-9.4 9.4-24.6 9.4-33.9 0L127 281z"/></svg>`

styleIcon(){
  if (this.state.scrollButton===true){
    let icon = this.querySelector("svg");
    icon.style.fill = this.state.scrollButton.color;
  }
}


render(){
    this.innerHTML =  /* html */`
    <style>
    .icon {
      width: 3em;
      height: 3em;
      vertical-align: -.125em;
      text-shadow: 1px 1px 2px black;
    }
    ${this.state.backgroundImage?.url!=undefined?`
    #${this.state.id} {
      background-image: url("${this.state.backgroundImage.url}");
      background-position: center center;
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-size: auto;
      text-shadow: 1px 1px 2px black;
    }
    @media only screen and (max-width: 767px) {
      #${this.state.id} {
        background-image: url("${this.state.backgroundImage?.urlMobile}");
      }
    }
    `:''}
  </style>
  <div ${this.getClasses(["hero"], this.state.classList)}  ${this.setAnimation(this.state.animation)}>
    <div class="hero-body">
      <div ${this.getClasses(["container"], this.state.body?.classList)}>
        ${this.state.title?.text[this.state.context.lang]!=undefined?`
          <p ${this.getClasses(["title"], this.state.title?.classList)} ${this.setAnimation(this.state.title.animation)}>
            ${this.state.title.text[this.state.context.lang]}
          </p>`:''}
          ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
          <p ${this.getClasses(["subtitle"], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle.animation)}>
          ${this.state.subtitle.text[this.state.context.lang]}
          </p>`:''}
          ${this.state.buttons!=undefined?
          this.buttonsRender(this.state.buttons):''}
      </div>
    </div>
    ${this.state.scrollButton===true?`
    <div class="hero-foot has-text-centered">
      <span class="icon scroll-down">
        ${ this.#icon }
      </span>
    </div>`:''}
    </div>
    `;
    this.styleIcon();
    this.addEvents();
    }

}

customElements.define("hero-banner", HeroBanner);