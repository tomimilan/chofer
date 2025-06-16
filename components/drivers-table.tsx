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
import { Eye, MoreHorizontal, Pencil } from "lucide-react"
import { SortableHeader } from "@/components/ui/sortable-header"
import { Hash, UserIcon, Building, PhoneIcon, Mail, Calendar, CheckCircle } from "lucide-react"
import { EditDriverModal } from "@/components/edit-driver-modal"
import { ViewDriverModal } from "@/components/view-driver-modal"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface DriversTableProps {
  searchTerm?: string
  statusFilter?: string
}

export function DriversTable({ searchTerm = "", statusFilter = "todos" }: DriversTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc" | null
  }>({ key: "", direction: null })

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [driverABaja, setDriverABaja] = useState<any>(null)
  const [drivers, setDrivers] = useState([
    {
      id: "CHF-1001",
      nombre: "Juan Ortega",
      empresa: "Juan Ortega",
      telefono: "+54 11 2345-6789",
      email: "juan.ortega@example.com",
      vencimiento: "15/12/2023",
      estado: "Disponible",
    }
  ])

  const sortedAndFilteredDrivers = useMemo(() => {
    // Primero filtrar
    let filtered = drivers.filter((driver) => {
      const matchesSearch =
        searchTerm === "" ||
        driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.telefono.includes(searchTerm)

      const matchesStatus = statusFilter === "todos" || driver.estado.toLowerCase().replace(" ", "-") === statusFilter

      return matchesSearch && matchesStatus
    })

    // Luego ordenar
    if (sortConfig.key && sortConfig.direction) {
      filtered = [...filtered].sort((a: any, b: any) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        // Manejar fechas de vencimiento
        if (sortConfig.key === "vencimiento") {
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
  }, [drivers, searchTerm, statusFilter, sortConfig])

  const handleEdit = (driver: any) => {
    setSelectedDriver(driver)
    setEditModalOpen(true)
  }

  const handleView = (driver: any) => {
    setSelectedDriver(driver)
    setViewModalOpen(true)
  }

  const handleDarDeBaja = (id: string) => {
    setDrivers((prev: any) => prev.map((d: any) => d.id === id ? { ...d, estado: "Inactivo" } : d))
    setDriverABaja(null)
    toast({
      title: "Chofer dado de baja",
      description: "El chofer fue dado de baja exitosamente.",
    })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader label="ID" sortKey="id" icon={Hash} sortConfig={sortConfig} onSort={setSortConfig} />
            <SortableHeader
              label="Nombre"
              sortKey="nombre"
              icon={UserIcon}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader
              label="Empresa"
              sortKey="empresa"
              icon={Building}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader
              label="Teléfono"
              sortKey="telefono"
              icon={PhoneIcon}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader label="Email" sortKey="email" icon={Mail} sortConfig={sortConfig} onSort={setSortConfig} />
            <SortableHeader
              label="Vencimiento"
              sortKey="vencimiento"
              icon={Calendar}
              sortConfig={sortConfig}
              onSort={setSortConfig}
            />
            <SortableHeader
              label="Estado"
              sortKey="estado"
              icon={CheckCircle}
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
              <TableCell>{driver.empresa}</TableCell>
              <TableCell>{driver.telefono}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>{driver.vencimiento}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    driver.estado === "Disponible"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : driver.estado === "En ruta"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : driver.estado === "Inactivo"
                          ? "bg-red-100 text-red-800 hover:bg-red-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  }
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
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(driver)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={e => e.preventDefault()} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Dar de Baja
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción dará de baja al chofer <strong>{driver.nombre}</strong>.
                            El registro cambiará su estado a inactivo.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDarDeBaja(driver.id)}>
                            Dar de Baja
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditDriverModal open={editModalOpen} onOpenChange={setEditModalOpen} driver={selectedDriver} />
      <ViewDriverModal open={viewModalOpen} onOpenChange={setViewModalOpen} driver={selectedDriver} />
    </>
  )
}
