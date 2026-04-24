// --- EXISTING CLASS RULES ---  
const classRules = {
  Warrior: { 
    fixedStat: "sur", 
    options: { 
      str: { archetypeName: "Berserker", display: "Strength (Two-hand)", secondary: "str" }, 
      dex: { archetypeName: "Master at Arms", display: "Dexterity (Dual-Wield)", secondary: "dex" } 
    }, 
    primaryIsFixed: true 
  },
  Mage: { 
    fixedStat: null, 
    options: { 
      logic: { archetypeName: "Spellslinger", display: "Logic", secondary: "dex" }, 
      piety: { archetypeName: "Witchdoctor", display: "Piety", secondary: "sur" } 
    }, 
    primaryIsFixed: false 
  },
  Paladin: { 
    fixedStat: "pie", 
    options: { 
      str: { archetypeName: "Templar", display: "Strength", secondary: "str" },
      sur: { archetypeName: "Bastion", display: "Survivability", secondary: "sur"} 
    }, 
    primaryIsFixed: true 
  },
  Ranger: { 
    fixedStat: "sur", 
    options: { 
      str: { archetypeName: "Beastmaster", display: "Beastmaster", secondary: "pre" }, 
      dex: { archetypeName: "Hunter", display: "Ranged", secondary: "dex" } 
    }, 
    primaryIsFixed: true 
  },
  Rogue: {
    fixedStat: "dex",
    options: {
      assassin: { archetypeName: "Assassin", display: "Assassin", secondary: "sur" },
      pickpocket: { archetypeName: "Pickpocket", display: "Pickpocket", secondary: "pre" }
    },
    primaryIsFixed: true
  },
  Cleric: {
    fixedStat: "pie",
    options: {
      prophet: { archetypeName: "Prophet", display: "Prophet", secondary: "int" }, // Intuition
      zealot: { archetypeName: "Zealot", display: "Zealot", secondary: "sur" }
    },
    primaryIsFixed: true
  }
};

// --- EXISTING RACE RULES ---

// 1. THE DATA BASELINE
const RACE_MODS = {
    "human": { str: 0, dex: 0, sur: 0, slot4: 0, int: 0, pre: 0 },
    "elf": { str: -2, dex: 2, sur: -1, slot4: 0, int: 1, pre: 0 },
    "dwarf": { str: 2, dex: -2, sur: 2, slot4: 0, int: 0, pre: -1 },
    "gnome": { str: -3, dex: 1, sur: 0, slot4: 0, int: 2, pre: 0 },
    "halfling": { str: -2, dex: 3, sur: 0, slot4: 0, int: -1, pre: 1 }
};

let baseStats = { str: 10, dex: 10, sur: 10, slot4: 10, int: 10, pre: 10 };
let points = 0;
let primary = "";
let secondary = "";
let buyCap;

// 3. STAT BUTTON LOGIC
function changeStat(s, d) {
	const race = localStorage.getItem('race')
	let buyCap;
	if (race === 'human') // Hard limit on point-spending
    {
	buyCap = 22;
    } else {
	buyCap = 20;
    }
    const floor = 3;  // Hard limit on down-tuning

    if (d > 0 && points > 0 && baseStats[s] < buyCap) { 
        baseStats[s]++; 
        points--; 
    }
    else if (d < 0 && baseStats[s] > floor) { 
        baseStats[s]--; 
        points++; 
    }
    update();
}
function finalizeAndContinue() {
    
	
    // Optional: Prevent proceeding if they still have points left
    if (points > 0) {
        const confirmSpend = confirm(`You still have ${points} points left! Are you sure you want to proceed?`);
        if (!confirmSpend) return;
    }

    // Save the final calculated stats (including race mods) so stats2.html can use them
    const race = localStorage.getItem('race') || "human";
    const mods = RACE_MODS[race];
    
    let finalStats = {};
    for (let s in baseStats) {
		let lookupKey = (s === "slot4" &&
	myCharacter.primaryStat)
		? myCharacter.primaryStat
		: s;
		finalStats[s] = baseStats[s] + (mods[lookupKey] || 0);

    }

    // Store the object as a string in localStorage
    localStorage.setItem('finalCalculatedStats', JSON.stringify(finalStats));

    // Move to the next page
    window.location.href = "stats2.html";
}

