from pathlib import Path
import json
root = Path(__file__).resolve().parents[1]
s = (root/'assets/index-BBo85Nx_.js').read_text(encoding='utf-8')
product = dict(id='halloween-egg-tart', name='Halloween Egg Tarts', category='Pastries', price=43, description='A Halloween twist on our sourdough egg tarts: silky pumpkin custard, dark chocolate bats and tiny meringue ghosts in a golden flaky crust. A seasonal treat for sharing.', image='/bakehouse/images/products/halloween-egg-tarts.jpg', featured=True, badge='Halloween Limited', ingredients=['Sourdough croissant crust','Eggs','Pumpkin','Cream','Butter','Dark chocolate','Meringue'])
def replace(old,new):
    global s
    assert s.count(old)==1 or old=='children:["Explore Our Menu",a.jsx(Bt', (old,s.count(old))
    s=s.replace(old,new,1)
replace('St=[','St=['+json.dumps(product)+',')
old='n({type:"ADD",productId:d,quantity:g})'
replace(old,old+';const treat=Kl(d);if(treat&&g>0&&["Bread","Pastries","Cookies"].includes(treat.category))window.dispatchEvent(new CustomEvent("bakehouse:cart-treat",{detail:{id:treat.id,name:treat.name,image:treat.image}}))')
# Keep the original all-season hero and navigation. The seasonal feature is
# inserted below it, so the homepage still leads with the full bakery range.
anchor='a.jsx("section",{className:"section-padding py-12 lg:py-16 bg-white",children:'
replace(anchor,'a.jsx(HalloweenHome,{}),'+anchor)
replace('a.jsx(Gm,{}),a.jsx(Ym,{})','a.jsx(Gm,{}),a.jsx(Ym,{}),a.jsx(HalloweenPet,{})')
anchor='Ns.createRoot(document.getElementById("root"))'
replace(anchor,'const {HalloweenHome,HalloweenPet}=createHalloweenUI({React:x,jsx:a,Link:I,useCart:Cn,useToast:wr,products:St});'+anchor)
for image_name in ('hero-egg-tarts.jpg', 'hero-chef-store.jpg', 'hero-store-interior.jpg'):
    image_path = '/bakehouse/images/home/' + image_name
    replace(image_path, image_path + '?v=20261027c')
s='import {createHalloweenUI} from "./halloween.js?v=20261027b";\n'+s
(root/'assets/index-halloween.js').write_text(s, encoding='utf-8')
p=root/'index.html'
s=p.read_text(encoding='utf-8').replace('index-BBo85Nx_.js','index-halloween.js')
s=s.replace('index-halloween.js?v=20261027c','index-halloween.js').replace('index-halloween.js?v=20261027b','index-halloween.js').replace('index-halloween.js?v=20261027','index-halloween.js').replace('index-halloween.js','index-halloween.js?v=20261027c')
s=s.replace('halloween.css?v=20261027','halloween.css').replace('halloween.css','halloween.css?v=20261027')
if '/bakehouse/assets/halloween.css' not in s:
    s=s.replace('  </head>','    <link rel="stylesheet" href="/bakehouse/assets/halloween.css">\n  </head>')
if '/bakehouse/assets/typography.css' not in s:
    s=s.replace('  </head>','    <link rel="stylesheet" href="/bakehouse/assets/typography.css">\n  </head>')
p.write_text(s, encoding='utf-8')
