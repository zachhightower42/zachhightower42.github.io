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

  // Home button
  const homeBtn = document.createElement('button');
  homeBtn.textContent = '(Home)';
  homeBtn.className = 'story-home-btn';
  homeBtn.id = 'story-home-btn';
  homeBtn.onclick = showStorySelect;
  document.body.appendChild(homeBtn);
}

// Markdown parser for story content (white text, headings, paragraphs)
function parseMarkdownStory(md) {
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

  // Home button (top left)
  const homeBtn = document.createElement('button');
  homeBtn.textContent = '(Home)';
  homeBtn.className = 'google-docs-home-btn';
  homeBtn.onclick = () => {
    editorDiv.remove();
    showStorySelect();
  };
  editorDiv.appendChild(homeBtn);

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

// --- Initial Boot Sequence Click Handler ---
document.querySelector('#click-area rect').addEventListener('click', function() {
  document.getElementById('insert-sound').play();
  document.getElementById('start-bg').style.display = 'none';
  document.getElementById('click-area').style.display = 'none';
  document.getElementById('transition-bg').style.display = 'block';
  setTimeout(function() {
    document.getElementById('transition-bg').style.display = 'none';
    document.getElementById('black-screen').style.display = 'block';

    // Show boot text and play boot sound
    const bootTextHtml = parseMarkdown(bootText);
    const bootTextDiv = document.getElementById('boot-text');
    bootTextDiv.style.display = 'block';
    typeText(bootTextDiv, bootTextHtml, document.getElementById('boot-sound'), 30);
  }, 2000); // Adjust duration to match your animation length
});