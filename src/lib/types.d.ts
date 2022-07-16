export type BlogMetadata = {
    /**The slug for the blog post */
    slug: string,
    /**The description for the blog post */
    description: string,
    /** Title of blog post */
    title: string,
    /** The keywords of the blog post used for SEO */
    keywords: Array[],
    /** The date the blog post was written */
    date: Date,
    /** The url to the blog hero image */
    image: string,
    /** The category which the blog post belongs to */
    category: string,
    /** An array of tags for the blog post */
    tags: Array[],
    /** The reading time object for the blog post
     */
    readingTime: {
        text: String
    }

}
