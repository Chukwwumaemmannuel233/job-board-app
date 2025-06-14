"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { mockJobs } from "@/lib/mock-data"
import DashboardLayout from "@/components/layout/dashboard-layout"
import JobCard from "@/components/jobs/job-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function BookmarksPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const bookmarkedJobs = mockJobs.filter((job) => user.bookmarkedJobs.includes(job.id))

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="card-dark rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Bookmarked Jobs</h1>
              <p className="text-gray-300 text-lg">Jobs you've saved for later</p>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Bookmark className="h-6 w-6" />
              <span className="text-2xl font-bold">{bookmarkedJobs.length}</span>
            </div>
          </div>
        </div>

        {bookmarkedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Card className="card-dark border-0">
            <CardContent className="text-center py-12">
              <Bookmark className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No bookmarked jobs yet</h3>
              <p className="text-gray-400 mb-6">Start bookmarking jobs you're interested in to keep track of them</p>
              <Button asChild className="gradient-primary text-white">
                <Link href="/dashboard">Browse Jobs</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
