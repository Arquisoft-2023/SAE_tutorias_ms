import { Car } from "../interfaces/ejemCar.interface";
import ItemModel from "../models/ejemplo";

const insertItem = async (item: Car) => {
    const responseInsert = await ItemModel.create(item);
    return responseInsert;
};

const getCar = async () => {
    const responseItem = await ItemModel.find({});
    return responseItem;
};

const getCarid = async (id: string) => {
    const responseItem = await ItemModel.findOne({_id: id});
    return responseItem;
};


export { insertItem , getCar, getCarid };