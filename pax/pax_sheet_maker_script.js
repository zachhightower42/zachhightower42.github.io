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
  // Prompt for all fields
  const name = prompt("Enter item name:").trim();
  if (!name) {
    alert("Item name is required.");
    return;
  }
  const info = prompt("Enter item description:").trim();
  const stats = prompt("Enter item stats (optional):", "").trim();
  const cost = prompt("Enter item cost (number or price string):", "").trim();
  let amount = parseInt(prompt("Enter item amount:", "1"), 10);
  if (isNaN(amount) || amount < 1) amount = 1;

  // Check if item already exists in inventory (match by name, info, stats, cost)
  const existing = inventory.find(inv =>
    inv.name === name &&
    inv.info === info &&
    inv.stats === stats &&
    inv.cost === cost
  );

  if (existing) {
    existing.amount += amount;
  } else {
    inventory.push({ name, info, amount, stats, cost });
  }
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
//Work on normalizing this a little more so that each item section starts with <section>:
//Give each item a Name, description, stats(or specify no stats), and a cost
//Then update the function to parse accordingly
const shopMarkdown = `Clothes:

Boots - Regular set of boots. Price unchanged for those that need claw or paw boots - No stats -  ฿ 4
Chaps - For riding, ass included, chapstick not included - No stats - ฿ 4
Duster - Look like a cowboy hero, does not come with heroism - No stats - ฿ 7 
Longjohns - Keep yourself warm, if you're too warm, try our shortjohns instead - No stats - ฿ 1
Glasses - See all the fantastic savings, useful for drinks too! - No stats - 50¢
Shirt/blouse, dress - Our most beautiful model yet - No stats - ฿ 3
Shirt/blouse, work - Our most functional model yet - No stats - ฿ 1
Silk stockings - Silky smooth, even better thank milky smooth - No stats - ฿ 1
Suit/fancy dress - Have you ever wanted to look like you have money? Trade us your money for this suit! - No stats - ฿ 10
Trousers/skirt - Join team trousers or team skirt. Both come with pockets. (note, pockets stitched seperately) - No stats - ฿ 2
Winter coat - Freezing temperatures? Need to be cuddlier? Can't grow your own fur? Try Winter Coat! - No stats - ฿5
Bonnet - Like a regular hat, but for women! - No stats - ฿2
Derby - Like a women's hat, but for men! - No stats - ฿1.50
Sombrero - Like a regular hat, but for people from Mexicolt! - No stats - ฿3.50
Stetson - Like a regular hat, but for cowboys! (cows and boys sold seperately) - No stats - ฿5

Tobacco:

Cigar - Impress your friends! Check if rooms have ventilation! - No stats - 5¢
Pipe - Pretend to be Sherclop Holmes! (deductive reasoning sold seperately) - No stats - ฿2
Tobacco, chewing (tin) - Hey buddy, don't give me any lip  - No stats - 50¢
Tobacco, smoking (pouch) - Hey buddy, don't give me any pouch - No stats - 50¢

Liquor: 

Cheap Shot - For those that want to get one up on their own liver - No stats - 10¢
Booze Bottle - The bottle is the most expensive part of this deal! - No stats - ฿2
Big Shot - For those that want to experience the smooth taste of being a BIG SHOT - No stats - 25¢ 
~Liquer~ Bottle - The sophisticated way to render yourself unconscious - No stats - ฿5

Gun Accessories:

Gun belt - A belt to hold all your fantastic holsters! (note, belt is not actually a gun) - No stats - ฿2
Holster - A holster to accesorize with your gun belt! Also holds guns. - No stats -  ฿3
Quick draw holster - Draw even faster! Speeds up drawing animation by at least 1% - No stats - ฿11
Rifle scabbard - Hold larger guns! - No stats - ฿3
Speed load cylinder - Comes in full moon and half moon. (Also half sun and full sun for sunny personalities) - No stats - ฿3
Rifle Scope - Look at things further away to make sure you're shooting the right things - No stats - ฿5
Telescopic Rifle Scope - May or may not be a telescope - No stats - ฿8

General Equipment:

Axe, Small - A small axe for small jobs - No stats - ฿2
Axe, Large Woodaxe - A large axe for large jobs - No stats - ฿4
All Purpose Saddlebags - Carry everything you own, never let them take it away - No stats - ฿2
Big Packmule Saddlebags - Carry everything that you own, and more! (note, carrying more than you own is technically thievery) - No stats - ฿3
Barbed wire (per yard) - Erect a pointy barrier against intruders, prank your friends! - No stats - 5¢
Bed roll - For sleeping under the stars. Not tested for sleeping over the stars - No stats - ฿4
Camera - Capture precious memories, as long as they stand still for an extended period of time - No stats - ฿5
Canteen - You take a sip from your trusty Shop brand canteen - No stats - ฿1
File - For filing things away into tiny pieces - No stats - 25¢
Guitar - Now you can be that guy at a party. Comes with Freebird - No stats - ฿8
Hammer - When you have this, every problem looks like a nail. Buy glasses to compensate for hammer induced vision impairment - No stats - 50¢
Handcuffs - Usable for criminals and those you just want to keep close, comes with key - No stats - ฿1
Harmonica - For those that feel the blues, but can't invest in a full band - No stats - 25¢
Iron skillet - Fry your troubles away, unless those troubles are heart burn - No stats - 50¢
Lantern - Light up your life - No stats - ฿2
Matches (box of 100) - Start a fire, or hold one in your mouth to look cool (coolness not guaranteed) - No stats - 50¢
Medical Supply Kit - If you buy our products, you'll need this - No stats - ฿10
Mess kit - For cooking food, guaranteed clean on purchase - No stats - ฿2
Photographic plate - Take photos so good you could eat off them! - No stats - ฿1
Pick - Compatible with ice, not with guitars - No stats - ฿2
Playing cards - Go all in, or fold, or call, you never call anymore - No stats - 25¢
Rope (50) - Plenty of rope, plenty of applications, but please don't get hung up on it - No stats - ฿5
Shovel - Dig yourself in deeper or dig yourself out - No stats - ฿1.50
Spectacles - For when glasses just won't do. (note, previously sold glasses were just two glass cups) - No stats - ฿5
Watch, standard - A watch made out of standards - No stats - ฿2.50
Watch, gold - A watch made out of gold, for those without standards - No stats - ฿10
Weapon Repair Kit - For when your weapons feel more like weapoffs - No stats - ฿5

Explosive Supplies:

Blasting cap - Helps with blowing things up. Cannot be equipped on things that don't blow up - No stats - ฿1
Dynamite (per stick) - Useful for mining and other applications (please do not use on bosses) - No stats - ฿3
Fuse (per foot) - Limit of one foot per foot - No stats - 5¢
Nitro (per pint) - Don't shake, stir, or look at it too hard - No stats - ฿2.50
Thermite (per ounce) - Only a mite, for a more powerful version see the Thermost - No stats - ฿5
Detonator, plunger - Only for the really bad clogs - No stats - ฿10
Detonation wire (50) - Cool guys aren't close to explosions - No stats - ฿2.50


Professionals Tools:

Gunsmithing Kit - A kit for smithing guns, not useful for johnning guns - (Effective 1 Weapon Repair Kit per month.  Infinite minor repairs.) - ฿15
Surgeons Tools - Almost twice as effective as a regular sewing kit - (Unlimited Medical supplies for stabilization, detoxification, and healing.) - ฿40
Blastmasters Backpack - Don't wear this next to any teammates - (Unlimited Explosives supplies bar Dynamite and Thermite. Comes with 3 of each.) - ฿30
Sewing Kit - Almost a quarter as effective as a regular surgeon's kit - (Unlimited needle and thread.  Cloth and leather not supplied.) - ฿5
Tanning Kit - Tan anywhere, anytime. Who needs the sun? (note, sun not included) - (Tan your leather wherever you go.  Leather not supplied.) - ฿15	
Mechanics Toolbox - Works even if your name isn't nick! - (Unlimited repair of mechanical engines or devices.  Lacks specialist pieces.) - ฿30	
Gourmands Provisions - Let him cook - (Pots, pans, plates, platters, and everything else you need to cook food you find.) - ฿20
Roughnecks Rig - For when everyone else forgot to bring stuff to sleepover - (Tents, tinderboxes for campfires, kindling, bedrolls, and more for the outdoors.) - ฿60	
Smiths Trappings - Can handle both black and white smithing - (Hammers, nails, tools to handle everything from horseshoes to armored trains.) - ฿25
Carpenters Paraphernalia - Can be combined with an ant to create a carpenter ant - (Glue, nails, cutting tools, and everything else a woodworker needs.) - ฿10	

Buys for the Affluent:

Chariot - If you bought it, try guilt tripping someone else into pulling it - (Transports up to 10 individuals safely over long distances.) - ฿60
Calabash Pipe - For those truly dedicated to the Sherclop holmes cosplay (comes with a free deerstalker) - No Stats - ฿10
Top Hat - Prove that you're the top, with this hat - No Stats - ฿6
Beard-Grooming Equipment - Comes with a free starter beard - No Stats - ฿8
Gentlemans Cane - Made out of 100% pure gentleman - No Stats - ฿5
Modern Military Uniform - For the discerning milsurp milslurper - No Stats - ฿15
Railroad Company Shares - Collect all 4 to become insufferable in Moneighpoly - No Stats - ฿40
Damascened Firearm - Engravings give no tactical advantage - No Stats - ฿25
Gold Damascened Firearm - Engravings of this caliber also give no tactical advantage, try platinum? - No Stats - ฿50
Specialty Ammunition - For guns that you only read about in magazines - No Stats (priced per bullet) - ฿2.50
Telegram, Domestic - Perfect for sending messages to your wife, spouse, spife, or wouse - No Stats (priced per word) - 2¢
Telegram, International - For when causing a domestic incident just won't cut it - No Stats (priced per word) - 50¢
30-Volume Encyclopedia - This is useless! - No Stats - ฿25
Barbers Tools - Unlocks hairstyle changes. (note, must have requisite amount of hair for changes) - No Stats - ฿12


Single-Shot Rifles:

Varmit Plinker - Plinks varmints, for larger varmints, try our varmint plonker - Two Handed | Long | CAP 1 |DAM 10 | RNG 15 | Pierce 1 | Reload 1 | Fire Rate 1 | JT 0 - ฿8
Spronkfield 181 - Not actually useful for spronking through fields - Two Handed | Long | CAP 1 | DAM 15 | RNG 20 | Pierce 2 | JT 0 -  ฿15
Hamery Single Shot Rifle - Loading multiple shots is not reccomended, unless you like the taste of exploded barrel - Two Handed | Long | CAP 1 | DAM 17 | RNG 25 | Pierce 3 | JT 0 - ฿21
Bullard .45 70 - Developed by John Bullard, the famous earth pony - Two Handed | Long | CAP 1 | DAM 20 | RNG 35 | Pierce 4 | JT 0 - ฿32
Mooser 171 - Developed by John Mooser, the famous penguin - Two Handed | Long | CAP 2 | DAM 12 | RNG 20 | Pierce 2 | JT 0 - ฿30
Bullard .55-80 - Slightly better than the Bullard .45 70, developed by John Bullard's competitive brother, Smith Bullard - Two Handed | Long | CAP 1 | DAM 24 | RNG 25 | Pierce 5 | JT 1 | Limited Use: 8 - ฿80

Lever Action Rifles:

Winniechester .32 - Like the Winniechester .32 Long Tube, but with a shorter tube - Two Handed | Long | CAP 8 | DAM 10 | RNG 15 | Pierce 2 | Fire Rate 2 | JT 1 - ฿15
Winniechester .32 Long Tube - Equal in tube size to itself - Two Handed | Long | CAP 16 | DAM 10 | RNG 15 | Pierce 2 | Fire Rate 2 | JT 1 - ฿25
Hamery 186 - Remember to pay your respects to Hamery 1 through 185 - Two Handed | Long | CAP 8 | DAM 12 | RNG 20 | Pierce 2 | JT 1 - ฿41
Brush Gun - Actually fires bullets - Two Handed | Long | CAP 5 | DAM 18 | RNG 20 | Pierce 3 | JT 2 - ฿55
Semper Fi Carbine Rifle - Comes with a military codebook (code for book, not included) - Two Handed | Long | CAP 8 | DAM 16 | RNG 15 | Pierce 2 | JT 3 | Reload 8 - ฿90

Bolt Action Rifles:

LeBulle 218 - Developed by Bullard's Prench cousin, the famous pegasus - Two Handed | Long | CAP 10 | DAM 16 | RNG 30 | Pierce 3 | JT 2 - ฿75
Lee Reignfield Rifle - Perfect for reenacting the Battle of the Some - Two Handed | Long | CAP 5 | DAM 16 | RNG 25 | Pierce 2 | Reload 5 (Empty) | JT 2 - ฿75
Karabou Bjonnson 223 - Developed by Kara, the famous 'Bou (any relation to player characters purely coincidental) - Two Handed | Long | CAP 6 | DAM 18 | RNG 25 | Pierce 1 | Reload 6 | JT 2 - ฿140

Big Game Rifles:

Bullard .700 Stampede - Terrifyingly, this is only seven tenths of Bullard's real power - Two Handed | Long | CAP 2 | DAM 25 | RNG 25 | Pierce 5 | Reload 2 | Limited Use: 6 | JT 2 - ฿90
Bullard 1326 Thunderhoof - This weapon is for REAL BIG SHOTS only - Two Handed | Long | CAP 1 | DAM 35 | RNG 12 | Pierce 5 | Destruction 5 | Limited Use: 4 | JT 2 - ฿200

Shotguns, All Shotguns come with Destruction 2: 

Amareican Arms 12GSS - The classic two barrel option, add another barrel for only six payments of 1.99 - Two Handed | Long | CAP 1 |DAM 6d8 | RNG 12 | JT 0 - ฿12
Colt 2 12 - Truly, your enemies are DOOMed - Two Handed | Long | CAP 2 |DAM 4d6 | RNG 8 | Reload 2 | Fire Rate 2 | JT 0   - ฿27
Coach Gun - This gun has helped many sports teams to victory - Two Handed | Long | CAP 2 |DAM 6d6 | RNG 5 | Reload 2 | Fire Rate 2 | JT 0 - ฿35
Colt Bushman Combination Shotgun - Thrice the barrels at quadruple the price - Two Handed | Long | CAP 2 | DAM 5d6 | RNG 8 | Reload 3 | Fire Rate 2 | JT 0 ALTFIRE CAP 1 | DAM 15 | RNG 20 | Pierce 2 | JT 0 - ฿85
Winniechester Smokeless 20 - Pump up the action - Two Handed | Long | CAP 7 | DAM 3d6 | RNG 10 | Fire Rate 2 | JT 1 - ฿45
Mooseberg 200 - Thankfully, it only kicks like one moose - Two Handed | Long | CAP 6 | DAM 5d8 | RNG 8 | JT 1 - ฿65
Bearing Arms Survivors Shotgun - Exercise your right to bear arms, but not your right to bare arms, that'd be weird - Two Handed | Long | CAP 4 | DAM 4d6 | RNG 12 | JT 1 | Concealable - ฿105
Amareican Arms Boonie Buster 12GP - Don't ask me what a boonie is, the censors will kill me - Two Handed | Long | CAP 6 | DAM 6d6 | RNG 8 | JT 1 - ฿150
Winniechester “Sweet 16” - This gun is barely legal in most states - Two Handed | Long | CAP 5 |DAM 5d6 | RNG 8 | JT 2 - ฿60
Lee Reignfield .410 - Superb for getting those tough to reach spots - Two Handed | Long | CAP 5 | DAM 4d8 | RNG 10 | Reload 5 (Empty) | JT 2 - ฿75
Creusot Loire Pistolet dFour - As the name says, this gun is as good as four pistols (note, we do not speak Prench) - Two Handed | Long | CAP 3 | DAM 4+2d20 | RNG 8 | JT 1 - ฿155

Punt Guns:

Amareican Arms 4GSS - This gun is for the birds. Really, it is! - Two Handed | Long | CAP 1 | DAM 10d8 | RNG 12 | Limited Use: 2 | 1d6 Damage to Self | JT 0 - ฿90

Handguns:      

Colt Standard .32 - A classic wheel gun, also a real gun - One Handed | Short | CAP 6 | DAM 10 | RNG 12 | Pierce 1 | Reload 2 | Fire Rate 1 | JT 0 - ฿10
Colt Peacemaker - Called the peacemaker, but actually frowned upon in treaty negotiations - One Handed | Short | CAP 6 | DAM 12 | RNG 15 | Pierce 2 | Reload 2 | JT 0 - ฿18
Neighgant SA .32 - If you're resorting to this, you're probably in trouble - One Handed | Short | CAP 7 | DAM 10 | RNG 10 | Reload 2 | No Speed Loaders | JT 0 - ฿8
Neighgant DA .32 - Double the action, double the price! - One Handed | Short | CAP 7 | DAM 10 | RNG 10 | Fire Rate 2 | Reload 2 | No Speed Loaders | JT 1 - ฿16
Scoffield .32 - Despite the name, this gun is nothing to scoff at - One Handed | Short | CAP 5 | DAM 10 | RNG 10 | Reload 5 | JT 0 - ฿24
Karabou Bjonnson .357 Magnus - Did I fire six shots, or only five? Huh? Punk? - One Handed | Short | CAP 6 | DAM 12 | RNG 15 | Pierce 4 | JT 0 - ฿30
Colt Army .44 - The greatest revolver ever made, according to all polled Ocelots - One Handed | Short | CAP 6 | DAM 14 | RNG 15 | Pierce 2 | JT 0 - ฿35
Bearing Arms Bear Defender - Historically, this gun has not been used to defend bears, only their arms - One Handed | Short | CAP 4 | DAM 16 | RNG 8 | Pierce 4 | JT 1 | Recoil 6 - ฿45

Derringers:

Colt “Snakebite” .22 - Snakes have filed suit for reputational damages for their association with this gun - One Handed | Short | CAP 2 | DAM 6 | RNG 6 | Reload 2 | Fire Rate 2 | Holdout Weapon | JT 0 - ฿20
Winniechester “Double Deuce” .32 - Great for when you've been caught with your pants down - One Handed | Short | CAP 2 | DAM 10 | RNG 4 | Reload 2 | Fire Rate 2 | Holdout Weapon | JT 0 - ฿35
Colt Hammerless .177 - No hammers were harmed in the production of this gun - One Handed | Short | CAP 5 | DAM 4 | RNG 2 | Fire Rate 3 | Quiet | Holdout Weapon | JT 1 - ฿25
Bearing Arms Soltarian Expedition - Plenty of options for which arms you want to bare - One Handed | Short | CAP 2 | DAM 10 OR DAM 3d8 | RNG 2 | Fire Rate 2 | Holdout Weapon | JT 1 - ฿40
Amareican Arms Pepperbox - Not to be used for spicing your food, the lawsuits were terrible - One Handed | Short | CAP 4 | DAM 2d8 | RNG 2 | Fire Rate 2 | Holdout Weapon | JT 1 - ฿40
Cavesson .45 Special - It's big, it's bold, and it's brash, for a holdout gun, anyway - One Handed | Short | CAP 2 | DAM 12 | RNG 2 | Fire Rate 2 | Holdout Weapon | JT 0 - ฿45

Hand-Cannons:

LeMare 2A Revolver - Is it a gun? Is it a shotgun? Is it a plane? It's LeMare! - One Handed | Short | CAP 9 | DAM 10 | RNG 10 | No Speed Loaders ALT-FIRE CAP 1 | DAM 7d2!! | RNG 1 | JT 1 - ฿45
Colt Trotter - If whatever you're shooting at isn't gone by the time the cylinder is empty, please use the complimentary prayer book - One Handed | Short | CAP 6 | DAM 16 | RNG 15 | Reload 0.2 | JT 1 - ฿60
Amareican Arms 12GSS Sawn Off - For those that like the concept of melee weapons, but lack upper body strength - One Handed | Short | CAP 1 | DAM 6d4!! | RNG 5 | JT 1 - ฿9
Colt 2 12 Sawn-Off - A cuter version of the big colt - One Handed | Short | CAP 2 | DAM 4d4!! | RNG 3 | Reload 2 | Fire Rate 2 | JT 1 - ฿16
Flare Gun - This isn't a real weapon, but it can be used to signal that you need one - One Handed | Short | CAP 1 | DAM N/A | RNG 0 | Fire 1d4 | JT 0 - ฿3
Amareican Arms Mareisian Double Barrel Revolver - Twice the shooting, twice the reloading, nine tenths of the reliability - One Handed | Short | CAP 10 | DAM 11 | RNG 10 | JT 2 | Fire Rate 2 - ฿95
Unwanted Surprise - It takes a daring customer to use this bad boy - One Handed | Short | CAP 1 | DAM 8d2!! | RNG 1 | Reload 0.5 | JT 3 This single-shot shotgun is disguised as a break-action revolver. - ฿95
Maretini Volley Pistol - Be your own firing squad - One Handed | Short | CAP 1 | DAM (1d9)*6 | RNG 4 | Reload 2 | JT 4 This pistol fires nine bullets at once. - ฿155

Experimental Pistols:

“El Salvador” Volcanic Pistol - This pistol doesn't actually deal fire damage, but it might deal explosive damage - One Handed | Short | CAP 12 | DAM 6 | RNG 6 | Reload 2 | Fire Rate 3 | JT 2 - ฿40
Guycolt 40Shot Chain - If you hate reloading, you'll love this for at least forty shots - One Handed | Short | CAP 40 | DAM 4 | RNG 5 | Fire Rate 3 | Holdout Weapon | JT 2 - ฿45
LeBulle 5mm Double Pinfire - Developed by LeBulle's fraternal twin, the famous kirin, does not actually fire pins - One Handed | Short | CAP 20 | DAM 5 | RNG 7 | Reload 2 | Fire Rate 2 | JT 3 - ฿50
Borium No. 6 - You'd have to be a master engineer to fix this thing when it breaks - One Handed | Short | CAP 6 | DAM 7 | RNG 7 | Reload 5 (empty) | Fire Rate 3 | JT 4 - ฿50
“Mini Chong” Three Eyes - Being shot by this pistol is comparable to being shot by three smaller pistols - One Handed | Short | CAP 3 | DAM 8 | RNG 12 | Fire Rate 3 | Reload 0.5 | JT 2 - ฿40
Mooser 219 - Despite the name, this could probably only take care of one to two meese - One Handed | Short | CAP 10 | DAM 12 | RNG 8 | Pierce 2 | Fire Rate 3 | Reload 2/10 (Empty) | JT 5 - ฿200
Fabrique Nationale Horstal 223 .380 - Tell your enemies they're FN ished with this classy number - One Handed | Short | CAP 7 | DAM 10 | RNG 12 | Pierce 1 | Fire Rate 3 | Reload 7 (Empty) | JT 3 - ฿200
Bohaymen Krkna Hrad 8mm - It may be short on vowels, but never on firepower - One Handed | Short | CAP 8 | DAM 14 | RNG 10 | Pierce 2 | Fire Rate 2 | JT 2 | Reload 0 - ฿200

Bolt Throwers:
 
Longbow - They say it won the seven year war, hopefully yours won't take that long - Two Handed | Long | CAP 1 | DAM 8 | RNG 8 | Silent | JT 0  - ฿2
Recurve Bow - It's bringing curvy back - Two Handed | Long | CAP 1 | DAM 10 | RNG 10 | Silent | JT 0 - ฿5 
Crossbow - I wouldn't want to cross anyone with this state of the art hardware - Two Handed | Long | CAP 1 | DAM 12 | RNG 10 | Silent | Can take Special Ammo | JT 0 - ฿30
Arbalest - It's the arbaBest! - Two Handed | Long | CAP 1 | DAM 15 | RNG 15 | Reload 0.5 | Quiet | Can take Special Ammo | JT 1 - ฿70


Pneumatic Weapons:

Pneumatic Bolt Thrower - The first word in gas powered weaponry - Two Handed | Long | CAP 1 | DAM 8 | RNG 20 | Reload 0.5 | Quiet | JT 1 - ฿35
“The Ever Free Postage Express” - Never mess with a mailman - Two Handed | Long | CAP 1 | DAM 5d6 | RNG 15 | Reload 0.5 | Fires Junk | JT 3 - ฿70

Artillery:

Lee Reignfield Hoof Mortar - This will have your enemies hoofing it faster than you can say [redacted] - One Handed | Short | CAP 1 | DAM 20 | RNG 6 | Limited Use 1 | Can take Special Ammo | JT 1 - ฿55
Cannon - If you can carry this, you're legally a fortification - Artillery | Turret | CAP 1 | DAM 100 | RNG 50 | Reload 0.2 | JT 0 - ฿350 
Gatling Gun - Useful for mission trips, whatever you leave behind will be undeniably holey - Artillery | Turret | CAP 100 | DAM 15 | RNG 15 | Fire Rate 10 | JT 2 - ฿ 1,000

Explosives:

Dynamite - Useful for mining and other applications (please do not use on bosses) - Mostly Reliable | Thrown or Placed | Light | DAM 10d4 | Blast 2 | 1 Round Fuse | Destruction 2 - ฿3
Dynamite Bundle - For those that feel one dynamite will get lonely - Semi Reliable | Thrown or Placed | Heavy | DAM 10d8 | Blast 4 | 1 Round Fuse | Destruction 3 - ฿10
Thermite Dynamite - A fantastic light show, but not to be used at kid's parties -  Unreliable | Thrown or Placed | Heavy | DAM 20d6 | Blast 5 | Blinding | 1 Round Fuse | Fire 2d8 | Destruction 4 - ฿30
Ammonium Dynamite - Eugh, the smell! - Mostly Reliable | Thrown or Placed | Light | DAM 6d4 | Blast 1 | 1 Round Fuse | Smokescreen | Toxic 2d4 | Destruction 2 - ฿5
Thermite - I cast spell of instant door! -  Reliable | Placed | DAM N/A | 2 Round Fuse | Destruction 5 - ฿10
Happy Trails Cocktail - A favorite of disgruntled revolutionaries and desperate pyromaniacs - Mostly Reliable | Thrown | Light | DAM 1d4 | Blast 2 | Explodes on Impact | Fire 4d8 - 50¢

Large Melee:

Basic Spear - Slightly more classy than a stick with a knife taped to one end - TwoHanded | Long | Light | RNG 2 | DAM 12 | Conspicuous - ฿1
Halberd - It's like an axe, but longer and pointier - TwoHanded | Long | Heavy | RNG 2 | DAM 20 | Conspicuous - ฿20
Firearm Halberd - Perfect for hunting windmills - TwoHanded | Long | Heavy | RNG 2 | DAM 20 | Conspicuous ALTFIRE CAP 1 | DAM 2d12 | RNG 20 - ฿60
Claidheamh mór - All polled customers said this was 50% better than our Claidheamh les - TwoHanded | Long | Heavy | RNG 1 | DAM 25 | Conspicuous - ฿20
Zweihufer - You really must be compensating for something - TwoHanded | Long | Heavy | RNG 1 | DAM 25 | Conspicuous - ฿20
Woodaxe - Strike fear into the hearts of trees and anyone else within chopping vicinity - TwoHanded | Heavy | Long | RNG 1 | DAM 15 | Inconspicuous | Destruction 4 - ฿4
Fire Axe - Heeeeeere's a great deal! - TwoHanded | Long | Heavy | RNG 1 | DAM 15 | Inconspicuous | Destruction 4 - ฿4
Battleaxe - For when a regular axe just won't chop it - TwoHanded | Long | Heavy | RNG 1 | DAM 25 | Conspicuous | Destruction 3 - ฿20
Sledgehammer - You'll have a smashing time with this! - TwoHanded | Long | Unwieldly | RNG 1 | DAM 15 | Inconspicuous | Destruction 4 - ฿3
Warhammer - If you had 40,000 of these, your financial future might be a little grimdark - TwoHanded | Long | Unwieldly | RNG 1 | DAM 25 | Conspicuous | Destruction 3 - ฿20

Small Melee:

Cavalry Sabre - Here comes the cavalry, luv! - OneHanded | Short | Light | RNG 1 | DAM 14 | Conspicuous - ฿12
Szabla - As intimidating as it is difficult to pronounce - One Handed | Short | Light | RNG 1 | DAM 16 | Conspicuous - ฿15
Riposte - Parry this, you casual! - One Handed | Short | Light | RNG 1 | DAM 10 | Conspicuous | Affixable - ฿6
Machete - Great for limbs! On trees or people! - One Handed | Short | Light | RNG 1 | DAM 10 | Inconspicuous - ฿2
Kitchen Knife - A chef's best friend! A liver's worst enemy - One Handed | Short | Light | RNG 1 | DAM 10 | Inconspicuous - 50¢
Bowie Knife - That's not a knoife, this is a knoife! - One Handed | Short | Light | RNG 1 | DAM 12 | Conspicuous - ฿5
Shank (Spike Bayonet) - Prison ready - One Handed | Short | Light | RNG 1 | DAM 6 | Concealed | Holdout Weapon | Affixable - 50¢
Dagger - Small, pointy, and stylish, be the envy of any red wedding with this accessory - One Handed | Short | Light | RNG 1 | DAM 8 | Conspicuous | Holdout Weapon - ฿2
Combat Knife - Great for opening up rations, or opening up other things! - One Handed | Short | Light | RNG 1 | DAM 8 | Conspicuous | Affixable - ฿5
Carpenter Hammer - Nails sold seperately - One Handed | Short | Heavy | RNG 1 | DAM 15 | Destruction 3 | Inconspicuous - 50¢
Gavel - Be the judge, jury, and executioner! - One Handed | Short | Light | RNG 1 | DAM 10 | Destruction 3 | Conspicuous - ฿2
Rubber Mallet - You'll need this for the pacifist run - One Handed | Short | Light | RNG 1 | DAM 10 | Destruction 2 | Inconspicuous | Nonlethal - 50¢
Tomahawk - It's actually an axe, not a hawk - One Handed | Short | Light | RNG 1 | DAM 15 | Conspicuous | | Destruction 3 - ฿4
Small Axe - For when size doesn't matter - One Handed | Short | Light | RNG 1 | DAM 10 | Inconspicuous | Affixable | Destruction 2 - ฿2
Bare Hooves - The best weapons in life aren't free - Hooves (or equivalent) | DAM (1/2 Fortitude) | RNG 1 | Fire Rate 2 | Light - Free
Dusters - These are actually terrible for dusting - Hooves | DAM (1/2 Fortitude)+3 | RNG 1 | Fire Rate 2 | Light - ฿2
Push Dagger - The instructions are in the name - Hooves | DAM (1/2 Fortitude)+6 | RNG 1 | Fire Rate 2 | Light - ฿5
Wrestling - Pretend you're Tike Myson - Hooves | DAM (1/2 Fortitude) | RNG 1 | Fire Rate 2 | Light | Requires Contested Roll | +4 to Hit Dice when the Aggressor - Free
Maretial Arts - Get the handbook on Stallionial Arts for only 19 payments of 1.99 - Hooves | DAM (1/2 Fortitude) | RNG 1 | Fire Rate 2 | Light | Requires Contested Roll | +6 to Hit Dice when the Defender - Free

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
    if (line.endsWith(':')) {
      currentSection = line.replace(':', '').trim();
      sections[currentSection] = [];
      continue;
    }

    // Item line
    if (currentSection && line.includes(' - ')) {
      // Split by ' - ', but allow stats to contain dashes
      // So, split into [name, description, ...stats, price]
      let parts = line.split(' - ');
      if (parts.length < 3) continue; // Not a valid item line

      let name = parts[0].trim();
      let description = parts[1].trim();
      let priceRaw = parts[parts.length - 1].trim();
      let stats = parts.slice(2, parts.length - 1).join(' - ').trim();

      // Normalize price to bits
      let bits = 0;
      if (priceRaw.includes('฿')) bits = parseFloat(priceRaw.replace(/[^\d.]/g, ''));
      else if (priceRaw.includes('¢')) bits = parseFloat(priceRaw.replace(/[^\d.]/g, '')) / 100;
      else if (priceRaw.includes('$')) bits = parseFloat(priceRaw.replace(/[^\d.]/g, '')) * 2; // Example conversion

      sections[currentSection].push({
        name,
        description,
        stats,
        cost: bits,
        priceDisplay: priceRaw
      });
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
          <th>Description</th>
          <th>Stats</th>
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
        <td>${item.description}</td>
        <td>${item.stats}</td>
        <td>${item.priceDisplay}</td>
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

  // List of free unarmed items (case-insensitive match)
  const freeUnarmedItems = [
    "Wrestling",
    "Maretial Arts",
    "Bare Hooves",
    "Dusters"
  ];

  // Check if item is free (cost is 0 or "Free") and is in the freeUnarmedItems list
  const isFreeUnarmed = (
    (item.cost === 0 || (typeof item.priceDisplay === "string" && item.priceDisplay.toLowerCase().includes("free"))) &&
    freeUnarmedItems.some(freeName => item.name.trim().toLowerCase() === freeName.trim().toLowerCase())
  );

  // Check if already in inventory
  const existing = inventory.find(inv =>
    inv.name === item.name &&
    inv.info === item.description &&
    inv.stats === item.stats &&
    inv.cost === item.priceDisplay
  );

  if (isFreeUnarmed && existing) {
    alert("Only one free sample per customer, I'm not made of bits you know. (wait...I think I actually might be.)");
    return;
  }

  if (bits < item.cost) {
    alert('Not enough bits!');
    return;
  }

  if (existing) {
    existing.amount += 1;
  } else {
    inventory.push({
      name: item.name,
      info: item.description,
      amount: 1,
      stats: item.stats,
      cost: item.priceDisplay
    });
  }

  bits -= item.cost;
  bitsInput.value = bits;
  renderInventory();
}

function incrementBits() {
  const bitsInput = document.getElementById('bits');
  let bits = parseFloat(bitsInput.value) || 0;
  bitsInput.value = bits + 1;
}

function decrementBits() {
  const bitsInput = document.getElementById('bits');
  let bits = parseFloat(bitsInput.value) || 0;
  if (bits > 0) {
    bitsInput.value = bits - 1;
  }
}

let shopHeaderClickCount = 0;

document.addEventListener("DOMContentLoaded", function () {
  const shopHeaderImg = document.getElementById("shopHeaderImg");
  const undertaleContainer = document.getElementById("undertaleTextBoxContainer");
  const shopMusic = document.getElementById("shopMusic");

  shopHeaderImg.addEventListener("click", function () {
    shopHeaderClickCount++;

    if (shopHeaderClickCount === 1) {
      showUndertaleTextBox("sheetmaker_assets/undertale_text_box.gif", 2500);
    } else if (shopHeaderClickCount === 2) {
      showUndertaleTextBox("sheetmaker_assets/undertale_text_box(1).gif", 2700, function () {
        setTimeout(function () {
          showUndertaleTextBox("sheetmaker_assets/undertale_text_box(2).gif", 2500);
        }, 1000);
      });
      setTimeout(function () {
      shopMusic.style.display = "block";
      shopMusic.play();
    }, 1700); // Play music after 1 second or so delay
  }
});

  function showUndertaleTextBox(imgSrc, duration, callback) {
    // Remove any existing text box
    undertaleContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = imgSrc;
    img.className = "undertale-textbox";
    undertaleContainer.appendChild(img);

    setTimeout(function () {
      img.style.opacity = "0";
      setTimeout(function () {
        undertaleContainer.innerHTML = "";
        if (callback) callback();
      }, 1000); // Wait for fade out
    }, duration);
  }
});

function exportToJSON() {
  // Gather all character data
  const characterData = {
    baseStats,
    skills,
    proficiencies,
    selectedTraits,
    inventory,
    characterName: document.getElementById('characterName').value,
    characterBio: document.getElementById('characterBio').value,
    race: document.getElementById('race').value,
    characterLevel
  };

  const dataStr = JSON.stringify(characterData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pax_character_sheet.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById('importJSONInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);

      // Restore all character data
      Object.assign(baseStats, data.baseStats);
      Object.assign(skills, data.skills);
      Object.assign(proficiencies, data.proficiencies);
      selectedTraits = Array.isArray(data.selectedTraits) ? data.selectedTraits : [];
      inventory = Array.isArray(data.inventory) ? data.inventory : [];
      characterLevel = data.characterLevel || 1;

      document.getElementById('characterName').value = data.characterName || "";
      document.getElementById('characterBio').value = data.characterBio || "";
      document.getElementById('race').value = data.race || "";

      // Restore trait checkboxes
      document.querySelectorAll('input[name="trait"]').forEach((checkbox) => {
        checkbox.checked = selectedTraits.includes(checkbox.id);
      });

      updateDisplay();
      renderInventory();
      renderShop();
      resetTraits(); // To update trait points and checkboxes

    } catch (err) {
      alert("Failed to import character sheet: " + err.message);
    }
  };
  reader.readAsText(file);
});

window.incrementBits = incrementBits;
window.decrementBits = decrementBits;
window.levelUp = levelUp;
window.addItemToInventory = addItemToInventory;
window.buyShopItem = buyShopItem;
window.incrementBits = incrementBits;
window.decrementBits = decrementBits;
window.removeInventoryItem = removeInventoryItem;