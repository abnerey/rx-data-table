export const DataTableStrategies = Object.freeze({
    NORMAL: 'NORMAL',
    GROUP: 'GROUP'
}) as DataTableStrategy;

export interface DataTableStrategy {
    NORMAL: string;
    GROUP: string;
}
