TinyCore.AMD.define("responsive-images",["devicePackage"],function(){return{onStart:function(){$("img").unveil(200),$(window).resize(function(){$("img").unveil(200)}),FC.trackEvent("JS_Libraries","call","responsive-images")},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}}),TinyCore.AMD.define("code",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/code.css",onStart:function(){var a=FC.getDataModules("code"),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","code"),require(["codeLibs"],function(){$(a).each(function(){b.autobind(this)})})},autobind:function(a){hljs.highlightBlock(a)},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}}),TinyCore.AMD.define("sortable",["devicePackage"],function(){return{onStart:function(){var a=document.querySelectorAll('[data-tc-modules="sortable"]'),b=this;FC.trackEvent("JS_Libraries","call","sortable"),require(["sortableLibs"],function(){$(a).each(function(){b.autobind(this)})})},autobind:function(a){var b={};null!==a.getAttribute("data-tc-url")&&(b.ajax_url=a.getAttribute("data-tc-url")),null!==a.getAttribute("data-tc-input")&&(b.ajax_url=void 0,b.input=a.getAttribute("data-tc-input")),b.object=null!==a.getAttribute("data-tc-object")?a.getAttribute("data-tc-object"):"sortable",null!==a.getAttribute("data-tc-handle")&&(b.handle=a.getAttribute("data-tc-handle")),$(a).sortable(b),void 0!==b.ajax_url&&null!==b.ajax_url?$(a).bind("sortupdate",function(){$.ajax({url:b.ajax_url,data:{order:$(a).serializeTree("id",b.object)},type:"POST",dataType:"json"})}):$(a).bind("sortupdate",function(){var c="",d=$("li",a).length;$("li",a).each(function(a){""!==this.id&&(c+=this.id),a!==d-1&&""!==this.id&&(c+=",")}),document.getElementById(b.input).value=c})}}}),TinyCore.AMD.define("tags",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/tags.css",oDefault:{asHtmlID:!1,startText:"Add a tag...",emptyText:"No Results Found",preFill:{},limitText:"No More Selections Are Allowed",selectedItemProp:"value",selectedValuesProp:"value",searchObjProps:"value",queryParam:"q",retrieveLimit:!1,extraParams:"",matchCase:!1,minChars:1,keyDelay:400,resultsHighlight:!0,neverSubmit:!0,selectionLimit:!1,showResultList:!0},onStart:function(){var a=document.querySelectorAll('[data-tc-modules="tags"]'),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","tags"),require(["tagsLibs"],function(){b.autobind(a)})},autobind:function(a){var b=this;$(a).each(function(){var a,c,d,e={},f=this,g=[],h=this.getAttribute("name"),i=!1;if(null!==f.getAttribute("required")&&(i=!0),null!==f.getAttribute("data-tc-max")&&(e.selectionLimit=f.getAttribute("data-tc-max")),null!==f.getAttribute("data-tc-text-noresult")&&(e.emptyText=f.getAttribute("data-tc-text-noresult")),null!==f.getAttribute("data-tc-text-max")&&(e.limitText=f.getAttribute("data-tc-text-max")),e.preFill=""!==f.value?f.value:!1,""!==f.placeholder&&(e.startText=f.placeholder),null!==f.getAttribute("data-tc-values")){c=f.getAttribute("data-tc-values").split(",");for(var j in c)g.push({value:c[j]})}else g.push({value:""});i&&(e.selectionRemoved=function(a){var b=$("input[name="+h+"]");","==b.attr("value")&&b.attr("value",""),a.fadeTo("fast",0,function(){a.remove()})}),a=FC.mixOptions(e,b.oDefault),$(f).autoSuggest(g,a).removeAttr("name"),d=$(f).next(),d.attr("name",h),i&&(d.attr("style","position:absolute; height:1px; padding:0;").attr("type","text").attr("required","required"),$(f).removeAttr("required"))})},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}}),TinyCore.AMD.define("truncate",["devicePackage"],function(){return{oDefault:{max_length:100,more:"[+]",less:"[-]"},onStart:function(){var a=document.querySelectorAll('[data-tc-modules="truncate"]'),b=this;FC.trackEvent("JS_Libraries","call","truncate"),require(["truncateLibs"],function(){b.autobind(a)})},autobind:function(a){var b=this;$(a).each(function(){var a,c={};null!==this.getAttribute("data-tc-max")&&(c.max_length=this.getAttribute("data-tc-max")),null!==this.getAttribute("data-tc-more")&&(c.more=this.getAttribute("data-tc-more")),null!==this.getAttribute("data-tc-less")&&(c.less=this.getAttribute("data-tc-less")),a=FC.mixOptions(c,b.oDefault),$(this).truncate(a)})},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}}),TinyCore.AMD.define("tabs",["devicePackage"],function(){return{mediator:TinyCore.Toolbox.request("mediator"),onStart:function(){var a=document.querySelectorAll('[data-tc-modules="tabs"]');FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","tabs"),this.autobind(a)},autobind:function(a){var b=this;$(a).each(function(){var a,c=this,d=null,e=b.getTabsInfo(c);$(c).addClass("tab-container"),a=b.createDesktopTabs(e);for(var f=0;f<e.length;f++)$(document.getElementById(e[f].id)).before(b.createMobileTabs(e[f].id,e[f].name));$(this).prepend(a),$("a.update-tabs",c).bind("click",function(a){a.preventDefault(),b.mediator.publish("close:wysiwyg");var d=(a.srcElement||a.target).href;-1!==d.indexOf("#")&&b.updateTabs(c,d.split("#")[1])}),null===d&&(d=$("nav li:first a",c)[0]),b.updateTabs(c,d.href.split("#")[1])})},toggleTabs:function(a){$(a).each(function(){$(this).bind("click",function(a){a.preventDefault();var b=this.href;-1!==b.indexOf("#")&&$(document.getElementById(b.split("#")[1])).slideToggle()})})},getTabsInfo:function(a){var b={};return $("> section",a).each(function(a){var c=this;b[a]={},b[a].id=this.id,b[a].name=null!==c.getAttribute("data-tc-name")?c.getAttribute("data-tc-name"):c.id.replace("-"," "),b.length=a+1}),b},createDesktopTabs:function(a){var b=document.createElement("nav"),c=document.createElement("ul"),d="";b.className="tabs";for(var e=0;e<a.length;e++)d+='<li id="'+a[e].id+'-li"><a href="#'+a[e].id+'" class="update-tabs">'+a[e].name+"</a></li>";return c.innerHTML=d,b.innerHTML=c.outerHTML,b},createMobileTabs:function(a,b){var c=document.createElement("header"),d=document.createElement("a"),e=b;return c.className="tab",c.id=a+"-header",d.innerHTML=e,d.href="#"+a,d.className="update-tabs",c.innerHTML=d.outerHTML,c},updateTabs:function(a,b){$("> nav a.update-tabs, > header.tab a.update-tabs",a).each(function(){var a=$("#"+this.href.split("#")[1]),c=this.href.split("#")[1],d=$(document.getElementById(c+"-li")),e=$(document.getElementById(c+"-header"));-1!==this.href.indexOf(b)?(d.addClass("active"),e.addClass("active"),a.fadeIn()):(d.removeClass("active"),e.removeClass("active"),a.hide())})}}}),TinyCore.AMD.define("autocomplete",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/autocomplete.css",oDefault:{limit:12},onStart:function(){var a=FC.getDataModules("autocomplete"),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","autocomplete"),require(["autocompleteLibs"],function(){$(a).each(function(){b.autobind(this)})})},autobind:function(a,b){var c,d,e=this,f={},g=$(a),h=a.getAttribute("data-tc-values"),i={};if(f.source=[],void 0===b&&null!==h){d=a.getAttribute("data-tc-values").split(",");for(var j=0;d.length>j;j++)i={},i.value=d[j],i.label=d[j],f.source.push(i),f.source.push(i)}c=FC.mixOptions(f,e.oDefault),g.autocompleter(c)},onStop:function(){this.sPathCss=null,this.oDefault=null},onDestroy:function(){delete this.sPathCss,delete this.oDefault}}}),TinyCore.AMD.define("autosize",["devicePackage"],function(){return{onStart:function(){var a=FC.getDataModules("autosize"),b=this;FC.trackEvent("JS_Libraries","call","autosize"),require(["autosizeLibs"],function(){$(a).each(function(){b.autobind(this)})})},autobind:function(a){$(a).addClass("animated height"),$(a).autosize()}}}),TinyCore.AMD.define("modal",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/modal.css",oDefault:{scrolling:!0,maxWidth:"100%",maxHeight:"100%",onComplete:function(){TinyCore.AMD.domBoot(document.getElementById("cboxLoadedContent"))}},onStart:function(){var a=document.querySelectorAll('[data-tc-modules="modal"]'),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","modal"),require(["modalLibs"],function(){$(document).bind("cbox_open",function(){$("html").css({overflow:"hidden"})}).bind("cbox_closed",function(){$("html").css({overflow:""})}),b.autobind(a)})},autobind:function(a){var b,c,d,e=this;$(a).each(function(){var a,f={};if(d=this.href,-1!=this.className.indexOf("group")){c=this.className.split(" "),b="";for(var g=0;g<c.length;g++)-1!=c[g].indexOf("group")&&(b=c[g])}b&&(f.rel=b),-1!==d.indexOf("#")?(f.inline=!0,f.href="#"+d.split("#")[1]):(f.iframe=-1===d.indexOf(".jpg")&&-1===d.indexOf(".png")&&-1===d.indexOf(".gif")&&-1===d.indexOf(".bmp")?!0:!1,f.inline=!1,f.href=d),f.width=null!==this.getAttribute("data-tc-width")?this.getAttribute("data-tc-width"):!1,f.height=null!==this.getAttribute("data-tc-height")?this.getAttribute("data-tc-height"):!1,a=FC.mixOptions(f,e.oDefault),$(this).colorbox(a)})},open:function(a){var b=this,c=FC.mixOptions(a,b.oDefault);(void 0!==c.sUrl||"#"!==c.sUrl)&&$.colorbox(c)},close:function(){$.colorbox.close()},onStop:function(){this.sPathCss=null,this.oDefault=null},onDestroy:function(){delete this.sPathCss,delete this.oDefault}}}),TinyCore.AMD.define("wysiwyg",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/wysiwyg.css",mediator:TinyCore.Toolbox.request("mediator"),bResize:!1,_oConstants:{EDITOR_SUFIX:"-editor",TEXTAREA_SUFIX:"-textarea",TEXTAREA_CLASS:"fc-wysiwyg-textarea",FULLSCREEN_EDITABLE_CLASS:"fc-wysiwyg-full-screen",TextHelp:"Select some text to get some formatting options.",TextVisual:'<i class="icon-eye"></i> VISUAL',TextHtml:'<i class="icon-code"></i> HTML',TextFullscreen:'<i class="icon-arrows-alt"></i> FULLSCREEN',TextMinscreen:'<i class="icon-minus"></i> MINIMIZE'},oDefault:{"class":"fc-wysiwyg",debug:!1,stay:!1,list:["bold","italic","underline","insertunorderedlist","createlink"]},onStart:function(){var a=document.querySelectorAll('[data-tc-modules="wysiwyg"]'),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","wysiwyg"),require(["wysiwygLibs"],function(){$(a).each(function(){b.autobind(this)})}),b.fDatePollyfill(),b.mediator.subscribe("close:wysiwyg",this.closeFormatOptions)},fDatePollyfill:function(){Date.now||(Date.now=function(){return(new Date).getTime()})},closeFormatOptions:function(){$(".fc-wysiwyg-menu").hide()},updateTextarea:function(a,b){b.value="<br>"==document.getElementById(a).innerHTML?"":document.getElementById(a).innerHTML},updateEditArea:function(a,b){document.getElementById(a).innerHTML=$("#"+b.id).val()},createEditArea:function(a,b,c){var d=document.createElement("div");return d.id=a,d.className="fc-wysiwyg",d.innerHTML=$(b).text(),d.dataset.help=c.help,d},createLink:function(a,b,c){var d=document.createElement("a");return d.innerHTML=c,d.href="#",d.id=b+"-"+a,d.className="button button-slim",d},createLinkGroup:function(a){var b=document.createElement("div");b.className="fc-wysiwyg-switch button-group ph-n";for(var c=0;c<a.length;c++)b.appendChild(a[c]);return b},bindForm:function(a,b){var c=this;$("#"+a).parents("form").on("submit",function(){$("#"+a).is(":visible")?c.updateEditArea(a,b):c.updateTextarea(a,b)})},bindHtmlButton:function(a,b,c){var d=this;$("#html-"+a).on("click",function(e){e.preventDefault(),$("#"+a).toggle(),$("#"+b.id).toggleClass(d._oConstants.TEXTAREA_CLASS),$("#"+a).is(":visible")?(this.innerHTML=c.html,d.updateEditArea(a,b)):(d.bResize===!1&&(require(["autosizeLibs"],function(){$(b).autosize()}),d.bResize=!0),d.closeFormatOptions(),this.innerHTML=c.visual,d.updateTextarea(a,b))})},bindScreenButton:function(a,b,c){var d=this;$("#screen-"+a).on("click",function(e){e.preventDefault(),$("#"+a).toggleClass(d._oConstants.FULLSCREEN_EDITABLE_CLASS),$("#"+b.id).toggleClass(d._oConstants.FULLSCREEN_EDITABLE_CLASS),$(this).parent().toggleClass("fc-wysiwyg-switch-full-screen"),$(".pen-menu").toggleClass("pen-menu-full-screen"),-1==this.innerHTML.indexOf(c.minscreen)?($("body").css({overflow:"hidden",height:"100%"}),this.innerHTML=c.minscreen):($("body").css({overflow:"auto",height:"auto"}),this.innerHTML=c.fullscreen)})},bindTextarea:function(a,b){var c=this;$("#"+a).on("blur",function(){c.updateTextarea(a,b)})},getText:function(a){for(var b,c=this,d={},e=["visual","help","fullscreen","minscreen","html"],f=0;f<e.length;f++)b=e[f],d[b]=null!==a.getAttribute("data-tc-text-"+b)?a.getAttribute("data-tc-text-"+b):c._oConstants["Text"+b.charAt(0).toUpperCase()+b.slice(1)];return d},autobind:function(a){$(a).parent().css("position","relative");var b,c,d,e,f,g={},h=this,i=h.getText(a),j=Math.floor(Date.now()/1e3),k=a.id?a.id+h._oConstants.EDITOR_SUFIX:j+h._oConstants.EDITOR_SUFIX,l=a.getAttribute("data-tc-format-options"),m=h.createEditArea(k,a,i),n=[];if(""===a.id&&(a.id=j+h._oConstants.TEXTAREA_SUFIX),"false"!==a.dataset.tcHtml&&(d=h.createLink(k,"html",i.html),n.push(d)),"false"!==a.dataset.tcFullscreen&&(e=h.createLink(k,"screen",i.fullscreen),n.push(e)),n.length>0&&(f=h.createLinkGroup(n),$(a).after(f)),a.className=h._oConstants.TEXTAREA_CLASS+" fc-wysiwyg-html",$(a).before(m),g.editor=document.getElementById(k),g.textarea=a,null!==l){aValues=l.split(","),g.list=[];for(var o=0;aValues.length>o;o++)g.list.push(aValues[o])}b=FC.mixOptions(g,h.oDefault),c=new Pen(b),h.bindForm(k,a,i),h.bindTextarea(k,a,i),"false"!==a.dataset.tcHtml&&h.bindHtmlButton(k,a,i),"false"!==a.dataset.tcFullscreen&&h.bindScreenButton(k,a,i)},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}}),TinyCore.AMD.define("stats",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/stats.css",oDefault:{type:"bar",table:"modal",height:"300",width:"420",pieMargin:"10"},onStart:function(){var a=document.querySelectorAll('[data-tc-modules="stats"]'),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","graph"),require(["statsLibs"],function(){b.autobind(a)})},autobind:function(a){var b=this;$(a).each(function(){var a,c,d,e,f,g,h,i={},j=this.getAttribute("data-tc-table"),k=String.fromCharCode(65+Math.floor(26*Math.random())),l=k+Date.now();null!==this.getAttribute("data-tc-type")&&(i.type=this.getAttribute("data-tc-type")),null!==this.getAttribute("data-tc-height")&&(i.type=this.getAttribute("data-tc-height")),null!==this.getAttribute("data-tc-width")?i.width=this.getAttribute("data-tc-width"):(f=$(this).parent(),g=parseInt(f.css("padding-left"),10),h=parseInt(f.css("padding-right"),10),i.width=f.width()-(g+h+44)),"hide"===j&&(this.style.display="none"),a=FC.mixOptions(i,b.oDefault),"down"===j?$(this).visualize(a).insertBefore(this):$(this).visualize(a),(null===j||"modal"===j)&&(c=document.createElement("a"),c.id=l+1,c.href="#"+l,c.className="icon-table visualize-icon-table",c.setAttribute("data-tc-modules","modal"),$(this).before(c),e=document.createElement("div"),e.id=l,e.className="box-text",e.innerHTML=this.outerHTML,d=document.createElement("div"),d.className="hidden",d.innerHTML=e.outerHTML,$(this).before(d),$(this).remove(),TinyCore.AMD.domBoot(document.getElementById(l+1)))})},onStop:function(){this.oDefault=null},onDestroy:function(){delete this.oDefault}}});var oPolyfills={};TinyCore.AMD.define("polyfills",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/modal.css",onStart:function(){for(var a=["video","audio","source"],b=Modernizr.inputtypes.date+Modernizr.inputtypes.email+Modernizr.inputtypes.number+Modernizr.inputtypes.month+Modernizr.inputtypes.range+Modernizr.inputtypes.datetime,c=document.getElementsByTagName("input"),d=[],e=!1,f=0;f<c.length;f++)d.push(c[f].type);e=d.indexOf("date")+d.indexOf("email")+d.indexOf("month")+d.indexOf("range")+d.indexOf("datetime"),oPolyfills.shims=[],document.getElementsByTagName("form").length>0&&(Modernizr.input.placeholder&&Modernizr.input.required||oPolyfills.shims.push("forms"),5>b&&oPolyfills.shims.push("forms-ext"));for(var g=0;g<a.length;g++)void 0===$(a[g])[0]||Modernizr[a[g]]||oPolyfills.shims.push(a[g]);oPolyfills.options={basePath:oGlobalSettings.sPathJs+"shims/",waitReady:!1},e>-5&&5>b&&TinyCore.AMD.requireAndStart("loadPolyfills")}}}),TinyCore.AMD.define("loadPolyfills",["polyfillsLibs"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/modal.css",onStart:function(){$.webshims.setOptions(oPolyfills.options),$.webshims.polyfill(oPolyfills.shims),FC.trackEvent("JS_Libraries","call","polyfills")}}}),TinyCore.AMD.define("toggle",["devicePackage"],function(){return{aAnimations:["flash","bounce","shake","tada","pulse","rubberband","fade","swing","tada","wobble","flip","rotate","slide","hinge","roll"],aVariations:[["-in","-out"],["-up","-down"],["-left","-right"]],onStart:function(){var a=FC.getDataModules("toggle"),b=this;$(a).each(function(){var a=this;$(a).bind("click",function(c){c.preventDefault(),null!==a.getAttribute("data-tc-class")?b.toggleClass(a):null!==a.getAttribute("data-tc-animation")?b.toggleAnimation(a):b.slideToggle(a)})}),FC.trackEvent("JS_Libraries","call","toggle")},getOpositeAnimation:function(a){for(var b,c,d=a||"",e=this.aVariations,f=0;f<e.length;f++)b=e[f][0],c=e[f][1],-1!==a.indexOf(b)?d=d.replace(b,c):-1!==a.indexOf(c)&&(d=d.replace(c,b));return d},cleanAnimations:function(a){for(var b,c=this.aAnimations,d=a.split(" "),e=0;e<c.length;e++)b=d.indexOf(c[e]),-1!==b&&d.splice(b,1);return b=d.indexOf("animated"),-1==b&&d.push("animated"),d.toString().replace(","," ")},toggleAnimation:function(a){var b,c=this,d="",e=a.href,f=a.getAttribute("data-tc-animation")||"",g=null;-1!==e.indexOf("#")&&(g=$(document.getElementById(e.split("#")[1]))),b=g.attr("class"),d=c.getOpositeAnimation(f),g.attr("class",c.cleanAnimations(b)),g.removeClass(d).addClass(f),$(a).attr("data-tc-animation",d)},toggleClass:function(a){var b=a.href,c=a.getAttribute("data-tc-class")||"";-1!==b.indexOf("#")&&$(document.getElementById(b.split("#")[1])).toggleClass(c,"bounce-out")},slideToggle:function(a){var b=a.href;-1!==b.indexOf("#")&&$(document.getElementById(b.split("#")[1])).slideToggle()}}}),TinyCore.AMD.define("tip",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/tips.css",oDefault:{fixed:!0},onStart:function(){var a=FC.getDataModules("tip"),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","tip"),require(["tipLibs"],function(){$(a).each(function(){b.autobind(this)})})},autobind:function(a){var b,c=this,d={};null!==a.getAttribute("data-tc-title")&&(d.title=a.getAttribute("data-tc-title")),null!==a.getAttribute("data-tc-content")&&(d.content=a.getAttribute("data-tc-content")),b=FC.mixOptions(d,c.oDefault),void 0!==b.content&&new Opentip(a,b.content,b)},onStop:function(){this.sPathCss=null,this.oDefault=null},onDestroy:function(){delete this.sPathCss,delete this.oDefault}}}),TinyCore.AMD.define("carousel",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/carousel.css",oDefault:{baseClass:"carousel",themeClass:"carousel-theme",items:1,nav:!0,navText:["",""],loop:!0,margin:10,merge:!1,video:!0,lazyLoad:!0,videoWidth:"100%",videoHeight:300,center:!0,autoplay:!0,autoplayTimeout:5e3,autoplayHoverPause:!0},onStart:function(){var a=FC.getDataModules("carousel"),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","carousel"),require(["carouselLibs"],function(){$(a).each(function(){b.autobind(this)})})},autobind:function(a){var b,c,d,e=this,f={};$(".carousel-video",a).each(function(){$(this).addClass("owl-video")});for(c in e.oDefault)null!==a.getAttribute("data-tc-"+c)&&(f[c]=a.getAttribute("data-tc-"+c));null!==a.getAttribute("data-tc-video-height")&&(f.videoHeight=a.getAttribute("data-tc-video-height")),null!==a.getAttribute("data-tc-video-width")&&(f.videoWidth=a.getAttribute("data-tc-video-width")),null!==a.getAttribute("data-tc-device-items")&&(d=a.getAttribute("data-tc-device-items").split(","),f.responsive={0:{items:parseInt(d[0],10),nav:!1},480:{items:parseInt(d[1],10),nav:!0},980:{items:parseInt(d[2],10),nav:!0}}),b=FC.mixOptions(f,e.oDefault),void 0!==b&&$(a).owlCarousel(b)},onStop:function(){this.sPathCss=null,this.oDefault=null},onDestroy:function(){delete this.sPathCss,delete this.oDefault}}}),TinyCore.AMD.define("sidemenu",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/sidemenu.css",oDefault:{renaming:!1},onStart:function(){var a=FC.getDataModules("sidemenu"),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","sidemenu"),require(["sidemenuLibs"],function(){$(a).each(function(){b.autobind(this)})})},autobind:function(a){var b,c=this,d={},e=a.href,f={open:"swipeRight",close:"swipeLeft"};null!==a.getAttribute("data-tc-position")&&(d.side=a.getAttribute("data-tc-position")),-1!==e.indexOf("#")&&(d.source="#"+e.split("#")[1],d.name=e.split("#")[1]+"-"+(new Date).getTime()),b=FC.mixOptions(d,c.oDefault),$(a).sidr(b),"right"!==d.side&&(f.open="swipeLeft",f.close="swipeRight")},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}}),TinyCore.AMD.define("loadSideMenu",["sidemenuLibs"],function(){return{onStart:function(){}}}),TinyCore.AMD.define("cart",["devicePackage","cartLibs"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/cart.css",oDefault:{cartColumns:[{view:function(a){return"<span>"+a.get("quantity")+"</span><div><a href='javascript:;' class='simpleCart_increment'><i class='icon-caret-up'></i> </a><a href='javascript:;' class='simpleCart_decrement'><i class='icon-caret-down'></i></a></div>"},attr:"custom"},{attr:"name",label:!1},{view:"currency",attr:"total",label:!1}],currency:"EUR",language:"spanish-es",cartStyle:"div",shippingFreeSince:1e3,shippingCost:15,taxRate:.21,checkout:{type:"PayPal",email:"you@yours.com"}},onStart:function(){var a=this,b=FC.getDataModules("cart"),c={},d={},e=["cart-checkout","cart-empty","cart-items","cart-total","cart-quantity","cart-tax","cart-tax-rate","cart-shipping","cart-grand-total","cart-shelf-item","cart-item-name","cart-item-price","cart-item-add","cart-item-quantity"],f=["simpleCart_checkout","simpleCart_empty","simpleCart_items","simpleCart_total","simpleCart_quantity","simpleCart_tax","simpleCart_taxRate","simpleCart_shipping","simpleCart_grandTotal","simpleCart_shelfItem","item_name","item_price","item_add","item_Quantity"];for(FC.loadCSS(this.sPathCss),nKey=0;nKey<e.length;nKey++)a.prepareBind(e[nKey],f[nKey]);$(b).each(function(){a.autobind(this),null!==this.getAttribute("data-tc-email")&&(d.checkout={},d.checkout.type="PayPal",d.checkout.email=this.getAttribute("data-tc-email")),null!==this.getAttribute("data-tc-currency")&&(d.currency=parseFloat(this.getAttribute("data-tc-currency"))),d.shippingFreeSince=null!==this.getAttribute("data-tc-shipping-free-since")?parseFloat(this.getAttribute("data-tc-shipping-free-since")):a.oDefault.shippingFreeSince,d.shippingCost=null!==this.getAttribute("data-tc-shipping-cost")?parseFloat(this.getAttribute("data-tc-shipping-cost")):a.oDefault.shippingCost,null!==this.getAttribute("data-tc-tax-rate")&&(d.taxRate=parseFloat(this.getAttribute("data-tc-tax-rate"))),d.shippingCustom=function(){return simpleCart.total()>d.shippingFreeSince?(d.taxShipping=!1,0):d.shippingCost}}),c=FC.mixOptions(d,a.oDefault),simpleCart(c),simpleCart.init(),FC.trackEvent("JS_Libraries","call","autocomplete")},prepareBind:function(a,b){$("."+a).each(function(){$(this).addClass(b)})},autobind:function(a){var b=this;$(a).bind("click",function(a){a.preventDefault(),b.toggleCart(this)})},toggleCart:function(a){var b=($(a),$(document.getElementById(a.href.split("#")[1])));b.toggleClass("hidden")},onStop:function(){this.sPathCss=null,this.oDefault=null},onDestroy:function(){delete this.sPathCss,delete this.oDefault}}}),TinyCore.AMD.define("parallax",["devicePackage"],function(){return{onStart:function(){FC.getDataModules("parallax");require(["parallaxLibs"],function(){skrollr.init()}),FC.trackEvent("JS_Libraries","call","parallax")}}}),TinyCore.AMD.define("table",["devicePackage"],function(){return{sPathCss:oGlobalSettings.sPathCss+"ui/table.css",oDefault:{features:{paginate:!0,sort:!0,pushState:!0,search:!0,recordCount:!0,perPageSelect:!0},inputs:{queries:null,sorts:null,multisort:["ctrlKey","shiftKey","metaKey"],page:null,queryEvent:"blur change",recordCountTarget:null,recordCountPlacement:"after",paginationLinkTarget:null,paginationLinkPlacement:"after",paginationClass:"pagination dynatable-pagination",paginationLinkClass:"dynatable-page-link",paginationPrevClass:"dynatable-page-prev",paginationNextClass:"dynatable-page-next",paginationActiveClass:"dynatable-active-page",paginationDisabledClass:"dynatable-disabled-page",paginationPrev:'<i class="icon-step-backward"></i>',paginationNext:'<i class="icon-step-forward"></i>',paginationGap:[1,2,2,1],searchTarget:null,searchPlacement:"before",perPageTarget:null,perPagePlacement:"before",perPageText:'<i class="icon-table"></i> ',recordCountText:"",processingText:"Processing..."},params:{dynatable:"table",queries:"queries",sorts:"sorts",page:'<i class="icon-page"></i>',perPage:"perPage",offset:"offset",records:"",record:null,queryRecordCount:"queryRecordCount",totalRecordCount:"totalRecordCount"}},onStart:function(){var a=FC.getDataModules("table"),b=this;FC.loadCSS(this.sPathCss),FC.trackEvent("JS_Libraries","call","table"),require(["tableLibs"],function(){$(a).each(function(){b.autobind(this)})})},autobind:function(a){var b=this,c=$(a),d="";"false"===a.getAttribute("data-tc-pagination")&&(b.oDefault.features.paginate=!1,b.oDefault.features.perPageSelect=!1,b.oDefault.features.recordCount=!1),"false"===a.getAttribute("data-tc-sort")&&(b.oDefault.features.sort=!1),"false"===a.getAttribute("data-tc-search")&&(b.oDefault.features.search=!1),(b.oDefault.features.search||b.oDefault.features.paginate)&&(d="table-dynamic"),c.dynatable(b.oDefault).addClass(d)},onStop:function(){this.sPathCss=null,this.oDefault=null},onDestroy:function(){delete this.sPathCss,delete this.oDefault}}}),TinyCore.AMD.define("notification",["devicePackage"],function(){return{mediator:TinyCore.Toolbox.request("mediator"),bMessageCreated:!1,oTimer:null,onStart:function(){var a,b,c=FC.getDataModules("notification"),d=this;FC.trackEvent("JS_Libraries","call","notification"),$(c).each(function(){a=this,b=a.getAttribute("data-tc-event"),"load"==b?d.getAttributesAndExecute(a):$(this).on("click",function(a){a.preventDefault(),d.getAttributesAndExecute(this)})}),d.mediator.subscribe(["notification"],this.processResponse,this)},getAttributesAndExecute:function(a){var b=this,c=a.getAttribute("data-tc-type")?a.getAttribute("data-tc-type"):"ok",d=a.getAttribute("data-tc-text")?a.getAttribute("data-tc-text"):null;null!==d&&b.showMessage(c,d)},processResponse:function(a){var b=a.data.type?a.data.type:"ok",c=a.data.message?a.data.message:"Success";this.showMessage(b,c)},setMessageVisibile:function(a,b,c,d){a.className="mb-n msg-"+c,a.innerHTML=d,b.style.top="0px"},showMessage:function(a,b){var c=this;if(null!==c.oTimer&&clearTimeout(c.oTimer),this.bMessageCreated){var d=document.getElementById("notification-message"),e=document.getElementById("notification");"0px"===e.style.top.toString()?(e.style.top="-1000px",c.oTimer=setTimeout(function(){c.setMessageVisibile(d,e,a,b)},300)):c.setMessageVisibile(d,e,a,b)}else this.createMessage(a,b)},createMessage:function(a,b){this.bMessageCreated=!0;var c=document.createElement("p"),d=document.createElement("div"),e=document.createElement("div"),f=document.createElement("a"),g=this;d.id="notification",d.style.display="none",e.className="box-background pa-n ma-n",f.href="#",f.className="icon-times",f.id="notification-close",c.id="notification-message",c.className="mb-n msg-"+a,c.innerHTML=b,e.appendChild(c),e.appendChild(f),d.appendChild(e),$("body").prepend(d),$("#notification-close").on("click",function(){document.getElementById("notification").style.top="-1000px"}),$("#notification").fadeIn("fast",function(){document.getElementById("notification").style.top="0px",g.oTimer=setTimeout(function(){document.getElementById("notification").style.top="-1000px"},5e3)})},onStop:function(){this.mediator=null,this.bMessageCreated=null,this.oTimer=null},onDestroy:function(){delete this.mediator,delete this.bMessageCreated,delete this.oTimer}}}),TinyCore.AMD.define("dropdown",["devicePackage"],function(){return{oOpened:!1,onStart:function(){var a=FC.getDataModules("dropdown"),b=this;b.bindClickOutside(),$(a).each(function(){var a=this;$(".navigation-dropdown > a",a).bind("click",function(c){c.preventDefault(),b.hideDropdowns(a,this),b.slideToggle(this)})}),FC.trackEvent("JS_Libraries","call","dropdown")},bindClickOutside:function(){var a=this;$(document).bind("click",function(b){b.target!=a.oOpened&&"A"!==b.target.nodeName&&a.hideDropdowns()})},hideDropdowns:function(a,b){$(".navigation-dropdown ul",a).each(function(){var a=void 0!==b?b.href.split("#")[1]:"";a!=this.id&&(this.style.display="none")}),this.oOpened=!1},slideToggle:function(a){var b=a.href;-1!==b.indexOf("#")&&($(document.getElementById(b.split("#")[1])).slideToggle("fast"),this.oOpened=a)}}}),TinyCore.AMD.define("center-box",["devicePackage"],function(){return{onStart:function(){var a=FC.getDataModules("center-box"),b=this;FC.trackEvent("JS_Libraries","call","center-box"),b.setPosition(a),$(window).resize(function(){b.setPosition(a)})},setPosition:function(a){var b,c,d,e,f,g,h=$(window).height(),i=$(window).width();$(a).each(function(){b=this,e=b.getAttribute("data-tc-position")?b.getAttribute("data-tc-position"):"absolute","absolute"==e&&(h=$(b).parent().height(),i=$(b).parent().width(),$(b).parent().css("position","relative")),$(b).css({position:e,"z-index":100}),c=b.getAttribute("data-tc-height")?b.getAttribute("data-tc-height"):$(b).height(),d=b.getAttribute("data-tc-width")?b.getAttribute("data-tc-width"):$(b).width(),"string"==typeof c&&-1!==c.indexOf("px")&&(c=c.replace("px","")),"string"==typeof d&&-1!==d.indexOf("px")&&(d=d.replace("px","")),f=i/2-d/2,g=h/2-c/2,b.getAttribute("data-tc-height")&&$(b).css("height",c),b.getAttribute("data-tc-width")&&$(b).css("width",d),$(b).css({left:f,top:g})})},onStop:function(){this.mediator=null,this.bMessageCreated=null,this.oTimer=null},onDestroy:function(){delete this.mediator,delete this.bMessageCreated,delete this.oTimer}}});