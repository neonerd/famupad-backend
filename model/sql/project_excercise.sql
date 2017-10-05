-- name: get
SELECT * FROM project_excercise

-- name: fetch
SELECT * FROM project_excercise WHERE id = :id

-- name: create
INSERT INTO project_excercise (name) VALUES :$project_excercise{name}

-- name: update
UPDATE project_excercise SET :@project_excercise{name} WHERE id = :id

-- name: remove
DELETE FROM project_excercise WHERE id IN :ids
