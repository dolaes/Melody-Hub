import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection.js";
import User from "./user.js";
import Song from "./song.js";

class Post extends Model {}

Post.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Song, key: "id" },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1, max: 5 },
    },
    comment: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "post",
    timestamps: true, // to track createdAt and updatedAt
    freezeTableName: true,
  }
);


export default Post;
