'use client'

import { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

export default function Home() {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerar = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log(`Esto es lo que está pasando al back: ${fechaInicio} y ${fechaFin}`)
      // Llamar al backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/report`,
        {
          fechaInicio,
          fechaFin
        },
        {
          responseType: 'blob' // Importante para recibir el archivo
        }
      )

      // Crear un link temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `prorrateo_${fechaInicio}_${fechaFin}.xlsx`) // Nombre del archivo
      document.body.appendChild(link)
      link.click()
      
      // Limpiar
      link.remove()
      window.URL.revokeObjectURL(url)

      alert('¡Reporte generado exitosamente!')
    } catch (error) {
      console.error('Error al generar el reporte:', error)
      alert('Error al generar el reporte. Verifica que el backend esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#E8F4F8' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border-t-8" style={{ borderTopColor: '#004B87' }}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="ONCE92 Logo"
            width={220}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: '#004B87' }}>
          Prorrateo mensual
        </h1>

        {/* Formulario */}
        <form onSubmit={handleGenerar} className="space-y-6">
          {/* Fecha de inicio */}
          <div>
            <label htmlFor="fechaInicio" className="block text-sm font-semibold mb-2" style={{ color: '#004B87' }}>
              Fecha de inicio:
            </label>
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-700"
              style={{ borderColor: '#D1E7F0' }}
              required
              disabled={loading}
            />
          </div>

          {/* Fecha de fin */}
          <div>
            <label htmlFor="fechaFin" className="block text-sm font-semibold mb-2" style={{ color: '#004B87' }}>
              Fecha de fin:
            </label>
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-700"
              style={{ borderColor: '#D1E7F0' }}
              required
              disabled={loading}
            />
          </div>

          {/* Botón Generar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#004B87' }}
          >
            {loading ? 'Generando...' : 'Generar'}
          </button>
        </form>
      </div>
    </main>
  )
}