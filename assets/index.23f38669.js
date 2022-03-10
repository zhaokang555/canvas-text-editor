var D=Object.defineProperty;var M=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var k=(r,t,e)=>t in r?D(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,z=(r,t)=>{for(var e in t||(t={}))j.call(t,e)&&k(r,e,t[e]);if(M)for(var e of M(t))A.call(t,e)&&k(r,e,t[e]);return r};var h=(r,t,e)=>(k(r,typeof t!="symbol"?t+"":t,e),e);import{V as w,j as F,r as I,R as W,a as X}from"./vendor.4f28c16a.js";const _=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}};_();class Z{constructor(t,e,s,i,o){h(this,"offsetY");h(this,"calcLayoutForChars",()=>{let t=this.left;this.chars.forEach(e=>{e.setPosition(t,this.top+this.offsetY),t+=e.width})});this.chars=t,this.width=e,this.height=s,this.left=i,this.top=o,this.offsetY=Math.max(...this.chars.map(n=>n.textMetrics.fontBoundingBoxAscent)),this.calcLayoutForChars(),this.chars.forEach((n,l)=>{n.prev=this.chars[l-1]||null})}}class V{constructor(t,e,s,i,o){h(this,"softLines",[]);h(this,"width",0);h(this,"height",0);h(this,"calcLayoutForSoftLines",()=>{let t=[],e=0,s=0,i=this.top;if(this.chars.forEach(o=>{if(t.length===0)t.push(o),e+=o.width,s=Math.max(s,o.height);else if(e+o.width<=this.maxWidth)t.push(o),e+=o.width,s=Math.max(s,o.height);else{const n=new Z(t,e,s,this.left,i);this.softLines.push(n),i+=s,t=[o],e=o.width,s=o.height}}),t.length>0){const o=new Z(t,e,s,this.left,i);this.softLines.push(o)}});h(this,"calcLayout",()=>{this.width=Math.max(...this.softLines.map(t=>t.width)),this.height=this.softLines.reduce((t,e)=>t+e.height,0)});h(this,"render",()=>{this.chars.forEach(t=>t.render())});this.chars=t,this.store=e,this.left=s,this.top=i,this.maxWidth=o,this.calcLayoutForSoftLines(),this.calcLayout()}destructor(){this.chars.forEach(t=>t.destructor())}}class L{constructor(t,e,s,i,o,n,l={}){h(this,"zIndex",0);h(this,"isMouseHovering",!1);h(this,"handleMouseMove",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;this.isMouseHovering=s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height});this.left=t,this.top=e,this.width=s,this.height=i,this.cursorType=o,this.store=n,Object.entries(l).forEach(([c,a])=>this[c]=a),n.ctx.canvas.addEventListener("mousemove",this.handleMouseMove)}destructor(){this.store.ctx.canvas.removeEventListener("mousemove",this.handleMouseMove)}render(){this.isMouseHovering&&this.zIndex>=this.store.mouse.hover.topLayerZIndex&&(this.store.mouse.hover.topLayerZIndex=this.zIndex,this.store.mouse.hover.topLayerCursorType=this.cursorType)}}var v;(function(r){r.defaultCursor="default",r.ewResize="ew-resize",r.nsResize="ns-resize",r.neswResize="nesw-resize",r.nwseResize="nwse-resize",r.move="move",r.text="text"})(v||(v={}));var x=v;class y{constructor(t,e,s,i,o,n,l={}){h(this,"zIndex",0);h(this,"handleClick",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&(this.zIndex>this.store.mouse.click.topLayerZIndex?(this.store.mouse.click.topLayerCallbacks=[()=>this.onClick(s,i)],this.store.mouse.click.topLayerZIndex=this.zIndex):this.zIndex===this.store.mouse.click.topLayerZIndex&&this.store.mouse.click.topLayerCallbacks.push(()=>this.onClick(s,i)))});this.left=t,this.top=e,this.width=s,this.height=i,this.onClick=o,this.store=n,Object.entries(l).forEach(([c,a])=>this[c]=a),this.store.ctx.canvas.addEventListener("click",this.handleClick)}destructor(){this.store.ctx.canvas.removeEventListener("click",this.handleClick)}}const $="rgba(0, 0, 0, 0.15)";class q{constructor(t,e,s,i,o){h(this,"isSelected",!1);this.left=t,this.top=e,this.width=s,this.height=i,this.store=o}render(){this.isSelected&&(this.store.ctx.fillStyle=$,this.store.ctx.fillRect(this.left,this.top,this.width,this.height))}}class N{constructor(t,e,s,i,o,n){h(this,"handleMousedown",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&this.onMousedown()});this.left=t,this.top=e,this.width=s,this.height=i,this.onMousedown=o,this.store=n,this.store.ctx.canvas.addEventListener("mousedown",this.handleMousedown)}destructor(){this.store.ctx.canvas.removeEventListener("mousedown",this.handleMousedown)}}class K{constructor(t,e,s,i,o,n){h(this,"handleMouseup",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&this.onMouseup()});this.left=t,this.top=e,this.width=s,this.height=i,this.onMouseup=o,this.store=n,this.store.ctx.canvas.addEventListener("mouseup",this.handleMouseup)}destructor(){this.store.ctx.canvas.removeEventListener("mouseup",this.handleMouseup)}}class B{constructor(t,e,s){h(this,"mousedownZone");h(this,"mouseupZone");this.clickableZone=t;const{left:i,top:o,width:n,height:l,store:c}=t;this.mousedownZone=new N(i,o,n,l,e,c),this.mouseupZone=new K(i,o,n,l,s,c)}setPosition(t,e){this.clickableZone.left=t,this.clickableZone.top=e,this.mousedownZone.left=t,this.mousedownZone.top=e,this.mouseupZone.left=t,this.mouseupZone.top=e}}const S=10;class u{constructor(t,e,s,i={}){h(this,"textMetrics");h(this,"top",0);h(this,"color","#000");h(this,"fontSize",50);h(this,"prev",null);h(this,"boundingBox");h(this,"leftHalf");h(this,"rightHalf");h(this,"selectableZone");h(this,"setPosition",(t,e)=>{this.top=e;const s=e-this.textMetrics.fontBoundingBoxAscent;this.boundingBox.left=t,this.boundingBox.top=s,this.leftHalf.setPosition(t,s),this.rightHalf.setPosition(t+this.width/2,s),this.selectableZone.left=t,this.selectableZone.top=s});h(this,"render",()=>{this.boundingBox.render(),this.selectableZone.render(),this.setStyle(),this.store.ctx.fillText(this.char,this.left,this.top)});h(this,"handleClickLeft",()=>{this.prev?(this.blinkingCursor.left=this.prev.rightHalf.clickableZone.left+this.prev.rightHalf.clickableZone.width,this.blinkingCursor.top=this.prev.rightHalf.clickableZone.top,this.blinkingCursor.height=this.prev.fontSize):(this.blinkingCursor.left=this.leftHalf.clickableZone.left,this.blinkingCursor.top=this.leftHalf.clickableZone.top,this.blinkingCursor.height=this.fontSize),this.blinkingCursor.afterClick()});h(this,"handleClickRight",()=>{this.blinkingCursor.left=this.rightHalf.clickableZone.left+this.rightHalf.clickableZone.width,this.blinkingCursor.top=this.rightHalf.clickableZone.top,this.blinkingCursor.height=this.fontSize,this.blinkingCursor.afterClick()});h(this,"handleMousedownLeft",()=>{this.store.clearSelect(),this.store.mouse.select.mousedownChar=this,this.store.mouse.select.isMousedownLeftHalf=!0});h(this,"handleMousedownRight",()=>{this.store.clearSelect(),this.store.mouse.select.mousedownChar=this,this.store.mouse.select.isMousedownLeftHalf=!1});h(this,"handleMouseupLeft",()=>{this.store.mouse.select.mouseupChar=this,this.store.mouse.select.isMouseupLeftHalf=!0,this.store.finishSelect()});h(this,"handleMouseupRight",()=>{this.store.mouse.select.mouseupChar=this,this.store.mouse.select.isMouseupLeftHalf=!1,this.store.finishSelect()});this.char=t,this.store=e,this.blinkingCursor=s,Object.entries(i).forEach(([l,c])=>this[l]=c),this.setStyle(),this.textMetrics=e.ctx.measureText(t);const o=this.textMetrics.width,n=this.textMetrics.fontBoundingBoxDescent+this.textMetrics.fontBoundingBoxAscent;this.boundingBox=new L(-1/0,-1/0,o,n,x.text,e,{zIndex:S}),this.leftHalf=new B(new y(-1/0,-1/0,o/2,n,this.handleClickLeft,e,{zIndex:S}),this.handleMousedownLeft,this.handleMouseupLeft),this.rightHalf=new B(new y(-1/0,-1/0,o/2,n,this.handleClickRight,e,{zIndex:S}),this.handleMousedownRight,this.handleMouseupRight),this.selectableZone=new q(-1/0,-1/0,o,n,e)}get left(){return this.boundingBox.left}get boundingBoxTop(){return this.boundingBox.top}get width(){return this.boundingBox.width}get height(){return this.boundingBox.height}destructor(){this.boundingBox.destructor(),this.leftHalf.clickableZone.destructor(),this.rightHalf.clickableZone.destructor()}setStyle(){this.store.ctx.fillStyle=this.color,this.store.ctx.font=`${this.fontSize}px sans-serif`}}const p=5,G=1e3;class f extends L{constructor(t,e,s,i,o={}){const n=t-p,l=e-p,c=2*p,a=2*p;super(n,l,c,a,s,i,z({zIndex:G},o));h(this,"borderColor","#999");h(this,"backgroundColor","#fff");h(this,"render",()=>{super.render(),this.store.ctx.beginPath(),this.store.ctx.setLineDash([]),this.store.ctx.arc(this.centerX,this.centerY,p,0,Math.PI*2),this.store.ctx.fillStyle=this.backgroundColor,this.store.ctx.fill(),this.store.ctx.strokeStyle=this.borderColor,this.store.ctx.stroke(),this.store.ctx.closePath()});this.centerX=t,this.centerY=e,this.cursorType=s}}const J="#999",Q=1,m=10,U=100;class C extends L{constructor(t,e,s){const i=e.clone().subtract(t).rotate(Math.PI/2).normalize(),o=[t.clone().add(i.clone().multiplyScalar(m/2)),t.clone().add(i.clone().multiplyScalar(-m/2)),e.clone().add(i.clone().multiplyScalar(m/2)),e.clone().add(i.clone().multiplyScalar(-m/2))],n=Math.min(...o.map(d=>d.x)),l=Math.min(...o.map(d=>d.y)),c=Math.max(...o.map(d=>d.x)),a=Math.max(...o.map(d=>d.y)),g=c-n,Y=a-l;super(n,l,g,Y,x.move,s,{zIndex:U});this.from=t,this.to=e}render(){super.render(),this.store.ctx.beginPath(),this.store.ctx.strokeStyle=J,this.store.ctx.lineWidth=Q,this.store.ctx.setLineDash([3]),this.store.ctx.moveTo(this.from.x,this.from.y),this.store.ctx.lineTo(this.to.x,this.to.y),this.store.ctx.stroke()}}const{round:E}=Math,H=1e3;class tt{constructor(t){h(this,"height",50);h(this,"startBlinkingTimestamp",0);h(this,"_left",-1/0);h(this,"_top",-1/0);h(this,"isShow",!1);this.store=t}get left(){return this._left}set left(t){this._left=E(t)}get top(){return this._top}set top(t){this._top=E(t)}show(){this.isShow=!0,this.startBlinkingTimestamp=Date.now()}hide(){this.isShow=!1}afterClick(){this.store.hasSelectText()?this.hide():this.show()}render(){if(!this.isShow)return;(Date.now()-this.startBlinkingTimestamp)%H/H<.5&&(this.store.ctx.beginPath(),this.store.ctx.moveTo(this.left,this.top),this.store.ctx.lineTo(this.left,this.top+this.height),this.store.ctx.strokeStyle="#000",this.store.ctx.lineWidth=1,this.store.ctx.stroke())}}class et{constructor(t){h(this,"chars",[]);h(this,"mouse",{click:{topLayerZIndex:-1/0,topLayerCallbacks:[]},hover:{topLayerZIndex:-1/0,topLayerCursorType:x.defaultCursor},select:{mousedownChar:null,mouseupChar:null,isMousedownLeftHalf:!0,isMouseupLeftHalf:!0}});this.ctx=t}clearSelect(){this.mouse.select.mousedownChar=null,this.mouse.select.mouseupChar=null,this.mouse.select.isMousedownLeftHalf=!0,this.mouse.select.isMouseupLeftHalf=!0,this.chars.forEach(t=>t.selectableZone.isSelected=!1)}finishSelect(){const{mousedownChar:t,mouseupChar:e,isMousedownLeftHalf:s,isMouseupLeftHalf:i}=this.mouse.select;if(!t||!e)return;const o=this.chars.findIndex(a=>a===t),n=this.chars.findIndex(a=>a===e);let l,c;o<n||o===n&&s&&!i?(l=s?o:o+1,c=i?n-1:n):(l=i?n:n+1,c=s?o-1:o),this.chars.forEach((a,g)=>{a.selectableZone.isSelected=g>=l&&g<=c})}hasSelectText(){return this.chars.some(t=>t.selectableZone.isSelected)}}const{defaultCursor:st,ewResize:R,nsResize:T,neswResize:P,nwseResize:O}=x;class it{constructor(t,e={}){h(this,"canvas");h(this,"store");h(this,"left",0);h(this,"top",0);h(this,"width",400);h(this,"height",300);h(this,"backgroundColor","#fff");h(this,"paddingLeft",10);h(this,"paragraphs",[]);h(this,"sizeControlPoints",[]);h(this,"borders",[]);h(this,"blinkingCursor");h(this,"blankSpace");h(this,"render",()=>{requestAnimationFrame(this.render),this.clearCanvas(),this.paragraphs.forEach(t=>t.render()),this.borders.forEach(t=>t.render()),this.sizeControlPoints.forEach(t=>t.render()),this.blinkingCursor.render(),this.canvas.style.cursor=this.store.mouse.hover.topLayerCursorType,this.store.mouse.click.topLayerCallbacks.forEach(t=>t()),this.store.mouse.click.topLayerCallbacks=[],this.store.mouse.click.topLayerZIndex=-1/0});h(this,"clearCanvas",()=>{this.store.ctx.fillStyle=this.backgroundColor,this.store.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.store.mouse.hover.topLayerZIndex=-1/0,this.store.mouse.hover.topLayerCursorType=st});h(this,"handleClickOnTheBlankSpace",(t,e)=>{let s=null,i=1/0;for(let l of this.paragraphs)for(let c of l.softLines){const a=e-c.top;(s==null||a>=0&&a<i)&&(s=c,i=a)}if(s==null)return;if(t<=s.chars[0].left){s.chars[0].handleClickLeft();return}let o=s.chars[0],n=t-o.left;for(let l of s.chars){const c=t-l.left;c>=0&&c<n&&(o=l,n=c)}n<=o.width/2?o.handleClickLeft():o.handleClickRight()});Object.entries(e).forEach(([i,o])=>this[i]=o),this.canvas=t;const s=this.canvas.getContext("2d");this.store=new et(s),this.blankSpace=new y(this.left,this.top,this.width,this.height,this.handleClickOnTheBlankSpace,this.store),this.blinkingCursor=new tt(this.store),this.initParagraphs(),this.initBorder(),this.initSizeControlPoints(),this.moveBlinkingCursorToEnd(),requestAnimationFrame(this.render)}destructor(){this.paragraphs.forEach(t=>t.destructor()),this.borders.forEach(t=>t.destructor()),this.sizeControlPoints.forEach(t=>t.destructor())}initParagraphs(){const t=[new u("/",this.store,this.blinkingCursor,{color:"red",fontSize:80}),new u("t",this.store,this.blinkingCursor,{color:"orange",fontSize:80}),new u("h",this.store,this.blinkingCursor,{color:"yellow",fontSize:80}),new u("o",this.store,this.blinkingCursor,{color:"green",fontSize:80}),new u("u",this.store,this.blinkingCursor,{color:"lightblue",fontSize:80}),new u("g",this.store,this.blinkingCursor,{color:"blue",fontSize:80}),new u("h",this.store,this.blinkingCursor,{color:"purple",fontSize:80}),new u("t",this.store,this.blinkingCursor,{color:"red",fontSize:80}),new u("w",this.store,this.blinkingCursor,{color:"orange",fontSize:80}),new u("o",this.store,this.blinkingCursor,{color:"yellow",fontSize:80}),new u("r",this.store,this.blinkingCursor,{color:"green",fontSize:80}),new u("k",this.store,this.blinkingCursor,{color:"lightblue",fontSize:80}),new u("s",this.store,this.blinkingCursor,{color:"blue",fontSize:80}),new u("\u601D",this.store,this.blinkingCursor,{color:"purple",fontSize:80}),new u("\u7279",this.store,this.blinkingCursor,{color:"red",fontSize:80}),new u("\u6C83",this.store,this.blinkingCursor,{color:"orange",fontSize:80}),new u("\u514B",this.store,this.blinkingCursor,{color:"yellow",fontSize:80})];this.paragraphs=[new V(t,this.store,this.left+this.paddingLeft,this.top,this.width-this.paddingLeft)],this.store.chars.push(...t)}initBorder(){const t=new w(this.left,this.top),e=new w(this.left+this.width,this.top),s=new w(this.left,this.top+this.height),i=new w(this.left+this.width,this.top+this.height);this.borders=[new C(t,e,this.store),new C(e,i,this.store),new C(i,s,this.store),new C(s,t,this.store)]}initSizeControlPoints(){this.sizeControlPoints=[new f(this.left,this.top,O,this.store),new f(this.left,this.top+this.height/2,R,this.store),new f(this.left,this.top+this.height,P,this.store),new f(this.left+this.width/2,this.top,T,this.store),new f(this.left+this.width/2,this.top+this.height,T,this.store),new f(this.left+this.width,this.top,P,this.store),new f(this.left+this.width,this.top+this.height/2,R,this.store),new f(this.left+this.width,this.top+this.height,O,this.store)]}moveBlinkingCursorToEnd(){const t=this.blinkingCursor;if(this.paragraphs.length>0){const e=this.paragraphs[this.paragraphs.length-1],s=e.chars[e.chars.length-1];t.left=s.left+s.width,t.top=s.boundingBoxTop,t.height=s.fontSize}else t.left=this.left+this.paddingLeft,t.top=this.top;t.show()}}const b=F.exports.jsx;function ot(){const r=I.exports.useRef(null);return I.exports.useEffect(()=>{r.current&&new it(r.current,{left:100,top:100})},[]),b("div",{children:b("canvas",{ref:r,width:"800",height:"600"})})}W.render(b(X.StrictMode,{children:b(ot,{})}),document.getElementById("root"));
