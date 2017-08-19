import fetch from 'node-fetch';

export interface NewsArticle {
  title: string;
  description: string;
  author: string;
  url: string;
}

export interface Crypto {
  title: string;
  x: string[];
  y: string[];
}

export class NewsService {

  techAPI = `https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ee582714b32645c8a48b8601e7267063`;
  newsAPI = `https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=top&apiKey=ee582714b32645c8a48b8601e7267063`;
  hnAPI = `https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points%3E100`;
  redditAPI = `https://www.reddit.com/user/tehRash/m/work.json`;
  ccAPI = `https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=60&aggregate=3&e=CCCAGG`;

  constructor () {}

  async getArticles (type: 'news' | 'tech'): Promise<NewsArticle[]> {
    let req = type === 'news' ? await fetch(this.newsAPI) : await fetch(this.techAPI);
    let data = await(await req.json());
    return data.articles.map(article => ({
      title: article.title,
      description: article.description,
      author: article.author,
      url: article.url
    }));
  }

  async hackerNews (): Promise<NewsArticle[]> {
    let data = await (await fetch(this.hnAPI)).json();
    return data.hits.map(article => ({
      title: `(${article.points} | ${article.num_comments}) ${article.title}`,
      description: ``,
      author: article.author,
      url: article.url ? article.url : `https://news.ycombinator.com/item?id=${article.objectID}`
    }));
  }

  async reddit (): Promise<NewsArticle[]> {
    let res = await (await fetch(this.redditAPI)).json();
    return res.data.children.map(article => ({
      title: `(${article.data.score} | ${article.data.num_comments}) ${article.data.title}`,
      url: article.data.url,
      author: article.data.author,
      description: ``
    }));
  }

  async crypto (): Promise<Crypto> {
    let res = await (await fetch(this.ccAPI)).json();
    return {
      title: 'ETH',
      x: res.Data.map(btc => new Date(btc.time * 1000).toTimeString().substr(0,8)),
      y: res.Data.map(btc => btc.close),
    };
  }

}
