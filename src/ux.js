export function whithAnimations(){
    let objs = document.querySelectorAll('[data-animation]')
    let options = { threshold: 0.1}   
    var observer = new IntersectionObserver(entries=>{
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setupAnimation(entry.target)
                return
            }
            entry.target.classList.forEach(_class => {
                if (_class.startsWith('animate__')){
                    entry.target.classList.remove(_class)
                }
            })
        })
    })
    objs.forEach(obj => {
        observer.observe(obj);
    })
}

function setupAnimation(el){
    var animation =' animate__animated animate__'.concat(el.getAttribute('data-animation'))
    if (el.hasAttribute('data-delay')){
        animation = animation.concat(' animate__delay-', el.getAttribute('data-delay'))
    }
    if (el.hasAttribute('data-speed')){
        animation = animation.concat(' animate__', el.getAttribute('data-speed'))
    }
    if (el.hasAttribute('data-repeat')){
        el.getAttribute('data-repeat') === "infinite"?animation = animation.concat('animate__infinite'):animation = animation.concat(' animate__repeat-', el.getAttribute('data-repeat'))
    }        
    el.className = el.className.concat(animation)
    
}

export function getLang(){
    if (navigator.languages != undefined) 
      return navigator.languages[0].substring(0,2)
    return navigator.language.substring(0,2)
}

export function loading(props){
    let directions = ["is-bottom-to-top", "is-right-to-left", "is-left-to-right"];
    let dir = directions.find(el=>el==props.direction)
    document.body.innerHTML += `<div class="pageloader ${props?.color!=undefined?props.color:`is-light`} ${dir!=undefined?dir:''} is-active"><span class="title">Pageloader</span></div>`;
}

