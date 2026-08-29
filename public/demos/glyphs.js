/* glyphs.js -- the Moving Alphabet, single source of truth.
 * Element metadata + full patent-plate drawings + compact inline glyphs, in one file.
 * Consumers: the-alphabet.html (Glyphs.plateFull), any surface (<span data-p="Tf">).
 *
 *   Glyphs.families            // 10 families, each with els [{s,n,z,m,desc,keys,scarce}]
 *   Glyphs.list() / .meta(sym) // metadata
 *   Glyphs.plateFull(ctx,sym,w,h,t)  // full plate: mechanism + mass badge + FIG chrome
 *   Glyphs.plate(ctx,sym,w,h,t)      // mechanism only
 *   Glyphs.setHot(sym|null)    // numeral-highlight state for hover
 *   Glyphs.mount(el,sym,opts)  // compact inline glyph;  Glyphs.auto() scans [data-p]
 * Self-contained, no deps. Light-only, ink on paper. Grounded in ELEMENTS.md.
 */
(function (global) {
  "use strict";
const INK="#1a160f",PAPER="#f6f1e4",MUT="#8a7d62",RED="#b2402f";
let hot=null;
const fract=v=>v-Math.floor(v),ease=u=>u<0.5?2*u*u:1-Math.pow(-2*u+2,2)/2,TAU=Math.PI*2;

// ---------- shared patent linework ----------
function sheet(x,w,h){x.fillStyle=PAPER;x.fillRect(0,0,w,h);x.strokeStyle=INK;x.lineWidth=0.9;
  x.strokeRect(13,13,w-26,h-26);x.globalAlpha=.5;x.strokeRect(18,18,w-36,h-36);x.globalAlpha=1;}
function hatch(x,cx,cy,w,h,ang){x.save();x.beginPath();x.rect(cx,cy,w,h);x.clip();
  x.strokeStyle="rgba(26,22,15,0.5)";x.lineWidth=0.55;const diag=w+h;x.translate(cx,cy);x.rotate(ang||Math.PI/4);
  for(let i=-diag;i<diag;i+=4.5){x.beginPath();x.moveTo(i,-diag);x.lineTo(i,diag);x.stroke();}x.restore();}
function arrow(x,px,py,ang,s){x.beginPath();x.moveTo(px,py);
  x.lineTo(px-Math.cos(ang-0.4)*s,py-Math.sin(ang-0.4)*s);x.moveTo(px,py);x.lineTo(px-Math.cos(ang+0.4)*s,py-Math.sin(ang+0.4)*s);x.stroke();}
function num(x,n,tx,ty,lx,ly){const on=hot===null||hot===n;x.globalAlpha=on?1:0.2;
  x.strokeStyle=INK;x.lineWidth=0.7;x.beginPath();x.moveTo(lx,ly);x.lineTo(tx,ty);x.stroke();
  x.fillStyle=INK;x.beginPath();x.arc(tx,ty,1.6,0,TAU);x.fill();
  x.font='400 16px "Fraunces",Georgia,serif';x.textAlign="center";x.textBaseline="middle";
  const wt=x.measureText(n).width;x.fillStyle=PAPER;x.fillRect(lx-wt/2-3,ly-9,wt+6,18);
  x.fillStyle=INK;x.fillText(n,lx,ly+0.5);x.textAlign="left";x.textBaseline="alphabetic";x.globalAlpha=1;}
function token(x,px,py,s,fill){x.fillStyle=fill||INK;x.fillRect(px-s/2,py-s/2,s,s);}
function barrier(x,gx,my,gh,lift){x.strokeStyle=INK;x.lineWidth=2.4;x.beginPath();x.moveTo(gx,my-gh/2-lift);x.lineTo(gx,my+gh/2-lift);x.stroke();
  x.strokeStyle="rgba(26,22,15,0.4)";x.lineWidth=0.8;x.beginPath();x.moveTo(gx-4,my+gh/2);x.lineTo(gx+4,my+gh/2);x.stroke();}
function channel(x,lx,my,rx){x.strokeStyle=INK;x.lineWidth=1.1;x.beginPath();x.moveTo(lx,my-8);x.lineTo(rx,my-8);x.moveTo(lx,my+8);x.lineTo(rx,my+8);x.stroke();
  x.globalAlpha=.35;x.lineWidth=0.6;for(let px=lx+14;px<rx;px+=16){x.beginPath();x.moveTo(px,my-8);x.lineTo(px,my+8);x.stroke();}x.globalAlpha=1;}
function person(x,cx,cy,s){x.strokeStyle=INK;x.lineWidth=1.3;
  x.beginPath();x.arc(cx,cy-s*0.7,s*0.42,0,TAU);x.stroke();hatch(x,cx-s*0.3,cy-s*0.95,s*0.6,s*0.55,Math.PI/4);
  x.beginPath();x.moveTo(cx-s*0.72,cy+s*0.5);x.quadraticCurveTo(cx,cy-s*0.25,cx+s*0.72,cy+s*0.5);x.stroke();}
function dial(x,cx,cy,r,val){x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(cx,cy,r,Math.PI*0.9,Math.PI*2.1);x.stroke();
  for(let i=0;i<=8;i++){const a=Math.PI*(0.9+i/8*1.2);x.globalAlpha=.5;x.beginPath();x.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);x.lineTo(cx+Math.cos(a)*(r-6),cy+Math.sin(a)*(r-6));x.stroke();x.globalAlpha=1;}
  const a=Math.PI*(0.9+val*1.2);x.lineWidth=1.8;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*r*0.85,cy+Math.sin(a)*r*0.85);x.stroke();
  x.fillStyle=INK;x.beginPath();x.arc(cx,cy,2.5,0,TAU);x.fill();}
function digits(x,bx,by,n,val,dw){dw=dw||22;const dh=30;const str=(Array(n).fill("0").join("")+val).slice(-n);
  for(let i=0;i<n;i++){x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(bx+i*dw,by,dw-3,dh);
    x.fillStyle=INK;x.font='500 20px "Fraunces",serif';x.textAlign="center";x.textBaseline="middle";x.fillText(str[i],bx+i*dw+(dw-3)/2,by+dh/2+1);}
  x.textAlign="left";x.textBaseline="alphabetic";}
function tagline(x,w,h,txt){x.fillStyle=MUT;x.font='600 10px "IBM Plex Mono"';x.textAlign="center";x.letterSpacing="1.5px";
  x.fillText(txt,w/2,h-46);x.letterSpacing="0px";x.textAlign="left";}
function lamp(x,cx,cy,r,on){x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(cx,cy,r,0,TAU);x.stroke();
  if(on){x.fillStyle=INK;x.beginPath();x.arc(cx,cy,r*0.5,0,TAU);x.fill();
    for(let i=0;i<6;i++){const a=i/6*TAU;x.beginPath();x.moveTo(cx+Math.cos(a)*(r+2),cy+Math.sin(a)*(r+2));x.lineTo(cx+Math.cos(a)*(r+6),cy+Math.sin(a)*(r+6));x.stroke();}}}
function doc(x,bx,by,bw,bh,lines){x.fillStyle=PAPER;x.fillRect(bx,by,bw,bh);x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(bx,by,bw,bh);
  x.globalAlpha=.5;x.lineWidth=0.6;for(let l=0;l<(lines||3);l++){x.beginPath();x.moveTo(bx+5,by+8+l*6);x.lineTo(bx+bw-5,by+8+l*6);x.stroke();}x.globalAlpha=1;}
function waves(x,cx,cy,maxR,t,a0,a1,per){for(let k=0;k<3;k++){const rr=fract(t*(per||0.5)+k/3)*maxR;x.globalAlpha=(1-rr/maxR)*0.55;x.strokeStyle=INK;x.lineWidth=0.8;x.beginPath();x.arc(cx,cy,rr,a0,a1);x.stroke();x.globalAlpha=1;}}
function eye(x,cx,cy,s){x.strokeStyle=INK;x.lineWidth=1.1;x.beginPath();x.moveTo(cx-s,cy);x.quadraticCurveTo(cx,cy-s*0.7,cx+s,cy);x.quadraticCurveTo(cx,cy+s*0.7,cx-s,cy);x.stroke();
  x.beginPath();x.arc(cx,cy,s*0.32,0,TAU);x.stroke();x.fillStyle=INK;x.beginPath();x.arc(cx,cy,s*0.14,0,TAU);x.fill();}

// ---------- element identity + mass badge (the locked template) ----------
function massBadge(x,w,el){const cw=30,bx=w-cw*3-18,by=26;x.textBaseline="middle";
  x.font='600 9px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("MASS",bx,by-10);
  ["d","s","t"].forEach((k,i)=>{const cx=bx+i*cw;x.strokeStyle=INK;x.lineWidth=0.9;x.strokeRect(cx,by,cw-4,26);
    x.fillStyle=INK;x.font='500 17px "Fraunces",serif';x.textAlign="center";x.fillText(el.m[i],cx+(cw-4)/2,by+13);
    x.fillStyle=MUT;x.font='600 8px "IBM Plex Mono"';x.fillText(k.toUpperCase(),cx+(cw-4)/2,by+33);});
  x.textAlign="left";x.textBaseline="alphabetic";}
function figc(x,w,h,el){x.textAlign="left";x.textBaseline="alphabetic";
  x.fillStyle=INK;x.font='500 74px "Fraunces",Georgia,serif';x.fillText(el.s,28,92);
  x.fillStyle=INK;x.font='600 17px "IBM Plex Mono"';x.letterSpacing="1px";x.fillText(el.n.toUpperCase(),30,116);x.letterSpacing="0px";
  x.fillStyle=MUT;x.font='500 11px "IBM Plex Mono"';x.fillText("ELEMENT · Z"+el.z,30,131);
  x.fillStyle=INK;x.font='400 26px "Fraunces",serif';x.textAlign="center";x.fillText("FIG. "+el.z,w/2,h-24);x.textAlign="left";
  if(el.scarce){x.fillStyle=INK;x.font='600 10px "IBM Plex Mono"';x.fillText("◆ SCARCE — DOES NOT SCALE",30,h-22);}}

