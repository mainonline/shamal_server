import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import {CourseModel} from "./course.model";


export interface LessonModel
    extends Model<InferAttributes<LessonModel>, InferCreationAttributes<LessonModel>> {
    id: CreationOptional<number>;
    color?: string;
    status: string;
    duration: number;
    startTime: string;
    endTime: string;
    topic: string;
    courseId?: ForeignKey<CourseModel["id"]>
    centerId: ForeignKey<CenterModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Lesson = db.define<LessonModel>('lesson',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    color: {type: DataTypes.STRING, defaultValue: 'blue'},
    topic: {type: DataTypes.STRING, defaultValue: ''},
    status: {type: DataTypes.STRING, defaultValue: 'pending'},
    startTime: {type: DataTypes.TIME},
    endTime: {type: DataTypes.TIME},
    duration: {type: DataTypes.INTEGER},
    courseId: {type: DataTypes.INTEGER},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(Lesson);
Lesson.belongsTo(Center);


export default Lesson;