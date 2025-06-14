"use client"

import type { JobFilters } from "@/lib/types"
import { jobCategories, locations } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, X } from "lucide-react"

interface JobFiltersProps {
  filters: JobFilters
  onFiltersChange: (filters: JobFilters) => void
  onClearFilters: () => void
}

export default function JobFiltersComponent({ filters, onFiltersChange, onClearFilters }: JobFiltersProps) {
  const updateFilter = (key: keyof JobFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "" && value !== null && value !== false)

  return (
    <div className="card-dark rounded-2xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-bold text-white text-lg">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="text-sm font-semibold text-gray-300 mb-3 block">Location</label>
          <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-white hover:bg-slate-700">
                All Locations
              </SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location} className="text-white hover:bg-slate-700">
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div>
          <label className="text-sm font-semibold text-gray-300 mb-3 block">Job Type</label>
          <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-white hover:bg-slate-700">
                All Types
              </SelectItem>
              <SelectItem value="Full-time" className="text-white hover:bg-slate-700">
                Full-time
              </SelectItem>
              <SelectItem value="Part-time" className="text-white hover:bg-slate-700">
                Part-time
              </SelectItem>
              <SelectItem value="Contract" className="text-white hover:bg-slate-700">
                Contract
              </SelectItem>
              <SelectItem value="Internship" className="text-white hover:bg-slate-700">
                Internship
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="text-sm font-semibold text-gray-300 mb-3 block">Experience Level</label>
          <Select value={filters.experience} onValueChange={(value) => updateFilter("experience", value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-white hover:bg-slate-700">
                All Levels
              </SelectItem>
              <SelectItem value="Entry Level" className="text-white hover:bg-slate-700">
                Entry Level
              </SelectItem>
              <SelectItem value="Mid Level" className="text-white hover:bg-slate-700">
                Mid Level
              </SelectItem>
              <SelectItem value="Senior Level" className="text-white hover:bg-slate-700">
                Senior Level
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-semibold text-gray-300 mb-3 block">Category</label>
          <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-white hover:bg-slate-700">
                All Categories
              </SelectItem>
              {jobCategories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-slate-700">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Remote Work */}
        <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/20">
          <Checkbox
            id="remote"
            checked={filters.remote === true}
            onCheckedChange={(checked) => updateFilter("remote", checked ? true : null)}
            className="border-purple-400 data-[state=checked]:bg-purple-600"
          />
          <label htmlFor="remote" className="text-sm font-semibold text-gray-300 cursor-pointer">
            Remote Work Only
          </label>
        </div>
      </div>
    </div>
  )
}
