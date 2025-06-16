"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DriverReputationTable } from "@/components/driver-reputation-table"
import { DriverDocumentsTable } from "@/components/driver-documents-table"

export default function HomePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
      </div>

      <Tabs defaultValue="documentacion" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documentacion">Documentación</TabsTrigger>
          <TabsTrigger value="reputacion">Mi Reputación</TabsTrigger>
        </TabsList>

        <TabsContent value="documentacion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentación de Choferes</CardTitle>
              <CardDescription>
                Gestión de documentación de choferes (licencias, ART, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DriverDocumentsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reputacion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mi Reputación</CardTitle>
              <CardDescription>
                Seguimiento de mi reputación y calificaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DriverReputationTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
