import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import {GroupModel} from "./group.model";
import {CourseModel} from "./course.model";


export interface GroupCourseModel
    extends Model<InferAttributes<GroupCourseModel>, InferCreationAttributes<GroupCourseModel>> {
    id: CreationOptional<number>;
    centerId: ForeignKey<CenterModel["id"]>;
    groupId: ForeignKey<GroupModel["id"]>;
    courseId: ForeignKey<CourseModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const GroupCourse = db.define<GroupCourseModel>('group_course',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    courseId: {type: DataTypes.INTEGER, allowNull: false},
    groupId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(GroupCourse);
GroupCourse.belongsTo(Center);


export default GroupCourse;