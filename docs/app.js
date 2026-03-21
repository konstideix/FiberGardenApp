const catalog = {
  plants: [
    { id: 'olive', name: 'Olivenbaum', currency: 'seeds', cost: 45, type: 'plant', className: 'sprite-olive' },
    { id: 'bamboo', name: 'Bambus', currency: 'seeds', cost: 28, type: 'plant', className: 'sprite-bamboo' },
    { id: 'rose', name: 'Rose', currency: 'seeds', cost: 16, type: 'plant', className: 'sprite-rose' }
  ],
  animals: [
    { id: 'cat', name: 'Katze', currency: 'eggs', cost: 2, type: 'animal', className: 'sprite-cat', speed: 0.17 },
    { id: 'deer', name: 'Hirsch', currency: 'eggs', cost: 4, type: 'animal', className: 'sprite-deer', speed: 0.12 },
    { id: 'dog', name: 'Hund', currency: 'eggs', cost: 3, type: 'animal', className: 'sprite-dog', speed: 0.19 }
  ]
};

const defaultState = {
  seeds: 150,
  eggs: 8,
  editMode: false,
  placementSelection: null,
  selectedItemId: null,
  items: [
    createPlacedItem(catalog.plants[0], 66, 44),
    createPlacedItem(catalog.plants[2], 52, 63),
    createPlacedItem(catalog.plants[1], 76, 52),
    createPlacedItem(catalog.animals[0], 60, 71),
    createPlacedItem(catalog.animals[2], 79, 76)
  ]
};

let state = loadState();
let dragState = null;
let animationFrame = null;
let lastAnimationTime = performance.now();

const els = {
  seedCount: document.getElementById('seed-count'),
  eggCount: document.getElementById('egg-count'),
  plantsShop: document.getElementById('plants-shop'),
  animalsShop: document.getElementById('animals-shop'),
  gardenScene: document.getElementById('garden-scene'),
  statusBanner: document.getElementById('status-banner'),
  editToggle: document.getElementById('edit-toggle'),
  clearGarden: document.getElementById('clear-garden'),
  selectedMode: document.getElementById('selected-mode'),
  selectionDetails: document.getElementById('selection-details'),
  shopItemTemplate: document.getElementById('shop-item-template')
};

bindEvents();
render();
startAnimation();

function bindEvents() {
  els.editToggle.addEventListener('click', () => {
    state.editMode = !state.editMode;
    if (!state.editMode) state.selectedItemId = null;
    announce(state.editMode ? 'Edit-Modus aktiv: Elemente anklicken und verschieben.' : 'Edit-Modus deaktiviert.');
    persist();
    render();
  });

  els.clearGarden.addEventListener('click', () => {
    state.items = [];
    state.selectedItemId = null;
    announce('Der Garten wurde geleert.');
    persist();
    render();
  });

  els.gardenScene.addEventListener('click', (event) => {
    if (!state.placementSelection) return;
    if (event.target.closest('.placed-item')) return;

    const position = getRelativePosition(event);
    const item = getCatalogItem(state.placementSelection);
    if (!item) return;

    placeItem(item, position.x, position.y);
  });

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', stopDragging);
  window.addEventListener('pointercancel', stopDragging);
}

function render() {
  els.seedCount.textContent = state.seeds;
  els.eggCount.textContent = state.eggs;
  els.editToggle.textContent = `Edit: ${state.editMode ? 'An' : 'Aus'}`;
  els.selectedMode.textContent = state.editMode ? 'Edit aktiv' : 'Kein Objekt';

  renderShop('plants', els.plantsShop);
  renderShop('animals', els.animalsShop);
  renderGarden();
  renderInspector();
  updateBanner();
}

