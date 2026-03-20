const DAILY_GOAL = 30;
const GRID_COLS = 6;
const GRID_ROWS = 4;
const SCENE_CENTER_X = 180;
const ISLAND_CENTER_Y = 222;
const GRID_STEP_X = 32;
const GRID_STEP_Y = 19;
const SHOP_ITEM_KIND = {
  "Kirschbaum": "plant",
  "Blumenbeet": "plant",
  "Steinpfad": "decoration"
};

const foods = [
  { id: crypto.randomUUID(), name: "Buchweizen", portionLabel: "pro 100 g", fiberGrams: 3.7 },
  { id: crypto.randomUUID(), name: "Naturreis (Vollkornreis)", portionLabel: "pro 100 g", fiberGrams: 4.0 },
  { id: crypto.randomUUID(), name: "Mais, Korn", portionLabel: "pro 100 g", fiberGrams: 7.7 },
  { id: crypto.randomUUID(), name: "Hafer", portionLabel: "pro 100 g", fiberGrams: 9.3 },
  { id: crypto.randomUUID(), name: "Weizen", portionLabel: "pro 100 g", fiberGrams: 9.6 },
  { id: crypto.randomUUID(), name: "Dinkel", portionLabel: "pro 100 g", fiberGrams: 9.9 },
  { id: crypto.randomUUID(), name: "Roggen", portionLabel: "pro 100 g", fiberGrams: 13.4 },
  { id: crypto.randomUUID(), name: "Weizenmehl", portionLabel: "pro 100 g", fiberGrams: 4.0 },
  { id: crypto.randomUUID(), name: "Weizenschrot", portionLabel: "pro 100 g", fiberGrams: 9.2 },
  { id: crypto.randomUUID(), name: "Weizenvollkornmehl", portionLabel: "pro 100 g", fiberGrams: 10.0 },
  { id: crypto.randomUUID(), name: "Roggenmehl", portionLabel: "pro 100 g", fiberGrams: 7.0 },
  { id: crypto.randomUUID(), name: "Roggenschrot", portionLabel: "pro 100 g", fiberGrams: 12.0 },
  { id: crypto.randomUUID(), name: "Roggenvollkornmehl", portionLabel: "pro 100 g", fiberGrams: 13.5 },
  { id: crypto.randomUUID(), name: "Cornflakes", portionLabel: "pro 100 g", fiberGrams: 4.0 },
  { id: crypto.randomUUID(), name: "Weizengrieß", portionLabel: "pro 100 g", fiberGrams: 7.1 },
  { id: crypto.randomUUID(), name: "Haferflocken", portionLabel: "pro 100 g", fiberGrams: 9.5 },
  { id: crypto.randomUUID(), name: "Haferkleie", portionLabel: "pro 100 g", fiberGrams: 18.6 },
  { id: crypto.randomUUID(), name: "Weizenkleie", portionLabel: "pro 100 g", fiberGrams: 49.3 },
  { id: crypto.randomUUID(), name: "Reis, parboiled, gekocht", portionLabel: "pro 100 g", fiberGrams: 0.6 },
  { id: crypto.randomUUID(), name: "Nudeln, gekocht", portionLabel: "pro 100 g", fiberGrams: 1.5 },
  { id: crypto.randomUUID(), name: "Vollkornnudeln, gekocht", portionLabel: "pro 100 g", fiberGrams: 4.4 },
  { id: crypto.randomUUID(), name: "Butterkeks", portionLabel: "pro 100 g", fiberGrams: 1.4 },
  { id: crypto.randomUUID(), name: "Butterkuchen", portionLabel: "pro 100 g", fiberGrams: 1.6 },
  { id: crypto.randomUUID(), name: "Weizenbrötchen/Semmel", portionLabel: "pro 100 g", fiberGrams: 3.4 },
  { id: crypto.randomUUID(), name: "Toastbrot", portionLabel: "pro 100 g", fiberGrams: 3.8 },
  { id: crypto.randomUUID(), name: "Weizenmischbrot", portionLabel: "pro 100 g", fiberGrams: 4.8 },
  { id: crypto.randomUUID(), name: "Pflaumenkuchen", portionLabel: "pro 100 g", fiberGrams: 4.9 },
  { id: crypto.randomUUID(), name: "Zwiebelkuchen", portionLabel: "pro 100 g", fiberGrams: 4.9 },
  { id: crypto.randomUUID(), name: "Zwieback", portionLabel: "pro 100 g", fiberGrams: 5.2 },
  { id: crypto.randomUUID(), name: "Roggenmischbrot", portionLabel: "pro 100 g", fiberGrams: 6.0 },
  { id: crypto.randomUUID(), name: "Weizenvollkornbrot", portionLabel: "pro 100 g", fiberGrams: 6.9 },
  { id: crypto.randomUUID(), name: "Roggenknäckebrot", portionLabel: "pro 100 g", fiberGrams: 14.1 },
  { id: crypto.randomUUID(), name: "Rettich", portionLabel: "pro 100 g", fiberGrams: 1.2 },
  { id: crypto.randomUUID(), name: "Spargel", portionLabel: "pro 100 g", fiberGrams: 1.4 },
  { id: crypto.randomUUID(), name: "Kohlrabi", portionLabel: "pro 100 g", fiberGrams: 1.5 },
  { id: crypto.randomUUID(), name: "Blattsalat", portionLabel: "pro 100 g", fiberGrams: 1.6 },
  { id: crypto.randomUUID(), name: "Chinakohl", portionLabel: "pro 100 g", fiberGrams: 1.7 },
  { id: crypto.randomUUID(), name: "Blattspinat", portionLabel: "pro 100 g", fiberGrams: 1.8 },
  { id: crypto.randomUUID(), name: "Champignons", portionLabel: "pro 100 g", fiberGrams: 1.9 },
  { id: crypto.randomUUID(), name: "Kartoffeln", portionLabel: "pro 100 g", fiberGrams: 1.9 },
  { id: crypto.randomUUID(), name: "Paprika, grün", portionLabel: "pro 100 g", fiberGrams: 2.0 },
  { id: crypto.randomUUID(), name: "Rotkohl", portionLabel: "pro 100 g", fiberGrams: 2.5 },
  { id: crypto.randomUUID(), name: "Wirsing", portionLabel: "pro 100 g", fiberGrams: 2.8 },
  { id: crypto.randomUUID(), name: "Blumenkohl", portionLabel: "pro 100 g", fiberGrams: 2.9 },
  { id: crypto.randomUUID(), name: "Möhren", portionLabel: "pro 100 g", fiberGrams: 2.9 },
  { id: crypto.randomUUID(), name: "Weißkohl", portionLabel: "pro 100 g", fiberGrams: 3.0 },
  { id: crypto.randomUUID(), name: "Rosenkohl", portionLabel: "pro 100 g", fiberGrams: 4.4 },
  { id: crypto.randomUUID(), name: "Linsen", portionLabel: "pro 100 g", fiberGrams: 2.8 },
  { id: crypto.randomUUID(), name: "Grüne Erbsen", portionLabel: "pro 100 g", fiberGrams: 5.0 },
  { id: crypto.randomUUID(), name: "Weiße Bohnen", portionLabel: "pro 100 g", fiberGrams: 7.5 },
  { id: crypto.randomUUID(), name: "Walnüsse", portionLabel: "pro 100 g", fiberGrams: 4.6 },
  { id: crypto.randomUUID(), name: "Erdnüsse", portionLabel: "pro 100 g", fiberGrams: 7.1 },
  { id: crypto.randomUUID(), name: "Haselnüsse", portionLabel: "pro 100 g", fiberGrams: 7.4 },
  { id: crypto.randomUUID(), name: "Mandeln", portionLabel: "pro 100 g", fiberGrams: 9.8 },
  { id: crypto.randomUUID(), name: "Ananas", portionLabel: "pro 100 g", fiberGrams: 1.4 },
  { id: crypto.randomUUID(), name: "Weintrauben", portionLabel: "pro 100 g", fiberGrams: 1.6 },
  { id: crypto.randomUUID(), name: "Pflaumen/Zwetschken", portionLabel: "pro 100 g", fiberGrams: 1.7 },
  { id: crypto.randomUUID(), name: "Kirschen", portionLabel: "pro 100 g", fiberGrams: 1.9 },
  { id: crypto.randomUUID(), name: "Bananen", portionLabel: "pro 100 g", fiberGrams: 2.0 },
  { id: crypto.randomUUID(), name: "Erdbeeren", portionLabel: "pro 100 g", fiberGrams: 2.0 },
  { id: crypto.randomUUID(), name: "Orangen", portionLabel: "pro 100 g", fiberGrams: 2.2 },
  { id: crypto.randomUUID(), name: "Äpfel", portionLabel: "pro 100 g", fiberGrams: 2.3 },
  { id: crypto.randomUUID(), name: "Birnen", portionLabel: "pro 100 g", fiberGrams: 2.8 },
  { id: crypto.randomUUID(), name: "Johannisbeeren/Ribisel", portionLabel: "pro 100 g", fiberGrams: 3.5 },
  { id: crypto.randomUUID(), name: "Sultaninen", portionLabel: "pro 100 g", fiberGrams: 5.4 },
  { id: crypto.randomUUID(), name: "Aprikosen/Marillen", portionLabel: "pro 100 g", fiberGrams: 8.0 },
  { id: crypto.randomUUID(), name: "Dörrpflaumen", portionLabel: "pro 100 g", fiberGrams: 9.0 },
  { id: crypto.randomUUID(), name: "Datteln", portionLabel: "pro 100 g", fiberGrams: 9.2 },
  { id: crypto.randomUUID(), name: "Feigen", portionLabel: "pro 100 g", fiberGrams: 9.6 }
];

