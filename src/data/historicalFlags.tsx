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

import { DFJ_FLAG_DATA_URL } from './flags/dfjFlag';

import { FNRJ_FLAG_DATA_URL } from './flags/fnrjFlag';

import { TLT_FLAG_DATA_URL } from './flags/tltFlag';
import { SAAR_FLAG_DATA_URL } from './flags/saarFlag';

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

import { RSI_FLAG_DATA_URL } from './flags/rsiFlag';

import { DRV_FLAG_DATA_URL } from './flags/drvFlag';

import { IDN_FLAG_DATA_URL } from './flags/idnFlag';

import { ACC_FLAG_DATA_URL } from './flags/accFlag';

import { POSTWAR_OFFICIAL_FLAGS } from './flags/postwarFlags';

import { canonicalizeOwnerCode } from './owners';

import {

  resolveHistoricalFlag,

  getFlagMetadataForStep,

  type HistoricalFlagMetadata,

  STEP_CHRONOLOGICAL_DATES,

  validateFlagAgainstAnachronism,

  exportFlagPayloadJson,

} from './historicalFlagResolver';



export {

  resolveHistoricalFlag,

  getFlagMetadataForStep,

  type HistoricalFlagMetadata,

  STEP_CHRONOLOGICAL_DATES,

  validateFlagAgainstAnachronism,

  exportFlagPayloadJson,

};



/**

 * Historical Flags (1936-1940)

 * Ultra-high-fidelity SVG flags with historically accurate heraldry, emblems, and palettes.

 */



// Helper to wrap SVG in standard viewBox

function svgWrap(content: string, vb = '0 0 600 400'): string {

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${vb}" width="100%" height="100%" preserveAspectRatio="none" class="flag-svg">${content}</svg>`;

}

