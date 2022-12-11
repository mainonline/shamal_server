import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import CourseType, {CourseTypeModel} from "./courseType.model";
import Lesson from "./lesson.model";


export interface CourseModel
    extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
    id: CreationOptional<number>;
    name: string;
    color?: string;
    description?: string;
    duration: number;
    start: Date;
    end: Date;
    weekDays: any[];
    typeId?: ForeignKey<CourseTypeModel["id"]>
    centerId: ForeignKey<CenterModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Course = db.define<CourseModel>('course',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, defaultValue: 'blue'},
    description: {type: DataTypes.STRING, defaultValue: ''},
    duration: {type: DataTypes.INTEGER, defaultValue: 90},
    start: {type: DataTypes.DATE, defaultValue: Date.now()},
    end: {type: DataTypes.DATE },
    weekDays: {type: DataTypes.ARRAY(DataTypes.STRING)},
    typeId: {type: DataTypes.INTEGER},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(Course);
Course.belongsTo(Center);

CourseType.hasMany(Course);
Course.belongsTo(CourseType);

Course.hasMany(Lesson);
Lesson.belongsTo(Course);


export default Course;