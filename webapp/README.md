# Fiber Garden – Web MVP

## Starten (Windows-freundlich)
- Datei `index.html` direkt im Browser öffnen **oder**
- lokal mit kleinem Server starten, z. B.:
  - `python -m http.server 8080` und dann `http://localhost:8080/webapp/` öffnen

## Wo ergänze ich Foods / Shop / Tiere?
In `app.js` oben die Arrays erweitern:
- `foods`
- `shopItems`
- `animalItems`

## Persistenz & Daily Rollover
- Persistenz läuft über `localStorage` unter dem Key `fiberGardenState`.
- Gespeichert werden: `totalSeeds`, `totalEggs`, `placedItems`, `dailyFiber`, `dailyFoodsLog`, `lastDateString`, `streakCount`, `lastGoalDateString`.
- `checkDateRollover()` wird beim Laden und beim Tab-Wechsel aufgerufen:
  - wenn `today !== lastDateString`, dann `dailyFiber = 0`, `dailyFoodsLog = {}`, `lastDateString = today`
  - Seeds/Eggs/Garten bleiben erhalten

## Streak & 7 Tage = 1 Ei
- Ziel: `dailyFiber >= 30`
- `processGoalReachedIfNeeded()` vergibt Streak-Fortschritt nur 1x pro Tag
  - wenn letzter Goal-Tag gestern war: `streakCount += 1`
  - sonst `streakCount = 1`
  - bei `streakCount % 7 === 0`: `totalEggs += 1`
- `validateStreakAcrossMissedDays()` bricht die Streak, wenn zwischen letztem Goal und heute ein Tag ohne Ziel liegt.
