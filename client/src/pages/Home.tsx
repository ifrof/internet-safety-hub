import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Factory, MessageSquare, ShoppingCart, Users, Zap, Globe } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Factory className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">IFROF</span>
          </div>
          <div className="flex items-center gap-4">
            {!loading && user ? (
              <>
                <Link href="/marketplace">
                  <Button variant="ghost">Marketplace</Button>
                </Link>
                <Link href="/forum">
                  <Button variant="ghost">Community</Button>
                </Link>
                <Link href="/chatbot">
                  <Button variant="ghost">AI Assistant</Button>
                </Link>
                <Link href="/orders">
                  <Button variant="ghost">My Orders</Button>
                </Link>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button>Login</Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Direct Factory Marketplace
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Connect Directly with Factories Worldwide
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Eliminate intermediaries and source products directly from manufacturers. Get competitive prices, faster delivery, and better quality control.
          </p>
          <div className="flex gap-4 justify-center">
            {!loading && user ? (
              <>
                <Link href="/marketplace">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Browse Factories
                  </Button>
                </Link>
                <Link href="/chatbot">
                  <Button size="lg" variant="outline">
                    Get AI Help
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </a>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose IFROF?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Factory className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Direct Factory Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect directly with verified manufacturers. No middlemen, no hidden markups.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShoppingCart className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Competitive Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get factory prices directly. Compare quotes from multiple suppliers instantly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Fast Sourcing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find and connect with suppliers in minutes. Streamlined inquiry process.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Direct Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Chat directly with factory representatives. Clear communication, faster decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Community Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ask questions, share experiences, and learn from other buyers in our forum.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Global Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access thousands of verified factories across multiple industries worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Browse", desc: "Explore our catalog of verified factories" },
              { step: 2, title: "Inquire", desc: "Send detailed inquiries to factories" },
              { step: 3, title: "Negotiate", desc: "Chat directly to discuss terms and pricing" },
              { step: 4, title: "Order", desc: "Complete secure payment and track shipment" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">AI-Powered Sourcing Assistant</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get instant help finding the right factories, understanding products, and navigating the sourcing process with our intelligent AI chatbot.
          </p>
          {!loading && user ? (
            <Link href="/chatbot">
              <Button size="lg" variant="secondary">
                Start Chatting Now
              </Button>
            </Link>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="lg" variant="secondary">
                Login to Use AI Assistant
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Ideal Supplier?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of buyers who are already sourcing directly from factories and saving up to 40% on costs.
          </p>
          {!loading && user ? (
            <Link href="/marketplace">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Marketplace
              </Button>
            </Link>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started Free
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">IFROF</h3>
              <p className="text-sm">Direct factory marketplace connecting buyers with manufacturers worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Marketplace</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">AI Assistant</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 IFROF. All rights reserved. Connecting buyers with factories worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
