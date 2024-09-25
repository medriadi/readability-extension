console.log('makeReadable.js loaded');  // Debugging

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableReadability') {
    makePageReadable(request.fontSize, request.colorMode, request.textAlign, request.lineHeight);  // Pass alignment and line height
  }
});

function makePageReadable(fontSize = '18px', colorMode = 'light', textAlign = 'left', lineHeight = '1.4') {  // Default values
  console.log('Running readability with font size:', fontSize, 'color mode:', colorMode, 'text alignment:', textAlign, 'line height:', lineHeight);  // Debugging

  let article = new Readability(document.cloneNode(true)).parse();

  if (article) {
    document.body.innerHTML = article.content;
    document.body.style.padding = '20px';
    document.body.style.lineHeight = lineHeight;  // Apply line height
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.fontSize = fontSize;
    document.body.style.textAlign = textAlign;  // Apply text alignment

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
