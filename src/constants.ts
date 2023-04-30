import { buildSchema } from 'graphql'

export const CELL_COUNT = 10
export const CELL_SIZE = 50

export const DEFAULT_QUERY = `{
    a: node(i: 3, j: 4) {
        id
        left {
           right {
               id
           }
        }
    }
    b: node(i: 1, j: 6) {
        id
        left {
           bottom {
                right {
                    top {
                        id
                    }
                }
               id
           }
        }
    }
}`

export const GRAPHQL_SCHEMA = buildSchema(`
type GridNode {
    id: String
    left: GridNode
    bottom: GridNode
    top: GridNode
    right: GridNode
}
type Query {
    node(i: Int, j: Int): GridNode
}
`)