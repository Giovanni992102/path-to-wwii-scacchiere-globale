import React from 'react';
import { GER_FLAG_DATA_URL } from './flags/gerFlag';
import { SOV_FLAG_DATA_URL } from './flags/sovFlag';
import { ITA_FLAG_DATA_URL } from './flags/itaFlag';
import { BOL_FLAG_DATA_URL } from './flags/bolFlag';
import { URU_FLAG_DATA_URL } from './flags/uruFlag';
import { VIC_FLAG_DATA_URL } from './flags/vicFlag';
import { CUB_FLAG_DATA_URL } from './flags/cubFlag';
import { HND_FLAG_DATA_URL } from './flags/hndFlag';
import { GTM_FLAG_DATA_URL } from './flags/gtmFlag';
import { SLV_FLAG_DATA_URL } from './flags/slvFlag';
import { NIC_FLAG_DATA_URL } from './flags/nicFlag';
import { CRI_FLAG_DATA_URL } from './flags/criFlag';
import { PAN_FLAG_DATA_URL } from './flags/panFlag';
import { POL_FLAG_DATA_URL } from './flags/polFlag';
import { LUX_FLAG_DATA_URL } from './flags/luxFlag';
import { ECU_FLAG_DATA_URL } from './flags/ecuFlag';
import { POR_FLAG_DATA_URL } from './flags/porFlag';
import { SPR_FLAG_DATA_URL } from './flags/sprFlag';
import { SPA_FLAG_DATA_URL } from './flags/spaFlag';
import { AUS_FLAG_DATA_URL } from './flags/ausFlag';
import { YUG_FLAG_DATA_URL } from './flags/yugFlag';
import { HUN_FLAG_DATA_URL } from './flags/hunFlag';
import { ROM_FLAG_DATA_URL } from './flags/romFlag';
import { BUL_FLAG_DATA_URL } from './flags/bulFlag';
import { HAI_FLAG_DATA_URL } from './flags/haiFlag';
import { DOM_FLAG_DATA_URL } from './flags/domFlag';
import { MEX_FLAG_DATA_URL } from './flags/mexFlag';
import { CAN_FLAG_DATA_URL } from './flags/canFlag';
import { NEP_FLAG_DATA_URL } from './flags/nepFlag';
import { ETH_FLAG_DATA_URL } from './flags/ethFlag';
import { TIB_FLAG_DATA_URL } from './flags/tibFlag';
import { BHU_FLAG_DATA_URL } from './flags/bhuFlag';
import { XIN_FLAG_DATA_URL } from './flags/xinFlag';
import { IND_FLAG_DATA_URL } from './flags/indFlag';
import { GRE_FLAG_DATA_URL } from './flags/greFlag';
import { MEJ_FLAG_DATA_URL } from './flags/mejFlag';
import { CCP_FLAG_DATA_URL } from './flags/ccpFlag';
import { PHL_FLAG_DATA_URL } from './flags/phlFlag';
import { TUV_FLAG_DATA_URL } from './flags/tuvFlag';
import { LBR_FLAG_DATA_URL } from './flags/lbrFlag';
import { IRN_FLAG_DATA_URL } from './flags/irnFlag';
import { CHI_FLAG_DATA_URL } from './flags/chiFlag';
import { AFG_FLAG_DATA_URL } from './flags/afgFlag';
import { BRA_FLAG_DATA_URL } from './flags/braFlag';
import { PRU_FLAG_DATA_URL } from './flags/pruFlag';
import { MON_FLAG_DATA_URL } from './flags/monFlag';
import { SLO_FLAG_DATA_URL } from './flags/sloFlag';
import { SMR_FLAG_DATA_URL } from './flags/smrFlag';
import { VAT_FLAG_DATA_URL } from './flags/vatFlag';
import { GIB_FLAG_DATA_URL } from './flags/gibFlag';
import { ALB_FLAG_DATA_URL } from './flags/albFlag';
import { SAU_FLAG_DATA_URL } from './flags/sauFlag';
import { YEM_FLAG_DATA_URL } from './flags/yemFlag';
import { AND_FLAG_DATA_URL } from './flags/andFlag';
import { LIE_FLAG_DATA_URL } from './flags/lieFlag';
import { WJ_CHI_FLAG_DATA_URL } from './flags/wjChiFlag';
import { TANGER_FLAG_DATA_URL } from './flags/tangerFlag';
import { CRO_FLAG_DATA_URL } from './flags/croFlag';
import { canonicalizeOwnerCode } from './owners';

/**
 * Historical Flags (1936-1940)
 * Ultra-high-fidelity SVG flags with historically accurate heraldry, emblems, and palettes.
 */

// Helper to wrap SVG in standard viewBox
function svgWrap(content: string, vb = '0 0 600 400'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${vb}" width="100%" height="100%" preserveAspectRatio="none" class="flag-svg">${content}</svg>`;
}

