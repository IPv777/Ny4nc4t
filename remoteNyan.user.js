// ==UserScript==
// @name         remoteNyan
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Charge et execute nyan.js distant
// @author       Shuunen
// @match        https://astektv.groupeastek.com/*
// @grant        none
// ==/UserScript==





function loadScript(url, callback){

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

loadScript("https://cdn.jsdelivr.net/gh/IPv777/Ny4nc4t/nyan.user.js", function(){});