function renderShop(section, mount) {
  mount.innerHTML = '';
  for (const item of catalog[section]) {
    const node = els.shopItemTemplate.content.firstElementChild.cloneNode(true);
    const affordable = state[item.currency] >= item.cost;
    const active = state.placementSelection === item.id;

    node.querySelector('.shop-art').appendChild(createSprite(item, true));
    node.querySelector('.shop-name').textContent = item.name;
    node.querySelector('.shop-price').textContent = `Kosten: ${item.cost} ${item.currency === 'seeds' ? 'Seeds' : 'Eggs'}`;
    node.classList.toggle('active', active);
    node.disabled = !affordable;

    node.addEventListener('click', () => {
      if (!affordable) return;
      state.placementSelection = active ? null : item.id;
      state.selectedItemId = null;
      announce(state.placementSelection ? `${item.name} ausgewählt. Klicke in den Garten zum Platzieren.` : 'Auswahl aufgehoben.');
      persist();
      render();
    });

    mount.appendChild(node);
  }
}

function renderGarden() {
  els.gardenScene.querySelectorAll('.placed-item').forEach((node) => node.remove());

  const sorted = [...state.items].sort((a, b) => a.y - b.y);
  for (const item of sorted) {
    const node = document.createElement('button');
    node.type = 'button';
    node.className = 'placed-item';
    if (state.selectedItemId === item.id) node.classList.add('selected');
    if (state.editMode) node.classList.add('editing');
    node.style.left = `${item.x}%`;
    node.style.top = `${item.y}%`;
    node.style.zIndex = String(100 + Math.round(item.y));
    node.dataset.id = item.id;
    node.appendChild(createSprite(item, false));

    node.addEventListener('click', (event) => {
      event.stopPropagation();
      if (state.editMode) {
        state.selectedItemId = item.id;
        persist();
        renderInspector();
        renderGarden();
        return;
      }
      announce(`${item.name} steht im Garten.`);
    });

    node.addEventListener('pointerdown', (event) => {
      if (!state.editMode) return;
      dragState = { id: item.id, pointerId: event.pointerId };
      node.classList.add('dragging');
      node.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    });

    els.gardenScene.appendChild(node);
  }
}

function renderInspector() {
  const selected = state.items.find((item) => item.id === state.selectedItemId);
  if (!selected) {
    els.selectionDetails.className = 'selection-panel empty';
    els.selectionDetails.innerHTML = 'Noch nichts ausgewählt. Aktiviere <strong>Edit</strong> und klicke ein Element im Garten an.';
    return;
  }

  els.selectionDetails.className = 'selection-panel';
  els.selectionDetails.innerHTML = `
    <strong>${selected.name}</strong>
    <p>Typ: ${selected.type === 'animal' ? 'Tier' : 'Pflanze'}</p>
    <p>Position: ${Math.round(selected.x)}% / ${Math.round(selected.y)}%</p>
    <div class="inspector-actions">
      <button id="remove-selected" class="btn btn-danger" type="button">Entfernen</button>
    </div>
  `;

  document.getElementById('remove-selected').addEventListener('click', () => {
    refundItem(selected);
    state.items = state.items.filter((item) => item.id !== selected.id);
    state.selectedItemId = null;
    announce(`${selected.name} wurde entfernt. Kosten wurden erstattet.`);
    persist();
    render();
  });
}

function updateBanner() {
  if (state.placementSelection) {
    const item = getCatalogItem(state.placementSelection);
    els.statusBanner.textContent = `${item.name} ausgewählt — klicke in den Garten, um das Objekt zu platzieren.`;
    return;
  }

  if (state.editMode) {
    els.statusBanner.textContent = 'Edit aktiv — ziehe Elemente langsam an eine neue Position oder entferne sie im Auswahlfeld.';
    return;
  }

  els.statusBanner.textContent = 'Wähle im Shop ein Element aus, um es zu platzieren.';
}

function placeItem(item, x, y) {
  const currencyKey = item.currency;
  if (state[currencyKey] < item.cost) {
    announce(`Nicht genug ${currencyKey === 'seeds' ? 'Seeds' : 'Eggs'} für ${item.name}.`);
    return;
  }

  state[currencyKey] -= item.cost;
  state.items.push(createPlacedItem(item, x, y));
  state.placementSelection = null;
  announce(`${item.name} wurde im Garten platziert.`);
  persist();
  render();
}

