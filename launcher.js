(()=>{"use strict";var __webpack_modules__={864:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const LauncherState_1=__importDefault(__webpack_require__(504)),MouseHandler_1=__importDefault(__webpack_require__(496)),KeyboardHandler_1=__importDefault(__webpack_require__(979)),DrawerHandler_1=__importDefault(__webpack_require__(84)),ContextMenuHandler_1=__importDefault(__webpack_require__(172));class Launcher{static init(e){window.addEventListener("error",(e=>{alert("Error!\n"+e.message)})),Launcher.iframe=document.createElement("iframe"),document.body.appendChild(Launcher.iframe),Launcher.iframe.id="gamewin",Launcher.iframe.setAttribute("frameborder","0"),Launcher.iframe.setAttribute("allowfullscreen","true"),Launcher.iframe.style.width="100%",Launcher.iframe.style.height="100%",Launcher.contextMenu=new ContextMenuHandler_1.default,document.body.style.margin="0px",Launcher.mouse=new MouseHandler_1.default,Launcher.mouse.init(),Launcher.keyboard=new KeyboardHandler_1.default,Launcher.keyboard.init(),Launcher.drawer=new DrawerHandler_1.default(document.getElementById("slidymenu")),Launcher.drawer.elem.style.left="-150px",Launcher.cnv=document.createElement("canvas"),Launcher.cnv.id="cnv",document.body.appendChild(Launcher.cnv),Launcher.ctx=Launcher.cnv.getContext("2d",{desynchronized:!1}),Launcher.state=e,Launcher.state.create(),Launcher.update(0)}static openURL(e){Launcher.openIframeWindow(),Launcher.iframe.src=e}static openIframeWindow(){Launcher.keyboard.resetPressed(),Launcher.iframeMode=!0}static closeIframe(){Launcher.iframeMode=!1}static toggleFullscreen(){let elem=document.body;elem.requestFullscreen&&(document.fullscreenElement?(Launcher.fullscreen=!1,eval("window.navigator.keyboard.unlock()"),document.exitFullscreen()):(Launcher.fullscreen=!0,elem.requestFullscreen().catch((e=>{Launcher.fullscreen=!1})),eval("window.navigator.keyboard.lock()")))}static update(e){var t;document.body.offsetWidth==window.screen.availWidth&&document.body.offsetHeight==window.screen.availHeight?(Launcher.fullscreen=!0,null==document.fullscreenElement?Launcher.fullscreenByOS=!0:Launcher.fullscreenByOS=!1):Launcher.fullscreen=!1,Launcher.cnv.style.zIndex="2",Launcher.iframe.style.zIndex="1",Launcher.cnv.style.position="relative",Launcher.iframe.style.position="relative",Launcher.iframeMode?(null===(t=Launcher.iframe.contentWindow)||void 0===t||t.focus(),Launcher.cnv.style.display="none",Launcher.cnv.style.top="0px",Launcher.iframe.style.opacity="1",Launcher.iframe.style.top=String(-Launcher.cnv.offsetHeight+(document.body.offsetHeight-Launcher.iframe.offsetHeight)/2)+"px",Launcher.iframe.style.left=String((document.body.offsetWidth-Launcher.iframe.offsetWidth)/2)+"px"):(Launcher.cnv.style.display="flex",Launcher.cnv.style.top="-"+String(Launcher.iframe.offsetHeight)+"px",Launcher.iframe.style.display="flex",Launcher.iframe.style.opacity="0",Launcher.iframe.style.top="0px"),Launcher.iframe.setAttribute("width",Launcher.cnv.offsetWidth+""),Launcher.iframe.setAttribute("height",Launcher.cnv.offsetHeight+""),Launcher.cnv.style.width="100%",Launcher.cnv.style.height="100%",Launcher.cnv.setAttribute("width",Launcher.cnv.offsetWidth+""),Launcher.cnv.setAttribute("height",Launcher.cnv.offsetHeight+""),Launcher.delta=(e-Launcher.lastTimestep)/1e3,Launcher.drawer.update(Launcher.delta),Launcher.contextMenu.update(Launcher.delta),Launcher.iframeMode||(Launcher.ctx.fillStyle="black",Launcher.ctx.fillRect(0,0,Launcher.cnv.width,Launcher.cnv.height),Launcher.state.draw(),Launcher.ctx.fillStyle="white",Launcher.ctx.font="25px sans-serif",Launcher.ctx.textBaseline="hanging",Launcher.ctx.fillText("This is the new games and stuff, ",0,35),Launcher.ctx.fillText("currently in very early development.",0,65),Launcher.ctx.fillText("Mobile devices will be supported soon.",0,95),Launcher.state.update(Launcher.delta),null!=Launcher.iframe.contentDocument&&Launcher.iframe.contentDocument.querySelectorAll("*").forEach((e=>{e.style.cursor="normal"}))),Launcher.lastTimestep=e,Launcher.mouse.resetDeltas(),requestAnimationFrame(Launcher.update)}}Launcher.iframeMode=!1,Launcher.fullscreen=!1,Launcher.fullscreenByOS=!1,Launcher.lastTimestep=0,Launcher.lastShiftTabTimeStep=0,Launcher.delta=0,exports.default=Launcher,Launcher.init(new LauncherState_1.default)},836:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(864)),a=i(s(796)),r=s(916),o=s(648);class u extends a.default{constructor(){super()}draw(){super.draw()}create(){this.loadGraphic("/assets/images/arrow.png")}onGraphicLoad(){this.setGraphicSize(0,.1*n.default.cnv.offsetHeight)}update(e){super.update(e),this.flipX?(this.x=n.default.cnv.offsetWidth,this.x-=n.default.cnv.offsetWidth/32+this.width):(this.x=0,this.x+=n.default.cnv.offsetWidth/32),this.overlapsPoint(n.default.mouse.x,n.default.mouse.y)?(this.setGraphicSize(0,.12*n.default.cnv.offsetHeight),n.default.mouse.justPressed(o.MouseButtons.PRIMARY)&&n.default.contextMenu.show([{text:"Minecraft 1.8",onselect:()=>{n.default.openURL("https://gamesandthings.github.io/mc/1.8")}},{text:"Minecraft 1.5",onselect:()=>{n.default.openURL("https://gamesandthings.github.io/mc/1.5")}},{text:"Minecraft 1.3_01",onselect:()=>{n.default.openURL("https://gamesandthings.github.io/mc/1.3")}},{text:"Minecraft Indev",onselect:()=>{n.default.openURL("https://gamesandthings.github.io/mc/indev")}},{text:"Minecraft Classic",onselect:()=>{n.default.openURL("https://gamesandthings.github.io/mc/classic")}},{text:"Custom",onselect:()=>{let e=prompt("Enter URL to open:\n");e.startsWith("http://")&&e.startsWith("https://")||(e="http://"+e),n.default.openURL(e)}}])):this.setGraphicSize(0,.1*n.default.cnv.offsetHeight),this.screenCenter(r.Axes.Y)}}t.default=u},172:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(864)),a=i(s(396));t.default=class{constructor(){this.x=0,this.y=0,this.ctxItemMap=new Map,this.contextOptions=[],this.contextMenuInput=document.createElement("input"),this.contextMenuInput.setAttribute("type","list"),this.contextMenuInput.setAttribute("name","ContextMenu"),this.contextMenuInput.style.width="50px",this.contextMenuInput.style.height="50px",this.contextMenuInput.style.position="absolute",this.contextMenuInput.style.zIndex="10",this.contextMenuInput.style.backgroundColor="black",document.body.appendChild(this.contextMenuInput),this.clear(),this.contextMenuInput.style.top="-999px",this.contextMenuInput.style.left="-999px",this.contextMenuInput.addEventListener("input",(e=>{var t;if(null!=this.contextMenuInput.value){let e=this.contextMenuInput.value;this.contextMenuInput.value="",console.log(e),null===(t=this.ctxItemMap.get(e))||void 0===t||t.call(null)}}))}add(e){let t=e.text;null!=e.hasSecondary&&e.hasSecondary&&(t+="    ‏☰"),null==e.onselect&&(e.onselect=()=>{}),null!=e.title&&e.title&&(e.onselect=()=>{this.show(this.contextOptions)}),null!=e.font&&(t=a.default.make(t,e.font)),this.ctxItemMap.set(t,e.onselect);let s=document.createElement("option");s.value=t,this.ctxMenuItems.appendChild(s)}create(){}update(e){}clear(){try{document.body.removeChild(this.ctxMenuItems)}catch(e){}this.ctxMenuItems=document.createElement("datalist"),this.ctxMenuItems.id=Math.random().toString(36).substring(0,5),this.contextMenuInput.setAttribute("list",this.ctxMenuItems.id),document.body.appendChild(this.ctxMenuItems),this.ctxItemMap.clear()}show(e){n.default.mouse.hasClickedAtLeastOnce&&(this.contextOptions=e,this.clear(),e.forEach((e=>{this.add(e)})),this.add({text:"Close",font:a.default.BOLD}),this.x=n.default.mouse.x,this.y=n.default.mouse.y,this.contextMenuInput.style.left=this.x-20+"px",this.contextMenuInput.style.top=this.y-50+"px",this.contextMenuInput.showPicker(),this.contextMenuInput.style.top="-999px",this.contextMenuInput.style.left="-999px")}destroy(){}}},84:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(864)),a=i(s(236));t.default=class{constructor(e){this.buttonsPressed=new Map,this.buttonsContextMenu=new Map,this.buttonsMouseOver=new Map,this.buttons=[],this.mouseOver=!0,this.x=-150,this.y=5,this.alpha=1,this.isOut=!1,this.screenmode="window",this.elem=e,this.addMouseListeners(e),e.querySelectorAll("*").forEach((e=>{let t=e;this.addMouseListeners(t)}))}addMouseListeners(e){this.buttonsPressed.set(e.id,!1),this.buttons.push(e),e.addEventListener("click",(t=>{(this.isOut||"peekarrow"==e.id)&&this.buttonsPressed.set(e.id,!0)})),e.addEventListener("mouseover",(t=>{this.buttonsMouseOver.set(e.id,!0)})),e.addEventListener("mouseout",(t=>{this.buttonsMouseOver.set(e.id,!1)})),e.addEventListener("contextmenu",(t=>{this.buttonsContextMenu.set(e.id,!0),t.preventDefault()}))}create(){}mouseOverCheck(){n.default.iframeMode?(this.mouseOver=!1,this.buttonsMouseOver.forEach(((e,t)=>{e&&(this.mouseOver=!0)})),this.mouseOver?this.alpha=1:this.alpha=.5):(this.alpha=1,this.isOut=!0)}aspectRatioFit(e,t,s,i){var n=Math.min(s/e,i/t);let r=new a.default;return r.x=e*n,r.y=t*n,r}updateScreenMode(){if("16:9"==this.screenmode){let e=this.aspectRatioFit(1280,720,document.body.offsetWidth,document.body.offsetHeight);n.default.iframe.style.width=e.x+"px",n.default.iframe.style.height=e.y+"px"}else if("16:10"==this.screenmode){let e=this.aspectRatioFit(1680,1050,document.body.offsetWidth,document.body.offsetHeight);n.default.iframe.style.width=e.x+"px",n.default.iframe.style.height=e.y+"px"}else if("4:3"==this.screenmode){let e=this.aspectRatioFit(800,600,document.body.offsetWidth,document.body.offsetHeight);n.default.iframe.style.width=e.x+"px",n.default.iframe.style.height=e.y+"px"}else this.screenmode.includes("x")?(n.default.iframe.style.width=this.screenmode.split("x")[0]+"px",n.default.iframe.style.height=this.screenmode.split("x")[1]+"px"):(n.default.iframe.style.width="100%",n.default.iframe.style.height="100%")}update(e){window.devicePixelRatio=4,this.mouseOverCheck(),this.updateScreenMode(),this.buttons.forEach((e=>{if("true"==e.getAttribute("disabled")?e.style.color="rgba(255,255,255,0.25)":e.style.color="white","fullscreen"==e.id){e.setAttribute("title","Makes games and things fullscreen."),n.default.fullscreenByOS&&e.setAttribute("title","Cannot exit fullscreen as fullscreen was toggled\nby your os or browser."),e.setAttribute("disabled",String(n.default.fullscreenByOS));let t="fullscreen";n.default.fullscreen&&!n.default.fullscreenByOS&&(t="fullscreen_exit"),e.innerText!=t&&(e.innerText=t)}else"arrow_back"==e.id?n.default.iframeMode?(e.setAttribute("title","Return to games and st."),e.innerText="pause"):(e.setAttribute("title","Return to game."),e.innerText="play_arrow"):"peekarrow"==e.id?(e.setAttribute("disabled",String(!n.default.iframeMode)),n.default.iframeMode||(e.innerText="close"),this.isOut||"close"!=e.innerText||(e.innerText="chevron_right")):"settings"==e.id&&e.setAttribute("disabled",String(!n.default.iframeMode))})),this.isOut?this.x=5:this.x=25-this.elem.offsetWidth,this.buttonsPressed.forEach(((e,t)=>{if(e){this.buttonsPressed.set(t,!1);let e=document.getElementById(t);"peekarrow"==t?n.default.iframeMode&&(this.isOut=!this.isOut,this.isOut?e.innerText="close":e.innerText="chevron_right"):"fullscreen"==t?n.default.fullscreenByOS||n.default.toggleFullscreen():"refresh"==t?n.default.iframe.src+="":"arrow_back"==t?n.default.iframeMode?n.default.closeIframe():n.default.openIframeWindow():"settings"==t?n.default.iframeMode&&n.default.contextMenu.show([{text:"Aspect Ratio",onselect:()=>{n.default.contextMenu.show([{text:"4:3",onselect:()=>{this.screenmode="4:3"}},{text:"16:9",onselect:()=>{this.screenmode="16:9"}},{text:"16:10",onselect:()=>{this.screenmode="16:10"}},{text:"Default",onselect:()=>{this.screenmode="window"}},{text:"Custom Resolution",onselect:()=>{let e=window.prompt("Enter Resolution:\n(example 1920x1080)");null!=e&&(this.screenmode=e)}}])},hasSecondary:!0}]):"forum"==e.id&&window.open("https://discord.com/invite/up7VmmCPhn")}})),this.buttonsContextMenu.forEach(((e,t)=>{e&&(this.buttonsContextMenu.set(t,!1),"refresh"==t?n.default.iframeMode&&n.default.contextMenu.show([{text:"Refresh Games and Stuff",onselect:()=>{window.location.reload()}}]):"peekarrow"==t&&this.isOut&&n.default.iframeMode&&n.default.contextMenu.show([{text:"Force Quit Game",onselect:()=>{n.default.iframe.src="about:blank"}}]))})),this.elem.style.opacity=String(this.alpha),this.elem.style.left=String(this.x)+"px",this.elem.style.top=String(this.y)+"px"}destroy(){}}},484:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e="",t){this.img=new Image,this.loaded=!1,this.img.src=e,this.img.addEventListener("load",(e=>{this.loaded=!0,t(this.img,e)}))}destroy(){this.img.src="",this.img=null}}},979:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(864));t.default=class{constructor(){this.pressedMap=new Map}init(){window.addEventListener("keydown",(e=>(this.onKeyDown(e),!1))),window.addEventListener("keyup",(e=>(this.onKeyUp(e),!1)))}onKeyDown(e,t=!0){null!=e.key&&("F11"==e.key&&n.default.toggleFullscreen(),this.pressedMap.set(e.key.toLowerCase(),!0),t&&e.preventDefault())}onKeyUp(e,t=!0){null!=e.key&&(this.pressedMap.set(e.key.toLowerCase(),!1),t&&e.preventDefault())}isDown(e){return!!this.pressedMap.has(e.toLowerCase())&&this.pressedMap.get(e.toLowerCase())}resetPressed(){this.pressedMap.clear()}}},504:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(864)),a=i(s(836)),r=i(s(796)),o=i(s(248)),u=s(916),h=s(648);class l extends o.default{constructor(){super(...arguments),this.logo=new r.default,this.lArrow=new a.default,this.rArrow=new a.default}create(){this.logo.loadGraphic("/assets/images/logo.png"),this.add(this.lArrow),this.add(this.rArrow),this.rArrow.flipX=!0,this.add(this.logo)}update(e){super.update(e),this.logo.overlapsPoint(n.default.mouse.x,n.default.mouse.y)&&n.default.mouse.isMBDown(h.MouseButtons.PRIMARY)?this.logo.angle+=60*e*5:this.logo.angle=0,this.logo.y=.15*n.default.cnv.offsetHeight,this.logo.screenCenter(u.Axes.X),n.default.cnv.offsetWidth>n.default.cnv.offsetHeight?this.logo.setGraphicSize(.5*n.default.cnv.width):this.logo.setGraphicSize(0,.05*n.default.cnv.height)}}t.default=l},496:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.x=0,this.y=0,this.deltaX=0,this.deltaY=0,this.mouseMap=new Map,this.justPressedMap=new Map,this.hasClickedAtLeastOnce=!1}init(){window.addEventListener("mousedown",(e=>{this.onMouseDown(e)})),window.addEventListener("mouseenter",(e=>{this.onMouseEnter(e)})),window.addEventListener("mouseleave",(e=>{this.onMouseLeave(e)})),window.addEventListener("mousemove",(e=>{this.onMouseMove(e)})),window.addEventListener("mouseout",(e=>{this.onMouseOut(e)})),window.addEventListener("mouseover",(e=>{this.onMouseOver(e)})),window.addEventListener("mouseup",(e=>{this.onMouseUp(e)})),window.addEventListener("contextmenu",(e=>(this.onContextMenu(e),!1)))}onMouseDown(e){this.hasClickedAtLeastOnce=!0,this.mouseMap.set(e.button,!0),this.getPosFromEvent(e)}onMouseEnter(e){this.getPosFromEvent(e)}onMouseLeave(e){this.getPosFromEvent(e)}onMouseMove(e){this.getPosFromEvent(e)}onMouseOut(e){this.getPosFromEvent(e)}onMouseOver(e){this.getPosFromEvent(e)}onMouseUp(e){this.mouseMap.set(e.button,!1),this.justPressedMap.set(e.button,!0),this.getPosFromEvent(e)}onContextMenu(e){this.getPosFromEvent(e)}isMBDown(e){return!!this.mouseMap.has(e)&&this.mouseMap.get(e)}justPressed(e){return!!this.justPressedMap.has(e)&&this.justPressedMap.get(e)}getPosFromEvent(e){this.x=e.x,this.y=e.y,this.deltaX=e.movementX,this.deltaY=e.movementY}resetDeltas(){this.deltaX=0,this.deltaY=0,this.justPressedMap.clear()}}},796:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(864)),a=s(916),r=i(s(236)),o=i(s(668)),u=i(s(484));class h extends o.default{constructor(e=0,t=0){super(),this.x=0,this.y=0,this.width=0,this.height=0,this.angle=0,this.alpha=1,this.scale=new r.default(1,1),this.flipX=!1,this.x=e,this.y=t}draw(){if(null!=this.graphic){let e=this.graphic.img;n.default.ctx.globalAlpha=this.alpha,n.default.ctx.save(),this.flipX&&(n.default.ctx.translate(this.x+this.width/2,this.y+this.width/2),n.default.ctx.scale(-1,1),n.default.ctx.translate(-(this.x+this.width/2),-(this.y+this.width/2))),n.default.ctx.translate(this.x+this.width/2,this.y+this.height/2),this.flipX?n.default.ctx.rotate(-this.angle*Math.PI/180):n.default.ctx.rotate(this.angle*Math.PI/180),n.default.ctx.drawImage(e,-this.width/2,-this.height/2,this.width,this.height),n.default.ctx.restore(),n.default.ctx.globalAlpha=1}}loadGraphic(e){this.graphic=new u.default(e,((e,t)=>{this.graphic.img=e,this.width=e.width,this.height=e.height,this.onGraphicLoad()}))}onGraphicLoad(){}screenCenter(e){e==a.Axes.X?this.x=(n.default.cnv.offsetWidth-this.width)/2:(e==a.Axes.Y||(this.x=(n.default.cnv.offsetWidth-this.width)/2),this.y=(n.default.cnv.offsetHeight-this.height)/2)}setGraphicSize(e=0,t=0){if(!(e<=0&&t<=0)){var s=e/this.graphic.img.width,i=t/this.graphic.img.height;this.scale.set(s,i),e<=0?this.scale.x=i:t<=0&&(this.scale.y=s)}}create(){}update(e){if(null!=this.graphic){let e=this.graphic.img;this.width=e.width*this.scale.x,this.height=e.height*this.scale.y}}destroy(){this.graphic.destroy()}}t.default=h},248:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.members=[]}create(){}draw(){this.members.forEach((e=>{e.draw()}))}update(e){this.members.forEach((t=>{t.update(e)}))}destroy(){}add(e){this.members.push(e),e.create()}}},396:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class s{static make(e,t){let i=e;return e.split("").forEach(((e,n)=>{if(s.NORMAL.includes(e)){let n=s.NORMAL.indexOf(e);t.length>n&&(i=i.replace(e,t[n]))}})),i}}s.NORMAL=Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+"),s.BOLD=Array.from("𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"),s.SMALL_CAPS=Array.from("ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀsᴛᴜᴠᴡxʏᴢ0123456789﹗@#﹩﹪^﹠﹡⁽⁾⁻+"),s.ITALIC=Array.from("𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"),s.ITALIC_BOLD=Array.from("𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯"),s.SUPERSCRIPT=Array.from("ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹﹗@#﹩﹪^﹠﹡⁽⁾⁻+"),t.default=s},916:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),t.Axes=void 0,function(e){e[e.X=0]="X",e[e.Y=1]="Y",e[e.XY=2]="XY"}(s||(t.Axes=s={}))},648:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),t.MouseButtons=void 0,function(e){e[e.PRIMARY=0]="PRIMARY",e[e.TERTIARY=1]="TERTIARY",e[e.SECONDARY=2]="SECONDARY",e[e.BACK=3]="BACK",e[e.FORWARD=4]="FORWARD"}(s||(t.MouseButtons=s={}))},668:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.x=0,this.y=0,this.width=0,this.height=0}overlaps(e){return this.x<e.x+e.width&&this.x+this.width>e.x&&this.y<e.y+e.height&&this.y+this.height>e.y}overlapsPoint(e,t){return this.x<=e&&e<=this.x+this.width&&this.y<=t&&t<=this.y+this.height}}},236:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e=0,t=0){this.x=0,this.y=0,this.x=e,this.y=t}set(e,t){this.x=e,this.y=t}}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var s=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(s.exports,s,s.exports,__webpack_require__),s.exports}var __webpack_exports__=__webpack_require__(864)})();