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
function showHiddenConversation() {
  // Stop regular music
  const storyMusic = document.getElementById('story-music');
  if (storyMusic) {
    storyMusic.pause();
    storyMusic.currentTime = 0;
  }

  // Remove any story content
  hideStoryContent();

  // Remove any previous hidden conversation elements
  const prevConv = document.getElementById('hidden-conversation');
  if (prevConv) prevConv.remove();

  // Wait 2 seconds, then show green rectangle and play new music
  setTimeout(() => {
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

    // Create green rectangle container
    const convDiv = document.createElement('div');
    convDiv.id = 'hidden-conversation';
    convDiv.style.position = 'absolute';
    convDiv.style.top = '0';
    convDiv.style.left = '0';
    convDiv.style.width = '100vw';
    convDiv.style.height = '50vh';
    convDiv.style.background = '#00FF00';
    convDiv.style.display = 'flex';
    convDiv.style.alignItems = 'center';
    convDiv.style.zIndex = '999';

    // Avatar square
    const avatarDiv = document.createElement('div');
    avatarDiv.style.width = '20vh';
    avatarDiv.style.height = '20vh';
    avatarDiv.style.background = '#00FF00';
    avatarDiv.style.display = 'flex';
    avatarDiv.style.alignItems = 'center';
    avatarDiv.style.justifyContent = 'center';
    avatarDiv.style.marginLeft = '4vw';
    avatarDiv.style.marginRight = '2vw';

    const avatarImg = document.createElement('img');
    avatarImg.src = 'assets/orange_404.png';
    avatarImg.alt = 'Avatar';
    avatarImg.style.width = '90%';
    avatarImg.style.height = '90%';
    avatarImg.style.objectFit = 'contain';
    avatarDiv.appendChild(avatarImg);

    // Text area
    const textDiv = document.createElement('div');
    textDiv.id = 'hidden-conversation-text';
    textDiv.style.flex = '1';
    textDiv.style.height = '80%';
    textDiv.style.color = '#000';
    textDiv.style.fontFamily = "'PerfectDOS', monospace";
    textDiv.style.fontSize = '2vw';
    textDiv.style.background = 'transparent';
    textDiv.style.marginLeft = '2vw';
    textDiv.style.marginRight = '4vw';
    textDiv.style.display = 'flex';
    textDiv.style.alignItems = 'center';

    convDiv.appendChild(avatarDiv);
    convDiv.appendChild(textDiv);
    document.body.appendChild(convDiv);

    // Typing animation with sound every other character
    const greetingText = document.getElementById('greeting_npc')?.textContent || "Hello, I am the hidden NPC.";
    let i = 0;
    let out = '';
    let tag = false;
    const textSound = new Audio('assets/e_404_hidden_converstation_text_noise.wav');

    function type() {
      if (i < greetingText.length) {
        if (greetingText[i] === '<') tag = true;
        if (greetingText[i] === '>') tag = false;
        out += greetingText[i];
        textDiv.innerHTML = out;
        if (i % 2 === 1) {
          textSound.currentTime = 0;
          textSound.play();
        }
        i++;
        setTimeout(type, tag ? 0 : 30);
      }
    }
    type();

  }, 2000);
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