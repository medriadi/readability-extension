document.getElementById('toggle-readability').addEventListener('click', () => {
	// Query the active tab in the current window
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  // Inject the content script dynamically
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		files: ['content_scripts/makeReadable.js']
	  }, () => {
		// Once injected, send the message to trigger readability
		chrome.tabs.sendMessage(tabs[0].id, { action: 'enableReadability' }, (response) => {
		  if (chrome.runtime.lastError) {
			console.error("Error sending message:", chrome.runtime.lastError);
		  } else {
			console.log("Response from content script:", response);
		  }
		});
	  });
	});
  });
  