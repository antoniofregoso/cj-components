import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import SimpleParallax from "simple-parallax-js/vanilla";
import { Remarkable } from "remarkable";

export class ImageText extends AppElement {

    #default = {
        imagePosition:"left",
        imageWidth:"is-half",
        textWidth:"",
        context:{
        lang:"en"
        }
    };

    constructor(props={}){
        super();
        this.eventName = "user:click-image-text";
        this.state =this.initState(this.#default,props);
        this.md = new Remarkable();
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("img-pos",this.state.imagePosition);
        this.setAttribute("text-width",this.state.textWidth);
        this.setAttribute("img-width",this.state.imageWidth);
    }

    static get observedAttributes() {
        return ["text-width", "img-width", "img-pos"];
    }

    attributeChangedCallback(name, old, now) {
        this.render()
    }



    render(){
        const img = (
            <div class={this.getClassNames(["column"], [this.state.imageWidth])}>
                <figure class={this.getClassNames(["image"], this.state.image?.classList)} {...this.getAnimationProps(this.state.image?.animation)}>
                    <img src={this.state.image?.src} style={this.state.image?.filter ? `filter: ${this.state.image?.filter};` : undefined} />
                </figure>
            </div>
        );
        const text = (
            <div class={this.getClassNames(["column"], [this.state.textWidth])}>
                <div class="p-4">
                    {this.state.description?.text[this.state.context.lang]!=undefined &&
                        <div
                            class={this.getClassNames(["content"], this.state.description?.classList)}
                            {...this.getAnimationProps(this.state.description?.animation)}
                            dangerouslySetInnerHTML={{ __html: this.md.render(this.state.description?.text[this.state.context.lang]) }}
                        />
                    }
                    {this.state.description?.buttons!=undefined && this.buttonsRenderJSX(this.state.description.buttons)}
                </div>
            </div>
        );
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container py-4">
                    {this.getTitlesJSX()}
                    <div class="columns is-vcentered is-centered is-gapless my-0">
                        {this.state.imagePosition==='right' ? text : img}
                        {this.state.imagePosition==='right' ? img : text}
                    </div>
                    {this.state.buttons!=undefined && this.buttonsRenderJSX(this.state.buttons)}
                </div>
            </section>,
            this
        );
        this.addEvents()
        if(this.state.image?.paralax!=undefined){
            var image = this.querySelector('img')
            new SimpleParallax(image,this.state.image.paralax)
        }
    }


}

customElements.define("image-text", ImageText)
