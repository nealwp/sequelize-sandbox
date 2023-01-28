export interface Controller<T, I> {
    create: (input: I) => Promise<T>,
    getAll: () => Promise<T[]>
}