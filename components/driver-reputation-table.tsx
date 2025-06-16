"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Star } from "lucide-react"
import { SortableHeader } from "@/components/ui/sortable-header"
import { Hash, User, Calendar, Star as StarIcon, MessageSquare } from "lucide-react"
import { ViewDriverReputationModal } from "@/components/view-driver-reputation-modal"

interface DriverReputationTableProps {
  searchTerm?: string
  ratingFilter?: string
}

export function DriverReputationTable({
  searchTerm = "",
  ratingFilter = "todos",
}: DriverReputationTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc" | null
  }>({ key: "", direction: null })

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [drivers, setDrivers] = useState([
    {
      id: "CH-1001",
      nombre: "Juan Pérez",
      viajesCompletados: 45,
      calificacionPromedio: 4.8,
      ultimaCalificacion: "15/03/2024",
      comentarios: 38,
      estado: "Excelente",
    }
  ])

  const sortedAndFilteredDrivers = useMemo(() => {
    let filtered = drivers.filter((driver) => {
      const matchesSearch =
        searchTerm === "" ||
        driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.nombre.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRating = ratingFilter === "todos" || driver.estado.toLowerCase() === ratingFilter

      return matchesSearch && matchesRating
    })

    if (sortConfig.key && sortConfig.direction) {
      filtered = [...filtered].sort((a: any, b: any) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        if (sortConfig.key === "calificacionPromedio" || sortConfig.key === "viajesCompletados") {
          aValue = Number(aValue)
          bValue = Number(bValue)
        } else if (sortConfig.key === "ultimaCalificacion") {
          const parseDate = (dateStr: string) => {
            const [day, month, year] = dateStr.split("/")
            return new Date(Number(year), Number(month) - 1, Number(day))
          }
          aValue = parseDate(aValue)
          bValue = parseDate(bValue)
        } else if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [drivers, searchTerm, ratingFilter, sortConfig])

  const handleView = (driver: any) => {
    setSelectedDriver(driver)
    setViewModalOpen(true)
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-100 text-green-800 hover:bg-green-100"
    if (rating >= 4.0) return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    if (rating >= 3.0) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    return "bg-red-100 text-red-800 hover:bg-red-100"
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader label="ID" sortKey="id" icon={Hash} sortConfig={sortConfig} onSort={setSortConfig} />
            <SortableHeader
              label="Chofer"
              sortKey="nombre"
              icon={User}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader
              label="Viajes Completados"
              sortKey="viajesCompletados"
              icon={Calendar}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader
              label="Calificación Promedio"
              sortKey="calificacionPromedio"
              icon={StarIcon}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader
              label="Última Calificación"
              sortKey="ultimaCalificacion"
              icon={Calendar}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader
              label="Comentarios"
              sortKey="comentarios"
              icon={MessageSquare}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader
              label="Estado"
              sortKey="estado"
              icon={Star}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredDrivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell className="font-medium">{driver.id}</TableCell>
              <TableCell>{driver.nombre}</TableCell>
              <TableCell>{driver.viajesCompletados}</TableCell>
              <TableCell>{driver.calificacionPromedio.toFixed(1)}</TableCell>
              <TableCell>{driver.ultimaCalificacion}</TableCell>
              <TableCell>{driver.comentarios}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getRatingColor(driver.calificacionPromedio)}
                >
                  {driver.estado}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleView(driver)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver historial
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ViewDriverReputationModal open={viewModalOpen} onOpenChange={setViewModalOpen} driver={selectedDriver} />
    </>
  )
} 