-- name: get
SELECT * FROM project_person

-- name: populate_project
SELECT
  person.*,
  project_position.name AS positionName,
  project_position.id AS positionId
FROM project_person
INNER JOIN person ON project_person.person_id = person.id
INNER JOIN project_position ON project_person.project_position_id = project_position.id
WHERE
  project_person.project_id = :project_id
ORDER BY
  project_position.priority ASC,
  person.lastName ASC

-- name: populate_projects
SELECT
  person.*,
  project_position.name AS positionName,
  project_position.id AS positionId,
  project_person.project_id
FROM project_person
INNER JOIN person ON project_person.person_id = person.id
INNER JOIN project_position ON project_person.project_position_id = project_position.id
WHERE
  project_person.project_id IN :project_ids
ORDER BY
  project_position.priority ASC,
  person.lastName ASC

-- name: fetch
SELECT * FROM project_person WHERE id = :id

-- name: create
INSERT INTO project_person (person_id, project_position_id, project_id) VALUES :$project_person{person_id, project_position_id, project_id}

-- name: update
UPDATE project_person SET :@project_person{person_id, project_position_id, project_id} WHERE id = :id

-- name: remove
DELETE FROM project_person WHERE id IN :ids
