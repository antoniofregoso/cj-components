import { FunnelElement } from "./FunnelElement";

export class TakeMe extends FunnelElement {

    
    #default = {
        width:600,
        height:450,
        map: {
            googleMaps:{
                text:{
                    es:"LLevame Google Maps",
                    en:"Take me Google Maps",
                    fr:"Emmenez-moi Google Maps"
                }
            },
            waze:{
                text:{
                    es:"LLevame Waze",
                    en:"Take me  Waze",
                    fr:"Emmenez-moi Waze"
                }
            }
        }

    }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
       
    }

    render(){
        this.innerHTML =  /* html */`
        ${this.state.title!=undefined||this.state.subtitle!=undefined?`
        <div ${this.getClasses(["content"], this.state.classList)}>
        ${this.state.title?.text[this.state.context.lang]!=undefined?`
        <h1 ${this.getClasses([], this.state.title?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
        ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
        <h2 ${this.getClasses([], this.state.subtitle?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2>`:``}
    </div>`:''}
        <div class="columns is-centered my-4">
            <div ${this.getClasses(["column"], this.state.map?.classList)}  ${this.setAnimation(this.state.map?.animation)}>
                ${this.state.map.title?.text[this.state.context.lang]!=undefined?`<h1 class="is-size-3">${this.state.map.title.text[this.state.context.lang]}</h1>`:``}
                ${this.state.map.message?.text[this.state.context.lang]!=undefined?`<h2 class="is-size-4">${this.state.map.message.text[this.state.context.lang]}</h2>`:``}
                ${this.state.map.address1?.text[this.state.context.lang]!=undefined?`<p>${this.state.map.address1.text[this.state.context.lang]}</p">`:``}
                ${this.state.map.address2?.text[this.state.context.lang]!=undefined?`<p>${this.state.map.address2.text[this.state.context.lang]}</p">`:``}
                <p  ${this.setAnimation(this.state.map.title?.animation)}><img src="${this.state.map.imageUrl}" alt=""></p>
                <div class="buttons">
                    ${this.state.map.googleUrl!=undefined?`<a href="${this.state.map.googleUrl}" class="button is-success is-fullwidth is-rounded">${this.state.map.googleMaps.text[this.state.context.lang]}</a>`:''}
                    ${this.state.map.wazeUrl!=undefined?`<a href="${this.state.map.wazeUrl}" class="button is-info is-fullwidth is-rounded">${this.state.map.waze.text[this.state.context.lang]}</a>`:''}
                </div>
            </div>
        </div>
        `
    }

}

customElements.define("take-me", TakeMe)