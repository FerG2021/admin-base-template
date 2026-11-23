import exampleRoutes from '@/modules/example/router/example.routes'

export const MODULES_CONFIG = [
    {
        key: 'example',
        name: 'Módulo Ejemplo',
        enabledByDefault: true,
        routes: exampleRoutes
    }
]

export function getAllModuleRoutes() {
    return MODULES_CONFIG.flatMap((mod) => mod.routes || [])
}