// ========================= per-element mechanisms =========================
const DRAWS={
 // ---- GATES (Group 8): what holds the door ----
 Th(x,w,h,t){const cx=w*0.5,my=h*0.64,span=Math.min(w*0.62,300),lx=cx-span/2,rx=cx+span/2,gh=54;
   channel(x,lx,my,rx);const gcx=cx,gcy=my-120,r=40;dial(x,gcx,gcy,r,0.5+0.42*Math.sin(t*1.3));
   const val=0.5+0.42*Math.sin(t*1.3),setp=0.62,sa=Math.PI*(0.9+setp*1.2);
   x.setLineDash([3,3]);x.lineWidth=1.4;x.strokeStyle=INK;x.beginPath();x.moveTo(gcx+Math.cos(sa)*(r+8),gcy+Math.sin(sa)*(r+8));x.lineTo(gcx+Math.cos(sa)*(r-10),gcy+Math.sin(sa)*(r-10));x.stroke();x.setLineDash([]);
   const open=val>setp,lift=open?gh*0.85:0;x.globalAlpha=.5;x.lineWidth=0.8;x.beginPath();x.moveTo(gcx,gcy+r);x.lineTo(gcx,my-gh/2-lift);x.stroke();x.globalAlpha=1;
   barrier(x,cx,my,gh,lift);const u=fract(t*0.5),tx=open?lx+10+(rx-lx-20)*u:Math.min(cx-16,lx+10+(rx-lx-20)*u);token(x,tx,my,11,open?INK:MUT);
   tagline(x,w,h,"A NUMBER HOLDS THE DOOR");
   num(x,"14",gcx+r*0.7,gcy-r*0.5,gcx+r+22,gcy-r-4);num(x,"16",gcx+Math.cos(sa)*(r+8),gcy+Math.sin(sa)*(r+8),gcx-r-24,gcy);
   num(x,"12",cx,my-gh/2-lift,cx-40,my-gh/2-lift-8);num(x,"10",lx+12,my-8,lx-6,my+38);num(x,"18",rx-12,my-8,rx+6,my+38);},
 Ag(x,w,h,t){const cx=w*0.5,my=h*0.64,span=Math.min(w*0.62,300),lx=cx-span/2,rx=cx+span/2,gh=54;
   channel(x,lx,my,rx);const trayY=my-120,tw=64;x.strokeStyle=INK;x.lineWidth=1;
   x.beginPath();x.moveTo(cx-tw/2,trayY);x.lineTo(cx-tw/2,trayY+30);x.lineTo(cx+tw/2,trayY+30);x.lineTo(cx+tw/2,trayY);x.stroke();
   x.font='600 9px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("PENDING",cx,trayY-7);x.textAlign="left";
   const cyc=fract(t*0.4),approved=cyc>0.6;x.fillStyle=PAPER;x.fillRect(cx-11,trayY+8,22,18);x.strokeStyle=INK;x.strokeRect(cx-11,trayY+8,22,18);
   x.globalAlpha=.5;for(let l=0;l<3;l++){x.beginPath();x.moveTo(cx-7,trayY+13+l*4);x.lineTo(cx+7,trayY+13+l*4);x.stroke();}x.globalAlpha=1;
   const sd=approved?Math.min(1,(cyc-0.6)/0.12):0,stampY=trayY-30+(trayY+2-(trayY-30))*sd;
   x.strokeStyle=INK;x.lineWidth=1.2;x.strokeRect(cx+tw/2+6,stampY,28,16);x.font='600 8px "IBM Plex Mono"';x.fillStyle=INK;x.textAlign="center";x.fillText("APPR",cx+tw/2+20,stampY+11);x.textAlign="left";
   if(approved&&sd>0.9){x.fillStyle=INK;x.beginPath();x.arc(cx,trayY+17,3,0,TAU);x.fill();}
   const lift=approved?gh*0.85:0;x.globalAlpha=.5;x.lineWidth=0.8;x.beginPath();x.moveTo(cx,trayY+30);x.lineTo(cx,my-gh/2-lift);x.stroke();x.globalAlpha=1;
   barrier(x,cx,my,gh,lift);const u=fract(t*0.5),tx=approved?lx+10+(rx-lx-20)*u:Math.min(cx-16,lx+10+(rx-lx-20)*u);token(x,tx,my,11,approved?INK:MUT);
   tagline(x,w,h,"A HUMAN'S STAMP HOLDS THE DOOR");
   num(x,"14",cx,trayY+17,cx-tw/2-16,trayY+42);num(x,"16",cx+tw/2+20,stampY+8,cx+tw/2+44,stampY-6);
   num(x,"12",cx,my-gh/2-lift,cx-42,my-gh/2-lift-8);num(x,"10",lx+12,my-8,lx-6,my+38);num(x,"18",rx-12,my-8,rx+6,my+38);},
 Dm(x,w,h,t){const lx=w*0.13,cxn=w*0.38,my=h*0.55,upY=my-58,dnY=my+58,rx=w*0.88;
   x.strokeStyle=INK;x.lineWidth=1.1;x.beginPath();x.moveTo(lx,my);x.lineTo(cxn-18,my);x.stroke();
   x.beginPath();x.moveTo(cxn,my-18);x.lineTo(cxn+18,my);x.lineTo(cxn,my+18);x.lineTo(cxn-18,my);x.closePath();x.stroke();hatch(x,cxn-9,my-9,18,18,Math.PI/4);
   const rev=Math.floor(t*0.6)%2===0;
   x.globalAlpha=rev?1:.35;x.lineWidth=rev?1.2:0.7;x.strokeStyle=INK;x.beginPath();x.moveTo(cxn+13,my-8);x.lineTo(cxn+70,upY);x.lineTo(rx,upY);x.stroke();
   x.beginPath();x.arc(cxn+96,upY,10,0.4,TAU-0.4);x.stroke();arrow(x,cxn+96+10*Math.cos(TAU-0.4),upY+10*Math.sin(TAU-0.4),TAU-0.4+1.6,4);arrow(x,rx,upY,0,5);
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.fillText("TWO-WAY",cxn+112,upY-13);x.globalAlpha=1;
   x.globalAlpha=!rev?1:.35;x.lineWidth=!rev?1.2:0.7;x.beginPath();x.moveTo(cxn+13,my+8);x.lineTo(cxn+70,dnY);x.lineTo(rx-48,dnY);x.stroke();
   x.beginPath();x.moveTo(cxn+92,dnY-10);x.lineTo(cxn+92,dnY+10);x.stroke();arrow(x,cxn+104,dnY,0,5);
   x.strokeRect(rx-46,dnY-15,32,30);x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("HOLD",rx-30,dnY+3);x.textAlign="left";
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.fillText("ONE-WAY",cxn+108,dnY+18);x.globalAlpha=1;
   const u=fract(t*0.6*2);if(rev){const px=cxn+(rx-cxn)*u,py=u<0.35?my+(upY-my)*(u/0.35):upY;token(x,Math.min(px,rx),py,10,INK);}
   else{const px=cxn+(rx-48-cxn)*Math.min(1,u),py=u<0.4?my+(dnY-my)*(u/0.4):dnY;token(x,px,py,10,MUT);}
   tagline(x,w,h,"A RULE DECIDES IF A HUMAN IS NEEDED");
   num(x,"10",lx+28,my,lx+18,my-22);num(x,"12",cxn,my-18,cxn-6,my-38);
   num(x,"14",cxn+96,upY,cxn+96,upY-28);num(x,"16",cxn+92,dnY,cxn+74,dnY+30);num(x,"18",rx-30,dnY-15,rx-30,dnY-36);},
 Hu(x,w,h,t){const cx=w*0.46,my=h*0.62,span=Math.min(w*0.46,220),lx=cx-span/2,rx=cx+span/2,gh=54;
   channel(x,lx,my,rx);const pcx=cx,pcy=my-108;person(x,pcx,pcy,38);
   const act=fract(t*0.3)>0.5,lift=act?gh*0.85:0;x.strokeStyle=INK;x.lineWidth=1.3;x.beginPath();x.moveTo(pcx+22,pcy+10);x.lineTo(cx+10,my-gh/2-lift);x.stroke();
   x.beginPath();x.arc(cx+10,my-gh/2-lift,2.5,0,TAU);x.fill();barrier(x,cx,my,gh,lift);
   const u=fract(t*0.5),tx=act?lx+10+(rx-lx-20)*u:Math.min(cx-16,lx+10+(rx-lx-20)*u);token(x,tx,my,11,act?INK:MUT);
   const oy=[my-15,my,my+15],labels=["PASS","NOTE","STOP"];x.font='600 8px "IBM Plex Mono"';
   oy.forEach((yy,i)=>{x.strokeStyle=INK;x.globalAlpha=i===0?1:.5;x.lineWidth=0.8;x.beginPath();x.moveTo(rx,my);x.lineTo(rx+36,yy);x.stroke();x.fillStyle=MUT;x.textAlign="left";x.fillText(labels[i],rx+40,yy+2);x.globalAlpha=1;});
   tagline(x,w,h,"THE HUMAN IS THE DOOR");
   num(x,"14",pcx,pcy,pcx-48,pcy-4);num(x,"12",cx,my-gh/2-lift,cx-44,my-gh/2-lift-8);
   num(x,"10",lx+12,my-8,lx-6,my+38);num(x,"16",rx+32,oy[0],rx+18,oy[0]-22);num(x,"18",rx+32,oy[2],rx+18,oy[2]+22);},

 // ---- METERS (Group 10): count AND account ----
 Se(x,w,h,t){const cx=w*0.5,cy=h*0.5,r=72;
   // live probe on the left, waves feeding the dial (reads the running system)
   const px=cx-r-46;x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(px,cy,5,0,TAU);x.stroke();x.fillStyle=INK;x.beginPath();x.arc(px,cy,2,0,TAU);x.fill();
   for(let k=0;k<3;k++){const rr=fract(t*0.6+k/3)*40;x.globalAlpha=(1-rr/40)*0.5;x.strokeStyle=INK;x.lineWidth=0.8;x.beginPath();x.arc(px,cy,rr,-0.7,0.7);x.stroke();x.globalAlpha=1;}
   x.globalAlpha=.4;x.beginPath();x.moveTo(px+8,cy);x.lineTo(cx-r,cy);x.stroke();x.globalAlpha=1;
   dial(x,cx,cy,r,0.5+0.44*Math.sin(t*1.6));   // needle LIVE, no memory
   // output reading (no register — holds nothing)
   x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.moveTo(cx+r,cy);x.lineTo(cx+r+34,cy);x.stroke();arrow(x,cx+r+34,cy,0,5);
   tagline(x,w,h,"SPEEDOMETER · READS THE INSTANT · HOLDS NOTHING");
   num(x,"10",px,cy-5,px-4,cy-26);num(x,"12",cx+Math.cos(-1)*r*0.7,cy+Math.sin(-1)*r*0.7,cx+18,cy-r-4);
   num(x,"14",cx+Math.cos(2.6)*r,cy+Math.sin(2.6)*r,cx-r-8,cy+r*0.4);num(x,"16",cx+r+34,cy,cx+r+34,cy-24);},
 Me(x,w,h,t){const cx=w*0.5,my=h*0.52;
   // event stream in from the left
   for(let i=0;i<4;i++){const u=fract(t*0.8+i/4);const ex=w*0.1+(cx-70-w*0.1)*u;x.fillStyle=INK;x.fillRect(ex-3,my-3,6,6);}
   x.globalAlpha=.4;x.strokeStyle=INK;x.lineWidth=0.8;x.beginPath();x.moveTo(w*0.1,my);x.lineTo(cx-64,my);x.stroke();x.globalAlpha=1;arrow(x,cx-64,my,0,5);
   // odometer register (accumulates + persists)
   const val=Math.floor(t*3)%10000;const bx=cx-46,by=my-15;x.font='600 9px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("RUNNING TOTAL",bx,by-8);
   digits(x,bx,by,4,val);
   // roll indicator arrows above each wheel
   x.strokeStyle=INK;x.globalAlpha=.5;for(let i=0;i<4;i++){arrow(x,bx+i*22+9.5,by-2,Math.PI/2,3);}x.globalAlpha=1;
   x.beginPath();x.moveTo(bx+88+6,my);x.lineTo(bx+120,my);x.stroke();arrow(x,bx+120,my,0,5);
   tagline(x,w,h,"ODOMETER · ACCUMULATES A STREAM · PERSISTS");
   num(x,"10",w*0.16,my,w*0.16,my-24);num(x,"12",bx+44,by,bx+44,by-24);num(x,"14",bx,by+30,bx-8,by+52);num(x,"16",bx+120,my,bx+120,my+26);},
 Ro(x,w,h,t){const lx=w*0.12,mcx=w*0.44,my=h*0.5;
   // many source records in (preserved rows)
   const srcY=[my-54,my-18,my+18,my+54];x.font='500 8px "IBM Plex Mono"';
   srcY.forEach((yy,i)=>{x.strokeStyle=INK;x.globalAlpha=.8;x.lineWidth=0.9;x.strokeRect(lx,yy-7,42,14);
     x.globalAlpha=.5;x.beginPath();x.moveTo(lx+4,yy);x.lineTo(lx+30,yy);x.stroke();x.globalAlpha=1;
     x.strokeStyle=INK;x.globalAlpha=.4;x.beginPath();x.moveTo(lx+42,yy);x.lineTo(mcx-16,my);x.stroke();x.globalAlpha=1;});
   x.fillStyle=MUT;x.fillText("SOURCES",lx,my-70);
   // merge node
   x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.moveTo(mcx,my-16);x.lineTo(mcx+16,my);x.lineTo(mcx,my+16);x.lineTo(mcx-16,my);x.closePath();x.stroke();hatch(x,mcx-8,my-8,16,16,Math.PI/4);
   // one consolidated ranked list out (records preserved)
   const ox=mcx+70,rows=5,rh=17,oy=my-rows*rh/2;x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(ox,oy,120,rows*rh);
   const scan=Math.floor(fract(t*0.4)*rows);
   for(let i=0;i<rows;i++){const yy=oy+i*rh;x.globalAlpha=.55;x.lineWidth=0.6;if(i)x.strokeRect;x.beginPath();x.moveTo(ox,yy);x.lineTo(ox+120,yy);x.stroke();x.globalAlpha=1;
     x.fillStyle=INK;x.font='500 10px "Fraunces",serif';x.textAlign="left";x.fillText((i+1).toString(),ox+6,yy+12);
     x.globalAlpha=.5;x.lineWidth=0.7;x.beginPath();x.moveTo(ox+22,yy+rh*0.55);x.lineTo(ox+108,yy+rh*0.55);x.stroke();x.globalAlpha=1;
     if(i===scan){x.fillStyle="rgba(26,22,15,0.10)";x.fillRect(ox+1,yy+1,118,rh-1);}}
   x.globalAlpha=.4;x.beginPath();x.moveTo(mcx+16,my);x.lineTo(ox,my);x.stroke();x.globalAlpha=1;arrow(x,ox,my,0,5);
   tagline(x,w,h,"MANY RECORDS → ONE RANKED LIST · PRESERVED");
   num(x,"10",lx+21,srcY[0],lx+21,srcY[0]-20);num(x,"12",mcx,my-16,mcx-6,my-34);num(x,"14",ox+60,oy,ox+60,oy-20);num(x,"16",ox+120,my,ox+120,my+24);},
 Bl(x,w,h,t){const lx=w*0.12,my=h*0.5;
   // metered usage in
   const val=Math.floor(t*7)%1000;const bx=lx,by=my-15;x.font='600 9px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("METERED",bx,by-8);
   digits(x,bx,by,3,val,20);
   // price -> invoice
   const inx=w*0.44;x.globalAlpha=.4;x.strokeStyle=INK;x.lineWidth=0.8;x.beginPath();x.moveTo(bx+60,my);x.lineTo(inx-6,my);x.stroke();x.globalAlpha=1;arrow(x,inx-6,my,0,5);
   x.font='500 12px "Fraunces",serif';x.fillStyle=INK;x.fillText("×",bx+66,my+4);
   // invoice doc
   x.fillStyle=PAPER;x.fillRect(inx,my-26,58,52);x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(inx,my-26,58,52);
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("INVOICE",inx+29,my-15);
   x.globalAlpha=.5;for(let l=0;l<3;l++){x.beginPath();x.moveTo(inx+8,my-6+l*7);x.lineTo(inx+50,my-6+l*7);x.stroke();}x.globalAlpha=1;
   x.fillStyle=INK;x.font='500 16px "Fraunces",serif';x.fillText("$",inx+29,my+20);
   // gate (t3 - money is gated): a lock/gate before money-out
   const gx=inx+58+34;x.strokeStyle=INK;x.lineWidth=2;const open=Math.sin(t*0.9)>0.4,lift=open?16:0;
   x.beginPath();x.moveTo(gx,my-16-lift);x.lineTo(gx,my+16-lift);x.stroke();x.strokeStyle="rgba(26,22,15,0.4)";x.lineWidth=0.8;x.beginPath();x.moveTo(gx-4,my+16);x.lineTo(gx+4,my+16);x.stroke();
   x.globalAlpha=.4;x.strokeStyle=INK;x.lineWidth=0.8;x.beginPath();x.moveTo(inx+58,my);x.lineTo(gx,my);x.stroke();x.globalAlpha=1;
   // coin out (money) when gate open
   x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(gx+34,my,10,0,TAU);x.stroke();x.font='500 11px "Fraunces",serif';x.fillStyle=INK;x.textAlign="center";x.fillText("$",gx+34,my+4);
   if(open){const u=fract(t*0.5);token(x,gx+ (34)*u,my,6,INK);}
   tagline(x,w,h,"METER → PRICE → INVOICE · GATED (MONEY IS EDDIE'S LANE)");
   num(x,"10",bx+30,by,bx+30,by-24);num(x,"12",bx+66,my+4,bx+66,my+26);num(x,"14",inx+29,my-26,inx+29,my-46);num(x,"16",gx+34,my-10,gx+34,my-30);num(x,"18",gx,my-16-lift,gx-28,my-16-lift-6);},

 // ---- PROVERS (Group 7): test and prove ----
 Vf(x,w,h,t){const cx=w*0.4,cy=h*0.55,r=60,v=0.5+0.4*Math.sin(t*1.2),setp=0.58;
   dial(x,cx,cy,r,v);const sa=Math.PI*(0.9+setp*1.2);
   x.setLineDash([3,3]);x.strokeStyle=INK;x.lineWidth=1.3;x.beginPath();x.moveTo(cx+Math.cos(sa)*(r+9),cy+Math.sin(sa)*(r+9));x.lineTo(cx+Math.cos(sa)*(r-12),cy+Math.sin(sa)*(r-12));x.stroke();x.setLineDash([]);
   const pass=v>setp,lx2=cx+r+74;x.globalAlpha=.4;x.strokeStyle=INK;x.lineWidth=0.8;x.beginPath();x.moveTo(cx+r,cy);x.lineTo(lx2-12,cy);x.stroke();x.globalAlpha=1;arrow(x,lx2-12,cy,0,5);
   lamp(x,lx2,cy,11,pass);x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText(pass?"PASS":"FAIL",lx2,cy+26);x.textAlign="left";
   tagline(x,w,h,"COMPARE TO A REFERENCE → PASS / FAIL");
   num(x,"10",cx,cy,cx-4,cy+r+14);num(x,"12",cx+Math.cos(sa)*(r+9),cy+Math.sin(sa)*(r+9),cx-r-12,cy-6);num(x,"14",cx+r*0.7,cy-r*0.5,cx+16,cy-r-6);num(x,"16",lx2,cy-11,lx2,cy-30);},
 Cn(x,w,h,t){const lx=w*0.14,rx=w*0.78,my=h*0.55,stages=4,sw=(rx-lx)/stages;
   const u=fract(t*0.32),px=lx+(rx-lx)*u,as=Math.floor(u*stages);
   for(let i=0;i<stages;i++){const sx=lx+i*sw+6;x.strokeStyle=INK;x.globalAlpha=i<=as?1:.5;x.lineWidth=i===as?1.5:0.9;x.strokeRect(sx,my-16,sw-12,32);x.globalAlpha=1;
     if(i>0){x.globalAlpha=.4;x.beginPath();x.moveTo(sx-6,my);x.lineTo(sx,my);x.stroke();x.globalAlpha=1;}}
   x.fillStyle=INK;x.fillRect(px-6,my-6,12,12);x.strokeStyle=PAPER;x.lineWidth=1.2;x.beginPath();x.moveTo(px-3,my);x.lineTo(px-1,my+2.5);x.lineTo(px+3,my-2.5);x.stroke();
   const proven=u>0.9;lamp(x,rx+20,my,11,proven);x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("PROVEN",rx+20,my+26);x.textAlign="left";
   tagline(x,w,h,"FIRE A FIXTURE THROUGH THE WHOLE CHAIN → END-TO-END PROOF");
   num(x,"10",lx+8,my,lx-2,my+30);num(x,"12",lx+sw*2,my+16,lx+sw*2,my+38);num(x,"14",lx+sw*1.5,my-16,lx+sw*1.5,my-36);num(x,"16",rx+20,my-11,rx+20,my-30);},
 Rc(x,w,h,t){const my=h*0.5,colW=112,gap=56,lcx=w*0.5-gap/2-colW,rcx=w*0.5+gap/2,rows=5,rh=20,top=my-rows*rh/2-6;
   x.font='600 9px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("MAP",lcx+colW/2,top-9);x.fillText("TERRITORY",rcx+colW/2,top-9);x.textAlign="left";
   x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(lcx,top,colW,rows*rh);x.strokeRect(rcx,top,colW,rows*rh);
   const drift=[1,3],scan=fract(t*0.32)*rows;
   for(let i=0;i<rows;i++){const yy=top+i*rh,yc=yy+rh/2,d=drift.includes(i);
     if(i){x.strokeStyle=INK;x.globalAlpha=.4;x.lineWidth=0.6;x.beginPath();x.moveTo(lcx,yy);x.lineTo(lcx+colW,yy);x.stroke();x.beginPath();x.moveTo(rcx,yy);x.lineTo(rcx+colW,yy);x.stroke();x.globalAlpha=1;}
     x.strokeStyle=INK;x.globalAlpha=.55;x.lineWidth=0.9;x.beginPath();x.moveTo(lcx+9,yc);x.lineTo(lcx+colW-11,yc);x.stroke();x.beginPath();x.moveTo(rcx+9,yc);x.lineTo(rcx+(d?colW*0.5:colW-11),yc);x.stroke();x.globalAlpha=1;
     if(i<scan){if(d){x.strokeStyle=RED;x.lineWidth=1.5;x.beginPath();x.moveTo(lcx+colW+9,yc-4);x.lineTo(rcx-9,yc+4);x.stroke();x.beginPath();x.moveTo(lcx+colW+9,yc+4);x.lineTo(rcx-9,yc-4);x.stroke();}
       else{x.strokeStyle=INK;x.globalAlpha=.55;x.lineWidth=1;x.beginPath();x.moveTo(lcx+colW+9,yc-1.6);x.lineTo(rcx-9,yc-1.6);x.stroke();x.beginPath();x.moveTo(lcx+colW+9,yc+1.6);x.lineTo(rcx-9,yc+1.6);x.stroke();x.globalAlpha=1;}}}
   const sy=top+scan*rh;x.strokeStyle=RED;x.globalAlpha=.45;x.lineWidth=1;x.beginPath();x.moveTo(lcx-8,sy);x.lineTo(rcx+colW+8,sy);x.stroke();x.globalAlpha=1;
   x.fillStyle=RED;x.font='600 10px "IBM Plex Mono"';x.textAlign="center";x.fillText("DRIFT: "+drift.length,w*0.5,top+rows*rh+22);x.textAlign="left";
   tagline(x,w,h,"COMPARE THE MAP TO THE TERRITORY → EMIT THE DRIFT");
   num(x,"10",lcx+colW/2,top,lcx+colW/2,top-24);num(x,"12",rcx+colW/2,top,rcx+colW/2,top-24);num(x,"14",w*0.5,my,w*0.5-46,my-8);num(x,"16",w*0.5,top+rows*rh+15,w*0.5+52,top+rows*rh+19);},
 Ev(x,w,h,t){const lx=w*0.14,my=h*0.5;doc(x,lx,my-24,44,48,4);
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("OUTPUT",lx,my-30);
   const ccx=w*0.42;for(let i=0;i<4;i++){x.strokeStyle=INK;x.lineWidth=0.9;x.globalAlpha=.6+i*0.1;x.strokeRect(ccx-3+i*3,my-26+i*3,40,46);x.globalAlpha=1;}
   x.fillStyle=MUT;x.textAlign="center";x.fillText("CORPUS",ccx+12,my-32);x.textAlign="left";
   x.globalAlpha=.4;x.strokeStyle=INK;x.beginPath();x.moveTo(lx+44,my);x.lineTo(ccx-6,my);x.stroke();x.globalAlpha=1;arrow(x,ccx-6,my,0,5);
   const bx=w*0.66,bw=118;["REPRESENTATIVE","HARD"].forEach((lab,i)=>{const by=my-20+i*30,val=(i?0.55:0.82)+0.05*Math.sin(t*1.1+i);
     x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(bx,by,bw,14);x.fillStyle=INK;x.globalAlpha=.72;x.fillRect(bx+1,by+1,(bw-2)*val,12);x.globalAlpha=1;
     x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText(lab,bx,by-3);});
   x.globalAlpha=.4;x.beginPath();x.moveTo(ccx+40,my);x.lineTo(bx-6,my);x.stroke();x.globalAlpha=1;arrow(x,bx-6,my,0,5);
   tagline(x,w,h,"GRADE AGAINST A HELD-OUT CORPUS → TWO RATES (NEVER BLENDED)");
   num(x,"10",lx+22,my-24,lx+22,my-44);num(x,"12",ccx+18,my-26,ccx+42,my-44);num(x,"14",bx,my-20,bx-16,my-38);num(x,"16",bx+bw,my-13,bx+bw,my-32);},

 // ---- EMITTERS (Group 9): send outward ----
 No(x,w,h,t){const cx=w*0.36,cy=h*0.52;x.strokeStyle=INK;x.lineWidth=1.2;x.beginPath();x.arc(cx,cy,10,0,TAU);x.stroke();hatch(x,cx-4,cy-4,8,8,Math.PI/4);
   waves(x,cx,cy,w*0.42,t,-0.9,0.9,0.5);
   [cy-42,cy,cy+42].forEach(ry=>{x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(w*0.8,ry,4,0,TAU);x.stroke();});
   tagline(x,w,h,"EMIT OUTWARD — BROADCAST TO MANY");
   num(x,"10",cx-10,cy,cx-30,cy+26);num(x,"12",cx+44,cy-16,cx+44,cy-38);num(x,"14",w*0.8,cy-42,w*0.8,cy-60);},
 Hb(x,w,h,t){const lx=w*0.18,rx=w*0.86,my=h*0.52,clx=w*0.12;
   x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(clx,my,9,0,TAU);x.stroke();const ca=t*1.2;x.beginPath();x.moveTo(clx,my);x.lineTo(clx+Math.cos(ca)*6,my+Math.sin(ca)*6);x.stroke();
   x.strokeStyle=INK;x.lineWidth=1.3;x.beginPath();const off=fract(t*0.5)*60;let first=true;
   for(let px=lx;px<rx;px+=1){const ph=((px-lx+off)%60)/60;let yy=my;if(ph>0.42&&ph<0.5)yy=my-26*(1-Math.abs(ph-0.46)/0.04);else if(ph>=0.5&&ph<0.56)yy=my+12*(1-Math.abs(ph-0.53)/0.03);if(first){x.moveTo(px,yy);first=false;}else x.lineTo(px,yy);}x.stroke();
   tagline(x,w,h,"A REGULAR PULSE — LIVENESS ON A CLOCK");
   num(x,"10",clx,my-9,clx,my-30);num(x,"12",w*0.5,my-26,w*0.5,my-44);num(x,"14",rx,my,rx+6,my+26);},
 Dp(x,w,h,t){const lx=w*0.14,my=h*0.55,gx=w*0.44,nx=w*0.7;
   x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(lx,my,7,0,TAU);x.stroke();x.fillStyle=INK;x.beginPath();x.arc(lx,my,2.5,0,TAU);x.fill();
   x.strokeStyle=INK;x.globalAlpha=.4;x.lineWidth=0.8;x.beginPath();x.moveTo(lx+8,my);x.lineTo(gx-14,my);x.stroke();x.globalAlpha=1;
   const open=Math.sin(t*1.1)>0,lift=open?16:0;barrier(x,gx,my,40,lift);
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("Hu / Ag BOND",gx,my-34);x.textAlign="left";
   doc(x,nx,my-20,76,40,2);x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("NAMED",nx+38,my-26);x.textAlign="left";
   x.globalAlpha=.4;x.strokeStyle=INK;x.beginPath();x.moveTo(gx,my);x.lineTo(nx,my);x.stroke();x.globalAlpha=1;
   if(open){const u=fract(t*0.5);token(x,gx+(nx-gx)*u,my,7,INK);}
   tagline(x,w,h,"TO A NAMED RELATIONSHIP · NEVER FREE — BONDED TO A GATE");
   num(x,"10",lx,my-7,lx-4,my-28);num(x,"12",gx,my-34,gx-42,my-40);num(x,"14",nx+38,my-20,nx+38,my-40);num(x,"16",gx+(nx-gx)*0.5,my,gx+(nx-gx)*0.5,my+26);},

 // ---- INTAKES (Group 3): take the world in ----
 Cp(x,w,h,t){const cx=w*0.5,top=h*0.26,ap=h*0.5,by=h*0.56;
   x.strokeStyle=INK;x.lineWidth=1.1;x.beginPath();x.moveTo(cx-40,top);x.lineTo(cx-8,ap);x.lineTo(cx+8,ap);x.lineTo(cx+40,top);x.stroke();
   x.strokeRect(cx-26,by,52,h*0.18);hatch(x,cx-25,by+1,50,h*0.18-2,Math.PI/4);x.fillStyle=PAPER;x.fillRect(cx-24,by+2,48,h*0.18-4);x.strokeStyle=INK;x.strokeRect(cx-24,by+2,48,h*0.18-4);
   const u=fract(t*0.5);if(u<0.7)token(x,cx,top+(by-top)*Math.min(1,u*1.5),8,INK);token(x,cx,by+h*0.09,8,INK);
   tagline(x,w,h,"INGEST ONE INPUT → HOLD IT");
   num(x,"10",cx-24,top,cx-44,top-8);num(x,"12",cx,ap,cx+24,ap-6);num(x,"14",cx,by+h*0.09,cx+44,by+h*0.09);},
 Wa(x,w,h,t){const cx=w*0.46,my=h*0.5;
   x.strokeStyle=INK;x.globalAlpha=.4;x.lineWidth=0.8;x.beginPath();x.moveTo(w*0.14,my+34);x.lineTo(w*0.82,my+34);x.stroke();x.globalAlpha=1;
   const off=fract(t*0.5)*30;for(let px=w*0.14;px<w*0.82;px+=30){const sx=px+off;const j=(Math.floor(sx/60)%3===0);token(x,sx,my+34-(j?10:0),5,j?INK:MUT);}
   eye(x,cx,my-8,20);x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(cx+42,my-8,16,-1.2,3.6);x.stroke();arrow(x,cx+42+16*Math.cos(3.6),my-8+16*Math.sin(3.6),3.6+1.6,4);
   const chg=Math.sin(t*2)>0.9;if(chg)lamp(x,cx,my-42,7,true);
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("READ · COMPARE · FIRE ON CHANGE",w*0.14,my-52);
   tagline(x,w,h,"A SENSE ON A LOOP — FIRE ON CHANGE");
   num(x,"10",w*0.3,my+34,w*0.3,my+52);num(x,"12",cx,my-8,cx-28,my-8);num(x,"14",cx+42,my-24,cx+42,my-42);num(x,"16",cx,my-42,cx+28,my-48);},
 Gd(x,w,h,t){const lx=w*0.14,my=h*0.5;x.strokeStyle=INK;x.globalAlpha=.7;x.lineWidth=1;x.beginPath();for(let i=0;i<5;i++)x.arc(lx+10,my,6+i*3,i,i+4);x.stroke();x.globalAlpha=1;
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("PILE",lx,my-28);
   x.globalAlpha=.4;x.strokeStyle=INK;x.beginPath();x.moveTo(lx+26,my);x.lineTo(w*0.4,my);x.stroke();x.globalAlpha=1;arrow(x,w*0.4,my,0,5);
   const gx=w*0.44,gy=my-40,cols=4,rows=4,cw=26,ch=20,total=cols*rows,filled=Math.floor(t*3)%(total+1);
   for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){x.strokeStyle=INK;x.lineWidth=0.8;x.strokeRect(gx+c*cw,gy+r*ch,cw,ch);
     if(r*cols+c<filled){x.globalAlpha=.5;x.beginPath();x.moveTo(gx+c*cw+4,gy+r*ch+ch*0.6);x.lineTo(gx+c*cw+cw-4,gy+r*ch+ch*0.6);x.stroke();x.globalAlpha=1;}}
   x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;for(let c=0;c<cols;c++)x.fillText("Q"+(c+1),gx+c*cw+6,gy-4);
   tagline(x,w,h,"PILE IN → GRID OF CELLS (BY QUESTION) · AUDITABLE");
   num(x,"10",lx+10,my,lx+10,my+26);num(x,"12",w*0.4,my,w*0.4,my+26);num(x,"14",gx+cols*cw/2,gy,gx+cols*cw/2,gy-22);},

 // ---- KEEPERS (Group 4): hold ----
 St(x,w,h,t){const cx=w*0.5,my=h*0.5,cw=64,ch=44,bx=cx-cw/2,by=my-ch/2;x.strokeStyle=INK;x.lineWidth=1.2;x.strokeRect(bx,by,cw,ch);
   const cyc=Math.floor(t*0.6)%3,vals=["A","B","C"],u=fract(t*0.6),inx=bx-30+26*Math.min(1,u*3);
   if(u<0.4)token(x,inx,my,8,INK);
   x.fillStyle="rgba(26,22,15,0.12)";x.fillRect(bx+3,by+3,cw-6,ch-6);
   x.fillStyle=INK;x.font='500 22px "Fraunces",serif';x.textAlign="center";x.textBaseline="middle";x.fillText(vals[cyc],cx,my);x.textAlign="left";x.textBaseline="alphabetic";
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("CURRENT",cx,by-8);x.textAlign="left";
   x.strokeStyle=INK;x.globalAlpha=.5;x.lineWidth=1;x.beginPath();x.arc(cx+cw/2+18,my,10,-1,4);x.stroke();x.globalAlpha=1;
   tagline(x,w,h,"HOLDS THE CURRENT VALUE · OVERWRITES");
   num(x,"10",bx,my,bx-16,my-ch/2-10);num(x,"12",cx,by+ch,cx,by+ch+22);num(x,"14",cx,my,cx+cw/2+34,my-18);},
 Ps(x,w,h,t){const cx=w*0.5,my=h*0.5,dw=94,bx=cx-dw/2,rows=6,rh=17,top=my-rows*rh/2;x.strokeStyle=INK;x.lineWidth=1.1;x.strokeRect(bx,top,dw,rows*rh);
   const filled=1+Math.floor(t*0.6)%rows;
   for(let i=0;i<rows;i++){const yy=top+(rows-1-i)*rh;x.globalAlpha=i<filled?0.85:0.2;x.lineWidth=0.7;x.beginPath();x.moveTo(bx+6,yy+rh*0.6);x.lineTo(bx+dw-16,yy+rh*0.6);x.stroke();
     if(i<filled){x.fillStyle=INK;x.beginPath();x.arc(bx+dw-9,yy+rh*0.5,2,0,TAU);x.fill();}x.globalAlpha=1;}
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("DURABLE ARCHIVE",cx,top-8);x.textAlign="left";
   const u=fract(t*0.6);token(x,bx-24+(dw/2)*Math.min(1,u*2),top+rows*rh-rh/2,6,INK);
   tagline(x,w,h,"DURABLE STORE · MANY RECORDS · PERSISTS");
   num(x,"10",bx,top+rows*rh-rh/2,bx-18,top+rows*rh+12);num(x,"12",bx,top+10,bx-16,top-6);num(x,"14",bx+dw,my,bx+dw+16,my-16);},

 // ---- TRANSFORMERS (Group 5): reshape and produce ----
 Cv(x,w,h,t){const lx=w*0.22,cx=w*0.5,rx=w*0.78,my=h*0.5;x.strokeStyle=INK;x.globalAlpha=.4;x.lineWidth=0.8;x.beginPath();x.moveTo(lx,my);x.lineTo(rx,my);x.stroke();x.globalAlpha=1;
   x.save();x.translate(cx,my);x.rotate(t*1.1);x.strokeStyle=INK;x.lineWidth=1.1;const hr=16;x.beginPath();for(let i=0;i<6;i++){const a=i/6*TAU;i?x.lineTo(Math.cos(a)*hr,Math.sin(a)*hr):x.moveTo(Math.cos(a)*hr,Math.sin(a)*hr);}x.closePath();x.stroke();x.restore();
   x.fillStyle=INK;x.fillRect(lx-7,my-7,14,14);x.beginPath();x.arc(rx,my,8,0,TAU);x.fill();
   const u=fract(t*0.55),px=lx+(rx-lx)*u,m=Math.max(0,Math.min(1,(u-0.4)/0.2));
   if(m<=0)token(x,px,my,11,INK);else if(m>=1){x.fillStyle=INK;x.beginPath();x.arc(px,my,5.5,0,TAU);x.fill();}else{x.globalAlpha=.6;token(x,px,my,10,INK);x.globalAlpha=1;}
   tagline(x,w,h,"CHANGE THE FORM · DETERMINISTIC");
   num(x,"10",lx,my,lx-6,my+26);num(x,"12",cx,my-16,cx+22,my-34);num(x,"14",rx,my,rx+8,my+26);},
 Gn(x,w,h,t){const lx=w*0.16,cx=w*0.46,my=h*0.5;doc(x,lx,my-20,40,40,3);
   x.strokeStyle=INK;x.lineWidth=1.1;x.beginPath();x.moveTo(cx,my-18);x.lineTo(cx+16,my);x.lineTo(cx,my+18);x.lineTo(cx-16,my);x.closePath();x.stroke();
   x.font='600 13px "Fraunces",serif';x.fillStyle=INK;x.textAlign="center";x.textBaseline="middle";x.fillText("?",cx,my);x.textAlign="left";x.textBaseline="alphabetic";
   x.globalAlpha=.4;x.beginPath();x.moveTo(lx+40,my);x.lineTo(cx-16,my);x.stroke();x.globalAlpha=1;
   const nx=w*0.68;x.fillStyle=PAPER;x.fillRect(nx,my-26,66,52);x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(nx,my-26,66,52);
   const lines=Math.floor(fract(t*0.4)*6);x.globalAlpha=.6;x.lineWidth=0.7;for(let l=0;l<lines;l++){x.beginPath();x.moveTo(nx+6,my-16+l*8);x.lineTo(nx+60,my-16+l*8);x.stroke();}x.globalAlpha=1;
   x.globalAlpha=.4;x.beginPath();x.moveTo(cx+16,my);x.lineTo(nx,my);x.stroke();x.globalAlpha=1;arrow(x,nx,my,0,5);
   x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("NEW",nx+33,my-30);x.textAlign="left";
   tagline(x,w,h,"PRODUCE A NEW ARTIFACT · WITH JUDGMENT");
   num(x,"10",lx+20,my-20,lx+20,my-40);num(x,"12",cx,my-18,cx-8,my-36);num(x,"14",nx+33,my+26,nx+33,my+46);},
 Gh(x,w,h,t){const my=h*0.52,bnd=w*0.52,devX=w*0.22,cloudX=w*0.8;
   // membrane
   x.strokeStyle=INK;x.setLineDash([5,4]);x.lineWidth=1.1;x.beginPath();x.moveTo(bnd,my-70);x.lineTo(bnd,my+70);x.stroke();x.setLineDash([]);
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("DEVICE",devX,my-56);x.fillText("EGRESS",cloudX,my-56);x.textAlign="left";
   // device store (real, held)
   x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(devX-22,my-15,44,30);x.fillStyle=INK;x.font='500 14px "Fraunces",serif';x.textAlign="center";x.textBaseline="middle";x.fillText("Ana",devX,my);x.textBaseline="alphabetic";x.textAlign="left";
   // cloud
   x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.arc(cloudX,my,18,0,TAU);x.stroke();x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("LLM",cloudX,my+3);x.textAlign="left";
   // scrub filter at membrane
   x.fillStyle=PAPER;x.fillRect(bnd-12,my-18,24,36);x.strokeStyle=INK;x.lineWidth=1.2;x.strokeRect(bnd-12,my-18,24,36);hatch(x,bnd-11,my-17,22,34,Math.PI/4);
   x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("SCRUB",bnd,my+32);x.textAlign="left";
   // arced round-trip paths
   x.strokeStyle=INK;x.globalAlpha=.3;x.lineWidth=0.8;x.beginPath();x.moveTo(devX+22,my-6);x.quadraticCurveTo(bnd,my-54,cloudX-18,my-6);x.stroke();x.beginPath();x.moveTo(cloudX-18,my+6);x.quadraticCurveTo(bnd,my+54,devX+22,my+6);x.stroke();x.globalAlpha=1;
   const u=fract(t*0.4);
   if(u<0.5){const uu=u/0.5,v=1-uu,px=v*v*(devX+22)+2*v*uu*bnd+uu*uu*(cloudX-18),py=v*v*(my-6)+2*v*uu*(my-54)+uu*uu*(my-6),cr=px>bnd;
     x.fillStyle=INK;x.font='500 12px "Fraunces",serif';x.textAlign="center";x.fillText(cr?"Xyz":"Ana",px,py-5);x.textAlign="left";}
   else{const uu=(u-0.5)/0.5,v=1-uu,px=v*v*(cloudX-18)+2*v*uu*bnd+uu*uu*(devX+22),py=v*v*(my+6)+2*v*uu*(my+54)+uu*uu*(my+6),cr=px<bnd;
     x.fillStyle=INK;x.font='500 12px "Fraunces",serif';x.textAlign="center";x.fillText(cr?"Ana":"Xyz",px,py+9);x.textAlign="left";}
   tagline(x,w,h,"SCRUB PII → SEND → REHYDRATE · FAIL CLOSED");
   num(x,"10",devX,my-15,devX,my-34);num(x,"12",bnd,my-18,bnd-32,my-30);num(x,"14",bnd,my+18,bnd+34,my+40);num(x,"16",cloudX,my-18,cloudX,my-36);},
 Ay(x,w,h,t){const lx=w*0.16,my=h*0.5;x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(lx,my-30,54,60);
   x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("TEMPLATE",lx+27,my-38);x.textAlign="left";
   const slots=[my-16,my,my+16],u=fract(t*0.5),fc=Math.floor(u*4);
   slots.forEach((sy,i)=>{x.strokeStyle=INK;x.setLineDash([3,2]);x.lineWidth=0.8;x.strokeRect(lx+9,sy-5,36,10);x.setLineDash([]);if(i<fc){x.fillStyle=INK;x.fillRect(lx+11,sy-3,32,6);}});
   const nx=w*0.66;doc(x,nx,my-26,64,52,4);x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("FINISHED",nx+32,my-30);x.textAlign="left";
   x.globalAlpha=.4;x.strokeStyle=INK;x.beginPath();x.moveTo(lx+54,my);x.lineTo(nx,my);x.stroke();x.globalAlpha=1;arrow(x,nx,my,0,5);
   tagline(x,w,h,"TEMPLATE + DATA → FINISHED DOCUMENT · DETERMINISTIC");
   num(x,"10",lx+27,my-30,lx+27,my-50);num(x,"12",lx+27,my+30,lx+27,my+50);num(x,"14",nx+32,my+26,nx+32,my+46);},

 // ---- ROUTERS (Group 6): direct the flow ----
 Dc(x,w,h,t){const lx=w*0.14,fx=w*0.44,my=h*0.5,rx=w*0.86,bys=[my-44,my,my+44];x.strokeStyle=INK;x.globalAlpha=.4;x.lineWidth=0.8;x.beginPath();x.moveTo(lx,my);x.lineTo(fx-18,my);x.stroke();x.globalAlpha=1;
   x.beginPath();x.moveTo(fx,my-18);x.lineTo(fx+18,my);x.lineTo(fx,my+18);x.lineTo(fx-18,my);x.closePath();x.strokeStyle=INK;x.lineWidth=1.1;x.stroke();
   x.font='600 13px "Fraunces",serif';x.fillStyle=INK;x.textAlign="center";x.textBaseline="middle";x.fillText("?",fx,my);x.textAlign="left";x.textBaseline="alphabetic";
   const act=Math.floor(t*0.5)%3;bys.forEach((by,i)=>{x.strokeStyle=INK;x.globalAlpha=i===act?1:.4;x.lineWidth=i===act?1.2:0.7;x.beginPath();x.moveTo(fx+13,my+(i-1)*6);x.lineTo(rx,by);x.stroke();x.beginPath();x.arc(rx,by,3,0,TAU);x.stroke();x.globalAlpha=1;});
   const u=fract(t*0.9);token(x,fx+(rx-fx)*u,my+(bys[act]-my)*u,8,INK);
   tagline(x,w,h,"BRANCH ON JUDGMENT");
   num(x,"10",lx+30,my,lx+20,my-22);num(x,"12",fx,my-18,fx-6,my-36);num(x,"14",rx,bys[0],rx+6,bys[0]-16);},
 Sw(x,w,h,t){const lx=w*0.12,tx=w*0.38,my=h*0.5,rx=w*0.86,bys=[my-44,my,my+44],tw=70,th=54,ty=my-th/2;x.strokeStyle=INK;x.globalAlpha=.4;x.lineWidth=0.8;x.beginPath();x.moveTo(lx,my);x.lineTo(tx-4,my);x.stroke();x.globalAlpha=1;
   x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(tx,ty,tw,th);const cs=Math.floor(t*0.5)%3;
   for(let i=0;i<3;i++){const ry=ty+i*(th/3);if(i){x.globalAlpha=.5;x.lineWidth=0.6;x.beginPath();x.moveTo(tx,ry);x.lineTo(tx+tw,ry);x.stroke();x.globalAlpha=1;}
     if(i===cs){x.fillStyle="rgba(26,22,15,0.1)";x.fillRect(tx+1,ry+1,tw-2,th/3-1);}x.font='600 9px "IBM Plex Mono"';x.fillStyle=i===cs?INK:MUT;x.textAlign="left";x.fillText("t"+(i+1)+" → "+(i+1),tx+7,ry+(th/3)/2+3);}
   bys.forEach((by,i)=>{x.strokeStyle=INK;x.globalAlpha=i===cs?1:.4;x.lineWidth=i===cs?1.2:0.7;x.beginPath();x.moveTo(tx+tw,my+(i-1)*8);x.lineTo(rx,by);x.stroke();x.beginPath();x.arc(rx,by,3,0,TAU);x.stroke();x.globalAlpha=1;});
   const u=fract(t*0.9);token(x,tx+tw+(rx-tx-tw)*u,my+(bys[cs]-my)*u,8,INK);
   tagline(x,w,h,"ROUTE BY A DECLARED TABLE · DETERMINISTIC");
   num(x,"10",lx+20,my,lx+20,my-22);num(x,"12",tx+tw/2,ty,tx+tw/2,ty-22);num(x,"14",rx,bys[0],rx+6,bys[0]-16);},

 // ---- RESOLVERS (Group 2): resolve a reference to truth ----
 Lk(x,w,h,t){const tx=w*0.42,ty=h*0.28,tw=w*0.26,rows=4,rh=22,u=fract(t*0.45),match=Math.floor(u*rows)%rows;x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(tx,ty,tw,rows*rh);
   for(let i=0;i<rows;i++){const yy=ty+i*rh;if(i){x.globalAlpha=.5;x.lineWidth=0.6;x.beginPath();x.moveTo(tx,yy);x.lineTo(tx+tw,yy);x.stroke();x.globalAlpha=1;}
     x.globalAlpha=.5;x.beginPath();x.moveTo(tx+8,yy+rh*0.6);x.lineTo(tx+tw-8,yy+rh*0.6);x.stroke();x.globalAlpha=1;if(i===match){x.fillStyle="rgba(26,22,15,0.12)";x.fillRect(tx+1,yy+1,tw-2,rh-1);}}
   const oy=ty+match*rh+rh/2,kx=tx-34+28*Math.min(1,u*3);token(x,kx,oy,8,INK);
   x.strokeStyle=INK;x.lineWidth=1;x.beginPath();x.moveTo(tx+tw,oy);x.lineTo(tx+tw+30,oy);x.stroke();arrow(x,tx+tw+30,oy,0,5);
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("INDEX",tx,ty-8);
   tagline(x,w,h,"KEY → TABLE → VALUE · DETERMINISTIC");
   num(x,"10",kx,oy,tx-40,oy-20);num(x,"12",tx+tw/2,ty+rows*rh,tx+tw/2,ty+rows*rh+18);num(x,"14",tx+tw-8,oy,tx+tw+8,ty-6);num(x,"16",tx+tw+30,oy,tx+tw+30,oy+22);},
 Rs(x,w,h,t){const qx=w*0.14,my=h*0.5,scx=w*0.44,synx=w*0.72,ax=synx+22,srcs=[my-48,my-16,my+16,my+48];
   // query node
   x.strokeStyle=INK;x.lineWidth=1.1;x.beginPath();x.arc(qx,my,10,0,TAU);x.stroke();x.font='600 12px "Fraunces",serif';x.fillStyle=INK;x.textAlign="center";x.textBaseline="middle";x.fillText("?",qx,my);x.textBaseline="alphabetic";x.textAlign="left";
   srcs.forEach((sy,i)=>{
     x.strokeStyle=INK;x.globalAlpha=.3;x.lineWidth=0.8;x.beginPath();x.moveTo(qx+10,my);x.lineTo(scx-4,sy);x.stroke();x.beginPath();x.moveTo(scx+34,sy);x.lineTo(synx-14,my);x.stroke();x.globalAlpha=1;
     doc(x,scx,sy-10,34,20,2);
     // pulse out then back
     const u=fract(t*0.4+i*0.12);let px,py;if(u<0.5){const uu=u/0.5;px=qx+10+(scx-4-(qx+10))*uu;py=my+(sy-my)*uu;}else{const uu=(u-0.5)/0.5;px=scx+34+((synx-14)-(scx+34))*uu;py=sy+(my-sy)*uu;}
     x.fillStyle=RED;x.globalAlpha=.85;x.beginPath();x.arc(px,py,2.2,0,TAU);x.fill();x.globalAlpha=1;});
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("SOURCES",scx+17,my-62);x.textAlign="left";
   // synthesis node (diamond) + answer
   x.strokeStyle=INK;x.lineWidth=1.1;x.beginPath();x.moveTo(synx,my-15);x.lineTo(synx+14,my);x.lineTo(synx,my+15);x.lineTo(synx-14,my);x.closePath();x.stroke();hatch(x,synx-6,my-6,12,12,Math.PI/4);
   doc(x,ax,my-16,42,32,3);x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("ANSWER",ax+21,my-22);x.textAlign="left";
   x.strokeStyle=INK;x.globalAlpha=.35;x.lineWidth=0.8;x.beginPath();x.moveTo(synx+14,my);x.lineTo(ax,my);x.stroke();x.globalAlpha=1;
   tagline(x,w,h,"SEARCH MANY SOURCES → SYNTHESIZE ONE ANSWER");
   num(x,"10",qx,my-10,qx,my-30);num(x,"12",scx+17,my-48,scx+17,my-66);num(x,"14",synx,my-15,synx,my-34);num(x,"16",ax+21,my+16,ax+21,my+34);},
 At(x,w,h,t){const cx=w*0.32,my=h*0.5,ox=w*0.66;for(let i=0;i<7;i++){x.strokeStyle=INK;x.lineWidth=0.8;x.globalAlpha=.5+i*0.06;x.strokeRect(cx-30+i*2,my-40+i*2,54,64);x.globalAlpha=1;}
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("WHOLE CORPUS",cx,my-50);x.textAlign="left";
   const sy=my-36+fract(t*0.4)*66;x.strokeStyle=INK;x.lineWidth=1.3;x.beginPath();x.moveTo(cx-28,sy);x.lineTo(cx+26,sy);x.stroke();
   x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="center";x.fillText("READ-ONLY",cx,my+42);x.textAlign="left";
   doc(x,ox,my-42,58,32,3);doc(x,ox,my+8,58,32,3);x.font='600 7px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("PROFILE",ox,my-48);x.fillText("EVAL SET",ox,my+2);
   x.globalAlpha=.4;x.strokeStyle=INK;x.beginPath();x.moveTo(cx+26,my-8);x.lineTo(ox,my-26);x.stroke();x.beginPath();x.moveTo(cx+26,my+8);x.lineTo(ox,my+24);x.stroke();x.globalAlpha=1;
   tagline(x,w,h,"MINE THE WHOLE CORPUS (READ-ONLY) → PROFILE + EVAL SET");
   num(x,"10",cx,my,cx-42,my+22);num(x,"12",cx,sy,cx-42,sy-6);num(x,"14",ox+29,my-42,ox+29,my-60);num(x,"16",ox+29,my+40,ox+29,my+58);},

 // ---- INITIATORS (Group 1): begin ----
 Tg(x,w,h,t){const cx=w*0.4,my=h*0.52,r=22,c=fract(t*0.6),ax=w*0.78;
   x.strokeStyle="rgba(26,22,15,0.35)";x.lineWidth=3.5;x.beginPath();x.arc(cx,my,r,-1.4,-1.4+TAU*c);x.stroke();
   x.strokeStyle=INK;x.lineWidth=1.1;x.beginPath();x.arc(cx,my,r,0,TAU);x.stroke();hatch(x,cx-6,my-6,12,12,Math.PI/4);
   const fired=c>0.9;if(fired){for(let i=0;i<8;i++){const a=i/8*TAU;x.beginPath();x.moveTo(cx+Math.cos(a)*r*0.6,my+Math.sin(a)*r*0.6);x.lineTo(cx+Math.cos(a)*r*1.7,my+Math.sin(a)*r*1.7);x.stroke();}
     x.lineWidth=1.5;x.beginPath();x.moveTo(ax-16,my);x.lineTo(ax,my);x.stroke();arrow(x,ax,my,0,7);}
   else{x.strokeStyle="rgba(26,22,15,0.35)";x.beginPath();x.moveTo(ax-16,my);x.lineTo(ax,my);x.stroke();arrow(x,ax,my,0,6);}
   x.font='600 8px "IBM Plex Mono"';x.fillStyle=MUT;x.textAlign="left";x.fillText("CHARGE → FIRE",cx-32,my-r-12);
   tagline(x,w,h,"FIRE — INITIATE THE CHAIN");
   num(x,"10",cx,my-r,cx-30,my-r-24);num(x,"12",cx+r,my,cx+r+20,my-24);num(x,"14",ax,my,ax,my+28);}
};