function officialSvgFlag(key: string, extraTitle = ''): string {

  const asset = POSTWAR_OFFICIAL_FLAGS[key];

  if (!asset) return '';

  return svgWrap(

    `${extraTitle ? `<title>${extraTitle}</title>` : ''}<image href="${asset.dataUrl}" xlink:href="${asset.dataUrl}" width="${asset.width}" height="${asset.height}" preserveAspectRatio="none" />`,

    `0 0 ${asset.width} ${asset.height}`

  );

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



  // PRINCIPATO DI MONACO — Bandiera bicolore rossa e bianca dei Grimaldi (proporzioni 4:5)

  MCO: () =>

    svgWrap(

      `<rect width="500" height="200" fill="#ce1126"/><rect y="200" width="500" height="200" fill="#ffffff"/>`,

      '0 0 500 400'

    ),



  // REGNO D'ITALIA (1861-1946) — Bandiera ufficiale fornita dall'utente

  ITA: (s: number = 0) =>

    s >= 19

      ? svgWrap(

          '<path fill="#ce1126" d="M0 0h900v600H0"/><path fill="#fff" d="M0 0h600v600H0"/><path fill="#007a5e" d="M0 0h300v600H0"/>',

          '0 0 900 600'

        )

      : svgWrap(

          `<image href="${ITA_FLAG_DATA_URL}" xlink:href="${ITA_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

          '0 0 1024 682'

        ),

  // REICH TEDESCO (1935-1945) & CONSIGLIO DI CONTROLLO ALLEATO (Step 18+ C-Pennant fornito dall'utente)

  GER: (s: number = 0) => {

    if (s >= 18) {

      return svgWrap(

        `<image href="${ACC_FLAG_DATA_URL}" xlink:href="${ACC_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

        '0 0 1024 682'

      );

    }

    return svgWrap(

      `<image href="${GER_FLAG_DATA_URL}" xlink:href="${GER_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,

      '0 0 1024 614'

    );

  },



  ACC: () =>

    svgWrap(

      `<image href="${ACC_FLAG_DATA_URL}" xlink:href="${ACC_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

      '0 0 1024 682'

    ),



  // REPUBBLICA DEMOCRATICA DEL VIETNAM (Việt Minh / Ho Chi Minh — Proclamazione 2 Settembre 1945, bandiera fornita dall'utente)

  VIE: () =>

    svgWrap(

      `<image href="${DRV_FLAG_DATA_URL}" xlink:href="${DRV_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

      '0 0 1024 682'

    ),

  DRV: () =>

    svgWrap(

      `<image href="${DRV_FLAG_DATA_URL}" xlink:href="${DRV_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

      '0 0 1024 682'

    ),



  // REPUBBLICA D'INDONESIA (Sukarno / Hatta — Proclamazione 17 Agosto 1945, bandiera fornita dall'utente)

  IDN: (step?: number) => {
    const s = typeof step === 'number' ? step : 0;
    if (s >= 24) {
      // 27 Dicembre 1949: Stati Uniti d'Indonesia (Republik Indonesia Serikat - RIS) — file ufficiale Wikimedia Commons Flag_of_Indonesia.svg
      return officialSvgFlag('RIS_1949');
    }
    return svgWrap(
      `<image href="${IDN_FLAG_DATA_URL}" xlink:href="${IDN_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    );
  },



  // GOVERNO MILITARE ALLEATO (Allied Military Government — Venezia Giulia & Pola a s=18 / Territorio Libero di Trieste a s>=19)

  AMG: (s: number = 0) =>

    s >= 19

      ? svgWrap(

          `<image href="${TLT_FLAG_DATA_URL}" xlink:href="${TLT_FLAG_DATA_URL}" width="638" height="424" preserveAspectRatio="none" />`,

          '0 0 638 424'

        )

      : svgWrap(`

          <rect width="600" height="400" fill="#0c2340"/>

          <circle cx="300" cy="200" r="140" fill="#ffffff" opacity="0.15"/>

          <text x="300" y="225" font-family="Arial, Helvetica, sans-serif" font-size="95" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="4">AMG</text>

          <text x="300" y="280" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="bold" fill="#e0e6ed" text-anchor="middle" letter-spacing="2">VENEZIA GIULIA</text>

        `),



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



  // FRANCIA LIBERA (AFRICA / DE GAULLE, 1940-1944) — Tricolore con Croce di Lorena (dal 26 ago 1944 GPRF Tricolore repubblicano)

  FFL_AEF: (step?: number) => {

    const s = typeof step === 'number' ? step : 7;

    if (s >= 16) {

      return svgWrap(`

        <rect width="200" height="400" fill="#002395"/>

        <rect x="200" width="200" height="400" fill="#ffffff"/>

        <rect x="400" width="200" height="400" fill="#ed2939"/>

      `);

    }

    return svgWrap(`

      <rect width="200" height="400" fill="#002395"/>

      <rect x="200" width="200" height="400" fill="#ffffff"/>

      <rect x="400" width="200" height="400" fill="#ed2939"/>

      <!-- Croce di Lorena Rossa -->

      <rect x="292" y="100" width="16" height="200" fill="#ce2b37"/>

      <rect x="260" y="140" width="80" height="16" fill="#ce2b37"/>

      <rect x="250" y="195" width="100" height="16" fill="#ce2b37"/>

    `);

  },



  // IMPERO DEL GIAPPONE — Hinomaru / Sole Nascente

  JAP: () =>

    svgWrap(`

      <rect width="600" height="400" fill="#ffffff"/>

      <circle cx="300" cy="200" r="120" fill="#bc002d"/>

    `),



  // POLONIA — Seconda Repubblica (1919-1939 Aquila Incoronata) vs Dopoguerra (1945-1980 Aquila Senza Corona ufficiale Wikimedia Commons)

  POL: (step?: number) => {

    const s = typeof step === 'number' ? step : 0;

    if (s >= 18) {

      return officialSvgFlag('POL_1945');

    }

    return svgWrap(

      `<image href="${POL_FLAG_DATA_URL}" xlink:href="${POL_FLAG_DATA_URL}" width="1024" height="640" preserveAspectRatio="none" />`,

      '0 0 1024 640'

    );

  },



  // REPUBBLICA DI CINA (GUOMINDANG / NAZIONALISTA) — Bandiera ufficiale fornita dall'utente (1024x682)

  CHI: () =>

    svgWrap(

      `<image href="${CHI_FLAG_DATA_URL}" xlink:href="${CHI_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

      '0 0 1024 682'

    ),



  // REPUBBLICA SOVIETICA CINESE / PARTITO COMUNISTA CINESE (中華蘇維埃共和國 / MAO ZEDONG — YAN'AN)

  CCP_CHI: (step?: number) => {
    const s = typeof step === 'number' ? step : 0;
    if (s >= 24) {
      // 1° Ottobre 1949: Repubblica Popolare Cinese (Bandiera Rossa a Cinque Stelle) — file ufficiale Wikimedia Commons Flag_of_the_People's_Republic_of_China.svg
      return officialSvgFlag('PRC_1949');
    }
    return svgWrap(
      `<image href="${CCP_FLAG_DATA_URL}" xlink:href="${CCP_FLAG_DATA_URL}" width="1024" height="737" preserveAspectRatio="none" />`,
      '0 0 1024 737'
    );
  },



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

  // SECONDA REPUBBLICA DEL TURKESTAN ORIENTALE (1944-1949) — Mezzaluna e stella bianca su campo verde
  ETR: () =>
    svgWrap(
      `<defs><mask id="etrCrescent"><rect width="600" height="400" fill="black"/><circle cx="240" cy="200" r="100" fill="white"/><circle cx="265" cy="200" r="80" fill="black"/></mask></defs>` +
        `<rect width="600" height="400" fill="#0d7a3e"/>` +
        `<rect width="600" height="400" fill="#ffffff" mask="url(#etrCrescent)"/>` +
        `<polygon points="365,155 376,188 411,188 383,209 393,242 365,222 337,242 347,209 319,188 354,188" fill="#ffffff"/>`,
      '0 0 600 400'
    ),



  // SECONDA REPUBBLICA SPAGNOLA (1931-1939) — Bandiera ufficiale tricolore con stemma murario

  SPR: () =>

    svgWrap(

      `<image href="${SPR_FLAG_DATA_URL}" xlink:href="${SPR_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,

      '0 0 1024 614'

    ),



  // STATO SPAGNOLO / SPAGNA FRANCHISTA (1938-1945 vs Decreto 11 Ottobre 1945 ufficiale Wikimedia Commons)

  SPA: (step?: number) => {

    const s = typeof step === 'number' ? step : 0;

    if (s >= 19) {

      return officialSvgFlag('SPA_1945');

    }

    return svgWrap(

      `<image href="${SPA_FLAG_DATA_URL}" xlink:href="${SPA_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

      '0 0 1024 682'

    );

  },



  // REGNO DI JUGOSLAVIA — Bandiera ufficiale tricolore / DFJ Partigiana (Step >= 16) / FNRJ Socialista (Step >= 19)

  YUG: (step?: number) => {

    const s = typeof step === 'number' ? step : 0;

    if (s >= 19) {

      return svgWrap(

        `<image href="${FNRJ_FLAG_DATA_URL}" xlink:href="${FNRJ_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,

        '0 0 1024 512'

      );

    }

    const isDfj = s >= 16;

    const url = isDfj ? DFJ_FLAG_DATA_URL : YUG_FLAG_DATA_URL;

    const viewBox = isDfj ? '0 0 1024 512' : '0 0 1024 682';

    const h = isDfj ? 512 : 682;

    return svgWrap(

      `<image href="${url}" xlink:href="${url}" width="1024" height="${h}" preserveAspectRatio="none" />`,

      viewBox

    );

  },



  // JUGOSLAVIA PARTIGIANA / DEMOKRATSKA FEDERATIVNA (1943-1945) & FNRJ / JUGOSLAVIA SOCIALISTA (Step >= 19)

  DFJ: (s: number = 0) =>

    s >= 19

      ? svgWrap(

          `<image href="${FNRJ_FLAG_DATA_URL}" xlink:href="${FNRJ_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,

          '0 0 1024 512'

        )

      : svgWrap(

          `<image href="${DFJ_FLAG_DATA_URL}" xlink:href="${DFJ_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,

          '0 0 1024 512'

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



  // UNGHERIA — Regno d'Ungheria con Corona di S. Stefano (fino al 31 gen 1946) vs Seconda Repubblica Ungherese con Stemma di Kossuth (dal 1° feb 1946)
  HUN: (step?: number) => {
    const s = typeof step === 'number' ? step : 0;
    if (s >= 24) {
      // 20 Agosto 1949: Repubblica Popolare Ungherese — File ufficiale Wikimedia Commons Flag_of_Hungary_(1949-1956).svg (Stemma di Rákosi)
      return officialSvgFlag('HUN_1949');
    }
    if (s >= 19) {
      // 1 Febbraio 1946 – 19 Agosto 1949: Seconda Repubblica Ungherese — File ufficiale Wikimedia Commons con Stemma di Kossuth
      return officialSvgFlag('HUN_1946');
    }
    return svgWrap(
      `<image href="${HUN_FLAG_DATA_URL}" xlink:href="${HUN_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
      '0 0 1024 512'
    );
  },

  // REGNO DI ROMANIA (fino al 29 dic 1947) & REPUBBLICA POPOLARE ROMENA (RPR dal 30 dic 1947 — Step >= 20; Costituzione 13 apr 1948 — Step >= 21)
  ROM: (step?: number) => {
    const s = typeof step === 'number' ? step : 0;
    if (s >= 21) {
      // Costituzione RPR del 13 Aprile 1948: Tricolore romeno con emblema RPR (Wikimedia Commons Flag_of_Romania_(1948–1952).svg)
      return officialSvgFlag('ROM_1948');
    }
    if (s >= 20) {
      // 30 Dicembre 1947 – 8 Gennaio 1948: Tricolore romeno ufficiale senza stemma reale (Wikimedia Commons Flag_of_Romania.svg)
      return officialSvgFlag('ROM_1947');
    }
    return svgWrap(
      `<image href="${ROM_FLAG_DATA_URL}" xlink:href="${ROM_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    );
  },

  // ZARATO DI BULGARIA & REPUBBLICA POPOLARE DI BULGARIA (Costituzione Dimitrov 4 dic 1947)
  BUL: (step?: number) => {
    const s = typeof step === 'number' ? step : 0;
    if (s >= 20) {
      // Costituzione Dimitrov del 4 Dicembre 1947 (Art. 96): File ufficiale Wikimedia Commons NRB
      return officialSvgFlag('BUL_1947');
    }
    return svgWrap(
      `<image href="${BUL_FLAG_DATA_URL}" xlink:href="${BUL_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,
      '0 0 1024 614'
    );
  },

  // FINLANDIA — Bandiera di Stato ufficiale con stemma del leone (Wikimedia Commons)
  FIN: () => officialSvgFlag('FIN_STATE'),

  // REGNO DI GRECIA — Croce bianca su campo blu con corona reale ellenica dorata
  GRE: () =>
    svgWrap(
      `<image href="${GRE_FLAG_DATA_URL}" xlink:href="${GRE_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,
      '0 0 1024 682'
    ),
  // ESERCITO DEMOCRATICO DI GRECIA (DSE 1946–49) & EAM-ELAS (1942–45)
  DSE: (step?: number) => {
    const s = typeof step === 'number' ? step : 19;
    if (s < 18) {
      return svgWrap(`
        <rect width="600" height="400" fill="#0d5eaf"/>
        <rect x="240" width="120" height="400" fill="#ffffff"/>
        <rect y="140" width="600" height="120" fill="#ffffff"/>
        <text x="300" y="218" text-anchor="middle" font-family="serif" font-weight="900" font-size="64" letter-spacing="6" fill="#c8102e">ΕΛΑΣ</text>
      `);
    }
    return officialSvgFlag('DSE_1946', 'DSE Δ');
  },
  ELAS: () => HISTORICAL_FLAGS['DSE'](16),
  EAM_ELAS: () => HISTORICAL_FLAGS['DSE'](16),
  PDG: () => HISTORICAL_FLAGS['DSE'](20),

  // AZAD JAMMU & KASHMIR (24 ottobre 1947 – 1975: file ufficiale Wikimedia Commons Flag_of_Azad_Kashmir.svg)
  AZK: () => officialSvgFlag('AZK_1947'),
  AZAD_KASHMIR: () => HISTORICAL_FLAGS['AZK'](),

  // NEGARA SUMATERA TIMUR (Stato di Sumatra Orientale — 25 dicembre 1947: file ufficiale Wikimedia Commons)
  NST: () => officialSvgFlag('NST_1947'),

  EAST_SUMATRA: () => HISTORICAL_FLAGS['NST'](),

  // UNIONE DELLA BIRMANIA (4 gennaio 1948 – 1974: file ufficiale Wikimedia Commons Flag_of_Burma_(1948–1974).svg)
  BUR: () => officialSvgFlag('BUR_1948'),
  BURMA: () => HISTORICAL_FLAGS['BUR'](),
  BIRMANIA: () => HISTORICAL_FLAGS['BUR'](),
  UNIONE_DELLA_BIRMANIA: () => HISTORICAL_FLAGS['BUR'](),
  UNION_OF_BURMA: () => HISTORICAL_FLAGS['BUR'](),
  MYANMAR: () => HISTORICAL_FLAGS['BUR'](),

  // DOMINION DI CEYLON (4 febbraio 1948 – 1951: file ufficiale Wikimedia Commons Flag_of_Ceylon_(1948–1951).svg senza strisce verde/arancio)
  CEY: () => officialSvgFlag('CEY_1948'),
  CEYLON: () => HISTORICAL_FLAGS['CEY'](),
  DOMINION_OF_CEYLON: () => HISTORICAL_FLAGS['CEY'](),
  DOMINION_DI_CEYLON: () => HISTORICAL_FLAGS['CEY'](),
  SRI_LANKA: () => HISTORICAL_FLAGS['CEY'](),
  LK: (s) => (s !== undefined && s >= 21 ? HISTORICAL_FLAGS['CEY'](s) : HISTORICAL_FLAGS['UK'](s)),
  LKA: (s) => (s !== undefined && s >= 21 ? HISTORICAL_FLAGS['CEY'](s) : HISTORICAL_FLAGS['UK'](s)),

  // STATO DI ISRAELE (14 maggio 1948: file ufficiale Wikimedia Commons Flag_of_Israel.svg)
  ISR: () => officialSvgFlag('ISR_1948'),
  ISRAEL: () => HISTORICAL_FLAGS['ISR'](),
  ISRAELE: () => HISTORICAL_FLAGS['ISR'](),
  STATO_DI_ISRAELE: () => HISTORICAL_FLAGS['ISR'](),
  STATE_OF_ISRAEL: () => HISTORICAL_FLAGS['ISR'](),
  IL: () => HISTORICAL_FLAGS['ISR'](),

  // STATO DI PASUNDAN / NEGARA PASUNDAN (24 aprile 1948: file ufficiale Wikimedia Commons Flag_of_Pasundan.svg)
  PAS: () => officialSvgFlag('PAS_1948'),
  PASUNDAN: () => HISTORICAL_FLAGS['PAS'](),
  NEGARA_PASUNDAN: () => HISTORICAL_FLAGS['PAS'](),
  STATE_OF_PASUNDAN: () => HISTORICAL_FLAGS['PAS'](),
  STATO_DI_PASUNDAN: () => HISTORICAL_FLAGS['PAS'](),

  // STATO DI MADURA / NEGARA MADURA (20 febbraio 1948: file ufficiale Wikimedia Commons Flag_of_Various_Autonomous_Indonesian_States.svg)
  MAD: () => officialSvgFlag('MAD_1948'),
  MADURA: () => HISTORICAL_FLAGS['MAD'](),
  NEGARA_MADURA: () => HISTORICAL_FLAGS['MAD'](),
  STATE_OF_MADURA: () => HISTORICAL_FLAGS['MAD'](),
  STATO_DI_MADURA: () => HISTORICAL_FLAGS['MAD'](),

  // FEDERAZIONE DELLA MALESIA (1° feb 1948 – mag 1950: 4 bande con tigre; dal 26 mag 1950: 11 strisce e stella a 11 punte)
  MAL: (step?: number) => {
    const s = typeof step === 'number' ? step : 21;
    return officialSvgFlag(s >= 25 ? 'MAL_FED_1950' : 'MAL_FED_1948');
  },
  FOM: (s?: number) => HISTORICAL_FLAGS['MAL'](s),
  FEDERATION_OF_MALAYA: (s?: number) => HISTORICAL_FLAGS['MAL'](s),
  FEDERAZIONE_DELLA_MALESIA: (s?: number) => HISTORICAL_FLAGS['MAL'](s),
  PERSEKUTUAN_TANAH_MELAYU: (s?: number) => HISTORICAL_FLAGS['MAL'](s),

  // REPUBBLICA DI COREA — COREA DEL SUD (15 agosto 1948: ROK_1948; 15 ottobre 1949: ROK_1949; 7 luglio 1950 / Step 26+: Taegeukgi affiancato alla bandiera ONU del Comando UNC)
  ROK: (step?: number) => {
    const s = typeof step === 'number' ? step : 22;
    if (s >= 26) {
      const rok = POSTWAR_OFFICIAL_FLAGS['ROK_1949'];
      const un = POSTWAR_OFFICIAL_FLAGS['UN_1947'];
      return svgWrap(
        `<image href="${rok.dataUrl}" xlink:href="${rok.dataUrl}" x="0" y="0" width="300" height="400" preserveAspectRatio="none" />` +
          `<image href="${un.dataUrl}" xlink:href="${un.dataUrl}" x="300" y="0" width="300" height="400" preserveAspectRatio="none" />`,
        '0 0 600 400'
      );
    }
    return officialSvgFlag(s >= 24 ? 'ROK_1949' : 'ROK_1948');
  },
  UNC: () => HISTORICAL_FLAGS['ROK'](26),
  ROK_UNC: () => HISTORICAL_FLAGS['ROK'](26),
  SOUTH_KOREA: () => HISTORICAL_FLAGS['ROK'](),
  COREA_DEL_SUD: () => HISTORICAL_FLAGS['ROK'](),
  KR: (s) => (s !== undefined && s >= 22 ? HISTORICAL_FLAGS['ROK'](s) : s !== undefined && s >= 18 ? HISTORICAL_FLAGS['USA'](s) : HISTORICAL_FLAGS['JAP'](s)),
  KOR: (s) => (s !== undefined && s >= 22 ? HISTORICAL_FLAGS['ROK'](s) : s !== undefined && s >= 18 ? HISTORICAL_FLAGS['USA'](s) : HISTORICAL_FLAGS['JAP'](s)),

  // REPUBBLICA POPOLARE DEMOCRATICA DI COREA — COREA DEL NORD (8/9 settembre 1948: file ufficiale Wikimedia Commons Flag_of_North_Korea_(1948–1992).svg)
  PRK: () => officialSvgFlag('PRK_1948'),
  DPRK: () => HISTORICAL_FLAGS['PRK'](),
  RPDC: () => HISTORICAL_FLAGS['PRK'](),
  NORTH_KOREA: () => HISTORICAL_FLAGS['PRK'](),
  COREA_DEL_NORD: () => HISTORICAL_FLAGS['PRK'](),
  KP: (s) => (s !== undefined && s >= 22 ? HISTORICAL_FLAGS['PRK'](s) : s !== undefined && s >= 18 ? HISTORICAL_FLAGS['SOV'](s) : HISTORICAL_FLAGS['JAP'](s)),

  // GOVERNO DI TUTTO-PALESTINA — STRISCIA DI GAZA (22 settembre 1948: file ufficiale Wikimedia Commons Flag_of_the_Arab_Revolt.svg)
  APG: () => officialSvgFlag('APG_1948'),
  ALL_PALESTINE: () => HISTORICAL_FLAGS['APG'](),
  TUTTO_PALESTINA: () => HISTORICAL_FLAGS['APG'](),
  GOVERNO_DI_TUTTO_PALESTINA: () => HISTORICAL_FLAGS['APG'](),

  // STATO DI SUMATRA MERIDIONALE — NEGARA SUMATERA SELATAN (30 agosto 1948: file ufficiale Wikimedia Commons Flag_of_South_Sumatra.svg)
  NSS: () => officialSvgFlag('NSS_1948'),
  NEGARA_SUMATERA_SELATAN: () => HISTORICAL_FLAGS['NSS'](),
  SUMATRA_MERIDIONALE: () => HISTORICAL_FLAGS['NSS'](),

  // STATO DI GIAVA ORIENTALE — NEGARA JAWA TIMUR (26 novembre 1948: file ufficiale Wikimedia Commons Flag_of_Various_Autonomous_Indonesian_States.svg)
  NJT: () => officialSvgFlag('NJT_1948'),
  NEGARA_JAWA_TIMUR: () => HISTORICAL_FLAGS['NJT'](),
  GIAVA_ORIENTALE: () => HISTORICAL_FLAGS['NJT'](),

  // REPUBBLICA FEDERALE TEDESCA — GERMANIA OVEST (23 maggio 1949: Legge Fondamentale di Bonn — file ufficiale Wikimedia Commons Flag_of_Germany.svg)
  BRD: () => officialSvgFlag('BRD_1949'),
  RFT: () => HISTORICAL_FLAGS['BRD'](),
  FRG: () => HISTORICAL_FLAGS['BRD'](),
  WEST_GERMANY: () => HISTORICAL_FLAGS['BRD'](),
  GERMANIA_OVEST: () => HISTORICAL_FLAGS['BRD'](),
  BUNDESREPUBLIK_DEUTSCHLAND: () => HISTORICAL_FLAGS['BRD'](),

  // STATO DEL VIETNAM — QUỐC GIA VIỆT NAM (14 giugno 1949: Accordi dell'Eliseo / Bảo Đại — file ufficiale Wikimedia Commons Flag_of_South_Vietnam.svg)
  SVN: () => officialSvgFlag('SVN_1949'),
  QGVN: () => HISTORICAL_FLAGS['SVN'](),
  STATE_OF_VIETNAM: () => HISTORICAL_FLAGS['SVN'](),
  STATO_DEL_VIETNAM: () => HISTORICAL_FLAGS['SVN'](),
  QUOC_GIA_VIET_NAM: () => HISTORICAL_FLAGS['SVN'](),
  BAO_DAI_VIETNAM: () => HISTORICAL_FLAGS['SVN'](),

  // REPUBBLICA DEMOCRATICA TEDESCA — GERMANIA EST (7 ottobre 1949: Costituzione RDT — file ufficiale Wikimedia Commons Flag_of_Germany.svg, tricolore nero-rosso-oro senza emblema 1949–1959)
  DDR: () => officialSvgFlag('DDR_1949'),
  RDT: () => HISTORICAL_FLAGS['DDR'](),
  GDR: () => HISTORICAL_FLAGS['DDR'](),
  EAST_GERMANY: () => HISTORICAL_FLAGS['DDR'](),
  GERMANIA_EST: () => HISTORICAL_FLAGS['DDR'](),
  DEUTSCHE_DEMOKRATISCHE_REPUBLIK: () => HISTORICAL_FLAGS['DDR'](),

  // REGNO DEL LAOS — STATO ASSOCIATO NELL'UNIONE FRANCESE (19 luglio 1949: file ufficiale Wikimedia Commons Flag_of_Laos_(1952–1975).svg)
  LAO: () => officialSvgFlag('LAO_1949'),
  LAOS: () => HISTORICAL_FLAGS['LAO'](),
  KINGDOM_OF_LAOS: () => HISTORICAL_FLAGS['LAO'](),
  REGNO_DEL_LAOS: () => HISTORICAL_FLAGS['LAO'](),

  // REGNO DI CAMBOGIA — STATO ASSOCIATO NELL'UNIONE FRANCESE (8 novembre 1949: file ufficiale Wikimedia Commons Flag_of_Cambodia.svg)
  CAM: () => officialSvgFlag('CAM_1949'),
  KHM: () => HISTORICAL_FLAGS['CAM'](),
  CAMBODIA: () => HISTORICAL_FLAGS['CAM'](),
  CAMBOGIA: () => HISTORICAL_FLAGS['CAM'](),
  KINGDOM_OF_CAMBODIA: () => HISTORICAL_FLAGS['CAM'](),

  // STATI UNITI D'INDONESIA (27 dicembre 1949: Republik Indonesia Serikat - RIS)
  RIS: () => officialSvgFlag('RIS_1949'),
  REPUBLIK_INDONESIA_SERIKAT: () => officialSvgFlag('RIS_1949'),

  // AMMINISTRAZIONE FIDUCIARIA ITALIANA DELLA SOMALIA (AFIS, 1° aprile 1950): Bandiera ONU & Tricolore Italiano congiunti (file ufficiali verbatim)
  AFIS: () => {
    const un = POSTWAR_OFFICIAL_FLAGS['UN_1947'];
    const it = POSTWAR_OFFICIAL_FLAGS['IT_1947'];
    return svgWrap(
      `<image href="${un.dataUrl}" xlink:href="${un.dataUrl}" x="0" y="0" width="300" height="400" preserveAspectRatio="none" />` +
        `<svg x="300" y="0" width="300" height="400" viewBox="0 0 900 600" preserveAspectRatio="none">` +
        `<image href="${it.dataUrl}" xlink:href="${it.dataUrl}" width="900" height="600" preserveAspectRatio="none" />` +
        `</svg>`,
      '0 0 600 400'
    );
  },
  SOM_AFIS: () => HISTORICAL_FLAGS['AFIS'](),

  // REPUBBLICA DELLE MOLUCCHE MERIDIONALI (RMS — Benang Raja, 25 aprile 1950: file ufficiale Wikimedia Commons)
  RMS: () => officialSvgFlag('RMS_1950'),
  REPUBLIK_MALUKU_SELATAN: () => HISTORICAL_FLAGS['RMS'](),
  SOUTH_MOLUCCAS: () => HISTORICAL_FLAGS['RMS'](),

  // STATO DELL'INDONESIA ORIENTALE (Negara Indonesia Timur — NIT: file ufficiale Wikimedia Commons)
  NIT: () => officialSvgFlag('NIT_1946'),
  NEGARA_INDONESIA_TIMUR: () => HISTORICAL_FLAGS['NIT'](),

  // TERRITORIO LIBERO DI TRIESTE (TLT / FTT — Alabarda bianca di San Sergio in campo rosso)
  TLT: () => HISTORICAL_FLAGS['AMG'](19),

  FTT: () => HISTORICAL_FLAGS['AMG'](19),



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

    step !== undefined && step >= 6 && step < 18

      ? (HISTORICAL_FLAGS.SPA ? HISTORICAL_FLAGS.SPA(step) : svgWrap(

          `<image href="${TANGER_FLAG_DATA_URL}" xlink:href="${TANGER_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

          '0 0 1024 682'

        ))

      : svgWrap(

          `<image href="${TANGER_FLAG_DATA_URL}" xlink:href="${TANGER_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

          '0 0 1024 682'

        ),



  // STATO FEDERALE D'AUSTRIA (STÄNDESTAAT, 1934-1938) & SECONDA REPUBBLICA D'AUSTRIA (dal 1° Maggio 1945 — ufficiale Wikimedia Commons)

  AUS: (step?: number) => {

    const s = typeof step === 'number' ? step : 0;

    if (s >= 18) {

      return officialSvgFlag('AUS_1945');

    }

    return svgWrap(

      `<image href="${AUS_FLAG_DATA_URL}" xlink:href="${AUS_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

      '0 0 1024 682'

    );

  },



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



  // DOMINION DEL PAKISTAN (1947 — file ufficiale Wikimedia Commons)

  PAK: () => officialSvgFlag('PAK_1947'),

  // DOMINION DELL'INDIA (1947 — Tiranga ufficiale Wikimedia Commons)

  INDIA: () => officialSvgFlag('IND_1947'),

  // STATO PRINCIPESCO DI HYDERABAD (Asafia — file ufficiale Wikimedia Commons)

  HYD: () => officialSvgFlag('HYD_1947'),

  // STATO PRINCIPESCO DI JAMMU E KASHMIR (1936–1953 — file ufficiale Wikimedia Commons)

  KAS: () => officialSvgFlag('KAS_1947'),



  // PROTETTORATO DELLA SAAR (1947-1956) — Croce Bianca Scandinava su Campi Blu e Rossi
  SAAR: () =>
    svgWrap(`
      <rect width="1024" height="682" fill="#FFFFFF"/>
      <rect x="0" y="0" width="342" height="273" fill="#002654"/>
      <rect x="0" y="409" width="342" height="273" fill="#002654"/>
      <rect x="478" y="0" width="546" height="273" fill="#CE1126"/>
      <rect x="478" y="409" width="546" height="273" fill="#CE1126"/>
      <image href="${SAAR_FLAG_DATA_URL}" xlink:href="${SAAR_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none"/>
    `, '0 0 1024 682'),




  // REGNO HASCEMITA DI TRANSGIORDANIA — file ufficiale Wikimedia Commons

  JOR: () => officialSvgFlag('JOR_1928'),

  // REPUBBLICA SIRIANA (1932-1958) — file ufficiale Wikimedia Commons
  SYR: () => officialSvgFlag('SYR_1932'),

  // REPUBBLICA LIBANESE (1943) — file ufficiale Wikimedia Commons
  LEB: () => officialSvgFlag('LEB_1943'),



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



  // REGNO D'EGITTO (1922-1958) — file ufficiale Wikimedia Commons

  EGY: () => officialSvgFlag('EGY_1922'),



  // STATO INDIPENDENTE DI CROAZIA (NDH, 1941-1945) — Bandiera ufficiale fornita dall'utente (1024x412)

  CRO: () =>

    svgWrap(

      `<image href="${CRO_FLAG_DATA_URL}" xlink:href="${CRO_FLAG_DATA_URL}" width="1024" height="412" preserveAspectRatio="none" />`,

      '0 0 1024 412'

    ),



  // REPUBBLICA SOCIALE ITALIANA (RSI, 1943-1945) — Bandiera ufficiale fornita dall'utente (1024x682)

  RSI: () =>

    svgWrap(

      `<image href="${RSI_FLAG_DATA_URL}" xlink:href="${RSI_FLAG_DATA_URL}" width="1024" height="682" preserveAspectRatio="none" />`,

      '0 0 1024 682'

    ),



  // OPERATIONSZONE ALPENVORLAND (OZAV, 1943-1945) — Annessione de facto al Terzo Reich

  OZAV: () =>

    svgWrap(

      `<image href="${GER_FLAG_DATA_URL}" xlink:href="${GER_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,

      '0 0 1024 614'

    ),



  // OPERATIONSZONE ADRIATISCHES KÜSTENLAND (OZAK, 1943-1945) — Annessione de facto al Terzo Reich

  OZAK: () =>

    svgWrap(

      `<image href="${GER_FLAG_DATA_URL}" xlink:href="${GER_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,

      '0 0 1024 614'

    ),



  // REGNO HASHEMITA DELL'IRAQ (1924-1959) — file ufficiale Wikimedia Commons

  IRQ: () => officialSvgFlag('IRQ_1924'),



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



  // REPUBBLICA POPOLARE MONGOLA — Insegna 1930-1940 vs Soyombo Tricolore Rosso-Blu-Rosso con Stella (10 Luglio 1945 - 1992 ufficiale Wikimedia Commons)

  MON: (step?: number) => {

    const s = typeof step === 'number' ? step : 0;

    if (s >= 18) {

      return officialSvgFlag('MON_1945');

    }

    return svgWrap(

      `<image href="${MON_FLAG_DATA_URL}" xlink:href="${MON_FLAG_DATA_URL}" width="1024" height="614" preserveAspectRatio="none" />`,

      '0 0 1024 614'

    );

  },



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



  // ARGENTINA — file ufficiale Wikimedia Commons

  ARG: () => officialSvgFlag('ARG_STD'),



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



  // VENEZUELA (Legge sulla Bandiera del 15 Luglio 1930: 7 stelle bianche ad arco — file ufficiale Wikimedia Commons)

  VEN: () => officialSvgFlag('VEN_1930'),



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

