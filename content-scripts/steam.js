chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target === "content") {
    if (message.action === "getFreeGames") {
      // Search listing row structural parser logic
      const rows = document.querySelectorAll('.search_result_row');
      const freeGames = Array.from(rows).map(row => {
        const appId = row.getAttribute('data-ds-appid');
        return {
          title: row.querySelector('.title').innerText,
          link: row.href,
          appId: appId
        };
      });
      chrome.runtime.sendMessage({ target: "background", action: "claimFreeGames", data: { freeGames } });
    } else if (message.action === "claimGames") {
      const urlParams = new URLSearchParams(window.location.search);
      const appId = window.location.pathname.split('/')[2];
      if (appId) {
        chrome.runtime.sendMessage({ target: "background", action: "steamAddToCart", data: { appId } });
      }
    }
  }
});