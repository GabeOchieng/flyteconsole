import { Admin } from 'flyteidl';
import {
    defaultPaginationConfig,
    getAdminEntity,
    postAdminEntity,
    RequestConfig
} from 'models/AdminEntity';
import {
    endpointPrefixes,
    Identifier,
    IdentifierScope,
    makeIdentifierPath
} from 'models/Common';

import { Workflow } from './types';
import { workflowListTransformer } from './utils';

/** Fetches a list of `Workflow` records matching the provided `scope` */
export const listWorkflows = (
    scope: IdentifierScope,
    config?: RequestConfig,
    host: string
) => {
    return getAdminEntity(
        {
            host,
            path: makeIdentifierPath(endpointPrefixes.workflow, scope),
            messageType: Admin.WorkflowList,
            transform: workflowListTransformer
        },
        { ...defaultPaginationConfig, ...config }
    );
};

/** Retrieves a single `Workflow` record */
export const getWorkflow = (
    id: Identifier,
    config?: RequestConfig,
    host?: string
) =>
    getAdminEntity<Admin.Workflow, Workflow>(
        {
            host,
            path: makeIdentifierPath(endpointPrefixes.workflow, id),
            messageType: Admin.Workflow
        },
        config
    );

export const createWorkflow = (workflowTemplate, config?: RequestConfig) =>
    postAdminEntity<Admin.IWorkflowCreateRequest, Admin.WorkflowCreateResponse>(
        {
            data: {
                id: workflowTemplate.id,
                spec: {
                    template: workflowTemplate
                }
            },
            path: endpointPrefixes.workflow,
            requestMessageType: Admin.WorkflowCreateRequest,
            responseMessageType: Admin.WorkflowCreateResponse
        },
        config
    );
