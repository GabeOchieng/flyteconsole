import { WaitForData } from 'components/common';
import { useCommonStyles } from 'components/common/styles';
import { useNodeExecutionData } from 'components/hooks';
import { RemoteLiteralMapViewer } from 'components/Literals';
import { NodeExecution } from 'models';
import * as React from 'react';

/** Fetches and renders the input data for a given `NodeExecution` */
export const NodeExecutionInputs: React.FC<{ execution: NodeExecution }> = ({
    execution
}) => {
    const commonStyles = useCommonStyles();
    const executionData = useNodeExecutionData(execution.id);
    return (
        <WaitForData {...executionData}>
            {() => (
                <>
                    <div className={commonStyles.detailsPanelCard}>
                        <div className={commonStyles.detailsPanelCardContent}>
                            <RemoteLiteralMapViewer
                                blob={executionData.value.inputs}
                            />
                        </div>
                    </div>
                </>
            )}
        </WaitForData>
    );
};
