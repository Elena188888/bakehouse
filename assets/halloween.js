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
  const [message,setMessage]=React.useState('Hi! I’m your little Bakehouse buddy. Tap me for a treat!');
  const [active,setActive]=React.useState(false);
  const [treats,setTreats]=React.useState(0);
  function greet(){
   setTreats(n=>n+1);
   setActive(true);
   setMessage(treats%3===0?'A little treat makes any day sweeter!':treats%3===1?'Freshly baked happiness, coming right up!':'Thanks for saying hello! Have a sweet day!');
  }
  if(!visible)return h('button',{type:'button',className:'hw-pet-restore',onClick:()=>setVisible(true),title:'Show Bakehouse buddy','aria-label':'Show Bakehouse buddy'},'👻');
  return h('aside',{className:'hw-pet'+(active?' hw-active hw-happy':''),'aria-label':'Bakehouse ghost companion'},
   h('div',{className:'hw-bubble',role:'status'},h('p',null,message)),
   h('button',{type:'button',className:'hw-ghost-button',onClick:greet,'aria-label':'Say hello to the Bakehouse ghost'},
    h('svg',{className:'hw-ghost',viewBox:'0 0 180 185','aria-hidden':'true',xmlns:'http://www.w3.org/2000/svg'},
      h('g',{className:'hw-ghost-body'},
        h('path',{d:'M34 143 V81 C34 47 58 24 90 24 S146 47 146 81 V143 Q133 131 119 146 Q105 160 90 143 Q75 126 61 146 Q47 159 34 143Z',fill:'#fff9ed',stroke:'#cdb9a4',strokeWidth:'3'}),
        h('ellipse',{cx:70,cy:93,rx:6,ry:8,fill:'#2a365a'}),h('ellipse',{cx:110,cy:93,rx:6,ry:8,fill:'#2a365a'}),
        h('ellipse',{cx:56,cy:111,rx:9,ry:5,fill:'#f1b5ab',opacity:'.7'}),h('ellipse',{cx:124,cy:111,rx:9,ry:5,fill:'#f1b5ab',opacity:'.7'}),
        h('path',{className:'hw-mouth',d:'M80 113 Q90 125 100 113',fill:'none',stroke:'#2a365a',strokeWidth:'3.5',strokeLinecap:'round'})
      )),
    h('span',{className:'hw-sparkles','aria-hidden':'true'},'✦ ✨')),
   h('span',{className:'hw-pet-name'},'BAKEHOUSE BUDDY'),
   h('button',{type:'button',className:'hw-pet-close',onClick:()=>setVisible(false),title:'Hide Bakehouse buddy','aria-label':'Hide Bakehouse buddy'},'×'));
 }

 return {HalloweenHome,HalloweenPet};
}
