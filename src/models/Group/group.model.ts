import {Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey} from "sequelize";
import db from "../index"
import Center, {CenterModel} from "../center.model";
import Course from "./course.model";
import GroupCourse from "./grouptCourse.model";


export interface GroupModel
    extends Model<InferAttributes<GroupModel>, InferCreationAttributes<GroupModel>> {
    id: CreationOptional<number>;
    name: string;
    color?: string;
    limit?: string;
    description?: string;
    centerId: ForeignKey<CenterModel["id"]>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Group = db.define<GroupModel>('group',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, defaultValue: 'red'},
    description: {type: DataTypes.STRING, defaultValue: ''},
    limit: {type: DataTypes.STRING},
    centerId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATE},
    updatedAt: {type: DataTypes.DATE}
});

Center.hasMany(Group);
Group.belongsTo(Center);

Group.hasMany(GroupCourse);
GroupCourse.belongsTo(Group);

Course.hasMany(GroupCourse);
GroupCourse.belongsTo(Course);

Group.belongsToMany(Course, {through: GroupCourse});
Course.belongsToMany(Group, {through: GroupCourse});


export default Group;