// Initialize base stats
let baseStats = {
  hp: 15,
  mp: 0,
  stamina: 3,
  staminaRegen: 1,
  movespeed: 5,
  skillPoints: 48,
  proficiencyPoints: 12,
  traitPoints: 2,
};

// Initialize skills and proficiencies
let skills = {
  fortitude: 5,
  resolve: 5,
  finesse: 5,
  stealth: 5,
  beguile: 5,
  awareness: 5,
  investigation: 5,
  combat: 5,
  industry: 5,
  education: 5,
  witchery: 5,
};

let proficiencies = {
  strength: 5,
  size: 5,
  stamina: 5,
  dauntless: 5,
  ascetic: 5,
  inspiring: 5,
  speed: 5,
  precision: 5,
  reflexes: 5,
  sleightOfHand: 5,
  subtlety: 5,
  ghostliness: 5,
  charming: 5,
  bargaining: 5,
  fibbing: 5,
  nyctophobe: 5,
  honest: 5,
  gutFeeling: 5,
  reading: 5,
  discerning: 5,
  chessmaster: 5,
  rifles: 5,
  knives: 5,
  bareHooves: 5,
  engineering: 5,
  gunsmithing: 5,
  medicine: 5,
  history: 5,
  arcaneArts: 5,
  lightMagic: 5,
};

function updateRaceStats() {
  const race = document.getElementById("race").value;
  resetBaseStats();

  switch (race) {
    case "Earthen":
      baseStats.skillPoints += 5;
      baseStats.hp += 2;
      break;
    case "Avian":
      baseStats.movespeed += 5;
      // Enable and select the Flight trait
      document.getElementById("flight").disabled = false;
      document.getElementById("flight").checked = true;
      selectedTraits.push("flight");
      break;
    case "Mythican":
      baseStats.proficiencyPoints += 2;
      baseStats.mp = 10;
      document.getElementById("witchery").disabled = false;
      break;
    default:
      // Disable and deselect the Flight trait for non-Avian races
      document.getElementById("flight").disabled = true;
      document.getElementById("flight").checked = false;
      const index = selectedTraits.indexOf("flight");
      if (index > -1) {
        selectedTraits.splice(index, 1);
      }
  }

  updateDisplay();
}
function resetBaseStats() {
  baseStats = {
    hp: 15,
    mp: 0,
    stamina: 3,
    staminaRegen: 1,
    movespeed: 5,
    skillPoints: 48,
    proficiencyPoints: 12,
    traitPoints: 2,
  };
  document.getElementById("witchery").disabled = true;
  resetTraits();
}
function incrementSkill(skill, skillCap) {
  if (skills[skill] < skillCap && baseStats.skillPoints > 0) {
    skills[skill]++;
    baseStats.skillPoints--;
    updateStats(skill);
    
    // Increment associated proficiencies
    skillProficiencyMap[skill].forEach(proficiency => {
      if (proficiencies[proficiency] < 18) {
        proficiencies[proficiency]++;
      }
    });
    
    updateDisplay();
  }
}

function decrementSkill(skill) {
  if (skills[skill] > 5) {
    skills[skill]--;
    baseStats.skillPoints++;
    updateStats(skill, true);
    
    // Decrement associated proficiencies
    skillProficiencyMap[skill].forEach(proficiency => {
      if (proficiencies[proficiency] > 5) {
        proficiencies[proficiency]--;
      }
    });
    
    updateDisplay();
  }
}
function incrementProficiency(proficiency) {
  if (proficiencies[proficiency] <= 16 && baseStats.proficiencyPoints > 0) {
    proficiencies[proficiency] += 2;
    baseStats.proficiencyPoints--;
    updateDisplay();
  } else if (proficiencies[proficiency] === 17 && baseStats.proficiencyPoints > 0) {
    alert("Can't increase proficiency beyond 18");
    updateDisplay();
  }
}

