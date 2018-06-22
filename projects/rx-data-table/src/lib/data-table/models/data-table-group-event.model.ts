export class DataTableGroupEvent {
    constructor(public group,
                public expanded = false,
                public preventDefault?: any) {}
}
