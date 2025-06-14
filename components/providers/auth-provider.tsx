"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  bookmarkJob: (jobId: string) => void
  unbookmarkJob: (jobId: string) => void
  isBookmarked: (jobId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("jobhub-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email === "admin@jobhub.com" && password === "admin123") {
      const adminUser: User = {
        id: "admin",
        name: "Admin User",
        email: "admin@jobhub.com",
        role: "admin",
        bookmarkedJobs: [],
      }
      setUser(adminUser)
      localStorage.setItem("jobhub-user", JSON.stringify(adminUser))
      return true
    } else if (email && password) {
      const regularUser: User = {
        id: "user1",
        name: "John Doe",
        email: email,
        role: "user",
        bookmarkedJobs: JSON.parse(localStorage.getItem("bookmarked-jobs") || "[]"),
      }
      setUser(regularUser)
      localStorage.setItem("jobhub-user", JSON.stringify(regularUser))
      return true
    }
    return false
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup
    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
        bookmarkedJobs: [],
      }
      setUser(newUser)
      localStorage.setItem("jobhub-user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("jobhub-user")
  }

  const bookmarkJob = (jobId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      bookmarkedJobs: [...user.bookmarkedJobs, jobId],
    }
    setUser(updatedUser)
    localStorage.setItem("jobhub-user", JSON.stringify(updatedUser))
    localStorage.setItem("bookmarked-jobs", JSON.stringify(updatedUser.bookmarkedJobs))
  }

  const unbookmarkJob = (jobId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      bookmarkedJobs: user.bookmarkedJobs.filter((id) => id !== jobId),
    }
    setUser(updatedUser)
    localStorage.setItem("jobhub-user", JSON.stringify(updatedUser))
    localStorage.setItem("bookmarked-jobs", JSON.stringify(updatedUser.bookmarkedJobs))
  }

  const isBookmarked = (jobId: string): boolean => {
    return user?.bookmarkedJobs.includes(jobId) || false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        bookmarkJob,
        unbookmarkJob,
        isBookmarked,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
