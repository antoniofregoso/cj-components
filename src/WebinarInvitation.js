import { FunnelElement } from "./FunnelElement";

export class WebinarInvitation extends FunnelElement {

    #default = {}

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
    }

    handleEvent(event) {
        console.log('====', event.target.id)
        let eventName = ''; 
        if (event.type === "click") {
            if (event.target.id==="download-ical"){
                eventName = "funnel:iCal"
                const clickFunnel = new CustomEvent(eventName,{
                    detail:{iCal:'Downloaded'},
                    bubbles: true,
                    composed: true
                    });
                this.dispatchEvent(clickFunnel);
            }else
            {         
                if (this.state.iCal.button?.eventName===undefined){
                    eventName = "user:iCal"
                }else {
                    eventName = this.state.iCal.button.eventName
                }
                const clickFunnel = new CustomEvent(eventName,{
                    detail:{iCal:'Requested'},
                    bubbles: true,
                    composed: true
                    });
                this.dispatchEvent(clickFunnel);
            }
        }}

    addEvents(){
        let button = this.querySelector("button");
        button.addEventListener("click",this);
  } 
    

    

    date = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/></svg>`;
    duration = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/></svg>`;
    location = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`;
    ical = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>`;
    
    styleIcon(){
        let icons = this.querySelectorAll("svg");
        icons.forEach(icon => {
            icon.style.fill = this.state.icons.color;
        })
      }

    getDate(){
        let optionsDate = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        let date = new Date(this.state.date);
        console.log(this.state.context.lang, optionsDate)
        let webinarDate = date.toLocaleString(this.state.context.lang, optionsDate);
        return webinarDate
    }

    generateICal() {
        let eventName = this.state.iCal?.name[this.state.context.lang]!=undefined?this.state.iCal.name[this.state.context.lang]:'';
        let eventDescription = this.state.iCal?.description[this.state.context.lang]!=undefined?this.state.iCal.description[this.state.context.lang]:'';
        let startDate = new Date(this.state.date);
        let endDate =   new Date(this.state.date);
        if (this.state.durationH!=undefined){
            endDate.setHours(startDate.getHours()+ this.state.durationH)
        }
        if (this.state.durationM!=undefined){
            endDate.setMinutes(startDate.getMinutes()+ this.state.durationM)
        }
        let iCalContent = 
        "BEGIN:VCALENDAR\n" +
        "VERSION:2.0\n" +
        "PRODID:-//My Company//EN\n" +
        "BEGIN:VEVENT\n" +
        "UID:" + 'rdxFunnels-' + Math.floor(Math.random() * 10000) + "\n" +
        "DTSTAMP:" + this.#generateDateTimeStamp() + "\n" +
        "DTSTART:" + this.#formatDate(startDate) + "\n" +
        "DTEND:" + this.#formatDate(endDate) + "\n" +
        "SUMMARY:" + eventName + "\n" +
        "DESCRIPTION:" + eventDescription + "\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR";
        this.#downloadICal(iCalContent);
    }

    #generateDateTimeStamp(){
        var now = new Date();
        var year = now.getUTCFullYear();
        var month = this.#padNumber(now.getUTCMonth() + 1);
        var day = this.#padNumber(now.getUTCDate());
        var hours = this.#padNumber(now.getUTCHours());
        var minutes = this.#padNumber(now.getUTCMinutes());
        var seconds = this.#padNumber(now.getUTCSeconds());
      
        return year + month + day + "T" + hours + minutes + seconds + "Z";
    }

    #padNumber(number){
        return String(number).padStart(2, "0");
    }

    #formatDate(date){
        var year = date.getUTCFullYear();
        var month = this.#padNumber(date.getUTCMonth() + 1);
        var day = this.#padNumber(date.getUTCDate());
        var hours = this.#padNumber(date.getUTCHours());
        var minutes = this.#padNumber(date.getUTCMinutes());
        var seconds = this.#padNumber(date.getUTCSeconds());
      
        return year + month + day + "T" + hours + minutes + seconds + "Z";
    }

    #downloadICal(content){
        var filename = "evento.ics";      
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/calendar;charset=utf-8," + encodeURIComponent(content));
        element.setAttribute("download", filename);
        element.setAttribute("id", "download-ical");
        element.style.display = "none";
        document.body.appendChild(element);
        element.addEventListener("click",this);
        element.click();
        document.body.removeChild(element);

    }

    render(){this.innerHTML =  /* html */`
        ${this.state.title!=undefined||this.state.subtitle!=undefined?`
        <div ${this.getClasses(["content"], this.state.title?.classList)}>        
            ${this.state.title?.text[this.state.context.lang]!=undefined?`
            <h1 ${this.getClasses([], this.state.title?.classList)}  ${this.setAnimation(this.state.title.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
            ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
            <h2 ${this.getClasses([], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2">`:``}
        </div>`:''}
        <div ${this.getClasses(["level"], this.state.level?.classList)} ${this.setAnimation(this.state.level.animation)}>
            <div class="level-item has-text-centered">
            <div>
                <p class="title" ${this.setAnimation(this.state.icons.animation)}>${this.date}</p>
                <p class="heading">${this.getDate()}</p>
            </div>
            </div>
            <div class="level-item has-text-centered">
            <div>
                <p class="title" ${this.setAnimation(this.state.icons.animation)}>${this.duration}</p>
                <p class="heading">2 horas</p>
            </div>
            </div>
            <div class="level-item has-text-centered">
            <div>
                <p class="title" ${this.setAnimation(this.state.icons.animation)}>${this.location}</p>
                <p class="heading">${this.state.location!=undefined?this.state.location:'online'}</p>
            </div>
            </div>
            <div class="level-item has-text-centered">
            <div>
                <p class="title" ${this.setAnimation(this.state.icons.animation)}>${this.ical}</p>
                <p class="heading"><button id="btn-${this.state.id}" ${this.getClasses(["button"], this.state.iCal?.button?.classList)} >iCal</button></p>
            </div>
            </div>
      </div>        
        `
        this.styleIcon();
        this.addEvents();
    }
}

customElements.define("webinar-invitation", WebinarInvitation)