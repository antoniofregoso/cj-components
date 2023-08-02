export class NotFoundElement extends HTMLElement {
    

    constructor(){
        super();
    }

    render(){
        this.innerHTML =  /* html */`
        <section class="hero is-fullheight is-brand-blue">
        <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
            <a class="navbar-item">
              <img src="https://docs-conference.s3.us-east-2.amazonaws.com/images/big_ventas.png" width="180" height="28">
            </a>
            </div>
          </div>
        </div>
        </div>
        <div class="hero-body">
          <div class="container has-text-centered has-text-light">
            <p class="title has-text-light">
              404
            </p>
            <p class="subtitle has-text-light">
            La URL solicitada no se encuentra en este servidor.
            </p>
          </div>
        </div>
      </section>
        `
    }

    connectedCallback(){
        this.render();
    }
}

customElements.define("not-found-element", NotFoundElement)
