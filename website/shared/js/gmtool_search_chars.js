var currentlySearching=false;var searchAgain=false;function performSearch(){if(!currentlySearching){currentlySearching=true}else{searchAgain=true;return}var b="state="+$("status").value;b+="&race="+$("race").value;b+="&sex="+$("sex").value;b+="&online="+$("online").value;b+="&server="+$("server").value;b+="&search="+encodeURIComponent($("search").value);b+="&acc="+($("search_in_account").checked?"1":"0");b+="&email="+($("search_in_email").checked?"1":"0");b+="&char="+($("search_in_char").checked?"1":"0");$("search_title").setStyle({background:"#000 url("+url+"/shared/pics/ajax-loading-small.gif) no-repeat scroll 2px 2px"});var a=new Ajax.Request(url+"/illarion/gmtool/ajax_search_chars.php",{method:"post",parameters:b,evalJS:false,onComplete:function(c){var d=$("output_area");if(Object.isUndefined(c.responseXML)){addOrReplaceChild(d,document.createTextNode("Error - Invalid XML"))}else{addOrReplaceChild(d,parseResponse(c.responseXML))}currentlySearching=false;if(searchAgain){searchAgain=false;performSearch()}else{$("search_title").setStyle({background:""})}}})}function parseResponse(g){if(g.nodeType==9){if(g.childNodes.length>0){for(var h=0;h<g.childNodes.length;h++){if(g.childNodes[h].nodeType!=10&&g.childNodes[h].nodeType!=7){return parseResponse(g.childNodes[h])}}}}else{if(g.nodeType==1){if(g.nodeName=="manyHits"){var o=0;var m=0;for(var h=0;h<g.childNodes.length;h++){if(g.childNodes[h].nodeName=="found"){o=g.childNodes[h].firstChild.nodeValue}else{if(g.childNodes[h].nodeName=="max"){m=g.childNodes[h].firstChild.nodeValue}}}if(cur_lang=="de"){return document.createTextNode(o+" von "+m+" Charaktere entsprechen der Suche. Bitte gib genauere Suchparameter an.")}else{return document.createTextNode(o+" of "+m+" characters fit the search. Please specify your search parameters more exactly.")}}else{if(g.nodeName=="nothing"){if(cur_lang=="de"){return document.createTextNode("Keine Charaktere entsprechen den Suchparametern.")}else{return document.createTextNode("No characters fit the search parameters.")}}else{if(g.nodeName=="characters"){var d=document.createElement("div");var j=0;var p=null;for(var h=0;h<g.childNodes.length;h++){if(g.childNodes[h].nodeName!="char"){continue}if(j==0){p=document.createElement("ul");p.style.cssText="float:left;margin-right:10px;"}var a="";var c="";var e="";for(var f=0;f<g.childNodes[h].childNodes.length;f++){if(g.childNodes[h].childNodes[f].nodeName=="name"){a=g.childNodes[h].childNodes[f].firstChild.nodeValue}else{if(g.childNodes[h].childNodes[f].nodeName=="id"){c=g.childNodes[h].childNodes[f].firstChild.nodeValue}else{if(g.childNodes[h].childNodes[f].nodeName=="server"){e=g.childNodes[h].childNodes[f].firstChild.nodeValue}}}}var l="[RS]";if(e>0){l="[TS]"}var n=document.createElement("li");n.appendChild(document.createTextNode(l));n.appendChild(document.createTextNode(" "));n.appendChild(document.createTextNode(c));n.appendChild(document.createTextNode(" - "));var b=document.createElement("a");b.href=url+"/illarion/gmtool/"+cur_lang+"_character.php?charid="+c+"&server="+e;b.appendChild(document.createTextNode(a));n.appendChild(b);p.appendChild(n);j++;if(j==10){d.appendChild(p);j=0}}if(j>0){d.appendChild(p)}return d}}}}}}function clearChilds(a){if(a.hasChildNodes()){while(a.childNodes.length>=1){a.removeChild(a.firstChild)}}}function addOrReplaceChild(a,b){if(a.firstChild){a.replaceChild(b,a.firstChild)}else{a.appendChild(b)}};