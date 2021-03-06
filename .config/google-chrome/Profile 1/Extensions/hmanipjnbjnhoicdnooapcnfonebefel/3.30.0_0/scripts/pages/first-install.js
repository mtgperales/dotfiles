/* eslint-disable func-names, no-unused-vars, no-undef, prefer-arrow-callback */
const componentName = 'first-install';
const trackComponentAction = function (actionName = '') {
  window.chrome.runtime.sendMessage({
    action: 'TRACK_COMPONENT_ACTION_EVENT',
    data: {
      componentName,
      actionName,
    },
  });
};

const trackComponentView = function () {
  window.chrome.runtime.sendMessage({
    action: 'TRACK_COMPONENT_VIEW_EVENT',
    data: {
      componentName,
    },
  });
};

const addAnchorListeners = function () {
  const anchors = document.querySelectorAll('a');
  for (let i = 0; i < anchors.length; i += 1) {
    const self = anchors[i];
    self.addEventListener('click', function () {
      trackComponentAction(self.dataset.action);
    });
  }
};

const addExtensionAnchorListener = function () {
  const anchor = document.querySelector('.first-install__disclaimer a');
  anchor.addEventListener('click', function () {
    window.chrome.tabs.create({ url: 'chrome://extensions' });
  });
};

let videoPlayed = false;
function onPlayerStateChange(event) {
  if (!videoPlayed && event.data === YT.PlayerState.PLAYING) {
    trackComponentAction('video-started');
    videoPlayed = true;
  }
}

function onYouTubeIframeAPIReady() {
  return new YT.Player(document.querySelector('.first-install__video'), {
    height: '315',
    width: '560',
    videoId: '35_iTxQ6eog',
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

const onFirstInstall = function () {
  trackComponentView();
  addAnchorListeners();
  addExtensionAnchorListener();
};

onFirstInstall();