const shopItems = [
  { id: crypto.randomUUID(), name: "Kirschbaum", seedCost: 50, symbol: "🌳" },
  { id: crypto.randomUUID(), name: "Blumenbeet", seedCost: 20, symbol: "🌼" },
  { id: crypto.randomUUID(), name: "Steinpfad", seedCost: 35, symbol: "🧱" }
];

const animalItems = [
  { id: crypto.randomUUID(), name: "Ameise", eggCost: 1, symbol: "🐜" },
  { id: crypto.randomUUID(), name: "Katze", eggCost: 4, symbol: "🐱" }
];

const defaultState = {
  totalSeeds: 0,
  totalEggs: 0,
  placedItems: [],
  dailyFiber: 0,
  dailyFoodsLog: {},
  lastDateString: "",
  streakCount: 0,
  lastGoalDateString: null
};

const gardenRuntime = {
  camera: { x: 0, y: 0 },
  dragging: false,
  pointerStart: null,
  cameraStart: null,
  animalMotion: new Map(),
  loopId: null,
  lastFrame: 0
};

let state = loadState();
let searchTerm = "";
let editMode = false;
let draftPlacement = null;
let selectedPlacedItemId = null;

checkDateRollover();
validateStreakAcrossMissedDays();
state.placedItems = state.placedItems.map(normalizePlacedItem);
persist();

