"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ArticlesPage() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(searchParams.get("text") || '');
  const [sort, setSort] = useState(searchParams.get("sortOrder") || 'desc');
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [sort]);

  async function fetchData() {
    const res = await fetch(`/api/articles?query=${encodeURIComponent(text)}&sort=${sort}`);
    const data = await res.json();
    setArticles(data.articles);
    setLoading(true);
  }

  const onSortClicked = () => {
    setSort(sort === 'asc' ? 'desc' : 'asc');
  };

  const onSearchClicked = (e: any): void => {
    e.preventDefault();
    fetchData();
  };

  const onTextChanged = (e: any) => {
    setText(e.target.value)
  }

  return (
    <div className="container">
      <div className="main">
        <div className="main-title">Liste des articles</div>
        <form className="formSearch" onSubmit={onSearchClicked}>
          <input type="text" className="formSearch-text" onChange={onTextChanged} />
          <button type="submit" className="formSearch-submit">
            Rechercher
          </button>
          <input type="checkbox" id="my-sort" className="hidden" onClick={onSortClicked}/>
          <label className="formSearch-sort" htmlFor="my-sort">
            {sort === 'asc' ? '↑' : '↓'}
          </label>
        </form>

        {!loading ? (
          <div className="empty">En cours de chargement...</div>
        ) : articles.length === 0 ? (
          <div className="empty">Aucun article disponible.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {articles.map((a: any) => (
              <div key={a.id} className="articleCard">
                <h2 className="articleCard-title">{a.title}</h2>
                <p className="articleCard-description">
                  {a.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}