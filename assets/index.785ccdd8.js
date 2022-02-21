var k=Object.defineProperty;var b=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var L=(n,t,e)=>t in n?k(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,v=(n,t)=>{for(var e in t||(t={}))Y.call(t,e)&&L(n,e,t[e]);if(b)for(var e of b(t))j.call(t,e)&&L(n,e,t[e]);return n};var i=(n,t,e)=>(L(n,typeof t!="symbol"?t+"":t,e),e);import{V as m,j as O,r as C,R as A,a as F}from"./vendor.4f28c16a.js";const W=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&h(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}};W();class M{constructor(t,e,h,s,o,c){i(this,"offsetY");i(this,"calcLayoutForChars",()=>{let t=this.left;this.chars.forEach(e=>{e.setPosition(t,this.top+this.offsetY),t+=e.width})});this.chars=t,this.width=e,this.height=h,this.ctx=s,this.left=o,this.top=c,this.offsetY=Math.max(...this.chars.map(a=>a.textMetrics.fontBoundingBoxAscent)),this.calcLayoutForChars()}}class Z{constructor(t,e,h,s,o){i(this,"softLines",[]);i(this,"width",0);i(this,"height",0);i(this,"calcLayoutForSoftLines",()=>{let t=[],e=0,h=0,s=this.top;if(this.chars.forEach(o=>{if(t.length===0)t.push(o),e+=o.width,h=Math.max(h,o.height);else if(e+o.width<=this.maxWidth)t.push(o),e+=o.width,h=Math.max(h,o.height);else{const c=new M(t,e,h,this.ctx,this.left,s);this.softLines.push(c),s+=h,t=[o],e=o.width,h=o.height}}),t.length>0){const o=new M(t,e,h,this.ctx,this.left,s);this.softLines.push(o)}});i(this,"calcLayout",()=>{this.width=Math.max(...this.softLines.map(t=>t.width)),this.height=this.softLines.reduce((t,e)=>t+e.height,0)});i(this,"render",()=>{this.chars.forEach(t=>t.render())});this.chars=t,this.ctx=e,this.left=h,this.top=s,this.maxWidth=o,this.calcLayoutForSoftLines(),this.calcLayout()}destructor(){this.chars.forEach(t=>t.destructor())}}var x;(function(n){n.defaultCursor="default",n.ewResize="ew-resize",n.nsResize="ns-resize",n.neswResize="nesw-resize",n.nwseResize="nwse-resize",n.move="move",n.text="text"})(x||(x={}));const g=class{constructor(t,e,h,s,o,c,a={}){i(this,"zIndex",0);i(this,"mouseX",-1);i(this,"mouseY",-1);i(this,"isMouseHovering",!1);i(this,"handleMouseMove",t=>{const e=this.ctx.canvas.getBoundingClientRect();this.mouseX=t.clientX-e.left,this.mouseY=t.clientY-e.top,this.isMouseHovering=this.mouseX>=this.left&&this.mouseY>=this.top&&this.mouseX<=this.left+this.width&&this.mouseY<=this.top+this.height});this.left=t,this.top=e,this.width=h,this.height=s,this.cursorType=o,this.ctx=c,Object.entries(a).forEach(([u,p])=>this[u]=p),c.canvas.addEventListener("mousemove",this.handleMouseMove)}destructor(){this.ctx.canvas.removeEventListener("mousemove",this.handleMouseMove)}render(){this.isMouseHovering&&this.zIndex>=g.topLayerZIndex&&(g.topLayerZIndex=this.zIndex,g.topLayerCursorType=this.cursorType)}};let l=g;i(l,"topLayerZIndex",-1/0),i(l,"topLayerCursorType",x.defaultCursor);const X=10;class r{constructor(t,e,h={}){i(this,"width");i(this,"height");i(this,"textMetrics");i(this,"left",0);i(this,"top",0);i(this,"color","#000");i(this,"fontSize",50);i(this,"boundingBox");i(this,"setPosition",(t,e)=>{this.left=t,this.top=e;const h=e-this.textMetrics.fontBoundingBoxAscent;this.boundingBox.left=t,this.boundingBox.top=h});i(this,"render",()=>{this.boundingBox.render(),this.setStyle(),this.ctx.fillText(this.char,this.left,this.top)});this.char=t,this.ctx=e,Object.entries(h).forEach(([s,o])=>this[s]=o),this.setStyle(),this.textMetrics=e.measureText(t),this.width=this.textMetrics.width,this.height=this.textMetrics.fontBoundingBoxDescent+this.textMetrics.fontBoundingBoxAscent,this.boundingBox=new l(-1/0,-1/0,this.width,this.height,x.text,this.ctx,{zIndex:X})}destructor(){this.boundingBox.destructor()}setStyle(){this.ctx.fillStyle=this.color,this.ctx.font=`${this.fontSize}px sans-serif`}}const w=5,D=1e3;class d extends l{constructor(t,e,h,s,o={}){const c=t-w,a=e-w,u=2*w,p=2*w;super(c,a,u,p,h,s,v({zIndex:D},o));i(this,"borderColor","#999");i(this,"backgroundColor","#fff");i(this,"render",()=>{super.render(),this.ctx.beginPath(),this.ctx.setLineDash([]),this.ctx.arc(this.centerX,this.centerY,w,0,Math.PI*2),this.ctx.fillStyle=this.backgroundColor,this.ctx.fill(),this.ctx.strokeStyle=this.borderColor,this.ctx.stroke(),this.ctx.closePath()});this.centerX=t,this.centerY=e,this.cursorType=h}}const q="#999",N=1,z=10,V=100;class y extends l{constructor(t,e,h){const s=e.clone().subtract(t).rotate(Math.PI/2).normalize(),o=[t.clone().add(s.clone().multiplyScalar(z/2)),t.clone().add(s.clone().multiplyScalar(-z/2)),e.clone().add(s.clone().multiplyScalar(z/2)),e.clone().add(s.clone().multiplyScalar(-z/2))],c=Math.min(...o.map(f=>f.x)),a=Math.min(...o.map(f=>f.y)),u=Math.max(...o.map(f=>f.x)),p=Math.max(...o.map(f=>f.y)),R=u-c,T=p-a;super(c,a,R,T,x.move,h,{zIndex:V});this.from=t,this.to=e}render(){super.render(),this.ctx.beginPath(),this.ctx.strokeStyle=q,this.ctx.lineWidth=N,this.ctx.setLineDash([3]),this.ctx.moveTo(this.from.x,this.from.y),this.ctx.lineTo(this.to.x,this.to.y),this.ctx.stroke()}}const{defaultCursor:$,ewResize:B,nsResize:E,neswResize:I,nwseResize:P}=x;class H{constructor(t,e={}){i(this,"canvas");i(this,"ctx");i(this,"left",0);i(this,"top",0);i(this,"width",400);i(this,"height",300);i(this,"backgroundColor","#fff");i(this,"paddingLeft",10);i(this,"paddingTop",10);i(this,"paragraphs",[]);i(this,"sizeControlPoints",[]);i(this,"borders",[]);i(this,"render",()=>{requestAnimationFrame(this.render),this.clearCanvas(),this.paragraphs.forEach(t=>t.render()),this.borders.forEach(t=>t.render()),this.sizeControlPoints.forEach(t=>t.render()),this.canvas.style.cursor=l.topLayerCursorType});i(this,"clearCanvas",()=>{this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),l.topLayerZIndex=-1/0,l.topLayerCursorType=$});Object.entries(e).forEach(([h,s])=>this[h]=s),this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.initParagraphs(),this.initBorder(),this.initSizeControlPoints(),requestAnimationFrame(this.render)}destructor(){this.borders.forEach(t=>t.destructor()),this.sizeControlPoints.forEach(t=>t.destructor())}initParagraphs(){this.paragraphs=[new Z([new r("W",this.ctx,{color:"red",fontSize:80}),new r("o",this.ctx,{color:"orange",fontSize:80}),new r("r",this.ctx,{color:"yellow",fontSize:80}),new r("k",this.ctx,{color:"green",fontSize:80}),new r("e",this.ctx,{color:"lightblue",fontSize:80}),new r("r",this.ctx,{color:"blue",fontSize:80}),new r("s",this.ctx,{color:"purple",fontSize:80}),new r(" ",this.ctx,{color:"red",fontSize:80}),new r("o",this.ctx,{color:"orange",fontSize:80}),new r("f",this.ctx,{color:"yellow",fontSize:80}),new r(" ",this.ctx,{color:"green",fontSize:80}),new r("t",this.ctx,{color:"lightblue",fontSize:80}),new r("h",this.ctx,{color:"blue",fontSize:80}),new r("e",this.ctx,{color:"purple",fontSize:80}),new r(" ",this.ctx,{color:"red",fontSize:80}),new r("w",this.ctx,{color:"orange",fontSize:80}),new r("o",this.ctx,{color:"yellow",fontSize:80}),new r("r",this.ctx,{color:"green",fontSize:80}),new r("l",this.ctx,{color:"lightblue",fontSize:80}),new r("d",this.ctx,{color:"blue",fontSize:80}),new r(",",this.ctx,{color:"purple",fontSize:80}),new r(" ",this.ctx,{color:"red",fontSize:80}),new r("u",this.ctx,{color:"orange",fontSize:80}),new r("n",this.ctx,{color:"yellow",fontSize:80}),new r("i",this.ctx,{color:"green",fontSize:80}),new r("t",this.ctx,{color:"lightblue",fontSize:80}),new r("e",this.ctx,{color:"blue",fontSize:80}),new r("!",this.ctx,{color:"purple",fontSize:80})],this.ctx,this.left+this.paddingLeft,this.top+this.paddingTop,this.width-this.paddingLeft)]}initBorder(){const t=new m(this.left,this.top),e=new m(this.left+this.width,this.top),h=new m(this.left,this.top+this.height),s=new m(this.left+this.width,this.top+this.height);this.borders=[new y(t,e,this.ctx),new y(e,s,this.ctx),new y(s,h,this.ctx),new y(h,t,this.ctx)]}initSizeControlPoints(){this.sizeControlPoints=[new d(this.left,this.top,P,this.ctx),new d(this.left,this.top+this.height/2,B,this.ctx),new d(this.left,this.top+this.height,I,this.ctx),new d(this.left+this.width/2,this.top,E,this.ctx),new d(this.left+this.width/2,this.top+this.height,E,this.ctx),new d(this.left+this.width,this.top,I,this.ctx),new d(this.left+this.width,this.top+this.height/2,B,this.ctx),new d(this.left+this.width,this.top+this.height,P,this.ctx)]}}const S=O.exports.jsx;function K(){const n=C.exports.useRef(null);return C.exports.useEffect(()=>{n.current&&new H(n.current,{left:100,top:100})},[]),S("div",{children:S("canvas",{ref:n,width:"800",height:"600"})})}A.render(S(F.StrictMode,{children:S(K,{})}),document.getElementById("root"));
