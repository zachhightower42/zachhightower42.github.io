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
}function updateDisplay() {
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
}
// Initialize the display when the page loads
window.onload = function () {
  updateDisplay();
  resetTraits();
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
    let yPos = 10;
    const pageHeight = doc.internal.pageSize.height;

    function addContent(text, fontSize = 12, indent = 0) {
        doc.setFontSize(fontSize);
        const splitText = doc.splitTextToSize(text, 180 - indent);
        if (yPos + (splitText.length * fontSize / 2) > pageHeight - 10) {
            doc.addPage();
            yPos = 10;
        }
        doc.text(splitText, 10 + indent, yPos);
        yPos += splitText.length * fontSize / 2 + 5;
    }

    // Add base stats
    addContent("Base Stats:");
    addContent(`HP: ${baseStats.hp}`, 10, 10);
    addContent(`MP: ${baseStats.mp}`, 10, 10);
    addContent(`Stamina: ${baseStats.stamina}`, 10, 10);
    addContent(`Stamina Regen: ${baseStats.staminaRegen}`, 10, 10);
    addContent(`Movespeed: ${baseStats.movespeed}`, 10, 10);

    // Add race
    addContent(`Race: ${document.getElementById("race").value}`);

    // Add skills and proficiencies
    addContent("Skills and Proficiencies:");
    for (let skill in skills) {
        addContent(`${skill}: ${skills[skill]}`, 12);
        if (skillProficiencyMap[skill]) {
            skillProficiencyMap[skill].forEach(proficiency => {
                addContent(`${proficiency}: ${proficiencies[proficiency]}`, 10, 20);
            });
        }
    }

    // Add selected traits with descriptions
    addContent("Selected Traits:");
    selectedTraits.forEach(trait => {
        const traitElement = document.querySelector(`label[for="${trait}"]`);
        const traitName = traitElement.textContent;
        const traitDescription = traitElement.nextElementSibling.textContent.trim();
        
        addContent(`${traitName}:`, 12);
        addContent(traitDescription, 10, 10);
    });

    // Save the PDF
    doc.save("pax_character_sheet.pdf");
}