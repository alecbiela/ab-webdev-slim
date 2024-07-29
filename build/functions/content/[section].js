const formatMyStack = (raw) => {
  return raw.results.reduce((a, row) => {
    if (!a[row.category])
      a[row.category] = { proficient: [], learning: [], motivated: [] }
    switch (row.level) {
      case 0:
        a[row.category].motivated.push({
          name: row.name,
          subtext: row.subtext,
        })
        break
      case 5:
        a[row.category].learning.push({
          name: row.name,
          subtext: row.subtext,
        })
        break
      case 10:
        a[row.category].proficient.push({
          name: row.name,
          subtext: row.subtext,
        })
        break
    }
    return a
  }, {})
}

export async function onRequest(context) {
  // The action is surfaced in context.params.{{name}}
  // If double brackets such as [[myval]] it will be an array
  const sec = context.params.section

  switch (sec) {
    case 'my_stack':
      const ps = context.env.AB_WEBDEV_DB.prepare('SELECT * from my_stack')
      const raw = await ps.all()
      return Response.json(formatMyStack(raw))

    default:
      return Response.json({})
  }
}
