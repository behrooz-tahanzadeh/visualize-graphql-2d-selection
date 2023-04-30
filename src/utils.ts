import { GridNode } from "./types";

export function makeRelationName(a: GridNode, b: GridNode) {
    const A = a.getId()
    const B = b.getId()

    if(A.localeCompare(B) < 0) {
        return [A, B].join('>')
    } else {
        return [B, A].join('>')
    }
}