const els = {
  trackerTab: document.getElementById("tracker-tab"),
  gardenTab: document.getElementById("garden-tab"),
  tabButtons: [...document.querySelectorAll(".tab-button")],
  dailyFiberDisplay: document.getElementById("daily-fiber-display"),
  dailyProgressBar: document.getElementById("daily-progress-bar"),
  streakDays: document.getElementById("streak-days"),
  streakProgressBar: document.getElementById("streak-progress-bar"),
  eggDisplay: document.getElementById("egg-display"),
  seedDisplay: document.getElementById("seed-display"),
  seedPill: document.getElementById("seed-pill"),
  eggPill: document.getElementById("egg-pill"),
  gateCard: document.getElementById("gate-card"),
  foodsList: document.getElementById("foods-list"),
  shopList: document.getElementById("shop-list"),
  animalsList: document.getElementById("animals-list"),
  placedList: document.getElementById("placed-list"),
  resetDayBtn: document.getElementById("reset-day-btn"),
  clearGardenBtn: document.getElementById("clear-garden-btn"),
  foodSearchInput: document.getElementById("food-search"),
  foodSearchMeta: document.getElementById("food-search-meta"),
  seedChip: document.getElementById("seed-chip"),
  editGardenBtn: document.getElementById("edit-garden-btn"),
  editToolbar: document.getElementById("edit-toolbar"),
  editStatus: document.getElementById("edit-status"),
  placeItemBtn: document.getElementById("place-item-btn"),
  cancelEditBtn: document.getElementById("cancel-edit-btn"),
  gardenViewport: document.getElementById("garden-viewport"),
  gardenScene: document.getElementById("garden-scene"),
  gardenGrid: document.getElementById("garden-grid"),
  gardenObjects: document.getElementById("garden-objects")
};

bindEvents();
render();
startAnimalLoop();

function bindEvents() {
  els.tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  els.resetDayBtn.addEventListener("click", () => {
    state.dailyFiber = 0;
    state.dailyFoodsLog = {};
    persist();
    render();
  });

  els.clearGardenBtn.addEventListener("click", () => {
    state.placedItems = [];
    gardenRuntime.animalMotion.clear();
    draftPlacement = null;
    selectedPlacedItemId = null;
    persist();
    render();
  });

  els.foodSearchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderFoods();
  });

  els.editGardenBtn.addEventListener("click", () => {
    editMode = !editMode;
    if (!editMode) {
      draftPlacement = null;
      selectedPlacedItemId = null;
    }
    render();
  });

  els.cancelEditBtn.addEventListener("click", () => {
    draftPlacement = null;
    selectedPlacedItemId = null;
    editMode = false;
    render();
  });

  els.placeItemBtn.addEventListener("click", () => {
    commitPlacement();
  });

  bindCameraPan();
}

function bindCameraPan() {
  const startDrag = (clientX, clientY) => {
    gardenRuntime.dragging = true;
    gardenRuntime.pointerStart = { x: clientX, y: clientY };
    gardenRuntime.cameraStart = { ...gardenRuntime.camera };
    els.gardenViewport.classList.add("dragging");
  };

  const moveDrag = (clientX, clientY) => {
    if (!gardenRuntime.dragging) return;
    const dx = clientX - gardenRuntime.pointerStart.x;
    const dy = clientY - gardenRuntime.pointerStart.y;
    gardenRuntime.camera.x = clamp(gardenRuntime.cameraStart.x + dx * 0.45, -48, 48);
    gardenRuntime.camera.y = clamp(gardenRuntime.cameraStart.y + dy * 0.18, -20, 24);
    applyCamera();
  };

  const endDrag = () => {
    gardenRuntime.dragging = false;
    els.gardenViewport.classList.remove("dragging");
  };

  els.gardenViewport.addEventListener("pointerdown", (event) => {
    startDrag(event.clientX, event.clientY);
  });

  els.gardenViewport.addEventListener("pointermove", (event) => {
    moveDrag(event.clientX, event.clientY);
  });

  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
}

