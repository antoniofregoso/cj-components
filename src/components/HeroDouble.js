import { FunnelElement } from "./FunnelElement";

export class HeroDouble extends FunnelElement {

    #default = {
      alignment:"centered",
      height:"large"
    };

      constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("alignment",this.state.alignment);
        this.setAttribute("height",this.state.height);
        this.classList.add('columns');
        if (this.state.classList){
          this.classList.add(...this.state.classList)
        }
    }

    static get observedAttributes() {
        return ["value", "alignment","height"];
      }
      
      attributeChangedCallback(name, old, now) {
        this.render()
      }

      handleEvent(event) {
        if (event.type === "click") {
            let eventName;
            if(this.state.buttons!=null){
              if(this.state.buttons.eventName===null){
                eventName = "user:click-hero-double";
              }else {
                eventName = this.state.buttons.eventName

              }
            }
            
            /*if(this.state.buttons2.eventName===null){
              eventName = "user:click-hero-double";
            }else {
              eventName = this.state.buttons2.eventName
            }*/
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
        this.innerHTML =  /* html */`
        <div ${this.getClasses(["column", "hero"], this.state.hero1?.classList)}>
            <div class="hero-body">
                <div  ${this.getClasses(["container"], this.state.body1?.classList)}>
                    <p ${this.getClasses(["title"], this.state.title1?.classList)} >
                    ${this.state.title1.text[this.state.context.lang]}
                    </p>
                    <p ${this.getClasses(["subtitle"], this.state.subtitle1?.classList)}   >
                    ${this.state.subtitle1.text[this.state.context.lang]}
                    </p>
                    ${this.buttonsRender(this.state.buttons1)}
                </div>
            </div>
        </div>
        <div ${this.getClasses(["column", "hero"], this.state.hero2?.classList)}>
            <div class="hero-body">
            <div  ${this.getClasses(["container"], this.state.body2?.classList)}>
                <p ${this.getClasses(["title"], this.state.title2?.classList)}  >
                  ${this.state.title2.text[this.state.context.lang]}
                </p>
                <p ${this.getClasses(["subtitle"], this.state.subtitle2?.classList)}   >
                ${this.state.subtitle2.text[this.state.context.lang]}
                </p>
                ${this.buttonsRender(this.state.buttons2)}
            </div>
            </div>
        </div>
        `
        this.addEvents()
      }

}

customElements.define("hero-double", HeroDouble)