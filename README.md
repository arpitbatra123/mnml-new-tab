# mnml-new-tab

mnml-new-tab is a browser extension that replaces the new tab page.

## Story

To read the story behind why I made this extension, read my blog [post](https://arpitbatra.netlify.app/posts/mnml-new-tab/).

## Screenshot

![Screenshot of mnml-new-tab on firefox](https://arpitbatra.netlify.app/assets/images/mnml-firefox.png)


## Features

- runs on firefox and chromium based browsers which include chrome and microsoft edge.
- shows you the top 8 bookmarks from the folder you choose

## Tech Stack

- written in vanilla js
- uses [webextension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) APIs for cross browser support

## Development

- Clone the repo
- Install dependencies using `npm i`
- Run watch mode using `npm run watch`. This will build the extension as you make changes to the code.
- Load the unpacked extension, from the dist folder load unpacked extension in chrome - chrome://extensions or load temporary addon in firefox - about:debugging#/runtime/this-firefox

## Download

- [Firefox Extension](https://addons.mozilla.org/en-GB/firefox/addon/mnml-new-tab/)
- [Chrome Extension](https://chrome.google.com/webstore/detail/mnml-new-tab/mceanpcekehmcfalnmllidcfipajpeml?hl=en)

If you don't see any links, then you probably don't have any bookmarks in the folders that this extension picks them from. Use the "options" button to customize the folder.

## Thanks

- Contributions are welcome
- Questions? Ask away [@arpitbatra123](https://twitter.com/arpitbatra123) on twitter