// 4. DISPLAY ENGINE (CALCULATES RACE & SPECIALIZATION AFTER BUY)
function update() {
    // A. Retrieve Selections from UI
    // Added optional chaining (?.) so it doesn't crash if an ID is missing
    const classVal = document.getElementById('class-select')?.value;
    const specVal = document.getElementById('spec-select')?.value;
    const race = localStorage.getItem('race') || "human";
    const mods = RACE_MODS[race];
    localStorage.setItem('remainingPoints', points);

    // B. Map Specializations to Primary Stats (Matches your Warrior/Mage logic)
    const specToStat = {
        "Berserker": "Strength",
        "Master of Arms": "Dexterity",
        "Fire Mage": "Intelligence",
        "Guardian": "Constitution",
        "Healer": "Wisdom"
    };

    // C. Setup Character Object for Slot4 Resolution
    // This defines what 'myCharacter' is so the loop doesn't hit 'null'
    const myCharacter = {
        class: classVal,
        specialization: specVal,
        primaryStat: specToStat[specVal] || "Strength" 
    };
    
    localStorage.setItem('myCharacter', JSON.stringify(myCharacter));

    // D. The Core Stat Loop
    for (let s in baseStats) {
        let lookupKey = s;
        // This is where the magic happens for Slot 4
        if (s === "slot4" && myCharacter.primaryStat) {
            lookupKey = myCharacter.primaryStat;
        }

        const m = mods[lookupKey] || 0;
        const finalValue = baseStats[s] + m;

        // Display Final Value
        const valEl = document.getElementById(`val-${s}`);
        if (valEl) {
            valEl.innerText = finalValue;
        }

        // Display Modifier Indicator
        const modEl = document.getElementById(`mod-${s}`);
        if (modEl) {
            if (m > 0) {
                modEl.innerText = `(+${m} Race)`;
                modEl.className = "race-mod-text pos";
            } else if (m < 0) {
                modEl.innerText = `(${m} Race)`;
                modEl.className = "race-mod-text neg";
            } else {
                modEl.innerText = "";
            }
        }
    } 

    // E. Update Point Counter
    const pointsEl = document.getElementById('points-display');
    if (pointsEl) {
        pointsEl.innerText = points;
    }
}

function init() {
    console.log("RPG One Engine Initialization");
    const classSelect = document.getElementById('class-select');
    const specSelect = document.getElementById('spec-select');
    const raceSelect = document.getElementById('race-select');

    if (classSelect) classSelect.addEventListener('change', update);
    if (specSelect) specSelect.addEventListener('change', update);
    if (raceSelect) raceSelect.addEventListener('change', update);
        const race = localStorage.getItem('race');
    const className = localStorage.getItem('class');
    const spec = localStorage.getItem('specialization');

    points = (race === "human") ? 30 : 25;

    document.getElementById(`ctrl-${primary}`).classList.add('primary-stat');
    document.getElementById(`ctrl-${secondary}`).classList.add('secondary-stat');

    document.getElementById('display-name').innerText = localStorage.getItem('charName');
    document.getElementById('display-class').innerText = className;
    document.getElementById('display-race').innerText = race;
    document.getElementById('display-size').innerText = localStorage.getItem('size');
// 1. Get the current rules for the selected class
const rules = classRules[className];

if (rules) {
    let primary = rules.fixedStat; 
    let secondary = "";
    if (rules.options && rules.options[spec]) {
        secondary = rules.options[spec].secondary;
    }
    if (primary) {
        const pEl = document.getElementById(`ctrl-${primary}`);
        if (pEl) pEl.classList.add('primary-stat');
    }
    if (secondary) {
        const sEl = document.getElementById(`ctrl-${secondary}`);
        if (sEl) sEl.classList.add('secondary-stat');
    }
}
  
    update(); 
}

window.onload = init;
