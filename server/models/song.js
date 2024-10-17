
import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection.js";

class Song extends Model {}

Song.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    trackId: { type: DataTypes.STRING, allowNull: false }, // external song id
    trackName: { type: DataTypes.STRING, allowNull: false },
    artistName: { type: DataTypes.STRING, allowNull: false },
    albumName: { type: DataTypes.STRING, allowNull: true },
    albumImageUrl: { type: DataTypes.STRING, allowNull: true },
    playerUri: { type: DataTypes.STRING, allowNull: true }, // e.g., Spotify URI
  },
  {
    sequelize,
    modelName: "song",
    timestamps: false,
    freezeTableName: true,
  }
);

export default Song;