HISTORICAL_FLAGS['F_NAF'] = (s) => (s && s >= 6 && s < 11 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));

HISTORICAL_FLAGS['VIC_NAF'] = (s) => (s && s >= 11 ? HISTORICAL_FLAGS['FRA'](s) : HISTORICAL_FLAGS['VIC'](s));

HISTORICAL_FLAGS['F_AOF'] = (s) => (s && s >= 6 && s < 11 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));

HISTORICAL_FLAGS['VIC_AOF'] = (s) => (s && s >= 11 ? HISTORICAL_FLAGS['FRA'](s) : HISTORICAL_FLAGS['VIC'](s));

HISTORICAL_FLAGS['AOF_VICHY'] = (s) => (s && s >= 11 ? HISTORICAL_FLAGS['FRA'](s) : HISTORICAL_FLAGS['VIC'](s));

HISTORICAL_FLAGS['F_AEF'] = (s) => (s && s >= 6 ? HISTORICAL_FLAGS['FFL_AEF'](s) : HISTORICAL_FLAGS['FRA'](s));

HISTORICAL_FLAGS['VIC_AEF'] = (s) => (s && s >= 7 ? HISTORICAL_FLAGS['FFL_AEF'](s) : HISTORICAL_FLAGS['VIC'](s));

HISTORICAL_FLAGS['AEF_VICHY'] = (s) => (s && s >= 7 ? HISTORICAL_FLAGS['FFL_AEF'](s) : HISTORICAL_FLAGS['VIC'](s));

