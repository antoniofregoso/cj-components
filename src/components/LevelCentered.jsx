import { render } from "preact";
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
        if (!(this.state.items?.length>0)) return [];
        return this.state.items.map((item, i) => (
            <div class="level-item has-text-centered" key={i}>
                <div>
                    {item.icon?.name!=undefined &&
                        <div
                            class={this.getClassNames(["icon", "title"], item.icon?.classList)}
                            {...this.getAnimationProps(item.icon?.animation)}
                            dangerouslySetInnerHTML={{ __html: this.#getIcon(item.icon.prefix, item.icon.name) }}
                        />
                    }
                    {item.image?.src!=undefined &&
                        <figure class={this.getClassNames(["image"], item.image?.classList)}>
                            <img src={item.image.src} />
                        </figure>
                    }
                    {item.heading!=undefined &&
                        <p class={this.getClassNames(["heading"], item.heading?.classList)} {...this.getAnimationProps(item.heading?.animation)}>
                            {item.heading?.text[this.state.context.lang]!=undefined ? item.heading.text[this.state.context.lang] : ''}
                        </p>
                    }
                    {item.title!=undefined &&
                        <p class={this.getClassNames(["title"], item.title?.classList)} {...this.getAnimationProps(item.title?.animation)}>
                            {item.title?.text[this.state.context.lang]!=undefined ? item.title.text[this.state.context.lang] : ''}
                        </p>
                    }
                </div>
            </div>
        ));
    }


    render(){
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container my-4">
                    {this.getTitlesJSX()}
                    <nav class={this.getClassNames(["level"])}>
                        {this.#getItems()}
                    </nav>
                </div>
            </section>,
            this
        );
    }

}

customElements.define("level-centered", LevelCentered)