// ========================= registry (only plated families render) =========================
const FAMILIES=[
 {g:8,name:"Gates",note:"What holds the door — the column ascends from a number to a person.",
  els:[
   {z:27,s:"Th",n:"Threshold",m:[1,0,0],desc:"A <b>number</b> holds the door. A gauge reads a live value against a setpoint; cross the bar and it opens. Deterministic, re-runnable, no human.",keys:[["10","inlet"],["12","barrier"],["14","measured value"],["16","setpoint bar"],["18","outlet"]]},
   {z:14,s:"Ag",n:"Approval Gate",m:[0,1,2],desc:"A <b>human's stamp</b> holds the door. The drafted action waits in pending custody; a stamp approves it and it releases. Fails safe.",keys:[["10","inlet"],["12","barrier"],["14","pending action (held)"],["16","approval stamp"],["18","outlet"]]},
   {z:26,s:"Dm",n:"Doorman",m:[1,1,2],desc:"A <b>rule</b> holds the door — it decides whether a human is needed at all. Reversible passes through; irreversible is held for the gate.",keys:[["10","inbound action"],["12","reversibility classifier"],["14","two-way — auto-pass"],["16","one-way — held"],["18","hold queue"]]},
   {z:23,s:"Hu",n:"Human-in-loop",m:[3,1,3],scarce:true,desc:"The <b>human is</b> the door — judgment, taste, accountability — emitting passage, a note, or a stop. The heaviest element on the table.",keys:[["10","inbound"],["12","barrier"],["14","operator (the mechanism)"],["16","pass"],["18","note / stop"]]}
  ]},
 {g:10,name:"Meters",note:"Count AND account. Sense reads; Meter accumulates; Rollup consolidates; Billing charges.",
  els:[
   {z:30,s:"Se",n:"Sense",m:[0,0,0],desc:"The <b>speedometer</b>. Reads a live value this instant and holds nothing (s0). Precedes every Meter — you read the gauge before you build the accumulator.",keys:[["10","live input"],["12","needle (current value)"],["14","scale"],["16","reading out"]]},
   {z:25,s:"Me",n:"Meter",m:[0,2,0],desc:"The <b>odometer</b>. Accepts a stream of events and accumulates a running total — count, sum, rate — that persists across runs (s2).",keys:[["10","event stream"],["12","accumulator"],["14","digit register"],["16","running total"]]},
   {z:29,s:"Ro",n:"Rollup",m:[1,2,1],desc:"Many records from many sources into <b>one ranked list</b> — grouped, sorted, severity-reduced, records preserved, not destroyed.",keys:[["10","records (many sources)"],["12","merge + rank"],["14","ranked list (preserved)"],["16","consolidated view"]]},
   {z:20,s:"Bl",n:"Billing",m:[1,2,3],desc:"A meter wired to <b>money</b>: meter the usage, price it, invoice, collect. Always gated (t3) — money is Eddie's lane by the Lane Rule.",keys:[["10","metered usage"],["12","price"],["14","invoice"],["16","amount out"],["18","human gate"]]}
  ]},
 {g:7,name:"Provers",note:"Test and prove — from a gauge, to a fired fixture, to a map-vs-territory diff, to a scored corpus.",
  els:[
   {z:6,s:"Vf",n:"Verification",m:[1,0,0],desc:"Compare a subject to a <b>reference</b>; emit pass or fail. The gauge of the Provers.",keys:[["10","subject"],["12","reference"],["14","gauge"],["16","verdict"]]},
   {z:13,s:"Cn",n:"Canary",m:[0,1,2],desc:"Fire one <b>known-good fixture</b> through the whole production chain on the client's own infra; emit end-to-end proof.",keys:[["10","fixture"],["12","production chain"],["14","stages"],["16","proof"]]},
   {z:17,s:"Rc",n:"Reconcile",m:[2,2,0],desc:"Compare the <b>map to the territory</b>; emit the drift. Proves the documents match what is actually on disk.",keys:[["10","map"],["12","territory"],["14","comparison"],["16","drift"]]},
   {z:19,s:"Ev",n:"Eval",m:[2,3,1],desc:"Grade a chain's output against a <b>held-out corpus</b>; emit two pass rates, representative and hard, never blended. Its verdict is the Succession score.",keys:[["10","output"],["12","corpus"],["14","grader"],["16","two rates"]]}
  ]},
 {g:9,name:"Emitters",note:"Send outward — a broadcast, a heartbeat, and Dispatch, the halogen that never travels free.",
  els:[
   {z:7,s:"No",n:"Notification",m:[0,0,1],desc:"Emit outward to whoever is listening — a <b>broadcast</b>.",keys:[["10","source"],["12","emission"],["14","receivers"]]},
   {z:9,s:"Hb",n:"Heartbeat",m:[0,1,1],desc:"A <b>regular pulse</b> on a clock; liveness you can watch.",keys:[["10","clock"],["12","pulse"],["14","out"]]},
   {z:18,s:"Dp",n:"Dispatch",m:[1,0,3],desc:"Send to a <b>named relationship</b>. The halogen: never free — only bonded to a gate (Hu/Ag). A free Dp is a defect by law.",keys:[["10","source"],["12","gate bond (Hu/Ag)"],["14","named endpoint"],["16","payload"]]}
  ]},
 {g:3,name:"Intakes",note:"Take the world in — one-shot capture, a watching loop, a pile turned into a grid.",
  els:[
   {z:4,s:"Cp",n:"Capture",m:[0,1,0],desc:"Ingest one input and <b>hold</b> it. The one-shot capture.",keys:[["10","inbound"],["12","aperture"],["14","held"]]},
   {z:8,s:"Wa",n:"Watcher",m:[0,2,0],desc:"A <b>Sense on a loop</b> — read, compare, fire on change.",keys:[["10","stream"],["12","eye"],["14","loop"],["16","fire-on-change"]]},
   {z:15,s:"Gd",n:"Grid",m:[2,1,1],desc:"Unstructured <b>pile in; a grid</b> of rows by question-columns out, each cell extracted in parallel, auditable.",keys:[["10","pile"],["12","extractor"],["14","grid cells"]]}
  ]},
 {g:4,name:"Keepers",note:"Hold — State keeps the current value, Persistence keeps the archive.",
  els:[
   {z:5,s:"St",n:"State",m:[0,1,0],desc:"Hold the <b>current value</b>; a new write overwrites the old. The latch.",keys:[["10","write"],["12","cell"],["14","current value"]]},
   {z:11,s:"Ps",n:"Persistence",m:[0,2,1],desc:"A <b>durable store</b> — many records filed and kept, persisting across runs.",keys:[["10","write"],["12","archive"],["14","records"]]}
  ]},
 {g:5,name:"Transformers",note:"Reshape and produce — convert, generate, scrub-and-rehydrate, assemble.",
  els:[
   {z:3,s:"Cv",n:"Convert",m:[0,0,0],desc:"Change the <b>form</b>, deterministically. A → B, no judgment.",keys:[["10","input"],["12","convert node"],["14","output"]]},
   {z:16,s:"Gn",n:"Generation",m:[2,1,1],desc:"Produce a <b>new artifact with judgment</b> — a draft, a label, a report.",keys:[["10","input"],["12","judgment"],["14","new artifact"]]},
   {z:22,s:"Gh",n:"Ghost",m:[2,2,3],desc:"Local-first privacy: detect PII, <b>swap for fakes</b>, send the scrubbed prompt out, rehydrate the answer. Fail closed.",keys:[["10","real entity"],["12","scrub"],["14","egress boundary"],["16","rehydrate"]]},
   {z:28,s:"Ay",n:"Assembly",m:[0,1,1],desc:"<b>Template plus data</b> in, a finished document out. Deterministic composition; the judgment is upstream.",keys:[["10","template"],["12","data"],["14","finished doc"]]}
  ]},
 {g:6,name:"Routers",note:"Direct the flow — Switch by a declared table, Decision by judgment.",
  els:[
   {z:12,s:"Dc",n:"Decision",m:[2,0,1],desc:"Branch on <b>judgment</b>. When a Switch's table starts needing judgment, it has become a Decision.",keys:[["10","inbound"],["12","judgment"],["14","branches"]]},
   {z:24,s:"Sw",n:"Switch",m:[1,0,0],desc:"Route by a <b>declared dispatch table</b>. The deterministic Router.",keys:[["10","case"],["12","dispatch table"],["14","branches"]]}
  ]},
 {g:2,name:"Resolvers",note:"Resolve a reference to truth — a table lookup, a multi-source search, a whole-corpus mining.",
  els:[
   {z:2,s:"Lk",n:"Lookup",m:[0,0,0],desc:"Accept a reference, emit truth. <b>Key → table → value</b>, deterministic.",keys:[["10","key"],["12","table"],["14","match"],["16","value"]]},
   {z:10,s:"Rs",n:"Research",m:[2,1,0],desc:"Resolve by <b>searching many sources</b> and synthesizing an answer.",keys:[["10","query"],["12","sources"],["14","synthesis"],["16","answer"]]},
   {z:21,s:"At",n:"Attunement",m:[2,3,2],desc:"Mine an operator's <b>whole corpus</b> in place, read-only; emit a tuning profile and a golden eval set in one pass. The heaviest Resolver.",keys:[["10","corpus"],["12","read-only scan"],["14","tuning profile"],["16","golden eval set"]]}
  ]},
 {g:1,name:"Initiators",note:"Begin — the spark that fires a chain.",
  els:[
   {z:1,s:"Tg",n:"Trigger",m:[0,0,0],desc:"Charge, then <b>fire</b>, and kick the next primitive. The igniter that starts a chain.",keys:[["10","charge"],["12","spark"],["14","output"]]}
  ]}
];

