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
 function HalloweenPet(){return null;}
 return {HalloweenHome,HalloweenPet};
}
