export interface Controller<T, A, C> {
    create: (resource: C) => Promise<T>,
    update: (resource: A) => Promise<T>,
    findById: (id: number) => Promise<T>,
    findAll: () => Promise<T[]>
}
