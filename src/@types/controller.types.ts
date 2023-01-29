export interface Controller<T, C> {
    create: (resource: C) => Promise<T>,
    update: (resource: T) => Promise<T>,
    findById: (id: number) => Promise<T>,
    findAll: () => Promise<T[]>
}
