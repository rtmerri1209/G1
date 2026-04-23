  const classRules = {
  Warrior: { 
    fixedStat: "sur", 
    options: { 
      str: { display: "Strength (Two-hand)", secondary: "str" }, 
      dex: { display: "Dexterity (Dual-Wield)", secondary: "dex" } 
    }, 
    primaryIsFixed: true 
  },
  Mage: { 
    fixedStat: null, 
    options: { 
      logic: { display: "Logic", secondary: "dex" }, 
      piety: { display: "Piety", secondary: "sur" } 
    }, 
    primaryIsFixed: false 
  },
  Paladin: { 
    fixedStat: "pie", 
    options: { 
      str: { display: "Strength", secondary: "str" } 
    }, 
    primaryIsFixed: true 
  },
  Ranger: { 
    fixedStat: "sur", 
    options: { 
      str: { display: "Melee", secondary: "str" }, 
      dex: { display: "Ranged", secondary: "dex" } 
    }, 
    primaryIsFixed: true 
  },
  Rogue: {
    fixedStat: "dex",
    options: {
      assassin: { display: "Assassin", secondary: "sur" },
      pickpocket: { display: "Pickpocket", secondary: "pre" }
    },
    primaryIsFixed: true
  },
  Cleric: {
    fixedStat: "pie",
    options: {
      prophet: { display: "Prophet", secondary: "int" }, // Intuition
      zealot: { display: "Zealot", secondary: "sur" }
    },
    primaryIsFixed: true
  }
};
