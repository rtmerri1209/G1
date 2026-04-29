const characterData = JSON.parse(localStorage.getItem('myCharacter'));

if (characterData) {
  console.log("Character Loaded:", characterData.name);
} else {
  console.error("No character data found! Redirecting...");
  window.location.href = 'char.html';
  throw new Error("Execution stopped: No character data.");
}

const charName = characterData.name;
const charRace = characterData.race;
const charClass = characterData.class;
const charSpec = characterData.spec;
const charLvl = characterData.lvl;
const charSize = characterData.size;

// --- EXISTING CLASS RULES ---  
const classRules = {
  Warrior: { 
    fixedStat: "sur", 
    options: { 
      berserker: { specName: "Berserker", display: "Strength (Two-hand)", secondary: "str" }, 
      maa: { specName: "Master at Arms", display: "Dexterity (Dual-Wield)", secondary: "dex" } 
    }, 
    primaryIsFixed: true 
  },
  Mage: { 
    fixedStat: null, 
    options: { 
      spellslinger: { specName: "Spellslinger", display: "Logic", secondary: "dex" }, 
      witchdoctor: { specName: "Witchdoctor", display: "Piety", secondary: "sur" } 
    }, 
    primaryIsFixed: false 
  },
  Paladin: { 
    fixedStat: "pie", 
    options: { 
      templar: { specName: "Templar", display: "Strength", secondary: "str" },
      bastion: { specName: "Bastion", display: "Survivability", secondary: "sur"} 
    }, 
    primaryIsFixed: true 
  },
  Ranger: { 
    fixedStat: "sur", 
    options: { 
      beastmaster: { specName: "Beastmaster", display: "Beastmaster", secondary: "pre" }, 
      hunter: { specName: "Hunter", display: "Hunter", secondary: "dex" } 
    }, 
    primaryIsFixed: true 
  },
  Rogue: {
    fixedStat: "dex",
    options: {
      assassin: { specName: "Assassin", display: "Assassin", secondary: "sur" },
      pickpocket: { specName: "Pickpocket", display: "Pickpocket", secondary: "pre" }
    },
    primaryIsFixed: true
  },
  Cleric: {
    fixedStat: "pie",
    options: {
      prophet: { specName: "Prophet", display: "Prophet", secondary: "itn" }, // Intuition
      zealot: { specName: "Zealot", display: "Zealot", secondary: "sur" }
    },
    primaryIsFixed: true
  }
};

// 1. THE DATA BASELINE
const RACE_MODS = {
    "human": { str: 0, dex: 0, sur: 0, slot4: 0, itn: 0, pre: 0 },
    "elf": { str: -2, dex: 2, sur: -1, slot4: 0, itn: 1, pre: 0 },
    "dwarf": { str: 2, dex: -2, sur: 2, slot4: 0, itn: 0, pre: -1 },
    "gnome": { str: -3, dex: 1, sur: 0, slot4: 0, itn: 2, pre: 0 },
    "halfling": { str: -2, dex: 3, sur: 0, slot4: 0, itn: -1, pre: 1 }
};

let baseStats = { str: 10, dex: 10, sur: 10, slot4: 10, itn: 10, pre: 10 };
let points = (charRace === 'human') ? 25 : 20;
let primary = "";
let secondary = "";
let buyCap;

// 3. STAT BUTTON LOGIC
function changeStat(s, d) {
	const floor = 3;
	
  if (charRace === 'human') // Hard limit on point-spending
    {
	buyCap = 22;
    } else {
	buyCap = 20;
    }

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

 function toggleSpecialization() {
  
    if (!charClass || !charSpec)
		 return;
    const selectedClass = classSelect.value;
   
   
    // 1. Clear existing options
    charSpec.innerHTML = '';

    // 2. Get rules for the selected class
    const rules = classRules[charClass];

    if (rules && rules.options) {
        // 3. Loop through the options in your classRules object
        for (const key in rules.options) {
            const optionData = rules.options[key];
            const newOption = document.createElement('option');
            
            // Set the value (e.g., "str") and the text (e.g., "Berserker")
            newOption.value = key;
            newOption.textContent = optionData.specName;
            
            spec.appendChild(newOption);
                                        }
                                }
                                }
	 // 4. DISPLAY ENGINE (CALCULATES RACE & SPECIALIZATION AFTER BUY)
function update() {
    const race = characterData.race || "human";
    const mods = RACE_MODS[charRace] || "human";
    localStorage.setItem('remainingPoints', points);

    // D. The Core Stat Loop
    for (let s in baseStats) {
        let lookupKey = s;
        // This is where the magic happens for Slot 4
        if (s === "slot4" && characterData.primaryStat) {
            lookupKey = characterData.primaryStat;
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
    const displayNameEl = document.getElementById('display-name');

if (displayNameEl) {
    // 1. Update the Display Texts
    displayNameEl.innerText = characterData.name;
    document.getElementById('display-name').innerText = characterData.name;
    document.getElementById('display-class').innerText = characterData.class;
    document.getElementById('display-race').innerText = characterData.race;
    document.getElementById('display-size').innerText = characterData.size;
    document.getElementById('display-spec').innerText = characterData.spec;
    document.getElementById('display-level').innerText = characterData.lvl;
    // 2. Get Rules & Define Primary/Secondary
        const selectedClass = charClass;
        const spec = characterData.spec;
        const rules = classRules[selectedClass];
        let primary = "";
        let secondary = "";

    if (rules) {
        if (rules.primaryIsFixed) {
            primary = rules.fixedStat;
            secondary = rules.options[spec]?.secondary || "";
        } else {
            primary = spec; // For Mages, spec is the primary
            secondary = rules.options[spec]?.secondary || "";
        }
    } 

function processFinalStats(currentBaseStats, currentPoints){
  if (points > 0) {
        const confirmSpend = confirm(`You still have ${points} points left! Are you sure you want to proceed?`);
        if (!confirmSpend) return;
    }

    // Save the final calculated stats (including race mods) so stats2.html can use them
    const race = localStorage.getItem('charRace');
    
    let finalStats = {};
    for (let s in currentBaseStats) {
		let lookupKey = (s === "slot4" &&
	characterData.primaryStat)
		? characterData.primaryStat
		: s;
		finalStats[s] = currentBaseStats[s] + (mods[lookupKey] || 0);

    }
}

// 2. THE FAT TRIMMER: Map "pie" to "slot4"
const pKey = (primary === "pie" || primary === "piety") ? "slot4" : primary;
const sKey = (secondary === "pie" || secondary === "piety") ? "slot4" : secondary;

// 3. Apply Highlights & Label
if (pKey) document.getElementById(`ctrl-${pKey}`)?.classList.add('primary-stat');
if (sKey) document.getElementById(`ctrl-${sKey}`)?.classList.add('secondary-stat');

// 4. Swap Label Text
const slot4Label = document.getElementById('label-slot4');
if (slot4Label) {
    slot4Label.innerText = (pKey === "slot4" || sKey === "slot4") ? "PIETY" : "LOGIC";
		}
    }
	if (document.getElementById('className'))
	{
         toggleSpecialization();
    }
// force refresh 1.0
   update(); 
}
window.onload = init;
