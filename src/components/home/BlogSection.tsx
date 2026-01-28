import { Link } from 'react-router-dom';
import { mockBlogPosts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BlogSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              المدونة التعليمية
            </h2>
            <p className="text-muted-foreground text-lg">
              تعلم كل ما تحتاجه عن الاستيراد من الصين
            </p>
          </div>
          <Link to="/blog">
            <Button variant="outline" size="lg">
              جميع المقالات
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