HISTORICAL_FLAGS['FFL'] = HISTORICAL_FLAGS['FFL_AEF'];

HISTORICAL_FLAGS['F_IND'] = () =>

  svgWrap(

    `<image href="${IND_FLAG_DATA_URL}" xlink:href="${IND_FLAG_DATA_URL}" width="1024" height="683" preserveAspectRatio="none" />`,

    '0 0 1024 683'

  );

HISTORICAL_FLAGS['VIC_IND'] = HISTORICAL_FLAGS['VIC'];

HISTORICAL_FLAGS['IND'] = (s) => (s !== undefined && s >= 19 ? HISTORICAL_FLAGS['INDIA'](s) : HISTORICAL_FLAGS['F_IND'](s));

HISTORICAL_FLAGS['INDOCHINA'] = HISTORICAL_FLAGS['F_IND'];

HISTORICAL_FLAGS['INDOCHINE'] = HISTORICAL_FLAGS['F_IND'];

HISTORICAL_FLAGS['PAKISTAN'] = HISTORICAL_FLAGS['PAK'];

HISTORICAL_FLAGS['F_MAD'] = (s) => (s && s >= 6 && s < 11 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));

HISTORICAL_FLAGS['VIC_MAD'] = (s) => (s && s >= 11 ? HISTORICAL_FLAGS['FRA'](s) : HISTORICAL_FLAGS['VIC'](s));