function switchTab(tab) {
  const isTracker = tab === "tracker";
  els.trackerTab.classList.toggle("active", isTracker);
  els.gardenTab.classList.toggle("active", !isTracker);
  els.tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  checkDateRollover();
  render();
}

function render() {
  const progress = Math.min(1, Math.max(0, state.dailyFiber / DAILY_GOAL));
  const streakCycle = state.streakCount % 7;
  const unlocked = state.dailyFiber >= DAILY_GOAL;
  const gramsLeft = Math.max(0, DAILY_GOAL - state.dailyFiber);

  els.dailyFiberDisplay.textContent = `${state.dailyFiber.toFixed(1)} g / ${DAILY_GOAL} g`;
  els.dailyProgressBar.style.width = `${progress * 100}%`;
  els.streakDays.textContent = `${state.streakCount} Tage`;
  els.streakProgressBar.style.width = `${(streakCycle / 7) * 100}%`;
  els.eggDisplay.textContent = `Eier: ${state.totalEggs} · Zyklus: ${streakCycle}/7`;
  els.seedDisplay.textContent = `Seeds im Silo: ${state.totalSeeds}`;
  els.seedPill.textContent = `🌱 Silo: ${state.totalSeeds}`;
  els.seedChip.textContent = `${state.totalSeeds} Seeds`;
  els.eggPill.textContent = `🥚 Eier: ${state.totalEggs}`;

  els.gateCard.className = `card ${unlocked ? "gate-open" : "gate-lock"}`;
  els.gateCard.innerHTML = unlocked
    ? `
      <h4 class="gate-title">Garten freigeschaltet für heute ✅</h4>
      <p class="gate-help">Dein Diorama ist offen: kaufe Belohnungen, ziehe die Kamera mit dem Finger und platziere neue Objekte im Bearbeiten-Modus.</p>
    `
    : `
      <h4 class="gate-title">Erreiche 30 g Ballaststoffe, um zu pflanzen.</h4>
      <p class="gate-help">Noch ${gramsLeft.toFixed(1)} g bis freigeschaltet.</p>
    `;

  syncAnimalRuntime();
  applyCamera();
  renderEditControls(unlocked);
  renderFoods();
  renderShop(unlocked);
  renderAnimals(unlocked);
  renderGardenScene();
  renderPlacedItems();
}

function renderEditControls(unlocked) {
  els.editGardenBtn.textContent = editMode ? "Fertig" : "Bearbeiten";
  els.editToolbar.classList.toggle("hidden", !editMode);
  els.placeItemBtn.disabled = !draftPlacement?.position || (draftPlacement?.type !== "animal" && !isPlacementValid(draftPlacement.position, draftPlacement.source === "existing" ? draftPlacement.id : null));

  if (!editMode) return;

  if (!unlocked) {
    els.editStatus.textContent = "Erreiche zuerst 30 g Ballaststoffe, damit du den Garten bearbeiten kannst.";
    return;
  }

  if (draftPlacement?.source === "new") {
    els.editStatus.textContent = `${draftPlacement.name} ausgewählt. Ziehe den Garten, tippe auf einen Platz und bestätige dann mit „Platzieren“.`;
    return;
  }

  if (draftPlacement?.source === "existing") {
    els.editStatus.textContent = `${draftPlacement.name} ist im Verschieben-Modus. Tippe auf eine neue Position und fixiere sie.`;
    return;
  }

  els.editStatus.textContent = "Tippe ein vorhandenes Objekt an oder wähle etwas im Shop aus, um es in deinem Gartenraum zu platzieren.";
}