export const HISTORICAL_FLAGS: Record<string, (step?: number) => string> = {
  // SERENISSIMA REPUBBLICA DI SAN MARINO — Bandiera ufficiale fornita dall'utente (1024x768)
  SMR: () =>
    svgWrap(
      `<image href="${SMR_FLAG_DATA_URL}" xlink:href="${SMR_FLAG_DATA_URL}" width="1024" height="768" preserveAspectRatio="none" />`,
      '0 0 1024 768'
    ),

  // STATO DELLA CITTÀ DEL VATICANO — Bandiera ufficiale papale fornita dall'utente (1024x1024)
  VAT: () =>
    svgWrap(
      `<image href="${VAT_FLAG_DATA_URL}" xlink:href="${VAT_FLAG_DATA_URL}" width="1024" height="1024" preserveAspectRatio="none" />`,
      '0 0 1024 1024'
    ),

  // GIBILTERRA — Bandiera coloniale storica della Corona con stemma fornita dall'utente (1024x512)
  GIB: () =>
    svgWrap(
      `<image href="${GIB_FLAG_DATA_URL}" xlink:href="${GIB_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
      '0 0 1024 512'
    ),

  // PRINCIPATO D'ANDORRA — Bandiera ufficiale con stemma storico fornita dall'utente (1024x716)
  AND: () =>
    svgWrap(
      `<image href="${AND_FLAG_DATA_URL}" xlink:href="${AND_FLAG_DATA_URL}" width="1024" height="716" preserveAspectRatio="none" />`,
      '0 0 1024 716'
    ),

  // PRINCIPATO DEL LIECHTENSTEIN (Fürstentum Liechtenstein) — Bandiera ufficiale con Fürstenhut fornita dall'utente (1024x614)
  LIE: () =>
    svgWrap(
      `<image href="${LIE_FLAG_DATA_URL}" xlink:href="${LIE_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
      '0 0 1024 614'
    ),

  // REGNO D'ITALIA (1861-1946) — Bandiera ufficiale fornita dall'utente
  ITA: () =>
    svgWrap(
      `<image href="${ITA_FLAG_DATA_URL}" xlink:href="${ITA_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // REICH TEDESCO (1935-1945) — Bandiera ufficiale fornita dall'utente
  GER: () =>
    svgWrap(
      `<image href="${GER_FLAG_DATA_URL}" xlink:href="${GER_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
      '0 0 1024 614'
    ),

  // UNIONE SOVIETICA (1936-1955) — Bandiera ufficiale fornita dall'utente
  SOV: () =>
    svgWrap(
      `<image href="${SOV_FLAG_DATA_URL}" xlink:href="${SOV_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
      '0 0 1024 512'
    ),

  // REGNO UNITO / IMPERO BRITANNICO — Union Jack
  UK: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#012169"/>
      <!-- Sant'Andrea & San Patrizio -->
      <line x1="0" y1="0" x2="600" y2="400" stroke="#ffffff" stroke-width="80"/>
      <line x1="600" y1="0" x2="0" y2="400" stroke="#ffffff" stroke-width="80"/>
      <line x1="0" y1="0" x2="600" y2="400" stroke="#c8102e" stroke-width="26"/>
      <line x1="600" y1="0" x2="0" y2="400" stroke="#c8102e" stroke-width="26"/>
      <!-- San Giorgio -->
      <rect x="250" width="100" height="400" fill="#ffffff"/>
      <rect y="150" width="600" height="100" fill="#ffffff"/>
      <rect x="270" width="60" height="400" fill="#c8102e"/>
      <rect y="170" width="600" height="60" fill="#c8102e"/>
    `),

  // STATI UNITI D'AMERICA — Bandiera a 48 Stelle (1912-1959)
  USA: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#ffffff"/>
      <g fill="#b22234">
        <rect y="0" width="600" height="30.7"/>
        <rect y="61.5" width="600" height="30.7"/>
        <rect y="123" width="600" height="30.7"/>
        <rect y="184.6" width="600" height="30.7"/>
        <rect y="246" width="600" height="30.7"/>
        <rect y="307.6" width="600" height="30.7"/>
        <rect y="369.2" width="600" height="30.7"/>
      </g>
      <!-- Cantone Blu -->
      <rect width="250" height="215" fill="#3c3b6e"/>
      <!-- Griglia micro-stelle -->
      <g fill="#ffffff" transform="scale(0.85) translate(8, 6)">
        ${Array.from({ length: 6 })
          .map((_, row) =>
            Array.from({ length: 8 })
              .map(
                (__, col) =>
                  `<circle cx="${18 + col * 34}" cy="${18 + row * 38}" r="4.5"/>`
              )
              .join('')
          )
          .join('')}
      </g>
    `),

  // REPUBBLICA FRANCESE — Terza Repubblica (Tricolore)
  FRA: () =>
    svgWrap(`
      <rect width="200" height="400" fill="#002395"/>
      <rect x="200" width="200" height="400" fill="#ffffff"/>
      <rect x="400" width="200" height="400" fill="#ed2939"/>
    `),

  // STATO FRANCESE / VICHY (1940-1944) — Bandiera ufficiale fornita dall'utente (1024x682)
  VIC: () =>
    svgWrap(
      `<image href="${VIC_FLAG_DATA_URL}" xlink:href="${VIC_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // FRANCIA LIBERA (AFRICA / DE GAULLE) — Tricolore con Croce di Lorena
  FFL_AEF: () =>
    svgWrap(`
      <rect width="200" height="400" fill="#002395"/>
      <rect x="200" width="200" height="400" fill="#ffffff"/>
      <rect x="400" width="200" height="400" fill="#ed2939"/>
      <!-- Croce di Lorena Rossa -->
      <rect x="292" y="100" width="16" height="200" fill="#ce2b37"/>
      <rect x="260" y="140" width="80" height="16" fill="#ce2b37"/>
      <rect x="250" y="195" width="100" height="16" fill="#ce2b37"/>
    `),

  // IMPERO DEL GIAPPONE — Hinomaru / Sole Nascente
  JAP: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#ffffff"/>
      <circle cx="300" cy="200" r="120" fill="#bc002d"/>
    `),

  // SECONDA REPUBBLICA DI POLONIA (1919-1939) — Bandiera ufficiale di Stato con Aquila Bianca
  POL: () =>
    svgWrap(
      `<image href="${POL_FLAG_DATA_URL}" xlink:href="${POL_FLAG_DATA_URL}" width="1024" height="640" preserveAspectRatio="none" />`,
      '0 0 1024 640'
    ),

  // REPUBBLICA DI CINA (GUOMINDANG / NAZIONALISTA) — Bandiera ufficiale fornita dall'utente (1024x682)
  CHI: () =>
    svgWrap(
      `<image href="${CHI_FLAG_DATA_URL}" xlink:href="${CHI_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // REPUBBLICA SOVIETICA CINESE / PARTITO COMUNISTA CINESE (中華蘇維埃共和國 / MAO ZEDONG — YAN'AN)
  CCP_CHI: () =>
    svgWrap(
      `<image href="${CCP_FLAG_DATA_URL}" xlink:href="${CCP_FLAG_DATA_URL}" width="1024" height="737" preserveAspectRatio="none" />`,
      '0 0 1024 737'
    ),

  // MANCIUKUÒ (IMPERO DEL MANCHUKUO) — Giallo imperiale con 4 colori
  MAN: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#ffde00"/>
      <g transform="translate(0, 0)">
        <rect width="300" height="50" fill="#c8102e"/>
        <rect y="50" width="300" height="50" fill="#002b7f"/>
        <rect y="100" width="300" height="50" fill="#ffffff"/>
        <rect y="150" width="300" height="50" fill="#000000"/>
      </g>
    `),

  // MENGJIANG (GOVERNO AUTONOMO UNITO DEL MENGJIANG / MENKYO — PRINCIPE DEMCHUGDONGRUB)
  MEJ: () =>
    svgWrap(
      `<image href="${MEJ_FLAG_DATA_URL}" xlink:href="${MEJ_FLAG_DATA_URL}" width="1024" height="683" preserveAspectRatio="none" />`,
      '0 0 1024 683'
    ),

  // GOVERNI COLLABORAZIONISTI IN CINA (GOVERNO PROVVISORIO DI PECHINO / GOVERNO RIFORMATO DI NANCHINO / WANG JINGWEI)
  // Bandiera ufficiale dei Cinque Colori / Cinque Razze sotto una sola Unione (Wǔzú gōnghé qí - 五族共和旗)
  WJ_CHI: () =>
    svgWrap(
      `<image href="${WJ_CHI_FLAG_DATA_URL}" xlink:href="${WJ_CHI_FLAG_DATA_URL}" width="1024" height="716" preserveAspectRatio="none" />`,
      '0 0 1024 716'
    ),

  // SINKIANG / XINJIANG (SHENG SHICAI) — Stella a sei punte dorata su campo rosso (Sei Grandi Politiche)
  XIN: () =>
    svgWrap(
      `<image href="${XIN_FLAG_DATA_URL}" xlink:href="${XIN_FLAG_DATA_URL}" width="600" height="400" preserveAspectRatio="none" />`,
      '0 0 600 400'
    ),

  // SECONDA REPUBBLICA SPAGNOLA (1931-1939) — Bandiera ufficiale tricolore con stemma murario
  SPR: () =>
    svgWrap(
      `<image href="${SPR_FLAG_DATA_URL}" xlink:href="${SPR_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
      '0 0 1024 614'
    ),

  // STATO SPAGNOLO / SPAGNA FRANCHISTA (1938-1945) — Bandiera ufficiale con Aquila di San Giovanni
  SPA: () =>
    svgWrap(
      `<image href="${SPA_FLAG_DATA_URL}" xlink:href="${SPA_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // REGNO DI JUGOSLAVIA — Bandiera ufficiale tricolore
  YUG: () =>
    svgWrap(
      `<image href="${YUG_FLAG_DATA_URL}" xlink:href="${YUG_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // CECOSLOVACCHIA
  CZE: () =>
    svgWrap(`
      <rect width="600" height="200" fill="#ffffff"/>
      <rect y="200" width="600" height="200" fill="#d7141a"/>
      <polygon points="0,0 280,200 0,400" fill="#11457e"/>
    `),

  // PRIMA REPUBBLICA SLOVACCA (1939-1945) — Bandiera ufficiale fornita dall'utente
  SLO: () =>
    svgWrap(
      `<image href="${SLO_FLAG_DATA_URL}" xlink:href="${SLO_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // REGNO D'UNGHERIA (REGGENZA HORTHY) — Bandiera ufficiale con Corona di Santo Stefano e Stemma
  HUN: () =>
    svgWrap(
      `<image href="${HUN_FLAG_DATA_URL}" xlink:href="${HUN_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
      '0 0 1024 512'
    ),

  // REGNO DI ROMANIA — Bandiera ufficiale tricolore
  ROM: () =>
    svgWrap(
      `<image href="${ROM_FLAG_DATA_URL}" xlink:href="${ROM_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // ZARATO DI BULGARIA — Bandiera ufficiale tricolore
  BUL: () =>
    svgWrap(
      `<image href="${BUL_FLAG_DATA_URL}" xlink:href="${BUL_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
      '0 0 1024 614'
    ),

  // FINLANDIA — Croce con stemma del leone
  FIN: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#ffffff"/>
      <rect x="175" width="90" height="400" fill="#003580"/>
      <rect y="155" width="600" height="90" fill="#003580"/>
      <!-- Stemma del Leone Careliano al centro -->
      <rect x="190" y="170" width="60" height="60" rx="3" fill="#c8102e" stroke="#ffd700" stroke-width="2"/>
      <circle cx="220" cy="200" r="16" fill="#ffd700"/>
    `),

  // REGNO DI GRECIA — Croce bianca su campo blu con corona reale ellenica dorata
  GRE: () =>
    svgWrap(
      `<image href="${GRE_FLAG_DATA_URL}" xlink:href="${GRE_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // TURCHIA — Mezzaluna e stella
  TUR: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#e30a17"/>
      <circle cx="240" cy="200" r="85" fill="#ffffff"/>
      <circle cx="262" cy="200" r="68" fill="#e30a17"/>
      <polygon points="330,200 348,212 342,192 358,180 338,180 330,162 322,180 302,180 318,192 312,212" fill="#ffffff"/>
    `),

  // LITUANIA (1918-1940)
  LIT: () =>
    svgWrap(`
      <rect width="600" height="133.3" fill="#fdb913"/>
      <rect y="133.3" width="600" height="133.4" fill="#006a44"/>
      <rect y="266.7" width="600" height="133.3" fill="#c1272d"/>
    `),

  // LETTONIA (1918-1940)
  LAT: () =>
    svgWrap(`
      <rect width="600" height="160" fill="#9e3039"/>
      <rect y="160" width="600" height="80" fill="#ffffff"/>
      <rect y="240" width="600" height="160" fill="#9e3039"/>
    `),

  // ESTONIA (1918-1940)
  EST: () =>
    svgWrap(`
      <rect width="600" height="133.3" fill="#0072ce"/>
      <rect y="133.3" width="600" height="133.4" fill="#000000"/>
      <rect y="266.7" width="600" height="133.3" fill="#ffffff"/>
    `),

  // CITTÀ LIBERA DI DANZICA (1920-1939)
  DANZIG: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#dc143c"/>
      <!-- Corona d'Oro -->
      <polygon points="180,130 200,115 220,130 216,138 184,138" fill="#ffd700" stroke="#8a6526" stroke-width="1.5"/>
      <!-- Due Croci d'Argento -->
      <g fill="#ffffff">
        <rect x="193" y="150" width="14" height="45"/>
        <rect x="178" y="165" width="44" height="14"/>
        <rect x="193" y="210" width="14" height="45"/>
        <rect x="178" y="225" width="44" height="14"/>
      </g>
    `),

  // ZONA INTERNAZIONALE DI TANGERI (1923-1956) — Bandiera ufficiale con stemma di Tingis e stella chérifienne (1024x682)
  TANGER: (step?: number) =>
    step !== undefined && step >= 6
      ? (HISTORICAL_FLAGS.SPA ? HISTORICAL_FLAGS.SPA(step) : svgWrap(
          `<image href="${TANGER_FLAG_DATA_URL}" xlink:href="${TANGER_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
          '0 0 1024 682'
        ))
      : svgWrap(
          `<image href="${TANGER_FLAG_DATA_URL}" xlink:href="${TANGER_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
          '0 0 1024 682'
        ),

  // STATO FEDERALE D'AUSTRIA (STÄNDESTAAT, 1934-1938) — Bandiera ufficiale con Aquila Bicipite Nimbata
  AUS: () =>
    svgWrap(
      `<image href="${AUS_FLAG_DATA_URL}" xlink:href="${AUS_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // REGNO D'ALBANIA (1928-1939 ZOGU / 1939 PROTETTORATO ITALIANO)
  ALB: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#cc0000"/>
      <!-- Aquila Bicipite Nera Albanese -->
      <path d="M280 180 C260 140, 240 180, 260 210 C270 230, 290 250, 300 260 C310 250, 330 230, 340 210 C360 180, 340 140, 320 180 Z" fill="#000000"/>
      <circle cx="285" cy="165" r="9" fill="#000000"/>
      <circle cx="315" cy="165" r="9" fill="#000000"/>
      <!-- Elmo di Skanderbeg -->
      <polygon points="290,140 300,130 310,140" fill="#ffd700"/>
    `),

  // SVEZIA
  SWE: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#006aa7"/>
      <rect x="180" width="80" height="400" fill="#fecc00"/>
      <rect y="160" width="600" height="80" fill="#fecc00"/>
    `),

  // SVIZZERA
  SWI: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#d52b1e"/>
      <rect x="260" y="100" width="80" height="200" fill="#ffffff"/>
      <rect x="200" y="160" width="200" height="80" fill="#ffffff"/>
    `),

  // REGNO DEI PAESI BASSI
  HOL: () =>
    svgWrap(`
      <rect width="600" height="133.3" fill="#ae1c28"/>
      <rect y="133.3" width="600" height="133.4" fill="#ffffff"/>
      <rect y="266.7" width="600" height="133.3" fill="#21468b"/>
    `),

  // BELGIO
  BEL: () =>
    svgWrap(`
      <rect width="200" height="400" fill="#000000"/>
      <rect x="200" width="200" height="400" fill="#ffd90c"/>
      <rect x="400" width="200" height="400" fill="#ed2939"/>
    `),

  // REPUBBLICA PORTOGHESE (ESTADO NOVO) — Bandiera ufficiale con Sfera Armillare e Scudo
  POR: () =>
    svgWrap(
      `<image href="${POR_FLAG_DATA_URL}" xlink:href="${POR_FLAG_DATA_URL}" width="330" height="220" preserveAspectRatio="none" />`,
      '0 0 330 220'
    ),

  // DANIMARCA (DANNEBROG)
  DEN: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#c60c30"/>
      <rect x="180" width="60" height="400" fill="#ffffff"/>
      <rect y="170" width="600" height="60" fill="#ffffff"/>
    `),

  // NORVEGIA
  NOR: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#ba0c2f"/>
      <rect x="160" width="100" height="400" fill="#ffffff"/>
      <rect y="150" width="600" height="100" fill="#ffffff"/>
      <rect x="180" width="60" height="400" fill="#00205b"/>
      <rect y="170" width="600" height="60" fill="#00205b"/>
    `),

  // IRLANDA (ÉIRE)
  IRE: () =>
    svgWrap(`
      <rect width="200" height="400" fill="#169b62"/>
      <rect x="200" width="200" height="400" fill="#ffffff"/>
      <rect x="400" width="200" height="400" fill="#ff883e"/>
    `),

  // CANADA — Red Ensign Canadese (1921-1957)
  CAN: () =>
    svgWrap(
      `<image href="${CAN_FLAG_DATA_URL}" xlink:href="${CAN_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
      '0 0 1024 512'
    ),

  // COMMONWEALTH DELLE FILIPPINE (1936-1946) — Bandiera ufficiale fornita dall'utente
  PHL: () =>
    svgWrap(
      `<image href="${PHL_FLAG_DATA_URL}" xlink:href="${PHL_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
      '0 0 1024 512'
    ),

  // AUSTRALIA — Blue Ensign
  AST: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#00247d"/>
      <g transform="scale(0.5)">
        <rect width="600" height="400" fill="#012169"/>
        <line x1="0" y1="0" x2="600" y2="400" stroke="#ffffff" stroke-width="80"/>
        <line x1="600" y1="0" x2="0" y2="400" stroke="#ffffff" stroke-width="80"/>
        <line x1="0" y1="0" x2="600" y2="400" stroke="#c8102e" stroke-width="26"/>
        <line x1="600" y1="0" x2="0" y2="400" stroke="#c8102e" stroke-width="26"/>
        <rect x="250" width="100" height="400" fill="#ffffff"/>
        <rect y="150" width="600" height="100" fill="#ffffff"/>
        <rect x="270" width="60" height="400" fill="#c8102e"/>
        <rect y="170" width="600" height="60" fill="#c8102e"/>
      </g>
      <!-- Commonwealth Star -->
      <circle cx="150" cy="300" r="28" fill="#ffffff"/>
      <!-- Southern Cross -->
      <circle cx="450" cy="80" r="14" fill="#ffffff"/>
      <circle cx="520" cy="160" r="14" fill="#ffffff"/>
      <circle cx="450" cy="320" r="14" fill="#ffffff"/>
      <circle cx="380" cy="200" r="14" fill="#ffffff"/>
      <circle cx="480" cy="240" r="9" fill="#ffffff"/>
    `),

  // NUOVA ZELANDA — Blue Ensign con stelle rosse
  NZL: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#00247d"/>
      <g transform="scale(0.5)">
        <rect width="600" height="400" fill="#012169"/>
        <line x1="0" y1="0" x2="600" y2="400" stroke="#ffffff" stroke-width="80"/>
        <line x1="600" y1="0" x2="0" y2="400" stroke="#ffffff" stroke-width="80"/>
        <line x1="0" y1="0" x2="600" y2="400" stroke="#c8102e" stroke-width="26"/>
        <line x1="600" y1="0" x2="0" y2="400" stroke="#c8102e" stroke-width="26"/>
        <rect x="250" width="100" height="400" fill="#ffffff"/>
        <rect y="150" width="600" height="100" fill="#ffffff"/>
        <rect x="270" width="60" height="400" fill="#c8102e"/>
        <rect y="170" width="600" height="60" fill="#c8102e"/>
      </g>
      <!-- Southern Cross con stelle rosse fimbriate in bianco -->
      <circle cx="460" cy="80" r="16" fill="#ffffff"/>
      <circle cx="460" cy="80" r="11" fill="#cc0000"/>
      <circle cx="530" cy="180" r="16" fill="#ffffff"/>
      <circle cx="530" cy="180" r="11" fill="#cc0000"/>
      <circle cx="460" cy="320" r="18" fill="#ffffff"/>
      <circle cx="460" cy="320" r="13" fill="#cc0000"/>
      <circle cx="390" cy="200" r="14" fill="#ffffff"/>
      <circle cx="390" cy="200" r="9" fill="#cc0000"/>
    `),

  // SUD AFRICA (1928-1994) — Prinsenvlag con 3 mini-bandiere
  SAF: () =>
    svgWrap(`
      <rect width="600" height="133.3" fill="#f26f21"/>
      <rect y="133.3" width="600" height="133.4" fill="#ffffff"/>
      <rect y="266.7" width="600" height="133.3" fill="#003882"/>
      <!-- Tre bandierine centrali (Union Jack, Orange Free State, Transvaal Vierkleur) -->
      <rect x="240" y="165" width="40" height="28" fill="#012169" stroke="#000000" stroke-width="1"/>
      <rect x="285" y="165" width="40" height="28" fill="#f26f21" stroke="#000000" stroke-width="1"/>
      <rect x="330" y="165" width="40" height="28" fill="#009246" stroke="#000000" stroke-width="1"/>
    `),

  // INDIA BRITANNICA (BRITISH RAJ) — Red Ensign con Stella d'India
  RAJ: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#cc0000"/>
      <g transform="scale(0.5)">
        <rect width="600" height="400" fill="#012169"/>
        <line x1="0" y1="0" x2="600" y2="400" stroke="#ffffff" stroke-width="80"/>
        <line x1="600" y1="0" x2="0" y2="400" stroke="#ffffff" stroke-width="80"/>
        <line x1="0" y1="0" x2="600" y2="400" stroke="#c8102e" stroke-width="26"/>
        <line x1="600" y1="0" x2="0" y2="400" stroke="#c8102e" stroke-width="26"/>
        <rect x="250" width="100" height="400" fill="#ffffff"/>
        <rect y="150" width="600" height="100" fill="#ffffff"/>
        <rect x="270" width="60" height="400" fill="#c8102e"/>
        <rect y="170" width="600" height="60" fill="#c8102e"/>
      </g>
      <!-- Stella d'India -->
      <circle cx="450" cy="200" r="55" fill="#ffffff" stroke="#ffd700" stroke-width="3"/>
      <circle cx="450" cy="200" r="28" fill="#002b7f"/>
      <circle cx="450" cy="200" r="14" fill="#ffffff"/>
    `),

  // STATO IMPERIALE DELL'IRAN (PERSIA) — Dinastia Pahlavi (Bandiera ufficiale fornita dall'utente, 1024x585)
  IRN: () =>
    svgWrap(
      `<image href="${IRN_FLAG_DATA_URL}" xlink:href="${IRN_FLAG_DATA_URL}" width="1024" height="585" preserveAspectRatio="none" />`,
      '0 0 1024 585'
    ),

  // ARABIA SAUDITA (1938)
  SAU: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#006c35"/>
      <path d="M220 180 C260 160, 340 160, 380 180 C360 190, 240 190, 220 180 Z" fill="#ffffff"/>
      <!-- Spada bianca dei Saud -->
      <rect x="200" y="235" width="200" height="10" fill="#ffffff" rx="2"/>
      <circle cx="195" cy="240" r="7" fill="#ffffff"/>
      <rect x="215" y="225" width="8" height="30" fill="#ffffff"/>
    `),

  // REGNO D'EGITTO (1922-1952) — Campo verde reale con mezzaluna bianca e 3 stelle a cinque punte
  EGY: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#117a3a"/>
      <!-- Mezzaluna bianca crescente -->
      <path d="M 280 200 A 75 75 0 1 0 380 135 A 65 65 0 1 1 280 200 Z" fill="#ffffff"/>
      <!-- Tre stelle bianche -->
      <polygon points="330,185 334,197 346,197 336,204 340,216 330,208 320,216 324,204 314,197 326,197" fill="#ffffff"/>
      <polygon points="330,135 334,147 346,147 336,154 340,166 330,158 320,166 324,154 314,147 326,147" fill="#ffffff"/>
      <polygon points="365,160 369,172 381,172 371,179 375,191 365,183 355,191 359,179 349,172 361,172" fill="#ffffff"/>
    `),

  // STATO INDIPENDENTE DI CROAZIA (NDH, 1941-1945) — Bandiera ufficiale fornita dall'utente (1024x412)
  CRO: () =>
    svgWrap(
      `<image href="${CRO_FLAG_DATA_URL}" xlink:href="${CRO_FLAG_DATA_URL}" width="1024" height="412" preserveAspectRatio="none" />`,
      '0 0 1024 412'
    ),

  // REGNO HASHEMITA DELL'IRAQ (1921-1959) — Tricolore arabo nero-bianco-verde con trapezio rosso all'asta e due stelle bianche a sette punte
  IRQ: () =>
    svgWrap(`
      <rect width="600" height="133.3" fill="#000000"/>
      <rect y="133.3" width="600" height="133.4" fill="#ffffff"/>
      <rect y="266.7" width="600" height="133.3" fill="#007a3d"/>
      <polygon points="0,0 190,133.3 190,266.7 0,400" fill="#ce1126"/>
      <polygon transform="translate(72,145)" points="0,-20 3.9,-8.11 15.64,-12.47 8.77,-2 19.5,4.45 7.04,5.61 8.68,18.02 0,9 -8.68,18.02 -7.04,5.61 -19.5,4.45 -8.77,-2 -15.64,-12.47 -3.9,-8.11" fill="#ffffff"/>
      <polygon transform="translate(72,255)" points="0,-20 3.9,-8.11 15.64,-12.47 8.77,-2 19.5,4.45 7.04,5.61 8.68,18.02 0,9 -8.68,18.02 -7.04,5.61 -19.5,4.45 -8.77,-2 -15.64,-12.47 -3.9,-8.11" fill="#ffffff"/>
    `),

  // REGNO DELL'AFGHANISTAN — Bandiera ufficiale fornita dall'utente (1024x682)
  AFG: () =>
    svgWrap(
      `<image href="${AFG_FLAG_DATA_URL}" xlink:href="${AFG_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),

  // TIBET — Bandiera ufficiale con Leoni delle Nevi fornita dall'utente
  TIB: () =>
    svgWrap(
      `<image href="${TIB_FLAG_DATA_URL}" xlink:href="${TIB_FLAG_DATA_URL}" width="1024" height="640" preserveAspectRatio="none" />`,
      '0 0 1024 640'
    ),

  // REPUBBLICA POPOLARE MONGOLA (1930-1940) — Bandiera ufficiale fornita dall'utente (1024x614)
  MON: () =>
    svgWrap(
      `<image href="${MON_FLAG_DATA_URL}" xlink:href="${MON_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
      '0 0 1024 614'
    ),

  // REPUBBLICA POPOLARE DI TANNU TUVA (1935-1941) — Bandiera ufficiale fornita dall'utente
  TUV: () =>
    svgWrap(
      `<image href="${TUV_FLAG_DATA_URL}" xlink:href="${TUV_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
      '0 0 1024 512'
    ),

  // REPUBBLICA DI LIBERIA — Bandiera ufficiale fornita dall'utente
  LBR: () =>
    svgWrap(
      `<image href="${LBR_FLAG_DATA_URL}" xlink:href="${LBR_FLAG_DATA_URL}" width="1024" height="539" preserveAspectRatio="none" />`,
      '0 0 1024 539'
    ),

  // SIAM / THAILANDIA (TRAIRANGA)
  SIA: () =>
    svgWrap(`
      <rect width="600" height="66.6" fill="#a51931"/>
      <rect y="66.6" width="600" height="66.7" fill="#ffffff"/>
      <rect y="133.3" width="600" height="133.4" fill="#2d2a4a"/>
      <rect y="266.7" width="600" height="66.7" fill="#ffffff"/>
      <rect y="333.4" width="600" height="66.6" fill="#a51931"/>
    `),

  // STATI UNITI DEL BRASILE (ESTADO NOVO 1937-1945) — Bandiera ufficiale fornita dall'utente (1024x716)
  BRA: () =>
    svgWrap(
      `<image href="${BRA_FLAG_DATA_URL}" xlink:href="${BRA_FLAG_DATA_URL}" width="1024" height="716" preserveAspectRatio="none" />`,
      '0 0 1024 716'
    ),

  // ARGENTINA
  ARG: () =>
    svgWrap(`
      <rect width="600" height="133.3" fill="#74acdf"/>
      <rect y="133.3" width="600" height="133.4" fill="#ffffff"/>
      <rect y="266.7" width="600" height="133.3" fill="#74acdf"/>
      <!-- Sol de Mayo -->
      <circle cx="300" cy="200" r="26" fill="#f6b40e" stroke="#853407" stroke-width="2"/>
    `),

  // MESSICO — Bandiera ufficiale con stemma storico dell'Aquila e Serpente
  MEX: () =>
    svgWrap(
      `<image href="${MEX_FLAG_DATA_URL}" xlink:href="${MEX_FLAG_DATA_URL}" width="1024" height="584" preserveAspectRatio="none" />`,
      '0 0 1024 584'
    ),

  // CILE
  CHL: () =>
    svgWrap(`
      <rect width="600" height="200" fill="#ffffff"/>
      <rect y="200" width="600" height="200" fill="#d52b1e"/>
      <rect width="200" height="200" fill="#0039a6"/>
      <polygon points="100,55 112,85 142,85 118,105 127,135 100,118 73,135 82,105 58,85 88,85" fill="#ffffff"/>
    `),

  // COLOMBIA
  COL: () =>
    svgWrap(`
      <rect width="600" height="200" fill="#fcd116"/>
      <rect y="200" width="600" height="100" fill="#003893"/>
      <rect y="300" width="600" height="100" fill="#ce1126"/>
    `),

  // REPUBBLICA PERUVIANA — Bandiera ufficiale fornita dall'utente con stemma di Stato (1024x683)
  PRU: () =>
    svgWrap(
      `<image href="${PRU_FLAG_DATA_URL}" xlink:href="${PRU_FLAG_DATA_URL}" width="1024" height="683" preserveAspectRatio="none" />`,
      '0 0 1024 683'
    ),

  // VENEZUELA
  VEN: () =>
    svgWrap(`
      <rect width="600" height="133.3" fill="#fcd116"/>
      <rect y="133.3" width="600" height="133.4" fill="#003893"/>
      <rect y="266.7" width="600" height="133.3" fill="#ce1126"/>
      <!-- Sette Stelle -->
      <g fill="#ffffff">
        <circle cx="260" cy="190" r="5"/>
        <circle cx="280" cy="180" r="5"/>
        <circle cx="300" cy="175" r="5"/>
        <circle cx="320" cy="180" r="5"/>
        <circle cx="340" cy="190" r="5"/>
      </g>
    `),

  // REPUBBLICA DI HATAY (1938-1939)
  HAT: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#e30a17"/>
      <circle cx="240" cy="200" r="85" fill="#ffffff"/>
      <circle cx="262" cy="200" r="68" fill="#e30a17"/>
      <!-- Stella bordata di bianco con cuore rosso di Hatay -->
      <polygon points="330,200 348,212 342,192 358,180 338,180 330,162 322,180 302,180 318,192 312,212" fill="#ffffff"/>
      <polygon points="330,200 344,209 339,194 352,184 336,184 330,170 324,184 308,184 321,194 316,209" fill="#e30a17"/>
    `),

  // DEFAULT / NEUTRO
  NEU: () =>
    svgWrap(`
      <rect width="600" height="400" fill="#2a333d"/>
      <circle cx="300" cy="200" r="75" fill="#1d242c" stroke="#c9a557" stroke-width="3"/>
      <!-- Bilancia della Giustizia / Neutralità -->
      <line x1="300" y1="150" x2="300" y2="250" stroke="#c9a557" stroke-width="4"/>
      <line x1="250" y1="175" x2="350" y2="175" stroke="#c9a557" stroke-width="4"/>
      <polygon points="235,210 265,210 250,225" fill="#c9a557"/>
      <polygon points="335,210 365,210 350,225" fill="#c9a557"/>
    `),
};

// Aliases for colonies and regional administrations (Vichy & Free France temporal dynamics)
HISTORICAL_FLAGS['F_NAF'] = (s) => (s && s >= 6 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));
HISTORICAL_FLAGS['VIC_NAF'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['F_AOF'] = (s) => (s && s >= 6 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));
HISTORICAL_FLAGS['VIC_AOF'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['F_AEF'] = (s) => (s && s >= 6 ? HISTORICAL_FLAGS['FFL_AEF'](s) : HISTORICAL_FLAGS['FRA'](s));
HISTORICAL_FLAGS['VIC_AEF'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['AEF_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['FFL'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['F_IND'] = () =>
  svgWrap(
    `<image href="${IND_FLAG_DATA_URL}" xlink:href="${IND_FLAG_DATA_URL}" width="1024" height="683" preserveAspectRatio="none" />`,
    '0 0 1024 683'
  );
HISTORICAL_FLAGS['VIC_IND'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['IND'] = HISTORICAL_FLAGS['F_IND'];
HISTORICAL_FLAGS['INDOCHINA'] = HISTORICAL_FLAGS['F_IND'];
HISTORICAL_FLAGS['INDOCHINE'] = HISTORICAL_FLAGS['F_IND'];
HISTORICAL_FLAGS['F_MAD'] = (s) => (s && s >= 6 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));
HISTORICAL_FLAGS['VIC_MAD'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['F_SOM'] = (s) => (s && s >= 6 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));
HISTORICAL_FLAGS['VIC_SOM'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['F_SYR'] = (s) => (s && s >= 6 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));
HISTORICAL_FLAGS['VIC_SYR'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['F_COL'] = (s) => (s && s >= 6 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));

// Estensione Storica esaustiva: Tag e Alias dello Stato Francese (Vichy / Pétain)
HISTORICAL_FLAGS['VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['ETAT_FRANCAIS'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['ETAT FRANCAIS'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['ÉTAT_FRANÇAIS'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['ÉTAT FRANÇAIS'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['STATO_FRANCESE'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['STATO FRANCESE'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['FRANCIA_DI_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['FRANCIA DI VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['REGIME_DI_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['REGIME DI VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['VICHY_FRANCE'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['FRANCE_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['AFN_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['AOF_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['MADAGASCAR_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['SOMALIA_FRANCESE_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['SOMALILAND_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['DJIBOUTI_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['GIBUTI_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['SIRIA_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['SYRIA_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['LIBANO_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['LEBANON_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['INDOCHINE_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['INDOCINA_VICHY'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['VICHY_IND'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['VICHY_INDOCHINA'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['PETAIN'] = HISTORICAL_FLAGS['VIC'];
HISTORICAL_FLAGS['PÉTAIN'] = HISTORICAL_FLAGS['VIC'];

// Estensione Storica esaustiva: Tag e Alias della Francia Libera (France Libre / FFL / De Gaulle)
HISTORICAL_FLAGS['FRANCE_LIBRE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FRANCE LIBRE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FRANCIA_LIBERA'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FRANCIA LIBERA'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FORCES_FRANCAISES_LIBRES'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FORCES FRANCAISES LIBRES'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FORZE_FRANCESI_LIBERE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FORZE FRANCESI LIBERE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FREE_FRANCE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FREE FRANCE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FREE_FRENCH'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['FREE FRENCH'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['AFRICA_FRANCESE_LIBERA'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['AFRICA FRANCESE LIBERA'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['AFRIQUE_FRANCAISE_LIBRE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['AFRIQUE FRANCAISE LIBRE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['CONSEIL_DEFENSE_EMPIRE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['CONSEIL DE DEFENSE DE L\'EMPIRE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['CONSEIL DE DÉFENSE DE L\'EMPIRE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['DE_GAULLE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['DE GAULLE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['CHARLES_DE_GAULLE'] = HISTORICAL_FLAGS['FFL_AEF'];
HISTORICAL_FLAGS['CHARLES DE GAULLE'] = HISTORICAL_FLAGS['FFL_AEF'];

// Enclave / regional aliases
HISTORICAL_FLAGS['MEMEL'] = HISTORICAL_FLAGS['LIT'];
HISTORICAL_FLAGS['ZARA'] = HISTORICAL_FLAGS['ITA'];
HISTORICAL_FLAGS['FIUME'] = HISTORICAL_FLAGS['ITA'];
HISTORICAL_FLAGS['RUTHENIA'] = HISTORICAL_FLAGS['CZE'];
HISTORICAL_FLAGS['PANAMA_CANAL'] = HISTORICAL_FLAGS['USA'];
HISTORICAL_FLAGS['PAN'] = () =>
  svgWrap(
    `<image href="${PAN_FLAG_DATA_URL}" xlink:href="${PAN_FLAG_DATA_URL}" width="1024" height="683" preserveAspectRatio="none" />`,
    '0 0 1024 683'
  );
HISTORICAL_FLAGS['CUB'] = () =>
  svgWrap(
    `<image href="${CUB_FLAG_DATA_URL}" xlink:href="${CUB_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
    '0 0 1024 512'
  );
