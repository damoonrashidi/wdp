declare var Promise;
import * as blessed from 'blessed';
let screen = blessed.screen({smartCSR: true});
screen.title = `Waddup!?`;
import * as contrib from 'blessed-contrib';
import * as cp from 'child_process';
import { NewsArticle, NewsService } from './services/news.service';
import {
  redditBox,
  hnBox,
  newsBox,
  techBox,
  cryptoGraph
} from './boxes/';
let crypto;


const ns = new NewsService();
const boxes = [
  { name: 'reddit', box: redditBox, data: ns.reddit, },
  { name: 'hackernews', box: hnBox, data: ns.hackerNews, },
  { name: 'tech', box: techBox, data: ns.tech, },
  { name: 'news', box: newsBox, data: ns.news, },
]

async function initialRender (): Promise<any> {
  for (let box of boxes) {
    screen.append(box.box);
    box.data().then(d => {
      renderBox(d, box.box, box.name);
    });
  }
  crypto = await ns.crypto();
  let line = contrib.line(crypto);
  renderGraph(cryptoGraph);
}

function renderBox(items: NewsArticle[], box: blessed.Widgets.BoxElement, name: string) {
  let list = blessed.list({
    items: items.map(article => article.title),
    mouse: true,
    style: {
      selected: {bg: `#0f0`, fg: `#000`},
    },
    name: name
  });
  list.on('select', (item) => {
    let article = items[list.getItemIndex(item)];
    try {
      cp.exec(`open -a "Google Chrome" ${article.url}`);
    } catch (e) {
      /**
       * Could not get url for this list item.. weird.. 
       */
    }
  });
  box.append(list);
  screen.render();
}

function renderGraph (line: any) {
  screen.append(line);
  line.style = {
    left: '50%',
    height: '50%',
    top: '50%'
  };
  line.setData(crypto);
  screen.render();
}
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.render();
initialRender();