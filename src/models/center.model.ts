import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "./index"


export interface CenterModel extends Model<InferAttributes<CenterModel>, InferCreationAttributes<CenterModel>> {
    id: CreationOptional<number>;
    name: string;
    description?: string;
    createdAt: CreationOptional<Date>,
    updatedAt: CreationOptional<Date>
}

const Center = db.define<CenterModel>('center',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: 'ADMINISTRATOR', allowNull: false},
    description: {type: DataTypes.STRING, defaultValue: ''},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});


export default Center;