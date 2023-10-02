//on local postgre db server
module.exports = {
  selectStatement: (fields) => {
    let query = 'SELECT '
    if(fields.length == 0) {
      query += '* '
    } else {
      fields.map((field, idx) => {
        query += field + (idx == fields.length - 1 ? ' ' : ', ')
      })
    }
    return query
  },

  whereStatement: (whereClauses) => {
    let query = 'WHERE '
    if(whereClauses.length == 0) {
      return ''
    } else {
      whereClauses.map((whereClause, idx) => {
        query += (idx == 0 ? '' : ' AND ') + whereClause.val1 + ' ' + (whereClause.opt == undefined || whereClause.opt == null || whereClause.opt == '' ? '=' : whereClause.opt ) + ' ' + whereClause.val2
      })
    }

    query += ' '
    return query
  },

  pageStatement: (perPage, currentPage) => {
    let query = ''
    if(!!perPage && !!currentPage) {
      query += ' LIMIT ' + perPage + ' OFFSET ' + (currentPage - 1) * perPage
    }
    
    return query
  },

  queryBuilder: (selectStatement, fromStatement, whereStatement, otherStatement, pageStatement) => {
    return selectStatement + ' ' + fromStatement + ' ' + whereStatement + ' ' + otherStatement + ' ' + pageStatement
  },
};
