-- name: get_by_email
SELECT * FROM user WHERE email = :email

-- name: get
SELECT * FROM user

-- name: fetch
SELECT * FROM user WHERE id = :id

-- name: create
INSERT INTO user (email, password, role) VALUES :$user{email, password, role}

-- name: update
UPDATE user SET :@user{email, password, role} WHERE id = :id

-- name: remove
DELETE FROM user WHERE id IN :ids