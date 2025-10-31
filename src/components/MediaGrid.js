import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";

export class MediaGrid extends AppElement {

    #default = {
        context:{
            lang:"en"
            }
        };

    constructor(props={}){
        super();
        this.eventName = "user:click-media-grid"
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    #mediaObject(props) {
        return /*hrml*/`
    <div class="cell">
        <div ${this.getClasses(["media"], this.state.mediaObjects?.classList)}  ${this.setAnimation(this.state.mediaObjects?.animation)}>
        ${props.imageL?.src!=undefined?`
            <figure class="media-left">
            <p class="image is-64x64">
            <img src="${props.imageL.src}">
            </p>
            </figure>`:''}
            <div class="media-content">
            <div ${this.getClasses(["content"], props.description?.classList)}>
                ${props.description?.text[this.state.context.lang]!=undefined?`${this.md.render(props.description.text[this.state.context.lang])}`:''}
            </div>
            </div>
            ${props.imageR?.src!=undefined?`
            <figure class="media-right">
            <p class="image is-64x64">
            <img src="${props.imageR.src}">
            </p>
            </figure>`:''}
        </div>
    </div>
    `};

    #getItems(){
        let items = '';
        if (this.state.mediaObjects?.items!=undefined){
            this.state.mediaObjects?.items.forEach(el=>{
            items += this.#mediaObject(el)
        });
        }
        return items;
    }

    render(){
        this.innerHTML =  /* html */`
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="container my-4">
                ${this.getTitles()}
                <div ${this.getClasses(["fixed-grid"], this.state?.grid?.classList)} >
                    <div class="grid">
                        ${this.#getItems()}
                    </div>
                </div>
                ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}
            </div>
        </section>
        `;
        this.addEvents()
    }

}

customElements.define("media-grid", MediaGrid)