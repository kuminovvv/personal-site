// Runs before the page is painted. Explicit choices always win over IP detection.
// Country lookup is only needed on legacy, unprefixed URLs without an explicit preference.
export const localeBootstrapScript = String.raw`(function(){
  if(/^\/(?:ru|en)(?:\/|$)/.test(location.pathname))return;
  var html=document.documentElement;
  var selected;
  try{selected=localStorage.getItem("portfolio-locale")}catch(e){}

  var redirect=function(locale){
    // Only the language switcher suppresses the intro on intentional RU/EN clicks.
    // Automatic country/preference redirects should keep the first EN entrance.
    location.replace("/"+locale+(location.pathname==="/"?"/":location.pathname)+location.search+location.hash);
  };
  if(selected==="en"||selected==="ru"){redirect(selected);return}

  var detected;
  try{detected=sessionStorage.getItem("portfolio-auto-locale")}catch(e){}
  if(detected==="en"||detected==="ru"){redirect(detected);return}

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
    redirect(locale);
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
