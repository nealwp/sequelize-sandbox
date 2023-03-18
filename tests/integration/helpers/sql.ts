// truncates
export const truncateCharacterSql = 'TRUNCATE TABLE character RESTART IDENTITY CASCADE'
export const truncateInventorySql = 'TRUNCATE TABLE inventory RESTART IDENTITY CASCADE'
export const truncateWeaponSql = 'TRUNCATE TABLE weapon RESTART IDENTITY CASCADE'

// single inserts
export const insertOneCharacterSql = `
    insert into character (id, name, age, created_at, updated_at)
    values (:id, :name, :age, :createdAt, :updatedAt)
`

export const insertOneInventorySql = `
    insert into inventory (id, character_id, created_at, updated_at)
    values (:id, :characterId, :createdAt, :updatedAt) 
`
export const insertOneWeaponSql = ``

// select by id
export const selectCharacterByIdSql = `select * from character where id = :id`
export const selectInventoryByIdSql = `select * from inventory where id = :id`
export const selectWeaponByIdSql = `select * from weapon where id = :id`

