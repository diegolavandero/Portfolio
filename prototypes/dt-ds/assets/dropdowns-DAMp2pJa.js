const n="Dropdowns",e="nav.dropdowns",o="Select and multiselect dropdowns. Height 32px. Two themes: border (1px n3 stroke) and borderless (no border). Active/open state uses 2px blue-6. Multiselect shows chip pills inside the trigger.",t=["dropdown","select","multiselect","filter","options","combobox","chip"],r=["Todos","Esta semana","Este mes","Últimos 3 meses","Rango personalizado"],s=["Todos","Santiago","Valparaíso","Biobío","Maule"],a={height:"32px",borderRadius:"6px",strokeBorder:"var(--n3) · #E1E6ED",strokeActive:"var(--b6) · #1F60ED · 2px",strokeFilled:"var(--n5) · #67768D",bgDefault:"#ffffff",bgHover:"var(--n2) · #F0F2F5",bgDisabled:"var(--n1) · #F5F6FA",textFilled:"var(--n7) · #39414D",textEmpty:"var(--n6) · #4B5564",textDisabled:"var(--n5) · #67768D",menuBg:"#ffffff",menuBorder:"var(--n3)",menuShadow:"0 4px 16px rgba(0,0,0,.12)",menuRadius:"6px",optionHeight:"36px",chipBg:"var(--b1)",chipBorder:"var(--b3)",chipText:"var(--b6)",chipHeight:"20px",chipRadius:"999px"},i=`/* ── Single select ── */
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
.dt-select-option:hover { background: var(--b1); color: var(--b7); }`,d={title:n,titleKey:e,description:o,keywords:t,options:r,multiOptions:s,tokens:a,code:i};export{i as code,d as default,o as description,t as keywords,s as multiOptions,r as options,n as title,e as titleKey,a as tokens};
