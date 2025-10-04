"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ArticlesPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [errors, setErrors] = useState<{ title?: string; summary?: string }>({});

  const router = useRouter();

  async function create() {    
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setErrors(errorData.error.fieldErrors);
    }
    else {
      await res.json();
      router.push("/articles");
    }
  }

  const onTitleChanged = (e: any) => {
    setTitle(e.target.value)
  }

  const onSummaryChanged = (e: any) => {
    setSummary(e.target.value)
  }

  return (
    <div className="container">
      <div className="main">
        <div className="main-title">Ajouter un article</div>
        <form className="form">
          <div className="form-group">
            <label className="form-group-label" htmlFor="title">Titre</label>
            <input className="form-group-input" id="title" type="text" placeholder="Titre" onChange={onTitleChanged} />
            {errors.title ? (<p className="form-group-error">{errors.title}</p>) : null}
          </div>
          <div className="form-group">
            <label className="form-group-label" htmlFor="summary">Résumé</label>
            <textarea className="form-group-input" id="summary" placeholder="Résumé..." onChange={onSummaryChanged}></textarea>
            {errors.summary ? (<p className="form-group-error">{errors.summary}</p>) : null}
          </div>
          <div className="flex items-center justify-center">
            <button className="form-submit w-full" type="button" onClick={create}>Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}