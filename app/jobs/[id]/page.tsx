"use client"

import { useParams } from "next/navigation"
import { mockJobs } from "@/lib/mock-data"
import Navbar from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Clock, DollarSign, Building, Users, Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function JobDetailPage() {
  const params = useParams()
  const { user, bookmarkJob, unbookmarkJob, isBookmarked } = useAuth()
  const { toast } = useToast()

  const job = mockJobs.find((j) => j.id === params.id)

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    )
  }

  const bookmarked = isBookmarked(job.id)

  const handleBookmark = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to bookmark jobs",
        variant: "destructive",
      })
      return
    }

    if (bookmarked) {
      unbookmarkJob(job.id)
      toast({
        title: "Job Removed",
        description: "Job removed from bookmarks",
      })
    } else {
      bookmarkJob(job.id)
      toast({
        title: "Job Bookmarked",
        description: "Job added to your bookmarks",
      })
    }
  }

  const handleApply = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to apply for jobs",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully!",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-6 text-gray-300 hover:text-white hover:bg-slate-700">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>

        <div className="card-dark rounded-lg border-0 overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-slate-700">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={job.companyLogo || "/placeholder.svg"}
                  alt={`${job.company} logo`}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleBookmark}
                  className="border-slate-600 text-gray-300 hover:bg-slate-700"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="h-4 w-4 mr-2 text-purple-400" />
                  ) : (
                    <Bookmark className="h-4 w-4 mr-2" />
                  )}
                  {bookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button onClick={handleApply} size="lg" className="gradient-primary text-white">
                  Apply Now
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Badge variant="secondary" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {job.type}
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                {job.salary}
              </Badge>
              <Badge variant="secondary" className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {job.experience}
              </Badge>
              <Badge variant="secondary">{job.category}</Badge>
              {job.remote && <Badge variant="secondary">Remote</Badge>}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Job Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-600 mr-2">•</span>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Posted Date</span>
                      <span className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Deadline</span>
                      <span className="font-medium">{new Date(job.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Job Type</span>
                      <span className="font-medium">{job.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-medium">{job.experience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Remote Work</span>
                      <span className="font-medium">{job.remote ? "Yes" : "No"}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>About {job.company}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">
                      {job.company} is a leading company in the {job.category.toLowerCase()} industry, committed to
                      innovation and excellence. Join our team and be part of something amazing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
