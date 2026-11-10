const n="Image uploader",e="nav.imageUploader",a="Centered photo upload component with circular avatar, hover camera overlay, click-to-upload and drag & drop. Used in profile settings and user configuration forms.",r=["upload","image","photo","profile","drag","drop","file","avatar","picture","cambiar","reemplazar"],o={containerBg:"var(--n2) · #F5F6FA",containerBorder:"var(--n3) · #E1E6ED",containerBorderRadius:"8px",containerPadding:"24px 20px",avatarSize:"88px",avatarBg:"var(--n3) · #E1E6ED",avatarBorderRadius:"50%",overlayBg:"rgba(19,32,69,0.60)",dragOverBorder:"var(--b5) · #4B82FA",dragOverBg:"var(--b1) · #EDF5FF",actionColor:"var(--b6) · #1F60ED",actionFont:"600 13px var(--font-sans)",hintColor:"var(--n5) · #67768D",hintFont:"400 11px var(--font-sans)",overlayFont:"600 10px var(--font-sans)",overlayTransition:"opacity .18s"},i=[{id:"empty",label:"Empty",state:"default",description:"No photo loaded. Shows IBM Carbon person icon as placeholder."},{id:"filled",label:"Filled",state:"filled",description:"Photo loaded. Avatar shows preview via background-image. Hover reveals camera overlay."},{id:"drag-over",label:"Drag over",state:"drag-over",description:"User drags a file over the container. Border turns blue, background turns var(--b1)."}],t=`<!-- ── Image uploader ── -->
<div class="dt-img-upload" id="img-upload-zone"
     ondragover="imgDragOver(event)"
     ondragleave="imgDragLeave(event)"
     ondrop="imgDrop(event)">

  <!-- Circular avatar with hover overlay -->
  <div class="dt-img-circle" onclick="document.getElementById('img-input').click()">
    <div class="dt-img-av" id="img-av">
      <!-- IBM Carbon User 32px -->
      <svg viewBox="0 0 32 32" fill="currentColor" width="40" height="40">
        <path d="M16,4a5,5,0,1,1-5,5,5,5,0,0,1,5-5m0-2a7,7,0,1,0,7,7A7,7,0,0,0,16,2Z"/>
        <path d="M26,30H24V25a5.0055,5.0055,0,0,0-5-5H13a5.0055,5.0055,0,0,0-5,5v5H6V25a7.0082,7.0082,0,0,1,7-7h6a7.0082,7.0082,0,0,1,7,7Z"/>
      </svg>
    </div>
    <div class="dt-img-overlay">
      <!-- IBM Carbon Camera 32px -->
      <svg viewBox="0 0 32 32" fill="currentColor" width="18" height="18">
        <path d="M26,24H6a2,2,0,0,1-2-2V10A2,2,0,0,1,6,8h4l2-3h8l2,3h4a2,2,0,0,1,2,2V22A2,2,0,0,1,26,24ZM6,10V22H26V10ZM16,20a4,4,0,1,1,4-4A4,4,0,0,1,16,20Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,16,14Z"/>
      </svg>
      <span>Cambiar</span>
    </div>
  </div>

  <!-- Action link -->
  <button class="dt-img-replace" onclick="document.getElementById('img-input').click()">
    <!-- IBM Carbon Renew 32px -->
    <svg viewBox="0 0 32 32" fill="currentColor" width="14" height="14">
      <path d="M12,10H6.78A11,11,0,0,1,27,16h2A13,13,0,0,0,6,7.68V4H4v8h8Z"/>
      <path d="M20,22h5.22A11,11,0,0,1,5,16H3a13,13,0,0,0,23,8.32V28h2V20H20Z"/>
    </svg>
    Reemplazar imagen
  </button>
  <p class="dt-img-hint">Tamaño sugerido 224×224 px (PNG o JPG)</p>
  <input type="file" id="img-input" accept="image/jpeg,image/png" style="display:none" onchange="imgSelected(event)">
</div>

/* ── CSS ── */
.dt-img-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  background: var(--n2);
  border-radius: 8px;
  border: 1px solid var(--n3);
  transition: border-color .15s, background .15s;
}
.dt-img-upload.drag-over {
  border-color: var(--b5);
  background: var(--b1);
}
.dt-img-circle {
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  cursor: pointer;
}
.dt-img-av {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: var(--n3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n5);
  overflow: hidden;
  background-size: cover;
  background-position: center;
}
.dt-img-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(19,32,69,.60);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: #fff;
  font: 600 10px var(--font-sans);
  letter-spacing: .03em;
  opacity: 0;
  transition: opacity .18s;
  pointer-events: none;
}
.dt-img-circle:hover .dt-img-overlay { opacity: 1; }
.dt-img-replace {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font: 600 13px var(--font-sans);
  color: var(--b6);
  transition: color .12s;
}
.dt-img-replace:hover { color: var(--b7); }
.dt-img-hint {
  font: 400 11px var(--font-sans);
  color: var(--n5);
  margin: 0;
}

/* ── JS ── */
function imgDragOver(e) {
  e.preventDefault();
  document.getElementById('img-upload-zone').classList.add('drag-over');
}
function imgDragLeave(e) {
  document.getElementById('img-upload-zone').classList.remove('drag-over');
}
function imgDrop(e) {
  e.preventDefault();
  document.getElementById('img-upload-zone').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) applyImg(file);
}
function imgSelected(e) {
  const file = e.target.files[0];
  if (file) applyImg(file);
}
function applyImg(file) {
  if (!file.type.match(/image\\/(jpeg|png)/)) return;
  if (file.size > 2 * 1024 * 1024) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const av = document.getElementById('img-av');
    av.innerHTML = '';
    av.style.backgroundImage = \`url(\${ev.target.result})\`;
  };
  reader.readAsDataURL(file);
}`,d=`Source: sections/components/image-uploader.json
Used in: DES-827 Profile Settings, user creation forms

Behavior:
- Click avatar or 'Reemplazar imagen' → OS file picker
- Drag file onto container → same upload flow
- Accepts: image/jpeg, image/png, max 2 MB
- On load: .dt-img-av gets background-image with preview
- Hover avatar → camera overlay transitions in (opacity 0→1)
- Drag over → .drag-over class on container (blue border + bg)`,l={title:n,titleKey:e,description:a,keywords:r,tokens:o,variants:i,code:t,pageUsage:d};export{t as code,l as default,a as description,r as keywords,d as pageUsage,n as title,e as titleKey,o as tokens,i as variants};
