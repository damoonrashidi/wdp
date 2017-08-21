declare var Promise;
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

async function getArticles (type: 'news' | 'tech'): Promise<NewsArticle[]> {
  const newsAPI = `https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=top&apiKey=ee582714b32645c8a48b8601e7267063`;
  const techAPI = `https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=ee582714b32645c8a48b8601e7267063`;
  let req = type === 'news' ? await fetch(newsAPI) : await fetch(techAPI);
  let data = await(await req.json());
  return data.articles.map(article => ({
    title: article.title,
    description: article.description,
    author: article.author,
    url: article.url
  }));
}

export class NewsService {
  

  async tech (): Promise<NewsArticle[]> {
    return getArticles('tech');
  }

  async news (): Promise<NewsArticle[]> {
    return getArticles('news');
  }

  async hackerNews (): Promise<NewsArticle[]> {
    let hnAPI = `https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points%3E100`;
    let data = await (await fetch(hnAPI)).json();
    return data.hits.map(article => ({
      title: `(${article.points} | ${article.num_comments}) ${article.title}`,
      description: ``,
      author: article.author,
      url: article.url ? article.url : `https://news.ycombinator.com/item?id=${article.objectID}`
    }));
  }

  async reddit (): Promise<NewsArticle[]> {
    let redditAPI = `https://www.reddit.com/user/tehRash/m/work.json`;
    let res = await (await fetch(redditAPI)).json();
    return res.data.children.map(article => ({
      title: `(${article.data.score} | ${article.data.num_comments}) ${article.data.title}`,
      url: article.data.url,
      author: article.data.author,
      description: ``
    }));
  }

  async crypto (): Promise<Crypto> {
    let ccAPI = `https://min-api.cryptocompare.com/data/histoday?fsym=NXT&tsym=USD&limit=60&aggregate=3&e=CCCAGG`;
    let res = await (await fetch(ccAPI)).json();
    return {
      title: 'NXT',
      x: res.Data.map(cc => new Date(cc.time * 1000).toDateString().substr(0,10)),
      y: res.Data.map(cc => cc.close),
    };
  }

}
