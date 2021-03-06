export async function getNewsTopHeadlines(pageSize, category) {
        var url = "https://newsapi.org/v2/top-headlines?country=fr&apiKey=5f7bf5b89bf047e2af71798d8984f30b";

        if (pageSize != null) {
            url = url + "&pageSize=" + pageSize
        }
        if (category != null) {
            url = url + "&category=" + category
        }
        let result = await fetch(url).then(response => response.json());
        return result.articles
}

export async function getNewsEverything(pageSize, category) {
    var url = "https://newsapi.org/v2/everything?language=fr&sortBy=popularity&apiKey=5f7bf5b89bf047e2af71798d8984f30b";

    if (pageSize != null) {
        url = url + "&pageSize=" + pageSize
    }
    if (category != null) {
        url = url + "&q=" + category
    }
    let result = await fetch(url).then(response => response.json());
    return result.articles
}
