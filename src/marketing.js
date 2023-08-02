export function withGoogleAnalytics(tagId){
    let script = document.createElement('script');
    script.src =`https://www.googletagmanager.com/gtag/js?id=${tagId}`;
    script.async = true;
    let script2 =  document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());    
      gtag('config', '${tagId}');
    `
    document.head.appendChild(script);
    document.head.appendChild(script2);
}

export function withFacebookPixel(pixelId){
  let script = document.createElement('script');
  script.innerHTML = `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${pixelId}');
  fbq('track', 'PageView');
  `
  document.head.appendChild(script);
  let noScript = document.createElement('noscript');
  noScript.innerHTML = `
  <img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"
/>
  `
  document.head.appendChild(noScript);
}

export function withTwitterCard(props){
  const head = document.getElementsByTagName('head')[0];
    if (props.hasOwnProperty('card')){
      let meta = document.createElement('meta');
      meta.name = "twitter:card";
      meta.content = props.card;
      head.appendChild(meta);
    }
    if (props.hasOwnProperty('site')){
      let meta = document.createElement('meta');
      meta.name = "twitter:site";
      meta.content = props.site;
      head.appendChild(meta);
    }
    if (props.hasOwnProperty('creator')){
      let meta = document.createElement('meta');
      meta.name = "twitter:creator";
      meta.content = props.creator;
      head.appendChild(meta);
    }
    if (props.hasOwnProperty('title')){
      let meta = document.createElement('meta');
      meta.name = "twitter:title";
      meta.content = props.title;
      head.appendChild(meta);
    }
    if (props.hasOwnProperty('description')){
      let meta = document.createElement('meta');
      meta.name = "twitter:description";
      meta.content = props.description;
      head.appendChild(meta);
    }
    if (props.hasOwnProperty('image')){
      let meta = document.createElement('meta');
      meta.name = "twitter:image";
      meta.content = props.image;
      head.appendChild(meta);
    }     

}

export function withSchema(schema){
  var script = document.createElement("script");
  script.textContent = JSON.stringify(schema);
  script.type = "application/ld+json";
  document.head.appendChild(script);



}