// ===== sym -> element map: the single source of metadata =====
var ELMAP = {};
FAMILIES.forEach(function (f) { f.els.forEach(function (e) { e.family = f.name.toLowerCase().replace(/s$/, ''); e.g = f.g; ELMAP[e.s] = e; }); });

// ===== compact family micro-motions (for inline mounted glyphs) =====
var MOTION = {
  initiator: function (x, cx, cy, r, tt) { var c = fract(tt * 0.6); x.strokeStyle = c > 0.9 ? RED : INK; x.lineWidth = 1; if (c > 0.9) { for (var i = 0; i < 6; i++) { var a = i / 6 * TAU; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.stroke(); } } else { x.globalAlpha = .5; x.beginPath(); x.arc(cx, cy, r * 0.6, -1.4, -1.4 + TAU * c); x.stroke(); x.globalAlpha = 1; } },
  resolver: function (x, cx, cy, r, tt) { var u = fract(tt * 0.5); x.strokeStyle = INK; x.globalAlpha = .4; x.lineWidth = 1; x.beginPath(); x.moveTo(cx - r, cy); x.lineTo(cx + r, cy); x.stroke(); x.globalAlpha = 1; x.fillStyle = INK; x.fillRect(cx - r + 2 * r * u - 2, cy - 2, 4, 4); },
  intake: function (x, cx, cy, r, tt) { var u = fract(tt * 0.6); x.fillStyle = INK; x.fillRect(cx - 2, cy - r + 2 * r * u, 4, 3); x.strokeStyle = INK; x.globalAlpha = .5; x.lineWidth = 1; x.beginPath(); x.moveTo(cx - r, cy - r); x.lineTo(cx, cy + r); x.lineTo(cx + r, cy - r); x.stroke(); x.globalAlpha = 1; },
  keeper: function (x, cx, cy, r, tt) { var lvl = (Math.floor(tt * 0.7) % 4) / 3; x.strokeStyle = INK; x.lineWidth = 1; x.strokeRect(cx - r, cy - 4, 2 * r, 8); x.fillStyle = INK; x.globalAlpha = .3; x.fillRect(cx - r + 1, cy - 3, (2 * r - 2) * lvl, 6); x.globalAlpha = 1; },
  transformer: function (x, cx, cy, r, tt) { var u = fract(tt * 0.55), mm = Math.max(0, Math.min(1, (u - .4) / .2)), px = cx - r + 2 * r * u; x.fillStyle = INK; if (mm >= 1) { x.beginPath(); x.arc(px, cy, 3, 0, TAU); x.fill(); } else { x.fillRect(px - 3, cy - 3, 6, 6); } },
  router: function (x, cx, cy, r, tt) { var b = Math.floor(tt * 0.5) % 3, ys = [cy - 4, cy, cy + 4]; x.strokeStyle = INK; x.lineWidth = 1; x.globalAlpha = .6; x.beginPath(); x.moveTo(cx - r, cy); x.lineTo(cx, cy); x.lineTo(cx + r, ys[b]); x.stroke(); x.globalAlpha = 1; },
  prover: function (x, cx, cy, r, tt) { var v = 0.5 + 0.4 * Math.sin(tt * 1.3), a = Math.PI * (1 + v); x.strokeStyle = INK; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy + 3, r, Math.PI, TAU); x.stroke(); x.beginPath(); x.moveTo(cx, cy + 3); x.lineTo(cx + Math.cos(a) * r * .8, cy + 3 + Math.sin(a) * r * .8); x.stroke(); },
  gate: function (x, cx, cy, r, tt) { var open = Math.sin(tt * 1.6) > 0; x.strokeStyle = INK; x.globalAlpha = .4; x.lineWidth = 1; x.beginPath(); x.moveTo(cx - r, cy); x.lineTo(cx + r, cy); x.stroke(); x.globalAlpha = 1; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, cy + (open ? -8 : 4)); x.lineTo(cx, cy + (open ? -2 : 8)); x.stroke(); if (open) x.fillRect(cx - 2, cy - 2, 4, 4); },
  emitter: function (x, cx, cy, r, tt) { for (var k = 0; k < 2; k++) { var rr = fract(tt * 0.6 + k / 2) * r; x.globalAlpha = (1 - rr / r) * .7; x.strokeStyle = INK; x.lineWidth = 1; x.beginPath(); x.arc(cx - r * .5, cy, rr, -0.8, 0.8); x.stroke(); x.globalAlpha = 1; } },
  meter: function (x, cx, cy, r, tt) { var a = Math.PI * (1 + (0.5 + 0.4 * Math.sin(tt * 1.5))); x.strokeStyle = INK; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy + 3, r, Math.PI, TAU); x.stroke(); x.beginPath(); x.moveTo(cx, cy + 3); x.lineTo(cx + Math.cos(a) * r * .8, cy + 3 + Math.sin(a) * r * .8); x.stroke(); }
};

