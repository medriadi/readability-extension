// Debugging
console.log('makeReadable.js loaded');

// Store the original content to revert back if needed
let originalContent = null;

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableReadability') {
    if (!originalContent) {
      originalContent = document.body.innerHTML;  // Store original page content only once
    }
    // Enable readability with user settings
    makePageReadable(
      request.fontSize,
      request.colorMode,
      request.textAlign,
      request.lineHeight,
      request.fontFamily
    );
  } else if (request.action === 'disableReadability') {
    resetPageToOriginal();  // Restore the page to its original state
  }
});

// Function to apply Readability.js and style modifications
function makePageReadable(fontSize = '18px', colorMode = 'light', textAlign = 'left', lineHeight = '1.4', fontFamily = 'Arial') {
  console.log('Running readability with settings:', { fontSize, colorMode, textAlign, lineHeight, fontFamily });

  // Use Readability to extract the main article content
  let article = new Readability(document.cloneNode(true)).parse();

  if (article) {
    document.body.innerHTML = article.content;
    document.body.style.padding = '20px';
    document.body.style.lineHeight = lineHeight;
    document.body.style.fontFamily = fontFamily;
    document.body.style.fontSize = fontSize;
    document.body.style.textAlign = textAlign;

    // Apply the chosen color mode (light, dark, sepia)
    switch (colorMode) {
      case 'dark':
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#e0e0e0';
        break;
      case 'sepia':
        document.body.style.backgroundColor = '#f4ecd8';
        document.body.style.color = '#5b4636';
        break;
      default:
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
        break;
    }
  } else {
    console.log('Readability failed to parse the article.');
  }
}

// Function to restore the original page content
function resetPageToOriginal() {
  if (originalContent) {
    document.body.innerHTML = originalContent;  // Revert to the original content
    originalContent = null;  // Clear the stored original content
    console.log('Page has been reset to its original state.');
  }
}
