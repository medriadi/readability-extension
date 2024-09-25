// Enable Readability with user settings
document.getElementById('apply-readability').addEventListener('click', () => {
	// Collect settings from dropdowns
	const fontSize = document.getElementById('font-size').value;
	const fontFamily = document.getElementById('font-family').value;
	const colorMode = document.getElementById('color-mode').value;
	const textAlign = document.getElementById('text-align').value;
	const lineHeight = document.getElementById('line-height').value;
  
	// Query the active tab and inject the content script
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		files: ['content_scripts/makeReadable.js']
	  }, () => {
		// Send the selected settings to the content script
		chrome.tabs.sendMessage(tabs[0].id, {
		  action: 'enableReadability',
		  fontSize: fontSize,
		  fontFamily: fontFamily,
		  colorMode: colorMode,
		  textAlign: textAlign,
		  lineHeight: lineHeight
		}, (response) => {
		  if (chrome.runtime.lastError) {
			console.error("Error sending message:", chrome.runtime.lastError);
		  } else {
			console.log("Readability mode applied.");
		  }
		});
	  });
	});
  });
  
  // Disable Readability
  document.getElementById('disable-readability').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		files: ['content_scripts/makeReadable.js']
	  }, () => {
		chrome.tabs.sendMessage(tabs[0].id, {
		  action: 'disableReadability'
		}, (response) => {
		  if (chrome.runtime.lastError) {
			console.error("Error sending message:", chrome.runtime.lastError);
		  } else {
			console.log("Readability mode disabled, page reverted.");
		  }
		});
	  });
	});
  });
  