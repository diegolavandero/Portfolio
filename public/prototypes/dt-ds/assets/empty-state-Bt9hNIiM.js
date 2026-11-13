const e="Empty state",t="nav.emptyState",n="Centered placeholder for empty lists, tables and panels. Icon tile + title + one-line description, with an optional CTA. Use a primary CTA when the user can create the first item here; drop the CTA when the data fills in elsewhere.",a=["empty","state","placeholder","no data","sin datos","vacío","zero state","blank","first run","onboarding","no results","sin resultados","reportes","usuarios","cta"],o={containerPadding:"48px 24px",containerPaddingCompact:"28px 20px",verticalGap:"10px · compact 8px",iconTileSize:"44px · compact 36px",iconTileRadius:"8px",iconTileBg:"var(--n2) · #F0F2F5",iconSize:"22px · compact 18px",iconColor:"var(--n45) · #8FA0BA",titleFont:"700 14px var(--font-sans)",titleColor:"var(--n7) · #39414D",descFont:"400 13px/1.5 var(--font-sans)",descColor:"var(--n5) · #67768D",descMaxWidth:"280px",ctaMarginTop:"6px"},i=[{id:"primary-cta",label:"Con CTA primario",description:"First-run state where the user can create the first item right here. Uses .btn.pri with an action verb (e.g. 'Crear primer reporte'). One primary action per empty state."},{id:"secondary-cta",label:"Con CTA secundario",description:"Lower-emphasis action — adjust a filter, change a date range, or a non-creation alternative. Uses .btn.sec."},{id:"no-cta",label:"Sin CTA (informativo)",description:"Data is populated elsewhere (another form, an automated process, or a permission the user lacks). Icon + title + description only — no button."},{id:"compact",label:"Compacto (inline)",description:"Reduced padding and smaller icon for small panels or sections inside a card. Add the .compact modifier."},{id:"no-results",label:"Sin resultados (búsqueda)",description:"Search or filter returned nothing. Uses a subtle .btn.sub action to clear filters and recover."}],r=`<!-- Empty state -->
<div class="dt-empty">
  <div class="dt-empty-icon"><!-- IBM Carbon icon 22px --></div>
  <p class="dt-empty-ttl">Sin reportes programados</p>
  <p class="dt-empty-desc">Crea un reporte programado para recibirlo por correo.</p>
  <!-- CTA opcional: omitir para el estado informativo -->
  <button class="btn pri">Crear primer reporte</button>
</div>

<!-- Modifier: compacto para paneles pequeños -->
<div class="dt-empty compact"> … </div>

/* ── CSS ── */
.dt-empty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:48px 24px}
.dt-empty.compact{padding:28px 20px;gap:8px}
.dt-empty-icon{width:44px;height:44px;border-radius:8px;background:var(--n2);display:flex;align-items:center;justify-content:center;color:var(--n45);flex-shrink:0}
.dt-empty.compact .dt-empty-icon{width:36px;height:36px}
.dt-empty-icon svg{width:22px;height:22px;fill:currentColor;stroke:none}
.dt-empty.compact .dt-empty-icon svg{width:18px;height:18px}
.dt-empty-ttl{font:700 14px var(--font-sans);color:var(--n7)}
.dt-empty-desc{font:400 13px/1.5 var(--font-sans);color:var(--n5);max-width:280px}
.dt-empty .btn{margin-top:6px}`,s=`Source: sections/components/empty-state.json
Used in: DES-827 Profile Settings (Reportes programados, Acceso y usuarios)

Guidance:
- WITH CTA: the user can create the first item from here. One primary action (.btn.pri) with an action verb.
- WITHOUT CTA: data is populated elsewhere or the user lacks permission. Icon + title + description only.
- Title: short noun phrase describing what's missing ('Sin reportes programados').
- Description: one line, explains how the area gets populated. Max-width 280px.
- Icon: always IBM Carbon, fill (never stroke), color var(--n45) inside an n2 tile.
- Compact modifier for small panels/cards inside a layout.`,p={title:e,titleKey:t,description:n,keywords:a,tokens:o,variants:i,code:r,pageUsage:s};export{r as code,p as default,n as description,a as keywords,s as pageUsage,e as title,t as titleKey,o as tokens,i as variants};
