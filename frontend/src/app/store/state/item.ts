import { IItem } from '../../models/item'


export const initialItemState: IItem = {
    id: 0,
    owner: null,
    images: [],
    description: null,
    price: 0,
    available: false,
    hidden: false,
    tags: []
};