function renderFoods() {
  const filteredFoods = foods.filter((food) => (!searchTerm ? true : food.name.toLowerCase().includes(searchTerm)));
  els.foodSearchMeta.textContent = filteredFoods.length === foods.length ? `${foods.length} Lebensmittel` : `${filteredFoods.length} von ${foods.length} Lebensmitteln`;

  if (!filteredFoods.length) {
    els.foodsList.innerHTML = `<article class="card empty-card"><h4>Keine Treffer</h4><p class="muted">Versuche einen anderen Suchbegriff.</p></article>`;
    return;
  }

  els.foodsList.innerHTML = filteredFoods.map((food) => {
    const defaultGrams = 100;
    const estimatedFiber = calculateFiberForGrams(food.fiberGrams, defaultGrams);
    const seedReward = Math.floor(estimatedFiber);
    return `
      <article class="food-item" aria-label="${food.name}">
        <div class="food-top food-top-input">
          <div class="food-copy">
            <p class="food-title">${food.name}</p>
            <p class="food-subline">${food.portionLabel} · ${food.fiberGrams.toFixed(1)} g Ballaststoffe · ca. +${seedReward} Seeds bei 100 g</p>
          </div>
          <form class="food-form" data-food-id="${food.id}">
            <label class="sr-only" for="grams-${food.id}">${food.name} Gramm</label>
            <div class="gram-field-wrap">
              <input id="grams-${food.id}" class="gram-input" type="number" min="1" step="1" inputmode="numeric" value="100" aria-label="${food.name} Gramm" />
              <span class="gram-suffix">g</span>
            </div>
            <button class="btn btn-primary" type="submit">Hinzufügen</button>
          </form>
        </div>
      </article>
    `;
  }).join("");

  els.foodsList.querySelectorAll(".food-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const food = foods.find((entry) => entry.id === form.dataset.foodId);
      if (!food) return;
      const input = form.querySelector(".gram-input");
      const grams = Number.parseInt(input.value, 10);
      if (!Number.isFinite(grams) || grams <= 0) {
        input.focus();
        return;
      }
      const addedFiber = calculateFiberForGrams(food.fiberGrams, grams);
      const seedReward = Math.floor(addedFiber);
      state.dailyFiber += addedFiber;
      state.totalSeeds += seedReward;
      state.dailyFoodsLog[food.name] = (state.dailyFoodsLog[food.name] || 0) + grams;
      processGoalReachedIfNeeded();
      lightHaptic();
      persist();
      render();
    });
  });
}

function renderShop(unlocked) {
  els.shopList.innerHTML = shopItems.map((item) => {
    const disabled = !unlocked || state.totalSeeds < item.seedCost;
    const activeDraft = draftPlacement?.source === "new" && draftPlacement.name === item.name;
    return `
      <article class="shop-item">
        <div class="shop-top">
          <div>
            <p class="shop-title">${item.symbol} ${item.name}</p>
            <p class="shop-subline">Kosten: ${item.seedCost} Seeds${activeDraft ? " · bereit zum Platzieren" : ""}</p>
          </div>
          <button class="btn btn-primary" data-shop-id="${item.id}" ${disabled ? "disabled" : ""}>${activeDraft ? "Ausgewählt" : "Wählen"}</button>
        </div>
      </article>
    `;
  }).join("");

  els.shopList.querySelectorAll("[data-shop-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = shopItems.find((entry) => entry.id === button.dataset.shopId);
      if (!item || state.totalSeeds < item.seedCost || state.dailyFiber < DAILY_GOAL) return;
      state.totalSeeds -= item.seedCost;
      editMode = true;
      selectedPlacedItemId = null;
      draftPlacement = createDraftFromStoreItem(item, "new");
      persist();
      render();
    });
  });
}

function renderAnimals(unlocked) {
  els.animalsList.innerHTML = animalItems.map((item) => {
    const disabled = !unlocked || state.totalEggs < item.eggCost;
    const activeDraft = draftPlacement?.source === "new" && draftPlacement.name === item.name;
    return `
      <article class="shop-item">
        <div class="shop-top">
          <div>
            <p class="shop-title">${item.symbol} ${item.name}</p>
            <p class="shop-subline">Kosten: ${item.eggCost} Eier${activeDraft ? " · Spawn bereit" : ""}</p>
          </div>
          <button class="btn btn-primary" data-animal-id="${item.id}" ${disabled ? "disabled" : ""}>${activeDraft ? "Ausgewählt" : "Wählen"}</button>
        </div>
      </article>
    `;
  }).join("");

  els.animalsList.querySelectorAll("[data-animal-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = animalItems.find((entry) => entry.id === button.dataset.animalId);
      if (!item || state.totalEggs < item.eggCost || state.dailyFiber < DAILY_GOAL) return;
      state.totalEggs -= item.eggCost;
      editMode = true;
      selectedPlacedItemId = null;
      draftPlacement = createDraftFromAnimalItem(item, "new");
      persist();
      render();
    });
  });
}

function renderGardenScene() {
  els.gardenGrid.classList.toggle("visible", editMode);
  renderGrid();
  renderSceneObjects();
}

function renderGrid() {
  const cells = [];
  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLS; col += 1) {
      const valid = !draftPlacement || draftPlacement.type === "animal" || isPlacementValid({ x: col, y: row }, draftPlacement?.source === "existing" ? draftPlacement.id : null);
      const occupied = state.placedItems.some((item) => item.type !== "animal" && item.position.x === col && item.position.y === row);
      const active = draftPlacement?.position?.x === col && draftPlacement?.position?.y === row;
      cells.push(`<button class="garden-grid-cell ${active ? "active" : ""} ${occupied ? "occupied" : ""} ${editMode && !valid ? "invalid" : ""}" data-col="${col}" data-row="${row}" type="button"></button>`);
    }
  }
  els.gardenGrid.innerHTML = cells.join("");

  if (!editMode) return;

  els.gardenGrid.querySelectorAll(".garden-grid-cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!draftPlacement) return;
      const col = Number(cell.dataset.col);
      const row = Number(cell.dataset.row);
      if (draftPlacement.type !== "animal" && !isPlacementValid({ x: col, y: row }, draftPlacement.source === "existing" ? draftPlacement.id : null)) return;
      draftPlacement.position = { x: col, y: row };
      render();
    });
  });
}

