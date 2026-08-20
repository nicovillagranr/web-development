import { NextResponse } from "next/server"


export async function GET() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    return NextResponse.json(data)
}

export async function POST(request) {
    // extract params
    // query database
    // comunicate whith other services

    const { nombre, apellido } = await request.json()
    console.log(`El nombre es ${nombre} y el apellido es ${apellido}`)

    return NextResponse.json({
        message: "Creando datos..."
    })
}

export function PUT() {
    // extract params
    // query database
    // comunicate whith other services
    return NextResponse.json({
        message: "Actualizando datos..."
    })
}

export function DELETE() {
    // extract params
    // query database
    // comunicate whith other services
    return NextResponse.json({
        message: "Eliminando datos..."
    })
}