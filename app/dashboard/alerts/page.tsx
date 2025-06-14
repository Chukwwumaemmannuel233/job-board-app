"use client"

import { useAuth } from "@/components/providers/auth-provider"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AlertsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [alertName, setAlertName] = useState("")
  const [keywords, setKeywords] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="card-dark rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Job Alerts</h1>
              <p className="text-gray-300 text-lg">Get notified when new jobs match your criteria</p>
            </div>
            <div className="flex items-center space-x-2 text-yellow-400">
              <Bell className="h-6 w-6" />
              <span className="text-2xl font-bold">0</span>
            </div>
          </div>
        </div>

        {/* Create Alert Form */}
        <Card className="card-dark border-0">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Create New Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Alert Name</label>
              <Input
                value={alertName}
                onChange={(e) => setAlertName(e.target.value)}
                placeholder="e.g., Frontend Developer Jobs"
                className="bg-slate-800 border-slate-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., React, JavaScript, Frontend"
                className="bg-slate-800 border-slate-600 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="remote" className="text-white hover:bg-slate-700">
                    Remote
                  </SelectItem>
                  <SelectItem value="san-francisco" className="text-white hover:bg-slate-700">
                    San Francisco, CA
                  </SelectItem>
                  <SelectItem value="new-york" className="text-white hover:bg-slate-700">
                    New York, NY
                  </SelectItem>
                  <SelectItem value="austin" className="text-white hover:bg-slate-700">
                    Austin, TX
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="gradient-primary text-white">
              <Bell className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </CardContent>
        </Card>

        {/* No Alerts State */}
        <Card className="card-dark border-0">
          <CardContent className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No job alerts yet</h3>
            <p className="text-gray-400">Create your first job alert to get notified about new opportunities</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
