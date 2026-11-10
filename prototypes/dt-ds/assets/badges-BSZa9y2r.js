const e="Badges & tags",a="nav.badges",o="Pill-shaped, 11px semibold. Status badges llevan un dot cuando el estado es live. Chips con avatares referencian usuarios o productos.",n=["badges","tags","pills","chips","status","activo","bloqueado"],t=[{label:"Activo",type:"success",dot:!0},{label:"Bloqueado",type:"danger",dot:!0},{label:"Aproximado",type:"warning",dot:!0},{label:"En ruta",type:"info"},{label:"Borrador",type:"neutral"},{label:"Pendiente",type:"outline"}],s=[{label:"Maya Jonson",initials:"MJ",avatarBg:"#1F60ED",avatarColor:"#fff"},{label:"Planner",initials:"PL",avatarBg:"#47D09A",avatarColor:"#fff",chipBg:"#EDF5FF",chipColor:"#0052CC"}],l={success:{bg:"#E3FCEF",color:"#00875A"},danger:{bg:"#FFEBE6",color:"#DE350B"},warning:{bg:"#FFFAE6",color:"#FF8B00"},info:{bg:"#EDF5FF",color:"#0052CC"},neutral:{bg:"#F0F2F5",color:"#39414D"},outline:{bg:"#fff",color:"#39414D",border:"#C5D2E7"}},r=`Function : badgeHtml(label, variant)   ← module-level in renderers.js
Source   : sections/components/badges.json

Variants:
  success  → green   (Entregado, Exitoso)
  danger   → red     (No entregado, Cancelado)
  warning  → amber   (En tránsito, Pendiente)
  info     → blue    (Asignada, Nuevo)
  neutral  → gray    (Ingresada, Sin estado)
  outline  → border  (Label, Tag)

Example: badgeHtml('Entregado', 'success')`,i={title:e,titleKey:a,description:o,keywords:n,badges:t,chips:s,tokenMap:l,pageUsage:r};export{t as badges,s as chips,i as default,o as description,n as keywords,r as pageUsage,e as title,a as titleKey,l as tokenMap};
