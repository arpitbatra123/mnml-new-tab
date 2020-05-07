const datesToRoman = {
  '1': 'I',
  '2': 'II',
  '3': 'III',
  '4': 'IV',
  '5': 'V',
  '6': 'VI',
  '7': 'VII',
  '8': 'VIII',
  '9': 'IX',
  '10': 'X',
  '11': 'XI',
  '12': 'XII',
  '13': 'XIII',
  '14': 'XIV',
  '15': 'XV',
  '16': 'XVI',
  '17': 'XVII',
  '18': 'XVIII',
  '20': 'XX',
  '21': 'XXI',
  '22': 'XXII',
  '23': 'XXIII',
  '24': 'XXIV',
  '25': 'XXV',
  '26': 'XXVI',
  '27': 'XXVII',
  '28': 'XXVIII',
  '29': 'XXIX',
  '30': 'XXX',
  '31': 'XXXI'
};

const $ = (path) => {
  return document.querySelector(path);
};

const $$ = (path) => {
  return document.querySelectorAll(path);
};

const setQuote = async () => {
  try {
    const storage = await browser.storage.local.get();

    $('.quote').textContent = `"${!!storage.quote ? storage.quote : ''}"`;
    $('.author').textContent = `- ${!!storage.author ? storage.author : ''}`;
  } catch (e) {
    console.error(e);
  }
};

const setDate = () => {
  $('.roman-date-text').textContent = datesToRoman[new Date().getDate()];
};

const storeQuote = async (data) => {
  if (!data.contents) {
    return;
  }

  await browser.storage.local.set({
    quote: data.contents.quotes[0].quote,
    author: data.contents.quotes[0].author,
    fetchedAt: Date.now()
  });

  setQuote();
};

const fetchQuote = async () => {
  const storage = await browser.storage.local.get();
  const currentDay = Date.now();
  const timeout = 8 * 60 * 60 * 1000; // 8 hours in ms

  if (!storage.quote || currentDay - storage.fetchedAt > timeout) {
    fetch('https://quotes.rest/qod?language=en')
      .then((response) => response.json())
      .then((result) => {
        storeQuote(result);
      })
      .catch((error) => console.log('error', error));
    return;
  }

  setQuote();
};

const generateBookmarkItem = (bookmark) => {
  const linkTag = document.createElement('a');
  linkTag.classList.add('link');
  linkTag.href = bookmark.url;
  linkTag.setAttribute('target', '_blank');
  // https://web.dev/external-anchors-use-rel-noopener/
  linkTag.setAttribute('rel', 'noopener');

  // Display only the first word of the bookmark to preserve aesthetics
  linkTag.innerText = bookmark.title.split(' ')[0];

  return linkTag;
};

const processBookmarks = (bookmarks) => {
  const bookmarksOne = bookmarks.slice(0, 4);
  const columnOne = $$('.link-column')[0];
  bookmarksOne.forEach((bookmark) => columnOne.appendChild(generateBookmarkItem(bookmark)));

  const bookmarksTwo = bookmarks.slice(4, 8);
  const columnTwo = $$('.link-column')[1];
  bookmarksTwo.forEach((bookmark) => columnTwo.appendChild(generateBookmarkItem(bookmark)));
};

const getBookmarksFolder = async () => {
  // Name of the folder in chrome
  let bookmarksIdentifier = 'Bookmarks Bar';

  // This function only exists in firefox
  if (browser.runtime.getBrowserInfo) {
    bookmarksIdentifier = 'Bookmarks Toolbar';
  }

  const bookmarks = await browser.bookmarks.getTree();
  let bookmarksFolder = bookmarks[0].children.find((child) => child.title === bookmarksIdentifier);

  // If even the firefox folder isn't found then this is probably edge
  if (!bookmarksFolder) {
    bookmarksFolder = bookmarks[0].children.find((child) => child.title === 'Favourites Bar');
  }

  return bookmarksFolder;
};

const fetchBookmarks = async () => {
  const bookmarksBar = await getBookmarksFolder();
  processBookmarks(bookmarksBar.children);
};

// Fetch quote
fetchQuote();

// Set roman date
setDate();

// fetch and set bookmarks
fetchBookmarks();
