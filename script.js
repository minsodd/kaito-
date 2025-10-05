const icons = document.querySelectorAll('.icon');
const zones = document.querySelectorAll('.tier-dropzone');

// 드래그 이벤트
icons.forEach(icon => {
  icon.addEventListener('dragstart', e => {
    icon.classList.add('dragging');
    e.dataTransfer.setData('text/plain', icon.id);
  });
  icon.addEventListener('dragend', () => {
    icon.classList.remove('dragging');
    saveState();
  });
});

// 드롭존
zones.forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drag-over');
  });
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');

    const id = e.dataTransfer.getData('text/plain');
    const icon = document.getElementById(id);
    zone.appendChild(icon);
    saveState();
  });
});

// 저장
function saveState() {
  const state = {};
  zones.forEach(zone => {
    const tier = zone.dataset.tier;
    const iconIds = Array.from(zone.querySelectorAll('.icon')).map(icon => icon.id);
    state[tier] = iconIds;
  });
  localStorage.setItem('tierlist', JSON.stringify(state));
}

// 로드
function loadState() {
  const saved = localStorage.getItem('tierlist');
  if (!saved) return;
  const state = JSON.parse(saved);

  Object.keys(state).forEach(tier => {
    const zone = document.querySelector(`.tier-dropzone[data-tier="${tier}"]`);
    if (zone) {
      state[tier].forEach(id => {
        const icon = document.getElementById(id);
        if (icon) zone.appendChild(icon);
      });
    }
  });
}

loadState();
