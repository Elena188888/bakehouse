// Seasonal UI kept readable alongside the existing production build.
export function createHalloweenUI({ React: R, jsx: a, Link, useCart, useToast, products }) {
  const product = products.find(item => item.id === 'halloween-egg-tart');
  const h = R.createElement;
  function HalloweenHome() {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    return h('section', { className: 'hw-feature', 'aria-labelledby': 'hw-title' },
      h('div', { className: 'hw-feature-inner' },
        h('div', { className: 'hw-photo' }, h('img', { src: product.image, alt: 'Golden pumpkin custard egg tarts with chocolate bats and tiny meringue ghosts', loading: 'lazy', width: 1536, height: 1024 }), h('span', { className: 'hw-photo-stamp' }, 'A LITTLE BOO. A LOT OF BUTTER.')),
        h('div', { className: 'hw-copy' },
          h('p', { className: 'hw-eyebrow' }, '✦ THE HALLOWEEN EDIT · LIMITED EDITION'),
          h('h2', { id: 'hw-title' }, 'Something sweet.', h('br'), h('em', null, 'Something spooky.')),
          h('p', null, 'Meet our Halloween Egg Tarts: silky pumpkin custard, a golden sourdough crust, and the sweetest little ghosts. A little mischief, fresh from the oven.'),
          h('p', { className: 'hw-product-note' }, 'Pumpkin custard · Chocolate bats · Meringue ghosts'),
          h('div', { className: 'hw-actions' }, h('button', { type: 'button', className: 'hw-primary', onClick: () => { addToCart(product.id, 1); showToast(`${product.name} added to cart!`); } }, `Treat yourself · $${product.price.toFixed(2)} +`), h(Link, { to: '/menu/halloween-egg-tart', className: 'hw-link' }, 'Meet the tarts ↗')),
          h('p', { className: 'hw-caption' }, 'Add a treat to your cart. Our little ghost gets a taste, too.'))));
  }
  function HalloweenPet() {
    const [hidden, setHidden] = R.useState(false);
    const [current, setCurrent] = R.useState(null);
    const [phase, setPhase] = R.useState('idle');
    const [message, setMessage] = R.useState('Pick a pastry and tap Add to Cart. I’ll have a tiny taste!');
    const [active, setActive] = R.useState(true);
    const [position, setPosition] = R.useState(null);
    const [dragging, setDragging] = R.useState(false);
    const pet = R.useRef(null);
    const drag = R.useRef(null);
    const suppressClick = R.useRef(false);
    const queue = R.useRef([]);
    const busy = R.useRef(false);
    const timers = R.useRef([]);
    const clampPosition = (left, top) => {
      const width = pet.current?.offsetWidth || 172;
      const height = pet.current?.offsetHeight || 280;
      const bubbleOverhang = window.innerWidth <= 700 ? 60 : 34;
      return {
        left: Math.max(8 + bubbleOverhang, Math.min(left, window.innerWidth - width - 8)),
        top: Math.max(8, Math.min(top, window.innerHeight - height - 8))
      };
    };
    R.useEffect(() => {
      const resize = () => setPosition(previous => previous ? clampPosition(previous.left, previous.top) : null);
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }, []);
    const startDrag = event => {
      if (!event.isPrimary || event.button !== 0) return;
      const rect = pet.current.getBoundingClientRect();
      drag.current = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, moved: false };
      suppressClick.current = false;
      event.currentTarget.setPointerCapture(event.pointerId);
    };
    const moveDrag = event => {
      const currentDrag = drag.current;
      if (!currentDrag) return;
      const dx = event.clientX - currentDrag.x;
      const dy = event.clientY - currentDrag.y;
      if (!currentDrag.moved && Math.hypot(dx, dy) < 6) return;
      currentDrag.moved = true;
      setDragging(true);
      setPosition(clampPosition(currentDrag.left + dx, currentDrag.top + dy));
    };
    const endDrag = event => {
      if (!drag.current) return;
      suppressClick.current = drag.current.moved ? Date.now() + 500 : 0;
      drag.current = null;
      setDragging(false);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    };
    const moveWithKeyboard = event => {
      const directions = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] };
      if (!directions[event.key]) return;
      event.preventDefault();
      const rect = pet.current.getBoundingClientRect();
      const [dx, dy] = directions[event.key];
      setPosition(clampPosition(rect.left + dx, rect.top + dy));
    };
    R.useEffect(() => {
      let mounted = true;
      const later = (fn, delay) => { timers.current.push(setTimeout(() => { if (mounted) fn(); }, delay)); };
      const next = () => {
        const item = queue.current.shift();
        if (!item) { busy.current = false; setPhase('idle'); setCurrent(null); return; }
        busy.current = true; setCurrent(item); setActive(true); setPhase('catch');
        setMessage(`Ooh, ${item.name}! A little nibble?`);
        later(() => { setPhase('eat'); setMessage(`Nom nom… ${item.name}!`); }, 650);
        later(() => { setPhase('happy'); setMessage('Boo-licious! Your treats are safe in your cart.'); }, 2500);
        later(next, 4100);
      };
      const onTreat = event => {
        if (!event.detail || !event.detail.name) return;
        // Bound visual work during very rapid clicks; cart updates are never dropped.
        if (queue.current.length < 8) queue.current.push(event.detail);
        if (!busy.current) next();
      };
      window.addEventListener('bakehouse:cart-treat', onTreat);
      return () => { mounted = false; window.removeEventListener('bakehouse:cart-treat', onTreat); timers.current.forEach(clearTimeout); queue.current = []; busy.current = false; };
    }, []);
    if (hidden) return h('button', { className: 'hw-pet-restore', type: 'button', onClick: () => setHidden(false), 'aria-label': 'Show Boo the Halloween ghost' }, '👻');
    return h('aside', { ref: pet, style: position ? { left: position.left, top: position.top, right: 'auto', bottom: 'auto' } : undefined, className: `hw-pet hw-${phase}${active ? ' hw-active' : ''}${dragging ? ' hw-dragging' : ''}`, 'aria-label': 'Boo, your Halloween bakery companion' },
      h('div', { className: 'hw-bubble' },
        h('p', { role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' }, message),
        h(Link, { className: 'hw-pet-cta', to: '/menu', onClick: () => setMessage('Choose your favourite, then tap Add to Cart. I’m ready!') }, 'Find your next treat →')),
      h('button', { className: 'hw-pet-close', type: 'button', onClick: () => setHidden(true), 'aria-label': 'Minimize Halloween pet' }, '×'),
      h('button', { className: 'hw-ghost-button', type: 'button', 'aria-label': 'Say hello to Boo. Drag to move, or use arrow keys.', 'aria-describedby': 'hw-drag-hint', onPointerDown: startDrag, onPointerMove: moveDrag, onPointerUp: endDrag, onPointerCancel: endDrag, onLostPointerCapture: () => { if (drag.current?.moved) suppressClick.current = Date.now() + 500; drag.current = null; setDragging(false); }, onKeyDown: moveWithKeyboard, onClick: () => { if (suppressClick.current > Date.now()) return; setActive(true); if (!busy.current) setMessage(['Pick a pastry and tap Add to Cart. I’ll taste it with you!', 'A croissant, a cookie, or an egg tart? Add your favourite to your cart.', 'Want a sweet little treat? Explore the menu below.'][Math.floor(Math.random() * 3)]); } },
        h('svg', { className: 'hw-ghost', viewBox: '0 0 180 190', fill: 'none', 'aria-hidden': true },
          h('ellipse', { cx: 91, cy: 179, rx: 45, ry: 7, fill: '#402a51', opacity: '.12' }),
          h('g', { className: 'hw-ghost-body' },
            h('path', { d: 'M36 104C29 59 53 40 91 43c38 2 58 25 55 64l8 48c-11 13-21-9-31-3-12 16-23 16-34 2-12 17-22 13-30 0-10-6-21 14-30 3z', fill: '#fff8e9', stroke: '#e6d9c2', strokeWidth: 2 }),
            h('path', { d: 'M40 114Q14 92 21 119Q24 133 42 132M140 114q27-22 20 5-3 14-21 13', fill: '#fff8e9', stroke: '#e6d9c2', strokeWidth: 2 }),
            h('ellipse', { cx: 71, cy: 102, rx: 5, ry: 8, fill: '#382541' }), h('ellipse', { cx: 111, cy: 102, rx: 5, ry: 8, fill: '#382541' }),
            h('ellipse', { cx: 57, cy: 116, rx: 9, ry: 5, fill: '#f4b3a0' }), h('ellipse', { cx: 125, cy: 116, rx: 9, ry: 5, fill: '#f4b3a0' }),
            h('ellipse', { className: 'hw-mouth', cx: 91, cy: 120, rx: 7, ry: 5, fill: '#382541' }),
            h('path', { d: 'M51 64 78 10l20 25 17-3 15 42z', fill: '#432c57' }), h('path', { d: 'm60 48 59 10 5 13-70-11z', fill: '#d87e3f' }),
            h('path', { d: 'M39 63q48-8 104 16-40 13-104-2z', fill: '#35223f' }),
            h('path', { d: 'm96 48 7 2-2 9-7-2z', stroke: '#f6d88c', strokeWidth: 3 }))),
        current && h('span', { className: 'hw-snack', key: `${current.id}-${phase}`, 'aria-hidden': true }, h('img', { src: current.image, alt: '' })),
        h('span', { className: 'hw-sparkles', 'aria-hidden': true }, '✦  ·  ✧')),
      h('span', { className: 'hw-pet-name', id: 'hw-drag-hint' }, 'DRAG ME · BOO'));
  }
  return { HalloweenHome, HalloweenPet };
}
