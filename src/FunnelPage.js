import { FunnelElement } from "./FunnelElement";

export class FunnelPage extends FunnelElement {

    #default = {
      classList:[]
    };
    components = [];

    constructor(props){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setSEO();
        this.setStyles();
        if (this.state.noCache===true){
          this.setCache();
        }
    }

    setCache(){
      let head = document.getElementsByTagName('head')[0];
      let cacheControl = document.createElement('meta');
      cacheControl.name = "Cache-Control";
      cacheControl.content = "no-cache, no-store, must-revalidate";
      head.appendChild(cacheControl);
      let pragma = document.createElement('meta');
      pragma.name = "Pragma";
      pragma.content = "no-cache";
      head.appendChild(pragma);
      let expires = document.createElement('meta');
      expires.name = "Expires";
      expires.content = "0";
      head.appendChild(expires);
    }

    setSEO(){
      let head = document.getElementsByTagName('head')[0];
      if (document.title!=undefined){
        document.title = this.state.title[this.state.context.lang]
        let description = document.querySelector("meta[name=description]")
        if (description===null){
          let meta = document.createElement('meta');
          meta.name = "description";
          meta.content = this.state.description[this.state.context.lang];
          head.appendChild(meta);
        }else {
          description.content = this.state.description[this.state.context.lang];
        }
        let metaTitle = document.createElement('meta');
        metaTitle.setAttribute('property', 'og:title')
        metaTitle.content = this.state.title[this.state.context.lang]
        head.appendChild(metaTitle);
        let metaDescription = document.createElement('meta');
        metaDescription.setAttribute('property', 'og:description')
        metaDescription.content = this.state.description[this.state.context.lang];
        head.appendChild(metaDescription);
        let metaType = document.createElement('meta');
        metaType.setAttribute('property', 'og:type')
        metaType.content = this.state.type;
        head.appendChild(metaType);
        let metaImage = document.createElement('meta');
        metaImage.setAttribute('property', 'og:image')
        metaImage.content = this.state.image;
        head.appendChild(metaImage);
        let twitterCard = document.createElement('meta');
        twitterCard.name = "twitter:card";
        twitterCard.content = "summary_large_image";
        head.appendChild(twitterCard);
        let twitterTitle = document.createElement('meta');
        twitterTitle.name = "twitter:title";
        twitterTitle.content = this.state.title[this.state.context.lang];
        head.appendChild(twitterTitle);
        let twitterDescription = document.createElement('meta');
        twitterDescription.name = "twitter:description";
        twitterDescription.content = this.state.title[this.state.context.lang];
        head.appendChild(twitterDescription);
        let twitterImage = document.createElement('meta');
        twitterImage.name = "twitter:image";
        twitterImage.content = this.state.image;
        head.appendChild(twitterImage);
      }
    }

    setStyles(){
      if (this.state.classList.length > 0){
        document.body.classList.add(...this.state.classList);
      }
    }
   

    setContext(props,context={}){
        if (props!=undefined){
          props.context = context;
        } 
        return props;
    }

    getLang(){
      if (navigator.languages != undefined) 
        return navigator.languages[0].substring(0,2)
      return navigator.language.substring(0,2)
  }

    diffState(previousState, currentState) {
        const diff = {};
        
        for (let key in previousState) {
          if (previousState[key] !== currentState[key]) {
            diff[key] = [previousState[key], currentState[key]];
          }
        }
        
        for (let key in currentState) {
          if (currentState[key] !== previousState[key]) {
            diff[key] = [previousState[key], currentState[key]];
          }
        }
        
        return diff;
      }


    componentsAdd(...components){   
      this.components = this.components.concat(components);
      document.querySelector('#app').appendChild(this);
      let loading = document.querySelector('.pageloader');
      if (loading!=null){
        loading.classList.remove('is-active');
      }
    }


    #appendChilds(){
        this.components.forEach(el=>{            
            this.appendChild(el)
        })
    }



    render(){
        this.#appendChilds() 
    }
       
}

customElements.define("funnel-page", FunnelPage)