import { Admin, Core, Protobuf } from 'flyteidl';
import {
    Identifier,
    LiteralMap,
    LiteralMapBlob,
    Notification,
    TaskLog,
    UrlBlob
} from 'models/Common';

import {
    ExecutionMode,
    NodeExecutionPhase,
    TaskExecutionPhase,
    WorkflowExecutionPhase
} from './enums';

export type WorkflowExecutionIdentifier = RequiredNonNullable<
    Core.IWorkflowExecutionIdentifier
>;
export type ExecutionError = RequiredNonNullable<Core.IExecutionError>;

export interface ExecutionClosure extends Admin.IExecutionClosure {
    computedInputs: LiteralMap;
    duration?: Protobuf.Duration;
    error?: ExecutionError;
    outputs?: LiteralMapBlob;
    phase: WorkflowExecutionPhase;
    startedAt?: Protobuf.Timestamp;
    workflowId: Identifier;
}

export interface ExecutionMetadata extends Admin.IExecutionMetadata {
    mode: ExecutionMode;
    principal: string;
    nesting: number;
    parentNodeExecution?: NodeExecutionIdentifier;
}

export interface ExecutionSpec extends Admin.IExecutionSpec {
    inputs: LiteralMap;
    launchPlan: Identifier;
    metadata: ExecutionMetadata;
    notifications: RequiredNonNullable<Admin.INotificationList>;
}

export interface Execution extends Admin.IExecution {
    closure: ExecutionClosure;
    id: WorkflowExecutionIdentifier;
    spec: ExecutionSpec;
}

export type ExecutionsMap = Map<string, Execution>;

/** Node executions **/
export interface WorkflowNodeMetadata {
    executionId: WorkflowExecutionIdentifier;
}
export interface NodeExecutionIdentifier extends Core.INodeExecutionIdentifier {
    nodeId: string;
    executionId: WorkflowExecutionIdentifier;
}

export interface NodeExecution extends Admin.INodeExecution {
    id: NodeExecutionIdentifier;
    inputUri: string;
    closure: NodeExecutionClosure;
}
export interface NodeExecutionClosure extends Admin.INodeExecutionClosure {
    duration?: Protobuf.Duration;
    error?: ExecutionError;
    outputUri: string;
    phase: NodeExecutionPhase;
    startedAt?: Protobuf.ITimestamp;
    workflowNodeMetadata?: WorkflowNodeMetadata;
}

/** Task executions **/

export interface TaskExecutionIdentifier extends Core.ITaskExecutionIdentifier {
    taskId: Identifier;
    nodeExecutionId: NodeExecutionIdentifier;
    retryAttempt: number;
}

export interface TaskExecution extends Admin.ITaskExecution {
    id: TaskExecutionIdentifier;
    inputUri: string;
    isParent: boolean;
    closure: TaskExecutionClosure;
}
export interface TaskExecutionClosure extends Admin.ITaskExecutionClosure {
    createdAt: Protobuf.Timestamp;
    duration?: Protobuf.Duration;
    error?: ExecutionError;
    logs?: TaskLog[];
    outputUri: string;
    phase: TaskExecutionPhase;
    startedAt?: Protobuf.ITimestamp;
}

/** Execution data */
export interface ExecutionData {
    inputs: UrlBlob;
    outputs: UrlBlob;
}
