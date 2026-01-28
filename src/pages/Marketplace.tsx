import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockFactories, categories } from '@/data/mockData';
import { Search, Filter, Star, CheckCircle, MapPin, ArrowLeft, Grid, List } from 'lucide-react';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredFactories = mockFactories.filter(factory => {
    const matchesSearch = factory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factory.mainProducts.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || factory.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="bg-secondary pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            سوق المصانع
          </h1>
          <p className="text-white/70 text-lg mb-8">
            تصفح +500 مصنع صيني موثق ومعتمد
          </p>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن مصنع أو منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 py-6 text-lg"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 py-6">
                <Filter className="w-4 h-4 ml-2" />
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.icon} {cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="py-6 px-6"
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="py-6 px-6"
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Factories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              عرض {filteredFactories.length} مصنع
            </p>
          </div>

          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredFactories.map((factory) => (
              <Link
                key={factory.id}
                to={`/factory/${factory.id}`}
                className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Cover Image */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-40'}`}>
                  <img
                    src={factory.coverImage}
                    alt={factory.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {factory.verificationStatus === 'verified' && (
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white gap-1">
                      <CheckCircle className="w-3 h-3" />
                      موثق
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={factory.logo}
                      alt={factory.name}
                      className="w-12 h-12 rounded-lg object-cover border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {factory.name}
                      </h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{factory.location}</span>
                      </div>
                    </div>
                  </div>

                  <Badge variant="secondary" className="mb-3">{factory.category}</Badge>

                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{factory.rating}</span>
                      <span className="text-muted-foreground">({factory.reviewsCount})</span>
                    </div>
                    <span className="text-muted-foreground">رد {factory.responseTime}</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {factory.mainProducts.slice(0, 4).join(' • ')}
                  </p>

                  {viewMode === 'list' && (
                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        الحد الأدنى: ${factory.minOrderValue}
                      </span>
                      <Button variant="ghost" size="sm" className="mr-auto">
                        عرض التفاصيل
                        <ArrowLeft className="w-4 h-4 mr-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filteredFactories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">لم يتم العثور على مصانع</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                إعادة ضبط البحث
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Marketplace;
