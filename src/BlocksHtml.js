import { FunnelElement } from "./FunnelElement";
import  EditorJS  from '@editorjs/editorjs';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';

export class BlocksHtml extends FunnelElement {

    #default = {
        blocks:{
            classList:["is-one-third","box"]
        }
    }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.state.holder = this.state.id + '-blocks';
    }

    render(){
        this.innerHTML = /* html */`
        ${this.state.title!=undefined||this.state.subtitle!=undefined?`
        <div ${this.getClasses(["content"], this.state.title?.classList)}>
        ${this.state.title?.text[this.state.context.lang]!=undefined?`<h1 class="${this.state.title?.classList!=undefined?this.state.title.classList:'is-size-2'}" ${this.setAnimation(this.state.title.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
        ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`<h2 class="${this.state.subtitle?.classList!=undefined?this.state.subtitle.classList:'is-size-3'}" ${this.setAnimation(this.state.subtitle.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2">`:``}
        </div>`:''}
        <div class="columns is-centered">
            <div ${this.getClasses(["column"], this.state.blocks?.classList)} ${this.setAnimation(this.state.blocks?.animation)}>
                <div class="content" id="${this.state.holder}">
                </div>
            </div>
        </div>
        `
        if (this.state.holder!=undefined){        
            this.editor = new EditorJS({
                holder: this.state.holder,
                minHeight : 0,
                tools: {
                header: Header,
                list: {
                    class: NestedList,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    },
                  },
                },
                onReady: () => {this.editor.blocks.render({"blocks":this.state.blocks.data[this.state.context.lang]})},
                readOnly: true});}
    }

    
}

customElements.define("blocks-html", BlocksHtml)