-- name: get
SELECT * FROM project_type

-- name: fetch
SELECT * FROM project_type WHERE id = :id

-- name: create
INSERT INTO project_type (name) VALUES :$project_type{name}

-- name: update
UPDATE project_type SET :@project_type{name} WHERE id = :id

-- name: remove
DELETE FROM project_type WHERE id IN :ids
