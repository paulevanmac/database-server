const store: Map<string, string> = new Map();

function save(key: string, value: string) {
    store.set(key, value);
}

function findByKey(key: string): string | undefined {
    return store.get(key);
}

export { save, findByKey };
