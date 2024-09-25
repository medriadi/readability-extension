document.getElementById('apply-readability').addEventListener('click', () => {
	const fontSize = document.getElementById('font-size').value;  // Get selected font size
	const colorMode = document.getElementById('color-mode').value;  // Get selected color mode
	const textAlign = document.getElementById('text-align').value;  // Get selected text alignment
	const lineHeight = document.getElementById('line-height').value;  // Get selected line height
	
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  // Inject the content script if it's not already injected
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		files: ['content_scripts/makeReadable.js']
	  }, () => {
		// Send message to the content script with font size, color mode, text alignment, and line height
		chrome.tabs.sendMessage(tabs[0].id, { 
		  action: 'enableReadability', 
		  fontSize: fontSize, 
		  colorMode: colorMode,
		  textAlign: textAlign,
		  lineHeight: lineHeight 
		}, (response) => {
		  if (chrome.runtime.lastError) {
			console.error("Error sending message:", chrome.runtime.lastError);
		  } else {
			console.log("Response from content script:", response);
		  }
		});
	  });
	});
  });
  