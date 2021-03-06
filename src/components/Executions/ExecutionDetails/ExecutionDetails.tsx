import { WaitForData, withRouteParams } from 'components/common';
import {
    RefreshConfig,
    useDataRefresher,
    useWorkflowExecution
} from 'components/hooks';
import { Execution } from 'models';
import * as React from 'react';
import { executionRefreshIntervalMs } from '../constants';
import { executionIsTerminal } from '../utils';
import { ExecutionContext } from './contexts';
import { ExecutionDetailsAppBarContent } from './ExecutionDetailsAppBarContent';
import { ExecutionNodeViews } from './ExecutionNodeViews';

export interface ExecutionDetailsRouteParams {
    domainId: string;
    executionId: string;
    projectId: string;
}
export type ExecutionDetailsProps = ExecutionDetailsRouteParams;

const executionRefreshConfig: RefreshConfig<Execution> = {
    interval: executionRefreshIntervalMs,
    valueIsFinal: executionIsTerminal
};

/** The view component for the Execution Details page */
export const ExecutionDetailsContainer: React.FC<ExecutionDetailsRouteParams> = ({
    executionId,
    domainId,
    projectId
}) => {
    const id = {
        project: projectId,
        domain: domainId,
        name: executionId
    };

    const { fetchable, terminateExecution } = useWorkflowExecution(id);
    useDataRefresher(id, fetchable, executionRefreshConfig);
    const contextValue = { terminateExecution, execution: fetchable.value };
    return (
        <WaitForData {...fetchable}>
            <ExecutionContext.Provider value={contextValue}>
                <ExecutionDetailsAppBarContent execution={fetchable.value} />
                <ExecutionNodeViews execution={fetchable.value} />
            </ExecutionContext.Provider>
        </WaitForData>
    );
};

export const ExecutionDetails = withRouteParams<ExecutionDetailsRouteParams>(
    ExecutionDetailsContainer
);
