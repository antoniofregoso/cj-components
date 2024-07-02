import { AppElement } from "@buyerjourney/bj-core";
import { Remarkable } from "remarkable";

export class GoogleMap extends AppElement {
    #default = {
        alignment:"has-text-centered"
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
        /*var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=default';    
        document.head.appendChild(script);*/
        
        
        
    }

    static get observedAttributes() {
        return ["value", "alignment"];
      }
      
      attributeChangedCallback(name, old, now) {
        this.render()
      }

    async #initMap() {
        const position = { lat: -25.344, lng: 131.031 };
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
      


    render(){
        this.innerHTML =  /* html */`
        <div ${this.getClasses(["section"], this.state?.classList)}>   
        ${this.getTitles(this.state)}
        <div id="${this.state?.map!=undefined?this.state.map.id:`map`}">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.595423559352!2d-99.16149694955142!3d19.42987893519085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff2d7d734531%3A0xa76d76c498a8d698!2zQy4gTHVjZXJuYSA2MiwgSnXDoXJleiwgQ3VhdWh0w6ltb2MsIDA2NjAwIEp1w6FyZXosIENETVg!5e0!3m2!1ses-419!2smx!4v1710884526874!5m2!1ses-419!2smx" width="95%" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
            ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}   
        </div>`;
        this.addEvents();
}

}

customElements.define("google-map", GoogleMap)