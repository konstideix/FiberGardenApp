const DAILY_GOAL = 30;

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

checkDateRollover();
validateStreakAcrossMissedDays();

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
  seedChip: document.getElementById("seed-chip")
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
    persist();
    render();
  });

  els.foodSearchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderFoods();
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
      <p class="gate-help">Shop und Tiere sind aktiv. Du kannst Seeds aus dem Silo ausgeben.</p>
    `
    : `
      <h4 class="gate-title">Erreiche 30 g Ballaststoffe, um zu pflanzen.</h4>
      <p class="gate-help">Noch ${gramsLeft.toFixed(1)} g bis freigeschaltet.</p>
    `;

  renderFoods();
  renderShop(unlocked);
  renderAnimals(unlocked);
  renderPlacedItems();
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
      return `
        <article class="shop-item">
          <div class="shop-top">
            <div>
              <p class="shop-title">${item.symbol} ${item.name}</p>
              <p class="shop-subline">Kosten: ${item.seedCost} Seeds</p>
            </div>
            <button class="btn btn-primary" data-shop-id="${item.id}" ${disabled ? "disabled" : ""}>Kaufen</button>
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
      state.placedItems.push({
        id: crypto.randomUUID(),
        type: "decoration",
        name: item.name,
        symbolName: item.symbol,
        datePlaced: new Date().toISOString()
      });

      successHaptic();
      persist();
      render();
    });
  });
}

function renderAnimals(unlocked) {
  els.animalsList.innerHTML = animalItems
    .map((item) => {
      const disabled = !unlocked || state.totalEggs < item.eggCost;
      return `
        <article class="shop-item">
          <div class="shop-top">
            <div>
              <p class="shop-title">${item.symbol} ${item.name}</p>
              <p class="shop-subline">Kosten: ${item.eggCost} Eier</p>
            </div>
            <button class="btn btn-primary" data-animal-id="${item.id}" ${disabled ? "disabled" : ""}>Ausbrüten</button>
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
      state.placedItems.push({
        id: crypto.randomUUID(),
        type: "animal",
        name: item.name,
        symbolName: item.symbol,
        datePlaced: new Date().toISOString()
      });

      successHaptic();
      persist();
      render();
    });
  });
}

function renderPlacedItems() {
  if (!state.placedItems.length) {
    els.placedList.innerHTML = `
      <article class="card empty-card">
        <h4>Dein Garten ist leer</h4>
        <p class="muted">Pflanze etwas im Shop, sobald du heute 30 g erreicht hast 🌱</p>
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
              <p class="placed-subline">${typeLabel}</p>
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
