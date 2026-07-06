import { render } from "preact";
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

    #mediaObject(props, key) {
        return (
            <div class="cell" key={key}>
                <div class={this.getClassNames(["media"], this.state.mediaObjects?.classList)} {...this.getAnimationProps(this.state.mediaObjects?.animation)}>
                    {props.imageL?.src!=undefined &&
                        <figure class="media-left">
                            <p class="image is-64x64">
                                <img src={props.imageL.src} />
                            </p>
                        </figure>
                    }
                    <div class="media-content">
                        <div class={this.getClassNames(["content"], props.description?.classList)}>
                            {props.description?.text[this.state.context.lang]!=undefined &&
                                <span dangerouslySetInnerHTML={{ __html: this.md.render(props.description.text[this.state.context.lang]) }} />
                            }
                        </div>
                    </div>
                    {props.imageR?.src!=undefined &&
                        <figure class="media-right">
                            <p class="image is-64x64">
                                <img src={props.imageR.src} />
                            </p>
                        </figure>
                    }
                </div>
            </div>
        );
    }

    #getItems(){
        if (this.state.mediaObjects?.items==undefined) return [];
        return this.state.mediaObjects.items.map((el, i) => this.#mediaObject(el, i));
    }

    render(){
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container my-4">
                    {this.getTitlesJSX()}
                    <div class={this.getClassNames(["fixed-grid"], this.state?.grid?.classList)}>
                        <div class="grid">
                            {this.#getItems()}
                        </div>
                    </div>
                    {this.state.buttons!=undefined && this.buttonsRenderJSX(this.state.buttons)}
                </div>
            </section>,
            this
        );
        this.addEvents()
    }

}

customElements.define("media-grid", MediaGrid)
