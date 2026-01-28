import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { mockBlogPosts } from '@/data/mockData';
import { Clock, User, ArrowLeft } from 'lucide-react';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            المدونة التعليمية
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            تعلم كل ما تحتاجه عن الاستيراد من الصين والتعامل مع المصانع
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 right-3 bg-secondary">
                    {post.category}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} دقائق</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
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

export default Blog;