function renderSceneObjects() {
  const sceneItems = [];

  state.placedItems.forEach((item) => {
    if (item.type === "animal") {
      sceneItems.push(renderAnimal(item));
    } else {
      sceneItems.push(renderStaticObject(item));
    }
  });

  if (draftPlacement) {
    sceneItems.push(renderDraftObject(draftPlacement));
  }

  sceneItems.sort((a, b) => a.depth - b.depth);
  els.gardenObjects.innerHTML = sceneItems.map((entry) => entry.html).join("");

  els.gardenObjects.querySelectorAll(".garden-item[data-item-id]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!editMode) return;
      const itemId = button.dataset.itemId;
      const existing = state.placedItems.find((entry) => entry.id === itemId);
      if (!existing || existing.type === "animal") return;
      selectedPlacedItemId = existing.id;
      draftPlacement = {
        ...existing,
        position: { ...existing.position },
        source: "existing"
      };
      render();
    });
  });
}

function renderStaticObject(item) {
  const screen = gridToScreen(item.position.x, item.position.y);
  const width = item.kind === "plant" ? 58 : 54;
  const height = item.kind === "plant" ? 72 : 48;
  const rareClass = item.rarity === "rare" ? "rare" : "";
  const selected = draftPlacement?.id === item.id || selectedPlacedItemId === item.id ? "selected" : "";
  return {
    depth: item.position.y * 10 + 1,
    html: `
      <button class="garden-item ${item.kind} editable ${selected} ${rareClass}" data-item-id="${item.id}" style="left:${screen.x}px; bottom:${screen.y}px;">
        <span class="garden-item-shadow"></span>
        <span class="garden-item-body" style="width:${width}px; height:${height}px; transform: rotate(${item.rotation || 0}deg);">
          <span class="garden-item-sprite">${item.symbolName}</span>
        </span>
        <span class="garden-item-label">${item.name}</span>
      </button>
    `
  };
}

function renderAnimal(item) {
  const runtime = ensureAnimalRuntime(item);
  const screen = gridToScreenFloat(runtime.x, runtime.y);
  return {
    depth: runtime.y * 10 + 2,
    html: `
      <div class="garden-item animal" data-animal-id="${item.id}" style="left:${screen.x}px; bottom:${screen.y}px;">
        <span class="garden-item-shadow"></span>
        <span class="garden-item-body" style="width:54px; height:54px; transform: scaleX(${runtime.facing});">
          <span class="garden-item-sprite">${item.symbolName}</span>
        </span>
        <span class="garden-item-label">${item.name}</span>
      </div>
    `
  };
}

function renderDraftObject(item) {
  const valid = item.type === "animal" ? true : isPlacementValid(item.position, item.source === "existing" ? item.id : null);
  const screen = gridToScreen(item.position.x, item.position.y);
  return {
    depth: item.position.y * 10 + 3,
    html: `
      <div class="garden-item ${item.kind || item.type} preview ${valid ? "valid" : "invalid"}" style="left:${screen.x}px; bottom:${screen.y}px;">
        <span class="garden-item-shadow"></span>
        <span class="garden-item-body" style="width:${item.type === "animal" ? 54 : 58}px; height:${item.type === "animal" ? 54 : 72}px; transform: rotate(${item.rotation || 0}deg);">
          <span class="garden-item-sprite">${item.symbolName}</span>
        </span>
        <span class="garden-item-label">${item.name}</span>
      </div>
    `
  };
}

function renderPlacedItems() {
  if (!state.placedItems.length) {
    els.placedList.innerHTML = `<article class="card empty-card"><h4>Dein Garten ist leer</h4><p class="muted">Kaufe Pflanzen oder Tiere und erschaffe dir einen kleinen lebendigen Reward-Raum.</p></article>`;
    return;
  }

  els.placedList.innerHTML = state.placedItems.map((item) => {
    const typeLabel = item.type === "animal" ? "Tier" : item.kind === "plant" ? "Pflanze" : "Dekoration";
    const datePlaced = new Date(item.datePlaced).toLocaleDateString("de-DE", { dateStyle: "medium" });
    return `
      <article class="placed-item">
        <div class="placed-top">
          <div>
            <p class="placed-title">${item.symbolName} ${item.name}</p>
            <p class="placed-subline">${typeLabel} · Zone ${item.position.x + 1}/${item.position.y + 1}</p>
          </div>
          <p class="placed-subline">${datePlaced}</p>
        </div>
      </article>
    `;
  }).join("");
}

function createDraftFromStoreItem(item, source) {
  return {
    id: crypto.randomUUID(),
    type: "decoration",
    kind: SHOP_ITEM_KIND[item.name] || "decoration",
    name: item.name,
    symbolName: item.symbol,
    datePlaced: new Date().toISOString(),
    position: findFirstOpenGridCell(),
    rotation: randomBetween(-8, 8),
    rarity: item.name === "Kirschbaum" ? "rare" : "common",
    source
  };
}

