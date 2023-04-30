export class GridNode {
    children: GridNode[]

    constructor(
        public i: number,
        public j: number
    ) {
        this.children = []
    }

    getId() {
        return `${this.i}:${this.j}`
    }

    addLeft() {
        const n = new GridNode(this.i, this.j-1)
        this.children.push(n)
        return n
    }

    addRight() {
        const n = new GridNode(this.i, this.j+1)
        this.children.push(n)
        return n
    }

    addTop() {
        const n = new GridNode(this.i-1, this.j)
        this.children.push(n)
        return n
    }

    addBottom() {
        const n = new GridNode(this.i+1, this.j)
        this.children.push(n)
        return n
    }
}