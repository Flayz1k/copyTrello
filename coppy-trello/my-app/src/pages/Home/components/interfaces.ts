interface a {
    title: string
    id: number
    custom: {
        description: string
    }
}
interface b {
    boards: a[]
}
interface be {
    target: { value: string }
}
interface create {
    open: boolean
    close: () => void
    danni:any
}
export type {a,b,be,create}
