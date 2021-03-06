/* global XMLHttpRequest, chrome */
/* eslint-disable func-namesd, no-var, prefer-template */
function setupHelpPage(window, document, chrome) {
  var LOGGLY_SESSION_KEY = 'logglytrackingsession';
  var LOGGLY_SESSION_KEY_LENGTH = LOGGLY_SESSION_KEY.length + 1;

  var errorMessage = 'Failed to send data. Try again later.';
  var helpEndpointUrl = 'api/extension/bug-report';

  var reportUrl;
  var issueNode;
  var errorNode;
  var payload = {};

  var readLogglyCookie = function readLogglyCookie() {
    const cookie = document.cookie;
    const i = cookie.indexOf(LOGGLY_SESSION_KEY);

    if (i >= 0) {
      let end = cookie.indexOf(';', i + 1);
      end = end < 0 ? cookie.length : end;
      return cookie.slice(i + LOGGLY_SESSION_KEY_LENGTH, end);
    }

    return false;
  };

  var sendReport = function sendReport() {
    errorNode.innerText = '';
    payload.issue = issueNode.value;
    payload.reason = 'BUG_REPORT';

    try {
      // creating an asynchronous XMLHttpRequest
      const xhr = new XMLHttpRequest();
      xhr.open('POST', reportUrl, false); // true for asynchronous request
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function onLoad() {
        if (this.status === 200) {
          issueNode.value = '';
          payload = {};
          window.close();
        } else {
          errorNode.innerText = errorMessage;
        }
      };

      xhr.send(JSON.stringify(payload));
    } catch (ex) {
      errorNode.innerText = errorMessage;
    }
  };

  var init = function init() {
    const result = [];

    // get chrome extension manifest
    const manifest = chrome && chrome.runtime ? chrome.runtime.getManifest() : {};
    const extensionName = manifest.name;
    const extensionVersion = manifest.version;

    reportUrl = manifest.homepage_url + helpEndpointUrl;

    // get chrome version
    const chromeVersion = navigator.userAgent;

    // get loggly session id
    const sessionId = readLogglyCookie();

    result.push({
      key: 'sessionId',
      text: 'Session ID',
      value: sessionId || '',
    });

    result.push({
      key: 'chromeVersion',
      text: 'Chrome version',
      value: chromeVersion || '',
    });

    result.push({
      key: 'extensionName',
      text: 'Extension name',
      value: extensionName || '',
    });

    result.push({
      key: 'extensionVersion',
      text: 'Extension version',
      value: extensionVersion || '',
    });

    // get DOM elements
    const btnSendNode = document.getElementById('help-send');
    const infoListNode = document.getElementById('help-info');
    issueNode = document.getElementById('help-issue');
    errorNode = document.getElementById('help-error');

    for (let i = 0; i < result.length; i += 1) {
      // construct payload
      payload[result[i].key] = result[i].value;

      // print values
      const liNode = document.createElement('li');
      const textNode = document.createTextNode(result[i].text + ': ');
      const bNode = document.createElement('b');
      const valueNode = document.createTextNode(result[i].value);
      bNode.appendChild(valueNode);
      liNode.appendChild(textNode);
      liNode.appendChild(document.createElement('br'));
      liNode.appendChild(bNode);
      infoListNode.appendChild(liNode);
    }

    if (btnSendNode) {
      btnSendNode.addEventListener('click', sendReport);
    }
  };

  init();
}

setupHelpPage(window, document, chrome);
