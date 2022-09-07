const store = {};

function save(key: string, value: string) {
    Object(store)[key] = value;
}

function findByKey(key: string): string {
    return Object(store)[key];
}

export { save, findByKey };
