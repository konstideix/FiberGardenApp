const DAILY_GOAL = 30;

const foods = [
  { id: crypto.randomUUID(), name: "Haferflocken", portionLabel: "50 g", fiberGrams: 5.0, seedReward: 2 },
  { id: crypto.randomUUID(), name: "Apfel", portionLabel: "1 Stück", fiberGrams: 4.4, seedReward: 2 },
  { id: crypto.randomUUID(), name: "Linsen", portionLabel: "150 g gekocht", fiberGrams: 11.0, seedReward: 6 },
  { id: crypto.randomUUID(), name: "Kichererbsen", portionLabel: "150 g gekocht", fiberGrams: 9.0, seedReward: 5 },
  { id: crypto.randomUUID(), name: "Vollkornbrot", portionLabel: "2 Scheiben", fiberGrams: 6.5, seedReward: 4 },
  { id: crypto.randomUUID(), name: "Chiasamen", portionLabel: "20 g", fiberGrams: 6.8, seedReward: 5 },
  { id: crypto.randomUUID(), name: "Brokkoli", portionLabel: "200 g", fiberGrams: 6.0, seedReward: 3 },
  { id: crypto.randomUUID(), name: "Himbeeren", portionLabel: "125 g", fiberGrams: 8.0, seedReward: 5 }
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
  clearGardenBtn: document.getElementById("clear-garden-btn")
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
}

function switchTab(tab) {
  const tracker = tab === "tracker";
  els.trackerTab.classList.toggle("active", tracker);
  els.gardenTab.classList.toggle("active", !tracker);
  els.tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  checkDateRollover();
  render();
}

function render() {
  const progress = Math.min(1, Math.max(0, state.dailyFiber / DAILY_GOAL));
  const streakCycle = state.streakCount % 7;
  const unlocked = state.dailyFiber >= DAILY_GOAL;

  els.dailyFiberDisplay.textContent = `${state.dailyFiber.toFixed(1)} g / ${DAILY_GOAL} g`;
  els.dailyProgressBar.style.width = `${progress * 100}%`;
  els.streakDays.textContent = `${state.streakCount} Tage`;
  els.streakProgressBar.style.width = `${(streakCycle / 7) * 100}%`;
  els.eggDisplay.textContent = `Eier: ${state.totalEggs} · Zyklus: ${streakCycle}/7`;
  els.seedDisplay.textContent = `Samen gesamt: ${state.totalSeeds}`;
  els.seedPill.textContent = `🌱 Samen: ${state.totalSeeds}`;
  els.eggPill.textContent = `🥚 Eier: ${state.totalEggs}`;

  els.gateCard.innerHTML = unlocked
    ? `<h3>Garten freigeschaltet für heute ✅</h3><p class="muted">Du kannst jetzt kaufen und platzieren.</p>`
    : `<h3>Erreiche 30g Ballaststoffe, um zu pflanzen.</h3><p class="muted">Noch ${(DAILY_GOAL - state.dailyFiber).toFixed(1)} g bis zum Freischalten.</p>`;

  renderFoods();
  renderShop(unlocked);
  renderAnimals(unlocked);
  renderPlacedItems();
}

function renderFoods() {
  els.foodsList.innerHTML = foods.map((food) => `
    <article class="food-row">
      <div class="row between">
        <strong>${food.name}</strong>
        <span class="food-meta">+Seeds: ${food.seedReward}</span>
      </div>
      <p class="food-meta">${food.portionLabel} · Fiber: ${food.fiberGrams.toFixed(1)} g</p>
      <button class="btn btn-primary" data-food-id="${food.id}">+ Portion</button>
    </article>
  `).join("");

  els.foodsList.querySelectorAll("[data-food-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const food = foods.find((f) => f.id === btn.dataset.foodId);
      if (!food) return;

      state.dailyFiber += food.fiberGrams;
      state.totalSeeds += food.seedReward;
      state.dailyFoodsLog[food.name] = (state.dailyFoodsLog[food.name] || 0) + 1;
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
    return `
      <article class="shop-row row between">
        <div>
          <strong>${item.symbol} ${item.name}</strong>
          <p class="food-meta">Kosten: ${item.seedCost} Seeds</p>
        </div>
        <button class="btn btn-primary" data-shop-id="${item.id}" ${disabled ? "disabled" : ""}>Kaufen & Platzieren</button>
      </article>
    `;
  }).join("");

  els.shopList.querySelectorAll("[data-shop-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = shopItems.find((s) => s.id === btn.dataset.shopId);
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
  els.animalsList.innerHTML = animalItems.map((item) => {
    const disabled = !unlocked || state.totalEggs < item.eggCost;
    return `
      <article class="shop-row row between">
        <div>
          <strong>${item.symbol} ${item.name}</strong>
          <p class="food-meta">Kosten: ${item.eggCost} Eier</p>
        </div>
        <button class="btn btn-primary" data-animal-id="${item.id}" ${disabled ? "disabled" : ""}>Ausbrüten & Platzieren</button>
      </article>
    `;
  }).join("");

  els.animalsList.querySelectorAll("[data-animal-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = animalItems.find((a) => a.id === btn.dataset.animalId);
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
    els.placedList.innerHTML = `<div class="card"><p class="muted">Noch nichts platziert. Kaufe im Shop und starte deinen Garten 🌱</p></div>`;
    return;
  }

  els.placedList.innerHTML = state.placedItems.map((item) => {
    const date = new Date(item.datePlaced).toLocaleDateString("de-DE", { dateStyle: "medium" });
    const typeLabel = item.type === "animal" ? "Tier" : "Dekoration";
    return `
      <article class="placed-row row between">
        <div>
          <strong>${item.symbolName} ${item.name}</strong>
          <p class="food-meta">${typeLabel}</p>
        </div>
        <span class="food-meta">${date}</span>
      </article>
    `;
  }).join("");
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
  const diff = Math.floor((today - lastGoal) / 86400000);

  if (diff > 1) {
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
  try {
    const raw = localStorage.getItem("fiberGardenState");
    if (!raw) return structuredClone(defaultState);
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
