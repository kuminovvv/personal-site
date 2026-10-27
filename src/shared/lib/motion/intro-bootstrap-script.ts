// Make the project entrance immediately accessible, even before hydration.
export const introBootstrapScript = String.raw`(function(){
  var finish=function(element){
    element.getAnimations().forEach(function(animation){
      if(animation.animationName==="projects-assemble"||animation.animationName==="intro-line")animation.cancel();
    });
  };
  document.addEventListener("focusin",function(event){
    var target=event.target.closest("[data-project-intro]");
    if(target)finish(target);
  });
  document.addEventListener("click",function(event){
    var anchor=event.target.closest("a[href]");
    if(!anchor||anchor.hash!=="#projects"||anchor.origin!==location.origin||anchor.pathname!==location.pathname)return;
    var section=document.getElementById("projects");
    if(section)section.querySelectorAll("[data-project-intro]").forEach(finish);
  });
})();`;
