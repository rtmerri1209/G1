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
let points = 0;
let primary = "";
let secondary = "";
let buyCap;

// 3. STAT BUTTON LOGIC
function changeStat(s, d) {
	const race = document.getElementById('race-select');
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

 function toggleSpecialization() {
    const classSelect = document.getElementById('class-select');
    const spec = document.getElementById('spec-select');
    if (!classSelect || !spec)
		 return;
    const selectedClass = classSelect.value;
   
   
    // 1. Clear existing options
    spec.innerHTML = '';

    // 2. Get rules for the selected class
    const rules = classRules[selectedClass];

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
    // A. Retrieve Selections from UI
    // Added optional chaining (?.) so it doesn't crash if an ID is missing
    const className = document.getElementById('class-select')?.value;
    const spec = document.getElementById('spec-select')?.value;
    const race = localStorage.getItem('race') || "human";
    const mods = RACE_MODS[race];
    localStorage.setItem('remainingPoints', points);

    // B. Map Specializations to Primary Stats (Matches your Warrior/Mage logic)
    const specToStat = {
        "Berserker": "sur",
        "Master of Arms": "sur",
        "Spellslinger": "log",
        "Assassin": "dex",
        "Pickpocket": "dex",
        "Bastion": "pie",
        "Witchdoctor": "pie",
        "Templar": "pie",
        "Prophet": "pie",
        "Zealot": "pie"
    };

    // C. Setup Character Object for Slot4 Resolution
    // This defines what 'myCharacter' is so the loop doesn't hit 'null'
    
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
    const displayNameEl = document.getElementById('display-name');

if (displayNameEl) {
    // 1. Update the Display Texts
    displayNameEl.innerText = localStorage.getItem('cname');
    document.getElementById('display-class').innerText = localStorage.getItem ('className');
    document.getElementById('display-race').innerText = localStorage.getItem ('race');
    document.getElementById('display-size').innerText = localStorage.getItem('size');

    // 2. Get Rules & Define Primary/Secondary
        const selectedClass = className;
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

   update(); 
}
window.onload = init;
