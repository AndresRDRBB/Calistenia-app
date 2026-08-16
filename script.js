(function(){
  const CATS = [
    {id:'fuerza', name:'Fuerza', color:'var(--red)'},
    {id:'hipertrofia', name:'Hipertrofia', color:'var(--orange)'},
    {id:'lastrado', name:'Lastrado', color:'var(--purple)'},
    {id:'estaticas', name:'Estáticas', color:'var(--blue)'},
    {id:'anillas', name:'Anillas', color:'var(--green)'},
    {id:'resistencia', name:'Resistencia', color:'var(--pink)'},
    {id:'casa', name:'En casa', color:'var(--teal)'},
  ];
  const catColor = id => (CATS.find(c=>c.id===id)||{}).color || 'var(--muted)';
  const catName = id => (CATS.find(c=>c.id===id)||{}).name || id;

  // ---------- pose icon system (ilustraciones esquemáticas originales) ----------
  const POSES = {
    push:            {head:[16,50],shoulder:[24,53],hip:[66,58],armL:[26,74],armR:[26,74],legL:[88,64],legR:[88,64], floorY:78, hl:[45,58,15]},
    pull:            {head:[50,26],shoulder:[50,34],hip:[50,58],armL:[34,13],armR:[66,13],legL:[44,76],legR:[56,76], bar:[28,12,72,12], hl:[50,40,15]},
    dip:             {head:[50,24],shoulder:[50,32],hip:[50,54],armL:[34,34],armR:[66,34],legL:[58,68],legR:[66,72], bars:[[34,18,34,58],[66,18,66,58]], hl:[50,40,14]},
    squat:           {head:[50,16],shoulder:[50,24],hip:[50,48],armL:[28,30],armR:[72,30],legL:[34,80],legR:[66,80], floorY:84, hl:[50,65,17]},
    lunge:           {head:[50,16],shoulder:[50,24],hip:[50,48],armL:[34,30],armR:[66,30],legL:[28,80],legR:[74,82], floorY:86, hl:[45,65,17]},
    planche:         {head:[14,46],shoulder:[24,48],hip:[68,50],armL:[24,74],armR:[24,74],legL:[92,52],legR:[92,52], floorY:78, hl:[45,55,14]},
    frontlever:      {head:[50,26],shoulder:[50,32],hip:[86,34],armL:[50,13],armR:[50,13],legL:[98,36],legR:[98,36], bar:[38,12,62,12], hl:[65,33,15]},
    handstand:       {head:[50,58],shoulder:[50,44],hip:[50,28],armL:[36,20],armR:[64,20],legL:[42,8],legR:[58,8], floorY:22, hl:[50,40,14]},
    lsit:            {head:[24,30],shoulder:[24,38],hip:[24,58],armL:[14,68],armR:[14,68],legL:[70,58],legR:[70,58], floorY:70, hl:[45,48,14]},
    burpee:          {head:[50,22],shoulder:[50,30],hip:[50,52],armL:[30,12],armR:[70,12],legL:[36,72],legR:[64,72], hl:[50,42,18]},
    mountainclimber: {head:[16,50],shoulder:[24,53],hip:[66,58],armL:[26,74],armR:[26,74],legL:[52,70],legR:[88,64], floorY:78, hl:[45,58,14]},
    jump:            {head:[50,18],shoulder:[50,26],hip:[50,48],armL:[30,10],armR:[70,10],legL:[38,66],legR:[62,66], hl:[50,56,16]},
    glutebridge:     {head:[16,58],shoulder:[26,58],hip:[58,44],armL:[26,72],armR:[26,72],legL:[74,72],legR:[74,72], floorY:78, hl:[45,52,14]},
    superman:        {head:[16,44],shoulder:[26,48],hip:[62,52],armL:[8,32],armR:[8,32],legL:[86,40],legR:[86,40], floorY:60, hl:[45,48,15]},
    plank:           {head:[16,52],shoulder:[24,54],hip:[68,56],armL:[26,74],armR:[26,74],legL:[90,58],legR:[90,58], floorY:78, hl:[45,58,14]},
    situp:           {head:[28,58],shoulder:[38,56],hip:[58,64],armL:[34,48],armR:[34,48],legL:[76,58],legR:[86,70], floorY:76, hl:[45,60,14]},
  };

  function poseSvg(patternKey, color){
    const p = POSES[patternKey] || POSES.push;
    let extra = '';
    if(p.bar) extra += `<line x1="${p.bar[0]}" y1="${p.bar[1]}" x2="${p.bar[2]}" y2="${p.bar[3]}" stroke="#5a6067" stroke-width="4.5" stroke-linecap="round"/>`;
    if(p.bars) p.bars.forEach(b=>{ extra += `<line x1="${b[0]}" y1="${b[1]}" x2="${b[2]}" y2="${b[3]}" stroke="#5a6067" stroke-width="4.5" stroke-linecap="round"/>`; });
    if(p.floorY) extra += `<line x1="4" y1="${p.floorY}" x2="96" y2="${p.floorY}" stroke="#5a6067" stroke-width="3.5" stroke-linecap="round"/>`;
    const highlight = p.hl ? `<circle cx="${p.hl[0]}" cy="${p.hl[1]}" r="${p.hl[2]}" fill="${color}" opacity="0.16"/>` : '';
    return `<svg class="pose-icon" viewBox="0 0 100 100">
      ${highlight}
      ${extra}
      <line x1="${p.shoulder[0]}" y1="${p.shoulder[1]}" x2="${p.hip[0]}" y2="${p.hip[1]}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
      <line x1="${p.shoulder[0]}" y1="${p.shoulder[1]}" x2="${p.armL[0]}" y2="${p.armL[1]}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
      <line x1="${p.shoulder[0]}" y1="${p.shoulder[1]}" x2="${p.armR[0]}" y2="${p.armR[1]}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
      <line x1="${p.hip[0]}" y1="${p.hip[1]}" x2="${p.legL[0]}" y2="${p.legL[1]}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
      <line x1="${p.hip[0]}" y1="${p.hip[1]}" x2="${p.legR[0]}" y2="${p.legR[1]}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="${p.shoulder[0]}" cy="${p.shoulder[1]}" r="4" fill="${color}"/>
      <circle cx="${p.hip[0]}" cy="${p.hip[1]}" r="4" fill="${color}"/>
      <circle cx="${p.armL[0]}" cy="${p.armL[1]}" r="3.5" fill="${color}"/>
      <circle cx="${p.armR[0]}" cy="${p.armR[1]}" r="3.5" fill="${color}"/>
      <circle cx="${p.legL[0]}" cy="${p.legL[1]}" r="3.5" fill="${color}"/>
      <circle cx="${p.legR[0]}" cy="${p.legR[1]}" r="3.5" fill="${color}"/>
      <circle cx="${p.head[0]}" cy="${p.head[1]}" r="9" fill="none" stroke="${color}" stroke-width="6"/>
    </svg>`;
  }

  const DEFAULT_LIBRARY = [
    {name:'Flexiones', cat:'fuerza', pattern:'push', muscles:['Pecho','Hombros','Tríceps'], desc:'Ejercicio de empuje horizontal que trabaja pecho, hombros y tríceps usando el peso corporal.', cues:['Cuerpo recto de cabeza a talones','Manos a la anchura de los hombros','Baja hasta rozar el pecho el suelo']},
    {name:'Dominadas', cat:'fuerza', pattern:'pull', muscles:['Espalda','Bíceps','Antebrazo'], desc:'Tracción vertical desde una barra que desarrolla espalda ancha, bíceps y agarre.', cues:['Agarre pronado, algo más ancho que los hombros','Sube hasta que la barbilla pase la barra','Baja controlando, sin balanceo']},
    {name:'Fondos en paralelas', cat:'fuerza', pattern:'dip', muscles:['Pecho','Tríceps','Hombros'], desc:'Empuje vertical en barras paralelas que trabaja pecho, tríceps y hombro anterior.', cues:['Inclina el torso ligeramente adelante para más pecho','Baja hasta 90° de codo','Evita bloquear el codo de golpe arriba']},
    {name:'Sentadillas', cat:'fuerza', pattern:'squat', muscles:['Cuádriceps','Glúteo','Isquios'], desc:'Movimiento de flexión de cadera y rodilla que trabaja cuádriceps, glúteo e isquios.', cues:['Pies a la anchura de hombros','Baja como si te sentaras en una silla','Rodillas siguen la dirección de los pies']},
    {name:'Pike push-ups', cat:'fuerza', pattern:'push', muscles:['Hombros','Tríceps'], desc:'Flexión en V invertida que enfatiza el hombro, precursora del handstand push-up.', cues:['Cadera alta, forma de V invertida','Codos apuntan hacia atrás, no a los lados','Cabeza hacia el suelo entre las manos']},
    {name:'Flexiones diamante', cat:'hipertrofia', pattern:'push', muscles:['Tríceps','Pecho'], desc:'Variante de flexión con manos juntas que aumenta la carga en el tríceps.', cues:['Índices y pulgares formando un diamante','Codos pegados al cuerpo','Rango completo, pecho toca las manos']},
    {name:'Dominadas explosivas', cat:'hipertrofia', pattern:'pull', muscles:['Espalda','Bíceps'], desc:'Dominada con impulso hacia arriba para desarrollar potencia de tracción.', cues:['Tira explosivo desde abajo','Controla siempre la fase de bajada','Core activado, sin balanceo']},
    {name:'Sentadilla búlgara', cat:'hipertrofia', pattern:'lunge', muscles:['Cuádriceps','Glúteo'], desc:'Sentadilla a una pierna con el pie trasero elevado, exige fuerza y equilibrio unilateral.', cues:['Pie trasero apoyado en banco o superficie elevada','Baja recto, no hacia adelante','La rodilla delantera no sobrepasa mucho la puntera']},
    {name:'Fondos profundos', cat:'hipertrofia', pattern:'dip', muscles:['Pecho','Tríceps'], desc:'Fondos con mayor rango de movimiento para maximizar el estímulo en pecho y tríceps.', cues:['Baja hasta notar estiramiento en el pecho','Controla la bajada, no caigas de golpe','Hombros lejos de las orejas']},
    {name:'Dominadas lastradas', cat:'lastrado', pattern:'pull', muscles:['Espalda','Bíceps','Antebrazo'], desc:'Dominadas con peso añadido (chaleco o cinturón) para ganar fuerza máxima.', cues:['Añade peso solo si dominas la dominada estricta','Rango completo pese al lastre','Prioriza técnica sobre cantidad de peso']},
    {name:'Fondos lastrados', cat:'lastrado', pattern:'dip', muscles:['Pecho','Tríceps'], desc:'Fondos con lastre para progresar en fuerza de empuje vertical.', cues:['Cinturón de lastre bien asegurado','Mantén el control en toda la bajada','Aumenta el peso de forma progresiva']},
    {name:'Sentadilla a una pierna lastrada', cat:'lastrado', pattern:'squat', muscles:['Cuádriceps','Glúteo'], desc:'Sentadilla unilateral con peso extra, exige fuerza y estabilidad avanzadas.', cues:['Domina la pistol squat sin peso primero','Mantén el pecho arriba','Baja de forma controlada, sin rebotar']},
    {name:'Flexiones lastradas', cat:'lastrado', pattern:'push', muscles:['Pecho','Tríceps','Hombros'], desc:'Flexiones con un disco o mochila cargada sobre la espalda.', cues:['Peso centrado en la zona alta de la espalda','Cadera alineada, sin hundirse','Progresa el peso poco a poco']},
    {name:'Plancha (planche tuck)', cat:'estaticas', pattern:'planche', muscles:['Hombros','Core','Pecho'], desc:'Posición estática en la que el cuerpo se sostiene solo con los brazos, en tuck.', cues:['Rodillas al pecho, cadera por encima de las manos','Hombros protraídos, empuja el suelo','Inclina los hombros bien por delante de las manos']},
    {name:'Front lever (tuck)', cat:'estaticas', pattern:'frontlever', muscles:['Espalda','Core'], desc:'Suspensión horizontal desde una barra en posición tuck, trabaja espalda y core.', cues:['Rodillas al pecho, espalda paralela al suelo','Escápulas deprimidas y activas','Evita que la cadera caiga']},
    {name:'Handstand contra pared', cat:'estaticas', pattern:'handstand', muscles:['Hombros','Core'], desc:'Pino apoyado en la pared para desarrollar equilibrio y fuerza de hombro.', cues:['Manos a la anchura de hombros','Empuja el suelo, cuerpo en línea recta','Mira entre las manos, no hacia la pared']},
    {name:'L-sit', cat:'estaticas', pattern:'lsit', muscles:['Core','Flexores de cadera'], desc:'Posición estática con piernas extendidas al frente, trabaja core y flexores de cadera.', cues:['Hombros abajo y atrás, lejos de las orejas','Piernas juntas y extendidas','Empuja el suelo con las manos']},
    {name:'Fondos en anillas', cat:'anillas', pattern:'dip', muscles:['Pecho','Tríceps','Estabilizadores'], desc:'Fondos sobre anillas inestables que exigen mucho más control que en barras fijas.', cues:['Gira las anillas ligeramente hacia afuera abajo','Core apretado para estabilidad','Baja de forma controlada, sin balanceo']},
    {name:'Dominadas en anillas', cat:'anillas', pattern:'pull', muscles:['Espalda','Bíceps','Estabilizadores'], desc:'Dominadas con el agarre libre de las anillas, mayor demanda de estabilizadores.', cues:['Deja que las anillas giren de forma natural','Codos cerca del cuerpo al subir','Controla especialmente la bajada']},
    {name:'RTO push-ups', cat:'anillas', pattern:'push', muscles:['Pecho','Hombros','Estabilizadores'], desc:'Flexiones con giro de anillas (rotación externa) al final del movimiento.', cues:['Empieza con anillas paralelas al pecho','Gira las anillas 90° al extender','Core firme durante el giro']},
    {name:'Ring support hold', cat:'anillas', pattern:'dip', muscles:['Hombros','Core','Estabilizadores'], desc:'Sostén isométrico en anillas con brazos extendidos, base para todo trabajo en anillas.', cues:['Hombros abajo, lejos de las orejas','Brazos extendidos sin bloquear duro el codo','Anillas ligeramente rotadas hacia afuera']},
    {name:'Burpees', cat:'resistencia', pattern:'burpee', muscles:['Cuerpo completo','Cardio'], desc:'Ejercicio completo que combina sentadilla, plancha y salto, muy exigente a nivel cardiovascular.', cues:['Aterriza suave al saltar','Plancha rígida en el suelo','Ritmo constante y controlado']},
    {name:'Mountain climbers', cat:'resistencia', pattern:'mountainclimber', muscles:['Core','Cardio'], desc:'Rodillas al pecho alternas en posición de plancha, trabaja core y ritmo cardiovascular.', cues:['Cadera estable, sin subir y bajar','Rodilla hacia el pecho, no hacia el lateral','Ritmo rápido pero controlado']},
    {name:'Jump squats', cat:'resistencia', pattern:'jump', muscles:['Cuádriceps','Glúteo','Cardio'], desc:'Sentadilla con salto explosivo que añade componente pliométrico y cardiovascular.', cues:['Aterriza flexionando rodillas para amortiguar','Usa los brazos para impulsarte','Pecho arriba en todo momento']},
    {name:'Circuito sprint burpee-dominada', cat:'resistencia', pattern:'burpee', muscles:['Cuerpo completo','Cardio'], desc:'Circuito combinado de burpees y dominadas para resistencia muscular y cardiovascular.', cues:['Alterna burpee y dominada sin pausas largas','Prioriza técnica aunque baje el ritmo','Ajusta reps a tu nivel de resistencia']},
    {name:'Zancadas', cat:'casa', pattern:'lunge', muscles:['Cuádriceps','Glúteo'], desc:'Paso adelante con flexión de ambas rodillas que trabaja cuádriceps y glúteo de forma unilateral.', cues:['Rodilla delantera alineada con el tobillo','Baja la rodilla trasera casi hasta el suelo','Empuja con el talón delantero para volver']},
    {name:'Puente de glúteos', cat:'casa', pattern:'glutebridge', muscles:['Glúteo','Isquios'], desc:'Elevación de cadera tumbado boca arriba que activa glúteos e isquiotibiales.', cues:['Pies apoyados cerca de los glúteos','Aprieta el glúteo arriba, sin arquear la lumbar','Baja de forma controlada']},
    {name:'Superman', cat:'casa', pattern:'superman', muscles:['Lumbar','Glúteo'], desc:'Extensión simultánea de brazos y piernas boca abajo para fortalecer la zona lumbar.', cues:['Eleva brazos y piernas a la vez','Mira al suelo para no forzar el cuello','Mantén la contracción 1-2 segundos arriba']},
    {name:'Plancha abdominal', cat:'casa', pattern:'plank', muscles:['Core'], desc:'Sostén isométrico en posición de flexión que fortalece todo el core.', cues:['Cuerpo en línea recta de cabeza a talones','No dejes caer ni subas la cadera','Aprieta glúteos y abdomen']},
    {name:'Abdominales bicicleta', cat:'casa', pattern:'situp', muscles:['Abdomen','Oblicuos'], desc:'Movimiento de rotación de tronco alternando codo y rodilla contraria, trabaja oblicuos.', cues:['Lumbar pegada al suelo','Codo hacia la rodilla contraria, sin tirar del cuello','Movimiento controlado, no por inercia']},
  ];

  const DEFAULT_ROUTINES = [
    {id:'r-fuerza', name:'Base de fuerza', cat:'fuerza', level:'intermedio', exercises:[
      {name:'Flexiones', sets:4, reps:12, unit:'reps', rest:60},
      {name:'Dominadas', sets:4, reps:6, unit:'reps', rest:90},
      {name:'Fondos en paralelas', sets:3, reps:10, unit:'reps', rest:75},
      {name:'Sentadillas', sets:3, reps:15, unit:'reps', rest:60},
    ]},
    {id:'r-hipertrofia', name:'Volumen empuje-tracción', cat:'hipertrofia', level:'intermedio', exercises:[
      {name:'Flexiones diamante', sets:4, reps:10, unit:'reps', rest:60},
      {name:'Dominadas explosivas', sets:4, reps:5, unit:'reps', rest:90},
      {name:'Fondos profundos', sets:4, reps:8, unit:'reps', rest:75},
      {name:'Sentadilla búlgara', sets:3, reps:12, unit:'reps', rest:60},
    ]},
    {id:'r-lastrado', name:'Fuerza lastrada', cat:'lastrado', level:'avanzado', exercises:[
      {name:'Dominadas lastradas', sets:5, reps:5, unit:'reps', rest:120},
      {name:'Fondos lastrados', sets:5, reps:6, unit:'reps', rest:120},
      {name:'Flexiones lastradas', sets:3, reps:8, unit:'reps', rest:90},
    ]},
    {id:'r-estaticas', name:'Fuerza estática', cat:'estaticas', level:'avanzado', exercises:[
      {name:'Plancha (planche tuck)', sets:5, reps:15, unit:'seg', rest:60},
      {name:'Front lever (tuck)', sets:5, reps:12, unit:'seg', rest:60},
      {name:'L-sit', sets:5, reps:20, unit:'seg', rest:45},
      {name:'Handstand contra pared', sets:4, reps:30, unit:'seg', rest:60},
    ]},
    {id:'r-anillas', name:'Control en anillas', cat:'anillas', level:'avanzado', exercises:[
      {name:'Fondos en anillas', sets:4, reps:8, unit:'reps', rest:90},
      {name:'Dominadas en anillas', sets:4, reps:6, unit:'reps', rest:90},
      {name:'RTO push-ups', sets:3, reps:10, unit:'reps', rest:75},
      {name:'Ring support hold', sets:4, reps:20, unit:'seg', rest:60},
    ]},
    {id:'r-resistencia', name:'Circuito metabólico', cat:'resistencia', level:'principiante', exercises:[
      {name:'Burpees', sets:5, reps:15, unit:'reps', rest:45},
      {name:'Mountain climbers', sets:5, reps:20, unit:'reps', rest:30},
      {name:'Jump squats', sets:5, reps:15, unit:'reps', rest:30},
      {name:'Circuito sprint burpee-dominada', sets:3, reps:10, unit:'reps', rest:60},
    ]},
    {id:'r-casa', name:'Sin equipamiento (en casa)', cat:'casa', level:'principiante', exercises:[
      {name:'Sentadillas', sets:4, reps:15, unit:'reps', rest:45},
      {name:'Flexiones', sets:4, reps:12, unit:'reps', rest:45},
      {name:'Zancadas', sets:3, reps:12, unit:'reps', rest:45},
      {name:'Plancha abdominal', sets:4, reps:30, unit:'seg', rest:30},
      {name:'Puente de glúteos', sets:3, reps:15, unit:'reps', rest:30},
      {name:'Mountain climbers', sets:3, reps:20, unit:'reps', rest:30},
    ]},
  ];

  const LEVEL_LABEL = {principiante:'Principiante', intermedio:'Intermedio', avanzado:'Avanzado'};
  const FITNESS_LABEL = {sedentario:'Sedentario', activo:'Activo moderado', entrenado:'Entrenado'};
  const SEX_LABEL = {hombre:'Hombre', mujer:'Mujer', 'prefiero-no-decir':'—'};
  const WEEKDAYS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  const MET_BY_CAT = {fuerza:6, hipertrofia:6, lastrado:6.5, estaticas:4, anillas:6, resistencia:8, casa:5.5};
  const RECHECK_DAYS = 15;
  const MOTIVATION_MSGS = {
    none: ['Vuelve a la barra: cada sesión cuenta más de lo que crees.', 'Hoy es un buen día para retomarlo. ¡Empieza suave!'],
    low: ['Buen ritmo, sigue sumando sesiones esta quincena.', 'Vas avanzando, no pierdas el hilo.'],
    high: ['¡Racha excelente! Tu constancia se está notando.', 'Gran nivel de constancia, sigue así.'],
  };

  let library = DEFAULT_LIBRARY.slice();
  let routines = DEFAULT_ROUTINES.slice();
  let history = [];
  let profile = null;
  let weeklyPlan = {};
  let reminder = {enabled:false, time:'08:00', lastFiredDate:null};
  let activeCat = 'all';

  function findExercise(name){
    return library.find(e=>e.name===name);
  }

  // ---------- storage helpers (localStorage: funciona en cualquier navegador) ----------
  const STORE_PREFIX = 'barra-';

  async function loadAll(){
    try{
      const r = localStorage.getItem(STORE_PREFIX + 'routines');
      if(r) routines = JSON.parse(r);
      else await saveRoutines();
    }catch(e){ console.error('Error cargando rutinas:', e); }
    try{
      const l = localStorage.getItem(STORE_PREFIX + 'library');
      if(l) library = JSON.parse(l);
      else await saveLibrary();
    }catch(e){ console.error('Error cargando biblioteca:', e); }
    try{
      const h = localStorage.getItem(STORE_PREFIX + 'history');
      if(h) history = JSON.parse(h);
    }catch(e){ console.error('Error cargando historial:', e); }
    try{
      const p = localStorage.getItem(STORE_PREFIX + 'profile');
      if(p) profile = JSON.parse(p);
    }catch(e){ console.error('Error cargando perfil:', e); }
    try{
      const wp = localStorage.getItem(STORE_PREFIX + 'weeklyplan');
      if(wp) weeklyPlan = JSON.parse(wp);
    }catch(e){ console.error('Error cargando plan semanal:', e); }
    try{
      const rm = localStorage.getItem(STORE_PREFIX + 'reminder');
      if(rm) reminder = JSON.parse(rm);
    }catch(e){ console.error('Error cargando recordatorio:', e); }
  }
  async function saveRoutines(){
    try{ localStorage.setItem(STORE_PREFIX + 'routines', JSON.stringify(routines)); }catch(e){ console.error(e); }
  }
  async function saveLibrary(){
    try{ localStorage.setItem(STORE_PREFIX + 'library', JSON.stringify(library)); }catch(e){ console.error(e); }
  }
  async function saveHistory(){
    try{ localStorage.setItem(STORE_PREFIX + 'history', JSON.stringify(history)); }catch(e){ console.error(e); }
  }
  async function saveProfile(){
    try{ localStorage.setItem(STORE_PREFIX + 'profile', JSON.stringify(profile)); }catch(e){ console.error(e); }
  }
  async function saveWeeklyPlan(){
    try{ localStorage.setItem(STORE_PREFIX + 'weeklyplan', JSON.stringify(weeklyPlan)); }catch(e){ console.error(e); }
  }
  async function saveReminder(){
    try{ localStorage.setItem(STORE_PREFIX + 'reminder', JSON.stringify(reminder)); }catch(e){ console.error(e); }
  }

  // ---------- tabs ----------
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(b=>b.addEventListener('click', ()=>switchView(b.dataset.view)));
  function switchView(name){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.getElementById('view-'+name).classList.add('active');
    tabBtns.forEach(b=>b.classList.toggle('active', b.dataset.view===name));
    if(name==='progreso') renderProgress();
    if(name==='plan') { renderPlanTab(); renderReminderUI(); }
  }

  // ---------- toast ----------
  let toastTimer;
  function toast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
  }

  // ---------- chips ----------
  function renderChips(){
    const wrap = document.getElementById('chips');
    wrap.innerHTML = '';
    const all = document.createElement('div');
    all.className = 'chip' + (activeCat==='all' ? ' active':'');
    all.textContent = 'Todas';
    all.style.background = activeCat==='all' ? 'var(--text)' : '';
    all.onclick = ()=>{ activeCat='all'; renderChips(); renderRoutines(); };
    wrap.appendChild(all);
    CATS.forEach(c=>{
      const chip = document.createElement('div');
      chip.className = 'chip' + (activeCat===c.id ? ' active':'');
      chip.textContent = c.name;
      if(activeCat===c.id) chip.style.background = c.color;
      chip.onclick = ()=>{ activeCat=c.id; renderChips(); renderRoutines(); };
      wrap.appendChild(chip);
    });
  }

  // ---------- routine list ----------
  function renderRoutines(){
    const list = document.getElementById('routine-list');
    list.innerHTML = '';
    const filtered = activeCat==='all' ? routines : routines.filter(r=>r.cat===activeCat);
    if(filtered.length===0){
      list.innerHTML = '<div class="empty">No hay sesiones en esta categoría todavía.</div>';
      return;
    }
    filtered.forEach(r=>{
      const card = document.createElement('div');
      card.className = 'routine-card';
      const recommended = profile && profile.level === r.level;
      card.innerHTML = `
        <div class="catbar" style="background:${catColor(r.cat)}"></div>
        <div class="rtop">
          <div>
            <div class="rname">${r.name}</div>
            <div class="rmeta"><span>${catName(r.cat)}</span><span>${r.exercises.length} ejercicios</span>${r.level ? `<span>${LEVEL_LABEL[r.level]||r.level}</span>`:''}</div>
          </div>
          ${recommended ? '<span class="badge-rec">Recomendada</span>' : ''}
        </div>
        <div class="ex-chip-list"></div>
        <button class="btn btn-primary" data-id="${r.id}">Empezar</button>
      `;
      const chipList = card.querySelector('.ex-chip-list');
      r.exercises.forEach(ex=>{
        const chip = document.createElement('button');
        chip.className = 'ex-chip';
        chip.textContent = ex.name;
        chip.type = 'button';
        chip.onclick = (evt)=>{ evt.stopPropagation(); openDetail(ex.name); };
        chipList.appendChild(chip);
      });
      card.querySelector('button.btn-primary').onclick = ()=>startSession(r);
      list.appendChild(card);
    });
  }

  // ---------- exercise detail modal ----------
  const detailBack = document.getElementById('detail-back');
  function openDetail(name){
    const ex = findExercise(name);
    const iconWrap = document.getElementById('detail-icon');
    const catTag = document.getElementById('detail-cat');
    const cuesList = document.getElementById('detail-cues');
    document.getElementById('detail-name').textContent = name;
    cuesList.innerHTML = '';
    const musclesBox = document.getElementById('detail-muscles');
    musclesBox.innerHTML = '';
    if(ex){
      iconWrap.innerHTML = poseSvg(ex.pattern, catColor(ex.cat));
      catTag.textContent = catName(ex.cat);
      catTag.style.background = catColor(ex.cat);
      document.getElementById('detail-desc').textContent = ex.desc;
      (ex.muscles||[]).forEach(m=>{
        const tag = document.createElement('span');
        tag.className = 'muscle-tag';
        tag.textContent = m;
        musclesBox.appendChild(tag);
      });
      ex.cues.forEach(c=>{
        const li = document.createElement('li');
        li.textContent = c;
        cuesList.appendChild(li);
      });
    } else {
      iconWrap.innerHTML = poseSvg('push', 'var(--muted)');
      catTag.textContent = 'Personalizado';
      catTag.style.background = 'var(--muted)';
      document.getElementById('detail-desc').textContent = 'Ejercicio personalizado añadido por ti. Todavía no tiene ficha técnica.';
    }
    detailBack.classList.add('show');
  }
  document.getElementById('detail-close').onclick = ()=> detailBack.classList.remove('show');
  document.getElementById('btn-ex-info').onclick = ()=>{
    if(session && currentExercise()) openDetail(currentExercise().name);
  };

  // ---------- new routine modal ----------
  const modalBack = document.getElementById('modal-back');
  document.getElementById('btn-new-routine').onclick = ()=>{
    const sel = document.getElementById('nr-cat');
    sel.innerHTML = CATS.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
    document.getElementById('nr-name').value = '';
    document.getElementById('nr-exercises').value = '';
    modalBack.classList.add('show');
  };
  document.getElementById('nr-cancel').onclick = ()=> modalBack.classList.remove('show');
  document.getElementById('nr-save').onclick = async ()=>{
    const name = document.getElementById('nr-name').value.trim();
    const cat = document.getElementById('nr-cat').value;
    const exNames = document.getElementById('nr-exercises').value.split(',').map(s=>s.trim()).filter(Boolean);
    if(!name || exNames.length===0){ toast('Completa nombre y al menos un ejercicio'); return; }
    routines.push({
      id: 'r-' + Date.now(),
      name, cat, level:'principiante',
      exercises: exNames.map(n=>({name:n, sets:3, reps:10, unit:'reps', rest:60}))
    });
    await saveRoutines();
    modalBack.classList.remove('show');
    renderRoutines();
    toast('Sesión guardada');
  };

  // ---------- profile / onboarding ----------
  const onboardView = document.getElementById('onboard-view');
  function fillProfileForm(){
    if(!profile) return;
    document.getElementById('pf-level').value = profile.level || 'principiante';
    document.getElementById('pf-sex').value = profile.sex || 'prefiero-no-decir';
    document.getElementById('pf-age').value = profile.age || '';
    document.getElementById('pf-height').value = profile.height || '';
    document.getElementById('pf-weight').value = profile.weight || '';
    document.getElementById('pf-fitness').value = profile.fitness || 'sedentario';
  }
  function openOnboarding(isEdit){
    document.getElementById('onboard-title').textContent = isEdit ? 'Tu perfil' : 'Antes de empezar';
    document.getElementById('onboard-sub').textContent = isEdit
      ? 'Actualiza tus datos para seguir adaptando tus sesiones.'
      : 'Cuéntanos un poco sobre ti para adaptar mejor tus sesiones. Estos datos se guardan solo en este dispositivo.';
    document.getElementById('pf-skip').style.display = isEdit ? 'none' : 'block';
    document.getElementById('pf-skip').textContent = 'Ahora no';
    if(profile) fillProfileForm();
    onboardView.classList.add('show');
  }
  function closeOnboarding(){ onboardView.classList.remove('show'); }
  document.getElementById('btn-open-profile').onclick = ()=> openOnboarding(true);
  document.getElementById('btn-edit-profile-2').onclick = ()=> openOnboarding(true);
  document.getElementById('pf-skip').onclick = ()=> closeOnboarding();
  document.getElementById('pf-save').onclick = async ()=>{
    const height = document.getElementById('pf-height').value;
    const weight = document.getElementById('pf-weight').value;
    const prevMeasurements = (profile && profile.measurements) || [];
    profile = {
      level: document.getElementById('pf-level').value,
      sex: document.getElementById('pf-sex').value,
      age: document.getElementById('pf-age').value,
      height: height,
      weight: weight,
      fitness: document.getElementById('pf-fitness').value,
      lastMeasuredAt: new Date().toISOString(),
      measurements: prevMeasurements,
    };
    if(height || weight){
      profile.measurements = prevMeasurements.concat([{date:new Date().toISOString(), height, weight}]);
    }
    await saveProfile();
    closeOnboarding();
    renderRoutines();
    renderProfileSummary();
    renderTodayCard();
    toast('Perfil guardado');
  };

  function renderProfileSummary(){
    const box = document.getElementById('profile-summary');
    const text = document.getElementById('profile-summary-text');
    if(!profile){ box.style.display = 'none'; return; }
    box.style.display = 'flex';
    const parts = [];
    parts.push(`Nivel: <b>${LEVEL_LABEL[profile.level]||profile.level}</b>`);
    if(profile.age) parts.push(`${profile.age} años`);
    if(profile.height) parts.push(`${profile.height} cm`);
    if(profile.weight) parts.push(`${profile.weight} kg`);
    parts.push(FITNESS_LABEL[profile.fitness]||'');
    text.innerHTML = parts.filter(Boolean).join(' · ');
  }

  // ---------- weekly plan ----------
  function todayIndex(){ return (new Date().getDay()+6)%7; } // 0=Lunes...6=Domingo

  function renderTodayCard(){
    const card = document.getElementById('today-card');
    const nameEl = document.getElementById('today-name');
    const startBtn = document.getElementById('today-start');
    const labelEl = document.getElementById('today-label');
    const idx = todayIndex();
    const routineId = weeklyPlan[idx];
    if(!routineId){
      card.style.display = 'block';
      labelEl.textContent = `Plan de hoy · ${WEEKDAYS[idx]}`;
      nameEl.textContent = 'Sin rutina asignada (configúralo en la pestaña Plan)';
      startBtn.style.display = 'none';
      return;
    }
    const routine = routines.find(r=>r.id===routineId);
    card.style.display = 'block';
    labelEl.textContent = `Plan de hoy · ${WEEKDAYS[idx]}`;
    if(!routine){
      nameEl.textContent = 'La rutina asignada ya no existe';
      startBtn.style.display = 'none';
      return;
    }
    nameEl.textContent = routine.name;
    startBtn.style.display = 'block';
    startBtn.onclick = ()=> startSession(routine);
  }

  function renderPlanTab(){
    const box = document.getElementById('plan-days');
    box.innerHTML = '';
    WEEKDAYS.forEach((day, idx)=>{
      const row = document.createElement('div');
      row.className = 'plan-day-row';
      const sel = document.createElement('select');
      sel.dataset.idx = idx;
      sel.innerHTML = '<option value="">Descanso</option>' + routines.map(r=>`<option value="${r.id}">${r.name}</option>`).join('');
      sel.value = weeklyPlan[idx] || '';
      row.innerHTML = `<div class="dname">${day}</div>`;
      row.appendChild(sel);
      box.appendChild(row);
    });
  }
  document.getElementById('btn-save-plan').onclick = async ()=>{
    const selects = document.querySelectorAll('#plan-days select');
    const newPlan = {};
    selects.forEach(s=>{ if(s.value) newPlan[s.dataset.idx] = s.value; });
    weeklyPlan = newPlan;
    await saveWeeklyPlan();
    renderTodayCard();
    toast('Plan semanal guardado');
  };

  // ---------- reminder (best-effort, requiere la app abierta/reciente) ----------
  const reminderToggle = document.getElementById('reminder-toggle');
  const reminderTimeInput = document.getElementById('reminder-time');
  function renderReminderUI(){
    reminderToggle.checked = !!reminder.enabled;
    reminderTimeInput.value = reminder.time || '08:00';
  }
  reminderToggle.onchange = async ()=>{
    if(reminderToggle.checked && 'Notification' in window){
      try{
        const perm = await Notification.requestPermission();
        if(perm !== 'granted'){
          toast('Debes permitir notificaciones en el navegador');
          reminderToggle.checked = false;
          return;
        }
      }catch(e){ /* permiso no disponible en este entorno */ }
    }
    reminder.enabled = reminderToggle.checked;
    await saveReminder();
  };
  reminderTimeInput.onchange = async ()=>{
    reminder.time = reminderTimeInput.value;
    await saveReminder();
  };
  setInterval(async ()=>{
    if(!reminder.enabled) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const todayStr = now.toDateString();
    if(`${hh}:${mm}` === reminder.time && reminder.lastFiredDate !== todayStr){
      reminder.lastFiredDate = todayStr;
      await saveReminder();
      if('Notification' in window && Notification.permission === 'granted'){
        const routineId = weeklyPlan[todayIndex()];
        const routine = routineId ? routines.find(r=>r.id===routineId) : null;
        try{
          new Notification('BARRA', { body: routine ? `Hoy toca: ${routine.name}` : 'Recuerda tu entrenamiento de hoy' });
        }catch(e){ /* no soportado en este entorno */ }
      }
    }
  }, 30000);

  // ---------- calorías (estimación MET) ----------
  function estimateKcal(cat, minutes){
    const met = MET_BY_CAT[cat] || 6;
    const weightKg = (profile && profile.weight) ? parseFloat(profile.weight) : 70;
    return Math.round((met * 3.5 * weightKg / 200) * minutes);
  }

  // ---------- mensajes de ánimo ----------
  function pickMotivation(sessionsRecent){
    let pool;
    if(sessionsRecent === 0) pool = MOTIVATION_MSGS.none;
    else if(sessionsRecent <= 3) pool = MOTIVATION_MSGS.low;
    else pool = MOTIVATION_MSGS.high;
    return pool[Math.floor(Math.random()*pool.length)];
  }

  // ---------- session / training ----------
  let session = null;

  function startSession(routine){
    session = { routine, exIndex:0, setIndex:0, log:[], startedAt: Date.now() };
    document.getElementById('entrenar-empty').style.display = 'none';
    document.getElementById('entrenar-active').style.display = 'block';
    switchView('entrenar');
    renderSessionStep();
  }

  function currentExercise(){
    return session.routine.exercises[session.exIndex];
  }

  function renderProgressTrack(){
    const track = document.getElementById('progress-track');
    track.innerHTML = '';
    session.routine.exercises.forEach((ex,i)=>{
      const seg = document.createElement('div');
      seg.className = 'seg' + (i < session.exIndex ? ' done' : i===session.exIndex ? ' current' : '');
      track.appendChild(seg);
    });
  }

  function renderSessionStep(){
    const ex = currentExercise();
    const libEx = findExercise(ex.name);
    document.getElementById('sess-routine-name').textContent = session.routine.name;
    document.getElementById('sess-exercise-count').textContent = `Ejercicio ${session.exIndex+1}/${session.routine.exercises.length}`;
    document.getElementById('ex-icon-wrap').innerHTML = poseSvg(libEx ? libEx.pattern : 'push', catColor(session.routine.cat));
    document.getElementById('ex-name').textContent = ex.name;
    const unitLabel = ex.unit === 'seg' ? 'seg' : 'reps';
    document.getElementById('ex-target').textContent = `${ex.sets} series × ${ex.reps} ${unitLabel} · descanso ${ex.rest}s`;
    document.getElementById('set-current').textContent = session.setIndex+1;
    document.getElementById('rep-count').textContent = ex.reps;
    document.getElementById('rest-panel').style.display = 'none';
    document.getElementById('btn-skip-rest').style.display = 'none';
    document.getElementById('btn-log-set').style.display = 'block';
    document.getElementById('btn-log-set').textContent = 'Registrar serie';
    document.getElementById('btn-log-set').disabled = false;
    renderProgressTrack();
  }

  document.getElementById('rep-minus').onclick = ()=>{
    const el = document.getElementById('rep-count');
    el.textContent = Math.max(0, parseInt(el.textContent)-1);
  };
  document.getElementById('rep-plus').onclick = ()=>{
    const el = document.getElementById('rep-count');
    el.textContent = parseInt(el.textContent)+1;
  };

  document.getElementById('btn-log-set').onclick = ()=>{
    if(!session) return;
    const ex = currentExercise();
    if(!ex) return;
    document.getElementById('btn-log-set').disabled = true;
    const reps = parseInt(document.getElementById('rep-count').textContent);
    session.log.push({exercise:ex.name, set:session.setIndex+1, reps});
    session.setIndex++;
    if(session.setIndex < ex.sets){
      startRest(ex.rest, ()=>{
        document.getElementById('set-current').textContent = session.setIndex+1;
        document.getElementById('rep-count').textContent = ex.reps;
      });
    } else {
      session.setIndex = 0;
      session.exIndex++;
      if(session.exIndex >= session.routine.exercises.length){
        finishSession();
      } else {
        startRest(currentExercise().rest || 60, renderSessionStep);
      }
    }
  };

  function startRest(seconds, onDone){
    const panel = document.getElementById('rest-panel');
    const clock = document.getElementById('rest-clock');
    const skipBtn = document.getElementById('btn-skip-rest');
    const logBtn = document.getElementById('btn-log-set');
    panel.style.display = 'block';
    skipBtn.style.display = 'block';
    logBtn.style.display = 'none';
    let remaining = seconds;
    function tick(){
      const m = Math.floor(remaining/60), s = remaining%60;
      clock.textContent = m + ':' + String(s).padStart(2,'0');
    }
    tick();
    const timerId = setInterval(()=>{
      remaining--;
      if(remaining <= 0){
        clearInterval(timerId);
        endRest();
      } else tick();
    }, 1000);
    function endRest(){
      panel.style.display = 'none';
      skipBtn.style.display = 'none';
      logBtn.style.display = 'block';
      logBtn.disabled = false;
      onDone();
    }
    skipBtn.onclick = ()=>{ clearInterval(timerId); endRest(); };
  }

  async function finishSession(){
    const totalSets = session.log.length;
    const totalReps = session.log.reduce((s,l)=>s+l.reps,0);
    const minutes = Math.max(1, Math.round((Date.now() - session.startedAt) / 60000));
    const kcal = estimateKcal(session.routine.cat, minutes);
    history.unshift({
      id: 'h-'+Date.now(),
      routineName: session.routine.name,
      cat: session.routine.cat,
      date: new Date().toISOString(),
      sets: totalSets,
      reps: totalReps,
      minutes: minutes,
      kcal: kcal,
    });
    await saveHistory();
    document.getElementById('entrenar-active').style.display = 'none';
    document.getElementById('entrenar-empty').style.display = 'block';
    document.getElementById('entrenar-empty').textContent = `Sesión "${session.routine.name}" completada: ${totalSets} series, ${totalReps} repeticiones, ~${kcal} kcal. ¡Buen trabajo!`;
    session = null;
    toast('Sesión guardada en tu progreso');
  }

  document.getElementById('btn-end-session').onclick = async ()=>{
    if(!session) return;
    if(session.log.length > 0){
      await finishSession();
    } else {
      document.getElementById('entrenar-active').style.display = 'none';
      document.getElementById('entrenar-empty').style.display = 'block';
      document.getElementById('entrenar-empty').textContent = 'Elige una sesión en la pestaña Rutinas y pulsa Empezar para entrenar aquí.';
      session = null;
    }
  };

  // ---------- progress view ----------
  function renderProgress(){
    renderProfileSummary();
    document.getElementById('stat-total').textContent = history.length;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7*24*60*60*1000);
    const thisWeek = history.filter(h=> new Date(h.date) >= weekAgo).length;
    document.getElementById('stat-week').textContent = thisWeek;
    const kcalWeek = history.filter(h=> new Date(h.date) >= weekAgo).reduce((s,h)=> s+(h.kcal||0), 0);
    document.getElementById('stat-kcal').textContent = kcalWeek;

    const fifteenAgo = new Date(now.getTime() - RECHECK_DAYS*24*60*60*1000);
    const sessionsRecent = history.filter(h=> new Date(h.date) >= fifteenAgo).length;
    const banner = document.getElementById('motivation-banner');
    banner.style.display = 'block';
    banner.textContent = pickMotivation(sessionsRecent);

    const evoTitle = document.getElementById('evolution-title');
    const evoList = document.getElementById('evolution-list');
    const measurements = (profile && profile.measurements) || [];
    if(measurements.length > 0){
      evoTitle.style.display = 'block';
      evoList.style.display = 'block';
      evoList.innerHTML = '';
      measurements.slice().reverse().slice(0,8).forEach(m=>{
        const item = document.createElement('div');
        item.className = 'evolution-item';
        const d = new Date(m.date);
        item.innerHTML = `<div class="edate">${d.toLocaleDateString('es-ES',{day:'numeric',month:'short',year:'2-digit'})}</div><div class="evals mono">${m.weight?m.weight+' kg':'—'} · ${m.height?m.height+' cm':'—'}</div>`;
        evoList.appendChild(item);
      });
    } else {
      evoTitle.style.display = 'none';
      evoList.style.display = 'none';
    }

    const days = new Set(history.map(h=> new Date(h.date).toDateString()));
    let streak = 0;
    let cursor = new Date();
    while(days.has(cursor.toDateString())){
      streak++;
      cursor.setDate(cursor.getDate()-1);
    }
    document.getElementById('stat-streak').textContent = streak;

    const chart = document.getElementById('chart');
    chart.innerHTML = '';
    const dayLabels = ['D','L','M','X','J','V','S'];
    const buckets = [0,0,0,0,0,0,0];
    history.forEach(h=>{
      const d = new Date(h.date);
      const diffDays = Math.floor((now - d) / (24*60*60*1000));
      if(diffDays >=0 && diffDays < 7){
        buckets[6-diffDays] += h.sets;
      }
    });
    const max = Math.max(1, ...buckets);
    buckets.forEach((v,i)=>{
      const d = new Date(now.getTime() - (6-i)*24*60*60*1000);
      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = `<div class="fill" style="height:${Math.round((v/max)*70)}px"></div><div class="day">${dayLabels[d.getDay()]}</div>`;
      chart.appendChild(col);
    });

    const list = document.getElementById('history-list');
    list.innerHTML = '';
    if(history.length===0){
      list.innerHTML = '<div class="empty">Aún no has completado ninguna sesión.</div>';
      return;
    }
    history.slice(0,30).forEach(h=>{
      const item = document.createElement('div');
      item.className = 'history-item';
      const d = new Date(h.date);
      item.innerHTML = `
        <div>
          <div class="hname">${h.routineName}</div>
          <div class="hdate">${d.toLocaleDateString('es-ES', {day:'numeric', month:'short'})} · ${catName(h.cat)}</div>
        </div>
        <div class="hvol mono">${h.sets} series · ${h.reps} reps${h.kcal ? '<br>~'+h.kcal+' kcal' : ''}</div>
      `;
      list.appendChild(item);
    });
  }

  // ---------- init ----------
  (async function init(){
    await loadAll();
    renderChips();
    renderRoutines();
    renderProgress();
    renderTodayCard();
    renderPlanTab();
    renderReminderUI();
    if(!profile){
      openOnboarding(false);
    } else if(profile.lastMeasuredAt){
      const daysSince = (Date.now() - new Date(profile.lastMeasuredAt).getTime()) / (24*60*60*1000);
      if(daysSince >= RECHECK_DAYS){
        document.getElementById('onboard-title').textContent = 'Toca actualizar tus datos';
        document.getElementById('onboard-sub').textContent = `Han pasado ${Math.floor(daysSince)} días desde tu última medición. Actualiza peso y altura para ver tu evolución.`;
        document.getElementById('pf-skip').style.display = 'block';
        document.getElementById('pf-skip').textContent = 'Recordar más tarde';
        fillProfileForm();
        onboardView.classList.add('show');
      }
    }
  })();

})();
