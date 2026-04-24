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

// 2. INITIALIZE PAGE
function init() {
    const race = localStorage.getItem('race') || "human";
    const className = localStorage.getItem('class') || "Warrior";
    const spec = localStorage.getItem('specialization');

    // BUDGET: 35 for Humans, 30 for others
    points = (race === "human") ? 30 : 25;

    // VISUAL HIGHLIGHTS
    document.getElementById(`ctrl-${primary}`).classList.add('primary-stat');
    document.getElementById(`ctrl-${secondary}`).classList.add('secondary-stat');

    // HEADER INFO
    document.getElementById('display-name').innerText = localStorage.getItem('charName') || "OPERATIVE";
    document.getElementById('display-class').innerText = className;
    document.getElementById('display-race').innerText = race;
    document.getElementById('display-size').innerText = localStorage.getItem('size') || "Medium";

    update();
}

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

// 4. DISPLAY ENGINE (CALCULATES RACE AFTER BUY)
function update() {
    const race = localStorage.getItem('race') || "human";
    const mods = RACE_MODS[race];

    for (let s in baseStats) {
        // Slot4 resolution to use
	     let lookupKey = s;
	     if (s === "slot4" &&
	     myCharacter.primaryStat) {
	          lookupKey =	
	     myCharacter.primaryStat;
					}

	const m = mods[lookupKey]

	// MATH: Points + Racial Modifier
        const finalValue = baseStats[s] + m;
        
        // Display Final Value (can go to 22 or drop to 0)
        const valE1=
	document.getElementById(`val-${s}`)
        if (valE1) { valE1.innerText =
	finalValue;
			}
        // Display Modifier Indicator
        const modEl = document.getElementById(`mod-${s}`);
        if (modE1) {
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
    const pointsE1 = document.getElementById('points-display');
	if (pointsE1) {
	pointsE1.innerText = points;
  }
    }
function init() {
	console.log("RPG One Engine Initialization");
	update();	
}

window.onload = init;
