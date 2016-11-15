const baseUrl = 'http://www.omdbapi.com/?';

export function search(title, page) {
  return fetch(`${baseUrl}type=movie&s=${title}&page=${page}r=json`)
    .then(result => result.json())
    .then(result => {
      if (result.Response === "False") return [];

      return result.Search.map(item => ({
        ...item,
        Poster: item.Poster === 'N/A' ? null : item.Poster,
      }))
    });
}