function createDraftFromAnimalItem(item, source) {
  return {
    id: crypto.randomUUID(),
    type: "animal",
    kind: "animal",
    name: item.name,
    symbolName: item.symbol,
    datePlaced: new Date().toISOString(),
    position: findAnimalSpawnCell(),
    rotation: 0,
    rarity: item.name === "Katze" ? "rare" : "common",
    source
  };
}

function findFirstOpenGridCell() {
  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLS; col += 1) {
      if (isPlacementValid({ x: col, y: row })) return { x: col, y: row };
    }
  }
  return { x: 0, y: 0 };
}

function findAnimalSpawnCell() {
  return { x: 2, y: 1 };
}

function isPlacementValid(position, ignoreItemId = null) {
  return !state.placedItems.some((item) => item.id !== ignoreItemId && item.type !== "animal" && item.position.x === position.x && item.position.y === position.y);
}

function commitPlacement() {
  if (!draftPlacement?.position) return;
  if (draftPlacement.type !== "animal" && !isPlacementValid(draftPlacement.position, draftPlacement.source === "existing" ? draftPlacement.id : null)) return;

  if (draftPlacement.source === "existing") {
    state.placedItems = state.placedItems.map((item) => item.id === draftPlacement.id ? { ...item, position: { ...draftPlacement.position }, rotation: draftPlacement.rotation } : item);
  } else {
    const placed = {
      id: draftPlacement.id,
      type: draftPlacement.type,
      kind: draftPlacement.kind,
      name: draftPlacement.name,
      symbolName: draftPlacement.symbolName,
      datePlaced: draftPlacement.datePlaced,
      position: { ...draftPlacement.position },
      rotation: draftPlacement.rotation,
      rarity: draftPlacement.rarity
    };
    state.placedItems.push(placed);
  }

  draftPlacement = null;
  selectedPlacedItemId = null;
  persist();
  syncAnimalRuntime();
  successHaptic();
  render();
}

function syncAnimalRuntime() {
  const animalIds = new Set();
  state.placedItems.filter((item) => item.type === "animal").forEach((animal) => {
    animalIds.add(animal.id);
    ensureAnimalRuntime(animal);
  });
  [...gardenRuntime.animalMotion.keys()].forEach((id) => {
    if (!animalIds.has(id)) gardenRuntime.animalMotion.delete(id);
  });
}

function ensureAnimalRuntime(animal) {
  let runtime = gardenRuntime.animalMotion.get(animal.id);
  if (!runtime) {
    runtime = {
      x: animal.position.x + 0.5,
      y: animal.position.y + 0.5,
      targetX: animal.position.x + 0.5,
      targetY: animal.position.y + 0.5,
      wait: randomBetween(0.4, 1.6),
      speed: randomBetween(0.18, 0.36),
      facing: 1
    };
    gardenRuntime.animalMotion.set(animal.id, runtime);
  }
  return runtime;
}

function startAnimalLoop() {
  if (gardenRuntime.loopId) return;
  const frame = (timestamp) => {
    if (!gardenRuntime.lastFrame) gardenRuntime.lastFrame = timestamp;
    const delta = Math.min(0.032, (timestamp - gardenRuntime.lastFrame) / 1000);
    gardenRuntime.lastFrame = timestamp;
    stepAnimals(delta);
    updateAnimalDomPositions();
    gardenRuntime.loopId = requestAnimationFrame(frame);
  };
  gardenRuntime.loopId = requestAnimationFrame(frame);
}

function stepAnimals(delta) {
  state.placedItems.filter((item) => item.type === "animal").forEach((animal) => {
    const runtime = ensureAnimalRuntime(animal);
    runtime.wait -= delta;

    if (runtime.wait <= 0 && distance(runtime.x, runtime.y, runtime.targetX, runtime.targetY) < 0.05) {
      const target = chooseAnimalTarget(animal, runtime);
      runtime.targetX = target.x;
      runtime.targetY = target.y;
      runtime.wait = randomBetween(0.8, 2.2);
    }

    const angle = Math.atan2(runtime.targetY - runtime.y, runtime.targetX - runtime.x);
    const move = runtime.speed * delta;
    const remaining = distance(runtime.x, runtime.y, runtime.targetX, runtime.targetY);
    if (remaining > 0.02) {
      runtime.x += Math.cos(angle) * Math.min(move, remaining);
      runtime.y += Math.sin(angle) * Math.min(move, remaining);
      runtime.facing = runtime.targetX >= runtime.x ? 1 : -1;
    }
  });
}

