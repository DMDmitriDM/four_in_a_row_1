// index.js

import '../css/no_postcss/normalize.css';
import '../css/ok_postcss/style.css';

import icon from '../assets/images/number_4.ico';

import creatElements from './creat-elements.js';
import makePlay from './make-play.js';

const linkIcon = document.createElement('link');
linkIcon.rel = 'icon';
linkIcon.type = 'image/x-icon';
linkIcon.href = icon;
document.head.append(linkIcon);

// create elements
creatElements();
// make play
makePlay();

// document.addEventListener('DOMContentLoaded', () => {
//   const linkIcon = document.createElement('link');
//   linkIcon.rel = 'icon';
//   linkIcon.type = 'image/x-icon';
//   linkIcon.href = icon;
//   document.head.append(linkIcon);

//   // create elements
//   creatElements();
//   // make play
//   makePlay();
// });
