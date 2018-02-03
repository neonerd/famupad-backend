module.exports = {
    mapFromMultipleToOne: (parents, children, propertyToMapTo, childrenMappingProperty) => {
        return parents.map(p => {
            p[propertyToMapTo] = children.filter(c => c[childrenMappingProperty] == p.id)
            return p
        })
    }
}