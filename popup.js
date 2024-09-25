// Function to load stored preferences
function loadPreferences() {
	chrome.storage.sync.get(['fontSize', 'fontFamily', 'colorMode', 'textAlign', 'lineHeight'], (result) => {
	  if (result.fontSize) {
		document.getElementById('font-size').value = result.fontSize;
	  }
	  if (result.fontFamily) {
		document.getElementById('font-family').value = result.fontFamily;
	  }
	  if (result.colorMode) {
		document.getElementById('color-mode').value = result.colorMode;
	  }
	  if (result.textAlign) {
		document.getElementById('text-align').value = result.textAlign;
	  }
	  if (result.lineHeight) {
		document.getElementById('line-height').value = result.lineHeight;
	  }
	});
  }
  
  // Function to save preferences when applying readability
  function savePreferences(fontSize, fontFamily, colorMode, textAlign, lineHeight) {
	chrome.storage.sync.set({
	  fontSize: fontSize,
	  fontFamily: fontFamily,
	  colorMode: colorMode,
	  textAlign: textAlign,
	  lineHeight: lineHeight
	});
  }
  
  // Apply Readability button click event
  document.getElementById('apply-readability').addEventListener('click', () => {
	const fontSize = document.getElementById('font-size').value;
	const fontFamily = document.getElementById('font-family').value;
	const colorMode = document.getElementById('color-mode').value;
	const textAlign = document.getElementById('text-align').value;
	const lineHeight = document.getElementById('line-height').value;
  
	// Save preferences
	savePreferences(fontSize, fontFamily, colorMode, textAlign, lineHeight);
  
	// Send message to content script to apply readability settings
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		files: ['content_scripts/makeReadable.js']
	  }, () => {
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
			console.log("Response from content script:", response);
		  }
		});
	  });
	});
  });
  
  // Disable readability button click event
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
  
  // Call loadPreferences when popup opens
  document.addEventListener('DOMContentLoaded', loadPreferences);
  