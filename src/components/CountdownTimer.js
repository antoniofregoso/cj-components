import { AppElement } from "@buyerjourney/bj-core";

export class CountdownTimer extends AppElement {

    #default = {
        withContainer:true,
        value:"running",
        count:{
            days:0,
            hours:0,
            minutes:0,
            seconds:0
        },
        days:{
            text:{
                es:"días",
                en:"days",
                fr:"jours"
            } 
        },
        hours:{
            text:{
                es:"horas",
                en:"hours",
                fr:"heures"
            } 
        },
        minutes:{
            text:{
                es:"minutos",
                en:"minutes",
                fr:"minutes"
            } 
        },
        seconds:{
            text:{
                es:"segundos",
                en:"seconds",
                fr:"secondes"
            } 
        },
        message:{
            text:{
                en:"We are very sorry. The promotion has expired"
            }
        }};

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("value",this.state.value);
        const presentDate = new Date();
        const presentTime = presentDate.getTime();
        const dueDate = new Date(this.state.dueDate);
        this.timeRemaining = dueDate - presentTime;
        this.start()
    }



    static get observedAttributes() { return ['value']; }

    attributeChangedCallback(name, old, now) {
        this.state.value = this.attribute2CamelCase(now);
        this.render()
    }

    getTime() {
        return {
            days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
            hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
            minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
            seconds: Math.floor(this.timeRemaining / 1000) % 60
        };
    }

    update(){
        this.state.count = this.getTime();
        this.render();
    }

    start(){
        if (this.timeRemaining > 0){
        let intervalId = setInterval(() => {
            let eventName;
            this.timeRemaining-=1000;
            if (0>this.timeRemaining){
                this.setAttribute("value",'timed-out');
                if(this.state.eventName===undefined){
                    eventName = "timer:time-out"
                  }else {
                    eventName = this.state.eventName
                  }
                  const timeOut = new CustomEvent(eventName,{
                    detail:{timeOut:this.id},
                    bubbles: true,
                    composed: true
                });
                clearInterval(intervalId);
                this.dispatchEvent(timeOut);
            }else{
                this.update()
            }
        }, 1000)
        }else {
            this.state.count = {
                days:0,
                hours:0,
                minutes:0,
                seconds:0
            }
            this.render();
        }
    }

    render(){
        this.innerHTML =  /* html */`
            <div ${this.getClasses(["content"], this.state.classList)}>
                ${this.state.title?.text[this.state.context.lang]!=undefined?`
                <h1 ${this.getClasses([], this.state.title?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.title.text[this.state.context.lang]}</h1>`:``}
                ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
                <h2 ${this.getClasses([], this.state.subtitle?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.subtitle.text[this.state.context.lang]}</h2>`:``}
                ${this.state.description?.text[this.state.context.lang]!=undefined?`
                <p ${this.getClasses([], this.state.description?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.description.text[this.state.context.lang]}</p>`:``}
            </div>
            <div class="columns is-centered">
                <div class="column is-4">
                    <div class="level is-mobile" ${this.setAnimation(this.state.animation)}>
                        <div class="level-item has-text-centered">
                            <div>
                            <p class="title">${this.state.count?.days===undefined?0:this.state.count.days}</p>
                            <p class="heading">${this.state.days?.text[this.state.context.lang]!=undefined?this.state.days.text[this.state.context.lang]:`days`}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                            <p class="title">${this.state.count?.hours===undefined?0:this.state.count.hours}</p>
                            <p class="heading">${this.state.hours?.text[this.state.context.lang]!=undefined?this.state.hours.text[this.state.context.lang]:`hours`}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                            <p class="title">${this.state.count?.minutes===undefined?0:this.state.count.minutes}</p>
                            <p class="heading">${this.state.minutes?.text[this.state.context.lang]!=undefined?this.state.minutes.text[this.state.context.lang]:`minutes`}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                            <p class="title" >${this.state.count?.seconds===undefined?0:this.state.count.seconds}</p>
                            <p class="heading">${this.state.seconds?.text[this.state.context.lang]!=undefined?this.state.seconds.text[this.state.context.lang]:`seconds`}</p>
                            </div>
                        </div>
                    </div>
                    <div class="notification has-text-centered ${this.state.message.color} ${this.state.value==='timedOut'?'':'is-hidden'}" ${this.setAnimation(this.state.message.animation)}>
                        ${this.state.message.text[this.state.context.lang]}
                    </div>
                </div>
            </div>
        `    }

}

customElements.define("countdown-timer", CountdownTimer)