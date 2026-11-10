const t="Tooltip",n="nav.tooltip",o="Dark surface (neutral-7) tooltip with caption text. Triggered by hovering the info icon (outline → filled on hover). Arrow points toward the trigger. Max-width 200px. Four placements: top, bottom, left, right. Persistent variant adds a close × button.",e=["tooltip","hover","help","info","popover"],i={bg:"var(--n7) · #39414D",textColor:"#ffffff",borderRadius:"6px",padding:"8px 10px",maxWidth:"200px",textStyle:"caption · 12px / 400",arrowSize:"5px",showDelay:"0ms",zIndex:"999"},l="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",r=["top","bottom","left","right"],s=`/* ── Info icon trigger — outline (default) / filled (hover) ── */
<label class="dt-input-label">
  Field label
  <Tooltip content="This field controls X behavior.">
    <InformationIcon />      {/* outline — default state */}
    <InformationFilledIcon /> {/* filled — shows on hover */}
  </Tooltip>
</label>

/* ── Hover tooltip (auto-dismiss on mouse-leave) ── */
<Tooltip content="Help text here" placement="top">
  <InformationIcon />
</Tooltip>

/* ── Persistent tooltip (manual close via × button) ── */
<Tooltip
  content="Help text here"
  placement="top"
  persistent            // stays visible; renders × close button
  onClose={() => setOpen(false)}
>
  <InformationFilledIcon />
</Tooltip>

/* ── CSS tokens ── */
.dt-tooltip {
  position: absolute;
  background: var(--n7);
  color: #fff;
  padding: 10px 12px;
  border-radius: 6px;
  font: 400 12px/16px var(--font-sans);
  width: 200px;
  white-space: normal;
  pointer-events: none;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity .15s;
}
.dt-tooltip.visible {
  opacity: 1;
  visibility: visible;
}
.dt-tooltip.persistent {
  pointer-events: auto;  /* allow clicking × */
  padding-right: 28px;
}
.dt-tooltip__close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: .6;
  display: flex;
  align-items: center;
}
.dt-tooltip__close:hover { opacity: 1; }
/* Arrow (top placement) */
.dt-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--n7);
}`,p={title:t,titleKey:n,description:o,keywords:e,tokens:i,content:l,placements:r,code:s};export{s as code,l as content,p as default,o as description,e as keywords,r as placements,t as title,n as titleKey,i as tokens};
