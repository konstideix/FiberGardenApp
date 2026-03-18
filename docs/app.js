const DAILY_GOAL = 30;
const GRID_SIZE = 5;
const TILE_SIZE = 44;
const TILE_GAP = 6;
const FLOOR_SIZE = TILE_SIZE * GRID_SIZE + TILE_GAP * (GRID_SIZE - 1);
const FLOOR_BOTTOM_OFFSET = 34;

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
  gardenFloor: document.getElementById("garden-floor"),
  gardenObjects: document.getElementById("garden-objects")
};

bindEvents();
render();

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
      <p class="gate-help">Shop und Tiere sind aktiv. Du kannst Objekte auswählen, im 3D Raum verschieben und mit Platzieren fixieren.</p>
    `
    : `
      <h4 class="gate-title">Erreiche 30 g Ballaststoffe, um zu pflanzen.</h4>
      <p class="gate-help">Noch ${gramsLeft.toFixed(1)} g bis freigeschaltet.</p>
    `;

  renderEditControls(unlocked);
  renderFoods();
  renderShop(unlocked);
  renderAnimals(unlocked);
  renderGardenRoom();
  renderPlacedItems();
}

function renderEditControls(unlocked) {
  els.editGardenBtn.textContent = editMode ? "Fertig" : "Bearbeiten";
  els.editToolbar.classList.toggle("hidden", !editMode);
  els.placeItemBtn.disabled = !draftPlacement?.position;

  if (!editMode) {
    return;
  }

  if (!unlocked) {
    els.editStatus.textContent = "Erreiche zuerst 30 g Ballaststoffe, damit du im Garten bearbeiten kannst.";
    return;
  }

  if (draftPlacement?.source === "new") {
    els.editStatus.textContent = `${draftPlacement.name} ausgewählt. Klicke auf ein futuristisches Feld und dann auf „Platzieren“.`;
    return;
  }

  if (draftPlacement?.source === "existing") {
    els.editStatus.textContent = `${draftPlacement.name} wird verschoben. Wähle ein neues Feld und bestätige mit „Platzieren“.`;
    return;
  }

  els.editStatus.textContent = "Wähle im Shop ein Objekt oder tippe ein vorhandenes Objekt im Raum an, um es zu verschieben.";
}

function renderFoods() {
  const filteredFoods = foods.filter((food) => {
    if (!searchTerm) return true;
    return food.name.toLowerCase().includes(searchTerm);
  });

  els.foodSearchMeta.textContent = filteredFoods.length === foods.length
    ? `${foods.length} Lebensmittel`
    : `${filteredFoods.length} von ${foods.length} Lebensmitteln`;

  if (!filteredFoods.length) {
    els.foodsList.innerHTML = `
      <article class="card empty-card">
        <h4>Keine Treffer</h4>
        <p class="muted">Versuche einen anderen Suchbegriff.</p>
      </article>
    `;
    return;
  }

  els.foodsList.innerHTML = filteredFoods
    .map((food) => {
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
    })
    .join("");

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
  els.shopList.innerHTML = shopItems
    .map((item) => {
      const disabled = !unlocked || state.totalSeeds < item.seedCost;
      const activeDraft = draftPlacement?.source === "new" && draftPlacement.name === item.name;
      return `
        <article class="shop-item">
          <div class="shop-top">
            <div>
              <p class="shop-title">${item.symbol} ${item.name}</p>
              <p class="shop-subline">Kosten: ${item.seedCost} Seeds${activeDraft ? " · ausgewählt" : ""}</p>
            </div>
            <button class="btn btn-primary" data-shop-id="${item.id}" ${disabled ? "disabled" : ""}>${activeDraft ? "Ausgewählt" : "Auswählen"}</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.shopList.querySelectorAll("[data-shop-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = shopItems.find((entry) => entry.id === button.dataset.shopId);
      if (!item || state.totalSeeds < item.seedCost || state.dailyFiber < DAILY_GOAL) return;

      state.totalSeeds -= item.seedCost;
      editMode = true;
      selectedPlacedItemId = null;
      draftPlacement = {
        id: crypto.randomUUID(),
        type: "decoration",
        name: item.name,
        symbolName: item.symbol,
        datePlaced: new Date().toISOString(),
        position: { x: 2, y: 2 },
        source: "new"
      };

      persist();
      render();
    });
  });
}

