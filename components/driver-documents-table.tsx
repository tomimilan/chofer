"use client"

import { useState } from "react"
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
import { Eye, MoreHorizontal, Upload, FileText } from "lucide-react"
import { SortableHeader } from "@/components/ui/sortable-header"
import { ViewDriverDocumentsModal } from "@/components/view-driver-documents-modal"
import { UploadDocumentModal } from "@/components/upload-document-modal"

interface DriverDocumentsTableProps {
  searchTerm?: string
  statusFilter?: string
}

export function DriverDocumentsTable({
  searchTerm = "",
  statusFilter = "todos",
}: DriverDocumentsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc" | null
  }>({ key: "", direction: null })

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)

  const [drivers, setDrivers] = useState([
    {
      id: "CH-001",
      nombre: "Juan Pérez",
      licencia: {
        numero: "12345678",
        vencimiento: "15/03/2025",
        estado: "Vigente"
      },
      art: {
        numero: "ART-2024-001",
        vencimiento: "31/12/2024",
        estado: "Vigente"
      },
      psicofisico: {
        numero: "PSI-2024-001",
        vencimiento: "30/06/2024",
        estado: "Vigente"
      },
      documentacion: {
        dni: "Vigente",
        seguro: "Vigente",
        otros: "Pendiente"
      }
    }
  ])

  const handleView = (driver: any) => {
    setSelectedDriver(driver)
    setViewModalOpen(true)
  }

  const handleUpload = (driver: any) => {
    setSelectedDriver(driver)
    setUploadModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "vigente":
        return "bg-green-100 text-green-800"
      case "vencido":
        return "bg-red-100 text-red-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Licencia</TableHead>
            <TableHead>ART</TableHead>
            <TableHead>Psicofísico</TableHead>
            <TableHead>Documentación</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell className="font-medium">{driver.id}</TableCell>
              <TableCell>{driver.nombre}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">{driver.licencia.numero}</div>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(driver.licencia.estado)}
                  >
                    {driver.licencia.estado}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    Vence: {driver.licencia.vencimiento}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">{driver.art.numero}</div>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(driver.art.estado)}
                  >
                    {driver.art.estado}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    Vence: {driver.art.vencimiento}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">{driver.psicofisico.numero}</div>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(driver.psicofisico.estado)}
                  >
                    {driver.psicofisico.estado}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    Vence: {driver.psicofisico.vencimiento}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">DNI:</span>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(driver.documentacion.dni)}
                    >
                      {driver.documentacion.dni}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Seguro:</span>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(driver.documentacion.seguro)}
                    >
                      {driver.documentacion.seguro}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Otros:</span>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(driver.documentacion.otros)}
                    >
                      {driver.documentacion.otros}
                    </Badge>
                  </div>
                </div>
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
                      Ver documentos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpload(driver)}>
                      <Upload className="mr-2 h-4 w-4" />
                      Subir documento
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ViewDriverDocumentsModal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        driver={selectedDriver}
      />
      <UploadDocumentModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        driver={selectedDriver}
      />
    </>
  )
} 