HISTORICAL_FLAGS['ECU'] = () =>
  svgWrap(
    `<image href="${ECU_FLAG_DATA_URL}" xlink:href="${ECU_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
    '0 0 1024 682'
  );
HISTORICAL_FLAGS['BOL'] = () =>
  svgWrap(
    `<image href="${BOL_FLAG_DATA_URL}" xlink:href="${BOL_FLAG_DATA_URL}" width="1024" height="698" preserveAspectRatio="none" />`,
    '0 0 1024 698'
  );
HISTORICAL_FLAGS['PAR'] = HISTORICAL_FLAGS['HOL'];
HISTORICAL_FLAGS['URU'] = () =>
  svgWrap(
    `<image href="${URU_FLAG_DATA_URL}" xlink:href="${URU_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
    '0 0 1024 682'
  );
HISTORICAL_FLAGS['GTM'] = () =>
  svgWrap(
    `<image href="${GTM_FLAG_DATA_URL}" xlink:href="${GTM_FLAG_DATA_URL}" width="960" height="600" preserveAspectRatio="none" />`,
    '0 0 960 600'
  );
HISTORICAL_FLAGS['SLV'] = () =>
  svgWrap(
    `<image href="${SLV_FLAG_DATA_URL}" xlink:href="${SLV_FLAG_DATA_URL}" width="960" height="542" preserveAspectRatio="none" />`,
    '0 0 960 542'
  );
