import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class TextColumns extends AppElement {

    #default = {
        context:{
            lang:"en"
        }
    }

    constructor(props={}){
        super();
        this.eventName = "user:click-text-columns";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }


    render(){
        this.innerHTML =  /* html */` 
            <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
                <div class="container py-4">    
                ${this.getTitles()}
                <div ${this.getClasses(["content"], this.state.content?.classList)} ${this.setAnimation(this.state.content?.animation)}>
                ${this.md.render(this.state.content?.text[this.state.context.lang])}
                </div>
                <div class="columns">
                    <div class="column">
                        <div ${this.getClasses(["content"], this.state.leftColumn?.classList)} ${this.setAnimation(this.state.leftColumn?.animation)}>
                            ${this.md.render(this.state.leftColumn?.text[this.state.context.lang])}
                            ${this.state.leftColumn?.buttons != undefined ? this.buttonsRender(this.state.leftColumn.buttons) : ''}
                        </div>
                    </div> 
                    <div class="column">
                        <div ${this.getClasses(["content"], this.state.rightColumn?.classList)} ${this.setAnimation(this.state.rightColumn?.animation)}>
                            ${this.md.render(this.state.rightColumn?.text[this.state.context.lang])}
                            ${this.state.rightColumn?.buttons != undefined ? this.buttonsRender(this.state.rightColumn.buttons) : ''}
                        </div>
                    </div> 
                </div>
                ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''} 
            </div>
        </section>
        `;
        this.addEvents();
    }

}

customElements.define("text-columns", TextColumns)
