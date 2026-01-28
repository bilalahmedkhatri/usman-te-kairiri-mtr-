import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://carsinternational.com'

    // Static routes
    const routes = [
        '',
        '/inventory',
        '/about-us',
        '/how-to-buy',
        '/customer-review',
        '/contact',
        '/faq',
        '/regional-contacts',
        '/shipping-calculator',
        '/terms-payment',
        '/login',
        '/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}