HISTORICAL_FLAGS['HND'] = () =>
  svgWrap(
    `<image href="${HND_FLAG_DATA_URL}" xlink:href="${HND_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
    '0 0 1024 512'
  );
HISTORICAL_FLAGS['HON'] = HISTORICAL_FLAGS['HND'];
HISTORICAL_FLAGS['NIC'] = () =>
  svgWrap(
    `<image href="${NIC_FLAG_DATA_URL}" xlink:href="${NIC_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
    '0 0 1024 614'
  );
HISTORICAL_FLAGS['CRI'] = () =>
  svgWrap(
    `<image href="${CRI_FLAG_DATA_URL}" xlink:href="${CRI_FLAG_DATA_URL}" width="1000" height="600" preserveAspectRatio="none" />`,
    '0 0 1000 600'
  );
HISTORICAL_FLAGS['CRC'] = HISTORICAL_FLAGS['CRI'];
HISTORICAL_FLAGS['DOM'] = () =>
  svgWrap(
    `<image href="${DOM_FLAG_DATA_URL}" xlink:href="${DOM_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
    '0 0 1024 682'
  );
HISTORICAL_FLAGS['HAI'] = () =>
  svgWrap(
    `<image href="${HAI_FLAG_DATA_URL}" xlink:href="${HAI_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
    '0 0 1024 614'
  );
