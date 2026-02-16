import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { blogPosts } from '@/data/blog';
import heroImage from '/herosection.jpg';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Real Estate 360 Blog"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Real Estate Blog
            </h1>
            <p className="mt-3 sm:mt-4 font-sans text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              The latest news, tips, and insights from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-4 sm:mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="bg-gold text-primary text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <p className="text-charcoal-light text-xs sm:text-sm mb-1 sm:mb-2">{post.date}</p>
                <h3 className="font-serif text-lg sm:text-xl text-primary mb-2 sm:mb-3 group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-charcoal-light text-xs sm:text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;