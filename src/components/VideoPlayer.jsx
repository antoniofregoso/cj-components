import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";

export class VideoPlayer extends AppElement {

    #default = {
        message:{
            es:"Su navegador no soporta la etiqueta de vídeo.",
            en:"Your browser does not support the video tag.",
            fr:"Votre navigateur ne prend pas en charge la balise vidéo."
        },
        context:{
            lang:"en"
        }
    }

    constructor(props={}){
        super();
        this.eventName = "user:click-video-player";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    #detectVideoSource(url){
        if (typeof url === 'string'){
            if (url.includes('vimeo')){
                return 'vimeo';
            }else if(url.includes('youtube.com/embed')){
                return 'youtube';
            }else if(url.includes('youtu.be')){
                return 'youtu.be';
            }else if(/\.(mp4|webm|ogg)(\?|$)/i.test(url)){
                return 'html5';
            }
            else {
                return 'not supported';
            }
        }
    }


    #getIframe(src){
        let videoSrc = this.#detectVideoSource(src);
        var iframe = '';
        if ( videoSrc==='vimeo'){
            let videoId = src.split('/').pop().split('?')[0];
            src = `https://player.vimeo.com/video/${videoId}`;
            iframe = `<iframe class="has-ratio" src="${src}" width="100%" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        } else if (videoSrc==='youtube'){
            iframe = `<iframe class="has-ratio"  width="100%" height="315"  src="${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        } else if (videoSrc==='youtu.be'){
            //convert youtu.be to youtube embed
            let videoId = src.split('/').pop().split('?')[0];
            let embedSrc = `https://www.youtube.com/embed/${videoId}`;
            iframe = `<iframe class="has-ratio"  width="100%" height="315" src="${embedSrc}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        } else if(videoSrc==='html5'){
            iframe = `<video class="has-ratio"  width="100%" height="315" controls autoplay><source src="${src}" type="video/mp4"></video>`
        } else {
            iframe = "Video source not supported"
        }
        return iframe;
    }

    render(){
        render(
            <section class={this.getClassNames(["section"], this.state?.classList)} {...this.getAnimationProps(this.state.animation)} style={this.getBackgroundStyle()}>
                <div class="container p-4">
                    {this.getTitlesJSX()}
                    <div class="columns is-centered">
                        <div class={`column ${this.state.image?.size!=undefined?this.state.video.size:'is-10'}`}>
                            <figure
                                class={this.getClassNames(["image"], this.state.video?.classList)}
                                {...this.getAnimationProps(this.state.video?.animation)}
                                dangerouslySetInnerHTML={{ __html: this.#getIframe(this.state.video?.src) }}
                            />
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
    }

}

customElements.define("video-player", VideoPlayer)
