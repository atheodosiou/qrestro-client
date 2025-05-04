import { ITableCol } from "../../shared/models/table-col.interface";

export const MENU_ITEM_COLUMNS: ITableCol[] = [
    { field: 'name', header: 'Name', style: { width: '300px' } },
    { field: 'description', header: 'Description' },
    { field: 'price', header: 'Price (€)', style: { width: '120px' } },
    { field: 'isAvailable', header: 'Available', style: { width: '120px' } },
    { field: 'actions', header: 'Actions', style: { width: '100px' } },
];