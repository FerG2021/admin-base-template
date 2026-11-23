import modulesArka from './modules.configuration.arka.js'
import clientsArka from './clients.configuration.arka.js'

const ACCOUNTS_REGISTRY = {
    arka: {
        modulesConfig: modulesArka,
        clientConfig: clientsArka
    }
}

export function resolveAccountKeyFromCredentials(username = '', backendAccountKey = '') {
    if (backendAccountKey && ACCOUNTS_REGISTRY[backendAccountKey]) {
        return backendAccountKey
    }

    const normalized = String(username).trim().toLowerCase()
    const parts = normalized.split('.')
    const candidateFromSuffix = parts.length > 1 ? parts[parts.length - 1] : normalized

    if (ACCOUNTS_REGISTRY[candidateFromSuffix]) {
        return candidateFromSuffix
    }

    const matchedKey = Object.keys(ACCOUNTS_REGISTRY).find((key) => normalized.includes(key))
    if (!matchedKey) {
        throw new Error('La cuenta asociada al usuario no está configurada')
    }

    return matchedKey
}

export function getAccountConfigurations(accountKey) {
    const entry = ACCOUNTS_REGISTRY[accountKey]
    if (!entry) {
        throw new Error(`No existe configuración para la cuenta "${accountKey}"`)
    }
    return {
        accountKey,
        ...entry
    }
}