HISTORICAL_FLAGS['LUX'] = () =>
  svgWrap(
    `<image href="${LUX_FLAG_DATA_URL}" xlink:href="${LUX_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
    '0 0 1024 614'
  );
HISTORICAL_FLAGS['ICE'] = HISTORICAL_FLAGS['NOR'];
HISTORICAL_FLAGS['NEP'] = () =>
  svgWrap(
    `<image href="${NEP_FLAG_DATA_URL}" xlink:href="${NEP_FLAG_DATA_URL}" width="692" height="1024" preserveAspectRatio="none" />`,
    '0 0 692 1024'
  );
HISTORICAL_FLAGS['BHU'] = () =>
  svgWrap(
    `<image href="${BHU_FLAG_DATA_URL}" xlink:href="${BHU_FLAG_DATA_URL}" width="250" height="200" preserveAspectRatio="none" />`,
    '0 0 250 200'
  );
HISTORICAL_FLAGS['BHUTAN'] = HISTORICAL_FLAGS['BHU'];
HISTORICAL_FLAGS['TIBET'] = HISTORICAL_FLAGS['TIB'];
HISTORICAL_FLAGS['ALB'] = () =>
  svgWrap(
    `<image href="${ALB_FLAG_DATA_URL}" xlink:href="${ALB_FLAG_DATA_URL}" width="1024" height="683" preserveAspectRatio="none" />`,
    '0 0 1024 683'
  );
HISTORICAL_FLAGS['ALBANIA'] = HISTORICAL_FLAGS['ALB'];
HISTORICAL_FLAGS['REGNO D\'ALBANIA'] = HISTORICAL_FLAGS['ALB'];
HISTORICAL_FLAGS['MBRETERIA SHQIPTARE'] = HISTORICAL_FLAGS['ALB'];
HISTORICAL_FLAGS['SHQIPERIA'] = HISTORICAL_FLAGS['ALB'];
HISTORICAL_FLAGS['AL'] = HISTORICAL_FLAGS['ALB'];

HISTORICAL_FLAGS['SAU'] = () =>
  svgWrap(
    `<image href="${SAU_FLAG_DATA_URL}" xlink:href="${SAU_FLAG_DATA_URL}" width="1024" height="792" preserveAspectRatio="none" />`,
    '0 0 1024 792'
  );
HISTORICAL_FLAGS['SAUDI_ARABIA'] = HISTORICAL_FLAGS['SAU'];
HISTORICAL_FLAGS['SAUDI ARABIA'] = HISTORICAL_FLAGS['SAU'];
HISTORICAL_FLAGS['ARABIA SAUDITA'] = HISTORICAL_FLAGS['SAU'];
HISTORICAL_FLAGS['REGNO DELL\'ARABIA SAUDITA'] = HISTORICAL_FLAGS['SAU'];
HISTORICAL_FLAGS['KINGDOM OF SAUDI ARABIA'] = HISTORICAL_FLAGS['SAU'];

HISTORICAL_FLAGS['YEM'] = () =>
  svgWrap(
    `<image href="${YEM_FLAG_DATA_URL}" xlink:href="${YEM_FLAG_DATA_URL}" width="600" height="300" preserveAspectRatio="none" />`,
    '0 0 600 300'
  );
HISTORICAL_FLAGS['YEMEN'] = HISTORICAL_FLAGS['YEM'];
HISTORICAL_FLAGS['REGNO DELLO YEMEN'] = HISTORICAL_FLAGS['YEM'];
HISTORICAL_FLAGS['REGNO MUTAWAKKILITA DELLO YEMEN'] = HISTORICAL_FLAGS['YEM'];
HISTORICAL_FLAGS['MUTAWAKKILITE KINGDOM OF YEMEN'] = HISTORICAL_FLAGS['YEM'];
HISTORICAL_FLAGS['YE'] = HISTORICAL_FLAGS['YEM'];
HISTORICAL_FLAGS['ETH'] = () =>
  svgWrap(
    `<image href="${ETH_FLAG_DATA_URL}" xlink:href="${ETH_FLAG_DATA_URL}" width="678" height="452" preserveAspectRatio="none" />`,
    '0 0 678 452'
  );
HISTORICAL_FLAGS['ETHIOPIA'] = HISTORICAL_FLAGS['ETH'];
HISTORICAL_FLAGS['ABYSSINIA'] = HISTORICAL_FLAGS['ETH'];
HISTORICAL_FLAGS['GRC'] = HISTORICAL_FLAGS['GRE'];
HISTORICAL_FLAGS['GREECE'] = HISTORICAL_FLAGS['GRE'];
HISTORICAL_FLAGS['XINJIANG'] = HISTORICAL_FLAGS['XIN'];
HISTORICAL_FLAGS['SINKIANG'] = HISTORICAL_FLAGS['XIN'];
HISTORICAL_FLAGS['MENGJIANG'] = HISTORICAL_FLAGS['MEJ'];
HISTORICAL_FLAGS['MENGKUKUO'] = HISTORICAL_FLAGS['MEJ'];
HISTORICAL_FLAGS['CCP'] = HISTORICAL_FLAGS['CCP_CHI'];
HISTORICAL_FLAGS['PRC'] = HISTORICAL_FLAGS['CCP_CHI'];
HISTORICAL_FLAGS['YANAN'] = HISTORICAL_FLAGS['CCP_CHI'];
HISTORICAL_FLAGS['PH'] = HISTORICAL_FLAGS['PHL'];
HISTORICAL_FLAGS['PHI'] = HISTORICAL_FLAGS['PHL'];
HISTORICAL_FLAGS['PHILIPPINES'] = HISTORICAL_FLAGS['PHL'];
HISTORICAL_FLAGS['FILIPPINE'] = HISTORICAL_FLAGS['PHL'];
HISTORICAL_FLAGS['COMMONWEALTH DELLE FILIPPINE'] = HISTORICAL_FLAGS['PHL'];
HISTORICAL_FLAGS['COMMONWEALTH OF THE PHILIPPINES'] = HISTORICAL_FLAGS['PHL'];
HISTORICAL_FLAGS['TANNU_TUVA'] = HISTORICAL_FLAGS['TUV'];
HISTORICAL_FLAGS['TANNU TUVA'] = HISTORICAL_FLAGS['TUV'];
HISTORICAL_FLAGS['TUVA'] = HISTORICAL_FLAGS['TUV'];
HISTORICAL_FLAGS['TYVA'] = HISTORICAL_FLAGS['TUV'];
HISTORICAL_FLAGS['LR'] = HISTORICAL_FLAGS['LBR'];
HISTORICAL_FLAGS['LIB'] = HISTORICAL_FLAGS['LBR'];
HISTORICAL_FLAGS['LIBERIA'] = HISTORICAL_FLAGS['LBR'];
HISTORICAL_FLAGS['REPUBBLICA DI LIBERIA'] = HISTORICAL_FLAGS['LBR'];
HISTORICAL_FLAGS['REPUBLIC OF LIBERIA'] = HISTORICAL_FLAGS['LBR'];
HISTORICAL_FLAGS['IRAN'] = HISTORICAL_FLAGS['IRN'];
HISTORICAL_FLAGS['PERSIA'] = HISTORICAL_FLAGS['IRN'];
HISTORICAL_FLAGS['IMPERO DELL\'IRAN'] = HISTORICAL_FLAGS['IRN'];
HISTORICAL_FLAGS['IMPERO DELL\'IRAN (PERSIA)'] = HISTORICAL_FLAGS['IRN'];
HISTORICAL_FLAGS['ROC'] = HISTORICAL_FLAGS['CHI'];
HISTORICAL_FLAGS['CHINA'] = HISTORICAL_FLAGS['CHI'];
HISTORICAL_FLAGS['CINA'] = HISTORICAL_FLAGS['CHI'];
HISTORICAL_FLAGS['REPUBBLICA DI CINA'] = HISTORICAL_FLAGS['CHI'];
HISTORICAL_FLAGS['REPUBBLICA DI CINA (KMT)'] = HISTORICAL_FLAGS['CHI'];
HISTORICAL_FLAGS['TAIWAN'] = HISTORICAL_FLAGS['CHI'];
HISTORICAL_FLAGS['AF'] = HISTORICAL_FLAGS['AFG'];
HISTORICAL_FLAGS['AFGHANISTAN'] = HISTORICAL_FLAGS['AFG'];
HISTORICAL_FLAGS['REGNO DELL\'AFGHANISTAN'] = HISTORICAL_FLAGS['AFG'];
HISTORICAL_FLAGS['PER'] = HISTORICAL_FLAGS['PRU'];
HISTORICAL_FLAGS['PERU'] = HISTORICAL_FLAGS['PRU'];
HISTORICAL_FLAGS['PERÙ'] = HISTORICAL_FLAGS['PRU'];
HISTORICAL_FLAGS['REPUBBLICA PERUVIANA'] = HISTORICAL_FLAGS['PRU'];
HISTORICAL_FLAGS['REPUBLIC OF PERU'] = HISTORICAL_FLAGS['PRU'];
HISTORICAL_FLAGS['BRAZIL'] = HISTORICAL_FLAGS['BRA'];
HISTORICAL_FLAGS['BRASILE'] = HISTORICAL_FLAGS['BRA'];
HISTORICAL_FLAGS['STATI UNITI DEL BRASILE'] = HISTORICAL_FLAGS['BRA'];
HISTORICAL_FLAGS['ESTADO NOVO'] = HISTORICAL_FLAGS['BRA'];
HISTORICAL_FLAGS['MONGOLIA'] = HISTORICAL_FLAGS['MON'];
HISTORICAL_FLAGS['MNG'] = HISTORICAL_FLAGS['MON'];
HISTORICAL_FLAGS['REPUBBLICA POPOLARE MONGOLA'] = HISTORICAL_FLAGS['MON'];
HISTORICAL_FLAGS['MONGOLIAN PEOPLE\'S REPUBLIC'] = HISTORICAL_FLAGS['MON'];
HISTORICAL_FLAGS['SAN_MARINO'] = HISTORICAL_FLAGS['SMR'];
HISTORICAL_FLAGS['SAN MARINO'] = HISTORICAL_FLAGS['SMR'];
HISTORICAL_FLAGS['SM'] = HISTORICAL_FLAGS['SMR'];
HISTORICAL_FLAGS['VATICAN'] = HISTORICAL_FLAGS['VAT'];
HISTORICAL_FLAGS['VATICANO'] = HISTORICAL_FLAGS['VAT'];
HISTORICAL_FLAGS['VATICAN_CITY'] = HISTORICAL_FLAGS['VAT'];
HISTORICAL_FLAGS['HOLY_SEE'] = HISTORICAL_FLAGS['VAT'];
HISTORICAL_FLAGS['VA'] = HISTORICAL_FLAGS['VAT'];
HISTORICAL_FLAGS['GIBRALTAR'] = HISTORICAL_FLAGS['GIB'];
HISTORICAL_FLAGS['GIBILTERRA'] = HISTORICAL_FLAGS['GIB'];
HISTORICAL_FLAGS['GI'] = HISTORICAL_FLAGS['GIB'];
HISTORICAL_FLAGS['ANDORRA'] = HISTORICAL_FLAGS['AND'];
HISTORICAL_FLAGS['AD'] = HISTORICAL_FLAGS['AND'];
HISTORICAL_FLAGS['LIE'] = HISTORICAL_FLAGS['LIE'];
HISTORICAL_FLAGS['LIECHTENSTEIN'] = HISTORICAL_FLAGS['LIE'];
HISTORICAL_FLAGS['LI'] = HISTORICAL_FLAGS['LIE'];
HISTORICAL_FLAGS['PRINCIPATO DEL LIECHTENSTEIN'] = HISTORICAL_FLAGS['LIE'];
HISTORICAL_FLAGS['FUERSTENTUM_LIECHTENSTEIN'] = HISTORICAL_FLAGS['LIE'];
HISTORICAL_FLAGS['FÜRSTENTUM LIECHTENSTEIN'] = HISTORICAL_FLAGS['LIE'];
HISTORICAL_FLAGS['TANGIER'] = HISTORICAL_FLAGS['TANGER'];
HISTORICAL_FLAGS['TANGERI'] = HISTORICAL_FLAGS['TANGER'];
HISTORICAL_FLAGS['ZONE INTERNATIONALE DE TANGER'] = HISTORICAL_FLAGS['TANGER'];
HISTORICAL_FLAGS['ZONA INTERNACIONAL DE TANGER'] = HISTORICAL_FLAGS['TANGER'];
HISTORICAL_FLAGS['TANGIER INTERNATIONAL ZONE'] = HISTORICAL_FLAGS['TANGER'];
HISTORICAL_FLAGS['INT_TANGER'] = HISTORICAL_FLAGS['TANGER'];

HISTORICAL_FLAGS['MEXICO'] = HISTORICAL_FLAGS['MEX'];
HISTORICAL_FLAGS['MESSICO'] = HISTORICAL_FLAGS['MEX'];
HISTORICAL_FLAGS['MX'] = HISTORICAL_FLAGS['MEX'];
HISTORICAL_FLAGS['GUATEMALA'] = HISTORICAL_FLAGS['GTM'];
HISTORICAL_FLAGS['GT'] = HISTORICAL_FLAGS['GTM'];
HISTORICAL_FLAGS['EL SALVADOR'] = HISTORICAL_FLAGS['SLV'];
HISTORICAL_FLAGS['SV'] = HISTORICAL_FLAGS['SLV'];
HISTORICAL_FLAGS['HONDURAS'] = HISTORICAL_FLAGS['HND'];
HISTORICAL_FLAGS['HN'] = HISTORICAL_FLAGS['HND'];
HISTORICAL_FLAGS['NICARAGUA'] = HISTORICAL_FLAGS['NIC'];
HISTORICAL_FLAGS['NI'] = HISTORICAL_FLAGS['NIC'];
HISTORICAL_FLAGS['COSTA RICA'] = HISTORICAL_FLAGS['CRI'];
HISTORICAL_FLAGS['CR'] = HISTORICAL_FLAGS['CRI'];
HISTORICAL_FLAGS['PANAMA'] = HISTORICAL_FLAGS['PAN'];
HISTORICAL_FLAGS['PA'] = HISTORICAL_FLAGS['PAN'];
HISTORICAL_FLAGS['CUBA'] = HISTORICAL_FLAGS['CUB'];
HISTORICAL_FLAGS['CU'] = HISTORICAL_FLAGS['CUB'];
HISTORICAL_FLAGS['DOMINICAN REPUBLIC'] = HISTORICAL_FLAGS['DOM'];
HISTORICAL_FLAGS['REPUBBLICA DOMINICANA'] = HISTORICAL_FLAGS['DOM'];
HISTORICAL_FLAGS['DO'] = HISTORICAL_FLAGS['DOM'];
HISTORICAL_FLAGS['HAITI'] = HISTORICAL_FLAGS['HAI'];
HISTORICAL_FLAGS['HT'] = HISTORICAL_FLAGS['HAI'];
HISTORICAL_FLAGS['HTI'] = HISTORICAL_FLAGS['HAI'];
HISTORICAL_FLAGS['NDH'] = HISTORICAL_FLAGS['CRO'];
HISTORICAL_FLAGS['HRV'] = HISTORICAL_FLAGS['CRO'];
HISTORICAL_FLAGS['CROATIA'] = HISTORICAL_FLAGS['CRO'];
HISTORICAL_FLAGS['CROAZIA'] = HISTORICAL_FLAGS['CRO'];
HISTORICAL_FLAGS['STATO INDIPENDENTE DI CROAZIA'] = HISTORICAL_FLAGS['CRO'];
HISTORICAL_FLAGS['NEZAVISNA DRŽAVA HRVATSKA'] = HISTORICAL_FLAGS['CRO'];
HISTORICAL_FLAGS['NEZAVISNA DRZAVA HRVATSKA'] = HISTORICAL_FLAGS['CRO'];
HISTORICAL_FLAGS['IQ'] = HISTORICAL_FLAGS['IRQ'];
HISTORICAL_FLAGS['IRAQ'] = HISTORICAL_FLAGS['IRQ'];
HISTORICAL_FLAGS['REGNO DELL\'IRAQ'] = HISTORICAL_FLAGS['IRQ'];

HISTORICAL_FLAGS['BRITISH_RAJ'] = HISTORICAL_FLAGS['RAJ'];
HISTORICAL_FLAGS['INDIA BRITANNICA'] = HISTORICAL_FLAGS['RAJ'];
HISTORICAL_FLAGS['IMPERO ANGLO-INDIANO'] = HISTORICAL_FLAGS['RAJ'];
HISTORICAL_FLAGS['IN'] = HISTORICAL_FLAGS['RAJ'];


/**
 * Returns raw SVG string of the historical flag for an owner/nation at a specific timeline step.
 */
export function getCountryFlagSvg(ownerKey: string, step: number = 0): string {
  const cleanKey = (ownerKey || 'NEU').trim().toUpperCase();
  const withSpaces = cleanKey.replace(/_/g, ' ');
  const withUnderscores = cleanKey.replace(/\s+/g, '_');
  const canon = canonicalizeOwnerCode(cleanKey);
  const fn =
    HISTORICAL_FLAGS[cleanKey] ||
    HISTORICAL_FLAGS[withSpaces] ||
    HISTORICAL_FLAGS[withUnderscores] ||
    HISTORICAL_FLAGS[canon] ||
    HISTORICAL_FLAGS['NEU'];
  return fn(step);
}

/**
 * React Component for rendering historical flags
 */
export const CountryFlag: React.FC<{
  owner: string;
  step?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ owner, step = 0, className = 'w-full h-full', style }) => {
  const svgHtml = getCountryFlagSvg(owner, step);
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden flex-none ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
};
