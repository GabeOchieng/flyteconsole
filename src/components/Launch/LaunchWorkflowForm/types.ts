import { FetchableData, MultiFetchableState } from 'components/hooks';
import { Core } from 'flyteidl';
import {
    Identifier,
    LaunchPlan,
    NamedEntityIdentifier,
    WorkflowExecutionIdentifier,
    WorkflowId
} from 'models';
import { SearchableSelectorOption } from './SearchableSelector';

export type InputValueMap = Map<string, InputValue>;
export type LiteralValueMap = Map<string, Core.ILiteral>;

export interface InitialLaunchParameters {
    launchPlan?: Identifier;
    workflow?: WorkflowId;
    values?: LiteralValueMap;
}

export interface LaunchWorkflowFormProps {
    workflowId: NamedEntityIdentifier;
    initialParameters?: InitialLaunchParameters;
    onClose(): void;
}

export interface LaunchWorkflowFormInputsRef {
    getValues(): Record<string, Core.ILiteral>;
    validate(): boolean;
}

export interface LaunchWorkflowFormState {
    /** Used to key inputs component so it is re-mounted the list of inputs */
    formKey?: string;
    formInputsRef: React.RefObject<LaunchWorkflowFormInputsRef>;
    inputLoadingState: MultiFetchableState;
    inputs: ParsedInput[];
    inputValueCache: InputValueMap;
    launchPlanOptionsLoadingState: MultiFetchableState;
    launchPlanSelectorOptions: SearchableSelectorOption<LaunchPlan>[];
    selectedLaunchPlan?: SearchableSelectorOption<LaunchPlan>;
    selectedWorkflow?: SearchableSelectorOption<WorkflowId>;
    showErrors: boolean;
    submissionState: FetchableData<WorkflowExecutionIdentifier>;
    workflowName: string;
    workflowOptionsLoadingState: MultiFetchableState;
    workflowSelectorOptions: SearchableSelectorOption<WorkflowId>[];
    onCancel(): void;
    onSelectWorkflow(selected: SearchableSelectorOption<WorkflowId>): void;
    onSubmit(): void;
    onSelectLaunchPlan(selected: SearchableSelectorOption<LaunchPlan>): void;
}

export enum InputType {
    Binary = 'BINARY',
    Blob = 'BLOB',
    Boolean = 'BOOLEAN',
    Collection = 'COLLECTION',
    Datetime = 'DATETIME',
    Duration = 'DURATION',
    Error = 'ERROR',
    Float = 'FLOAT',
    Integer = 'INTEGER',
    Map = 'MAP',
    None = 'NONE',
    Schema = 'SCHEMA',
    String = 'STRING',
    Struct = 'STRUCT',
    Unknown = 'UNKNOWN'
}

export interface InputTypeDefinition {
    type: InputType;
    subtype?: InputTypeDefinition;
}

export type InputValue = string | number | boolean | Date;
export type InputChangeHandler = (newValue: InputValue) => void;

export interface InputProps {
    description: string;
    error?: string;
    helperText?: string;
    initialValue?: Core.ILiteral;
    name: string;
    label: string;
    required: boolean;
    typeDefinition: InputTypeDefinition;
    value?: InputValue;
    onChange: InputChangeHandler;
}

export interface ParsedInput
    extends Pick<
        InputProps,
        'description' | 'label' | 'name' | 'required' | 'typeDefinition'
    > {
    /** Provides an initial value for the input, which can be changed by the user. */
    initialValue?: Core.ILiteral;
}
