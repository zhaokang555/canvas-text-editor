var k=Object.defineProperty;var v=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var L=(r,t,e)=>t in r?k(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,b=(r,t)=>{for(var e in t||(t={}))Y.call(t,e)&&L(r,e,t[e]);if(v)for(var e of v(t))j.call(t,e)&&L(r,e,t[e]);return r};var i=(r,t,e)=>(L(r,typeof t!="symbol"?t+"":t,e),e);import{V as m,j as O,r as C,R as A,a as F}from"./vendor.4f28c16a.js";const W=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&h(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}};W();class M{constructor(t,e,h,s,o,c){i(this,"offsetY");i(this,"calcLayoutForChars",()=>{let t=this.left;this.chars.forEach(e=>{e.setPosition(t,this.top+this.offsetY),t+=e.width})});this.chars=t,this.width=e,this.height=h,this.ctx=s,this.left=o,this.top=c,this.offsetY=Math.max(...this.chars.map(l=>l.textMetrics.fontBoundingBoxAscent)),this.calcLayoutForChars()}}class X{constructor(t,e,h,s,o){i(this,"softLines",[]);i(this,"width",0);i(this,"height",0);i(this,"calcLayoutForSoftLines",()=>{let t=[],e=0,h=0,s=this.top;if(this.chars.forEach(o=>{if(t.length===0)t.push(o),e+=o.width,h=Math.max(h,o.height);else if(e+o.width<=this.maxWidth)t.push(o),e+=o.width,h=Math.max(h,o.height);else{const c=new M(t,e,h,this.ctx,this.left,s);this.softLines.push(c),s+=h,t=[o],e=o.width,h=o.height}}),t.length>0){const o=new M(t,e,h,this.ctx,this.left,s);this.softLines.push(o)}});i(this,"calcLayout",()=>{this.width=Math.max(...this.softLines.map(t=>t.width)),this.height=this.softLines.reduce((t,e)=>t+e.height,0)});i(this,"render",()=>{this.chars.forEach(t=>t.render())});this.chars=t,this.ctx=e,this.left=h,this.top=s,this.maxWidth=o,this.calcLayoutForSoftLines(),this.calcLayout()}}class n{constructor(t,e,h={}){i(this,"width");i(this,"height");i(this,"textMetrics");i(this,"left",0);i(this,"top",0);i(this,"color","#000");i(this,"fontSize",50);i(this,"boundingBoxTop",0);i(this,"setPosition",(t,e)=>{this.left=t,this.top=e,this.boundingBoxTop=e-this.textMetrics.fontBoundingBoxAscent});i(this,"render",()=>{this.setStyle(),this.ctx.fillText(this.char,this.left,this.top)});this.char=t,this.ctx=e,Object.entries(h).forEach(([s,o])=>this[s]=o),this.setStyle(),this.textMetrics=e.measureText(t),this.width=this.textMetrics.width,this.height=this.textMetrics.fontBoundingBoxDescent+this.textMetrics.fontBoundingBoxAscent}setStyle(){this.ctx.fillStyle=this.color,this.ctx.font=`${this.fontSize}px sans-serif`}}var p;(function(r){r.defaultCursor="default",r.ewResize="ew-resize",r.nsResize="ns-resize",r.neswResize="nesw-resize",r.nwseResize="nwse-resize",r.move="move"})(p||(p={}));const g=class{constructor(t,e,h,s,o,c,l={}){i(this,"zIndex",0);i(this,"mouseX",-1);i(this,"mouseY",-1);i(this,"isMouseHovering",!1);i(this,"handleMouseMove",t=>{const e=this.ctx.canvas.getBoundingClientRect();this.mouseX=t.clientX-e.left,this.mouseY=t.clientY-e.top,this.isMouseHovering=this.mouseX>=this.left&&this.mouseY>=this.top&&this.mouseX<=this.left+this.width&&this.mouseY<=this.top+this.height});this.left=t,this.top=e,this.width=h,this.height=s,this.cursorType=o,this.ctx=c,Object.entries(l).forEach(([x,u])=>this[x]=u),c.canvas.addEventListener("mousemove",this.handleMouseMove)}destructor(){this.ctx.canvas.removeEventListener("mousemove",this.handleMouseMove)}render(){this.isMouseHovering&&this.zIndex>=g.topLayerZIndex&&(g.topLayerZIndex=this.zIndex,g.topLayerCursorType=this.cursorType)}};let a=g;i(a,"topLayerZIndex",-1/0),i(a,"topLayerCursorType",p.defaultCursor);const w=5,Z=1e3;class f extends a{constructor(t,e,h,s,o={}){const c=t-w,l=e-w,x=2*w,u=2*w;super(c,l,x,u,h,s,b({zIndex:Z},o));i(this,"borderColor","#999");i(this,"backgroundColor","#fff");i(this,"render",()=>{super.render(),this.ctx.beginPath(),this.ctx.setLineDash([]),this.ctx.arc(this.centerX,this.centerY,w,0,Math.PI*2),this.ctx.fillStyle=this.backgroundColor,this.ctx.fill(),this.ctx.strokeStyle=this.borderColor,this.ctx.stroke(),this.ctx.closePath()});this.centerX=t,this.centerY=e,this.cursorType=h}}const D="#999",q=1,z=10,N=100;class y extends a{constructor(t,e,h){const s=e.clone().subtract(t).rotate(Math.PI/2).normalize(),o=[t.clone().add(s.clone().multiplyScalar(z/2)),t.clone().add(s.clone().multiplyScalar(-z/2)),e.clone().add(s.clone().multiplyScalar(z/2)),e.clone().add(s.clone().multiplyScalar(-z/2))],c=Math.min(...o.map(d=>d.x)),l=Math.min(...o.map(d=>d.y)),x=Math.max(...o.map(d=>d.x)),u=Math.max(...o.map(d=>d.y)),R=x-c,T=u-l;super(c,l,R,T,p.move,h,{zIndex:N});this.from=t,this.to=e}render(){super.render(),this.ctx.beginPath(),this.ctx.strokeStyle=D,this.ctx.lineWidth=q,this.ctx.setLineDash([3]),this.ctx.moveTo(this.from.x,this.from.y),this.ctx.lineTo(this.to.x,this.to.y),this.ctx.stroke()}}const{defaultCursor:V,ewResize:E,nsResize:P,neswResize:B,nwseResize:I}=p;class H{constructor(t,e={}){i(this,"canvas");i(this,"ctx");i(this,"left",0);i(this,"top",0);i(this,"width",400);i(this,"height",300);i(this,"backgroundColor","#fff");i(this,"paddingLeft",10);i(this,"paddingTop",10);i(this,"paragraphs",[]);i(this,"sizeControlPoints",[]);i(this,"borders",[]);i(this,"render",()=>{requestAnimationFrame(this.render),this.clearCanvas(),this.paragraphs.forEach(t=>t.render()),this.borders.forEach(t=>t.render()),this.sizeControlPoints.forEach(t=>t.render()),this.canvas.style.cursor=a.topLayerCursorType});i(this,"clearCanvas",()=>{this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),a.topLayerZIndex=-1/0,a.topLayerCursorType=V});Object.entries(e).forEach(([h,s])=>this[h]=s),this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.initParagraphs(),this.initBorder(),this.initSizeControlPoints(),requestAnimationFrame(this.render)}destructor(){this.sizeControlPoints.forEach(t=>t.destructor())}initParagraphs(){this.paragraphs=[new X([new n("W",this.ctx,{color:"red",fontSize:80}),new n("o",this.ctx,{color:"orange",fontSize:80}),new n("r",this.ctx,{color:"yellow",fontSize:80}),new n("k",this.ctx,{color:"green",fontSize:80}),new n("e",this.ctx,{color:"lightblue",fontSize:80}),new n("r",this.ctx,{color:"blue",fontSize:80}),new n("s",this.ctx,{color:"purple",fontSize:80}),new n(" ",this.ctx,{color:"red",fontSize:80}),new n("o",this.ctx,{color:"orange",fontSize:80}),new n("f",this.ctx,{color:"yellow",fontSize:80}),new n(" ",this.ctx,{color:"green",fontSize:80}),new n("t",this.ctx,{color:"lightblue",fontSize:80}),new n("h",this.ctx,{color:"blue",fontSize:80}),new n("e",this.ctx,{color:"purple",fontSize:80}),new n(" ",this.ctx,{color:"red",fontSize:80}),new n("w",this.ctx,{color:"orange",fontSize:80}),new n("o",this.ctx,{color:"yellow",fontSize:80}),new n("r",this.ctx,{color:"green",fontSize:80}),new n("l",this.ctx,{color:"lightblue",fontSize:80}),new n("d",this.ctx,{color:"blue",fontSize:80}),new n(",",this.ctx,{color:"purple",fontSize:80}),new n(" ",this.ctx,{color:"red",fontSize:80}),new n("u",this.ctx,{color:"orange",fontSize:80}),new n("n",this.ctx,{color:"yellow",fontSize:80}),new n("i",this.ctx,{color:"green",fontSize:80}),new n("t",this.ctx,{color:"lightblue",fontSize:80}),new n("e",this.ctx,{color:"blue",fontSize:80}),new n("!",this.ctx,{color:"purple",fontSize:80})],this.ctx,this.left+this.paddingLeft,this.top+this.paddingTop,this.width-this.paddingLeft)]}initBorder(){const t=new m(this.left,this.top),e=new m(this.left+this.width,this.top),h=new m(this.left,this.top+this.height),s=new m(this.left+this.width,this.top+this.height);this.borders=[new y(t,e,this.ctx),new y(e,s,this.ctx),new y(s,h,this.ctx),new y(h,t,this.ctx)]}initSizeControlPoints(){this.sizeControlPoints=[new f(this.left,this.top,I,this.ctx),new f(this.left,this.top+this.height/2,E,this.ctx),new f(this.left,this.top+this.height,B,this.ctx),new f(this.left+this.width/2,this.top,P,this.ctx),new f(this.left+this.width/2,this.top+this.height,P,this.ctx),new f(this.left+this.width,this.top,B,this.ctx),new f(this.left+this.width,this.top+this.height/2,E,this.ctx),new f(this.left+this.width,this.top+this.height,I,this.ctx)]}}const S=O.exports.jsx;function K(){const r=C.exports.useRef(null);return C.exports.useEffect(()=>{r.current&&new H(r.current,{left:100,top:100})},[]),S("div",{children:S("canvas",{ref:r,width:"800",height:"600"})})}A.render(S(F.StrictMode,{children:S(K,{})}),document.getElementById("root"));
