-- name: get
SELECT * FROM project_position

-- name: fetch
SELECT * FROM project_position WHERE id = :id

-- name: create
INSERT INTO project_position (name, priority) VALUES :$project_position{name, priority}

-- name: update
UPDATE project_position SET :@project_position{name, priority} WHERE id = :id

-- name: remove
DELETE FROM project_position WHERE id IN :ids