console.log('makeReadable.js loaded');  // Debugging

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableReadability') {
    makePageReadable(request.fontSize);  // Passing fontSize
  }
});

function makePageReadable(fontSize = '18px') {  // Default font size
  console.log('Running readability function with font size:', fontSize);  // Debugging
  let article = new Readability(document.cloneNode(true)).parse();

  if (article) {
    document.body.innerHTML = article.content;
    document.body.style.padding = '20px';
    document.body.style.lineHeight = '1.6';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.fontSize = fontSize;  // Applying the selected font size
  } else {
    console.log('Readability failed to parse the article.');
  }
}
