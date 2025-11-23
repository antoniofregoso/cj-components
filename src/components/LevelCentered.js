import { AppElement } from "@customerjourney/cj-core";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Remarkable } from "remarkable";

export class LevelCentered extends AppElement {

    #default = {
         context:{
        lang:"en"
    }
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        library.add(far, fas);
        this.md = new Remarkable();
    }

    /**
     * 
     * @param {*} prefix 
     * @param {*} iconName 
     * @returns 
     */
    #getIcon(prefix, iconName) {
        try {
            return icon({ prefix: prefix, iconName: iconName }).html[0];
        } catch(error) {
            console.error(`There is no icon ${prefix} ${iconName} on the far and fas kits`)
            return(icon({ prefix: 'fas', iconName: 'circle-exclamation' }).html[0])
        }
        }

    #getItems(){
        let itemsHtml = ``;
        if (this.state.items?.length>0){
            this.state.items.forEach(item=>{
            itemsHtml+= /*html */`         
            <div class="level-item has-text-centered">
                <div>
                    ${item.icon?.name!=undefined?`
                        <div ${this.getClasses(["icon", "title"], item.icon?.classList)} 
                            ${this.setAnimation(item.icon?.animation)}>
                            ${this.#getIcon(item.icon.prefix,item.icon.name)}
                        </div>`:''}
                    ${item.image?.src!=undefined?`
                        <figure ${this.getClasses(["image"], item.image?.classList)}>
                            <img src="${item.image.src}" />
                        </figure>`:''}
                    ${item.heading!=undefined?`
                        <p ${this.getClasses(["heading"], item.heading?.classList)}
                            ${this.setAnimation(item.heading?.animation)}>
                            ${item.heading?.text[this.state.context.lang]!=undefined?item.heading.text[this.state.context.lang]:''}
                        </p>`:''}
                    ${item.title!=undefined?`
                        <p ${this.getClasses(["title"], item.title?.classList)}
                            ${this.setAnimation(item.title?.animation)}>
                            ${item.title?.text[this.state.context.lang]!=undefined?item.title.text[this.state.context.lang]:''}                            
                        </p>`:''}
                </div>
            </div>`;
        });
        }
        
        return itemsHtml;
    }


    render(){
        this.innerHTML =  /* html */`
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="container my-4">
                ${this.getTitles()}
                <nav ${this.getClasses(["level"])}>
                    ${this.#getItems()}
                </nav>
            </div>
        </section>
        `;
    }

}

customElements.define("level-centered", LevelCentered)
