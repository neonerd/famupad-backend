-- name: get
SELECT 
  person.*,
  department.acronym AS departmentAcronym,
  department.name AS departmentName
FROM person
  LEFT JOIN department ON person.department_id = department.id
WHERE
  1=1
  :*departmentId{AND department_id = *}

-- name: fetch
SELECT * FROM person WHERE id = :id

-- name: create
INSERT INTO person (firstName, lastName, department_id, enrolledAt, isActiveStudent, email, phone, urlWeb, urlFacebook, slug, createdAt, updatedAt) VALUES :$person{firstName, lastName, department_id, enrolledAt, isActiveStudent, email, phone, urlWeb, urlFacebook, slug, createdAt, updatedAt}

-- name: update
UPDATE person SET :@person{firstName, lastName, department_id, enrolledAt, isActiveStudent, email, phone, urlWeb, urlFacebook, slug, createdAt, updatedAt} WHERE id = :id

-- name: remove
DELETE FROM person WHERE id IN :ids
