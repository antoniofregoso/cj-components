import { FunnelElement } from "./FunnelElement";
import SimpleParallax from "simple-parallax-js";
import  EditorJS  from '@editorjs/editorjs';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';

export class BlocksImage extends FunnelElement {

    #default = {
        textAlign:"left"
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("text-align",this.state.textAlign);
        this.setAttribute("img-pos",this.state.imgPos);
        this.classList.add('columns','is-vcentered', 'is-gapless');
        this.updateClassList();
        this.state.holder = this.state.id + '-blocks';        
    }

    static get observedAttributes() {
        return ["text-align", "img-pos"];
      }
      
      attributeChangedCallback(name, old, now) {
        this.render()
      }

    render(){
        let img = /* html */`
            <div  ${this.getClasses(["column"], this.state.image.classList)}>
                <figure class="image" ${this.setAnimation(this.state.image?.animation)}>
                    <img src="${this.state.image.src}" >
                </figure>
            </div>
            `
        let text = /* html */`  
        <div ${this.getClasses(["column"], this.state.blocks.classList)} ${this.setAnimation(this.state.blocks.animation)} id="${this.state.holder}">   
            
        </div>
            `
        this.innerHTML =  /* html */`
                ${this.state.imgPos==='right'?text:img}
                ${this.state.imgPos==='right'?img:text}
        `        
        if(this.state.paralax!=undefined){
            var image = this.querySelector('img')   
            new SimpleParallax(image,this.state.paralax) 
        }
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
                onReady: () => {this.editor.blocks.render({"blocks":this.state.blocks[this.state.context.lang]})},
                readOnly: true});
        }
    }


}

customElements.define("blocks-image", BlocksImage)