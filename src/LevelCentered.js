import { FunnelElement } from "./FunnelElement";

export class LevelCentered extends FunnelElement {

    #default = {
        withContainer:true
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
    }

    #getItems(){
        let itemsHtml = ``;
        this.state.items.forEach(item=>{
            itemsHtml+= /* html */`
            <div class="level-item has-text-centered">
                <div>
                ${item.icon.svg!=undefined? 
                    `<p ${this.getClasses(["title"], item.icon?.classList)}  ${this.setAnimation(item.icon.animation)}>${item.icon.svg}</p>`:``}
                ${item.title?.text[this.state.context.lang]!=undefined? 
                    `<p ${this.getClasses(["title"], item.title?.classList)}  ${this.setAnimation(item.title.animation)}>${item.title.text[this.state.context.lang]}</p>`:``}
                ${item.buttons!=undefined?this.buttonsRender(item.buttons):''}
                ${item.heading?.text[this.state.context.lang]!=undefined? 
                    `<p ${this.getClasses(["heading"], item.heading?.classList)}  ${this.setAnimation(item.heading.animation)}>${item.heading.text[this.state.context.lang]}</p>`:``}
                
                </div>
            </div>`;
            
        });
        return itemsHtml;
    }

    styleIcons(){
        let icons = this.querySelectorAll("svg");
        icons.forEach(icon => {
            icon.style.fill = this.state.iconsColor||'black';
        })
      }

    handleEvent(event) {
        if (event.type === "click") {
            let eventName;
            if(this.state.eventName===undefined){
              eventName = "user:click-card"
            }else {
              eventName = this.state.eventName
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
        this.innerHTML =  /* html */`
        ${this.state.title!=undefined||this.state.subtitle!=undefined?`
            <div ${this.getClasses(["content"], this.state.title?.classList)}>
                ${this.state.title?.text[this.state.context.lang]!=undefined?`
                <h1 ${this.getClasses([], this.state.title?.classList)} ${this.setAnimation(this.state.title.animation)}>
                    ${this.state.title.text[this.state.context.lang]}</h1>`:``}
                ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
                <h2 ${this.getClasses([], this.state.subtitle?.classList)} ${this.setAnimation(this.state.subtitle.animation)}>
                    ${this.state.subtitle.text[this.state.context.lang]}</h2">`:``}
            </div>`:''}
        <div ${this.getClasses(["level"], this.state.level?.classList)}>
            ${this.#getItems()};
        </div>
        `
        this.styleIcons();
        this.addEvents();
    }

}

customElements.define("level-centered", LevelCentered)