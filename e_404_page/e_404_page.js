// e_404_page.js
// Interactive 404 Page logic
// - Boot sequence animation
// - Story selection and reading
// - Google Docs personnel file viewer
// - Sound and music control

// --- Boot Sequence Text ---
const bootText = `
# ES-DOS 487

## Loading...

Performing system checks...
File system healthy...
Internet connection established...
Fetching updates from network...
Loading root folder...
Rendering desktop...
`;

// --- Story Files ---
const storyFiles = [
  { name: "double_life", label: "double_life" },
  { name: "butterfly_effect", label: "butterfly_effect" }
];

// --- Google Docs Template URL ---
const googleDocsTemplateUrl = "https://docs.google.com/document/d/1Ze9dcg69HO25bUG0vJbV0Ou92UKY2Aq2MCIggROXuxM/copy";

// --- Markdown Parsing ---
function parseMarkdown(md) {
  // Simple markdown to HTML conversion for headings and line breaks
  return md
    .replace(/^# (.*)$/gm, '<span style="font-size:2.5vw;font-weight:bold;">$1</span>')
    .replace(/^## (.*)$/gm, '<span style="font-size:2vw;font-weight:bold;">$1</span>')
    .replace(/\n/g, '<br>');
}

// --- Boot Text Typing Animation ---
function typeText(element, html, sound, speed = 30) {
  let i = 0;
  let tag = false;
  let out = '';
  sound.currentTime = 0;
  sound.play();

  function type() {
    if (i < html.length) {
      if (html[i] === '<') tag = true;
      if (html[i] === '>') tag = false;
      out += html[i];
      element.innerHTML = out;
      i++;
      setTimeout(type, tag ? 0 : speed);
    } else {
      sound.pause();
      setTimeout(showStorySelect, 800); // Short delay before showing story select
    }
  }
  type();
}

// --- Story Loading and Navigation ---
let currentStory = null;
let currentChapter = 0;
let chapters = [];

function showStorySelect() {
  hideStoryContent();
  document.getElementById('boot-text').style.display = 'none';

  // Hide Equus-Soft logo after boot screen
  const equusBrand = document.getElementById('equus-soft-brand');
  if (equusBrand) equusBrand.style.display = 'none';

  // Remove personnel file editor if present
  const editorDiv = document.getElementById('google-docs-editor');
  if (editorDiv) editorDiv.remove();

  const storySelect = document.getElementById('story-select');
  storySelect.innerHTML = '';
  storySelect.style.display = 'flex';

  // Play background music at reduced volume only if not already playing
  const music = document.getElementById('story-music');
  if (music.paused) {
    music.currentTime = 0;
    music.volume = 0.1;
    music.play();
  }

  // Add icons for each story
  storyFiles.forEach(story => {
    const container = document.createElement('div');
    container.className = 'story-icon-container';
    container.onclick = () => {
      loadStory(story.name, story.label);
    };

    const img = document.createElement('img');
    img.src = 'assets/text file icon.png';
    img.alt = story.label;

    const label = document.createElement('div');
    label.className = 'story-icon-label';
    label.textContent = story.label;

    container.appendChild(img);
    container.appendChild(label);
    storySelect.appendChild(container);
  });

  // Add Google Docs icon
  const googleContainer = document.createElement('div');
  googleContainer.className = 'google-docs-icon-container';
  googleContainer.onclick = showGoogleDocsEditor;

  const googleImg = document.createElement('img');
  googleImg.src = 'assets/text file icon.png';
  googleImg.alt = "Google Docs Editor";

  const googleLabel = document.createElement('div');
  googleLabel.className = 'google-docs-label';
  googleLabel.textContent = "personnel_file_editor";

  googleContainer.appendChild(googleImg);
  googleContainer.appendChild(googleLabel);
  storySelect.appendChild(googleContainer);

  // Add Windows-style taskbar
  let taskbar = document.getElementById('windows-taskbar');
  if (taskbar) taskbar.remove(); // Remove if already exists

  taskbar = document.createElement('div');
  taskbar.id = 'windows-taskbar';

  // Start area with icon and separator
  const startArea = document.createElement('div');
  startArea.id = 'taskbar-start-area';

  const icon = document.createElement('img');
  icon.id = 'taskbar-icon';
  icon.src = 'assets/equus_soft_icon.png';
  icon.alt = 'Equus Soft Icon';

  startArea.appendChild(icon);

  // Separator bar
  const separator = document.createElement('div');
  separator.id = 'taskbar-separator';
  separator.textContent = '|';
  separator.style.color = 'white';
  separator.style.margin = '0 10px';

  startArea.appendChild(separator);
  taskbar.appendChild(startArea);

  // Taskbar buttons (Home, Refresh, Edit)
  const homeButton = createTaskbarButton('Home', 'assets/home_icon.png', showStorySelect);
  const refreshButton = createTaskbarButton('Refresh', 'assets/refresh_icon.png', () => location.reload());
  const editButton = createTaskbarButton('Edit', 'assets/edit_icon.png', showGoogleDocsEditor);

  taskbar.appendChild(homeButton);
  taskbar.appendChild(refreshButton);
  taskbar.appendChild(editButton);

  document.body.appendChild(taskbar);

  makeEquusSoftLogoClickable(); // Make logo clickable to open start menu
}

function createTaskbarButton(label, iconPath, onClick) {
  const button = document.createElement('div');
  button.className = 'taskbar-button';
  button.onclick = onClick;

  const icon = document.createElement('img');
  icon.src = iconPath;
  icon.alt = label + ' Icon';

  const text = document.createElement('span');
  text.textContent = label;

  button.appendChild(icon);
  button.appendChild(text);

  // Only show label for non-home buttons
  if (label === 'Home') {
    button.title = 'Return to story select';
  }

  return button;
}

function hideStoryContent() {
  // Remove story content and navigation buttons
  const contentDiv = document.getElementById('story-content');
  if (contentDiv) contentDiv.remove();
  const navDiv = document.getElementById('story-nav');
  if (navDiv) navDiv.remove();
  const homeBtn = document.getElementById('story-home-btn');
  if (homeBtn) homeBtn.remove();
}

function loadStory(storyName, storyLabel) {
  // Hide story select
  document.getElementById('story-select').style.display = 'none';
  hideStoryContent();

  // Fetch markdown file
  fetch(`assets/stories/${storyName}.md`)
    .then(res => res.text())
    .then(md => {
      chapters = splitChapters(md);
      currentStory = { name: storyName, label: storyLabel };
      currentChapter = 0;
      showChapter();
    });
}

// Split markdown into chapters by headings (## or #)
function splitChapters(md) {
  const parts = md.split(/^##\s+/gm);
  if (parts.length === 1) return [md]; // Only one chapter
  // Add back the heading for each chapter
  return parts.map((part, i) => {
    if (i === 0 && !/^#/.test(part)) return part;
    return '## ' + part.trim();
  }).filter(ch => ch.trim().length > 0);
}

function showChapter() {
  hideStoryContent();

  // Create content div
  const contentDiv = document.createElement('div');
  contentDiv.id = 'story-content';
  contentDiv.className = 'story-content';
  contentDiv.innerHTML = parseMarkdownStory(chapters[currentChapter]);
  document.body.appendChild(contentDiv);

  // Create navigation buttons (currently hidden)
  const navDiv = document.createElement('div');
  navDiv.id = 'story-nav';
  navDiv.className = 'story-nav';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '< Previous Chapter';
  prevBtn.className = 'prev-btn';
  prevBtn.disabled = currentChapter === 0;
  prevBtn.onclick = () => {
    if (currentChapter > 0) {
      currentChapter--;
      showChapter();
    }
  };

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next Chapter >';
  nextBtn.className = 'next-btn';
  nextBtn.disabled = currentChapter >= chapters.length - 1;
  nextBtn.onclick = () => {
    if (currentChapter < chapters.length - 1) {
      currentChapter++;
      showChapter();
    }
  };

  navDiv.appendChild(prevBtn);
  navDiv.appendChild(nextBtn);
  document.body.appendChild(navDiv);
}

// Markdown parser for story content (white text, headings, paragraphs)
function parseMarkdownStory(md) {
  // Highlight FAQ link
  md = md.replace(
    /www\.equusSoft\/answers\.com/g,
    '<span class="equus-soft-faq-link" style="color:#00FF00;cursor:pointer;text-decoration:underline;">www.equusSoft/answers.com</span>'
  );
  // Highlight and make "skeleton" clickable in FAQ
  md = md.replace(
    /\bskeleton\b/g,
    '<span class="equus-soft-skeleton-link" style="color:#00FF00;cursor:pointer;text-decoration:underline;">skeleton</span>'
  );
  return md
    .replace(/^# (.*)$/gm, '<span style="font-size:2vw;font-weight:bold;">$1</span><br>')
    .replace(/^## (.*)$/gm, '<span style="font-size:1.5vw;font-weight:bold;">$1</span><br>')
    .replace(/\n{2,}/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

// --- Google Docs Viewer ---
function showGoogleDocsEditor() {
  // Hide story select and any story content
  document.getElementById('story-select').style.display = 'none';
  hideStoryContent();

  // Remove existing editor if present
  let editorDiv = document.getElementById('google-docs-editor');
  if (editorDiv) editorDiv.remove();

  // Create editor container
  editorDiv = document.createElement('div');
  editorDiv.id = 'google-docs-editor';

  // Create viewing iframe for Google Docs (use /preview for content only)
  const viewIframe = document.createElement('iframe');
  viewIframe.id = 'google-docs-iframe';
  viewIframe.src = "https://docs.google.com/document/d/1vDibC16hCYVIrFz9LB3uIOpQMhwFQo0RcP4GmukkGl4/preview";
  editorDiv.appendChild(viewIframe);

  // Link to create a copy (bottom center)
  const createLink = document.createElement('a');
  createLink.href = "https://docs.google.com/document/d/1vDibC16hCYVIrFz9LB3uIOpQMhwFQo0RcP4GmukkGl4/copy";
  createLink.target = "_blank";
  createLink.className = 'google-docs-home-btn';
  createLink.style.position = "fixed";
  createLink.style.bottom = "2vw";
  createLink.style.left = "50%";
  createLink.style.transform = "translateX(-50%)";
  createLink.style.textAlign = "center";
  createLink.textContent = "<Create Additional Personnel File>";
  editorDiv.appendChild(createLink);

  document.body.appendChild(editorDiv);
}

// --- Start Menu ---
function showStartMenu() {
  // Remove if already open
  let menu = document.getElementById('start-menu');
  if (menu) {
    menu.remove();
    return;
  }

  menu = document.createElement('div');
  menu.id = 'start-menu';

  // About entry
  const aboutEntry = document.createElement('div');
  aboutEntry.className = 'start-menu-entry';
  aboutEntry.onclick = () => {
    menu.remove();
    loadEquusSoftAbout();
  };

  const aboutIcon = document.createElement('img');
  aboutIcon.src = 'assets/about_icon.png';
  aboutIcon.alt = 'About';

  const aboutLabel = document.createElement('span');
  aboutLabel.textContent = 'About';

  aboutEntry.appendChild(aboutIcon);
  aboutEntry.appendChild(aboutLabel);

  menu.appendChild(aboutEntry);

  document.body.appendChild(menu);
}

// Make Equus Soft logo clickable to open start menu
function makeEquusSoftLogoClickable() {
  const icon = document.getElementById('taskbar-icon');
  if (icon) {
    icon.style.cursor = 'pointer';
    icon.onclick = showStartMenu;
  }
}

// Load Equus Soft About page styled like story pages
function loadEquusSoftAbout() {
  hideStoryContent();
  // Remove start menu if open
  const menu = document.getElementById('start-menu');
  if (menu) menu.remove();

  fetch('assets/stories/equus_soft_about.md')
    .then(res => res.text())
    .then(md => {
      // Use story content styling
      const contentDiv = document.createElement('div');
      contentDiv.id = 'story-content';
      contentDiv.className = 'story-content';
      contentDiv.innerHTML = parseMarkdownStory(md);
      document.body.appendChild(contentDiv);

      // Add click handler for FAQ link
      const faqLink = contentDiv.querySelector('.equus-soft-faq-link');
      if (faqLink) {
        faqLink.onclick = function() {
          loadEquusSoftFAQ();
        };
      }
    });
}

// Add this new function to load FAQ
function loadEquusSoftFAQ() {
  hideStoryContent();
  fetch('assets/stories/equus_soft_faq.md')
    .then(res => res.text())
    .then(md => {
      const contentDiv = document.createElement('div');
      contentDiv.id = 'story-content';
      contentDiv.className = 'story-content';
      contentDiv.innerHTML = parseMarkdownStory(md);
      document.body.appendChild(contentDiv);

      // Add click handler for "skeleton"
      const skeletonLink = contentDiv.querySelector('.equus-soft-skeleton-link');
      if (skeletonLink) {
        skeletonLink.onclick = function() {
          hideStoryContent();
          showHiddenConversation();
        };
      }
    });
}

// --- Hidden Conversation ---
async function showHiddenConversation() {
  // Stop regular music
  const storyMusic = document.getElementById('story-music');
  if (storyMusic) {
    storyMusic.pause();
    storyMusic.currentTime = 0;
  }

  // Play insert sound and laughter at start
  const insertSound = document.getElementById('insert-sound');
  const laughterSound = new Audio('assets/e_404_hidden_converstation_laughter.wav');
  insertSound.currentTime = 0;
  insertSound.play();
  setTimeout(() => {
    laughterSound.currentTime = 0;
    laughterSound.play();
  }, 700);

  // Remove any previous hidden conversation elements
  hideStoryContent();
  const prevConv = document.getElementById('hidden-conversation');
  if (prevConv) prevConv.remove();
  const prevConv2 = document.getElementById('hidden-conversation-bottom');
  if (prevConv2) prevConv2.remove();

  // Wait 2 seconds, then show green bordered rectangles and play new music
  setTimeout(async () => {
    // Play hidden conversation music
    let hiddenMusic = document.getElementById('hidden-conversation-music');
    if (!hiddenMusic) {
      hiddenMusic = document.createElement('audio');
      hiddenMusic.id = 'hidden-conversation-music';
      hiddenMusic.src = 'assets/hidden_conversation.wav';
      hiddenMusic.loop = true;
      document.body.appendChild(hiddenMusic);
    }
    hiddenMusic.currentTime = 0;
    hiddenMusic.play();

    // Create top rectangle
    const convDiv = document.createElement('div');
    convDiv.id = 'hidden-conversation';
    convDiv.style.position = 'absolute';
    convDiv.style.top = '0';
    convDiv.style.left = '0';
    convDiv.style.width = '100vw';
    convDiv.style.height = '50vh';
    convDiv.style.background = 'black';
    convDiv.style.display = 'flex';
    convDiv.style.alignItems = 'center';
    convDiv.style.zIndex = '999';
    convDiv.style.border = '8px solid #00FF00';
    convDiv.style.boxSizing = 'border-box';

    // Avatar square with green border, black inside
    const avatarDiv = document.createElement('div');
    avatarDiv.style.width = '20vh';
    avatarDiv.style.height = '20vh';
    avatarDiv.style.background = 'black';
    avatarDiv.style.display = 'flex';
    avatarDiv.style.alignItems = 'center';
    avatarDiv.style.justifyContent = 'center';
    avatarDiv.style.marginLeft = '4vw';
    avatarDiv.style.marginRight = '2vw';
    avatarDiv.style.border = '8px solid #00FF00';
    avatarDiv.style.boxSizing = 'border-box';

    const avatarImg = document.createElement('img');
    avatarImg.src = 'assets/orange_404.png';
    avatarImg.alt = 'Avatar';
    avatarImg.style.width = '90%';
    avatarImg.style.height = '90%';
    avatarImg.style.objectFit = 'contain';
    avatarDiv.appendChild(avatarImg);

    // Text area for NPC
    const textDiv = document.createElement('div');
    textDiv.id = 'hidden-conversation-text';
    textDiv.style.flex = '1';
    textDiv.style.height = '80%';
    textDiv.style.color = '#00FF00';
    textDiv.style.fontFamily = "'PerfectDOS', monospace";
    textDiv.style.fontSize = '2vw';
    textDiv.style.background = 'transparent';
    textDiv.style.marginLeft = '2vw';
    textDiv.style.marginRight = '4vw';
    textDiv.style.display = 'flex';
    textDiv.style.alignItems = 'center';
    textDiv.style.overflowY = 'auto'; // Make NPC box scrollable

    convDiv.appendChild(avatarDiv);
    convDiv.appendChild(textDiv);
    document.body.appendChild(convDiv);

    // Bottom rectangle (for questions)
    const convDivBottom = document.createElement('div');
    convDivBottom.id = 'hidden-conversation-bottom';
    convDivBottom.style.position = 'absolute';
    convDivBottom.style.top = '50vh';
    convDivBottom.style.left = '0';
    convDivBottom.style.width = '100vw';
    convDivBottom.style.height = '50vh';
    convDivBottom.style.background = 'black';
    convDivBottom.style.zIndex = '999';
    convDivBottom.style.border = '8px solid #00FF00';
    convDivBottom.style.boxSizing = 'border-box';
    convDivBottom.style.overflowY = 'auto';
    convDivBottom.style.display = 'flex';
    convDivBottom.style.flexDirection = 'column';
    convDivBottom.style.alignItems = 'flex-start';
    document.body.appendChild(convDivBottom);

    // Load and parse dialogue
    const dialogue = await fetch('assets/stories/hidden_skeleJester_conversation.md').then(r => r.text());
    const dialogueMap = parseDialogueMarkdown(dialogue);

    // Conversation state
    let currentId = 'greeting';
    let persistentQuestions = [];

    // Typing animation for NPC text (no textNoise, slower speed)
    function typeNpcText(text, callback) {
      let i = 0;
      let out = '';
      let tag = false;
      let wordBuffer = '';
      function type() {
        if (i < text.length) {
          if (text[i] === '<') tag = true;
          if (text[i] === '>') tag = false;
          out += text[i];
          textDiv.innerHTML = out;
          textDiv.scrollTop = textDiv.scrollHeight; // Auto-scroll as text types
          if (!tag) {
            if (/\s/.test(text[i])) {
              wordBuffer = '';
            } else {
              wordBuffer += text[i];
            }
          }
          i++;
          setTimeout(type, tag ? 0 : 55); // Slower speed
        } else {
          if (callback) callback();
        }
      }
      type();
    }

    // Render current dialogue
    function renderDialogue(id) {
      const entry = dialogueMap[id];
      if (!entry) return;
      textDiv.innerHTML = '';

      // Add new questions to persistentQuestions if not already present
      if (entry.questions && entry.questions.length > 0) {
        entry.questions.forEach(q => {
          if (!persistentQuestions.some(pq => pq.text === q.text && pq.next === q.next)) {
            persistentQuestions.push(q);
          }
        });
      }

      // Remove the question that was just clicked
      function removeQuestion(nextId) {
        persistentQuestions = persistentQuestions.filter(q => q.next !== nextId);
      }

      // Disable clicks until NPC finishes typing
      let questionClickEnabled = false;

      typeNpcText(entry.npc, () => {
        questionClickEnabled = true;
        convDivBottom.innerHTML = '';
        if (persistentQuestions.length > 0) {
          // Bulleted list
          const ul = document.createElement('ul');
          ul.style.listStyle = 'disc';
          ul.style.color = '#00FF00';
          ul.style.fontFamily = "'PerfectDOS', monospace";
          ul.style.fontSize = '2vw';
          ul.style.paddingLeft = '3vw';
          ul.style.marginTop = '2vw';
          ul.style.maxHeight = '40vh';
          ul.style.overflowY = 'auto';

          persistentQuestions.forEach((q, idx) => {
            const li = document.createElement('li');
            li.textContent = q.text;
            li.style.cursor = 'pointer';
            li.onclick = () => {
              if (!questionClickEnabled) return;
              questionClickEnabled = false;
              removeQuestion(q.next);
              renderDialogue(q.next);
            };
            ul.appendChild(li);

            // Add divider line after each question except the last
            if (idx < persistentQuestions.length - 1) {
              const divider = document.createElement('hr');
              divider.style.border = '0';
              divider.style.height = '2px';
              divider.style.background = '#00FF00';
              divider.style.margin = '8px 0';
              ul.appendChild(divider);
            }
          });
          convDivBottom.appendChild(ul);
        } else {
          // No questions left, show end dialogue
          if (id !== 'end' && dialogueMap['end']) {
            setTimeout(() => {
              renderDialogue('end');
            }, 1200);
          } else if (id === 'end') {
            setTimeout(() => {
              insertSound.currentTime = 0;
              insertSound.play();
              setTimeout(() => {
                laughterSound.currentTime = 0;
                laughterSound.play();
              }, 700);
              setTimeout(() => {
                convDiv.remove();
                convDivBottom.remove();
                if (hiddenMusic) {
                  hiddenMusic.pause();
                  hiddenMusic.currentTime = 0;
                }
                showStorySelect();
              }, 1200);
            }, 1200);
          }
        }
      });

      // Disable clicks while NPC is typing
      convDivBottom.innerHTML = '';
      if (persistentQuestions.length > 0) {
        const ul = document.createElement('ul');
        ul.style.listStyle = 'disc';
        ul.style.color = '#00FF00';
        ul.style.fontFamily = "'PerfectDOS', monospace";
        ul.style.fontSize = '2vw';
        ul.style.paddingLeft = '3vw';
        ul.style.marginTop = '2vw';
        ul.style.maxHeight = '40vh';
        ul.style.overflowY = 'auto';

        persistentQuestions.forEach(q => {
          const li = document.createElement('li');
          li.textContent = q.text;
          li.style.cursor = 'pointer';
          li.onclick = () => {
            if (!questionClickEnabled) return;
            questionClickEnabled = false;
            removeQuestion(q.next);
            renderDialogue(q.next);
          };
          ul.appendChild(li);
        });
        convDivBottom.appendChild(ul);
      }
    }

    renderDialogue(currentId);

  }, 2000);
}

// --- Markdown dialogue parser ---
function parseDialogueMarkdown(md) {
  const sections = md.split(/^---$/m);
  const map = {};
  sections.forEach(section => {
    const idMatch = section.match(/id:\s*([^\n]+)/);
    if (!idMatch) return;
    const id = idMatch[1].trim();
    const npcMatch = section.match(/npc:\s*([\s\S]*?)(?:questions:|$)/);
    const npc = npcMatch ? npcMatch[1].trim().replace(/\n+/g, ' ') : '';
    const questionsMatch = section.match(/questions:\s*([\s\S]*)/);
    let questions = [];
    if (questionsMatch && !/none/.test(questionsMatch[1])) {
      const qArr = [];
      const qRegex = /- text:\s*([^\n]+)\s*next:\s*([^\n]+)/g;
      let m;
      while ((m = qRegex.exec(questionsMatch[1])) !== null) {
        qArr.push({ text: m[1].trim(), next: m[2].trim() });
      }
      questions = qArr;
    }
    map[id] = { npc, questions };
  });
  return map;
}

// --- Initial Boot Sequence Click Handler ---
document.querySelector('#click-area rect').addEventListener('click', function() {
  document.getElementById('insert-sound').play();
  document.getElementById('start-bg').style.display = 'none';
  document.getElementById('click-area').style.display = 'none';
  document.getElementById('transition-bg').style.display = 'block';

  // Always hide Equus-Soft logo during transition animation
  const equusBrand = document.getElementById('equus-soft-brand');
  if (equusBrand) equusBrand.style.display = 'none';

  setTimeout(function() {
    document.getElementById('transition-bg').style.display = 'none';
    document.getElementById('black-screen').style.display = 'block';

    // Show Equus-Soft logo only during boot text animation
    if (equusBrand) equusBrand.style.display = 'block';

    // Show boot text and play boot sound
    const bootTextHtml = parseMarkdown(bootText);
    const bootTextDiv = document.getElementById('boot-text');
    bootTextDiv.style.display = 'block';
    typeText(bootTextDiv, bootTextHtml, document.getElementById('boot-sound'), 30);

    // Hide Equus-Soft logo after boot text animation is done
    // Add this inside typeText's completion callback:
    const originalTypeText = typeText;
    typeText = function(element, html, sound, speed = 30) {
      let i = 0;
      let tag = false;
      let out = '';
      sound.currentTime = 0;
      sound.play();

      function type() {
        if (i < html.length) {
          if (html[i] === '<') tag = true;
          if (html[i] === '>') tag = false;
          out += html[i];
          element.innerHTML = out;
          i++;
          setTimeout(type, tag ? 0 : speed);
        } else {
          sound.pause();
          if (equusBrand) equusBrand.style.display = 'none'; // Hide logo after animation
          setTimeout(showStorySelect, 800);
        }
      }
      type();
    };
    // Call the new typeText
    typeText(bootTextDiv, bootTextHtml, document.getElementById('boot-sound'), 30);
  }, 2000);
});