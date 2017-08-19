import * as blessed from 'blessed';
let screen = blessed.screen({smartCSR: true});
screen.title = `Waddup!?`;
import * as contrib from 'blessed-contrib';
import * as cp from 'child_process';
import { spawn } from 'threads';
import { NewsArticle, NewsService } from './services/news.service';
import {
  redditBox,
  hnBox,
  newsBox,
  techBox,
  cryptoGraph
} from './boxes/';


const ns = new NewsService();
const boxes = [
  {
    name: 'reddit',
    box: redditBox,
    data: ns.reddit,
  },
]

for (let box of boxes) {
  screen.append(box.box);
  const thread = spawn((data, done) => {
    data().then(d => done(d));
  })
  thread.send(box.data);
  thread.on('message', (items) => {
    console.log(`got items`, items);
    renderBox(items, box.box);
    thread.kill();
  });
}

async function initialRender () {
  // let crypto = await ns.crypto();
  // let line = contrib.line(crypto);
  // renderGraph(line);
}

function renderBox(items: NewsArticle[], box: blessed.Widgets.BoxElement) {
  let list = blessed.list({
    items: items.map(article => article.title),
    mouse: true,
    style: {
      selected: {bg: `#0f0`, fg: `#000`},
    }
  });
  screen.render();
  box.append(list);
  screen.render();
}

function renderGraph (line: any) {
  screen.append(line);
  line.setData(crypto);
  screen.render();
}
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
screen.render();
initialRender();