HISTORICAL_FLAGS['F_SOM'] = (s) => (s && s >= 6 && s < 12 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));

HISTORICAL_FLAGS['VIC_SOM'] = (s) => (s && s >= 12 ? HISTORICAL_FLAGS['FRA'](s) : HISTORICAL_FLAGS['VIC'](s));

HISTORICAL_FLAGS['F_SYR'] = (s) => (s && s >= 6 && s < 9 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));

HISTORICAL_FLAGS['VIC_SYR'] = (s) => (s && s >= 9 ? HISTORICAL_FLAGS['FRA'](s) : HISTORICAL_FLAGS['VIC'](s));

HISTORICAL_FLAGS['F_COL'] = (s) => (s && s >= 6 && s < 12 ? HISTORICAL_FLAGS['VIC'](s) : HISTORICAL_FLAGS['FRA'](s));

HISTORICAL_FLAGS['VIC_COL'] = (s) => (s && s >= 12 ? HISTORICAL_FLAGS['FRA'](s) : HISTORICAL_FLAGS['VIC'](s));



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

HISTORICAL_FLAGS['IT'] = HISTORICAL_FLAGS['ITA'];

HISTORICAL_FLAGS['ITALIA'] = HISTORICAL_FLAGS['ITA'];

HISTORICAL_FLAGS['REPUBBLICA ITALIANA'] = HISTORICAL_FLAGS['ITA'];

