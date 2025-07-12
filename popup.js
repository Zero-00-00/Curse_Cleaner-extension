const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

chrome.storage.sync.get("enabled", (data) => {
  const isEnabled = data.enabled !== false;
  toggle.checked = isEnabled;
  updateStatus(isEnabled);
});

toggle.addEventListener("change", () => {
  const isEnabled = toggle.checked;
  chrome.storage.sync.set({ enabled: isEnabled }, () => {
    updateStatus(isEnabled);
    // Reload the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
  });
});

function updateStatus(enabled) {
  status.innerHTML = `Filtering is <strong>${enabled ? "ON" : "OFF"}</strong>`;
}