function decrementProficiency(proficiency) {
  const associatedSkill = Object.keys(skillProficiencyMap).find(skill => skillProficiencyMap[skill].includes(proficiency));
  if (proficiencies[proficiency] > 5 && proficiencies[proficiency] > skills[associatedSkill]) {
    proficiencies[proficiency] -= 2;
    baseStats.proficiencyPoints++;
    updateDisplay();
  }
}
function decrementSkill(skill) {
  if (skills[skill] > 5) {
    skills[skill]--;
    baseStats.skillPoints++;
    updateStats(skill, true);
    

    if (skillProficiencyMap[skill]) {
      skillProficiencyMap[skill].forEach(proficiency => {
        if (proficiencies[proficiency] > 5) {
          proficiencies[proficiency]--;
        }
      });
    }
    
    updateDisplay();
  }
}
function updateStats(skill, isDecrement = false) {
  switch (skill) {
    case "fortitude":
      baseStats.hp += isDecrement ? -1 : 1;
      if (
        skills.fortitude % 3 === 0 ||
        (isDecrement && (skills.fortitude + 1) % 3 === 0)
      ) {
        baseStats.stamina += isDecrement ? -1 : 1;
      }
      break;
    case "resolve":
      if (
        skills.resolve % 4 === 0 ||
        (isDecrement && (skills.resolve + 1) % 4 === 0)
      ) {
        let newStaminaRegen = baseStats.staminaRegen + (isDecrement ? -1 : 1);
        baseStats.staminaRegen = Math.max(1, newStaminaRegen);
      }
      break;
    case "finesse":
      if (skills.finesse === 14 && !isDecrement) {
        baseStats.movespeed += 2;
      } else if (skills.finesse === 13 && isDecrement) {
        baseStats.movespeed -= 2;
      } else {
        baseStats.movespeed += isDecrement ? -1 : 1;
      }
      break;
    case "witchery":
      if (document.getElementById("race").value === "Mythican") {
        baseStats.mp += isDecrement ? -1 : 1;
      }
      break;
  }
}let characterLevel = 1;

function levelUp() {
  characterLevel++;
  baseStats.skillPoints += 2;
  baseStats.proficiencyPoints += 2;
  baseStats.traitPoints += 1;
  updateDisplay();
  updateLevelIndicator();
}

function updateLevelIndicator() {
  document.getElementById('levelIndicator').textContent = `Level: ${characterLevel}`;
}

// Update display to also update level indicator
function updateDisplay() {
  document.getElementById("baseHP").value = baseStats.hp;
  document.getElementById("baseMP").value = baseStats.mp;
  document.getElementById("baseStamina").value = baseStats.stamina;
  document.getElementById("baseStaminaRegen").value = baseStats.staminaRegen;
  document.getElementById("baseMovespeed").value = baseStats.movespeed;
  document.getElementById("skillPoints").value = baseStats.skillPoints;
  document.getElementById("proficiencyPoints").value =
    baseStats.proficiencyPoints;
  document.getElementById("traitPoints").value = baseStats.traitPoints;

  for (let skill in skills) {
    document.getElementById(skill).value = skills[skill];
  }

  for (let proficiency in proficiencies) {
    document.getElementById(proficiency).value = proficiencies[proficiency];
  }

  updateLevelIndicator();
}

// Initialize the display when the page loads
window.onload = function () {
  updateDisplay();
  resetTraits();
  renderInventory();
  renderShop();
};

let selectedTraits = [];

function updateTraits(checkbox) {
  if (checkbox.checked) {
    if (baseStats.traitPoints > 0) {
      selectedTraits.push(checkbox.id);
      baseStats.traitPoints--;
    } else {
      checkbox.checked = false;
      alert("No more trait points available!");
    }
  } else {
    const index = selectedTraits.indexOf(checkbox.id);
    if (index > -1) {
      selectedTraits.splice(index, 1);
      baseStats.traitPoints++;
    }
  }
  updateDisplay();
}

function resetTraits() {
  selectedTraits = [];
  document.querySelectorAll('input[name="trait"]').forEach((checkbox) => {
    checkbox.checked = false;
    if (checkbox.id === "flight") {
      checkbox.disabled = true;
    }
  });
  baseStats.traitPoints = 2; // Reset to initial value
  updateDisplay();
}