HISTORICAL_FLAGS['REPUBBLICA_ITALIANA'] = HISTORICAL_FLAGS['ITA'];

HISTORICAL_FLAGS['ITA_REP'] = HISTORICAL_FLAGS['ITA'];

HISTORICAL_FLAGS['IT_1947'] = HISTORICAL_FLAGS['ITA'];

HISTORICAL_FLAGS['TLT'] = HISTORICAL_FLAGS['AMG'];

HISTORICAL_FLAGS['FTT'] = HISTORICAL_FLAGS['AMG'];

HISTORICAL_FLAGS['STO'] = HISTORICAL_FLAGS['AMG'];

HISTORICAL_FLAGS['TERRITORIO LIBERO DI TRIESTE'] = HISTORICAL_FLAGS['AMG'];

HISTORICAL_FLAGS['TERRITORIO_LIBERO_DI_TRIESTE'] = HISTORICAL_FLAGS['AMG'];

HISTORICAL_FLAGS['VUJA'] = () =>
  svgWrap(
    `<title>Territorio Libero di Trieste — Zona B (VUJA): bandiera FNRJ adottata de facto dall'amministrazione militare jugoslava in assenza di vessillo zonale esclusivo</title><image href="${FNRJ_FLAG_DATA_URL}" xlink:href="${FNRJ_FLAG_DATA_URL}" width="1024" height="512" preserveAspectRatio="none" />`,
    '0 0 1024 512'
  );

