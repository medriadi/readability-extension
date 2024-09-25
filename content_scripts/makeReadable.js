console.log('makeReadable.js loaded');  // Debugging

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableReadability') {
    makePageReadable(request.fontSize, request.colorMode);  // Passing colorMode
  }
});

function makePageReadable(fontSize = '18px', colorMode = 'light') {  // Default values
  console.log('Running readability function with font size:', fontSize, 'and color mode:', colorMode);  // Debugging
  let article = new Readability(document.cloneNode(true)).parse();

  if (article) {
    document.body.innerHTML = article.content;
    document.body.style.padding = '20px';
    document.body.style.lineHeight = '1.6';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.fontSize = fontSize;

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
