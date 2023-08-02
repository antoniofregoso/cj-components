import { FunnelElement } from "./FunnelElement";

export class StepsComponent extends FunnelElement {

    #default = {
        
    }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
       
    }

    #getSteps(){
        if (this.state.steps != undefined){
            let steps = ''
            this.state.steps.forEach(step =>{
                step = `
                <li ${this.getClasses(["steps-segment"], step.classList)} >
                    <span  ${this.getClasses(["steps-marker"], step.marker?.classList)}>
                        ${step.marker?.text!=undefined?
                            step.marker.text[this.state.context.lang].startsWith('fa ')?`                            
                            <span class="icon">
                                <i class="${step.marker.text[this.state.context.lang]}"></i>
                            </span>
                            `:
                            step.marker.text[this.state.context.lang]:''}
                    </span>
                    ${ step.content!=undefined?`
                    <div ${this.getClasses(["steps-content"], step.content?.classList)} ${this.setAnimation(step.content.animation)}>
                        ${step.content.title?.text[this.state.context.lang]!=undefined?`
                            <p ${this.getClasses([], step.content.title?.classList)}>${step.content.title.text[this.state.context.lang]}</p>`:''}
                        ${step.content.description?.text[this.state.context.lang]!=undefined?`
                            <p>${step.content.description.text[this.state.context.lang]} ${this.getClasses([], step.content.description?.classList)}</p>`:''}
                    </div>`:''}
                </li>
                `
                steps += step;
             })
             return steps
        }else return '';
    }

    render(){
        this.innerHTML =  /* html */`
        <div ${this.getClasses(["content"], this.state.title?.classList)}>        
            ${this.state.title?.text[this.state.context.lang]!=undefined?`
            <h1 ${this.getClasses([], this.state.title?.classList)}  ${this.setAnimation(this.state.title.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
            ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
            <h2 ${this.getClasses([], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2">`:``}
        </div>
        <ul ${this.getClasses(["steps"], this.state.classList)}>
            ${this.#getSteps()}
        </ul>
        `
        //this.addEvents();
}
}

customElements.define("steps-component", StepsComponent)