HISTORICAL_FLAGS['VUJA_FTT'] = HISTORICAL_FLAGS['VUJA'];

HISTORICAL_FLAGS['TLT_B'] = HISTORICAL_FLAGS['VUJA'];

HISTORICAL_FLAGS['FTT_B'] = HISTORICAL_FLAGS['VUJA'];

HISTORICAL_FLAGS['STT_B'] = HISTORICAL_FLAGS['VUJA'];

HISTORICAL_FLAGS['ZONA_B_TLT'] = HISTORICAL_FLAGS['VUJA'];

HISTORICAL_FLAGS['FNRJ'] = HISTORICAL_FLAGS['DFJ'];

HISTORICAL_FLAGS['SFRJ'] = HISTORICAL_FLAGS['DFJ'];

HISTORICAL_FLAGS['JUGOSLAVIA'] = HISTORICAL_FLAGS['DFJ'];

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

// PARAGUAY (1842-1954): Tricolore rosso-bianco-blu con stemma nazionale — file ufficiale Wikimedia Commons

HISTORICAL_FLAGS['PAR'] = () => officialSvgFlag('PAR_1842');

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

HISTORICAL_FLAGS['ICE'] = () =>

  svgWrap(

    `<rect width="25" height="18" fill="#02529c"/>` +

      `<path d="M0,7h25v4H0z M7,0h4v18H7z" fill="#ffffff"/>` +

      `<path d="M0,8h25v2H0z M8,0h2v18H8z" fill="#dc1e35"/>`,

    '0 0 25 18'

  );

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

