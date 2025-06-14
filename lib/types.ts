export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  applicationDeadline: string
  companyLogo: string
  remote: boolean
  experience: "Entry Level" | "Mid Level" | "Senior Level"
  category: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  bookmarkedJobs: string[]
}

export interface JobFilters {
  search: string
  location: string
  type: string
  experience: string
  remote: boolean | null
  category: string
}
