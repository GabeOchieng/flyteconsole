import { makeStyles, Theme } from '@material-ui/core';
import { headerGridHeight } from 'components';
import {
    bodyFontSize,
    headerFontFamily,
    listhoverColor,
    tableHeaderColor,
    tablePlaceholderColor
} from 'components/Theme';
import { nodeExecutionsTableColumnWidths } from './constants';

export const selectedClassName = 'selected';

// NOTE: The order of these `makeStyles` calls is important, as it determines
// specificity in the browser. The execution table styles are overridden by
// the columns styles in some cases. So the column styles should be defined
// last.
export const useExecutionTableStyles = makeStyles((theme: Theme) => ({
    childrenContainer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        minHeight: theme.spacing(7),
        paddingLeft: theme.spacing(3)
    },
    errorContainer: {
        padding: `0 ${theme.spacing(7)}px ${theme.spacing(2)}px`,
        '$childrenContainer > &': {
            paddingTop: theme.spacing(2),
            paddingLeft: theme.spacing(4)
        }
    },
    expander: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(1),
        width: theme.spacing(3)
    },
    headerColumn: {
        marginRight: theme.spacing(1),
        minWidth: 0,
        '&:first-of-type': {
            marginLeft: theme.spacing(2)
        }
    },
    headerRow: {
        alignItems: 'center',
        borderBottom: `4px solid ${theme.palette.divider}`,
        borderTop: `1px solid ${theme.palette.divider}`,
        color: tableHeaderColor,
        display: 'flex',
        fontFamily: headerFontFamily,
        fontSize: bodyFontSize,
        fontWeight: 'bold',
        flexDirection: 'row',
        height: theme.spacing(headerGridHeight),
        textTransform: 'uppercase'
    },
    logLink: {
        '&:not(:first-child)': {
            borderLeft: `1px solid ${theme.palette.divider}`,
            marginLeft: theme.spacing(1),
            paddingLeft: theme.spacing(1)
        }
    },
    logLinksContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    noRowsContent: {
        color: tablePlaceholderColor,
        margin: `${theme.spacing(5)}px auto`,
        textAlign: 'center'
    },
    row: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [`&.${selectedClassName}`]: {
            backgroundColor: listhoverColor
        },
        '$childrenContainer &': {
            borderBottom: 'none',
            '&:not(:first-of-type)': {
                borderTop: `1px solid ${theme.palette.divider}`
            }
        }
    },
    rowColumns: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    rowColumn: {
        flexGrow: 0,
        flexShrink: 0,
        marginRight: theme.spacing(1),
        minWidth: 0,
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '&:first-of-type': {
            marginLeft: theme.spacing(2)
        }
    },
    scrollContainer: {
        flex: '1 1 0',
        overflowY: 'scroll',
        paddingBottom: theme.spacing(3)
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

export const useColumnStyles = makeStyles((theme: Theme) => ({
    columnName: {
        flexGrow: 1,
        // We want this to fluidly expand into whatever available space,
        // so no minimum width.
        flexBasis: 0,
        overflow: 'hidden',
        '&:first-of-type': {
            marginLeft: theme.spacing(7)
        }
    },
    columnType: {
        flexBasis: nodeExecutionsTableColumnWidths.type
    },
    columnStatus: {
        flexBasis: nodeExecutionsTableColumnWidths.phase
    },
    columnStartedAt: {
        flexBasis: nodeExecutionsTableColumnWidths.startedAt
    },
    columnDuration: {
        flexBasis: nodeExecutionsTableColumnWidths.duration,
        textAlign: 'right'
    },
    columnLogs: {
        flexBasis: nodeExecutionsTableColumnWidths.logs,
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2)
    },
    selectedExecutionName: {
        fontWeight: 'bold'
    }
}));
