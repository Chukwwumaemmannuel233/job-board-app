"use client"

import { useAuth } from "@/components/providers/auth-provider"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function MessagesPage() {
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="card-dark rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
              <p className="text-gray-300 text-lg">Communicate with employers and recruiters</p>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <MessageSquare className="h-6 w-6" />
              <span className="text-2xl font-bold">0</span>
            </div>
          </div>
        </div>

        <Card className="card-dark border-0">
          <CardContent className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
            <p className="text-gray-400 mb-6">Start applying to jobs to receive messages from employers</p>
            <Button asChild className="gradient-primary text-white">
              <Link href="/dashboard">Browse Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
