export interface Controller<T, I> {
    create: (input: I) => Promise<T>,
    update: (input: T) => Promise<T>,
    getAll: () => Promise<T[]>
}