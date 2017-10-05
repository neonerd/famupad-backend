-- name: get
SELECT * FROM department

-- name: fetch
SELECT * FROM department WHERE id = :id

-- name: create
INSERT INTO department (name, acronym) VALUES :$department{name, acronym}

-- name: update
UPDATE department SET :@department{name, acronym} WHERE id = :id

-- name: remove
DELETE FROM department WHERE id IN :ids
