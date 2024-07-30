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

const formatAcademic = (raw) => {
  for (let i = 0; i < raw.results.length; i++) {
    raw.results[i].links = JSON.parse(raw.results[i].links)
  }
  return raw.results
}

export async function onRequest(context) {
  // The action is surfaced in context.params.{{name}}
  // If double brackets such as [[myval]] it will be an array
  const sec = context.params.section

  switch (sec) {
    case 'my_stack':
      const psms = context.env.AB_WEBDEV_DB.prepare('SELECT * from my_stack')
      const rawms = await psms.all()
      return Response.json(formatMyStack(rawms))

    case 'academic_work':
      // This statement gets all academic work and concats the links associated with them
      // (from the academic_work_link table) into a JSON array under "links"
      const psaw = context.env.AB_WEBDEV_DB.prepare(
        "SELECT a.id, a.title, a.subtitle, concat('[', group_concat( JSON_OBJECT('type', l.type, 'link', l.link, 'icon', l.icon, 'tooltip', l.tooltip), ','), ']') as links FROM academic_work a JOIN academic_work_link l ON a.id = l.academic_work_id GROUP BY a.id"
      )
      const rawaw = await psaw.all()
      return Response.json(formatAcademic(rawaw))
    default:
      return Response.json({})
  }
}
