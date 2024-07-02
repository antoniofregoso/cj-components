import { AppElement } from "@buyerjourney/bj-core";
import { Remarkable } from "remarkable";

export class MediaList extends AppElement {

    #default = {
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
                    eventName = "user:click-image-text"
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
      

    #mediaObject(props) {
      return /*hrml*/`
    <article ${this.getClasses(["media"], props?.classList)}  ${this.setAnimation(props?.animation)}>
    ${props.imgSrc!=undefined?`
      <figure class="media-left">
      <p class="image is-64x64">
      <img src="${props.imgSrc}">
      </p>
      </figure>`:''}
      <div class="media-content">
        <div class="content">
          <p>
            ${props.title?.text[this.state.context.lang]!=undefined?`<span ${this.getClasses([], props.title?.classList)} >${props.title.text[this.state.context.lang]}</span><br>`:''}             
            ${props.description?.text[this.state.context.lang]!=undefined?`${this.md.render(props.description.text[this.state.context.lang])}`:''}
          </p>
        </div>
      </div>
    </article>
    `};

    #getItems(){
      let items = '';
      this.state.mediaObjects?.items.forEach(el=>{
        items += this.#mediaObject(el)
      });
      return items;
    }

    render(){
        this.innerHTML =  /* html */`
        <div ${this.getClasses(["section","container"], this.state?.classList)}>  
        ${this.getTitles(this.state)}
            <div class="columns is-centered">
              <div ${this.getClasses(["column"], this.state.mediaObjects?.classList)}>
                ${this.#getItems()}
              </div>
            </div>
            ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}  
            </div> 
        `;
        this.addEvents()
    }


}

customElements.define("media-list", MediaList)