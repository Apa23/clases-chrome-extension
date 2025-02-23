const btnScripting = document.getElementById("btnscript");
const pMessageElement = document.getElementById("message");

btnScripting.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const portTabActive = chrome.tabs.connect(tab.id, { name: "popup" });
  portTabActive.postMessage({ cmd: "scrap" });
  portTabActive.onMessage.addListener(function ({ message }) {
    pMessageElement.innerText = JSON.stringify(message, null, 2);
  });
});