function createPlacedItem(item, x, y) {
  return {
    id: crypto.randomUUID(),
    catalogId: item.id,
    name: item.name,
    type: item.type,
    className: item.className,
    currency: item.currency,
    cost: item.cost,
    speed: item.speed || 0,
    x,
    y,
    directionX: Math.random() > 0.5 ? 1 : -1,
    directionY: Math.random() > 0.5 ? 1 : -1,
    wobble: Math.random() * Math.PI * 2,
    nextDecision: performance.now() + 1200 + Math.random() * 2600
  };
}

function createSprite(item, compact) {
  const sprite = document.createElement('div');
  sprite.className = `sprite ${item.type} ${item.className}`;
  if (compact) sprite.style.scale = '0.9';

  if (item.type === 'animal') {
    const face = document.createElement('div');
    face.className = 'face';
    sprite.appendChild(face);
    if (item.catalogId === 'deer' || item.id === 'deer') {
      const antlers = document.createElement('div');
      antlers.className = 'antlers';
      sprite.appendChild(antlers);
    }
  }

  return sprite;
}

function onPointerMove(event) {
  if (!dragState) return;
  const item = state.items.find((entry) => entry.id === dragState.id);
  if (!item) return;

  const rect = els.gardenScene.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  item.x = clamp(x, 10, 94);
  item.y = clamp(y, 18, 94);
  state.selectedItemId = item.id;
  renderGarden();
  renderInspector();
}

function stopDragging() {
  if (!dragState) return;
  const node = els.gardenScene.querySelector(`[data-id="${dragState.id}"]`);
  node?.classList.remove('dragging');
  dragState = null;
  persist();
}

function startAnimation() {
  cancelAnimationFrame(animationFrame);
  const tick = (now) => {
    const dt = Math.min(40, now - lastAnimationTime);
    lastAnimationTime = now;
    animateAnimals(now, dt);
    animationFrame = requestAnimationFrame(tick);
  };
  animationFrame = requestAnimationFrame(tick);
}

function animateAnimals(now, dt) {
  let changed = false;
  for (const item of state.items) {
    if (item.type !== 'animal' || dragState?.id === item.id || state.selectedItemId === item.id && state.editMode) continue;

    if (now > item.nextDecision) {
      item.directionX = randomDirection();
      item.directionY = randomDirection();
      item.nextDecision = now + 1800 + Math.random() * 2800;
    }

    item.wobble += dt * 0.002;
    const driftX = item.directionX * item.speed * dt + Math.sin(item.wobble) * 0.012 * dt;
    const driftY = item.directionY * item.speed * dt + Math.cos(item.wobble * 0.8) * 0.01 * dt;

    item.x = clamp(item.x + driftX * 0.02, 12, 93);
    item.y = clamp(item.y + driftY * 0.02, 24, 92);

    if (item.x <= 12 || item.x >= 93) item.directionX *= -1;
    if (item.y <= 24 || item.y >= 92) item.directionY *= -1;
    changed = true;
  }

  if (!changed) return;
  for (const node of els.gardenScene.querySelectorAll('.placed-item')) {
    const item = state.items.find((entry) => entry.id === node.dataset.id);
    if (!item) continue;
    node.style.left = `${item.x}%`;
    node.style.top = `${item.y}%`;
    node.style.zIndex = String(100 + Math.round(item.y));
  }
}

function refundItem(item) {
  state[item.currency] += item.cost;
}

function getCatalogItem(id) {
  return [...catalog.plants, ...catalog.animals].find((item) => item.id === id) || null;
}

function getRelativePosition(event) {
  const rect = els.gardenScene.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  return {
    x: clamp(x, 10, 94),
    y: clamp(y, 18, 94)
  };
}

function randomDirection() {
  const directions = [-1, -0.5, 0.5, 1];
  return directions[Math.floor(Math.random() * directions.length)];
}

function announce(message) {
  els.statusBanner.textContent = message;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function loadState() {
  try {
    const raw = localStorage.getItem('fiberGardenSandboxState');
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      items: Array.isArray(parsed.items) ? parsed.items : structuredClone(defaultState.items)
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function persist() {
  localStorage.setItem('fiberGardenSandboxState', JSON.stringify(state));
}
