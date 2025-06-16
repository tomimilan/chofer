"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface ViewDriverReputationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  driver: any
}

export function ViewDriverReputationModal({
  open,
  onOpenChange,
  driver,
}: ViewDriverReputationModalProps) {
  if (!driver) return null

  const historialCalificaciones = [
    {
      fecha: "15/03/2024",
      viaje: "VIA-2024-001",
      calificacion: 5,
      comentario: "Excelente servicio, muy puntual y profesional.",
      cliente: "Transportes ABC"
    },
    {
      fecha: "10/03/2024",
      viaje: "VIA-2024-002",
      calificacion: 4,
      comentario: "Buen servicio, llegó a tiempo.",
      cliente: "Logística XYZ"
    },
    {
      fecha: "05/03/2024",
      viaje: "VIA-2024-003",
      calificacion: 5,
      comentario: "Muy profesional y cuidadoso con la carga.",
      cliente: "Distribuidora 123"
    }
  ]

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-100 text-green-800"
    if (rating >= 4.0) return "bg-blue-100 text-blue-800"
    if (rating >= 3.0) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Historial de Reputación - {driver.nombre}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Calificación Promedio</h3>
              <div className="mt-2 flex items-center">
                <span className="text-2xl font-bold">{driver.calificacionPromedio.toFixed(1)}</span>
                <Star className="ml-1 h-5 w-5 text-yellow-400" />
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Viajes Completados</h3>
              <div className="mt-2">
                <span className="text-2xl font-bold">{driver.viajesCompletados}</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Estado Actual</h3>
              <div className="mt-2">
                <Badge
                  variant="secondary"
                  className={getRatingColor(driver.calificacionPromedio)}
                >
                  {driver.estado}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Historial de Calificaciones</h3>
            <div className="space-y-4">
              {historialCalificaciones.map((calificacion, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{calificacion.viaje}</span>
                        <Badge
                          variant="secondary"
                          className={getRatingColor(calificacion.calificacion)}
                        >
                          {calificacion.calificacion} <Star className="ml-1 h-3 w-3" />
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{calificacion.cliente}</p>
                    </div>
                    <span className="text-sm text-gray-500">{calificacion.fecha}</span>
                  </div>
                  <p className="mt-2 text-sm">{calificacion.comentario}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 