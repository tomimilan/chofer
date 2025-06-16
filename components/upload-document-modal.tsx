"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface UploadDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  driver: any
}

export function UploadDocumentModal({
  open,
  onOpenChange,
  driver,
}: UploadDocumentModalProps) {
  if (!driver) return null

  const [documentType, setDocumentType] = useState("")
  const [documentNumber, setDocumentNumber] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Aquí iría la lógica para subir el documento
    toast({
      title: "Documento subido",
      description: "El documento ha sido subido exitosamente.",
    })
    
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Subir Documento - {driver.nombre}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentType">Tipo de Documento</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="licencia">Licencia de Conducir</SelectItem>
                <SelectItem value="art">ART</SelectItem>
                <SelectItem value="psicofisico">Psicofísico</SelectItem>
                <SelectItem value="dni">DNI</SelectItem>
                <SelectItem value="seguro">Seguro</SelectItem>
                <SelectItem value="otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentNumber">Número de Documento</Label>
            <Input
              id="documentNumber"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="Ingrese el número de documento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expirationDate">Fecha de Vencimiento</Label>
            <Input
              id="expirationDate"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Archivo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Subir Documento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 