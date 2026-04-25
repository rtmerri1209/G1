export const feat_limits ={
        cst: "Constant",
        act: "Active",
        aur: "Aura",
        stk: "Stackable",
        prd: "Per Day",
        cnd: "Conditional",
        nst: "Non-Stackable",
        prt: "Per Turn"
}
                
export const featsData =[
        {
                id: 1, 
                name: "Rugged Body", 
        reqs: {
                classes: ["Any"],
                level: 1,
                sur: 14,
                arc: ["Any"]
                },
                        desc: "Increases HP scaling and increases fatigue resistance", 
                        limit: "cst" 
       
        },
       
        { 
                id: 2,
                name: "Sawed-Off", 
        reqs: {
                classes: ["Ranger, Warrior, Rogue"], 
                arc: ["Hunter", "Beastmaster", "Master at Arms", "Assassin", "Pickpocket"],
                level: 1, 
                 dex: 16
                },
                        desc: "Removes accuracy penalties for ranged weapons in melee range.", 
                        limit: ["cnd", "cst"] 
        },
        { 
                id: 3,
                name: "Iron Lung", 
         reqs: {
                classes: ["Any"], 
                arc: ["Any"],
                level: 1,
                sur: 12
                },        
                        desc: "Increases Sprint move speed by an additional 20 ft.", 
                        limit: "cst"
        },
        
        {
                id: 4,
                name: "Phalanx", 
        reqs: {
                classes: ["Warrior, Paladin"], 
                arc: ["Master at Arms", "Bastion", "Templar"],
                level: 4,
                str: 14
                },
                        desc: "Stacking armor bonus for every ally within 5ft that has a shield equipped.", 
                        limit: "aur" 
        },
        { 
                id: 5,
                name: "Second Wind", 
        reqs: {
                classes: ["Any"],
                arc: ["Any"],
                level: 3,
                sur: 16
                },
                        desc: "Recover HP = Survivability Skill when below 25% Health.", 
                        limit: "prd" 
        },
        { 
                id: 6,
                name: "Cat-Like Reflexes", 
        reqs: {  
                classes: ["Rogur", "Warrior", "Paladin"], 
                arc: ["Any"],
                level: 1,
                dex: 14
                },      
                        desc: "Grants +1 additional Reaction per turn.", 
                        limit: "prt" 
        },
        { 
                id: 7,
                name: "Pack Mule", 
        reqs: {
                classes: ["Any"],
                level: 1,
                str: 12
                },
                
                        desc: "Increases base carry capacity by +50 lbs.", 
                        limit: ["nst", "cst"] 
        },
        {
                id: 8,
                name: "Fearless", 
        reqs: {
                classes: ["Any"],
                arc: ["Any"], 
                level: 1,
                int: 13
        },
                        desc: "Roll an additional d6 on checks against Fear/Frightened/Shaken.", 
                        limit: "stk" 
        },
        {
                id: 9,
                name: "Breacher",
        reqs: {
                classes: ["Warrior", "Paladin"],
                arc: ["Any"],
                level: 1,
                str: 16
        },
                        desc: "Add +1d6 to damage vs objects (Applied BEFORE hardness).", 
                        limit: ["cnd"] 
        },
        {
                id: 10,
                name: "Scavenger", 
        reqs: {
                classes: ["Any"], 
                arc: ["Any"],
                level: 1, 
                ins: 10
        },
                        desc: "2/Day roll d100 for lost items/gold.", 
                        limit: ["prd", "stk"] // +1 use per day per stack
        },
        {
                id: 11,
                name: "Will of Domination", 
        reqs:{
                classes: ["Cleric", "Mage"],
                arc: ["Spellslinger", "Zealot", "Witchdoctor"],
                level: 4,
                slot4: 16
        },
                        desc: "Increases Save DC of mind-altering spells by the caster by +1d6.", 
                        limit: "stk" //max 2
        },
        {
                id: 12,
                name: "Well of the Mind", 
         reqs:{
                 classes: ["Mage", "Cleric"],
                 arc: ["Spellslinger","Zealot","Witchdoctor","Prophet"],
                 level: 1,
                 slot4: 16
                         },
                        desc: "Rank 1: +1 Lvl 1 slot/cantrip. Higher ranks add higher level slots.", 
                        limit: ["stk", "cst"]  // stacks after 1 give the next level of spells 
        },
        {
                id: 13,
                name: "Quiet Casting", 
        reqs:{
                classes: ["Mage","Cleric"],
                arc: ["Spellslinger","Zealot"],
                level: 4,
                slot4: 16
        },
                        desc: "Roll d20 vs Perception to cast unnoticed.", 
                        limit: ["nst","cnd"]
        },
        { 
                id: 14,
                name: "Blood Magic",
        reqs:{
                classes: ["Mage","Cleric"],
                arc: ["All"],
                level: 2,
                sur: 14 
                        },
                        desc: "Once per day, cast using HP (1d10 per spell level) instead of slot.", 
                        limit: "Stackable (+2 uses per rank)" 
        },
        { 
                id: 15,
                name: "Spell Sniper", 
        reqs:{
                classes: ["Mage","Cleric"],
                arc: ["Zealot", "Spellslinger", "Witchdoctor"],
                level: 1,
                slot4: 14
                        },
                        desc: "Increases effective range of projectile spells by 25%.", 
                        limit: "nst" 
        },
        { 
                id: 16,
                name: "Battle Medic", 
         reqs:{
                classes: ["Cleric", "Paladin"],
                arc: ["Prophet", "Bastion"],
                level: 4,
                slot4: 14
                        },
                        desc: "Cast healing spells as a Reaction when ally within 10ft takes damage.", 
                        limit: "nst" 
        },
        { 
                id: 17,
                name: "Blanket",  
         reqs:{
                classes: ["Cleric", "Mage"],
                arc: ["Prophet", "Spellslinger"],
                level: 2,
                slot4: 14
                        },
                        desc: "Defensive buff spells target one additional party member.", 
                        limit: "stk" 
        },
        { 
                id: 18,
                name: "Bolster",
         reqs:{
                classes: ["Cleric", "Mage"],
                arc: ["Any"],
                level: 3,
                slot4: 16
                        },
                        desc: "Defensive spells on Heavy Armor allies grant them +1 Reaction.", 
                        limit: "nst" 
        },
        { 
                id: 19,
                name: "Divine Burden", 
         reqs:{
                classes: ["Paladin", "Cleric", "Mage"],
                arc: ["Zealot", "Prophet", "Witchdoctor", "Bastion", "Templar"],
                level: 4,
                slot4: 14
                        },
                        desc: "Divine status effects roll advantage to hit.", 
                        limit: "nst" 
        },
        { 
                id: 20,
                name: "Divine Echo", 
         reqs:{
                classes: ["Paladin", "Cleric"],
                arc: ["Prophet", "Bastion"],
                level: 5,
                slot4: 14
                        },
                desc: "Heals trigger secondary effect: 1/3 value heals ally or damages enemy.", 
                limit: "nst" 
        }
    ];
