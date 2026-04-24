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
                arch: ["Any"]
                },
                        desc: "Increases HP scaling and increases fatigue resistance", 
                        limit: "cst" 
       
        },
       
        { 
                id: 2,
                name: "Sawed-Off", 
        reqs: {
                classes: ["Ranger, Warrior, Rogue"],
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
                classes: ["Any"],
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
                level: 1 
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
                name: "Well of the Mind", desc: "Rank 1: +1 Lvl 1 slot/cantrip. Higher ranks add higher level slots.", limit: "Stackable" 
        },
        {
                name: "Quiet Casting", desc: "Roll d20 vs Target Perception to cast unnoticed.", limit: "Non-Stackable" 
        },
        { 
                name: "Blood Magic", desc: "Once per day, cast using HP (1d10 per spell level) instead of slot.", limit: "Stackable (+2 uses per rank)" 
        },
        { 
                name: "Spell Sniper", desc: "Increases effective range of projectile spells by 25%.", limit: "Non-Stackable" 
        },
        { 
                name: "Battle Medic", desc: "Cast healing spells as a Reaction when ally within 10ft takes damage.", limit: "Non-Stackable" 
        },
        { 
                name: "Blanket", desc: "Defensive buff spells target one additional party member.", limit: "Stackable (Cap: 3)" 
        },
        { 
                name: "Bolster", desc: "Defensive spells on Heavy Armor allies grant them +1 Reaction.", limit: "Non-Stackable" 
        },
        { 
                name: "Divine Burden", desc: "Piety/Divine debuffs roll 2d20 and keep highest.", limit: "Non-Stackable" 
        },
        { 
                name: "Divine Echo", desc: "Heals trigger secondary effect: 1/3 value heals ally or damages enemy.", limit: "Non-Stackable" 
        }
    ];
