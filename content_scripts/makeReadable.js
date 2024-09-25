console.log('makeReadable.js loaded');  // Debugging

let originalContent = null;  // To store the original page content

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableReadability') {
    if (!originalContent) {
      originalContent = document.body.innerHTML;  // Store the original page content
    }
    makePageReadable(request.fontSize, request.colorMode, request.textAlign, request.lineHeight, request.fontFamily);
  } else if (request.action === 'disableReadability') {
    resetPageToOriginal();  // Call function to reset page
  }
});

function makePageReadable(fontSize = '18px', colorMode = 'light', textAlign = 'left', lineHeight = '1.4', fontFamily = 'Arial') {  // Add font family as a parameter
  console.log('Running readability with font size:', fontSize, 'color mode:', colorMode, 'text alignment:', textAlign, 'line height:', lineHeight, 'font family:', fontFamily);  // Debugging

  let article = new Readability(document.cloneNode(true)).parse();

  if (article) {
    document.body.innerHTML = article.content;
    document.body.style.padding = '20px';
    document.body.style.lineHeight = lineHeight;
    document.body.style.fontFamily = fontFamily;  // Apply font family
    document.body.style.fontSize = fontSize;
    document.body.style.textAlign = textAlign;

    // Apply the selected color mode
    switch (colorMode) {
      case 'dark':
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#e0e0e0';
        break;
      case 'sepia':
        document.body.style.backgroundColor = '#f4ecd8';
        document.body.style.color = '#5b4636';
        break;
      default:  // Light mode
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
        break;
    }
  } else {
    console.log('Readability failed to parse the article.');
  }
}

function resetPageToOriginal() {
  if (originalContent) {
    document.body.innerHTML = originalContent;  // Restore original content
    originalContent = null;  // Clear the saved original content
  }
}
