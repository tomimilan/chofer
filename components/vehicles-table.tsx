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
import { Hash, Truck, Building2, CreditCard, Calendar, Weight, Building, CheckCircle } from "lucide-react"
import { EditTruckModal } from "@/components/edit-truck-modal"
import { ViewTruckModal } from "@/components/view-truck-modal"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface VehiclesTableProps {
  searchTerm?: string
  statusFilter?: string
}

export function VehiclesTable({
  searchTerm = "",
  statusFilter = "todos",
}: VehiclesTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc" | null
  }>({ key: "", direction: null })

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [vehicleABaja, setVehicleABaja] = useState<any>(null)

  const [vehicles, setVehicles] = useState([
    {
      id: "VEH-1001",
      marca: "Ford",
      modelo: "F-350",
      patente: "AB123CD",
      año: "2020",
      empresa: "Juan Ortega",
      chofer: "Juan Ortega",
      estado: "Operativo",
    }
  ])

  const sortedAndFilteredVehicles = useMemo(() => {
    // Primero filtrar
    let filtered = vehicles.filter((vehicle) => {
      const matchesSearch =
        searchTerm === "" ||
        vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.empresa.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "todos" || vehicle.estado.toLowerCase().replace(" ", "-") === statusFilter

      return matchesSearch && matchesStatus
    })

    // Luego ordenar
    if (sortConfig.key && sortConfig.direction) {
      filtered = [...filtered].sort((a: any, b: any) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        // Manejar campos especiales
        if (sortConfig.key === "marcaModelo") {
          aValue = `${a.marca} ${a.modelo}`.toLowerCase()
          bValue = `${b.marca} ${b.modelo}`.toLowerCase()
        } else if (sortConfig.key === "año") {
          aValue = Number(aValue)
          bValue = Number(bValue)
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
  }, [vehicles, searchTerm, statusFilter, sortConfig])

  const handleEdit = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setEditModalOpen(true)
  }

  const handleView = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setViewModalOpen(true)
  }

  const handleDarDeBaja = (id: string) => {
    setVehicles((prev: any) => prev.map((v: any) => v.id === id ? { ...v, estado: "Inactivo" } : v))
    setVehicleABaja(null)
    toast({
      title: "Camión dado de baja",
      description: "El camión fue dado de baja exitosamente.",
    })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Marca y Modelo</TableHead>
            <TableHead>Patente</TableHead>
            <TableHead>Año</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Chofer</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredVehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">{vehicle.id}</TableCell>
              <TableCell>
                {vehicle.marca} {vehicle.modelo}
              </TableCell>
              <TableCell>{vehicle.patente}</TableCell>
              <TableCell>{vehicle.año}</TableCell>
              <TableCell>{vehicle.empresa}</TableCell>
              <TableCell>{vehicle.chofer}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    vehicle.estado === "Operativo"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : vehicle.estado === "En ruta"
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        : vehicle.estado === "En mantenimiento"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : vehicle.estado === "Inactivo"
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  }
                >
                  {vehicle.estado}
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
                    <DropdownMenuItem onClick={() => handleView(vehicle)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
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
                            Esta acción dará de baja al camión <strong>{vehicle.id}</strong>.
                            El registro cambiará su estado a inactivo.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDarDeBaja(vehicle.id)}>
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

      <EditTruckModal open={editModalOpen} onOpenChange={setEditModalOpen} vehicle={selectedVehicle} />
      <ViewTruckModal open={viewModalOpen} onOpenChange={setViewModalOpen} vehicle={selectedVehicle} />
    </>
  )
}
