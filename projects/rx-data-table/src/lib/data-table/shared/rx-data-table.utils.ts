export function getRecursiveProperty(property: string, value: any) {
    try {
        if (property.includes('.')) {
            const index = property.indexOf(".");
            const current = property.slice(0, index);
            const next = property.slice(index + 1, property.length);
            return getRecursiveProperty(next, value[current]);
        }
        return value[property];
    } catch (e) {
        return '';
    }
}

export function clone(value) {
    return JSON.parse(JSON.stringify(value));
}