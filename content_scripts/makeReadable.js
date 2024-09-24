console.log('makeReadable.js loaded');  // This is for debugging purposes

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableReadability') {
    makePageReadable();
  }
});

function makePageReadable() {
  console.log('Running readability function');  // Debugging
  let article = new Readability(document.cloneNode(true)).parse();

  if (article) {
    document.body.innerHTML = article.content;
    document.body.style.padding = '20px';
    document.body.style.lineHeight = '1.6';
    document.body.style.fontFamily = 'Arial, sans-serif';
  } else {
    console.log('Readability failed to parse the article.');
  }
}
