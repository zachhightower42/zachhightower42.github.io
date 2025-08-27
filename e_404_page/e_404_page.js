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

const storyFiles = [
  { name: "double_life", label: "Double Life" },
  { name: "butterfly_effect", label: "Butterfly Effect" }
];

function parseMarkdown(md) {
  // Simple markdown to HTML conversion for headings and line breaks
  return md
    .replace(/^# (.*)$/gm, '<span style="font-size:2.5vw;font-weight:bold;">$1</span>')
    .replace(/^## (.*)$/gm, '<span style="font-size:2vw;font-weight:bold;">$1</span>')
    .replace(/\n/g, '<br>');
}

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

// Add chapter tracking and story loading
let currentStory = null;
let currentChapter = 0;
let chapters = [];

function showStorySelect() {
  // Hide story content if present
  hideStoryContent();

  // Hide boot text
  document.getElementById('boot-text').style.display = 'none';

  // Show story select screen
  const storySelect = document.getElementById('story-select');
  storySelect.innerHTML = '';
  storySelect.style.display = 'flex';

  // Play background music at reduced volume
  const music = document.getElementById('story-music');
  music.currentTime = 0;
  music.volume = 0.2;
  music.play();

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
}

function hideStoryContent() {
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

  // Create navigation buttons
  const navDiv = document.createElement('div');
  navDiv.id = 'story-nav';
  navDiv.className = 'story-nav';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '< Previous Chapter';
  prevBtn.disabled = currentChapter === 0;
  prevBtn.onclick = () => {
    if (currentChapter > 0) {
      currentChapter--;
      showChapter();
    }
  };

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next Chapter >';
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