function chooseAnimalTarget(animal, runtime) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const offsetX = randomBetween(-1.1, 1.1);
    const offsetY = randomBetween(-0.8, 0.8);
    const x = clamp(animal.position.x + 0.5 + offsetX, 0.4, GRID_COLS - 0.4);
    const y = clamp(animal.position.y + 0.5 + offsetY, 0.4, GRID_ROWS - 0.2);
    if (isAnimalTargetClear(animal.id, x, y)) return { x, y };
  }
  return { x: runtime.x, y: runtime.y };
}

function isAnimalTargetClear(animalId, x, y) {
  const plants = state.placedItems.filter((item) => item.type !== "animal");
  const nearPlant = plants.some((item) => distance(x, y, item.position.x + 0.5, item.position.y + 0.5) < 0.42);
  if (nearPlant) return false;

  return !state.placedItems.filter((item) => item.type === "animal" && item.id !== animalId).some((item) => {
    const runtime = gardenRuntime.animalMotion.get(item.id);
    if (!runtime) return false;
    return distance(x, y, runtime.x, runtime.y) < 0.48;
  });
}

function updateAnimalDomPositions() {
  els.gardenObjects.querySelectorAll("[data-animal-id]").forEach((node) => {
    const runtime = gardenRuntime.animalMotion.get(node.dataset.animalId);
    if (!runtime) return;
    const screen = gridToScreenFloat(runtime.x, runtime.y);
    node.style.left = `${screen.x}px`;
    node.style.bottom = `${screen.y}px`;
    const body = node.querySelector(".garden-item-body");
    if (body) body.style.transform = `scaleX(${runtime.facing})`;
  });
}

function normalizePlacedItem(item, index) {
  const fallback = {
    x: index % GRID_COLS,
    y: Math.floor(index / GRID_COLS) % GRID_ROWS
  };
  return {
    ...item,
    id: item.id ?? crypto.randomUUID(),
    kind: item.kind ?? (item.type === "animal" ? "animal" : SHOP_ITEM_KIND[item.name] || "decoration"),
    position: item.position && Number.isFinite(item.position.x) && Number.isFinite(item.position.y) ? item.position : fallback,
    rotation: Number.isFinite(item.rotation) ? item.rotation : randomBetween(-8, 8),
    rarity: item.rarity ?? (item.name === "Kirschbaum" || item.name === "Katze" ? "rare" : "common")
  };
}

function gridToScreen(col, row) {
  const x = SCENE_CENTER_X + (col - row) * GRID_STEP_X;
  const y = ISLAND_CENTER_Y + (col + row) * GRID_STEP_Y;
  return { x, y };
}

function gridToScreenFloat(x, y) {
  const screenX = SCENE_CENTER_X + (x - y) * GRID_STEP_X;
  const screenY = ISLAND_CENTER_Y + (x + y) * GRID_STEP_Y;
  return { x: screenX, y: screenY };
}

function applyCamera() {
  els.gardenScene.style.setProperty("--camera-x", `${gardenRuntime.camera.x}px`);
  els.gardenScene.style.setProperty("--camera-y", `${gardenRuntime.camera.y}px`);
}

function calculateFiberForGrams(fiberPer100Grams, grams) {
  return (fiberPer100Grams * grams) / 100;
}

function processGoalReachedIfNeeded(now = new Date()) {
  if (state.dailyFiber < DAILY_GOAL) return;
  const today = dateString(now);
  if (state.lastGoalDateString === today) return;
  if (state.lastGoalDateString && isYesterday(state.lastGoalDateString, now)) {
    state.streakCount += 1;
  } else {
    state.streakCount = 1;
  }
  state.lastGoalDateString = today;
  if (state.streakCount % 7 === 0) state.totalEggs += 1;
}

function checkDateRollover(now = new Date()) {
  const today = dateString(now);
  if (!state.lastDateString) {
    state.lastDateString = today;
    persist();
    return;
  }
  if (today !== state.lastDateString) {
    state.dailyFiber = 0;
    state.dailyFoodsLog = {};
    state.lastDateString = today;
    validateStreakAcrossMissedDays(now);
    persist();
  }
}

function validateStreakAcrossMissedDays(referenceDate = new Date()) {
  if (!state.lastGoalDateString) return;
  const lastGoal = parseDate(state.lastGoalDateString);
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  const dayDiff = Math.floor((today - lastGoal) / 86400000);
  if (dayDiff > 1) state.streakCount = 0;
}

function isYesterday(lastGoalDateString, now = new Date()) {
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  return dateString(yesterday) === lastGoalDateString;
}

function dateString(date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(yyyyMMdd) {
  const [y, m, d] = yyyyMMdd.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function loadState() {
  const raw = localStorage.getItem("fiberGardenState");
  if (!raw) return structuredClone(defaultState);
  try {
    return { ...structuredClone(defaultState), ...JSON.parse(raw) };
  } catch {
    return structuredClone(defaultState);
  }
}

function persist() {
  localStorage.setItem("fiberGardenState", JSON.stringify(state));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function lightHaptic() {
  if (navigator.vibrate) navigator.vibrate(10);
}

function successHaptic() {
  if (navigator.vibrate) navigator.vibrate([12, 18, 12]);
}
