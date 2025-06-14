"use client"

import type { Job } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, Building } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const { user, bookmarkJob, unbookmarkJob, isBookmarked } = useAuth()
  const { toast } = useToast()
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      case "Part-time":
        return "bg-blue-900/30 text-blue-400 border-blue-500/30"
      case "Contract":
        return "bg-orange-900/30 text-orange-400 border-orange-500/30"
      case "Internship":
        return "bg-purple-900/30 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Entry Level":
        return "bg-emerald-900/30 text-emerald-400 border-emerald-500/30"
      case "Mid Level":
        return "bg-blue-900/30 text-blue-400 border-blue-500/30"
      case "Senior Level":
        return "bg-indigo-900/30 text-indigo-400 border-indigo-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Card className="card-dark card-dark-hover h-full border-0">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={job.companyLogo || "/placeholder.svg"}
                alt={`${job.company} logo`}
                width={56}
                height={56}
                className="rounded-xl shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
            </div>
            <div>
              <h3 className="font-bold text-xl text-white mb-1">{job.title}</h3>
              <div className="flex items-center text-gray-400">
                <Building className="h-4 w-4 mr-1" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className="text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 rounded-full p-2"
          >
            {bookmarked ? <BookmarkCheck className="h-5 w-5 text-purple-400" /> : <Bookmark className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-4">
          <div className="flex items-center text-gray-400">
            <MapPin className="h-4 w-4 mr-2 text-purple-400" />
            <span>{job.location}</span>
            {job.remote && (
              <Badge variant="secondary" className="ml-2 bg-green-900/30 text-green-400 border-green-500/30">
                Remote
              </Badge>
            )}
          </div>

          <div className="flex items-center text-gray-400">
            <DollarSign className="h-4 w-4 mr-2 text-green-400" />
            <span className="font-semibold text-white">{job.salary}</span>
          </div>

          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-2 text-blue-400" />
            <span>{job.type}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
            <Badge className={getExperienceColor(job.experience)}>{job.experience}</Badge>
            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
              {job.category}
            </Badge>
          </div>

          <p className="text-gray-300 line-clamp-3 leading-relaxed">{job.description}</p>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex space-x-3 w-full">
          <Button asChild className="flex-1 gradient-primary text-white btn-animate">
            <Link href={`/jobs/${job.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-900/20">
            Apply Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