const skillProficiencyMap = {
  fortitude: ['strength', 'size', 'stamina'],
  resolve: ['dauntless', 'ascetic', 'inspiring'],
  finesse: ['speed', 'precision', 'reflexes'],
  stealth: ['sleightOfHand', 'subtlety', 'ghostliness'],
  beguile: ['charming', 'bargaining', 'fibbing'],
  awareness: ['nyctophobe', 'honest', 'gutFeeling'],
  investigation: ['reading', 'discerning', 'chessmaster'],
  combat: ['rifles', 'knives', 'bareHooves'],
  industry: ['engineering', 'gunsmithing'],
  education: ['medicine', 'history'],
  witchery: ['arcaneArts', 'lightMagic']
};

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    function addContent(text, fontSize = 12, indent = 0, isBold = false) {
        doc.setFontSize(fontSize);
        doc.setFont(undefined, isBold ? 'bold' : 'normal');
        const splitText = doc.splitTextToSize(text, pageWidth - 20 - indent);
        if (yPos + (splitText.length * fontSize / 2) > pageHeight - 20) {
            doc.addPage();
            yPos = 20;
        }
        doc.text(splitText, 10 + indent, yPos);
        yPos += splitText.length * fontSize / 2 + 5;
    }

    function addHorizontalLine() {
        doc.setDrawColor(0);
        doc.line(10, yPos, pageWidth - 10, yPos);
        yPos += 5;
    }

    // Add title
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text("Pax Character Sheet", pageWidth / 2, 15, { align: "center" });
    addHorizontalLine();
    yPos += 10; // Add extra space
    
        // Add character name
        const characterName = document.getElementById('characterName').value;
        addContent(`Character Name: ${characterName}`, 16, 0, true);
        yPos += 5;
        addHorizontalLine();
        // Add character bio
        const characterBio = document.getElementById('characterBio').value;
        addContent("Character Bio:", 14, 0, true);
        addContent(characterBio, 12, 10);
        addHorizontalLine();
        yPos += 10; // Add extra space
    
    // Add base stats
    addContent("Stats", 18, 0, { align: "center", isBold: true });
    addContent(`HP: ${baseStats.hp}    MP: ${baseStats.mp}`, 12, 10);
    addContent(`Stamina: ${baseStats.stamina}    Stamina Regen: ${baseStats.staminaRegen}    Movespeed: ${baseStats.movespeed}`, 12, 10);
    addHorizontalLine();

    // Add race
    addContent(`Race: ${document.getElementById("race").value}`, 14, 0, { align: "center" });
    addHorizontalLine();

    // Add skills and proficiencies
    addContent("Skills and Proficiencies", 16, 0, { align: "center" });
    for (let skill in skills) {
        addContent(`${skill}: ${skills[skill]}`, 14, 0, true);
        if (skillProficiencyMap[skill]) {
            let proficiencyText = "";
            skillProficiencyMap[skill].forEach(proficiency => {
                proficiencyText += `${proficiency}: ${proficiencies[proficiency]}    `;
            });
            doc.setFont(undefined, 'bold');
            doc.text(proficiencyText, 30, yPos);
            doc.setFont(undefined, 'normal');
            yPos += 7;
        }
        addHorizontalLine();
    }
    addHorizontalLine();

    yPos += 10; // Add extra space


    // Add selected traits with descriptions
    addContent("Traits", 16, 0, { align: "center" });
    selectedTraits.forEach(trait => {
        const traitElement = document.querySelector(`label[for="${trait}"]`);
        const traitName = traitElement.textContent;
        const traitDescription = traitElement.nextElementSibling.textContent.trim();
        
        addContent(`${traitName}:`, 14, 0, true);
        addContent(traitDescription, 12, 10);
    });
    addHorizontalLine();

    // Add inventory
    addContent("Inventory", 16, 0, { align: "center" });
    if (inventory.length === 0) {
      addContent("No items in inventory.", 12, 10);
    } else {
      inventory.forEach(item => {
        addContent(
          `Name: ${item.name}\nDescription: ${item.info}\nAmount: ${item.amount}\nStats: ${item.stats || ''}\nCost: ${item.cost}`,
          12, 10
        );
        addHorizontalLine();
      });
    }

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    }

    // Save the PDF
    doc.save("pax_character_sheet.pdf");
}

let inventory = [];

function addItemToInventory() {
  const name = document.getElementById('itemName').value.trim();
  const info = document.getElementById('itemInfo').value.trim();
  const amount = parseInt(document.getElementById('itemAmount').value, 10) || 1;
  const cost = parseFloat(document.getElementById('itemCost').value) || 0;
  let stats = prompt("Enter item stats (optional):", "");

  if (!name) {
    alert("Item name is required.");
    return;
  }

  inventory.push({ name, info, amount, stats, cost });
  renderInventory();
}