HISTORICAL_FLAGS['ALB'] = (step?: number) => {

  const s = typeof step === 'number' ? step : 0;

  if (s >= 19) {

    return officialSvgFlag('ALB_1946');

  }

  if (s >= 16) {

    return officialSvgFlag('ALB_1944');

  }

  return svgWrap(

    `<image href="${ALB_FLAG_DATA_URL}" xlink:href="${ALB_FLAG_DATA_URL}" width="1024" height="683" preserveAspectRatio="none" />`,

    '0 0 1024 683'

  );

};

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

HISTORICAL_FLAGS['RPC'] = HISTORICAL_FLAGS['CCP_CHI'];

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

HISTORICAL_FLAGS['MC'] = HISTORICAL_FLAGS['MCO'];

HISTORICAL_FLAGS['MONACO'] = HISTORICAL_FLAGS['MCO'];

HISTORICAL_FLAGS['PRINCIPATO DI MONACO'] = HISTORICAL_FLAGS['MCO'];

HISTORICAL_FLAGS['PRINCIPAUTÉ DE MONACO'] = HISTORICAL_FLAGS['MCO'];

HISTORICAL_FLAGS['PRINCIPAUTE DE MONACO'] = HISTORICAL_FLAGS['MCO'];

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

HISTORICAL_FLAGS['IN'] = (s) => (s !== undefined && s >= 19 ? HISTORICAL_FLAGS['INDIA'](s) : HISTORICAL_FLAGS['RAJ'](s));

HISTORICAL_FLAGS['DOMINION_OF_INDIA'] = HISTORICAL_FLAGS['INDIA'];

HISTORICAL_FLAGS['DOMINION DELL\'INDIA'] = HISTORICAL_FLAGS['INDIA'];

HISTORICAL_FLAGS['UNIONE INDIANA'] = HISTORICAL_FLAGS['INDIA'];

HISTORICAL_FLAGS['DOMINION_OF_PAKISTAN'] = HISTORICAL_FLAGS['PAK'];

HISTORICAL_FLAGS['DOMINION DEL PAKISTAN'] = HISTORICAL_FLAGS['PAK'];

HISTORICAL_FLAGS['PK'] = (s) => (s !== undefined && s >= 19 ? HISTORICAL_FLAGS['PAK'](s) : HISTORICAL_FLAGS['RAJ'](s));

HISTORICAL_FLAGS['HYDERABAD'] = HISTORICAL_FLAGS['HYD'];

HISTORICAL_FLAGS['KASHMIR'] = HISTORICAL_FLAGS['KAS'];

HISTORICAL_FLAGS['JAMMU_KASHMIR'] = HISTORICAL_FLAGS['KAS'];

HISTORICAL_FLAGS['SAARLAND'] = HISTORICAL_FLAGS['SAAR'];

HISTORICAL_FLAGS['TRANSJORDAN'] = HISTORICAL_FLAGS['JOR'];

HISTORICAL_FLAGS['GIORDANIA'] = HISTORICAL_FLAGS['JOR'];
HISTORICAL_FLAGS['SYRIA'] = HISTORICAL_FLAGS['SYR'];
HISTORICAL_FLAGS['SIRIA'] = HISTORICAL_FLAGS['SYR'];
HISTORICAL_FLAGS['SY'] = HISTORICAL_FLAGS['SYR'];
HISTORICAL_FLAGS['LEBANON'] = HISTORICAL_FLAGS['LEB'];
HISTORICAL_FLAGS['LIBANO'] = HISTORICAL_FLAGS['LEB'];
HISTORICAL_FLAGS['LBN'] = HISTORICAL_FLAGS['LEB'];
HISTORICAL_FLAGS['LB'] = HISTORICAL_FLAGS['LEB'];
HISTORICAL_FLAGS['PER_IR'] = HISTORICAL_FLAGS['IRN'];



HISTORICAL_FLAGS['REPUBBLICA SOCIALE ITALIANA'] = HISTORICAL_FLAGS['RSI'];

HISTORICAL_FLAGS['REPUBBLICA_SOCIALE_ITALIANA'] = HISTORICAL_FLAGS['RSI'];

HISTORICAL_FLAGS['REPUBBLICA SOCIALE ITALIANA (RSI)'] = HISTORICAL_FLAGS['RSI'];

HISTORICAL_FLAGS['RSI (SALÒ)'] = HISTORICAL_FLAGS['RSI'];

HISTORICAL_FLAGS['RSI (SALO\')'] = HISTORICAL_FLAGS['RSI'];





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

