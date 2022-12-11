import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import courseModel from "./course.model";


export interface CourseTypeModel
    extends Model<InferAttributes<CourseTypeModel>, InferCreationAttributes<CourseTypeModel>> {
    id: CreationOptional<number>;
    name: string;
    color?: string;
    centerId: ForeignKey<CenterModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const CourseType = db.define<CourseTypeModel>('course_type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, defaultValue: 'blue'},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(CourseType);
CourseType.belongsTo(Center);


export default CourseType;