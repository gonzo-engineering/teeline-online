export async function load({ params }) {
    const post = await import(`../../../learn-content/${params.slug}.svx`)
    const title = post.metadata.title
    const content = post.default

    return {
        title,
        content
    }
}