'use server'

import * as XLSX from 'xlsx'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function processExcel(formData) {
  try {
    const file = formData.get('file')
    
    if (!file) {
      return {
        success: false,
        message: 'No file provided'
      }
    }

    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    const validationErrors = []
    const validData = []

    // Validation logic
    jsonData.forEach((row, index) => {
      const errors = []

      if (!row.name) errors.push('Name is required')
      if (!row.email || !row.email.includes('@')) errors.push('Valid email is required')
      if (!row.studentId) errors.push('Student ID is required')
      if (!row.grade) errors.push('Grade is required')
      if (!row.class) errors.push('Class is required')

      if (errors.length) {
        validationErrors.push({
          row: index + 2,
          errors
        })
      } else {
        validData.push(row)
      }
    })

    // If validation errors exist, return them
    if (validationErrors.length) {
      return {
        success: false,
        errors: validationErrors,
        message: 'Validation errors found'
      }
    }

    // Bulk insert valid students
    const insertedStudents = await prisma.student.createMany({
      data: validData.map(student => ({
        name: student.name,
        email: student.email,
        studentId: student.studentId,
        grade: student.grade,
        class: student.class
      })),
      skipDuplicates: true
    })

    return {
      success: true,
      message: `Successfully uploaded ${insertedStudents.count} students`,
      data: validData
    }
  } catch (error) {
    console.error('Excel processing error:', error)
    return {
      success: false,
      message: error.message || 'Error processing file'
    }
  }
}

