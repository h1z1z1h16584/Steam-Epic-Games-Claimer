chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target === "content") {
    if (message.action === "getFreeGames") {
      // Logic for capturing list structural data inside store element spaces
      const gameCards = document.querySelectorAll('[data-testid="offer-card"]');
      const freeGames = Array.from(gameCards).map(card => {
        return {
          title: card.querySelector('[data-testid="offer-title"]')?.innerText,
          link: card.querySelector('a')?.href
        };
      });
      chrome.runtime.sendMessage({ target: "background", action: "claimFreeGames", data: { freeGames, loggedIn: true } });
    } else if (message.action === "claimGames") {
      // Simulate click event configurations to claim inside individual target nodes
      const claimButton = document.querySelector('button[data-testid="purchase-button"]');
      if (claimButton) claimButton.click();
    }
  }
});