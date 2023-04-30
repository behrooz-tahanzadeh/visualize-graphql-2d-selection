import React, { useMemo } from 'react'
import { CELL_COUNT, CELL_SIZE } from './constants'
import range from 'lodash/range'
import { GridNode } from './types'
import { makeRelationName } from './utils'

interface Props {
    selectedDepth: number
    dataloaderCacheDepth: {[id:string]: number}
    gridNodes: GridNode[]
}

export default function GridCanvasSection({
    selectedDepth,
    dataloaderCacheDepth,
    gridNodes
}: Props) {
    const sideSize = (CELL_COUNT + 1) * CELL_SIZE

    const relationsLookup = useMemo(() => {
        const output: {[relationName: string]: number} = {}

        const traverse = (parent: GridNode, depth: number) => {
            parent.children.forEach(child => {
                const relationName = makeRelationName(parent, child)
                if(output[relationName] === undefined) {
                    output[relationName] = depth
                }
                traverse(child, depth+1)
            })
        }

        gridNodes.forEach(node => {
            traverse(node, 0)
        })

        return output
    }, [gridNodes])

    return <svg
        width='100%'
        viewBox={`0 0 ${sideSize} ${sideSize}`}
        style={{ width: '100%' }}
        children={ range(CELL_COUNT).map(j => (
            <g
                key={j}
                children={ range(CELL_COUNT).map(i => {
                    const node = new GridNode(i, j)
                    const rightNode = node.addRight()
                    const bottomNode = node.addBottom()

                    const x = CELL_SIZE * (j + 1)
                    const y = CELL_SIZE * (i + 1)

                    let cc = '#eee'

                    const nodeStep = dataloaderCacheDepth[node.getId()] ?? Infinity

                    const rightName = makeRelationName(node, rightNode)
                    const rightStep = relationsLookup[rightName] ?? Infinity
                    const rightConnected = relationsLookup[rightName] !== undefined
                    
                    const bottomName = makeRelationName(node, bottomNode)
                    const bottomStep = relationsLookup[bottomName] ?? Infinity
                    const bottomConnected = relationsLookup[bottomName] !== undefined


                    if(nodeStep >= 0) {
                        cc = '#bbb'

                        if(nodeStep < selectedDepth) {
                            cc = '#3fa9f5'
                        }
                        if(nodeStep === selectedDepth) {
                            cc = '#ff7bac'
                        }
                    }

                    return <g key={node.getId()}>
                        {
                            i < CELL_COUNT-1 &&
                            <line
                                x1={x} y1={y} x2={x} y2={y+CELL_SIZE}
                                strokeWidth={bottomConnected ? 4 : 1}
                                stroke={ bottomStep < selectedDepth ? '#3fa9f5' : '#eee'}
                            />
                        }
                        {
                            j < CELL_COUNT-1 &&
                            <line
                                x1={x} y1={y} x2={x+CELL_SIZE} y2={y}
                                strokeWidth={rightConnected ? 4 : 1}
                                stroke={ rightStep < selectedDepth ? '#3fa9f5' : '#eee'}
                            />
                        }
                        <circle
                            cx={x} cy={y}
                            r={ CELL_SIZE/5 + (nodeStep > -1 && nodeStep <= selectedDepth ? 5 : 0) }
                            strokeWidth={3}
                            fill={cc}
                            style={{ transition: 'all 0.3s' }}
                        />
                        {/* {
                            nodeStep >= 0 &&
                            <text 
                                x={x-8} y={y+4} children={key} style={{
                                    color: 'white',
                                    fill: 'white',
                                    fontSize: 12
                        }}/>
                        } */}
                    </g>
                })}
            />
        ))}
    />
}