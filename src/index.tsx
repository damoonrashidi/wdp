import * as blessed from 'blessed';
import * as contrib from 'blessed-contrib';
import * as cp from 'child_process';
import {NewsArticle, NewsService} from './services/news.service';
const ns = new NewsService();

let news, tech, reddit, hn, crypto;
let screen = blessed.screen({smartCSR: true});
screen.title = `Waddup!?`;

 //import boxes after screen is set up, otherwise blessed throws an error
import redditBox from './boxes/reddit.box';
import hackerNewsBox from './boxes/hackernews.box';
import newsBox from './boxes/news.box';
import techBox from './boxes/tech.box';
import cryptoGraph from './boxes/crypto.box'

const boxes = [
  {name: 'reddit', box: redditBox, url: 'https://www.reddit.com/user/tehRash/m/work'},
  {name: 'hn', box: hackerNewsBox, url: 'https://news.ycombinator.com'},
  {name: 'news', box: newsBox, url: 'http://www.aljazeera.com/news/'},
  {name: 'tech', box: techBox, url: 'https://thenextweb.com'},
];

let currentlyFocusedBox = 0;
boxes[0].box.focus();
for (let b of boxes) {
  screen.append(b.box);
  b.box.on('focus', () => screen.render());
}

function initialRender () {
  ns.getArticles('news')
    .then(news => renderBox(news, boxes.filter(b => b.name === 'news')[0].box));
  
  ns.getArticles('tech')
    .then(tech => renderBox(tech, boxes.filter(b => b.name === 'tech')[0].box));
  
  ns.reddit()
    .then(reddit => renderBox(reddit, boxes.filter(b => b.name === 'reddit')[0].box));
  
  ns.hackerNews()
    .then(hn => renderBox(hn, boxes.filter(b => b.name === 'hn')[0].box));
  
  ns.crypto().then(cryptoGraph => renderGraph(cryptoGraph));
}

function renderBox(items: any[], box: blessed.Widgets.BoxElement) {
  let list = blessed.list({
    items: items.map(article => `${article.title}`),
    mouse: true,
    style: {
      selected: {bg: `#0f0`, fg: `#000`},
    }
  });
  list.on('select', (item) => {
    try {
      const index = list.getItemIndex(item);
      let url = {
        'reddit': reddit[index].url,
        'news': news[index].url,
        'tech': tech[index].url,
        'hn': hn[index].url,
      }[list.parent.options.name];
      cp.exec(`open -a "Google Chrome" ${url}`);
    } catch (e) {

    }
  });
  box.append(list);
  screen.render();
}

function renderGraph (line: any) {
  screen.append(line);
  line.setData(crypto);
  screen.render();
}


screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.key(['n'], () => {
  currentlyFocusedBox = Math.min(currentlyFocusedBox + 1, boxes.length - 1);
  boxes[currentlyFocusedBox].box.focus();
});
screen.key(['p'], () => {
  currentlyFocusedBox = Math.max(currentlyFocusedBox - 1, 0);
  boxes[currentlyFocusedBox].box.focus();
});
screen.key(['o'], () => {
  cp.exec(`open -a "Google Chrome" ${boxes[currentlyFocusedBox].url}`);
});
screen.render();
initialRender();