from pathlib import Path
import json
root = Path(__file__).resolve().parents[1]
s = (root/'assets/index-BBo85Nx_.js').read_text()
product = dict(id='halloween-egg-tart', name='Halloween Egg Tarts', category='Pastries', price=43, description='A Halloween twist on our sourdough egg tarts: silky pumpkin custard, dark chocolate bats and tiny meringue ghosts in a golden flaky crust. A seasonal treat for sharing.', image='/bakehouse/images/products/halloween-egg-tarts.jpg', featured=True, badge='Halloween Limited', ingredients=['Sourdough croissant crust','Eggs','Pumpkin','Cream','Butter','Dark chocolate','Meringue'])
def replace(old,new):
    global s
    assert s.count(old)==1 or old=='children:["Explore Our Menu",a.jsx(Bt', (old,s.count(old))
    s=s.replace(old,new,1)
replace('St=[','St=['+json.dumps(product)+',')
old='n({type:"ADD",productId:d,quantity:g})'
replace(old,old+';const treat=Kl(d);if(treat&&g>0&&["Bread","Pastries","Cookies"].includes(treat.category))window.dispatchEvent(new CustomEvent("bakehouse:cart-treat",{detail:{id:treat.id,name:treat.name,image:treat.image}}))')
replace('const In=[{src:"/bakehouse/images/home/hero-egg-tarts.jpg",alt:"Signature sourdough egg tarts"}', 'const In=[{src:"/bakehouse/images/products/halloween-egg-tarts.jpg",alt:"Halloween pumpkin egg tarts with chocolate bats and meringue ghosts"}')
for old,new in [('Freshly Baked Daily in Hong Kong','HALLOWEEN AT BAKEHOUSE · LIMITED EDITION'),('children:"Good Things"','children:"A Little Boo."'),('children:"Bring People"','children:"A Lot of"'),('children:"Together."','children:"Butter."'),('Fresh sourdough, buttery croissants, sparkling drinks, and handy extras. Every day starts with flour, butter, and a little bit of love.','Our Halloween egg tarts have arrived. Pumpkin custard, chocolate bats, and tiny meringue ghosts — a sweet little spell, baked to share.'),('children:["Explore Our Menu",a.jsx(Bt','children:["Discover Halloween Treats",a.jsx(Bt')]:
    replace(old,new)
replace('to:"/menu",variant:"primary",className:"bg-white','to:"/menu/halloween-egg-tart",variant:"primary",className:"bg-white')
anchor='a.jsx("section",{className:"section-padding py-12 lg:py-16 bg-white",children:'
replace(anchor,'a.jsx(HalloweenHome,{}),'+anchor)
replace('a.jsx(Gm,{}),a.jsx(Ym,{})','a.jsx(Gm,{}),a.jsx(Ym,{}),a.jsx(HalloweenPet,{})')
anchor='Ns.createRoot(document.getElementById("root"))'
replace(anchor,'const {HalloweenHome,HalloweenPet}=createHalloweenUI({React:x,jsx:a,Link:I,useCart:Cn,useToast:wr,products:St});'+anchor)
s='import {createHalloweenUI} from "./halloween.js";\n'+s
(root/'assets/index-halloween.js').write_text(s)
p=root/'index.html'
s=p.read_text().replace('index-BBo85Nx_.js','index-halloween.js')
if '/bakehouse/assets/halloween.css' not in s:
    s=s.replace('  </head>','    <link rel="stylesheet" href="/bakehouse/assets/halloween.css">\n  </head>')
if '/bakehouse/assets/typography.css' not in s:
    s=s.replace('  </head>','    <link rel="stylesheet" href="/bakehouse/assets/typography.css">\n  </head>')
p.write_text(s)
