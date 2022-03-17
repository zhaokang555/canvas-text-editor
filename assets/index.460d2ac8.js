var U=Object.defineProperty;var I=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var L=(n,t,e)=>t in n?U(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,T=(n,t)=>{for(var e in t||(t={}))_.call(t,e)&&L(n,e,t[e]);if(I)for(var e of I(t))A.call(t,e)&&L(n,e,t[e]);return n};var h=(n,t,e)=>(L(n,typeof t!="symbol"?t+"":t,e),e);import{V as m,j as F,r as B,R as N,a as W}from"./vendor.4f28c16a.js";const X=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}};X();class v{constructor(t,e,s,i,o,r,l={}){h(this,"zIndex",0);h(this,"isMouseHovering",!1);h(this,"handleMouseMove",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;this.isMouseHovering=s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height});this.left=t,this.top=e,this.width=s,this.height=i,this.cursorType=o,this.store=r,Object.entries(l).forEach(([c,a])=>this[c]=a),r.ctx.canvas.addEventListener("mousemove",this.handleMouseMove)}destructor(){this.store.ctx.canvas.removeEventListener("mousemove",this.handleMouseMove)}render(){this.isMouseHovering&&this.zIndex>=this.store.mouse.hover.topLayerZIndex&&(this.store.mouse.hover.topLayerZIndex=this.zIndex,this.store.mouse.hover.topLayerCursorType=this.cursorType)}}var y;(function(n){n.defaultCursor="default",n.ewResize="ew-resize",n.nsResize="ns-resize",n.neswResize="nesw-resize",n.nwseResize="nwse-resize",n.move="move",n.text="text"})(y||(y={}));var C=y;const V="rgba(0, 0, 0, 0.15)";class q{constructor(t,e,s,i,o){h(this,"isSelected",!1);this.left=t,this.top=e,this.width=s,this.height=i,this.store=o}render(){this.isSelected&&(this.store.ctx.fillStyle=V,this.store.ctx.fillRect(this.left,this.top,this.width,this.height))}}class ${constructor(t,e,s,i,o,r,l={}){h(this,"zIndex",0);h(this,"handleClick",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&(this.zIndex>this.store.mouse.click.topLayerZIndex?(this.store.mouse.click.topLayerCallbacks=[()=>this.onClick(s,i)],this.store.mouse.click.topLayerZIndex=this.zIndex):this.zIndex===this.store.mouse.click.topLayerZIndex&&this.store.mouse.click.topLayerCallbacks.push(()=>this.onClick(s,i)))});this.left=t,this.top=e,this.width=s,this.height=i,this.onClick=o,this.store=r,Object.entries(l).forEach(([c,a])=>this[c]=a),this.store.ctx.canvas.addEventListener("click",this.handleClick)}destructor(){this.store.ctx.canvas.removeEventListener("click",this.handleClick)}}class K{constructor(t,e,s,i,o,r){h(this,"handleMousedown",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&this.onMousedown(s,i)});this.left=t,this.top=e,this.width=s,this.height=i,this.onMousedown=o,this.store=r,this.store.ctx.canvas.addEventListener("mousedown",this.handleMousedown)}destructor(){this.store.ctx.canvas.removeEventListener("mousedown",this.handleMousedown)}}class G{constructor(t,e,s,i,o,r){h(this,"handleMouseup",t=>{const e=this.store.ctx.canvas.getBoundingClientRect(),s=t.clientX-e.left,i=t.clientY-e.top;s>=this.left&&i>=this.top&&s<=this.left+this.width&&i<=this.top+this.height&&this.onMouseup(s,i)});this.left=t,this.top=e,this.width=s,this.height=i,this.onMouseup=o,this.store=r,this.store.ctx.canvas.addEventListener("mouseup",this.handleMouseup)}destructor(){this.store.ctx.canvas.removeEventListener("mouseup",this.handleMouseup)}}class k{constructor(t,e,s,i,o,r,l,c,a={}){h(this,"clickableZone");h(this,"mousedownZone");h(this,"mouseupZone");this._left=t,this._top=e,this.width=s,this.height=i,this.onClick=o,this.onMousedown=r,this.onMouseup=l,this.store=c,this.clickableZone=new $(t,e,s,i,o,c,a),this.mousedownZone=new K(t,e,s,i,r,c),this.mouseupZone=new G(t,e,s,i,l,c)}get left(){return this._left}get top(){return this._top}destructor(){this.clickableZone.destructor(),this.mousedownZone.destructor(),this.mouseupZone.destructor()}setPosition(t,e){this._left=t,this._top=e,this.clickableZone.left=t,this.clickableZone.top=e,this.mousedownZone.left=t,this.mousedownZone.top=e,this.mouseupZone.left=t,this.mouseupZone.top=e}}const b=10;class u{constructor(t,e,s={}){h(this,"textMetrics");h(this,"top",0);h(this,"color","#000");h(this,"fontSize",50);h(this,"boundingBox");h(this,"leftHalf");h(this,"rightHalf");h(this,"selectableZone");h(this,"setPosition",(t,e)=>{this.top=e;const s=e-this.textMetrics.fontBoundingBoxAscent;this.boundingBox.left=t,this.boundingBox.top=s,this.leftHalf.setPosition(t,s),this.rightHalf.setPosition(t+this.width/2,s),this.selectableZone.left=t,this.selectableZone.top=s});h(this,"render",()=>{this.boundingBox.render(),this.selectableZone.render(),this.setStyle(),this.store.ctx.fillText(this.char,this.left,this.top)});h(this,"moveCursorToMyLeft",()=>{const{blinkingCursor:t}=this.store,e=this.store.getPrevCharInSoftLine(this);e?(t.left=e.rightHalf.left+e.rightHalf.width,t.top=e.rightHalf.top,t.height=e.fontSize,t.color=e.color,t.fontSize=e.fontSize):(t.left=this.leftHalf.left,t.top=this.leftHalf.top,t.height=this.fontSize,t.color=this.color,t.fontSize=this.fontSize),this.store.charUnderCursor=this});h(this,"moveCursorToMyRight",()=>{this.store.blinkingCursor.left=this.rightHalf.left+this.rightHalf.width,this.store.blinkingCursor.top=this.rightHalf.top,this.store.blinkingCursor.height=this.fontSize,this.store.blinkingCursor.color=this.color,this.store.blinkingCursor.fontSize=this.fontSize,this.store.charUnderCursor=this.store.getNextChar(this)});h(this,"handleClickLeft",()=>{this.moveCursorToMyLeft(),this.store.blinkingCursor.checkShouldShow()});h(this,"handleClickRight",()=>{this.moveCursorToMyRight(),this.store.blinkingCursor.checkShouldShow()});h(this,"handleMousedownLeft",()=>{this.store.clearSelect(),this.store.mouse.select.mousedownChar=this,this.store.mouse.select.isMousedownLeftHalf=!0});h(this,"handleMousedownRight",()=>{this.store.clearSelect(),this.store.mouse.select.mousedownChar=this,this.store.mouse.select.isMousedownLeftHalf=!1});h(this,"handleMouseupLeft",()=>{this.store.mouse.select.mouseupChar=this,this.store.mouse.select.isMouseupLeftHalf=!0,this.store.finishSelect()});h(this,"handleMouseupRight",()=>{this.store.mouse.select.mouseupChar=this,this.store.mouse.select.isMouseupLeftHalf=!1,this.store.finishSelect()});this.char=t,this.store=e,Object.entries(s).forEach(([r,l])=>this[r]=l),this.setStyle(),this.textMetrics=e.ctx.measureText(t===`
`?"":t);const i=this.textMetrics.width,o=this.textMetrics.fontBoundingBoxDescent+this.textMetrics.fontBoundingBoxAscent;this.boundingBox=new v(-1/0,-1/0,i,o,C.text,e,{zIndex:b}),this.leftHalf=new k(-1/0,-1/0,i/2,o,this.handleClickLeft,this.handleMousedownLeft,this.handleMouseupLeft,e,{zIndex:b}),this.rightHalf=new k(-1/0,-1/0,i/2,o,this.handleClickRight,this.handleMousedownRight,this.handleMouseupRight,e,{zIndex:b}),this.selectableZone=new q(-1/0,-1/0,i,o,e)}get left(){return this.boundingBox.left}get boundingBoxTop(){return this.boundingBox.top}get width(){return this.boundingBox.width}get height(){return this.boundingBox.height}destructor(){this.boundingBox.destructor(),this.leftHalf.destructor(),this.rightHalf.destructor()}setStyle(){this.store.ctx.fillStyle=this.color,this.store.ctx.font=`${this.fontSize}px sans-serif`}}const g=5,J=1e3;class d extends v{constructor(t,e,s,i,o={}){const r=t-g,l=e-g,c=2*g,a=2*g;super(r,l,c,a,s,i,T({zIndex:J},o));h(this,"borderColor","#999");h(this,"backgroundColor","#fff");h(this,"render",()=>{super.render(),this.store.ctx.beginPath(),this.store.ctx.setLineDash([]),this.store.ctx.arc(this.centerX,this.centerY,g,0,Math.PI*2),this.store.ctx.fillStyle=this.backgroundColor,this.store.ctx.fill(),this.store.ctx.strokeStyle=this.borderColor,this.store.ctx.stroke(),this.store.ctx.closePath()});this.centerX=t,this.centerY=e,this.cursorType=s}}const Q="#999",tt=1,x=10,et=100;class w extends v{constructor(t,e,s){const i=e.clone().subtract(t).rotate(Math.PI/2).normalize(),o=[t.clone().add(i.clone().multiplyScalar(x/2)),t.clone().add(i.clone().multiplyScalar(-x/2)),e.clone().add(i.clone().multiplyScalar(x/2)),e.clone().add(i.clone().multiplyScalar(-x/2))],r=Math.min(...o.map(p=>p.x)),l=Math.min(...o.map(p=>p.y)),c=Math.max(...o.map(p=>p.x)),a=Math.max(...o.map(p=>p.y)),f=c-r,j=a-l;super(r,l,f,j,C.move,s,{zIndex:et});this.from=t,this.to=e}render(){super.render(),this.store.ctx.beginPath(),this.store.ctx.strokeStyle=Q,this.store.ctx.lineWidth=tt,this.store.ctx.setLineDash([3]),this.store.ctx.moveTo(this.from.x,this.from.y),this.store.ctx.lineTo(this.to.x,this.to.y),this.store.ctx.stroke()}}class M extends u{constructor(t,e,s={}){super(t,e,s);h(this,"isTemp",!0)}}const{round:E}=Math,Z=1e3;var z;(function(n){n.Backspace="Backspace"})(z||(z={}));class st{constructor(t){h(this,"height",50);h(this,"startBlinkingTimestamp",0);h(this,"input");h(this,"color","#000");h(this,"fontSize",50);h(this,"isShow",!1);h(this,"_left",-1/0);h(this,"_top",-1/0);this.store=t;const{container:e}=this.store;let s=e.querySelector("input");s||(s=document.createElement("input"),s.style.position="absolute",s.style.width="0",s.style.padding="0",s.style.border="none",e.style.position="relative",e.appendChild(s),s.addEventListener("input",i=>{const o=i;if(o.inputType==="insertText"&&o.data!=null){const r=new u(o.data,t,{color:this.color,fontSize:this.fontSize});this.store.insertChar(r)}else if(o.inputType==="insertCompositionText"&&(this.store.clearTempCompositionChars(),o.data!=null)){const r=o.data.split("").map(l=>new M(l,t,{color:this.color,fontSize:this.fontSize}));this.store.insertChars(r)}}),s.addEventListener("keydown",i=>{i.key===z.Backspace&&!this.store.isComposition&&this.store.deleteCharBeforeCursor()}),s.addEventListener("compositionstart",()=>{this.store.isComposition=!0}),s.addEventListener("compositionend",()=>{this.store.isComposition=!1,this.store.fixTempCompositionChar()})),this.input=s}get left(){return this._left}set left(t){this._left=E(t)}get top(){return this._top}set top(t){this._top=E(t)}show(){this.isShow=!0,this.startBlinkingTimestamp=Date.now(),document.activeElement!==this.input&&this.input.focus()}hide(){this.isShow=!1,this.input.blur(),this.input.value=""}checkShouldShow(){this.store.hasSelectText()?this.hide():this.show()}render(){if(!this.isShow)return;(Date.now()-this.startBlinkingTimestamp)%Z/Z<.5&&(this.store.ctx.beginPath(),this.store.ctx.moveTo(this.left,this.top),this.store.ctx.lineTo(this.left,this.top+this.height),this.store.ctx.strokeStyle=this.color,this.store.ctx.lineWidth=1,this.store.ctx.stroke()),this.input.style.left=this.left+"px",this.input.style.top=this.top+"px",this.input.style.height=this.height+"px"}}class P{constructor(t,e,s,i,o){h(this,"offsetY");h(this,"calcLayoutForChars",()=>{let t=this.left;this.chars.forEach(e=>{e.setPosition(t,this.top+this.offsetY),t+=e.width})});this.chars=t,this.width=e,this.height=s,this.left=i,this.top=o,this.offsetY=Math.max(...this.chars.map(r=>r.textMetrics.fontBoundingBoxAscent)),this.calcLayoutForChars()}}class R{constructor(t,e,s,i,o){h(this,"softLines",[]);h(this,"width",0);h(this,"height",0);h(this,"calcLayout",()=>{this.calcLayoutForSoftLines(),this.width=Math.max(...this.softLines.map(t=>t.width)),this.height=this.softLines.reduce((t,e)=>t+e.height,0)});h(this,"render",()=>{this.chars.forEach(t=>t.render())});h(this,"calcLayoutForSoftLines",()=>{this.softLines=[];let t=[],e=0,s=0,i=this.top;if(this.chars.forEach(o=>{if(t.length===0)t.push(o),e+=o.width,s=Math.max(s,o.height);else if(e+o.width<=this.maxWidth)t.push(o),e+=o.width,s=Math.max(s,o.height);else{const r=new P(t,e,s,this.left,i);this.softLines.push(r),i+=s,t=[o],e=o.width,s=o.height}}),t.length>0){const o=new P(t,e,s,this.left,i);this.softLines.push(o)}});this.chars=t,this.store=e,this.left=s,this.top=i,this.maxWidth=o,this.calcLayout()}destructor(){this.chars.forEach(t=>t.destructor())}}class it{constructor(t,e,s){h(this,"chars",[]);h(this,"paragraphs",[]);h(this,"blinkingCursor");h(this,"charUnderCursor",null);h(this,"isComposition",!1);h(this,"mouse",{click:{topLayerZIndex:-1/0,topLayerCallbacks:[]},hover:{topLayerZIndex:-1/0,topLayerCursorType:C.defaultCursor},select:{mousedownChar:null,mouseupChar:null,isMousedownLeftHalf:!0,isMouseupLeftHalf:!0}});this.ctx=t,this.container=e,this.editor=s,this.blinkingCursor=new st(this)}clearSelect(){this.mouse.select.mousedownChar=null,this.mouse.select.mouseupChar=null,this.mouse.select.isMousedownLeftHalf=!0,this.mouse.select.isMouseupLeftHalf=!0,this.chars.forEach(t=>t.selectableZone.isSelected=!1)}finishSelect(){const{mousedownChar:t,mouseupChar:e,isMousedownLeftHalf:s,isMouseupLeftHalf:i}=this.mouse.select;if(!t||!e)return;const o=this.chars.findIndex(a=>a===t),r=this.chars.findIndex(a=>a===e);let l,c;o<r||o===r&&s&&!i?(l=s?o:o+1,c=i?r-1:r):(l=i?r:r+1,c=s?o-1:o),this.chars.forEach((a,f)=>{a.selectableZone.isSelected=f>=l&&f<=c})}hasSelectText(){return this.chars.some(t=>t.selectableZone.isSelected)}insertChar(t){this.chars.splice(this.getCursorIdx(),0,t),this.splitCharsIntoParagraphs(),t.moveCursorToMyRight()}insertChars(t){this.chars.splice(this.getCursorIdx(),0,...t),this.splitCharsIntoParagraphs(),t[t.length-1].moveCursorToMyRight()}clearTempCompositionChars(){const t=s=>s instanceof M&&s.isTemp,e=this.chars.find(t);e&&(e.moveCursorToMyLeft(),this.chars=this.chars.filter(s=>!t(s)),this.splitCharsIntoParagraphs())}fixTempCompositionChar(){this.chars.forEach(t=>{t instanceof M&&(t.isTemp=!1)})}splitCharsIntoParagraphs(){const{chars:t,editor:e}=this;this.paragraphs=[];let s=[];t.forEach((i,o)=>{i.char===`
`&&(this.paragraphs.push(new R(s,this,e.left+e.paddingLeft,e.top,e.width-e.paddingLeft)),s=[]),s.push(i),o===t.length-1&&this.paragraphs.push(new R(s,this,e.left+e.paddingLeft,e.top,e.width-e.paddingLeft))}),this.paragraphs.forEach((i,o)=>{const r=this.paragraphs[o-1]||null;r!=null&&(i.top=r.top+r.height),i.calcLayout()})}deleteCharBeforeCursor(){if(this.blinkingCursor.isShow){const t=this.getPrevChar(this.charUnderCursor);if(!t)return;this.chars=this.chars.filter(e=>e!==t),this.splitCharsIntoParagraphs(),this.charUnderCursor?this.charUnderCursor.moveCursorToMyLeft():this.chars[this.chars.length-1]?this.chars[this.chars.length-1].moveCursorToMyRight():this.blinkingCursor.left=this.editor.left+this.editor.paddingLeft}}getPrevCharInSoftLine(t){let e=null;for(const s of this.paragraphs)for(const i of s.softLines)i.chars.includes(t)&&(e=i);if(e!=null){const s=e.chars.indexOf(t),i=e.chars[s-1];if(i!=null)return i}return null}getCursorIdx(){return this.charUnderCursor!=null?this.chars.indexOf(this.charUnderCursor):this.chars.length}getPrevChar(t){if(!t)return this.chars[this.chars.length-1];const e=this.chars.indexOf(t),s=this.chars[e-1];return s||null}getNextChar(t){if(!t)return null;const e=this.chars.indexOf(t),s=this.chars[e+1];return s||null}}const{defaultCursor:ot,ewResize:H,nsResize:O,neswResize:D,nwseResize:Y}=C;class ht{constructor(t,e={}){h(this,"store");h(this,"left",0);h(this,"top",0);h(this,"width",400);h(this,"height",300);h(this,"backgroundColor","#fff");h(this,"paddingLeft",10);h(this,"sizeControlPoints",[]);h(this,"borders",[]);h(this,"blankSpace");h(this,"render",()=>{requestAnimationFrame(this.render),this.clearCanvas(),this.store.paragraphs.forEach(t=>t.render()),this.borders.forEach(t=>t.render()),this.sizeControlPoints.forEach(t=>t.render()),this.store.blinkingCursor.render(),this.store.ctx.canvas.style.cursor=this.store.mouse.hover.topLayerCursorType,this.store.mouse.click.topLayerCallbacks.forEach(t=>t()),this.store.mouse.click.topLayerCallbacks=[],this.store.mouse.click.topLayerZIndex=-1/0});h(this,"clearCanvas",()=>{this.store.ctx.fillStyle=this.backgroundColor,this.store.ctx.fillRect(0,0,this.store.ctx.canvas.width,this.store.ctx.canvas.height),this.store.mouse.hover.topLayerZIndex=-1/0,this.store.mouse.hover.topLayerCursorType=ot});h(this,"handleClickOnTheBlankSpace",(t,e)=>{const{char:s,leftSide:i}=this.mapPositionInBlankSpaceToChar(t,e);s&&(i?s.handleClickLeft():s.handleClickRight())});h(this,"handleMousedownBlankSpace",(t,e)=>{const{char:s,leftSide:i}=this.mapPositionInBlankSpaceToChar(t,e);s&&(i?s.handleMousedownLeft():s.handleMousedownRight())});h(this,"handleMouseupBlankSpace",(t,e)=>{const{char:s,leftSide:i}=this.mapPositionInBlankSpaceToChar(t,e);s&&(i?s.handleMouseupLeft():s.handleMouseupRight())});Object.entries(e).forEach(([o,r])=>this[o]=r);const i=t.querySelector("canvas").getContext("2d");this.store=new it(i,t,this),this.blankSpace=new k(this.left,this.top,this.width,this.height,this.handleClickOnTheBlankSpace,this.handleMousedownBlankSpace,this.handleMouseupBlankSpace,this.store),this.initParagraphs(),this.initBorder(),this.initSizeControlPoints(),this.moveBlinkingCursorToEnd(),requestAnimationFrame(this.render)}destructor(){this.blankSpace.destructor(),this.store.paragraphs.forEach(t=>t.destructor()),this.borders.forEach(t=>t.destructor()),this.sizeControlPoints.forEach(t=>t.destructor())}initParagraphs(){this.store.chars=[new u("/",this.store,{color:"red",fontSize:70}),new u("t",this.store,{color:"orange",fontSize:70}),new u("h",this.store,{color:"#dd0",fontSize:70}),new u("o",this.store,{color:"green",fontSize:70}),new u("u",this.store,{color:"lightblue",fontSize:70}),new u("g",this.store,{color:"blue",fontSize:70}),new u("h",this.store,{color:"purple",fontSize:70}),new u("t",this.store,{color:"red",fontSize:70}),new u("w",this.store,{color:"orange",fontSize:70}),new u("o",this.store,{color:"#dd0",fontSize:70}),new u("r",this.store,{color:"green",fontSize:70}),new u("k",this.store,{color:"lightblue",fontSize:70}),new u("s",this.store,{color:"blue",fontSize:70}),new u(`
`,this.store,{color:"purple",fontSize:70}),new u("\u601D",this.store,{color:"purple",fontSize:70}),new u("\u7279",this.store,{color:"red",fontSize:70}),new u("\u6C83",this.store,{color:"orange",fontSize:70}),new u("\u514B",this.store,{color:"#dd0",fontSize:70})],this.store.splitCharsIntoParagraphs()}initBorder(){const t=new m(this.left,this.top),e=new m(this.left+this.width,this.top),s=new m(this.left,this.top+this.height),i=new m(this.left+this.width,this.top+this.height);this.borders=[new w(t,e,this.store),new w(e,i,this.store),new w(i,s,this.store),new w(s,t,this.store)]}initSizeControlPoints(){this.sizeControlPoints=[new d(this.left,this.top,Y,this.store),new d(this.left,this.top+this.height/2,H,this.store),new d(this.left,this.top+this.height,D,this.store),new d(this.left+this.width/2,this.top,O,this.store),new d(this.left+this.width/2,this.top+this.height,O,this.store),new d(this.left+this.width,this.top,D,this.store),new d(this.left+this.width,this.top+this.height/2,H,this.store),new d(this.left+this.width,this.top+this.height,Y,this.store)]}moveBlinkingCursorToEnd(){this.store.chars[this.store.chars.length-1].handleClickRight()}mapPositionInBlankSpaceToChar(t,e){const s={char:null,leftSide:!0};let i=null,o=1/0;for(let c of this.store.paragraphs)for(let a of c.softLines){const f=e-a.top;(i==null||f>=0&&f<o)&&(i=a,o=f)}if(i==null)return s;if(t<=i.chars[0].left)return s.char=i.chars[0],s;let r=i.chars[0],l=t-r.left;for(let c of i.chars){const a=t-c.left;a>=0&&a<l&&c.char!==`
`&&(r=c,l=a)}return s.leftSide=l<=r.width/2,s.char=r,s}}const rt="_canvas_1p4nl_1";var nt={canvas:rt};const S=F.exports.jsx;function lt(){const n=B.exports.useRef(null);return B.exports.useEffect(()=>{n.current&&new ht(n.current,{left:100,top:100})},[]),S("div",{ref:n,children:S("canvas",{width:"800",height:"600",className:nt.canvas})})}N.render(S(W.StrictMode,{children:S(lt,{})}),document.getElementById("root"));
