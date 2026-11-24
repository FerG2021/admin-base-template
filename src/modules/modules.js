const routeFiles = import.meta.glob('./**/*.routes.js', { eager: true });
const defaultConfigFiles = import.meta.glob('./*/*.configuration.js', { eager: true });
const accountConfigFiles = import.meta.glob('./*/*.*.configuration.js', { eager: true });
const accountModuleConfigFiles = import.meta.glob(
    '../config/accounts/*/modules.configuration.*.js',
    { eager: true }
);

function extractModuleKeyFromPath(filePath) {
    // Ejemplo: "./clients/clients.routes.js" -> "clients"
    const parts = filePath.split('/');
    return parts[1] || null;
}

function extractAccountKeyFromConfigPath(filePath) {
    // Ejemplo: "./clients/clients.arka.configuration.js" -> "arka"
    const fileName = filePath.split('/').pop() || '';
    const match = fileName.match(/^[^.]+\.([^.]+)\.configuration\.js$/);
    return match ? match[1].toLowerCase() : null;
}

function isDefaultConfigPath(filePath, moduleKey) {
    const fileName = filePath.split('/').pop() || '';
    return fileName === `${moduleKey}.configuration.js`;
}

function getAccountModuleConfig(accountKey) {
    const normalizedAccount = String(accountKey || '').toLowerCase();
    const entry = Object.entries(accountModuleConfigFiles).find(([path]) =>
        path.endsWith(`modules.configuration.${normalizedAccount}.js`)
    );
    return entry?.[1]?.default || {};
}

export function getAllModuleRoutes() {
    const routes = [];
    for (const [path, mod] of Object.entries(routeFiles)) {
        const moduleKey = extractModuleKeyFromPath(path);
        const list = Array.isArray(mod.default) ? mod.default : [];
        for (const route of list) {
            routes.push({
                ...route,
                meta: {
                    ...(route.meta || {}),
                    moduleKey: route.meta?.moduleKey || moduleKey
                }
            });
        }
    }
    return routes;
}

export function getResolvedModuleConfig(moduleKey, accountKey = '') {
    if (!moduleKey) {
        return {};
    }

    const defaultEntry = Object.entries(defaultConfigFiles).find(
        ([path]) =>
            extractModuleKeyFromPath(path) === moduleKey && isDefaultConfigPath(path, moduleKey)
    );
    const baseConfig = defaultEntry?.[1]?.default || {};

    if (!accountKey) {
        return { ...baseConfig };
    }

    const normalizedAccount = String(accountKey).toLowerCase();
    const accountEntry = Object.entries(accountConfigFiles).find(
        ([path]) =>
            extractModuleKeyFromPath(path) === moduleKey &&
            extractAccountKeyFromConfigPath(path) === normalizedAccount
    );
    const overrideConfig = accountEntry?.[1]?.default || {};

    return {
        ...baseConfig,
        ...overrideConfig
    };
}

export function getAvailableModules(accountKey = '') {
    const accountConfig = getAccountModuleConfig(accountKey);
    const disabledModules = new Set(accountConfig.disabledModules || []);

    return getDiscoveredModuleKeys().map((moduleKey) => {
        const config = getResolvedModuleConfig(moduleKey, accountKey);
        const firstRoute = getAllModuleRoutes().find(
            (route) => route.meta?.moduleKey === moduleKey
        );

        return {
            ...config,
            key: moduleKey,
            label: config.label || config.title || moduleKey,
            icon: config.icon || 'pi pi-circle',
            description: config.description || '',
            routeName: config.routeName || firstRoute?.name,
            enabled: config.enabled !== false && !disabledModules.has(moduleKey)
        };
    });
}

export function isModuleEnabled(moduleKey, accountKey = '') {
    return getAvailableModules(accountKey).some(
        (module) => module.key === moduleKey && module.enabled
    );
}

export function getDiscoveredModuleKeys() {
    const keys = new Set();
    for (const path of Object.keys(routeFiles)) {
        const key = extractModuleKeyFromPath(path);
        if (key) keys.add(key);
    }
    for (const path of Object.keys(defaultConfigFiles)) {
        const key = extractModuleKeyFromPath(path);
        if (key) keys.add(key);
    }
    return Array.from(keys).sort();
}
