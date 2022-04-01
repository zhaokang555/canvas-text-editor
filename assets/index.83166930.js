var _=Object.defineProperty;var H=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var M=(r,t,e)=>t in r?_(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,P=(r,t)=>{for(var e in t||(t={}))F.call(t,e)&&M(r,e,t[e]);if(H)for(var e of H(t))V.call(t,e)&&M(r,e,t[e]);return r};var o=(r,t,e)=>(M(r,typeof t!="symbol"?t+"":t,e),e);import{V as C,_ as y,j as K,r as W,R as q,a as $}from"./vendor.2ebbd48e.js";const G=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const h of i)if(h.type==="childList")for(const n of h.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const h={};return i.integrity&&(h.integrity=i.integrity),i.referrerpolicy&&(h.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?h.credentials="include":i.crossorigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function s(i){if(i.ep)return;i.ep=!0;const h=e(i);fetch(i.href,h)}};G();class I{constructor(t,e,s,i,h,n,c={}){o(this,"zIndex",0);o(this,"isMouseHovering",!1);o(this,"handleMouseMove",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;this.isMouseHovering=s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height});this.left=t,this.top=e,this.width=s,this.height=i,this.cursorType=h,this.store=n,Object.entries(c).forEach(([a,l])=>this[a]=l),n.ctx.canvas.addEventListener("mousemove",this.handleMouseMove)}destructor(){this.store.ctx.canvas.removeEventListener("mousemove",this.handleMouseMove)}render(){this.isMouseHovering&&this.zIndex>=this.store.mouse.hover.topLayerZIndex&&(this.store.mouse.hover.topLayerZIndex=this.zIndex,this.store.mouse.hover.topLayerCursorType=this.cursorType)}move(t,e){this.left+=t,this.top+=e}addWidthHeight(t,e){this.width+=t,this.height+=e}}var T;(function(r){r.defaultCursor="default",r.ewResize="ew-resize",r.nsResize="ns-resize",r.neswResize="nesw-resize",r.nwseResize="nwse-resize",r.move="move",r.text="text"})(T||(T={}));var w=T;const J="rgba(0, 0, 0, 0.15)";class Q{constructor(t,e,s,i,h){o(this,"isSelected",!1);this.left=t,this.top=e,this.width=s,this.height=i,this.store=h}render(){this.isSelected&&(this.store.ctx.fillStyle=J,this.store.ctx.fillRect(this.left,this.top,this.width,this.height))}}class tt{constructor(t,e,s,i,h,n,c={}){o(this,"zIndex",0);o(this,"handleClick",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&(this.zIndex>this.store.mouse.click.topLayerZIndex?(this.store.mouse.click.topLayerCallbacks=[()=>this.onClick(s,i)],this.store.mouse.click.topLayerZIndex=this.zIndex):this.zIndex===this.store.mouse.click.topLayerZIndex&&this.store.mouse.click.topLayerCallbacks.push(()=>this.onClick(s,i)))});this.left=t,this.top=e,this.width=s,this.height=i,this.onClick=h,this.store=n,Object.entries(c).forEach(([a,l])=>this[a]=l),this.store.ctx.canvas.addEventListener("click",this.handleClick)}destructor(){this.store.ctx.canvas.removeEventListener("click",this.handleClick)}move(t,e){this.left+=t,this.top+=e}addWidthHeight(t,e){this.width+=t,this.height+=e}}class D{constructor(t,e,s,i,h,n,c={}){o(this,"zIndex",0);o(this,"handleMousedown",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&this.zIndex>this.store.mouse.mousedown.topLayerZIndex&&(this.store.mouse.mousedown.topLayerCallback=()=>this.onMousedown(s,i),this.store.mouse.mousedown.topLayerZIndex=this.zIndex)});this.left=t,this.top=e,this.width=s,this.height=i,this.onMousedown=h,this.store=n,Object.entries(c).forEach(([a,l])=>this[a]=l),this.store.ctx.canvas.addEventListener("mousedown",this.handleMousedown)}destructor(){this.store.ctx.canvas.removeEventListener("mousedown",this.handleMousedown)}move(t,e){this.left+=t,this.top+=e}addWidthHeight(t,e){this.width+=t,this.height+=e}}class et{constructor(t,e,s,i,h,n){o(this,"handleMouseup",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&this.onMouseup(s,i)});this.left=t,this.top=e,this.width=s,this.height=i,this.onMouseup=h,this.store=n,this.store.ctx.canvas.addEventListener("mouseup",this.handleMouseup)}destructor(){this.store.ctx.canvas.removeEventListener("mouseup",this.handleMouseup)}move(t,e){this.left+=t,this.top+=e}addWidthHeight(t,e){this.width+=t,this.height+=e}}class B{constructor(t,e,s,i,h,n,c,a,l={}){o(this,"clickZone");o(this,"mousedownZone");o(this,"mouseupZone");this._left=t,this._top=e,this.width=s,this.height=i,this.onClick=h,this.onMousedown=n,this.onMouseup=c,this.store=a,this.clickZone=new tt(t,e,s,i,h,a,l),this.mousedownZone=new D(t,e,s,i,n,a),this.mouseupZone=new et(t,e,s,i,c,a)}get left(){return this._left}get top(){return this._top}destructor(){this.clickZone.destructor(),this.mousedownZone.destructor(),this.mouseupZone.destructor()}move(t,e){this.setPosition(this.left+t,this.top+e),this.clickZone.move(t,e),this.mousedownZone.move(t,e),this.mouseupZone.move(t,e)}addWidthHeight(t,e){this.width+=t,this.height+=e,this.clickZone.addWidthHeight(t,e),this.mousedownZone.addWidthHeight(t,e),this.mouseupZone.addWidthHeight(t,e)}setPosition(t,e){this._left=t,this._top=e,this.clickZone.left=t,this.clickZone.top=e,this.mousedownZone.left=t,this.mousedownZone.top=e,this.mouseupZone.left=t,this.mouseupZone.top=e}}const z=10;class u{constructor(t,e,s={}){o(this,"textMetrics");o(this,"top",0);o(this,"color","#000");o(this,"fontSize",50);o(this,"boundingBox");o(this,"leftHalf");o(this,"rightHalf");o(this,"selectZone");o(this,"setPosition",(t,e)=>{this.top=e;const s=e-this.textMetrics.fontBoundingBoxAscent;this.boundingBox.left=t,this.boundingBox.top=s,this.leftHalf.setPosition(t,s),this.rightHalf.setPosition(t+this.width/2,s),this.selectZone.left=t,this.selectZone.top=s});o(this,"render",()=>{this.boundingBox.render(),this.selectZone.render(),this.setStyle(),this.store.ctx.fillText(this.char,this.left,this.top)});o(this,"moveCursorToMyLeft",()=>{const{blinkingCursor:t}=this.store,e=this.store.getPrevCharInSoftLine(this);e?(t.left=e.rightHalf.left+e.rightHalf.width,t.top=e.rightHalf.top,t.height=e.fontSize,t.color=e.color,t.fontSize=e.fontSize):(t.left=this.leftHalf.left,t.top=this.leftHalf.top,t.height=this.fontSize,t.color=this.color,t.fontSize=this.fontSize),this.store.charUnderCursor=this});o(this,"moveCursorToMyRight",()=>{this.store.blinkingCursor.left=this.rightHalf.left+this.rightHalf.width,this.store.blinkingCursor.top=this.rightHalf.top,this.store.blinkingCursor.height=this.fontSize,this.store.blinkingCursor.color=this.color,this.store.blinkingCursor.fontSize=this.fontSize,this.store.charUnderCursor=this.store.getNextChar(this)});o(this,"handleClickLeft",()=>{this.moveCursorToMyLeft(),this.store.blinkingCursor.checkShouldShow()});o(this,"handleClickRight",()=>{this.moveCursorToMyRight(),this.store.blinkingCursor.checkShouldShow()});o(this,"handleMousedownLeft",()=>{this.store.clearSelect(),this.store.mouse.select.mousedownChar=this,this.store.mouse.select.isMousedownLeftHalf=!0});o(this,"handleMousedownRight",()=>{this.store.clearSelect(),this.store.mouse.select.mousedownChar=this,this.store.mouse.select.isMousedownLeftHalf=!1});o(this,"handleMouseupLeft",()=>{console.log("Char.handleMouseup"),this.store.mouse.select.mouseupChar=this,this.store.mouse.select.isMouseupLeftHalf=!0,this.store.finishSelect()});o(this,"handleMouseupRight",()=>{console.log("Char.handleMouseup"),this.store.mouse.select.mouseupChar=this,this.store.mouse.select.isMouseupLeftHalf=!1,this.store.finishSelect()});this.char=t,this.store=e,Object.entries(s).forEach(([n,c])=>this[n]=c),this.setStyle(),this.textMetrics=e.ctx.measureText(t===`
`?"":t);const i=this.textMetrics.width,h=this.textMetrics.fontBoundingBoxDescent+this.textMetrics.fontBoundingBoxAscent;this.boundingBox=new I(-1/0,-1/0,i,h,w.text,e,{zIndex:z}),this.leftHalf=new B(-1/0,-1/0,i/2,h,this.handleClickLeft,this.handleMousedownLeft,this.handleMouseupLeft,e,{zIndex:z}),this.rightHalf=new B(-1/0,-1/0,i/2,h,this.handleClickRight,this.handleMousedownRight,this.handleMouseupRight,e,{zIndex:z}),this.selectZone=new Q(-1/0,-1/0,i,h,e)}get left(){return this.boundingBox.left}get boundingBoxTop(){return this.boundingBox.top}get width(){return this.boundingBox.width}get height(){return this.boundingBox.height}destructor(){this.boundingBox.destructor(),this.leftHalf.destructor(),this.rightHalf.destructor()}setStyle(){this.store.ctx.fillStyle=this.color,this.store.ctx.font=`${this.fontSize}px sans-serif`}}class O{constructor(t,e,s,i,h,n,c={}){o(this,"startX",0);o(this,"startY",0);o(this,"isDragging",!1);o(this,"mousedownZone");o(this,"handleMouseup",t=>{console.log("DragZone.handleMouseup"),this.isDragging=!1});o(this,"handleMousemove",t=>{if(!this.isDragging)return;const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top,h=s-this.startX,n=i-this.startY;this.startX=s,this.startY=i,this.onDrag(h,n)});this.left=t,this.top=e,this.width=s,this.height=i,this.onDrag=h,this.store=n,this.mousedownZone=new D(t,e,s,i,(a,l)=>{this.isDragging=!0,this.startX=a,this.startY=l},n,c),this.store.ctx.canvas.addEventListener("mouseup",this.handleMouseup),this.store.ctx.canvas.addEventListener("mousemove",this.handleMousemove)}destructor(){this.store.ctx.canvas.removeEventListener("mousemove",this.handleMousemove),this.store.ctx.canvas.removeEventListener("mouseup",this.handleMouseup),this.mousedownZone.destructor()}move(t,e){this.left+=t,this.top+=e,this.mousedownZone.move(t,e)}addWidthHeight(t,e){this.width+=t,this.height+=e,this.mousedownZone.addWidthHeight(t,e)}}const v=5,Y=1e3;var d;(function(r){r.TopLeft="TopLeft",r.Top="Top",r.TopRight="TopRight",r.BottomLeft="BottomLeft",r.Bottom="Bottom",r.BottomRight="BottomRight",r.Left="Left",r.Right="Right"})(d||(d={}));function st(r){const{ewResize:t,nsResize:e,neswResize:s,nwseResize:i}=w;switch(r){case d.TopLeft:case d.BottomRight:return i;case d.TopRight:case d.BottomLeft:return s;case d.Top:case d.Bottom:return e;case d.Left:case d.Right:return t}}class g extends I{constructor(t,e,s,i,h={}){const n=t-v,c=e-v,a=2*v,l=2*v,f=st(s);super(n,c,a,l,f,i,P({zIndex:Y},h));o(this,"borderColor","#999");o(this,"backgroundColor","#fff");o(this,"dragZone");o(this,"render",()=>{super.render(),this.store.ctx.beginPath(),this.store.ctx.arc(this.centerX,this.centerY,v,0,Math.PI*2),this.store.ctx.fillStyle=this.backgroundColor,this.store.ctx.fill(),this.store.ctx.strokeStyle=this.borderColor,this.store.ctx.stroke(),this.store.ctx.closePath()});o(this,"handleDrag",(t,e)=>{const{editor:s}=this.store,{TopLeft:i,Top:h,TopRight:n,BottomLeft:c,Bottom:a,BottomRight:l,Left:f,Right:L}=d;switch(this.type){case i:s.move(t,e),s.addWidthHeight(-t,-e);break;case h:s.move(0,e),s.addWidthHeight(0,-e);break;case n:s.move(0,e),s.addWidthHeight(t,-e);break;case L:s.addWidthHeight(t,0);break;case l:s.addWidthHeight(t,e);break;case a:s.addWidthHeight(0,e);break;case c:s.move(t,0),s.addWidthHeight(-t,e);break;case f:s.move(t,0),s.addWidthHeight(-t,0);break}});this.centerX=t,this.centerY=e,this.type=s,this.dragZone=new O(n,c,a,l,this.handleDrag,i,{zIndex:Y})}destructor(){super.destructor(),this.dragZone.destructor()}move(t,e){super.move(t,e),this.centerX+=t,this.centerY+=e,this.dragZone.move(t,e)}}const it="#999",ot=1,x=10,X=100;var p;(function(r){r.Left="Left",r.Right="Right",r.Top="Top",r.Bottom="Bottom"})(p||(p={}));class S extends I{constructor(t,e,s,i){const h=e.clone().subtract(t).rotate(Math.PI/2).normalize(),n=[t.clone().add(h.clone().multiplyScalar(x/2)),t.clone().add(h.clone().multiplyScalar(-x/2)),e.clone().add(h.clone().multiplyScalar(x/2)),e.clone().add(h.clone().multiplyScalar(-x/2))],c=Math.min(...n.map(m=>m.x)),a=Math.min(...n.map(m=>m.y)),l=Math.max(...n.map(m=>m.x)),f=Math.max(...n.map(m=>m.y)),L=l-c,R=f-a;super(c,a,L,R,w.move,i,{zIndex:X});o(this,"dragZone");o(this,"handleDrag",(t,e)=>{this.store.editor.move(t,e)});this.from=t,this.to=e,this.type=s,this.dragZone=new O(c,a,L,R,this.handleDrag,i,{zIndex:X})}destructor(){super.destructor(),this.dragZone.destructor()}move(t,e){super.move(t,e);const s=new C(t,e);this.from.add(s),this.to.add(s),this.dragZone.move(t,e)}addWidthHeight(t,e){this.type===p.Top||this.type===p.Bottom?(super.addWidthHeight(t,0),this.to.addScalarX(t),this.dragZone.addWidthHeight(t,0)):(super.addWidthHeight(0,e),this.to.addScalarY(e),this.dragZone.addWidthHeight(0,e))}render(){super.render(),this.store.ctx.save(),this.store.ctx.beginPath(),this.store.ctx.strokeStyle=it,this.store.ctx.lineWidth=ot,this.store.ctx.setLineDash([3]),this.store.ctx.moveTo(this.from.x,this.from.y),this.store.ctx.lineTo(this.to.x,this.to.y),this.store.ctx.stroke(),this.store.ctx.restore()}}class Z extends u{constructor(t,e,s={}){super(t,e,s);o(this,"isTemp",!0)}}function E(r){var e,s,i;return(((s=(e=window.navigator)==null?void 0:e.userAgentData)==null?void 0:s.platform)||((i=window.navigator)==null?void 0:i.platform)).toLowerCase().indexOf("mac")>-1?r.metaKey:r.ctrlKey}const{round:A}=Math,N=1e3;var k;(function(r){r.Backspace="Backspace",r.Enter="Enter"})(k||(k={}));class ht{constructor(t){o(this,"height",50);o(this,"startBlinkingTimestamp",0);o(this,"input");o(this,"color","#000");o(this,"fontSize",50);o(this,"isShow",!1);o(this,"_left",-1/0);o(this,"_top",-1/0);o(this,"onInput",t=>{const e=t;if(this.store.hasSelectedText()&&this.store.deleteSelectedChars(),e.inputType==="insertText"&&e.data!=null){const s=new u(e.data,this.store,{color:this.color,fontSize:this.fontSize});this.store.insertChar(s)}else if(e.inputType==="insertCompositionText"&&(this.store.clearTempCompositionChars(),e.data!=null)){const s=e.data.split("").map(i=>new Z(i,this.store,{color:this.color,fontSize:this.fontSize}));this.store.insertChars(s)}});o(this,"onKeyDown",async t=>{if(!this.store.isComposition)switch(t.key){case k.Backspace:this.isShow?this.store.deleteCharBeforeCursor():this.store.hasSelectedText()&&this.store.deleteSelectedChars();break;case k.Enter:const e=new u(`
`,this.store,{color:this.color,fontSize:this.fontSize});this.store.insertChar(e);break;case"c":E(t)&&await this.store.copySelectedChars();break;case"v":E(t)&&await this.store.paste();break;case"x":E(t)&&(await this.store.copySelectedChars(),this.store.deleteSelectedChars());break;case"a":this.store.selectAllChars();break}});o(this,"onCompositionStart",t=>{this.store.isComposition=!0});o(this,"onCompositionEnd",t=>{this.store.isComposition=!1,this.store.fixTempCompositionChar()});this.store=t;const{container:e}=this.store;let s=e.querySelector("input");s||(s=document.createElement("input"),s.style.position="absolute",s.style.width="0",s.style.padding="0",s.style.border="none",e.style.position="relative",e.appendChild(s),s.addEventListener("input",this.onInput),s.addEventListener("keydown",this.onKeyDown),s.addEventListener("compositionstart",this.onCompositionStart),s.addEventListener("compositionend",this.onCompositionEnd)),this.input=s}get left(){return this._left}set left(t){this._left=A(t)}get top(){return this._top}set top(t){this._top=A(t)}destructor(){this.input&&(this.input.removeEventListener("input",this.onInput),this.input.removeEventListener("keydown",this.onKeyDown),this.input.removeEventListener("compositionstart",this.onCompositionStart),this.input.removeEventListener("compositionend",this.onCompositionEnd))}move(t,e){this.left+=t,this.top+=e}show(){this.isShow=!0,this.startBlinkingTimestamp=Date.now()}hide(){this.isShow=!1,this.input.value=""}checkShouldShow(){document.activeElement!==this.input&&this.input.focus(),this.store.hasSelectedText()?this.hide():this.show()}render(){if(!this.isShow)return;(Date.now()-this.startBlinkingTimestamp)%N/N<.5&&(this.store.ctx.beginPath(),this.store.ctx.moveTo(this.left,this.top),this.store.ctx.lineTo(this.left,this.top+this.height),this.store.ctx.strokeStyle=this.color,this.store.ctx.lineWidth=1,this.store.ctx.stroke()),this.input.style.left=this.left+"px",this.input.style.top=this.top+"px",this.input.style.height=this.height+"px"}}class U{constructor(t,e,s,i,h){o(this,"offsetY");o(this,"calcLayoutForChars",()=>{let t=this.left;this.chars.forEach(e=>{e.setPosition(t,this.top+this.offsetY),t+=e.width})});this.chars=t,this.width=e,this.height=s,this.left=i,this.top=h,this.offsetY=Math.max(...this.chars.map(n=>n.textMetrics.fontBoundingBoxAscent)),this.calcLayoutForChars()}getFirstNonCtrlChar(){return this.chars[0]?this.chars[0].char!==`
`?this.chars[0]:this.chars[1]||null:null}}class j{constructor(t,e,s,i,h){o(this,"softLines",[]);o(this,"width",0);o(this,"height",0);o(this,"calcLayout",()=>{this.calcLayoutForSoftLines(),this.width=Math.max(...this.softLines.map(t=>t.width)),this.height=this.softLines.reduce((t,e)=>t+e.height,0)});o(this,"render",()=>{this.chars.forEach(t=>t.render())});o(this,"calcLayoutForSoftLines",()=>{this.softLines=[];let t=[],e=0,s=0,i=this.top;if(this.chars.forEach(h=>{if(t.length===0)t.push(h),e+=h.width,s=Math.max(s,h.height);else if(e+h.width<=this.maxWidth)t.push(h),e+=h.width,s=Math.max(s,h.height);else{const n=new U(t,e,s,this.left,i);this.softLines.push(n),i+=s,t=[h],e=h.width,s=h.height}}),t.length>0){const h=new U(t,e,s,this.left,i);this.softLines.push(h)}});this.chars=t,this.store=e,this.left=s,this.top=i,this.maxWidth=h,this.calcLayout()}destructor(){this.chars.forEach(t=>t.destructor())}}class rt{constructor(t,e,s){o(this,"chars",[]);o(this,"paragraphs",[]);o(this,"blinkingCursor");o(this,"charUnderCursor",null);o(this,"isComposition",!1);o(this,"mouse",{click:{topLayerZIndex:-1/0,topLayerCallbacks:[]},hover:{topLayerZIndex:-1/0,topLayerCursorType:w.defaultCursor},select:{mousedownChar:null,mouseupChar:null,isMousedownLeftHalf:!0,isMouseupLeftHalf:!0},mousedown:{topLayerZIndex:-1/0,topLayerCallback:()=>{}}});this.ctx=t,this.container=e,this.editor=s,this.blinkingCursor=new ht(this)}clearSelect(){this.mouse.select.mousedownChar=null,this.mouse.select.mouseupChar=null,this.mouse.select.isMousedownLeftHalf=!0,this.mouse.select.isMouseupLeftHalf=!0,this.chars.forEach(t=>t.selectZone.isSelected=!1)}selectAllChars(){this.chars.length>0&&(this.clearSelect(),this.mouse.select.mousedownChar=this.chars[0],this.mouse.select.isMousedownLeftHalf=!0,this.mouse.select.mouseupChar=this.chars[this.chars.length-1],this.mouse.select.isMouseupLeftHalf=!1,this.finishSelect(),this.blinkingCursor.checkShouldShow())}finishSelect(){const{mousedownChar:t,mouseupChar:e,isMousedownLeftHalf:s,isMouseupLeftHalf:i}=this.mouse.select;if(!t||!e)return;const h=this.chars.findIndex(l=>l===t),n=this.chars.findIndex(l=>l===e);let c,a;h<n||h===n&&s&&!i?(c=s?h:h+1,a=i?n-1:n):(c=i?n:n+1,a=s?h-1:h),this.chars.forEach((l,f)=>{l.selectZone.isSelected=f>=c&&f<=a})}hasSelectedText(){return this.chars.some(t=>t.selectZone.isSelected)}deleteSelectedChars(){const t=this.chars.filter(e=>e.selectZone.isSelected);if(t.length>0){const e=this.getNextChar(y.last(t)),s=this.getPrevChar(y.first(t));this.chars=this.chars.filter(i=>!i.selectZone.isSelected),t.forEach(i=>i.destructor()),this.splitCharsIntoParagraphs(),this.blinkingCursor.isShow=!0,e?e.char!==`
`?e.moveCursorToMyLeft():s?s.moveCursorToMyRight():this.moveCursorToStart():this.moveCursorToEnd()}}insertChar(t){this.chars.splice(this.getCursorIdx(),0,t),this.splitCharsIntoParagraphs(),t.moveCursorToMyRight()}insertChars(t){this.chars.splice(this.getCursorIdx(),0,...t),this.splitCharsIntoParagraphs(),t[t.length-1].moveCursorToMyRight()}clearTempCompositionChars(){const t=s=>s instanceof Z&&s.isTemp,e=this.chars.filter(t);if(e.length>0){const s=this.getNextChar(y.last(e));this.chars=this.chars.filter(i=>!t(i)),e.forEach(i=>i.destructor()),this.splitCharsIntoParagraphs(),s?s.moveCursorToMyLeft():this.moveCursorToEnd()}}fixTempCompositionChar(){this.chars.forEach(t=>{t instanceof Z&&(t.isTemp=!1)})}splitCharsIntoParagraphs(){const{chars:t,editor:e}=this;this.paragraphs=[];let s=[];t.forEach((i,h)=>{i.char===`
`&&(this.paragraphs.push(new j(s,this,e.left+e.paddingLeft,e.top,e.width-e.paddingLeft)),s=[]),s.push(i),h===t.length-1&&this.paragraphs.push(new j(s,this,e.left+e.paddingLeft,e.top,e.width-e.paddingLeft))}),this.paragraphs.forEach((i,h)=>{const n=this.paragraphs[h-1]||null;n!=null&&(i.top=n.top+n.height),i.calcLayout()})}deleteCharBeforeCursor(){const t=this.getPrevChar(this.charUnderCursor);if(!!t)if(this.chars=this.chars.filter(e=>e!==t),t.destructor(),this.splitCharsIntoParagraphs(),this.charUnderCursor){const e=this.getPrevChar(this.charUnderCursor);e?e.moveCursorToMyRight():this.charUnderCursor.moveCursorToMyLeft()}else this.moveCursorToEnd()}getPrevCharInSoftLine(t){let e=null;for(const s of this.paragraphs)for(const i of s.softLines)i.chars.includes(t)&&(e=i);if(e!=null){const s=e.chars.indexOf(t),i=e.chars[s-1];if(i!=null)return i}return null}getCursorIdx(){return this.charUnderCursor!=null?this.chars.indexOf(this.charUnderCursor):this.chars.length}getPrevChar(t=null){if(t==null)return this.chars[this.chars.length-1];const e=this.chars.indexOf(t),s=this.chars[e-1];return s||null}getNextChar(t=null){if(t==null)return null;const e=this.chars.indexOf(t),s=this.chars[e+1];return s||null}moveCursorToEnd(){this.chars.length>0?this.chars[this.chars.length-1].moveCursorToMyRight():(this.blinkingCursor.left=this.editor.left+this.editor.paddingLeft,this.blinkingCursor.top=this.editor.top)}moveCursorToStart(){this.chars.length>0?this.chars[0].moveCursorToMyLeft():(this.blinkingCursor.left=this.editor.left+this.editor.paddingLeft,this.blinkingCursor.top=this.editor.top)}copySelectedChars(){return window.navigator.clipboard.writeText(this.chars.filter(t=>t.selectZone.isSelected).map(t=>t.char).join("")).catch(t=>{console.log("copy failed:",t)})}paste(){return window.navigator.clipboard.readText().then(t=>{if(t.length>0){const{color:e,fontSize:s}=this.blinkingCursor,i=t.split("").map(h=>new u(h,this,{color:e,fontSize:s}));this.insertChars(i)}}).catch(t=>{console.log("paste failed:",t)})}calcCursorPosition(){this.charUnderCursor?this.charUnderCursor.moveCursorToMyRight():this.moveCursorToEnd()}}class nt{constructor(t,e={}){o(this,"store");o(this,"left",0);o(this,"top",0);o(this,"width",400);o(this,"height",300);o(this,"backgroundColor","#fff");o(this,"paddingLeft",10);o(this,"sizeControlPoints",[]);o(this,"borders",[]);o(this,"blankSpace");o(this,"render",()=>{requestAnimationFrame(this.render),this.clearCanvas(),this.store.paragraphs.forEach(t=>t.render()),this.borders.forEach(t=>t.render()),this.sizeControlPoints.forEach(t=>t.render()),this.store.blinkingCursor.render(),this.store.ctx.canvas.style.cursor=this.store.mouse.hover.topLayerCursorType,this.store.mouse.click.topLayerCallbacks.forEach(t=>t()),this.store.mouse.click.topLayerCallbacks=[],this.store.mouse.click.topLayerZIndex=-1/0,this.store.mouse.mousedown.topLayerCallback(),this.store.mouse.mousedown.topLayerCallback=()=>{},this.store.mouse.mousedown.topLayerZIndex=-1/0});o(this,"clearCanvas",()=>{this.store.ctx.fillStyle=this.backgroundColor,this.store.ctx.fillRect(0,0,this.store.ctx.canvas.width,this.store.ctx.canvas.height),this.store.mouse.hover.topLayerZIndex=-1/0,this.store.mouse.hover.topLayerCursorType=w.defaultCursor});o(this,"handleClickOnTheBlankSpace",(t,e)=>{const{char:s,leftSide:i}=this.mapPositionInBlankSpaceToChar(t,e);s&&(i?s.handleClickLeft():s.handleClickRight())});o(this,"handleMousedownBlankSpace",(t,e)=>{const{char:s,leftSide:i}=this.mapPositionInBlankSpaceToChar(t,e);s&&(i?s.handleMousedownLeft():s.handleMousedownRight())});o(this,"handleMouseupBlankSpace",(t,e)=>{const{char:s,leftSide:i}=this.mapPositionInBlankSpaceToChar(t,e);s&&(i?s.handleMouseupLeft():s.handleMouseupRight())});Object.entries(e).forEach(([h,n])=>this[h]=n);const i=t.querySelector("canvas").getContext("2d");this.store=new rt(i,t,this),this.blankSpace=new B(this.left,this.top,this.width,this.height,this.handleClickOnTheBlankSpace,this.handleMousedownBlankSpace,this.handleMouseupBlankSpace,this.store),this.initParagraphs(),this.initBorder(),this.initSizeControlPoints(),this.moveBlinkingCursorToEnd(),requestAnimationFrame(this.render)}destructor(){this.blankSpace.destructor(),this.store.paragraphs.forEach(t=>t.destructor()),this.borders.forEach(t=>t.destructor()),this.sizeControlPoints.forEach(t=>t.destructor())}move(t,e){this.left+=t,this.top+=e,this.store.splitCharsIntoParagraphs(),this.blankSpace.move(t,e),this.borders.forEach(s=>s.move(t,e)),this.sizeControlPoints.forEach(s=>s.move(t,e)),this.store.calcCursorPosition()}addWidthHeight(t,e){this.width+t<0&&(t=-this.width),this.height+e<0&&(e=-this.height),this.width+=t,this.height+=e,this.store.splitCharsIntoParagraphs(),this.blankSpace.addWidthHeight(t,e),this.borders.forEach(s=>{s.addWidthHeight(t,e),s.type===p.Right?s.move(t,0):s.type===p.Bottom&&s.move(0,e)}),this.sizeControlPoints.forEach(s=>{switch(s.type){case d.BottomRight:s.move(t,e);break;case d.Right:s.move(t,e/2);break;case d.TopRight:s.move(t,0);break;case d.Bottom:s.move(t/2,e);break;case d.Top:s.move(t/2,0);break;case d.BottomLeft:s.move(0,e);break;case d.Left:s.move(0,e/2);break}}),this.store.calcCursorPosition()}initParagraphs(){this.store.chars=[new u("/",this.store,{color:"red",fontSize:72}),new u("t",this.store,{color:"orange",fontSize:72}),new u("h",this.store,{color:"#dd0",fontSize:72}),new u("o",this.store,{color:"green",fontSize:72}),new u("u",this.store,{color:"lightblue",fontSize:72}),new u("g",this.store,{color:"blue",fontSize:72}),new u("h",this.store,{color:"purple",fontSize:72}),new u("t",this.store,{color:"red",fontSize:72}),new u("w",this.store,{color:"orange",fontSize:72}),new u("o",this.store,{color:"#dd0",fontSize:72}),new u("r",this.store,{color:"green",fontSize:72}),new u("k",this.store,{color:"lightblue",fontSize:72}),new u("s",this.store,{color:"blue",fontSize:72}),new u(`
`,this.store,{color:"purple",fontSize:72}),new u("\u601D",this.store,{color:"purple",fontSize:72}),new u("\u7279",this.store,{color:"red",fontSize:72}),new u("\u6C83",this.store,{color:"orange",fontSize:72}),new u("\u514B",this.store,{color:"#dd0",fontSize:72})],this.store.splitCharsIntoParagraphs()}initBorder(){const t=new C(this.left,this.top),e=new C(this.left+this.width,this.top),s=new C(this.left,this.top+this.height),i=new C(this.left+this.width,this.top+this.height);this.borders=[new S(t.clone(),e.clone(),p.Top,this.store),new S(e.clone(),i.clone(),p.Right,this.store),new S(s.clone(),i.clone(),p.Bottom,this.store),new S(t.clone(),s.clone(),p.Left,this.store)]}initSizeControlPoints(){const{TopLeft:t,Top:e,TopRight:s,BottomLeft:i,Bottom:h,BottomRight:n,Left:c,Right:a}=d;this.sizeControlPoints=[new g(this.left,this.top,t,this.store),new g(this.left,this.top+this.height/2,c,this.store),new g(this.left,this.top+this.height,i,this.store),new g(this.left+this.width/2,this.top,e,this.store),new g(this.left+this.width/2,this.top+this.height,h,this.store),new g(this.left+this.width,this.top,s,this.store),new g(this.left+this.width,this.top+this.height/2,a,this.store),new g(this.left+this.width,this.top+this.height,n,this.store)]}moveBlinkingCursorToEnd(){this.store.chars[this.store.chars.length-1].handleClickRight()}mapPositionInBlankSpaceToChar(t,e){const s={char:null,leftSide:!0};let i=null,h=1/0;for(let a of this.store.paragraphs)for(let l of a.softLines){const f=e-l.top;(i==null||f>=0&&f<h)&&(i=l,h=f)}if(i==null)return s;if(t<=i.left){const a=i.getFirstNonCtrlChar();if(a)return s.char=a,s}let n=i.chars[0],c=t-n.left;for(let a of i.chars){const l=t-a.left;l>=0&&l<c&&a.char!==`
`&&(n=a,c=l)}return s.leftSide=c<=n.width/2,s.char=n,s}}const at="_canvas_1p4nl_1";var ct={canvas:at};const b=K.exports.jsx;function lt(){const r=W.exports.useRef(null);return W.exports.useEffect(()=>{r.current&&new nt(r.current,{left:100,top:100})},[]),b("div",{ref:r,children:b("canvas",{width:"800",height:"600",className:ct.canvas})})}q.render(b($.StrictMode,{children:b(lt,{})}),document.getElementById("root"));
