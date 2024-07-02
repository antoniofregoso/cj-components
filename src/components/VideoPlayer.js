import { AppElement } from "@buyerjourney/bj-core";

export class VideoPlayer extends AppElement {

    #default = {
        message:{
            es:"Su navegador no soporta la etiqueta de vídeo.",
            en:"Your browser does not support the video tag.",
            fr:"Votre navigateur ne prend pas en charge la balise vidéo."
        },
        video:{
            src:"https://youtu.be/SPq18c0O7xg"
        }

    }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("alignment",this.state.alignment);
        this.state.videoSource = this.#detectVideoSource(this.state.video.src);
    }

    #detectVideoSource(url){
        if (typeof url === 'string'){
            if (Number.isNaN(parseInt(url))===false){
                return 'vimeo'
            }else if(url.includes('youtu.be')){
                return 'youtube'
            }
        }
        else if (Array.isArray(url)){
            return 'other'
        }else return ''
    }

    #getSources(){
        let sources = '';
        this.state.video.src.forEach(source=>{
            let type = source.split('.').pop();
            sources += `<source src="${source}" type="video/${type}">`;
        })
        return sources;
    }

    addEvents(){

    }

    handleEvents(event){

    }

    render(){
        this.innerHTML=/* html */`
        ${this.state.title!=undefined||this.state.subtitle!=undefined?`
        <div ${this.getClasses(["content"], this.state.title?.classList)}>
        ${this.state.title?.text[this.state.context.lang]!=undefined?`<h1 class="${this.state.title?.classList!=undefined?this.state.title.classList:'is-size-2'}" ${this.setAnimation(this.state.title.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
        ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`<h2 class="${this.state.subtitle?.classList!=undefined?this.state.subtitle.classList:'is-size-3'}" ${this.setAnimation(this.state.subtitle.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2">`:``}
        </div>`:''}
        <div class="columns is-centered">
            <div ${this.getClasses(["column"], this.state.video?.classList)}>
                <figure class="image is-16by9">
                    ${this.state.videoSource==='youtube'?
                    `<iframe class="has-ratio" width="560" height="315" 
                        src="https://www.youtube.com/embed/${this.state.video.src.slice(-11)}" 
                        title="YouTube video player" frameborder="0" allow="accelerometer; 
                        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                    </iframe>`:this.state.videoSource==='vimeo'?
                    `<iframe class="has-ratio" src="https://player.vimeo.com/video/${this.state.video.src}" width="560" height="315" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`
                    :
                    `<video class="has-ratio" width="560" height="315" controls>
                        ${this.#getSources()}
                        ${this.state.message[this.state.context.lang]}
                    </video>`}
                </figure>
            </div>
        </div>
        `

    }

}

customElements.define("video-player", VideoPlayer)
