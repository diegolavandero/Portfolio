const e="Buttons",t="nav.buttons",o="Pill-shaped (border-radius: 50px), body-small-bold 14px/20px 700. Height 32px desktop. Siete variantes. Un primary por vista.",r=["buttons","cta","primary","secondary","tertiary","danger","pill"],n={radius:"50px",height:"32px",heightTall:"56px",padding:"0 16px",borderWidth:"1px",minWidth:"64px",fontSize:"14px",lineHeight:"20px",fontWeight:700},a={height:"48px",heightTall:"56px",padding:"0 24px",fontSize:"14px",lineHeight:"16px",minWidth:"64px",note:"Touch target mínimo 48px. Botones full-width frecuentes en vistas móviles."},l=[{name:"primary",label:"Primary",states:[{label:"Default",text:"Guardar",bg:"#4B82FA",color:"#fff",border:"none"},{label:"Hover",text:"Hover",bg:"#1F60ED",color:"#fff",border:"none"},{label:"Active",text:"Active",bg:"#0052CC",color:"#fff",border:"none"},{label:"Disabled",text:"Disabled",bg:"#E1E6ED",color:"#8FA0BA",border:"none"}]},{name:"secondary",label:"Secondary",states:[{label:"Default",text:"Cancelar",bg:"#fff",color:"#4B82FA",border:"1px solid #1F60ED"},{label:"Hover",text:"Hover",bg:"#EDF5FF",color:"#4B82FA",border:"1px solid #1F60ED"},{label:"Active",text:"Active",bg:"#D1E0FF",color:"#4B82FA",border:"1px solid #1F60ED"}]},{name:"tertiary",label:"Tertiary",states:[{label:"Default",text:"Ver más",bg:"#fff",color:"#39414D",border:"1px solid #C5D2E7"},{label:"Hover",text:"Hover",bg:"#EDF5FF",color:"#39414D",border:"1px solid #C5D2E7"}]},{name:"text",label:"Text",states:[{label:"Default",text:"Ver detalles",bg:"transparent",color:"#4B82FA",border:"none"},{label:"Hover",text:"Hover",bg:"transparent",color:"#4B82FA",border:"none",underline:!0}]},{name:"danger",label:"Danger",states:[{label:"Default",text:"Eliminar",bg:"#FF5630",color:"#fff",border:"none"},{label:"Hover",text:"Hover",bg:"#DE350B",color:"#fff",border:"none"},{label:"Active",text:"Active",bg:"#BF2600",color:"#fff",border:"none"}]},{name:"tertiary-blue",label:"Tertiary blue",states:[{label:"Default",text:"Acción",bg:"#fff",color:"#4B82FA",border:"1px solid #4B82FA"}]},{name:"tertiary-red",label:"Tertiary red",states:[{label:"Default",text:"Eliminar",bg:"#fff",color:"#FF5630",border:"1px solid #FF5630"}]}],i=`/* Source: styles/packages/button/src/ — Honeypot */
.hp-button {
  font: 700 14px/20px /* body-small-bold */ 'DM Sans'; /* hp-typography__button--medium */
  height: 32px;       /* $hp-button-size */
  padding: 0 16px;    /* $hp-space-x-large */
  border-radius: 50px; /* $hp-button-border-basic-radius */
  border: none;
  min-width: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.hp-button--primary        { background: #4B82FA; color: #fff; } /* $dt-primary-main */
.hp-button--primary:hover  { background: #1F60ED; } /* $dt-primary-middle */
.hp-button--primary:active { background: #0052CC; } /* $dt-primary-dark */
.hp-button--secondary      { background: #fff; color: #4B82FA; border: 1px solid #1F60ED; }
.hp-button--tertiary       { background: #fff; color: #39414D; border: 1px solid #C5D2E7; }
.hp-button--danger         { background: #FF5630; color: #fff; } /* $dt-feedback-r3 */
.hp-button--tall           { height: 56px; } /* $hp-button-tall-size, submit actions */
.hp-button:disabled        { background: #E1E6ED; color: #8FA0BA; }`,s=`Renderer : renderers.buttons(data)
Source   : sections/components/buttons.json  →  tokens + variants[n].states

⚠️  In page templates: use full inline styles — NEVER the .btn CSS class.

Key tokens (from buttons.json):
  height        : 32px
  border-radius : 50px
  font          : 700 14px/1 var(--font-sans)
  padding       : 0 16px
  borderWidth   : 1px

Secondary → bg:#fff  color:#4B82FA  border:1px solid #1F60ED
Primary   → bg:var(--b6)  color:#fff  border:none`,b={title:e,titleKey:t,description:o,keywords:r,tokens:n,mobileTokens:a,variants:l,code:i,pageUsage:s};export{i as code,b as default,o as description,r as keywords,a as mobileTokens,s as pageUsage,e as title,t as titleKey,n as tokens,l as variants};
