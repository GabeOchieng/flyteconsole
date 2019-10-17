import { useContext } from 'react';

import { CacheContext } from 'components/Cache';
import { useAPIContext } from 'components/data/apiContext';
import { Workflow, WorkflowId } from 'models';
import { FetchableData } from './types';
import { useFetchableData } from './useFetchableData';
import { extractTaskTemplates } from './utils';

/** A hook for fetching a Workflow */
export function useWorkflow(
    id: WorkflowId | null = null,
    host?: string
): FetchableData<Workflow> {
    const cache = useContext(CacheContext);
    const { getWorkflow } = useAPIContext();

    const doFetch = async (id: WorkflowId | null) => {
        if (id === null) {
            throw new Error('workflow id missing');
        }
        console.log('calling get workflow with');
        console.log(host);
        const workflow = await getWorkflow(id, undefined, host);
        const templates = extractTaskTemplates(workflow);
        cache.mergeArray(templates);
        return workflow;
    };

    return useFetchableData<Workflow, WorkflowId | null>(
        {
            doFetch,
            autoFetch: id !== null,
            useCache: false,
            debugName: 'Workflow',
            defaultValue: {} as Workflow
        },
        id
    );
}
