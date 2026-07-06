import { render } from "preact";
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
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container py-4">
                    {this.getTitlesJSX()}
                    <div
                        class={this.getClassNames(["content"], this.state.content?.classList)}
                        {...this.getAnimationProps(this.state.content?.animation)}
                        dangerouslySetInnerHTML={{ __html: this.md.render(this.state.content?.text[this.state.context.lang]) }}
                    />
                    <div class="columns">
                        <div class="column">
                            <div class={this.getClassNames(["content"], this.state.leftColumn?.classList)} {...this.getAnimationProps(this.state.leftColumn?.animation)}>
                                <div dangerouslySetInnerHTML={{ __html: this.md.render(this.state.leftColumn?.text[this.state.context.lang]) }} />
                                {this.state.leftColumn?.buttons != undefined && this.buttonsRenderJSX(this.state.leftColumn.buttons)}
                            </div>
                        </div>
                        <div class="column">
                            <div class={this.getClassNames(["content"], this.state.rightColumn?.classList)} {...this.getAnimationProps(this.state.rightColumn?.animation)}>
                                <div dangerouslySetInnerHTML={{ __html: this.md.render(this.state.rightColumn?.text[this.state.context.lang]) }} />
                                {this.state.rightColumn?.buttons != undefined && this.buttonsRenderJSX(this.state.rightColumn.buttons)}
                            </div>
                        </div>
                    </div>
                    {this.state.buttons!=undefined && this.buttonsRenderJSX(this.state.buttons)}
                </div>
            </section>,
            this
        );
        this.addEvents();
    }

}

customElements.define("text-columns", TextColumns)
