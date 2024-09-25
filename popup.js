document.getElementById('apply-readability').addEventListener('click', () => {
	const fontSize = document.getElementById('font-size').value;  // Get selected font size
	const colorMode = document.getElementById('color-mode').value;  // Get selected color mode
	
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  // Inject the content script if it's not already injected
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		files: ['content_scripts/makeReadable.js']
	  }, () => {
		// Send message to the content script with font size and color mode
		chrome.tabs.sendMessage(tabs[0].id, { action: 'enableReadability', fontSize: fontSize, colorMode: colorMode }, (response) => {
		  if (chrome.runtime.lastError) {
			console.error("Error sending message:", chrome.runtime.lastError);
		  } else {
			console.log("Response from content script:", response);
		  }
		});
	  });
	});
  });
  