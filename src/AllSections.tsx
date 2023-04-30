import { Box, Grid } from "@mui/material";
import React, { useState } from 'react';
import GqlEditorSection from "./GqlEditorSection";
import { GridNode } from "./types";
import DataloaderBatchesSection from "./DataloaderBatchesSection";
import GridCanvasSection from "./GridCanvasSection";

export default function AllSections() {
    const [gridNodes, setGridNodes] = useState<GridNode[]>([])

    const [selectedDepth, setSelectedDepth] = useState(0)
    const [dataloaderBatches, setDatalaoderBatches] = useState<{cached: boolean, id: string}[][]>([])
    const [datalaoderCacheDepth, setDatalaoderCacheDepth] = useState<{[id:string]: number}>({})

    return <Box p={2}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <GqlEditorSection onGridNodeChanged={setGridNodes} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <DataloaderBatchesSection
                            gridNodes={gridNodes}
                            selectedDepth={selectedDepth}
                            setSelectedDepth={setSelectedDepth}
                            dataloaderBatches={dataloaderBatches}
                            setDatalaoderBatches={setDatalaoderBatches}
                            setDatalaoderCacheDepth={setDatalaoderCacheDepth}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <GridCanvasSection
                            gridNodes={gridNodes}
                            selectedDepth={selectedDepth}
                            dataloaderCacheDepth={datalaoderCacheDepth}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
}