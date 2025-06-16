"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DriverReputationTable } from "@/components/driver-reputation-table"

export default function ReputacionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("todos")

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reputación de Choferes</h1>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por ID o nombre del chofer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="excelente">Excelente</SelectItem>
            <SelectItem value="bueno">Bueno</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="malo">Malo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DriverReputationTable searchTerm={searchTerm} ratingFilter={ratingFilter} />
    </div>
  )
} 