function renderAnimals(unlocked) {
  els.animalsList.innerHTML = animalItems
    .map((item) => {
      const disabled = !unlocked || state.totalEggs < item.eggCost;
      const activeDraft = draftPlacement?.source === "new" && draftPlacement.name === item.name;
      return `
        <article class="shop-item">
          <div class="shop-top">
            <div>
              <p class="shop-title">${item.symbol} ${item.name}</p>
              <p class="shop-subline">Kosten: ${item.eggCost} Eier${activeDraft ? " · ausgewählt" : ""}</p>
            </div>
            <button class="btn btn-primary" data-animal-id="${item.id}" ${disabled ? "disabled" : ""}>${activeDraft ? "Ausgewählt" : "Auswählen"}</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.animalsList.querySelectorAll("[data-animal-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = animalItems.find((entry) => entry.id === button.dataset.animalId);
      if (!item || state.totalEggs < item.eggCost || state.dailyFiber < DAILY_GOAL) return;

      state.totalEggs -= item.eggCost;
      editMode = true;
      selectedPlacedItemId = null;
      draftPlacement = {
        id: crypto.randomUUID(),
        type: "animal",
        name: item.name,
        symbolName: item.symbol,
        datePlaced: new Date().toISOString(),
        position: { x: 2, y: 2 },
        source: "new"
      };

      persist();
      render();
    });
  });
}

function renderGardenRoom() {
  els.gardenFloor.classList.toggle("edit-mode", editMode);

  const occupiedMap = new Map();
  state.placedItems.forEach((item) => {
    occupiedMap.set(`${item.position.x},${item.position.y}`, item.id);
  });

  const tiles = [];
  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const key = `${x},${y}`;
      const occupiedId = occupiedMap.get(key);
      const active = draftPlacement?.position?.x === x && draftPlacement?.position?.y === y;
      tiles.push(`
        <button
          class="floor-tile ${editMode ? "editable" : ""} ${occupiedId ? "occupied" : ""} ${active ? "active" : ""}"
          type="button"
          data-x="${x}"
          data-y="${y}"
          ${editMode ? "" : "disabled"}
          aria-label="Feld ${x + 1}, ${y + 1}"
        ></button>
      `);
    }
  }

  els.gardenFloor.innerHTML = `<div class="floor-grid">${tiles.join("")}</div>`;

  els.gardenFloor.querySelectorAll(".floor-tile.editable").forEach((tile) => {
    tile.addEventListener("click", () => {
      if (!editMode || !draftPlacement) return;

      const x = Number(tile.dataset.x);
      const y = Number(tile.dataset.y);
      if (!canPlaceAt(x, y, draftPlacement.source === "existing" ? draftPlacement.id : null)) {
        return;
      }

      draftPlacement.position = { x, y };
      render();
    });
  });

  const itemsToRender = [...state.placedItems];
  if (draftPlacement) {
    itemsToRender.push({ ...draftPlacement, draft: true });
  }

  els.gardenObjects.innerHTML = itemsToRender.map((item) => {
    const { left, bottom } = gridToScreenPosition(item.position.x, item.position.y);
    const selected = draftPlacement?.id === item.id || selectedPlacedItemId === item.id;
    return `
      <button
        type="button"
        class="garden-object ${editMode ? "editable" : ""} ${selected ? "selected" : ""} ${item.draft ? "draft" : ""}"
        style="left:${left}px; bottom:${bottom}px; transform: translateX(-50%);"
        data-item-id="${item.id}"
        aria-label="${item.name}"
      >
        <span class="garden-object-token">${item.symbolName}</span>
        <span class="garden-object-label">${item.name}</span>
      </button>
    `;
  }).join("");

  els.gardenObjects.querySelectorAll(".garden-object.editable").forEach((button) => {
    button.addEventListener("click", () => {
      if (!editMode) return;

      const itemId = button.dataset.itemId;
      const existing = state.placedItems.find((entry) => entry.id === itemId);
      if (!existing) return;

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

function renderPlacedItems() {
  if (!state.placedItems.length) {
    els.placedList.innerHTML = `
      <article class="card empty-card">
        <h4>Dein Garten ist leer</h4>
        <p class="muted">Öffne den Bearbeiten-Modus, wähle ein Shop-Objekt und platziere es auf dem Rasenraum 🌱</p>
      </article>
    `;
    return;
  }

  els.placedList.innerHTML = state.placedItems
    .map((item) => {
      const typeLabel = item.type === "animal" ? "Tier" : "Dekoration";
      const datePlaced = new Date(item.datePlaced).toLocaleDateString("de-DE", { dateStyle: "medium" });
      return `
        <article class="placed-item">
          <div class="placed-top">
            <div>
              <p class="placed-title">${item.symbolName} ${item.name}</p>
              <p class="placed-subline">${typeLabel} · Feld ${item.position.x + 1}/${item.position.y + 1}</p>
            </div>
            <p class="placed-subline">${datePlaced}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function calculateFiberForGrams(fiberPer100Grams, grams) {
  return (fiberPer100Grams * grams) / 100;
}

function canPlaceAt(x, y, ignoreItemId = null) {
  return !state.placedItems.some((item) => item.id !== ignoreItemId && item.position.x === x && item.position.y === y);
}

function commitPlacement() {
  if (!draftPlacement?.position) return;

  if (draftPlacement.source === "existing") {
    state.placedItems = state.placedItems.map((item) => item.id === draftPlacement.id
      ? { ...item, position: { ...draftPlacement.position } }
      : item);
  } else {
    state.placedItems.push({
      id: draftPlacement.id,
      type: draftPlacement.type,
      name: draftPlacement.name,
      symbolName: draftPlacement.symbolName,
      datePlaced: draftPlacement.datePlaced,
      position: { ...draftPlacement.position }
    });
  }

  draftPlacement = null;
  selectedPlacedItemId = null;
  persist();
  successHaptic();
  render();
}

function normalizePlacedItem(item, index) {
  const fallback = defaultGridPosition(index);
  return {
    ...item,
    id: item.id ?? crypto.randomUUID(),
    position: item.position && Number.isFinite(item.position.x) && Number.isFinite(item.position.y)
      ? item.position
      : fallback
  };
}

function defaultGridPosition(index) {
  return {
    x: index % GRID_SIZE,
    y: Math.floor(index / GRID_SIZE) % GRID_SIZE
  };
}

function gridToScreenPosition(x, y) {
  const step = TILE_SIZE + TILE_GAP;
  const left = ((420 - FLOOR_SIZE) / 2) + (x * step) + TILE_SIZE / 2;
  const bottom = FLOOR_BOTTOM_OFFSET + (y * 8) + ((GRID_SIZE - y - 1) * 4);
  return { left, bottom };
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

  if (state.streakCount % 7 === 0) {
    state.totalEggs += 1;
  }
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

  if (dayDiff > 1) {
    state.streakCount = 0;
  }
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

function lightHaptic() {
  if (navigator.vibrate) navigator.vibrate(10);
}

function successHaptic() {
  if (navigator.vibrate) navigator.vibrate([12, 18, 12]);
}
