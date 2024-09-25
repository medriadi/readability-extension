document.getElementById('apply-readability').addEventListener('click', () => {
	const fontSize = document.getElementById('font-size').value;
	const fontFamily = document.getElementById('font-family').value;  // Get selected font family
	const colorMode = document.getElementById('color-mode').value;
	const textAlign = document.getElementById('text-align').value;
	const lineHeight = document.getElementById('line-height').value;
  
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		files: ['content_scripts/makeReadable.js']
	  }, () => {
		chrome.tabs.sendMessage(tabs[0].id, {
		  action: 'enableReadability',
		  fontSize: fontSize,
		  fontFamily: fontFamily,  // Pass the font family
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
  
  // Disable readability mode
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
			console.log("Page reset to original content.");
		  }
		});
	  });
	});
  });
  