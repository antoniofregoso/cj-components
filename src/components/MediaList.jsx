import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";

export class MediaList extends AppElement {

    #default = {
      mediaObjects:{
        classList:["is-6"]
      },
      context:{
        lang:"en"
    }
        };

    constructor(props={}){
        super();
        this.eventName = "user:click-media-list"
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }


    handleEvent(event) {
              if (event.type === "click") {
                  let eventName;
                  if(this.state.buttons.eventName===undefined){
                    eventName = "user:click-image-text"
                  }else {
                    eventName = this.state.buttons.eventName
                  }
                  const clickFunnel = new CustomEvent(eventName,{
                  detail:{source:event.target.id},
                  bubbles: true,
                  composed: true
              });
              this.dispatchEvent(clickFunnel);
              }
          }


    #mediaObject(props, key) {
      return (
        <article class={this.getClassNames(["media", "pt-4"], this.state.mediaObjects?.classList)} {...this.getAnimationProps(this.state.mediaObjects?.animation)} key={key}>
            {props.imageL?.src!=undefined &&
                <figure class="media-left">
                    <p class="image is-64x64">
                        <img src={props.imageL.src} />
                    </p>
                </figure>
            }
            <div class="media-content">
                <div class="content">
                    <p>
                        {props.title?.text[this.state.context.lang]!=undefined &&
                            <>
                                <span class={this.getClassNames([], props.title?.classList)}>{props.title.text[this.state.context.lang]}</span><br />
                            </>
                        }
                        {props.description?.text[this.state.context.lang]!=undefined &&
                            <span dangerouslySetInnerHTML={{ __html: this.md.render(props.description.text[this.state.context.lang]) }} />
                        }
                    </p>
                </div>
            </div>
            {props.imageR?.src!=undefined &&
                <figure class="media-right">
                    <p class="image is-64x64">
                        <img src={props.imageR.src} />
                    </p>
                </figure>
            }
        </article>
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
                    <div class="columns is-centered">
                        <div class={this.getClassNames(["column"], [this.state.mediaObjects?.width])}>
                            {this.#getItems()}
                            {this.state.buttons!=undefined && this.buttonsRenderJSX(this.state.buttons)}
                        </div>
                    </div>
                </div>
            </section>,
            this
        );
        this.addEvents()
    }


}

customElements.define("media-list", MediaList)