// ===== shared RAF loop for inline mounted glyphs =====
var mounts = [], started = false, gt = 0;
function mloop() {
  gt += 0.012;
  for (var i = 0; i < mounts.length; i++) {
    var mnt = mounts[i], c = mnt.canvas; if (!c.isConnected) continue;
    var x = c.getContext("2d"), w = c.width / mnt.dpr, h = c.height / mnt.dpr, e = ELMAP[mnt.sym];
    x.setTransform(mnt.dpr, 0, 0, mnt.dpr, 0, 0); x.clearRect(0, 0, w, h);
    if (mnt.chrome) { x.fillStyle = PAPER; x.fillRect(0, 0, w, h); x.strokeStyle = INK; x.lineWidth = 1; x.strokeRect(0.5, 0.5, w - 1, h - 1); }
    x.fillStyle = INK; x.textAlign = "center"; x.textBaseline = "middle"; x.font = "500 " + Math.round(h * 0.42) + "px Fraunces, Georgia, serif"; x.fillText(mnt.sym, w / 2, h * 0.40);
    (MOTION[e.family] || function () {})(x, w / 2, h * 0.74, Math.min(w * 0.28, 14), gt + mnt.sym.charCodeAt(0));
    if (mnt.label) { x.fillStyle = MUT; x.font = "600 " + Math.max(6, Math.round(h * 0.1)) + 'px "IBM Plex Mono", monospace'; x.fillText(e.n.toUpperCase(), w / 2, h * 0.93); }
    x.textAlign = "left"; x.textBaseline = "alphabetic";
  }
  requestAnimationFrame(mloop);
}

