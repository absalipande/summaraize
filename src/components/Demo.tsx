import { useEffect, useState } from 'react';
import useArticleStore from '../services/store';
import { copy, loader, tick } from '../assets';
import debounce from 'lodash.debounce';

const Demo: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // state and functions from the custom hook
  const {
    article,
    allArticles,
    copied,
    setArticle,
    setAllArticles,
    setCopied,
    getSummary,
    isFetching,
  } = useArticleStore();

  useEffect(() => {
    // retrieved articles from the localStorage
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles') || 'null'
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  // debounce the handleSubmit so there's a gap before the user sends another request
  const debouncedHandleSubmit = debounce(async () => {
    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    try {
      const data: { summary?: string } = await getSummary(article.url);
      if (data.summary) {
        const newArticle = { ...article, summary: data.summary };
        const updatedAllArticles = [newArticle, ...allArticles];

        // update the state and localStorage with the new summarized article
        setArticle({ ...newArticle, url: '', summary: data.summary });
        setAllArticles(updatedAllArticles);
        localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
      }
    } catch (error) {
      console.log('An error occurred:', error);
      setErrorMessage(
        (error instanceof Error && error.message) || 'Unknown error occurred.'
      );
    }
  }, 500);

  // handle copy button click
  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(''), 3000);
  };

  // key event for the 'Enter' key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      debouncedHandleSubmit();
    }
  };

  return (
    <section className='mt-10 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form onSubmit={debouncedHandleSubmit} className='relative'>
          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-3 pr-10 text-sm shadow-sm font-satoshi font-medium focus:outline-none focus:ring-0'
          />
        </form>

        {/* Links history */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle({ ...item, url: item.url })}
              className='p-3 flex justify-start items-center flex-row bg-white border-gray-200 gap-3 rounded-lg cursor-pointer'
            >
              <div
                className='w-7 h-7 rounded-full bg-opacity-10 shadow-[inset_10px_-50px_94px_0_rg(199, 199, 199, 0.2)] backdrop-blur flex justify-center items-center cursor-pointer'
                onClick={() => handleCopy(item.url)}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? 'tick_icon' : 'copy_icon'}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-800 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : errorMessage ? (
          <p className='font-inter font-bold text-black text-center'>
            An error occurred:
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {errorMessage}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article Summary:
              </h2>
              <div className='border border-gray-500 rounded-md p-3'>
                <p className='font-inter text-gray-700'>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
