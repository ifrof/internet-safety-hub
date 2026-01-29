import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogPost, getAllBlogPosts } from '@/data/blogContent';
import { Clock, User, ArrowRight, ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const { language, t, dir } = useLanguage();
  const [copied, setCopied] = useState(false);

  const post = slug ? getBlogPost(slug, language) : null;
  const allPosts = getAllBlogPosts(language);

  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const getLabels = () => {
    switch (language) {
      case 'en':
        return {
          notFound: 'Article not found',
          backToBlog: 'Back to Blog',
          readTime: 'min read',
          conclusion: 'Conclusion',
          shareArticle: 'Share Article',
          copyLink: 'Copy Link',
          copied: 'Copied!',
          relatedPosts: 'Related Articles'
        };
      case 'zh':
        return {
          notFound: '文章未找到',
          backToBlog: '返回博客',
          readTime: '分钟阅读',
          conclusion: '结论',
          shareArticle: '分享文章',
          copyLink: '复制链接',
          copied: '已复制!',
          relatedPosts: '相关文章'
        };
      default:
        return {
          notFound: 'المقال غير موجود',
          backToBlog: 'العودة للمدونة',
          readTime: 'دقائق قراءة',
          conclusion: 'الخلاصة',
          shareArticle: 'شارك المقال',
          copyLink: 'نسخ الرابط',
          copied: 'تم النسخ!',
          relatedPosts: 'مقالات ذات صلة'
        };
    }
  };

  const labels = getLabels();

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">{labels.notFound}</h1>
          <Link to="/blog">
            <Button>{labels.backToBlog}</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: labels.copied,
      description: language === 'ar' ? 'تم نسخ الرابط إلى الحافظة' : 
                   language === 'zh' ? '链接已复制到剪贴板' : 
                   'Link copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <BackArrow className="w-4 h-4" />
              {labels.backToBlog}
            </Link>
            
            <Badge className="bg-primary mb-4">{post.category}</Badge>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} {labels.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="-mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <article className="lg:col-span-3 prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {post.intro}
                </p>

                {post.sections.map((section, index) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">{section.title}</h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                ))}

                <div className="bg-primary/10 rounded-2xl p-6 mt-8">
                  <h3 className="font-bold mb-2">{labels.conclusion}</h3>
                  <p className="text-muted-foreground">{post.conclusion}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Share */}
                <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    {labels.shareArticle}
                  </h3>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                    >
                      <Facebook className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Facebook</span>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-sky-500" />
                      <span className="text-sm">Twitter</span>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-700/10 hover:bg-blue-700/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-blue-700" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      {copied ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                      <span className="text-sm">{copied ? labels.copied : labels.copyLink}</span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">{labels.relatedPosts}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {allPosts.filter(p => p.slug !== slug).slice(0, 3).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
              >
                <img
                  src={relatedPost.coverImage}
                  alt={relatedPost.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2 text-sm">{relatedPost.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
