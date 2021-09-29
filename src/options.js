const $ = (path) => {
  return document.querySelector(path);
};

const $$ = (path) => {
  return document.querySelectorAll(path);
};

const getAllBookmarkFolders = async () => {
  const bookmarks = await browser.bookmarks.getTree();
  const folders = bookmarks[0].children.filter((bookmark) => Boolean(bookmark.children));
  folders.forEach((folder) => {
    const option = document.createElement('option');
    option.textContent = folder.title;
    $('#folders').appendChild(option);
  });
};

const saveOptions = async () => {
  const folder = $('#folders').value;
  browser.storage.local.set({ chosenBookmarkFolder: folder });
};

const restoreOptions = () => {
  getAllBookmarkFolders();
};

document.addEventListener('DOMContentLoaded', restoreOptions);
$('#save').addEventListener('click', saveOptions);
