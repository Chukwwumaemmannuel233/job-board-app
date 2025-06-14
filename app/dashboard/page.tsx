"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { mockJobs } from "@/lib/mock-data"
import type { JobFilters } from "@/lib/types"
import DashboardLayout from "@/components/layout/dashboard-layout"
import JobCard from "@/components/jobs/job-card"
import JobFiltersComponent from "@/components/jobs/job-filters"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search, Briefcase, Bookmark, Clock, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const JOBS_PER_PAGE = 6

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    location: "",
    type: "",
    experience: "",
    remote: null,
    category: "",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<"all" | "bookmarked" | "applied">("all")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const filteredJobs = useMemo(() => {
    let jobsToFilter = mockJobs

    if (activeTab === "bookmarked") {
      jobsToFilter = mockJobs.filter((job) => user?.bookmarkedJobs.includes(job.id))
    } else if (activeTab === "applied") {
      // Mock applied jobs - in real app this would come from backend
      jobsToFilter = []
    }

    return jobsToFilter.filter((job) => {
      if (
        filters.search &&
        !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !job.company.toLowerCase().includes(filters.search.toLowerCase()) &&
        !job.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }
      if (filters.location && filters.location !== "all" && job.location !== filters.location) return false
      if (filters.type && filters.type !== "all" && job.type !== filters.type) return false
      if (filters.experience && filters.experience !== "all" && job.experience !== filters.experience) return false
      if (filters.category && filters.category !== "all" && job.category !== filters.category) return false
      if (filters.remote === true && !job.remote) return false
      return true
    })
  }, [filters, activeTab, user?.bookmarkedJobs])

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE)
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE)

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      type: "",
      experience: "",
      remote: null,
      category: "",
    })
    setCurrentPage(1)
  }

  if (!user) {
    return null
  }

  const bookmarkedJobs = mockJobs.filter((job) => user.bookmarkedJobs.includes(job.id))

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="card-dark rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-gray-300 text-lg">Ready to find your next opportunity?</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="gradient-primary text-white btn-animate">
                <Search className="h-4 w-4 mr-2" />
                Job Alerts
              </Button>
              <Button
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Career Insights
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-dark border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Available Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockJobs.length}</div>
              <p className="text-xs text-gray-400">+12% from last week</p>
            </CardContent>
          </Card>

          <Card className="card-dark border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Bookmarked</CardTitle>
              <Bookmark className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{bookmarkedJobs.length}</div>
              <p className="text-xs text-gray-400">Jobs saved for later</p>
            </CardContent>
          </Card>

          <Card className="card-dark border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Applications</CardTitle>
              <Clock className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">Jobs applied to</p>
            </CardContent>
          </Card>

          <Card className="card-dark border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Profile Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <p className="text-xs text-gray-400">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="card-dark rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, or keywords..."
                className="pl-12 h-12 bg-slate-800 border-slate-600 text-white placeholder-gray-400"
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <Button className="gradient-primary text-white btn-animate h-12 px-8">Search Jobs</Button>
          </div>
        </div>

        {/* Job Tabs */}
        <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg w-fit">
          {[
            { key: "all", label: "All Jobs", count: mockJobs.length },
            { key: "bookmarked", label: "Bookmarked", count: bookmarkedJobs.length },
            { key: "applied", label: "Applied", count: 0 },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as any)
                setCurrentPage(1)
              }}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFiltersComponent filters={filters} onFiltersChange={setFilters} onClearFilters={clearFilters} />
          </div>

          {/* Jobs Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {filteredJobs.length}{" "}
                {activeTab === "all" ? "Jobs" : activeTab === "bookmarked" ? "Bookmarked Jobs" : "Applied Jobs"} Found
              </h2>
            </div>

            {paginatedJobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="border-slate-600 text-gray-300 hover:bg-slate-700"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={
                            currentPage === page
                              ? "gradient-primary text-white"
                              : "border-slate-600 text-gray-300 hover:bg-slate-700"
                          }
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="border-slate-600 text-gray-300 hover:bg-slate-700"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 card-dark rounded-2xl">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {activeTab === "all"
                    ? "No jobs found"
                    : activeTab === "bookmarked"
                      ? "No bookmarked jobs"
                      : "No applications yet"}
                </h3>
                <p className="text-gray-400 mb-4">
                  {activeTab === "all"
                    ? "Try adjusting your filters to see more results"
                    : activeTab === "bookmarked"
                      ? "Start bookmarking jobs you're interested in"
                      : "Apply to some jobs to see them here"}
                </p>
                {activeTab !== "all" && (
                  <Button onClick={() => setActiveTab("all")} className="gradient-primary text-white">
                    Browse All Jobs
                  </Button>
                )}
                {activeTab === "all" && (
                  <Button onClick={clearFilters} className="gradient-primary text-white">
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
