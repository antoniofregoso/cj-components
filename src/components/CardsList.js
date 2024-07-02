import { AppElement } from "@buyerjourney/bj-core";

export class CardsList extends AppElement {
    #default = {
        cardsWidth:4
    };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
    }

    #card(props){
        let card = /* html */ `
        <div class="column is-${this.state.cardsWidth}">
            <div class="card"  ${this.setAnimation(props.animation)}>                
                ${props.header?.title!=undefined?
                    `<header ${this.getClasses(["card-header"], props.header.classList)}>
                    <p ${this.getClasses(["card-header-title"], props.header.title.classList)} ${this.setAnimation(props.header.title.animation)}>
                    ${props.header.title.text[this.state.context.lang]}
                    </p>
                </header>`:''}
                ${props.image?.src!=undefined?
                    `<div ${this.getClasses(["card-image"], props.image.classList)} ${this.setAnimation(props.image?.animation)}>
                        <figure class="image is-4by3">
                            <img src="${props.image.src}" ${props.image.alt!=undefined?`alt="${props.image.alt[this.state.context.lang]}"`:''} >
                        </figure>
                    </div>`
                    :''
                }
                ${props.content!=undefined?`<div ${this.getClasses(["card-content"], props.content.classList)} ${this.setAnimation(props.content.animation)}>
                        ${props.content.title!=undefined?`
                        <p ${this.getClasses(["title"], props.content.title.classList)}  ${this.setAnimation(props.content.title.animation)}>
                        ${props.content.title.text[this.state.context.lang]}
                        </p>`:''}
                        ${props.content.subtitle!=undefined?`
                        <p ${this.getClasses(["subtitle"], props.content.subtitle.classList)} ${props.content?.subtitle?.classList!= undefined?props.content.subtitle.classList:''}" ${this.setAnimation(props.content.subtitle.animation)}>
                        ${props.content.subtitle.text[this.state.context.lang]}
                        </p>`:''}
                        ${props.content.content!=undefined?`
                        <div ${this.getClasses(["content"], props.content.content.classList)}  ${props.content?.content?.classList!= undefined?props.content.content.classList:''}" ${this.setAnimation(props.content.content.animation)}>
                        ${props.content.content.text[this.state.context.lang]}
                        </div>`:''}
                    `:''}
                ${props.content!=undefined?
                    `</div>`:''}
                ${props.footer?.buttons!=undefined?`<footer ${this.getClasses(["card-footer"], props.footer.classList)} >
                    ${this.#getFooter(props.footer.buttons)}
                </footer>`:''}
            </div>
        </div>
        `;
        return card;
    }

    #getFooter(props){
        if(props!=undefined){
            let render = '';
            Object.entries(props).forEach(([key, value])=>{                
                render += `<a class="card-footer-item" href="${props[key]['href']}"  ${this.setAnimation(props[key]['animation'])}>
                    ${props[key]['text'][this.state.context.lang]}
                </a>`;
            });
            return render;
        }else return '';
    }

    #getCards(){        
        let cardsHtml = ``;
        if (this.state.cards!=undefined){
            this.state.cards.forEach(card => {
                cardsHtml+= this.#card(card);
            });
        }
        return cardsHtml;
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
            detail:{source:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        }
    }

    render(){
        this.innerHTML =  /* html */`
        <div ${this.getClasses(["section"], this.state.classList)}>
            ${this.getTitles(this.state)}
            <div class="columns is-multiline mx-4">
                ${this.#getCards()}
            </div>
        </div>`
        this.addEvents();
    }


}

customElements.define("cards-list", CardsList)
