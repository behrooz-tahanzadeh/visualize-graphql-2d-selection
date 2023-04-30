import React, { useEffect } from 'react'
import { Checkbox, Grid, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import { GridNode } from './types'

interface Props {
    gridNodes: GridNode[]

    selectedDepth: number
    setSelectedDepth: (d: number) => void

    dataloaderBatches: {cached: boolean, id: string}[][]
    setDatalaoderBatches: (v: {cached: boolean, id: string}[][]) => void

    setDatalaoderCacheDepth: (v: {[id:string]: number}) => void
}

export default function DataloaderBatchesSection({
    gridNodes,
    dataloaderBatches,
    setDatalaoderBatches,
    selectedDepth,
    setSelectedDepth,
    setDatalaoderCacheDepth
}: Props) {
    useEffect(() => {
        const output: {cached: boolean, id: string}[][] = []
        const cachedIds: {[id:string]: number} = {}

        const bfs = (queue: GridNode[], depth: number) => {
            output[depth] = []
            const nextQueue: GridNode[] = []

            queue.forEach(x => {
                const id = x.getId()
                const cached = cachedIds[id] !== undefined
                
                if(!cached) cachedIds[id] = depth

                output[depth].push({id, cached})

                nextQueue.push(...x.children)
            })

            if(nextQueue.length > 0)
                bfs(nextQueue, depth+1)
        }

        bfs(gridNodes, 0)

        setDatalaoderBatches(output)
        setSelectedDepth(0)
        setDatalaoderCacheDepth(cachedIds)
    }, [gridNodes, setDatalaoderBatches, setSelectedDepth, setDatalaoderCacheDepth])

    return <Grid container spacing={3}>
        <Grid
            item xs={12}
            component={List} dense
            children={dataloaderBatches.map((x, i) => {
                const notCached = x.filter(y => y.cached === false).map(y => y.id)

                return <ListItemButton
                    key={i}
                    onClick={() => setSelectedDepth(i)}
                >
                    <ListItemAvatar>
                        <Checkbox
                            color={i < selectedDepth ? 'primary' : 'warning' }
                            checked={i <= selectedDepth}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            notCached.length === 0 ?
                            'Everything is already cached!' :
                            `Load ${notCached.join(' ')}`
                        }
                        secondary={`step #${i+1}`}
                    />
                </ListItemButton>
            })}
        />
    </Grid>
}