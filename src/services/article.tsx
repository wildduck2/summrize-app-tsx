import { articleTypes } from './store'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY
const url =
    'https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=https%3A%2F%2Ftime.com%2F6266679%2Fmusk-ai-open-letter%2F&length=3'
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com',
    },
}
export const ArticleApi = async (recivedUrl: string, ctx: articleTypes) => {
    try {
        const response = await fetch(url, options)
        const result = await response.text()
        ctx.gettingData!({ url: recivedUrl, summary: result })
        ctx.CheckingActive!(false)
        ctx.CheckingDone!(true)
        // }
    } catch (error) {
        console.error(error)
    }
}