function renderInventory() {
  const tbody = document.getElementById('inventoryTable').querySelector('tbody');
  tbody.innerHTML = '';
  inventory.forEach((item, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.info}</td>
      <td>${item.amount}</td>
      <td>${item.stats || ''}</td>
      <td>${item.cost}</td>
      <td><button onclick="removeInventoryItem(${idx})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removeInventoryItem(index) {
  inventory.splice(index, 1);
  renderInventory();
}

// Paste the shop_items.md content as a string
const shopMarkdown = `Clothes
Boots ฿ 4
Chaps ฿ 4
Duster ฿ 7
Longjohns ฿ 1
Glasses 50¢
Shirt/blouse, dress ฿ 3
Shirt/blouse, work ฿ 1
Silk stockings ฿ 1
Suit/fancy dress ฿ 10
Trousers/skirt ฿ 2
Winter coat ฿5
Bonnet ฿2
Derby ฿1.50
Sombrero ฿3.50
Stetson ฿5
Tobacco
Cigar 5¢
Pipe ฿2
Tobacco, chewing (tin) 50¢
Tobacco, smoking (pouch) 50¢
Liquor
Cheap stuff
Shot 10¢
Bottle ฿2
Good stuff
Shot 25¢
Bottle ฿5
Gun Accessories
Gun belt ฿2
Holster ฿3
Quick-draw holster ฿11
Rifle scabbard ฿3
Speed-load cylinder ฿3
Rifle Scope ฿5
Telescopic Rifle Scope ฿8
General Equipment
Axe, Small ฿2
Axe, Large Woodaxe ฿4
All-Purpose Saddlebags ฿2
Big Packmule Saddlebags ฿3
Barbed wire (per yard) 5¢
Bed roll ฿4
Camera ฿5
Canteen ฿1
File 25¢
Guitar ฿8
Hammer 50¢
Handcuffs ฿1
Harmonica 25¢
Iron skillet 50¢
Lantern ฿2
Matches (box of 100) 50¢
Medical Supply Kit ฿10
Mess kit ฿2
Photographic plate ฿1
Pick ฿2
Playing cards 25¢
Rope (50) ฿5
Shovel ฿1.50
Spectacles ฿5
Watch, standard ฿2.50
Watch, gold ฿10
Weapon Repair Kit: ฿5.
Explosives
Blasting cap ฿1
Dynamite (per stick) ฿3
Fuse (per foot) 5¢
Nitro (per pint) ฿2.50
Thermite (per ounce) ฿5
Detonator, plunger ฿10
Detonation wire (50) ฿2.50
Large Expenses
Professionals Tools:
Gunsmithing Kit: ฿15
	(Effective 1 Weapon Repair Kit per month.  Infinite minor repairs.)
Surgeons Tools: ฿40
(Unlimited Medical supplies for stabilization, detoxification, and healing.)
Blastmasters Backpack: ฿30
	(Unlimited Explosives supplies bar Dynamite and Thermite. Comes with 3 of each.)
Sewing Kit: ฿5
	(Unlimited needle and thread.  Cloth and leather not supplied.)
Tanning Kit: ฿15
	(Tan your leather wherever you go.  Leather not supplied.)
Mechanics Toolbox: ฿30
	(Unlimited repair of mechanical engines or devices.  Lacks specialist pieces.)
Gourmands Provisions: ฿20
	(Pots, pans, plates, platters, and everything else you need to cook food you find.)
Roughnecks Rig: ฿60
	(Tents, tinderboxes for campfires, kindling, bedrolls, and more for the outdoors.)
Smiths Trappings: ฿25
	(Hammers, nails, tools to handle everything from horseshoes to armored trains.)
Carpenters Paraphernalia: ฿10
	(Glue, nails, cutting tools, and everything else a woodworker needs.)

Buys for the Affluent:
Chariot: ฿60
	(Transports up to 10 individuals safely over long distances.)
Calabash Pipe: ฿10
Top Hat: ฿6
Beard-Grooming Equipment: ฿8
Gentlemans Cane: ฿5
Modern Military Uniform: ฿15
Railroad Company Shares: ฿40
Damascened Firearm: + ฿25
Gold Damascened Firearm: + ฿50
Specialty Ammunition: ฿2.50 per Round
Telegram, Domestic: 2¢ Per Word
Telegram, International: 50¢ Per Word
30-Volume Encyclopedia: ฿25
Barbers Tools: ฿12

Rifles: 
Single-Shot Rifles
Varmit Plinker - ฿8
Two-Handed | Long | CAP 1 |DAM 10 | RNG 15 | Pierce 1 | Reload 1 | Fire Rate 1 | JT --

Spronkfield 181 - ฿15
Two-Handed | Long | CAP 1 | DAM 15 | RNG 20 | Pierce 2 | JT -- 

Hamery Single-Shot Rifle - ฿21
Two-Handed | Long | CAP 1 | DAM 17 | RNG 25 | Pierce 3 | JT --

Bullard .45-70 - ฿32
Two-Handed | Long | CAP 1 | DAM 20 | RNG 35 | Pierce 4 | JT --

Mooser 171 - ฿30
Two-Handed | Long | CAP 2 | DAM 12 | RNG 20 | Pierce 2 | JT -

Bullard .55-80 - ฿80
Two-Handed | Long | CAP 1 | DAM 24 | RNG 25 | Pierce 5 | JT 1 | Limited Use: 8


Lever-Action Rifles
Winniechester .32 - ฿15
Two-Handed | Long | CAP 8 | DAM 10 | RNG 15 | Pierce 2 | Fire Rate 2 | JT 1

Winniechester .32 Long Tube - ฿25
Two-Handed | Long | CAP 16 | DAM 10 | RNG 15 | Pierce 2 | Fire Rate 2 | JT 1

Hamery 186 - ฿41
Two-Handed | Long | CAP 8 | DAM 12 | RNG 20 | Pierce 2 | JT 1

Brush Gun - ฿55
Two-Handed | Long | CAP 5 | DAM 18 | RNG 20 | Pierce 3 | JT 2

Semper-Fi Carbine Rifle - ฿90
Two-Handed | Long | CAP 8 | DAM 16 | RNG 15 | Pierce 2 | JT 3 | Reload 8


Bolt-Action Rifles
LeBulle 218 - ฿75
Two-Handed | Long | CAP 10 | DAM 16 | RNG 30 | Pierce 3 | JT 2

Lee-Reignfield Rifle - ฿75
Two-Handed | Long | CAP 5 | DAM 16 | RNG 25 | Pierce 2 | Reload 5 (Empty) | JT 2

Karabou-Bjonnson 223 - ฿140
Two-Handed | Long | CAP 6 | DAM 18 | RNG 25 | Pierce 1 | Reload 6 | JT 2


Big-Game Rifles

Bullard .700 Stampede - ฿90
Two-Handed | Long | CAP 2 | DAM 25 | RNG 25 | Pierce 5 | Reload 2 | Limited Use: 6 | JT 2

Bullard 1326 Thunderhoof - ฿200
Two-Handed | Long | CAP 1 | DAM 35 | RNG 12 | Pierce 5 | Destruction 5 | Limited Use: 4 | JT 2




Shotguns: All Shotguns come with Destruction 2.
Break-Action Shotguns
Amareican Arms 12GSS - ฿12
Two-Handed | Long | CAP 1 |DAM 6d8 | RNG 12 | JT --

Colt 2-12 - ฿27
Two-Handed | Long | CAP 2 |DAM 4d6 | RNG 8 | Reload 2 | Fire Rate 2 | JT --

Coach Gun - ฿35
Two-Handed | Long | CAP 2 |DAM 6d6 | RNG 5 | Reload 2 | Fire Rate 2 | JT -

Colt Bushman Combination Shotgun -  ฿85
Two-Handed | Long | CAP 2 | DAM 5d6 | RNG 8 | Reload 3 | Fire Rate 2 | JT -
ALT-FIRE: CAP 1 | DAM 15 | RNG 20 | Pierce 2 | JT -- 

Pump-Action Shotguns
Winniechester Smokeless 20 - ฿45
Two-Handed | Long | CAP 7 | DAM 3d6 | RNG 10 | Fire Rate 2 | JT 1

Mooseberg 200 - ฿65
Two-Handed | Long | CAP 6 | DAM 5d8 | RNG 8 | JT 1

Bearing Arms Survivors Shotgun - ฿105
Two-Handed | Long | CAP 4 | DAM 4d6 | RNG 12 | JT 1 | Concealable

Amareican Arms Boonie-Buster 12GP - ฿150
Two-Handed | Long | CAP 6 | DAM 6d6 | RNG 8 | JT 1


Bolt-Action Shotguns
Winniechester “Sweet 16” - ฿60
Two-Handed | Long | CAP 5 |DAM 5d6 | RNG 8 | JT 2

Lee-Reignfield .410 - ฿75
Two-Handed | Long | CAP 5 | DAM 4d8 | RNG 10 | Reload 5 (Empty) | JT 2

Creusot-Loire Pistolet dFour - ฿155
Two-Handed | Long | CAP 3 | DAM 4+2d20 | RNG 8 | JT 1

Punt Guns
Amareican Arms 4GSS - ฿90
Two-Handed | Long | CAP 1 | DAM 10d8 | RNG 12 | Limited Use: 2 | 1d6 Damage to Self | JT --










Handguns:      
Revolvers
Colt Standard .32 - ฿10
One-Handed | Short | CAP 6 | DAM 10 | RNG 12 | Pierce 1 | Reload 2 | Fire Rate 1 | JT --

Colt Peacemaker - ฿18
One-Handed | Short | CAP 6 | DAM 12 | RNG 15 | Pierce 2 | Reload 2 | JT --

Neighgant SA .32 - ฿8
One-Handed | Short | CAP 7 | DAM 10 | RNG 10 | Reload 2 | No Speed Loaders | JT --

Neighgant DA .32 - ฿16
One-Handed | Short | CAP 7 | DAM 10 | RNG 10 | Fire Rate 2 | Reload 2 | No Speed Loaders | JT 1

Scoffield .32 - ฿24
One-Handed | Short | CAP 5 | DAM 10 | RNG 10 | Reload 5 | JT -

Karabou-Bjonnson .357 Magnus
One-Handed | Short | CAP 6 | DAM 12 | RNG 15 | Pierce 4 | JT -

Colt Army .44 - ฿35
One-Handed | Short | CAP 6 | DAM 14 | RNG 15 | Pierce 2 | JT -

Bearing Arms Bear Defender
One-Handed | Short | CAP 4 | DAM 16 | RNG 8 | Pierce 4 | JT 1 | Recoil 6




Derringers
Colt “Snakebite” .22 - ฿20
One-Handed | Short | CAP 2 | DAM 6 | RNG 6 | Reload 2 | Fire Rate 2 | Holdout Weapon | JT --

Winniechester “Double-Deuce” .32 - ฿35
One-Handed | Short | CAP 2 | DAM 10 | RNG 4 | Reload 2 | Fire Rate 2 | Holdout Weapon | JT --

Colt Hammerless .177 - ฿25
One-Handed | Short | CAP 5 | DAM 4 | RNG 2 | Fire Rate 3 | Quiet | Holdout Weapon | JT 1

Bearing Arms Soltarian Expedition - ฿40
One-Handed | Short | CAP 2 | DAM 10 OR DAM 3d8 | RNG 2 | Fire Rate 2 | Holdout Weapon | JT 1

Amareican Arms Pepperbox - ฿40
One-Handed | Short | CAP 4 | DAM 2d8 | RNG 2 | Fire Rate 2 | Holdout Weapon | JT 1

Cavesson .45 Special - ฿45
One-Handed | Short | CAP 2 | DAM 12 | RNG 2 | Fire Rate 2 | Holdout Weapon | JT --








Hand-Cannons
LeMare 2A Revolver - ฿45
One-Handed | Short | CAP 9 | DAM 10 | RNG 10 | No Speed Loaders
ALT-FIRE: CAP 1 | DAM 7d2!! | RNG 1 | JT 1

Colt Trotter - ฿60
One-Handed | Short | CAP 6 | DAM 16 | RNG 15 | Reload 0.2 | JT 1

Amareican Arms 12GSS Sawn-Off - ฿9
One-Handed | Short | CAP 1 | DAM 6d4!! | RNG 5 | JT 1

Colt 2-12 Sawn-Off - ฿16
One-Handed | Short | CAP 2 | DAM 4d4!! | RNG 3 | Reload 2 | Fire Rate 2 | JT 1

Flare Gun - ฿3
One-Handed | Short | CAP 1 | DAM N/A | RNG 0 | Fire 1d4 | JT -

Amareican Arms Mareisian Double-Barrel Revolver - ฿95
One-Handed | Short | CAP 10 | DAM 11 | RNG 10 | JT 2 | Fire Rate 2

Unwanted Surprise - ฿95
One-Handed | Short | CAP 1 | DAM 8d2!! | RNG 1 | Reload 0.5 | JT 3
This single-shot shotgun is disguised as a break-action revolver.

Maretini Volley Pistol - ฿155
One-Handed | Short | CAP 1 | DAM (1d9)*6 | RNG 4 | Reload 2 | JT 4
This pistol fires nine bullets at once.



Experimental Pistols

“El Salvador” Volcanic Pistol - ฿40
One-Handed | Short | CAP 12 | DAM 6 | RNG 6 | Reload 2 | Fire Rate 3 | JT 2

Guycolt 40-Shot Chain - ฿45
One-Handed | Short | CAP 40 | DAM 4 | RNG 5 | Fire Rate 3 | Holdout Weapon | JT 2

LeBulle 5mm Double-Pinfire - ฿50
One-Handed | Short | CAP 20 | DAM 5 | RNG 7 | Reload 2 | Fire Rate 2 | JT 3

Borium No. 6 -- ฿50
One-Handed | Short | CAP 6 | DAM 7 | RNG 7 | Reload 5 (empty) | Fire Rate 3 | JT 4


“Mini Chong” Three-Eyes - ฿40
One-Handed | Short | CAP 3 | DAM 8 | RNG 12 | Fire Rate 3 | Reload 0.5 | JT 2

Mooser 219 - ฿200
One-Handed | Short | CAP 10 | DAM 12 | RNG 8 | Pierce 2 | Fire Rate 3 | Reload 2/10 (Empty) | JT 5

Fabrique Nationale Horstal 223-.380 - ฿200
One-Handed | Short | CAP 7 | DAM 10 | RNG 12 | Pierce 1 | Fire Rate 3 | Reload 7 (Empty) | JT 3

Bohaymen Krkna Hrad 8mm - ฿200
One-Handed | Short | CAP 8 | DAM 14 | RNG 10 | Pierce 2 | Fire Rate 2 | JT 2 | Reload 0
Bolt-Throwers:
Bow-And-Arrow
Longbow -- ฿2
Two-Handed | Long | CAP 1 | DAM 8 | RNG 8 | Silent | JT --

Recurve Bow - ฿5
Two-Handed | Long | CAP 1 | DAM 10 | RNG 10 | Silent | JT --

Crossbows 
Crossbow - ฿30
Two-Handed | Long | CAP 1 | DAM 12 | RNG 10 | Silent | Can take Special Ammo | JT --

Arbalests
Arbalest - ฿70
Two-Handed | Long | CAP 1 | DAM 15 | RNG 15 | Reload 0.5 | Quiet | Can take Special Ammo | JT 1

Pneumatic Weapons
Pneumatic Bolt-Thrower - ฿35
Two-Handed | Long | CAP 1 | DAM 8 | RNG 20 | Reload 0.5 | Quiet | JT 1

“The Ever-Free Postage Express” - ฿70
Two-Handed | Long | CAP 1 | DAM 5d6 | RNG 15 | Reload 0.5 | Fires Junk | JT 3




Artillery:
Artillery
Lee-Reignfield Hoof-Mortar - ฿55
One-Handed | Short | CAP 1 | DAM 20 | RNG 6 | Limited Use: 1 | Can take Special Ammo | JT 1
Cannon - ฿350 
Artillery | Turret | CAP 1 | DAM 100 | RNG 50 | Reload 0.2 | JT --
Gatling Gun - ฿ 1,000
Artillery | Turret | CAP 100 | DAM 15 | RNG 15 | Fire Rate 10 | JT 2

Explosives
Dynamite - Mostly Reliable -- ฿3 Per
Thrown or Placed | Light | DAM 10d4 | Blast 2 | 1-Round Fuse | Destruction 2

Dynamite Bundle - Semi-Reliable - ฿10 Per
Thrown or Placed | Heavy | DAM 10d8 | Blast 4 | 1-Round Fuse | Destruction 3

Thermite Dynamite - Unreliable - ฿30 Per
Thrown or Placed | Heavy | DAM 20d6 | Blast 5 | Blinding | 1-Round Fuse | Fire 2d8 | Destruction 4

Ammonium Dynamite - Mostly Reliable - ฿5 Per
Thrown or Placed | Light | DAM 6d4 | Blast 1 | 1-Round Fuse | Smokescreen | Toxic 2d4 | Destruction 2

Thermite - Reliable - ฿10 Per
Placed | DAM N/A | 2-Round Fuse | Destruction 5

Happy Trails Cocktail - Mostly Reliable - 50 ¢ Per
Thrown | Light | DAM 1d4 | Blast 2 | Explodes on Impact | Fire 4d8

Large Melee:
Spears
Basic Spear -- ฿1
Two-Handed | Long | Light | RNG 2 | DAM 12 | Conspicuous

Halberd -- ฿20
Two-Handed | Long | Heavy | RNG 2 | DAM 20 | Conspicuous

Firearm Halberd -- ฿60
Two-Handed | Long | Heavy | RNG 2 | DAM 20 | Conspicuous
ALT-FIRE: CAP 1 | DAM 2d12 | RNG 20

Swords
Claidheamh mór -- ฿20
Two-Handed | Long | Heavy | RNG 1 | DAM 25 | Conspicuous

Zweihufer -- ฿20
Two-Handed | Long | Heavy | RNG 1 | DAM 25 | Conspicuous

Woodcutters
Woodaxe -- ฿4
Two-Handed | Heavy | Long | RNG 1 | DAM 15 | Inconspicuous | Destruction 4

Fire Axe -- ฿4
Two-Handed | Long | Heavy | RNG 1 | DAM 15 | Inconspicuous | Destruction 4

Battleaxe -- ฿20
Two-Handed | Long | Heavy | RNG 1 | DAM 25 | Conspicuous | Destruction 3


Sledgehammers
Sledgehammer -- ฿3
Two-Handed | Long | Unwieldly | RNG 1 | DAM 15 | Inconspicuous | Destruction 4

Warhammer -- ฿20
Two-Handed | Long | Unwieldly | RNG 1 | DAM 25 | Conspicuous | Destruction 3













Small Melee
Sabres
Cavalry Sabre -- ฿12
One-Handed | Short | Light | RNG 1 | DAM 14 | Conspicuous

Szabla -- ฿15
One-Handed | Short | Light | RNG 1 | DAM 16 | Conspicuous

Riposte -- ฿6
One-Handed | Short | Light | RNG 1 | DAM 10 | Conspicuous | Affixable

Machete -- ฿2
One-Handed | Short | Light | RNG 1 | DAM 10 | Inconspicuous

Knives
Kitchen Knife -- 50¢
One-Handed | Short | Light | RNG 1 | DAM 10 | Inconspicuous

Bowie Knife -- ฿5
One-Handed | Short | Light | RNG 1 | DAM 12 | Conspicuous


Shank (Spike Bayonet) -- 50¢
One-Handed | Short | Light | RNG 1 | DAM 6 | Concealed | Holdout Weapon | Affixable

Dagger -- ฿2
One-Handed | Short | Light | RNG 1 | DAM 8 | Conspicuous | Holdout Weapon

Combat Knife -- ฿5
One-Handed | Short | Light | RNG 1 | DAM 8 | Conspicuous | Affixable

Hammers
Carpenter Hammer -- 50 ¢
One-Handed | Short | Heavy | RNG 1 | DAM 15 | Destruction 3 | Inconspicuous

Gavel -- ฿2
One-Handed | Short | Light | RNG 1 | DAM 10 | Destruction 3 | Conspicuous

Rubber Mallet -- 50¢
One-Handed | Short | Light | RNG 1 | DAM 10 | Destruction 2 | Inconspicuous | Nonlethal

Tomahawks
Tomahawk -- ฿4
One-Handed | Short | Light | RNG 1 | DAM 15 | Conspicuous | | Destruction 3

Small Axe -- ฿2
One-Handed | Short | Light | RNG 1 | DAM 10 | Inconspicuous | Affixable | Destruction 2








Bare Hooves -- Free
Hooves (or equivalent) | DAM (1/2 Fortitude) | RNG 1 | Fire Rate 2 | Light

Dusters -- ฿2
Hooves | DAM (1/2 Fortitude)+3 | RNG 1 | Fire Rate 2 | Light

Push-Dagger -- ฿5
Hooves | DAM (1/2 Fortitude)+6 | RNG 1 | Fire Rate 2 | Light


Wrestling -- Free
Hooves | DAM (1/2 Fortitude) | RNG 1 | Fire Rate 2 | Light | Requires Contested Roll | +4 to Hit Dice when the Aggressor


Martial Arts -- Free
Hooves | DAM (1/2 Fortitude) | RNG 1 | Fire Rate 2 | Light | Requires Contested Roll | +6 to Hit Dice when the Defender
`;

// Parse markdown into structured shop data
function parseShopMarkdown(md) {
  const sections = {};
  let currentSection = null;
  let lines = md.split('\n');
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    // Section header
    if (/^[A-ZaZ].*:?$/.test(line) && !line.includes('-')) {
      currentSection = line.replace(':', '');
      sections[currentSection] = [];
    } else if (currentSection && /^[^\s].*฿|¢|\$/.test(line)) {
      // Item line
      let [name, ...rest] = line.split(/฿|¢|\$/);
      name = name.trim();
      let cost = rest.join('').trim();
      if (cost) {
        // Normalize cost to bits (฿), convert cents to bits if needed
        let bits = 0;
        if (line.includes('฿')) bits = parseFloat(cost);
        else if (line.includes('¢')) bits = parseFloat(cost) / 100;
        else if (line.includes('$')) bits = parseFloat(cost) * 2; // Example conversion
        sections[currentSection].push({ name, cost: bits, description: '', stats: '' });
      }
    }
  }
  return sections;
}

