import fs from 'node:fs'
import postcss from 'postcss'

const simple = {
  'position:relative':'relative', 'position:absolute':'absolute', 'isolation:isolate':'isolate',
  'overflow:hidden':'overflow-hidden', 'display:flex':'flex', 'display:grid':'grid', 'display:block':'block', 'display:inline-flex':'inline-flex',
  'align-items:center':'items-center','align-items:start':'items-start','align-items:end':'items-end','align-self:end':'self-end',
  'justify-content:space-between':'justify-between','place-items:center':'place-items-center',
  'flex-direction:column':'flex-col','flex-wrap:wrap':'flex-wrap','flex:1':'flex-1','flex-shrink:0':'shrink-0',
  'font-weight:500':'font-medium','font-weight:600':'font-semibold','font-weight:400':'font-normal',
  'text-transform:uppercase':'uppercase','text-decoration:none':'no-underline','white-space:pre-line':'whitespace-pre-line',
  'object-fit:cover':'object-cover','object-fit:contain':'object-contain','object-position:center':'object-center',
  'mix-blend-mode:multiply':'mix-blend-multiply','list-style:none':'list-none','pointer-events:none':'pointer-events-none',
  'border-radius:50%':'rounded-full','width:100%':'w-full','height:1px':'h-px','margin-top:auto':'mt-auto',
  'grid-column:1 / -1':'col-span-full','transition:none':'transition-none',
}
const prefixes = {'width':'w','height':'h','min-width':'min-w','min-height':'min-h','max-width':'max-w','max-height':'max-h','padding':'p','padding-top':'pt','padding-bottom':'pb','padding-left':'pl','padding-right':'pr','margin':'m','margin-top':'mt','margin-bottom':'mb','margin-left':'ml','margin-right':'mr','gap':'gap','top':'top','left':'left','right':'right','bottom':'bottom','border-radius':'rounded','font-size':'text','line-height':'leading','letter-spacing':'tracking','grid-template-columns':'grid-cols','z-index':'z','scroll-margin-top':'scroll-mt'}
const val = v => v.replace(/\s+/g,'_')
function utility(prop, value) {
  const key = `${prop}:${value}`
  if(simple[key]) return simple[key]
  const token = value.match(/^var\(--(filas-[\w-]+)\)$/)?.[1]
  if(token && prop==='color') return `text-${token}`
  if(token && prop==='background') return `bg-${token}`
  if(prop==='color') return `text-[${val(value)}]`
  if(prefixes[prop] && !value.includes(' ') && !value.includes(',')) {
    const prefix=prefixes[prop]
    if(value==='0') return `${prefix}-0`
    if(value==='auto') return `${prefix}-auto`
    if(value.endsWith('px') && Number.parseFloat(value)%4===0) return `${prefix}-${Number.parseFloat(value)/4}`
    return `${prefix}-[${val(value)}]`
  }
  return `[${prop}:${val(value)}]`
}

for(const name of ['GrowthHero','GrowthIntro','Approach']) {
  const base=`src/blocks/Homepage/${name}`
  const root=postcss.parse(fs.readFileSync(base+'.module.css','utf8'))
  const classes={}
  root.walkRules(rule=>{
    const media = rule.parent.type==='atrule' ? `[@media${val(rule.parent.params)}]:` : ''
    for(const selector of rule.selectors) {
      const match=selector.match(/^\.([\w]+)(.*)$/)
      if(!match) throw Error(selector)
      const [,name,suffix]=match
      const tail=suffix.replace(/\.photo/g,'img').replace(/\.marketplaceName/g,'span')
      const variant=tail ? `[&${val(tail)}]:` : ''
      const list=classes[name]??=[]
      rule.walkDecls(d=>list.push(media+variant+utility(d.prop,d.value)))
    }
  })
  let source=fs.readFileSync(base+'.tsx','utf8').replace(/^import styles from .*\r?\n/m,'')
  source=source.replace(/className=\{`([^`]+)`\}/g,(_, template)=>'className='+JSON.stringify(template.replace(/\$\{styles\.(\w+)\}/g,(_,n)=>classes[n].join(' '))))
  source=source.replace(/\{styles\.(\w+)\}/g,(_,n)=>JSON.stringify(classes[n].join(' ')))
  fs.writeFileSync(base+'.tsx',source)
}
