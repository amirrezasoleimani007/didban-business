(function(root){'use strict';
  const core={
    percent:(end,start)=>Number.isFinite(end)&&Number.isFinite(start)&&start>0?(end/start-1)*100:null,
    family(name){name=String(name).toLowerCase().replace(/ي/g,'ی').replace(/ك/g,'ک');if(/گندله|pellet/.test(name))return'pellet';if(/اسفنجی|dri|hbi/.test(name))return'dri';if(/تختال|اسلب|slab/.test(name))return'slab';if(/شمش|بیلت|billet|بلوم/.test(name))return'billet';if(/میلگرد|rebar/.test(name))return'rebar';if(/ورق گرم|hrc/.test(name))return'hrc';if(/سنگ.?آهن|سنگ آهن|iodex|iron ore/.test(name))return'ore';return null;},
    toRialKg(value,unit,fx){if(!Number.isFinite(value))return null;unit=String(unit).replace(/\s+/g,' ').trim();if(/ریال.*کیلو/.test(unit))return value;if(/تومان.*کیلو/.test(unit))return value*10;if(/ریال.*تن/.test(unit))return value/1000;if(/تومان.*تن/.test(unit))return value/100;if(/دلار.*تن/.test(unit)&&Number.isFinite(fx)&&fx>0)return value*fx/1000;return null;},
    gap(domestic,world){return Number.isFinite(domestic)&&Number.isFinite(world)&&world>0?{absolute:domestic-world,percent:(domestic/world-1)*100}:null;},
    nearest(points,target,maxDays,dayNumber){let found=null;for(const point of points){if(point.date>target)break;found=point;}return found&&dayNumber(target)-dayNumber(found.date)<=maxDays?found:null;},
    csv(rows){return '\uFEFF'+rows.map(row=>row.map(value=>{let text=String(value??'');if(/^[=+@]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"';}).join(',')).join('\r\n');}
  };
  if(typeof module==='object'&&module.exports)module.exports=core;else root.MarketCore=core;
})(typeof window==='undefined'?globalThis:window);