const shopData = parseShopMarkdown(shopMarkdown);

function renderShop() {
  const shopContainer = document.getElementById('shopContainer');
  shopContainer.innerHTML = '';
  Object.keys(shopData).forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'shop-section';
    sectionDiv.innerHTML = `<h3>${section}</h3>`;
    const table = document.createElement('table');
    table.className = 'shop-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Cost</th>
          <th>Buy</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;
    shopData[section].forEach((item, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.cost}</td>
        <td><button onclick="buyShopItem('${section}', ${idx})">Buy</button></td>
      `;
      table.querySelector('tbody').appendChild(row);
    });
    sectionDiv.appendChild(table);
    shopContainer.appendChild(sectionDiv);
  });
}
window.onload = function () {
  updateDisplay();
  resetTraits();
  renderInventory();
  renderShop();
};

function buyShopItem(section, idx) {
  const item = shopData[section][idx];
  const bitsInput = document.getElementById('bits');
  let bits = parseFloat(bitsInput.value);
  if (bits < item.cost) {
    alert('Not enough bits!');
    return;
  }
  bits -= item.cost;
  bitsInput.value = bits;
  // Add to inventory
  inventory.push({
    name: item.name,
    info: item.description,
    amount: 1,
    stats: item.stats,
    cost: item.cost
  });
  renderInventory();
}