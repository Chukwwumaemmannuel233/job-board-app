"use client"

import { useAuth } from "@/components/providers/auth-provider"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Eye, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AnalyticsPage() {
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

  const stats = [
    { title: "Profile Views", value: "24", change: "+12%", icon: Eye, color: "text-blue-400" },
    { title: "Applications Sent", value: "0", change: "0%", icon: Target, color: "text-green-400" },
    { title: "Response Rate", value: "0%", change: "0%", icon: TrendingUp, color: "text-purple-400" },
    {
      title: "Jobs Bookmarked",
      value: user.bookmarkedJobs.length.toString(),
      change: "+5",
      icon: BarChart3,
      color: "text-orange-400",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="card-dark rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
              <p className="text-gray-300 text-lg">Track your job search performance</p>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-dark border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-gray-400">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-dark border-0">
          <CardContent className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">More analytics coming soon</h3>
            <p className="text-gray-400">Start applying to jobs to see detailed analytics about your job search</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
