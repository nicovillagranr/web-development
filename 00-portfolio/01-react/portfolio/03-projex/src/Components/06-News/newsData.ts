import newsImage1 from "../../assets/images/5-News/news-1.webp"
import newsImage2 from "../../assets/images/5-News/news-2.webp"
import newsImage3 from "../../assets/images/5-News/news-3.webp"

export interface NewsItem {
    id: number
    image: string
    title: string
    date: string
    datetime: string
    text: string
    author: string
}

export const news: NewsItem[] = [
    {
        id: 1,
        image: newsImage1,
        title: "Why performance matters more than features in early-stage products",
        date: "August 20, 2023",
        datetime: "2023-08-20",
        text: "In early products, speed, accessibility and clarity are often sacrificed for features. We explain why prioritizing fundamentals reduces technical debt and accelerates real growth.",
        author: "Projex Team",
    },
    {
        id: 2,
        image: newsImage2,
        title: "How we approach front-end architecture for scalable projects",
        date: "August 28, 2023",
        datetime: "2023-08-28",
        text: "From component structure to data separation, we share the principles we follow to keep front-end projects maintainable as they grow.",
        author: "Projex Team",
    },
    {
        id: 3,
        image: newsImage3,
        title: "Good UX is invisible: lessons from real client projects",
        date: "September 3, 2023",
        datetime: "2023-09-03",
        text: "Users rarely notice good UX, but they immediately feel when it's missing. Here are practical insights we apply to avoid friction and confusion.",
        author: "Projex Team",
    },
    {
        id: 4,
        image: newsImage1,
        title: "Why most websites fail before users read the content",
        date: "September 10, 2023",
        datetime: "2023-09-10",
        text: "Slow load times, poor hierarchy and unclear messaging cause users to leave before engaging. We break down the most common mistakes and how to avoid them.",
        author: "Projex Team",
    },
]
