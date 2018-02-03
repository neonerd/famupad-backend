-- name: get
SELECT * FROM project_file

-- name: populate_project
SELECT
  *
FROM project_file
WHERE
  project_file.project_id = :project_id
ORDER BY
  project_file.name

-- name: populate_projects
SELECT
  *
FROM project_file
WHERE
  project_file.project_id IN :project_ids
ORDER BY
  project_file.name

-- name: fetch
SELECT * FROM project_file WHERE id = :id

-- name: create
INSERT INTO project_file (name, filename, hash, type, project_id) VALUES :$project_file{name, filename, hash, type, project_id}

-- name: update
UPDATE project_file SET :@project_file{name, filename, hash, type, project_id} WHERE id = :id

-- name: remove
DELETE FROM project_file WHERE id IN :ids
