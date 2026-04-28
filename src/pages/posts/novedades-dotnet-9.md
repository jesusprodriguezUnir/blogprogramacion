---
title: "Novedades en .NET 9: GC Dinámico y Native AOT"
date: "2026-04-25"
excerpt: "Descubre las mejoras de rendimiento en el runtime de .NET 9 y cómo el Native AOT está cambiando el despliegue de microservicios cloud-native."
category: ".NET"
slug: "novedades-dotnet-9"
layout: "../../layouts/BlogLayout.astro"
---

# Novedades en .NET 9: Rendimiento al Límite

.NET 9 no es solo una actualización incremental; es una apuesta firme por el rendimiento en la nube y la eficiencia de recursos.

## Dynamic GC Adaptation

Una de las características más innovadoras es la adaptación dinámica del **Garbage Collector**. Ahora, el GC puede ajustar su comportamiento basándose en el tamaño de la aplicación y la memoria disponible en el contenedor, reduciendo drásticamente el "memory footprint" en microservicios pequeños.

## Native AOT para ASP.NET Core

El soporte de **Native AOT** (Ahead-of-Time) ha madurado significativamente. Al compilar directamente a código máquina:
- **Startup casi instantáneo**: Ideal para Azure Functions o AWS Lambda.
- **Menor consumo de RAM**: Al no necesitar el JIT compiler en tiempo de ejecución.
- **Binarios más pequeños**: Facilitando la distribución de imágenes Docker.

## C# 13 y LINQ

No podemos olvidar las mejoras en el lenguaje. C# 13 introduce `params` para colecciones más allá de arrays, y LINQ ahora incluye métodos como `CountBy` y `AggregateBy`, que simplifican enormemente el procesamiento de datos en memoria.

```csharp
// Ejemplo de CountBy en .NET 9
var counts = users.CountBy(u => u.Role);
foreach (var (role, count) in counts) {
    Console.WriteLine($"{role}: {count}");
}
```

.NET 9 demuestra que Microsoft sigue liderando la innovación en plataformas de desarrollo empresarial.
