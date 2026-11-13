const e="Inputs & Dropdowns",n="nav.inputs",t="32px height text inputs and dropdowns. Inputs: with-label group (forms) and without-label group (filters). Dropdowns: single-select and multiselect with border / borderless themes.",l=["inputs","forms","text","field","filter","search","label","placeholder","validation","dropdown","select","multiselect","combobox","chip"],a={height:"32px",borderRadius:"6px",paddingHorizontal:"10px",bg:"#ffffff",strokeInactive:"var(--n3) · #E1E6ED",strokeFocused:"var(--b6) · #1F60ED · 2px",strokeFilled:"var(--n5) · #67768D",strokeError:"var(--r6) · #DE350B",strokeValid:"var(--g5) · #36B37E",bgDisabled:"var(--n1) · #F5F6FA",placeholderColor:"var(--n6) · #4B5564",textColor:"var(--n7) · #39414D",textStyle:"body-small · 14px / 400",labelStyle:"caption · 12px / 400",helperStyle:"caption · 12px / 400"},o=[{id:"with-label",label:"With label",description:"Used in forms. A caption label sits above the input.",variants:[{id:"default",label:"Default",state:"default",placeholder:"Placeholder"},{id:"filled",label:"Filled",state:"filled",value:"example"},{id:"focused",label:"Focused",state:"focused",placeholder:"Placeholder"},{id:"error",label:"Error",state:"error",value:"example",trailingIcon:"error",helperText:"Optional helper text"},{id:"valid",label:"Valid",state:"valid",value:"example",trailingIcon:"success"},{id:"disabled",label:"Disabled",state:"disabled",value:"example"},{id:"tooltip",label:"With tooltip",state:"default",placeholder:"Placeholder",labelTooltip:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."}]},{id:"no-label",label:"Without label",description:"Used in filters and compact contexts. No label above the field.",variants:[{id:"default",label:"Default",state:"default",placeholder:"Buscar..."},{id:"filled",label:"Filled",state:"filled",value:"Filtro activo"},{id:"focused",label:"Focused",state:"focused",placeholder:"Buscar..."},{id:"icon",label:"With icon",state:"default",placeholder:"Buscar...",trailingIcon:"search"},{id:"disabled",label:"Disabled",state:"disabled",value:"Valor bloqueado"}]}],r=`/* ── With label (forms) ── */
<div class="dt-input-group">
  <label class="dt-input-label">Label</label>
  <input
    class="dt-input"
    type="text"
    placeholder="Placeholder"
    value={value}
    onChange={e => setValue(e.target.value)}
  />
</div>

/* ── Label with tooltip ── */
<div class="dt-input-group">
  <label class="dt-input-label">
    Label
    <Tooltip content="Help text here"><InfoIcon /></Tooltip>
  </label>
  <input class="dt-input" type="text" />
</div>

/* ── Error state ── */
<div class="dt-input-group">
  <label class="dt-input-label">Label</label>
  <div class="dt-input-wrap">
    <input class="dt-input dt-input--error" type="text" value={value} />
    <ErrorFilledIcon class="dt-input-icon dt-input-icon--error" />
  </div>
  <span class="dt-input-helper dt-input-helper--error">Optional helper text</span>
</div>

/* ── Valid state ── */
<div class="dt-input-wrap">
  <input class="dt-input dt-input--valid" type="text" value={value} />
  <CheckmarkFilledIcon class="dt-input-icon dt-input-icon--valid" />
</div>

/* ── Without label (filters) ── */
<input
  class="dt-input"
  type="text"
  placeholder="Buscar..."
  value={value}
  onChange={e => setValue(e.target.value)}
/>

/* ── Disabled ── */
<input class="dt-input" type="text" value="Valor bloqueado" disabled />

/* ── CSS tokens ── */
.dt-input {
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--n3);
  border-radius: 6px;
  background: #fff;
  font: 400 14px/20px var(--font-sans);
  color: var(--n7);
  width: 100%;
}
.dt-input::placeholder { color: var(--n6); }
.dt-input:focus {
  outline: none;
  border: 2px solid var(--b6);
}
.dt-input--error { border-color: var(--r6); }
.dt-input--valid  { border-color: var(--g5); }
.dt-input:disabled {
  background: var(--n1);
  cursor: not-allowed;
  opacity: .6;
}
.dt-input-label {
  font: 400 12px/16px var(--font-sans);
  color: var(--n7);
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.dt-input-helper {
  font: 400 12px/16px var(--font-sans);
  color: var(--n5);
  margin-top: 3px;
}
.dt-input-helper--error { color: var(--r6); }`,i=["Todos","Esta semana","Este mes","Últimos 3 meses","Rango personalizado"],d=["Todos","Santiago","Valparaíso","Biobío","Maule"],s={height:"32px",borderRadius:"6px",strokeBorder:"var(--n3) · #E1E6ED",strokeActive:"var(--b6) · #1F60ED · 2px",strokeFilled:"var(--n5) · #67768D",bgDefault:"#ffffff",bgHover:"var(--n2) · #F0F2F5",bgDisabled:"var(--n1) · #F5F6FA",textFilled:"var(--n7) · #39414D",textEmpty:"var(--n6) · #4B5564",textDisabled:"var(--n5) · #67768D",menuBg:"#ffffff",menuBorder:"var(--n3)",menuShadow:"0 4px 16px rgba(0,0,0,.12)",menuRadius:"6px",optionHeight:"36px",chipBg:"var(--b1)",chipBorder:"var(--b3)",chipText:"var(--b6)",chipHeight:"20px",chipRadius:"999px"},p=`/* ── Single select ── */
<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder='Select an option...'
  theme='border'
/>

/* ── Borderless theme ── */
<Select
  theme='borderless'
  options={options}
  value={value}
  onChange={setValue}
/>

/* ── With leading icon ── */
<Select
  leadingIcon={<ListIcon />}
  options={options}
  value={value}
/>

/* ── Multiselect ── */
<MultiSelect
  options={options}
  value={selected}          // string[]
  onChange={setSelected}
  placeholder='Select options...'
/>

/* ── CSS tokens ── */
.dt-select {
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--n3);
  border-radius: 6px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.dt-select:hover { background: var(--n2); }
.dt-select.open   { border: 2px solid var(--b6); }
.dt-select.filled { border-color: var(--n5); }
.dt-select:disabled { background: var(--n1); opacity: .55; }

.dt-select--borderless {
  border-color: transparent;
  background: transparent;
}
.dt-select--borderless:hover { background: var(--n2); }

.dt-select-chip {
  height: 20px;
  padding: 0 6px;
  background: var(--b1);
  border: 1px solid var(--b3);
  border-radius: 999px;
  font: 400 12px/1 var(--font-sans);
  color: var(--b6);
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.dt-select-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid var(--n3);
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0,0,0,.12);
  z-index: 100;
  padding: 4px 0;
}
.dt-select-option {
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  font: 400 14px/20px var(--font-sans);
  color: var(--n7);
  cursor: pointer;
}
.dt-select-option:hover { background: var(--b1); color: var(--b7); }`,c=[{id:"number",label:"Number input",description:"Increments / decrements by 1. Minimum value: 0.",defaultValue:0,min:0},{id:"textarea",label:"Textarea",description:"Multi-line text. Fixed to 4 visible lines — scroll appears after.",placeholder:"Escribe tu mensaje aquí…"},{id:"password",label:"Password",description:"Characters hidden as dots. Eye icon toggles visibility.",placeholder:"Contraseña"},{id:"readonly",label:"Read only",description:"Non-editable. Styled like placeholder text with a lock icon.",value:"Valor por defecto"},{id:"search",label:"Search",description:"Press Enter or click the icon to trigger search / filter.",placeholder:"Buscar…"},{id:"input-button",label:"Input with button",description:"Pill button anchored inside the right edge. Use for inline actions (apply coupon, add tag, etc.).",placeholder:"Ingresa un valor…",buttonLabel:"Aplicar"}],u=`Renderer : renderers.inputs(data)
Source   : sections/components/inputs.json

Text input  → exact inline styles from renderVariant() in renderers.js inputs renderer
              height:32px · border-radius:6px · font:400 14px/20px · padding:0 10px

Dropdown    → dt-drop-wrap + dtDrop() / dtPickOpt()  (functions defined in index.html)
              Classes: .dt-drop-wrap  .dt-dtrigger  .dt-dlabel  .dt-dmenu
⚠️  Never use <select> — always use the dt-drop-wrap structure.`,b={title:e,titleKey:n,description:t,keywords:l,tokens:a,variantGroups:o,code:r,dropdownOptions:i,dropdownMultiOptions:d,dropdownTokens:s,dropdownCode:p,specialVariants:c,pageUsage:u};export{r as code,b as default,t as description,p as dropdownCode,d as dropdownMultiOptions,i as dropdownOptions,s as dropdownTokens,l as keywords,u as pageUsage,c as specialVariants,e as title,n as titleKey,a as tokens,o as variantGroups};
