import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";

export class CardsList extends AppElement {
    #default = {
        cardsWidth:"is-4",
        context:{
            lang:"en"
        },
        footer:{
            eventName:"user:click-cards-list"
        }
    };

    constructor(props={}){
        super();
        this.eventName = "user:click-cards-list";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    #card(props, key){
        return (
            <div class={`column ${this.state.cardsWidth}`} key={key}>
                <div class={this.getClassNames(["card"], props.classList)} {...this.getAnimationProps(props.animation)}>
                    {props.header?.text!=undefined &&
                        <header class={this.getClassNames(["card-header"], props.header?.classList)} {...this.getAnimationProps(props.header?.animation)}>
                            <p class="card-header-title">
                                {props.header.text[this.state.context.lang]}
                            </p>
                        </header>
                    }
                    {props.image?.src!=undefined &&
                        <div class="card-image" {...this.getAnimationProps(props.image?.animation)}>
                            <figure class={this.getClassNames(["image"], props.image.classList)}>
                                <img src={props.image.src} alt={props.image.alt!=undefined?props.image.alt[this.state.context.lang]:undefined} />
                            </figure>
                        </div>
                    }
                    {props.content!=undefined &&
                        <div class={this.getClassNames(["card-content"], props.content.classList)} {...this.getAnimationProps(props.content.animation)}>
                            {props.content.title?.text[this.state.context.lang]!=undefined &&
                                <p class={this.getClassNames(["title"], props.content.title.classList)} {...this.getAnimationProps(props.content.title.animation)}>
                                    {props.content.title.text[this.state.context.lang]}
                                </p>
                            }
                            {props.content.subtitle?.text[this.state.context.lang]!=undefined &&
                                <p class={this.getClassNames(["subtitle"], props.content.subtitle.classList)} {...this.getAnimationProps(props.content.subtitle.animation)}>
                                    {props.content.subtitle.text[this.state.context.lang]}
                                </p>
                            }
                            {props.content.description?.text[this.state.context.lang]!=undefined &&
                                <div
                                    class={this.getClassNames(["content"], props.content.description?.classList)}
                                    {...this.getAnimationProps(props.content.description?.animation)}
                                    dangerouslySetInnerHTML={{ __html: this.md.render(props.content.description.text[this.state.context.lang]) }}
                                />
                            }
                        </div>
                    }
                    {props.footer?.buttons!=undefined &&
                        <footer class={this.getClassNames(["card-footer"], props.footer.classList)} {...this.getAnimationProps(props.footer.animation)}>
                            {this.#getFooter(props.footer.buttons)}
                        </footer>
                    }
                </div>
            </div>
        );
    }

    #getFooter(props){
        if (props===undefined) return [];
        return props.map((el, i) => el.href!=undefined
            ? <a key={i} href={el.href} class={`card-footer-item ${el.classList!=undefined?el.classList:''}`}>{el.text[this.state.context.lang]}</a>
            : <button key={i} id={el?.id} class={`card-footer-item button ${el.classList!=undefined?el.classList:''}`}>{el.text[this.state.context.lang]}</button>
        );
    }

    #getCards(){
        if (this.state.cards==undefined) return [];
        return this.state.cards.map((card, i) => this.#card(card, i));
    }

    render(){
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container py-4">
                    {this.getTitlesJSX()}
                    <div class="columns is-multiline mx-4 is-centered">
                        {this.#getCards()}
                    </div>
                    {this.state.buttons!=undefined && this.buttonsRenderJSX(this.state.buttons)}
                </div>
            </section>,
            this
        );
        this.addEvents();
    }


}

customElements.define("cards-list", CardsList)
