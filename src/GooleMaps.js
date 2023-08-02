import { FunnelElement } from "./FunnelElement";

export class GoogleMaps extends FunnelElement {

    
    #default = {
        width:600,
        height:450
    }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
       
    }

    render(){
        this.innerHTML =  /* html */`
        <div ${this.getClasses(["content"], this.state.classList)}>
        ${this.state.title?.text[this.state.context.lang]!=undefined?`
        <h1 ${this.getClasses([], this.state.title?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
        ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
        <h2 ${this.getClasses([], this.state.subtitle?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2>`:``}
    </div>
        <div class="columns is-centered my-4">
            <div ${this.getClasses(["column"], this.state.map?.classList)}  ${this.setAnimation(this.state.map?.animation)}>
                ${this.state.message?.text[this.state.context.lang]!=undefined?`<h1 ${this.getClasses([], this.state.message?.classList)}>${this.state.message.text[this.state.context.lang]}</h1>`:``}
                ${this.state.address1?.text[this.state.context.lang]!=undefined?`<p>${this.state.address1.text[this.state.context.lang]}</p">`:``}
                ${this.state.address2?.text[this.state.context.lang]!=undefined?`<p>${this.state.address2.text[this.state.context.lang]}</p">`:``}
                <p  ${this.setAnimation(this.state.title?.animation)}><a href="${this.state.mapUrl}"><img src="${this.state.imageUrl}" alt=""></a></p>
            </div>
        </div>
        `
    }

}

customElements.define("google-maps", GoogleMaps)