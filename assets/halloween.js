// Bakehouse homepage feature component. No external dependencies.
export function createHalloweenUI({React,jsx,Link,products}) {
 const h=React.createElement;
 function HalloweenHome(){
  return h('section',{className:'hw-feature',id:'halloween-feature'},
    h('div',{className:'hw-feature-inner'},
      h('div',{className:'hw-photo'},
        h('img',{src:'./images/products/halloween-egg-tarts.jpg',alt:'Halloween egg tarts with pumpkin custard and chocolate decorations',loading:'lazy'}),
        h('span',{className:'hw-photo-stamp'},'A LITTLE BOO. A LOT OF BUTTER.')),
      h('div',{className:'hw-copy'},
        h('span',{className:'hw-eyebrow'},'✦ THE HALLOWEEN EDIT · LIMITED EDITION'),
        h('h2',null,'Something sweet.',h('br'),h('em',null,'Something spooky.')),
        h('p',null,'Meet our Halloween Egg Tarts: silky pumpkin custard, a golden sourdough crust, and the sweetest little ghosts. A little mischief, fresh from the oven.'),
        h('p',{className:'hw-product-note'},'Pumpkin custard · Chocolate bats · Meringue ghosts'),
        h('div',{className:'hw-actions'},
          h(Link,{to:'/menu/halloween-egg-tart',className:'hw-primary'},'Discover the Halloween Tart'),
          h(Link,{to:'/menu',className:'hw-link'},'Explore pastries ↗')),
        h('p',{className:'hw-caption'},'A seasonal little treat, baked to make you smile.'))));
 }
 function HalloweenPet(){
  const [hidden,setHidden]=React.useState(()=>{
   try{return window.localStorage.getItem('bakehouse:boo-hidden')==='true'}catch{return false}
  });
  const [position,setPosition]=React.useState(null);
  const [dragging,setDragging]=React.useState(false);
  const [current,setCurrent]=React.useState(null);
  const [phase,setPhase]=React.useState('idle');
  const [message,setMessage]=React.useState('Pick a pastry and tap Add to Cart. I’ll have a tiny taste!');
  const [active,setActive]=React.useState(true);
  const pet=React.useRef(null);
  const drag=React.useRef(null);
  const suppressClick=React.useRef(false);
  const queue=React.useRef([]);
  const busy=React.useRef(false);
  const timers=React.useRef([]);
  const setPetHidden=value=>{
   setHidden(value);
   try{window.localStorage.setItem('bakehouse:boo-hidden',String(value))}catch{}
  };
  const clampPosition=(left,top)=>{
   const width=pet.current?.offsetWidth||172;
   const height=pet.current?.offsetHeight||225;
   const overhang=window.innerWidth<=700?60:34;
   return {left:Math.max(8+overhang,Math.min(left,window.innerWidth-width-8)),top:Math.max(8,Math.min(top,window.innerHeight-height-8))};
  };
  React.useEffect(()=>{
   const resize=()=>setPosition(previous=>previous?clampPosition(previous.left,previous.top):null);
   window.addEventListener('resize',resize);
   return ()=>window.removeEventListener('resize',resize);
  },[]);
  React.useEffect(()=>{
   let mounted=true;
   const later=(fn,delay)=>timers.current.push(setTimeout(()=>{if(mounted)fn()},delay));
   const next=()=>{
    const item=queue.current.shift();
    if(!item){busy.current=false;setPhase('idle');setCurrent(null);return}
    busy.current=true;setCurrent(item);setActive(true);setPhase('catch');
    setMessage(`Ooh, ${item.name}! A little nibble?`);
    later(()=>{setPhase('eat');setMessage(`Nom nom… ${item.name}!`)},650);
    later(()=>{setPhase('happy');setMessage('Boo-licious! Your treats are safe in your cart.')},2500);
    later(next,4100);
   };
   const onTreat=event=>{
    if(!event.detail?.name)return;
    if(queue.current.length<8)queue.current.push(event.detail);
    if(!busy.current)next();
   };
   window.addEventListener('bakehouse:cart-treat',onTreat);
   return ()=>{mounted=false;window.removeEventListener('bakehouse:cart-treat',onTreat);timers.current.forEach(clearTimeout);queue.current=[];busy.current=false};
  },[]);
  function moveStart(e){
   if(!e.isPrimary||(e.button!==0&&e.pointerType==='mouse'))return;
   const r=pet.current.getBoundingClientRect();
   drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,left:r.left,top:r.top,moved:false};
   suppressClick.current=false;
   e.currentTarget.setPointerCapture(e.pointerId);
  }
  function moveDrag(e){
   const d=drag.current;if(!d||d.id!==e.pointerId)return;
   const dx=e.clientX-d.x,dy=e.clientY-d.y;
   if(!d.moved&&Math.hypot(dx,dy)<7)return;
   d.moved=true;setDragging(true);setPosition(clampPosition(d.left+dx,d.top+dy));
  }
  function moveEnd(e){
   const d=drag.current;if(!d||d.id!==e.pointerId)return;
   suppressClick.current=d.moved?Date.now()+500:0;drag.current=null;setDragging(false);
   if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
   if(!d.moved){window.location.hash='#/game';window.scrollTo({top:0,left:0,behavior:'instant'})}
  }
  if(hidden)return h('button',{type:'button',className:'hw-pet-restore',onClick:()=>setPetHidden(false),title:'Show Boo','aria-label':'Show Boo the Halloween ghost'},'👻');
  const style=position?{left:position.left+'px',top:position.top+'px',right:'auto',bottom:'auto'}:undefined;
  return h('aside',{ref:pet,className:`hw-pet hw-${phase}${active?' hw-active':''}${dragging?' hw-dragging':''}`,style,'aria-label':'Boo, your Halloween bakery companion'},
   h('div',{className:'hw-bubble'},h('p',{role:'status','aria-live':'polite','aria-atomic':'true'},message),h(Link,{className:'hw-pet-cta',to:'/menu',onClick:()=>setMessage('Choose your favourite, then tap Add to Cart. I’m ready!')},'Find your next treat →')),
   h('button',{type:'button',className:'hw-ghost-button',onPointerDown:moveStart,onPointerMove:moveDrag,onPointerUp:moveEnd,onPointerCancel:moveEnd,onKeyDown:e=>{const directions={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-20],ArrowDown:[0,20]};if(!directions[e.key])return;e.preventDefault();const r=pet.current.getBoundingClientRect(),[dx,dy]=directions[e.key];setPosition(clampPosition(r.left+dx,r.top+dy))},onClick:()=>{if(suppressClick.current>Date.now())return;setActive(true);if(!busy.current)setMessage('Add a pastry to your cart and I’ll have a tiny taste!')},'aria-label':'Play Bakehouse Merge to unlock coupons; drag this ghost to move it'},
    h('svg',{className:'hw-ghost',viewBox:'0 0 180 185','aria-hidden':'true',xmlns:'http://www.w3.org/2000/svg'},
     h('g',{className:'hw-ghost-body'},
      h('path',{d:'M34 143 V81 C34 47 58 24 90 24 S146 47 146 81 V143 Q133 131 119 146 Q105 160 90 143 Q75 126 61 146 Q47 159 34 143Z',fill:'#fff9ed',stroke:'#cdb9a4',strokeWidth:'3'}),
      h('ellipse',{cx:70,cy:93,rx:6,ry:8,fill:'#2a365a'}),h('ellipse',{cx:110,cy:93,rx:6,ry:8,fill:'#2a365a'}),
      h('ellipse',{cx:56,cy:111,rx:9,ry:5,fill:'#f1b5ab',opacity:'.7'}),h('ellipse',{cx:124,cy:111,rx:9,ry:5,fill:'#f1b5ab',opacity:'.7'}),
      h('path',{className:'hw-mouth',d:'M80 113 Q90 125 100 113',fill:'none',stroke:'#2a365a',strokeWidth:'3.5',strokeLinecap:'round'}))),
    current&&h('span',{className:'hw-snack',key:`${current.id}-${phase}`,'aria-hidden':'true'},h('img',{src:current.image,alt:''})),
    h('span',{className:'hw-sparkles','aria-hidden':'true'},'✦ ✨')),
   h('span',{className:'hw-pet-name'},'CLICK TO PLAY · DRAG TO MOVE'),
   h('button',{type:'button',className:'hw-pet-close',onClick:()=>setPetHidden(true),title:'Close Boo','aria-label':'Close Boo the Halloween ghost'},'×'));
 }

 return {HalloweenHome,HalloweenPet};
}
