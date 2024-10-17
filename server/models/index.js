import User from './user.js';
import Song from './song.js';
import Post from './post.js';

Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

Post.belongsTo(Song, { foreignKey: 'songId' });
Song.hasMany(Post, { foreignKey: 'songId' });

User.hasMany(Song, { foreignKey: 'userId' });
Song.belongsTo(User, { foreignKey: 'userId' });

export { User, Song, Post };