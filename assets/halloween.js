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
  const [visible,setVisible]=React.useState(true);
  const [position,setPosition]=React.useState(null);
  const [showHint,setShowHint]=React.useState(true);
  const drag=React.useRef(null);
  const suppressClick=React.useRef(false);
  const posRef=React.useRef(null);
  posRef.current=position;
  const hint='Tap me to play Bakehouse Merge and unlock bakery coupons! Drag me anywhere on the page.';
  function moveStart(e){
    if(e.button!==0 && e.pointerType==='mouse')return;
    e.preventDefault();
    const r=e.currentTarget.closest('.hw-pet').getBoundingClientRect();
    drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,left:r.left,top:r.top,moved:false};
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function moveDrag(e){
    const d=drag.current;
    if(!d||d.id!==e.pointerId)return;
    const dx=e.clientX-d.x,dy=e.clientY-d.y;
    if(Math.hypot(dx,dy)>7)d.moved=true;
    if(!d.moved)return;
    const w=document.querySelector('.hw-pet')?.offsetWidth||172;
    const h=document.querySelector('.hw-pet')?.offsetHeight||225;
    const left=Math.max(0,Math.min(window.innerWidth-w,d.left+dx));
    const top=Math.max(0,Math.min(window.innerHeight-h,d.top+dy));
    setPosition({left,top});
    setShowHint(false);
  }
  function moveEnd(e){
    const d=drag.current;
    if(!d||d.id!==e.pointerId)return;
    drag.current=null;
    if(d.moved){
      suppressClick.current=true;
      setTimeout(()=>{suppressClick.current=false},100);
    }else{
      setShowHint(true);
      // React HashRouter can navigate without a full reload.
      window.location.hash='#/game';
      window.scrollTo({top:0,left:0,behavior:'instant'});
    }
  }
  function clickPet(e){e.preventDefault();if(suppressClick.current)return;}
  if(!visible)return h('button',{type:'button',className:'hw-pet-restore',onClick:()=>{setVisible(true);setShowHint(true)},title:'Show Bakehouse buddy','aria-label':'Show Bakehouse buddy'},'👻');
  const style=position?{left:position.left+'px',top:position.top+'px',right:'auto',bottom:'auto'}:undefined;
  return h('aside',{className:'hw-pet'+(drag.current?.moved?' hw-dragging':'')+(showHint?' hw-active':''),style,'aria-label':'Draggable Bakehouse ghost companion'},
    h('div',{className:'hw-bubble',role:'status'},h('p',null,hint)),
    h('button',{type:'button',className:'hw-ghost-button',onPointerDown:moveStart,onPointerMove:moveDrag,onPointerUp:moveEnd,onPointerCancel:()=>{drag.current=null},onClick:clickPet,'aria-label':'Play Bakehouse Merge to unlock coupons; drag this ghost to move it'},
      h('svg',{className:'hw-ghost',viewBox:'0 0 180 185','aria-hidden':'true',xmlns:'http://www.w3.org/2000/svg'},
        h('g',{className:'hw-ghost-body'},
          h('path',{d:'M34 143 V81 C34 47 58 24 90 24 S146 47 146 81 V143 Q133 131 119 146 Q105 160 90 143 Q75 126 61 146 Q47 159 34 143Z',fill:'#fff9ed',stroke:'#cdb9a4',strokeWidth:'3'}),
          h('ellipse',{cx:70,cy:93,rx:6,ry:8,fill:'#2a365a'}),h('ellipse',{cx:110,cy:93,rx:6,ry:8,fill:'#2a365a'}),
          h('ellipse',{cx:56,cy:111,rx:9,ry:5,fill:'#f1b5ab',opacity:'.7'}),h('ellipse',{cx:124,cy:111,rx:9,ry:5,fill:'#f1b5ab',opacity:'.7'}),
          h('path',{className:'hw-mouth',d:'M80 113 Q90 125 100 113',fill:'none',stroke:'#2a365a',strokeWidth:'3.5',strokeLinecap:'round'})
        )),h('span',{className:'hw-sparkles','aria-hidden':'true'},'✦ ✨')),
    h('span',{className:'hw-pet-name'},'DRAG ME · TAP FOR COUPONS'),
    h('button',{type:'button',className:'hw-pet-close',onClick:()=>setVisible(false),title:'Hide Bakehouse buddy','aria-label':'Hide Bakehouse buddy'},'×'));
 }

 return {HalloweenHome,HalloweenPet};
}
