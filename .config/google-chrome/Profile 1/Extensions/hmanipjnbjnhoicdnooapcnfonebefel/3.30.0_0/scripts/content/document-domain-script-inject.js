// Just injects a script which sets document domain.
// Enables cross-window communication between AliExpress subdomains. https://javascript.info/cross-window-communication
const script = document.createElement('script');
script.id = 'oberlo-document-domain';
script.setAttribute('data-runtime-id', chrome.runtime.id);
script.innerHTML = 'document.domain = \'aliexpress.com\';';
document.documentElement.appendChild(script);