// ===== public API — the single source =====
var Glyphs = {
  families: FAMILIES,
  EL: ELMAP,
  list: function () { return Object.keys(ELMAP).map(function (s) { var e = ELMAP[s]; return { sym: s, name: e.n, z: e.z, family: e.family, mass: e.m }; }).sort(function (a, b) { return a.z - b.z; }); },
  meta: function (s) { var e = ELMAP[s]; return e ? { sym: s, name: e.n, z: e.z, family: e.family, mass: e.m, desc: e.desc, keys: e.keys } : null; },
  plate: function (x, s, w, h, t) { if (DRAWS[s]) DRAWS[s](x, w, h, t); },        // mechanism only
  plateFull: function (x, s, w, h, t) { var e = ELMAP[s]; if (!e) return; sheet(x, w, h); DRAWS[s](x, w, h, t); massBadge(x, w, e); figc(x, w, h, e); },
  setHot: function (v) { hot = v; },
  mount: function (el, sym, opts) {
    if (!ELMAP[sym]) { console.warn("[glyphs] unknown primitive:", sym); return null; }
    opts = opts || {}; var size = opts.size || 48, label = !!opts.label, chrome = opts.chrome !== false;
    var dpr = Math.min(2, global.devicePixelRatio || 1), c = document.createElement("canvas");
    c.width = size * dpr; c.height = (label ? size + 14 : size) * dpr; c.style.width = size + "px"; c.style.height = (label ? size + 14 : size) + "px";
    c.style.display = "inline-block"; c.style.verticalAlign = "middle"; var e = ELMAP[sym]; c.title = e.n + " (Z" + e.z + " · " + e.m.join("·") + ")";
    el.appendChild(c); mounts.push({ canvas: c, sym: sym, dpr: dpr, label: label, chrome: chrome });
    if (!started) { started = true; requestAnimationFrame(mloop); } return c;
  },
  auto: function (root) {
    var nodes = (root || document).querySelectorAll("[data-p]");
    for (var i = 0; i < nodes.length; i++) { var n = nodes[i]; if (n.__glyphed) continue; n.__glyphed = true; Glyphs.mount(n, n.getAttribute("data-p"), { size: +n.getAttribute("data-size") || 48, label: n.hasAttribute("data-label"), chrome: n.getAttribute("data-chrome") !== "false" }); }
  }
};
global.Glyphs = Glyphs;
if (document.readyState !== "loading") Glyphs.auto();
else document.addEventListener("DOMContentLoaded", function () { Glyphs.auto(); });

})(this);
