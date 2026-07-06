import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import SimpleParallax from "simple-parallax-js/vanilla";
import { Remarkable } from "remarkable";

export class ImageBanner extends AppElement {
    #default = {
        context:{
          lang:"en"
      }

    };

    constructor(props={}){
        super();
        this.eventName = "user:click-image-banner";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }




    render(){
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container py-4">
                    {this.getTitlesJSX()}
                    <div class="columns is-centered">
                        <div class={`column ${this.state.image?.size!=undefined?this.state.image.size:'is-6'}`}>
                            <figure class={this.getClassNames(["image"], this.state.image?.classList)} {...this.getAnimationProps(this.state.image?.animation)}>
                                <img src={this.state.image?.src} />
                            </figure>
                            {this.state.description?.text[this.state.context.lang]!=undefined &&
                                <div
                                    class={this.getClassNames(["content"], this.state.description?.classList)}
                                    {...this.getAnimationProps(this.state.description?.animation)}
                                    dangerouslySetInnerHTML={{ __html: this.md.render(this.state.description?.text[this.state.context.lang]) }}
                                />
                            }
                            {this.state.buttons!=undefined && this.buttonsRenderJSX(this.state.buttons)}
                        </div>
                    </div>
                </div>
            </section>,
            this
        );
        this.addEvents();
        if(this.state.image?.paralax!=undefined){
            var image = this.querySelector('img')
            new SimpleParallax(image,this.state.image.paralax)
        }
    }


}

customElements.define("image-banner", ImageBanner)
