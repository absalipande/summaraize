import { create } from 'zustand';
import axios from 'axios';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

interface Article {
  url: string;
  summary: string;
}

interface ArticleStore {
  article: Article;
  allArticles: Article[];
  copied: string;
  isFetching: boolean;
  error: { status: string; message?: string } | null;
  setArticle: (article: Article) => void;
  setAllArticles: (articles: Article[]) => void;
  setCopied: (copied: string) => void;
  getSummary: (url: string) => Promise<{ summary?: string }>;
}

const useArticleStore = create<ArticleStore>((set) => ({
  article: { url: '', summary: '' },
  allArticles: [],
  copied: '',
  isFetching: false,
  error: null,
  setArticle: (article) => set((state) => ({ ...state, article })),
  setAllArticles: (articles) =>
    set((state) => ({ ...state, allArticles: articles })),
  setCopied: (copied) => set((state) => ({ ...state, copied })),
  getSummary: async (url): Promise<{ summary?: string }> => {
    set((state) => ({ ...state, isFetching: true, error: null }));

    try {
      const response = await axios.get(
        `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
          url
        )}&length=3`,
        {
          headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host':
              'article-extractor-and-summarizer.p.rapidapi.com',
          },
        }
      );

      const data = response.data;

      if (data?.summary) {
        set((state) => ({
          ...state,
          article: { url: '', summary: data.summary },
          allArticles: [{ url, summary: data.summary }, ...state.allArticles],
          copied: '',
          isFetching: false,
          error: null,
        }));
        return { summary: data.summary };
      } else {
        set((state) => ({
          ...state,
          isFetching: false,
          error: { status: 'Unable to retrieve summary' },
        }));
        return { summary: undefined };
      }
    } catch (error) {
      set((state) => ({
        ...state,
        isFetching: false,
        error: { status: 'An error occurred' },
      }));
      throw error;
    }
  },
}));

export default useArticleStore;
