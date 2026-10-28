// Legacy URLs choose a language before paint, without waiting for the network.
// Explicit localized URLs and saved choices take priority over browser language.
export const localeBootstrapScript = String.raw`(function(){
  if(/^\/(?:ru|en)(?:\/|$)/.test(location.pathname))return;
  var selected;
  try{selected=localStorage.getItem("portfolio-locale")}catch(e){}
  var browserLocale=navigator.languages&&navigator.languages[0]||navigator.language||"ru";
  var locale=selected==="ru"||selected==="en"?selected:(/^ru(?:-|$)/i.test(browserLocale)?"ru":"en");
  location.replace("/"+locale+(location.pathname==="/"?"/":location.pathname)+location.search+location.hash);
})();`;
