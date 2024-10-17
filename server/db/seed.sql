-- Disable Foreign Key Checks by disabling triggers (PostgreSQL doesn't support disabling FK checks directly)

ALTER TABLE users DISABLE TRIGGER ALL;
ALTER TABLE songs DISABLE TRIGGER ALL;
ALTER TABLE posts DISABLE TRIGGER ALL;
ALTER TABLE comments DISABLE TRIGGER ALL;

-- Truncate tables and reset identity sequences
TRUNCATE TABLE comments, posts, songs, users RESTART IDENTITY CASCADE;

-- Re-enable Foreign Key Checks by enabling triggers

ALTER TABLE users ENABLE TRIGGER ALL;
ALTER TABLE songs ENABLE TRIGGER ALL;
ALTER TABLE posts ENABLE TRIGGER ALL;
ALTER TABLE comments ENABLE TRIGGER ALL;

-- Insert Users

INSERT INTO users (username, email, password)
VALUES ('user1',
        'user1@example.com',
        'hashedpassword1'), ('user2',
                             'user2@example.com',
                             'hashedpassword2');

-- Insert Songs

INSERT INTO songs (songId, trackName, artistName, albumName, imageUrl, playerUri)
VALUES ('song1',
        'Song Title 1',
        'Artist 1',
        'Album 1',
        'https://example.com/image1.jpg',
        'spotify:track:xyz1'), ('song2',
                                'Song Title 2',
                                'Artist 2',
                                'Album 2',
                                'https://example.com/image2.jpg',
                                'spotify:track:xyz2');

-- Insert Posts (correct integer songId references)

INSERT INTO posts (userId, songId, rating, comment)
VALUES (1,
        1,
        5,
        'Amazing song!'), (2,
                           2,
                           4,
                           'Pretty good, I enjoyed it.');

-- Insert Comments (ensure valid postId references)

INSERT INTO comments (userId, postId, content)
VALUES (1,
        1,
        'Great review!'), (2,
                           2,
                           'I agree with this review.');
