import React, { useCallback } from 'react'
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
import { FieldNode, SelectionNode, parse } from 'graphql'
import { Grid } from '@mui/material'
import { GridNode } from './types'
import { DEFAULT_QUERY, GRAPHQL_SCHEMA } from './constants'
import 'graphiql/graphiql.min.css'
import { QueryEditor, EditorContextProvider, SchemaContextProvider } from '@graphiql/react'
import { grey } from '@mui/material/colors'

const getNumericArgument = (
    field: FieldNode,
    name: string) => toNumber( get(
        field.arguments?.find(x => x.name.value === name)?.value,
        'value',
        0))

const traverseSelectionNodesIntoGridNodes = (root: GridNode, selectionNodes: readonly SelectionNode[]) => {
    selectionNodes.forEach(selectionNode => {
        let newRoot: GridNode | undefined = undefined

        if(selectionNode.kind === 'Field') {
            switch(selectionNode.name.value) {
                case 'right':
                    newRoot = root.addRight()
                    break
                case 'left':
                    newRoot = root.addLeft()
                    break
                case 'top':
                    newRoot = root.addTop()
                    break
                case 'bottom':
                    newRoot = root.addBottom()
                    break
            }

            if(newRoot !== undefined && selectionNode.selectionSet?.selections) {
                traverseSelectionNodesIntoGridNodes(
                    newRoot,
                    selectionNode.selectionSet.selections
                )
            }
        }
    })
}

function convertGqlToNodes(code: string) {
    const parsed = parse(code)
    const roots: GridNode[] = []

    if(parsed.definitions[0].kind === 'OperationDefinition') {
        parsed
            .definitions[0]
            .selectionSet
            .selections
            .forEach(selection => {
                if(selection.kind === 'Field') {
                    const i = getNumericArgument(selection, 'i')
                    const j = getNumericArgument(selection, 'j')

                    const root = new GridNode(i, j)

                    if(selection.selectionSet?.selections) {
                        traverseSelectionNodesIntoGridNodes(
                            root,
                            selection.selectionSet.selections
                        )
                    }
                    roots.push(root)
                }
            })
    }

    return roots
}

interface Props {
    onGridNodeChanged: (value: GridNode[]) => void
}

export default function GqlEditorSection({
    onGridNodeChanged
}: Props) {
    const onValueChange = useCallback((value: string) => {
        const n = convertGqlToNodes(value)
        onGridNodeChanged(n)
    }, [onGridNodeChanged])

    return <div
        className='graphiql-container'
        style={{
            minHeight: 500,
            border: '2px solid',
            borderRadius: 8,
            borderColor: grey[100]
        }}
    >
        <EditorContextProvider defaultQuery={DEFAULT_QUERY}>
            <SchemaContextProvider
                schema={GRAPHQL_SCHEMA}
                fetcher={() => { }}
            >
                <QueryEditor onEdit={onValueChange} />
            </SchemaContextProvider>
        </EditorContextProvider>
    </div>
}