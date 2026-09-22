import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BookOpen, AlertCircle, Car } from 'lucide-react'
import { blogPosts } from '@/data/blogPosts'
import { ArticleReader } from '@/components/blog/ArticleReader'
import { Button } from '@/components/ui/Button'
import { SEO } from '@/components/seo/SEO'
import { getBlogPostSEOMetadata } from '@/data/seoRegistry'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
  const post = currentIndex !== -1 ? blogPosts[currentIndex] : undefined
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : undefined
  const nextPost = currentIndex !== -1 && currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : undefined

  const seoData = useMemo(() => {
    if (post) return getBlogPostSEOMetadata(post)
    return {
      title: 'Article Not Found | Love Kush Cars',
      description: 'The automotive guide you are looking for might have been updated or moved.',
      canonicalPath: `/blog/${slug || ''}`,
      noindex: true,
    }
  }, [post, slug])

  if (!post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-paper pt-32 pb-20">
        <SEO {...seoData} />
        <div className="text-center max-w-md mx-auto p-8 border border-line bg-mist shadow-sm">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-ink">
            Article Not Found
          </h2>
          <p className="text-xs text-slate mt-2 leading-relaxed">
            The automotive guide you are looking for might have been updated or moved.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/blog">
              <Button size="md" className="w-full sm:w-auto">
                <BookOpen className="h-4 w-4 mr-1.5" /> Back to Journal
              </Button>
            </Link>
            <Link to="/inventory">
              <Button variant="secondary" size="md" className="w-full sm:w-auto">
                <Car className="h-4 w-4 mr-1.5" /> View Certified Inventory
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO {...seoData} />
      <ArticleReader post={post} prevPost={prevPost} nextPost={nextPost} />
    </>
  )
}
