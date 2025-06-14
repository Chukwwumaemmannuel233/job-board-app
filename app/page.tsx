"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Briefcase,
  Users,
  MapPin,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Globe,
  Zap,
  Shield,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "10,000+", color: "from-blue-500 to-cyan-500" },
    { icon: Users, label: "Companies", value: "2,500+", color: "from-purple-500 to-pink-500" },
    { icon: MapPin, label: "Locations", value: "150+", color: "from-green-500 to-teal-500" },
    { icon: Star, label: "Success Rate", value: "95%", color: "from-orange-500 to-red-500" },
  ]

  const features = [
    {
      icon: Search,
      title: "Smart Job Matching",
      description:
        "Our AI-powered algorithm matches you with the perfect job opportunities based on your skills and preferences.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description:
        "Access job opportunities from companies worldwide, including remote positions and international roles.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Track your career progress and get personalized recommendations to advance in your chosen field.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: Award,
      title: "Top Companies",
      description:
        "Connect with industry-leading companies and startups that are actively hiring talented professionals.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Instant Applications",
      description: "Apply to multiple jobs with one click using your saved profile and customized cover letters.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure with enterprise-grade encryption and privacy controls you can trust.",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      content:
        "JobHub helped me land my dream job at Google. The platform's job matching algorithm is incredibly accurate!",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Microsoft",
      content: "The best job platform I've ever used. Found multiple opportunities and got hired within 2 weeks!",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "UX Designer at Apple",
      content: "JobHub's interface is intuitive and the job recommendations are spot-on. Highly recommend!",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-primary py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Find Your Dream Job
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                    Today
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                  Discover amazing opportunities from top companies worldwide. Your perfect career match is just a click
                  away.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 btn-animate px-8" asChild>
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-600 btn-animate px-8"
                  >
                    Watch Demo
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="glass-effect rounded-xl p-4 text-center">
                      <div
                        className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                      >
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="float-animation">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-30"></div>
                    <div className="relative glass-effect rounded-3xl p-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-white">
                            <div className="font-semibold">Job Match Found!</div>
                            <div className="text-sm opacity-80">Senior Developer at TechCorp</div>
                          </div>
                        </div>
                        <div className="glass-effect rounded-lg p-4">
                          <div className="text-white text-sm">
                            <div className="flex justify-between mb-2">
                              <span>Match Score</span>
                              <span className="font-bold">95%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-[95%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose JobHub?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing the way people find jobs with cutting-edge technology and personalized experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-dark card-dark-hover border-0">
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Get hired in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and build your professional profile with skills, experience, and preferences.",
                icon: Users,
              },
              {
                step: "02",
                title: "Get Matched",
                description: "Our AI algorithm finds the perfect job opportunities that match your profile.",
                icon: Target,
              },
              {
                step: "03",
                title: "Apply & Get Hired",
                description: "Apply to jobs with one click and track your applications until you get hired.",
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300">See what our users have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-dark card-dark-hover border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of professionals who have found their dream jobs through JobHub. Your next opportunity is
            waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 btn-animate px-8" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 btn-animate px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
