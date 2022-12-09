import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "./index"
import {UserModel} from "./User/user.model";


export interface CenterModel extends Model<InferAttributes<CenterModel>, InferCreationAttributes<CenterModel>> {
    id: CreationOptional<number>;
    name: string;
    description?: string;
    userId?: ForeignKey<UserModel["id"]>;
}

const Center = db.define<CenterModel>('center',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: 'ADMINISTRATOR', allowNull: false},
    description: {type: DataTypes.STRING, defaultValue: ''},
    userId: DataTypes.INTEGER
});


export default Center;