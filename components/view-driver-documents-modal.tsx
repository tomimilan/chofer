"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

interface ViewDriverDocumentsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  driver: any
}

export function ViewDriverDocumentsModal({
  open,
  onOpenChange,
  driver,
}: ViewDriverDocumentsModalProps) {
  if (!driver) return null

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

  const documents = [
    {
      tipo: "Licencia de Conducir",
      numero: driver.licencia.numero,
      vencimiento: driver.licencia.vencimiento,
      estado: driver.licencia.estado,
      archivo: "licencia.pdf"
    },
    {
      tipo: "ART",
      numero: driver.art.numero,
      vencimiento: driver.art.vencimiento,
      estado: driver.art.estado,
      archivo: "art.pdf"
    },
    {
      tipo: "Psicofísico",
      numero: driver.psicofisico.numero,
      vencimiento: driver.psicofisico.vencimiento,
      estado: driver.psicofisico.estado,
      archivo: "psicofisico.pdf"
    },
    {
      tipo: "DNI",
      numero: "DNI-12345678",
      vencimiento: "N/A",
      estado: driver.documentacion.dni,
      archivo: "dni.pdf"
    },
    {
      tipo: "Seguro",
      numero: "SEG-2024-001",
      vencimiento: "31/12/2024",
      estado: driver.documentacion.seguro,
      archivo: "seguro.pdf"
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Documentación de {driver.nombre}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{doc.tipo}</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm text-gray-500">Número: {doc.numero}</p>
                      <p className="text-sm text-gray-500">Vencimiento: {doc.vencimiento}</p>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(doc.estado)}
                      >
                        {doc.estado}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 