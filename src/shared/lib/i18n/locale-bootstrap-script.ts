// Runs before the page is painted. Explicit choices always win over IP detection.
// Country lookup is only needed on RU URLs without an explicit preference.
export const localeBootstrapScript = String.raw`(function(){
  if(/^\/en(?:\/|$)/.test(location.pathname))return;
  var html=document.documentElement;
  var selected;
  try{selected=localStorage.getItem("portfolio-locale")}catch(e){}
  if(selected==="ru")return;

  var target="/en"+(location.pathname==="/"?"/":location.pathname)+location.search+location.hash;
  var redirect=function(){
    try{sessionStorage.setItem("portfolio-language-navigation",target)}catch(e){}
    location.replace(target);
  };
  if(selected==="en"){redirect();return}

  var detected;
  try{detected=sessionStorage.getItem("portfolio-auto-locale")}catch(e){}
  if(detected==="en"){redirect();return}
  if(detected==="ru")return;

  html.dataset.localePending="true";
  var settled=false;
  var controller=new AbortController();
  var timer;
  var finish=function(locale){
    if(settled)return;
    settled=true;
    clearTimeout(timer);
    controller.abort();
    try{sessionStorage.setItem("portfolio-auto-locale",locale)}catch(e){}
    if(locale==="en"){redirect();return}
    delete html.dataset.localePending;
    window.dispatchEvent(new Event("portfolio:locale-ready"));
  };
  var fallback=function(){
    var browserLocale=navigator.languages&&navigator.languages[0]||navigator.language||"ru";
    finish(/^ru(?:-|$)/i.test(browserLocale)?"ru":"en");
  };
  timer=setTimeout(fallback,2500);
  fetch("https://ipwho.is/?fields=success,country_code",{signal:controller.signal,cache:"no-store"})
    .then(function(response){if(!response.ok)throw new Error("Geo lookup unavailable");return response.json()})
    .then(function(data){
      if(data.success!==true||typeof data.country_code!=="string"||!(/^[a-z]{2}$/i).test(data.country_code))
        throw new Error("Country missing");
      finish(data.country_code.toUpperCase()==="RU"?"ru":"en");
    }).catch(function(){fallback()});
})();`;
