# -*- coding: utf-8 -*-
"""
Generatore integrale di src/data/frenchIndochinaProvinces.ts per le 106 province dell'Indocina Francese.
"""

import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

PROVINCES_CONFIG = [
    # =========================================================================
    # CAMBOGIA (25 PROVINCE)
    # =========================================================================
    ("KH1", "KH", "Cambodia", "Banteay Meanchey", "Banteay Meanchey (បន្ទាយមានជ័យ)", "Protectorat du Cambodge — Province de Sisophon", "Sisophon", "Sisophon", "Cambodge", "Snodo di confine strategico nord-occidentale verso la Thailandia."),
    ("KH2", "KH", "Cambodia", "Battambang", "Battambang (បាត់ដំបង)", "Protectorat du Cambodge — Province de Battambang", "Battambang / Phra Tabong", "Battambang", "Cambodge", "Granaio risicolo primario della Cambogia, contesa nella guerra franco-thailandese e ceduta temporaneamente a Phibun nel maggio 1941 col nome di Phra Tabong."),
    ("KH3", "KH", "Cambodia", "Kampong Cham", "Kampong Cham (កំពង់ចាម)", "Protectorat du Cambodge — Province de Kompong Cham", "Kompong Cham", "Kompong Cham", "Cambodge", "Grande porto fluviale sul Mekong e centro delle grandi piantagioni coloniali di hevea e tabacco."),
    ("KH4", "KH", "Cambodia", "Kampong Chhnang", "Kampong Chhnang (កំពង់ឆ្នាំង)", "Protectorat du Cambodge — Province de Kompong Chhnang", "Kompong Chhnang", "Kompong Chhnang", "Cambodge", "Centro lacustre sul lago Tonlé Sap rinomato per le ceramiche tradizionali e i villaggi galleggianti di pescatori."),
    ("KH5", "KH", "Cambodia", "Kampong Speu", "Kampong Speu (កំពង់ស្ពឺ)", "Protectorat du Cambodge — Province de Kompong Speu", "Kompong Speu", "Kompong Speu", "Cambodge", "Distretto pedemontano dei Monti Cardamomi celebre per la palma da zucchero (thnot) e le risaie."),
    ("KH6", "KH", "Cambodia", "Kampong Thom", "Kampong Thom (កំពង់ធំ)", "Protectorat du Cambodge — Province de Kompong Thom", "Kompong Thom", "Kompong Thom", "Cambodge", "Sede del complesso archeologico pre-angkoriano di Sambor Prei Kuk e nodo di transito verso Siem Reap."),
    ("KH7", "KH", "Cambodia", "Kampot", "Kampot (កំពត)", "Protectorat du Cambodge — Circonscription de Kampot & Bokor", "Kampot", "Kampot", "Cambodge", "Famoso per il celebre pepe nero di Kampot e la stazione climatica d'alta quota di Bokor Hill Station con il Grand Palace Hotel."),
    ("KH8", "KH", "Cambodia", "Kandal", "Kandal (កណ្តាល)", "Protectorat du Cambodge — Province de Kandal", "Kandal / Chaktomuk", "Ta Khmau", "Cambodge", "Provincia circondante la capitale Phnom Penh all'incrocio fluviale dei Quattro Fiumi (Chaktomuk)."),
    ("KH9", "KH", "Cambodia", "Koh Kong", "Koh Kong (កោះកុង)", "Protectorat du Cambodge — Province de Koh Kong", "Koh Kong", "Khemarak Phoumin", "Cambodge", "Costa litoranea montuosa e insulare del Golfo del Siam ricca di foreste vergini nei Monti Cardamomi marittimi."),
    ("KH10", "KH", "Cambodia", "Kratie", "Kratie (ក្រចេះ)", "Protectorat du Cambodge — Province de Kratié", "Kratié", "Kratié", "Cambodge", "Scalo sul medio Mekong celebre per le rapide fluviali e le popolazioni Bunong."),
    ("KH11", "KH", "Cambodia", "Mondul Kiri", "Mondul Kiri (មណ្ឌលគិរី)", "Protectorat du Cambodge — Haut-Chhlong (Mondolkiri)", "Mondolkiri", "Sen Monorom", "Cambodge", "Vasto altopiano boscoso orientale dell'Indocina popolato dalle etnie indigene Bunong (Phnong)."),
    ("KH12", "KH", "Cambodia", "Phnom Penh", "Phnom Penh (ភ្នំពេញ)", "Protectorat du Cambodge — Capitale Royale de Phnom Penh", "Phnom Penh", "Phnom Penh", "Cambodge", "Capitale del Regno di Cambogia, residenza del Re Sisowath Monivong (poi Sihanouk) e sede della Résidence Supérieure de France."),
    ("KH13", "KH", "Cambodia", "Preah Vihear", "Preah Vihear (ព្រះវិហារ)", "Protectorat du Cambodge — Province de Preah Vihear", "Preah Vihear", "Tbeng Meanchey", "Cambodge", "Rilievi dei Monti Dângrêk dominati dal millenario tempio khmer di Prasat Preah Vihear sulla frontiera col Siam."),
    ("KH14", "KH", "Cambodia", "Prey Veng", "Prey Veng (ព្រៃវែង)", "Protectorat du Cambodge — Province de Prey Veng", "Prey Veng", "Prey Veng", "Cambodge", "Fitta pianura agricola e culla storica del regno di Ba Phnom sulla sponda sinistra del Mekong."),
    ("KH15", "KH", "Cambodia", "Pursat", "Pursat (ពោធិ៍សាត់)", "Protectorat du Cambodge — Province de Pouthisat", "Pouthisat", "Pursat", "Cambodge", "Estesa dalle rive pescose del Tonlé Sap fino ai contrafforti dei Monti Cardamomi, ricca di marmo e legname."),
    ("KH16", "KH", "Cambodia", "Ratanak Kiri", "Ratanak Kiri (រតនគិរី)", "Protectorat du Cambodge — Province de Ratanakiri", "Ratanakiri", "Banlung", "Cambodge", "Regione collinare nord-orientale ricca di giacimenti di gemme e pietre preziose, foreste di teak e minoranze Jarai."),
    ("KH17", "KH", "Cambodia", "Siemreap", "Siem Reap (សៀមរាប)", "Protectorat du Cambodge — Province d'Angkor / Siem Reap", "Siem Reap / Angkor", "Siem Reap", "Cambodge", "Custode dei monumenti immortali di Angkor Wat e Angkor Thom, studiati e restaurati dall'École française d'Extrême-Orient (EFEO); contesa nel 1941 col Siam."),
    ("KH18", "KH", "Cambodia", "Preah Sihanouk", "Preah Sihanouk / Kompong Som (ព្រះសីហនុ)", "Protectorat du Cambodge — Baie de Kompong Som", "Kompong Som", "Sihanoukville", "Cambodge", "Baia costiera profonda sul Golfo del Siam, approdo strategico marittimo per le rotte del sud."),
    ("KH19", "KH", "Cambodia", "Stung Treng", "Stung Treng (ស្ទឹងត្រែង)", "Protectorat du Cambodge — Province de Stung Treng", "Stung Treng", "Stung Treng", "Cambodge", "Confluenza navigabile tra il Mekong, il fiume Sékong e il Sesan, porta d'ingresso fluviale per il Laos."),
    ("KH20", "KH", "Cambodia", "Svay Rieng", "Svay Rieng (ស្វាយរៀង)", "Protectorat du Cambodge — Circonscription du Bec de Canard", "Svay Rieng", "Svay Rieng", "Cambodge", "Regione strategica del 'Becco d'Anatra' (Bec de Canard) incuneata verso la Cocincina e la rotta per Saigon."),
    ("KH21", "KH", "Cambodia", "Takeo", "Takeo (តាកែវ)", "Protectorat du Cambodge — Province de Takéo", "Takéo", "Doun Kaev", "Cambodge", "Culla archeologica della civiltà del Funan e siti pre-angkoriani di Angkor Borei e Phnom Da."),
    ("KH22", "KH", "Cambodia", "Oddar Meanchey", "Oddar Meanchey (ឧត្តរមានជ័យ)", "Protectorat du Cambodge — Ot-dar Mean Chey", "Oddar Meanchey", "Samraong", "Cambodge", "Altopiano di frontiera sui Monti Dângrêk conteso e parzialmente ceduto alla Thailandia nel maggio 1941."),
    ("KH23", "KH", "Cambodia", "Kep", "Kep (កែប)", "Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer", "Kep-sur-Mer", "Kep", "Cambodge", "Rinomata stazione balneare fondata nel 1908 dall'élite coloniale francese, affacciata sulle acque calme del Golfo del Siam."),
    ("KH24", "KH", "Cambodia", "Pailin", "Pailin (ប៉ៃលិន)", "Protectorat du Cambodge — District Minier de Pailin", "Pailin", "Pailin", "Cambodge", "Celebre distretto minerario incastonato nei Monti Cardamomi per l'estrazione di zaffiri e rubini di altissima caratura."),
    ("KH25", "KH", "Cambodia", "Tboung Khmum", "Tboung Khmum (ត្បូងឃ្មុំ)", "Protectorat du Cambodge — District de Memot & Chhlong", "Memot", "Suong", "Cambodge", "Area di terra rossa vulcanica sede delle sterminate piantagioni di caucciù della Compagnie du Cambodge a Memot."),

    # =========================================================================
    # LAOS (18 PROVINCE)
    # =========================================================================
    ("LAVT", "LA", "Laos", "Vientiane Capital", "Vientiane Capital (ນະຄອນຫຼວງວຽງຈັນ)", "Protectorat du Laos — Ville de Vientiane", "Vientiane", "Vientiane", "Laos", "Sede della Résidence Supérieure de France au Laos e cuore amministrativo e diplomatico del protettorato."),
    ("LAVI", "LA", "Laos", "Vientiane", "Vientiane Province (ແຂວງວຽງຈັນ)", "Protectorat du Laos — Province de Vientiane", "Vientiane Rurale", "Muang Phôn-Hông", "Laos", "Vasta pianura risicola lungo il medio corso del Mekong con fitte foreste collinari."),
    ("LALP", "LA", "Laos", "Louangphabang", "Luang Prabang (ແຂວງຫຼວງພະບາງ)", "Protectorat du Laos — Royaume de Luang Prabang", "Luang Prabang", "Luang Prabang", "Laos", "Capitale Reale storica del Regno di Luang Prabang sotto il venerato Re Sisavang Vong (1904-1959), custode del sacro Buddha Phra Bang."),
    ("LAAT", "LA", "Laos", "Attapeu", "Attapeu (ແຂວງອັດຕະປື)", "Protectorat du Laos — Province d'Attopu", "Attopu", "Attapeu", "Laos", "Remota provincia meridionale alle pendici orientali dell'Altopiano dei Bolovens e confine con Annam e Cambogia."),
    ("LABK", "LA", "Laos", "Bokeo", "Bokeo (ແຂວງບໍ່ແກ້ວ)", "Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai)", "Houei Sai", "Houayxay", "Laos", "Porta d'accesso al 'Triangolo d'Oro' lungo il Mekong, snodo carovaniero tra Laos, Birmania e Siam per gemme e legname."),
    ("LABL", "LA", "Laos", "Bolikhamxai", "Bolikhamxai (ແຂວງບໍລິຄຳໄຊ)", "Protectorat du Laos — Circonscription de Borikhane", "Paksane", "Paksane", "Laos", "Snodo idroviario alla foce del fiume Nam Kading nel Mekong lungo la Route Coloniale 13."),
    ("LACH", "LA", "Laos", "Champasack", "Champasak (ແຂວງຈຳປາສັກ)", "Protectorat du Laos — Royaume de Champassak / Bassac", "Bassac / Pakse", "Pakse", "Laos", "Antico Regno di Champasak sulle Cascate di Khone; territorio della riva destra del Mekong ceduto alla Thailandia nel Trattato di Tokyo (1941)."),
    ("LAHO", "LA", "Laos", "Houaphan", "Houaphanh (ແຂວງຫົວພັນ)", "Protectorat du Laos — Province de Sam Neua", "Sam Neua", "Xam Neua", "Laos", "Montagne impervie di confine con il Tonchino settentrionale abitate da popolazioni Tai Dam e Hmong."),
    ("LAKH", "LA", "Laos", "Khammouan", "Khammouane (ແຂວງຄຳມ່ວນ)", "Protectorat du Laos — Province de Thakhek", "Thakhek", "Thakhek", "Laos", "Scalo commerciale sul Mekong e sede del bacino minerario di stagno di Phontiou, fondamentale risorsa strategica coloniale."),
    ("LALM", "LA", "Laos", "Louangnamtha", "Luang Namtha (ແຂວງຫຼວງນ້ຳທາ)", "Protectorat du Laos — Haut-Mékong Septentrional", "Luang Namtha", "Luang Namtha", "Laos", "Avamposto montuoso di frontiera con lo Yunnan cinese e la Birmania Britannica, snodo commerciale per il té e la seta."),
    ("LAOU", "LA", "Laos", "Oudomxai", "Oudomxay (ແຂວງອຸດົມໄຊ)", "Protectorat du Laos — Circonscription de Muang Xay", "Muang Xay", "Muang Xay", "Laos", "Incrocio geografico dei sentieri carovanieri del Laos settentrionale tra Luang Prabang e la Cina."),
    ("LAPH", "LA", "Laos", "Phongsaly", "Phongsaly (ແຂວງຜົ້ງສາລີ)", "Protectorat du Laos — 5e Territoire Militaire", "Phongsali", "Phongsali", "Laos", "Presidio militare speciale incuneato tra il Tonchino e la Cina, a guardia dei valichi montani del nord."),
    ("LASL", "LA", "Laos", "Salavan", "Salavan (ແຂວງສາລະວັນ)", "Protectorat du Laos — Province de Saravane", "Saravane", "Salavan", "Laos", "Cuore dell'Altopiano dei Bolovens celebre per il suolo vulcanico fertile e le piantagioni coloniali di caffè arabica."),
    ("LASV", "LA", "Laos", "Savannakhet", "Savannakhet (ແຂວງສະຫວັນນະເຂດ)", "Protectorat du Laos — Province de Savannakhet", "Savannakhet", "Kaysone Phomvihane", "Laos", "Principale emporio fluviale del medio Mekong e punto di partenza della vitale Route Coloniale 9 verso Tourane e il Mar Cinese."),
    ("LAXE", "LA", "Laos", "Sekong", "Sekong (ແຂວງເຊກອງ)", "Protectorat du Laos — Haut-Sékong", "Sekong", "Lamam", "Laos", "Bacino fluviale selvaggio e incontaminato abitato da comunità etnolinguistiche Mon-Khmer."),
    ("LAXA", "LA", "Laos", "Xaignabouly", "Xaignabouli / Sayaboury (ແຂວງໄຊຍະບູລີ)", "Protectorat du Laos — Province de Sayaboury", "Sayaboury", "Sainyabuli", "Laos", "Provincia a ovest del Mekong; occupata e annessa dalla Thailandia nel Trattato di Tokyo (maggio 1941) col nome di Lan Chang."),
    ("LAXS", "LA", "Laos", "Xaisomboon", "Xaisomboun (ແຂວງໄຊສົມບູນ)", "Protectorat du Laos — Zone Spéciale du Phou Bia", "Phou Bia", "Anouvong", "Laos", "Imponente massiccio montuoso del Phou Bia, la vetta più alta del Laos, popolato da fiere tribù montane."),
    ("LAXI", "LA", "Laos", "Xiengkhouang", "Xieng Khouang (ແຂວງຊຽງຂວາງ)", "Protectorat du Laos — Province de Tran Ninh", "Xieng Khouang", "Phonsavan", "Laos", "Sede della celebre Piana delle Giare (Tran Ninh), altopiano strategico fortificato presidiato dalle truppe coloniali."),

    # =========================================================================
    # VIETNAM - TONKIN (25 PROVINCE)
    # =========================================================================
    ("VNHN", "VN", "Vietnam", "Ha Noi", "Hà Nội (Thủ đô Hà Nội)", "Protectorat du Tonkin — Capitale de l'Indochine (Hanoï)", "Hanoï", "Hà Nội", "Tonkin", "Capitale del Gouvernement Général de l'Indochine e sede della Résidence Supérieure du Tonkin; teatro dell'Accordo di Hanoi del 22 settembre 1940."),
    ("VNHP", "VN", "Vietnam", "Hải Phòng", "Hải Phòng (Thành phố Hải Phòng)", "Protectorat du Tonkin — Port de Haïphong", "Haïphong", "Hải Phòng", "Tonkin", "Primo scalo marittimo commerciale dell'Indocina e capolinea della ferrovia dello Yunnan; teatro di sbarco e bombardamento aeronavale giapponese nel settembre 1940."),
    ("VN01", "VN", "Vietnam", "Lai Chau", "Lai Châu (Tỉnh Lai Châu)", "Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau)", "Lai-Chau", "Lai Châu", "Tonkin", "Presidio militare del Pays Taï Noir sulle gole del Fiume Nero (Song Da) lungo la frontiera cinese."),
    ("VN02", "VN", "Vietnam", "Lào Cai", "Lào Cai (Tỉnh Lào Cai)", "Protectorat du Tonkin — Poste Frontière de Lao-Kay", "Lao-Kay", "Lào Cai", "Tonkin", "Postazione di frontiera e ponte ferroviario strategico sul Fiume Rosso verso Kunming, sorvegliata da dogane e presidi."),
    ("VN03", "VN", "Vietnam", "Hà Giang", "Hà Giang (Tỉnh Hà Giang)", "Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang)", "Ha-Giang", "Hà Giang", "Tonkin", "Altopiani carsici e passi montani di frontiera settentrionale verso il Guizhou e lo Yunnan."),
    ("VN04", "VN", "Vietnam", "Cao Bằng", "Cao Bằng (Tỉnh Cao Bằng)", "Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang)", "Cao-Bang", "Cao Bằng", "Tonkin", "Piazzaforte militare lungo la Route Coloniale 4 a presidio delle gole di frontiera con la Cina."),
    ("VN05", "VN", "Vietnam", "Son La", "Sơn La (Tỉnh Sơn La)", "Protectorat du Tonkin — Territoire Militaire de Son-La", "Son-La", "Sơn La", "Tonkin", "Cittadella fortificata francese e prigione coloniale nel cuore del territorio collinare Tai."),
    ("VN06", "VN", "Vietnam", "Yên Bái", "Yên Bái (Tỉnh Yên Bái)", "Protectorat du Tonkin — Province de Yen-Bay", "Yen-Bay", "Yên Bái", "Tonkin", "Presidio militare sul Fiume Rosso, celebre nella storia vietnamita per l'ammutinamento patriottico del VNQDĐ del 1930."),
    ("VN07", "VN", "Vietnam", "Tuyên Quang", "Tuyên Quang (Tỉnh Tuyên Quang)", "Protectorat du Tonkin — Province de Tuyen-Quan", "Tuyen-Quan", "Tuyên Quang", "Tonkin", "Rinomato posto fortificato della Legione Straniera francese e snodo di collegamento fluviale sul Fiume Chiaro (Song Lo)."),
    ("VN09", "VN", "Vietnam", "Lạng Sơn", "Lạng Sơn (Tỉnh Lạng Sơn)", "Protectorat du Tonkin — Province de Lang-Son (Porte de Chine)", "Lang-Son", "Lạng Sơn", "Tonkin", "Porta storica della Cina (Dong Dang); teatro della cruenta battaglia del 22-25 settembre 1940 contro la 5ª Divisione Giapponese."),
    ("VN13", "VN", "Vietnam", "Quảng Ninh", "Quảng Ninh (Hòn Gai / Baie d'Along)", "Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along", "Hòn Gai", "Hạ Long", "Tonkin", "Il più ricco bacino carbonifero d'antracite dell'Asia orientale (Société Française des Charbonnages du Tonkin) affacciato sulla Baia di Along."),
    ("VN14", "VN", "Vietnam", "Hòa Bình", "Hòa Bình (Tỉnh Hòa Bình)", "Protectorat du Tonkin — Province de Hoa-Binh", "Hoa-Binh", "Hòa Bình", "Tonkin", "Regione pedemontana culla dell'etnia Muong e delle prime ricerche preistoriche della cultura Hoabinhiana."),
    ("VN18", "VN", "Vietnam", "Ninh Bình", "Ninh Bình (Tỉnh Ninh Bình)", "Protectorat du Tonkin — Province de Ninh-Binh", "Ninh-Binh", "Ninh Bình", "Tonkin", "Paesaggi carsici della 'Baia di Along terrestre' (Tam Coc) e confine naturale tra Tonkino e Annam."),
    ("VN20", "VN", "Vietnam", "Thái Bình", "Thái Bình (Tỉnh Thái Bình)", "Protectorat du Tonkin — Province de Thai-Binh", "Thai-Binh", "Thái Bình", "Tonkin", "Intensissima risicoltura alluvionale nel delta del Fiume Rosso con una delle più alte densità rurali dell'Indocina."),
    ("VN53", "VN", "Vietnam", "Đông Bắc", "Bắc Kạn / Đông Bắc (Tỉnh Bắc Kạn)", "Protectorat du Tonkin — Province de Bac-Kan", "Bac-Kan", "Bắc Kạn", "Tonkin", "Regione montuosa e fitte foreste tropicali ricche di legname e giacimenti di piombo e zinco."),
    ("VN54", "VN", "Vietnam", "Bắc Giang", "Bắc Giang (Tỉnh Bắc Giang)", "Protectorat du Tonkin — Circonscription de Phu Lang Thuong", "Phủ Lạng Thương", "Bắc Giang", "Tonkin", "Importante base aerea coloniale (Phủ Lạng Thương) concessa in uso all'aviazione giapponese con l'Accordo di Hanoi del 1940."),
    ("VN56", "VN", "Vietnam", "Bắc Ninh", "Bắc Ninh (Tỉnh Bắc Ninh)", "Protectorat du Tonkin — Province de Bac-Ninh", "Bac-Ninh", "Bắc Ninh", "Tonkin", "Antico centro culturale della civiltà del Fiume Rosso, famoso per le manifatture tessili e la seteria."),
    ("VN61", "VN", "Vietnam", "Hải Dương", "Hải Dương (Tỉnh Hải Dương)", "Protectorat du Tonkin — Province de Hai-Duong", "Hai-Duong", "Hải Dương", "Tonkin", "Snodo ferroviario e idroviario lungo l'asse principale Hanoi-Haiphong, cuore del commercio agricolo tonchinese."),
    ("VN63", "VN", "Vietnam", "Hà Nam", "Hà Nam (Tỉnh Hà Nam)", "Protectorat du Tonkin — Circonscription de Phu-Ly", "Phủ Lý", "Phủ Lý", "Tonkin", "Centro di smistamento agricolo e tessile nella pianura meridionale del delta."),
    ("VN66", "VN", "Vietnam", "Đồng Bằng Sông Hồng", "Hưng Yên (Đồng Bằng Sông Hồng)", "Protectorat du Tonkin — Province de Hung-Yen", "Hung-Yen", "Hưng Yên", "Tonkin", "Cuore fertile del delta del Fiume Rosso, sede dell'antico scalo portuale di Phố Hiến."),
    ("VN67", "VN", "Vietnam", "Nam Định", "Nam Định (Tỉnh Nam Định)", "Protectorat du Tonkin — Métropole Textile de Nam-Dinh", "Nam-Dinh", "Nam Định", "Tonkin", "Grande capitale industriale e manifatturiera dell'Indocina, sede della celebre Société Cotonnière du Tonkin."),
    ("VN68", "VN", "Vietnam", "Phú Thọ", "Phú Thọ (Tỉnh Phú Thọ)", "Protectorat du Tonkin — Province de Phu-Tho", "Phu-Tho", "Việt Trì", "Tonkin", "Confluenza navigabile dei tre fiumi (Rosso, Nero e Chiaro) e colline coltivate a té."),
    ("VN69", "VN", "Vietnam", "Thái Nguyên", "Thái Nguyên (Tỉnh Thái Nguyên)", "Protectorat du Tonkin — Province de Thai-Nguyen", "Thai-Nguyen", "Thái Nguyên", "Tonkin", "Polo metallurgico e minerario del Tonkino settentrionale con estese miniere di ferro."),
    ("VN70", "VN", "Vietnam", "Vĩnh Phúc", "Vĩnh Phúc (Vĩnh Yên & Phúc Yên)", "Protectorat du Tonkin — Province de Vinh-Yen", "Vinh-Yen", "Vĩnh Yên", "Tonkin", "Distretto agricolo suburbano alle porte occidentali di Hanoi, noto per la stazione climatica collinare di Tam Đảo."),
    ("VN71", "VN", "Vietnam", "Điện Biên", "Điện Biên (Mường Thanh / Điện Biên Phủ)", "Protectorat du Tonkin — Vallée de Dien-Bien-Phu", "Dien-Bien-Phu", "Điện Biên Phủ", "Tonkin", "Valle strategica di Mường Thanh, presidio avanzato sul confine con il Laos e capitale dell'aristocrazia Tai."),

    # =========================================================================
    # VIETNAM - ANNAM (19 PROVINCE)
    # =========================================================================
    ("VN26", "VN", "Vietnam", "Thừa Thiên - Huế", "Thừa Thiên Huế (Cố đô Huế)", "Protectorat de l'Annam — Capitale Impériale de Hué", "Hué", "Huế", "Annam", "Capitale dell'Impero d'Annam sotto la sovranità della Dinastia Nguyễn (Imperatore Bảo Đại) e residenza del Résident Supérieur."),
    ("VNDN", "VN", "Vietnam", "Đà Nẵng", "Đà Nẵng / Tourane (Thành phố Đà Nẵng)", "Protectorat de l'Annam — Concession Navale de Tourane", "Tourane", "Đà Nẵng", "Annam", "Porto marittimo d'altura e concessione francese in Annam, base logistica della Route Coloniale 9."),
    ("VN21", "VN", "Vietnam", "Thanh Hóa", "Thanh Hóa (Tỉnh Thanh Hóa)", "Protectorat de l'Annam — Province de Thanh-Hoa", "Thanh-Hoa", "Thanh Hóa", "Annam", "Porta settentrionale dell'Annam, estesa pianura risicola e terra d'origine di illustri dinastie imperiali."),
    ("VN22", "VN", "Vietnam", "Nghệ An", "Nghệ An (Vinh-Bến Thủy)", "Protectorat de l'Annam — Circonscription de Vinh", "Vinh", "Vinh", "Annam", "Grande centro portuale fluviale di Vinh e polo operaio, celebre per le rivolte contadine dei 'Soviet di Nghệ-Tĩnh' del 1930-31."),
    ("VN23", "VN", "Vietnam", "Ha Tinh", "Hà Tĩnh (Tỉnh Hà Tĩnh)", "Protectorat de l'Annam — Province de Ha-Tinh", "Ha-Tinh", "Hà Tĩnh", "Annam", "Fascia litoranea costiera e collinare ai piedi della Catena Annamita, dedita alla pesca e all'agricoltura."),
    ("VN24", "VN", "Vietnam", "Quảng Bình", "Quảng Bình (Tỉnh Quảng Bình)", "Protectorat de l'Annam — Province de Dong-Hoi", "Dong-Hoi", "Đồng Hới", "Annam", "Storica fortificazione di Đồng Hới a presidio del passo di Đèo Ngang (Porte d'Annam) e grotte carsiche."),
    ("VN25", "VN", "Vietnam", "Quảng Trị", "Quảng Trị (Tỉnh Quảng Trị)", "Protectorat de l'Annam — Province de Quang-Tri", "Quang-Tri", "Quảng Trị", "Annam", "Antica provincia di frontiera attorno al fiume Thạch Hãn e punto di congiunzione sulla costa centrale."),
    ("VN27", "VN", "Vietnam", "Quàng Nam", "Quảng Nam (Faifo / Hội An)", "Protectorat de l'Annam — Province de Faifo", "Faifo", "Tam Kỳ", "Annam", "Celeberrimo emporio commerciale marittimo di Faifo (Hội An) e santuario cham di Mỹ Sơn."),
    ("VN29", "VN", "Vietnam", "Quảng Ngãi", "Quảng Ngãi (Tỉnh Quảng Ngãi)", "Protectorat de l'Annam — Province de Quang-Ngai", "Quang-Ngai", "Quảng Ngãi", "Annam", "Territorio costiero di antica tradizione patriottica con ricche coltivazioni di canna da zucchero."),
    ("VN31", "VN", "Vietnam", "Bình Định", "Bình Định (Quy Nhơn)", "Protectorat de l'Annam — Port de Qui-Nhon", "Qui-Nhon", "Quy Nhơn", "Annam", "Grande porto dell'Annam centrale e capolinea della ferrovia e delle strade dirette agli Altipiani Centrali."),
    ("VN32", "VN", "Vietnam", "Phú Yên", "Phú Yên (Tuy Hòa)", "Protectorat de l'Annam — Province de Tuy-Hoa", "Tuy-Hoa", "Tuy Hòa", "Annam", "Vasta pianura risicola alla foce del fiume Ba e promontorio oceanico strategico di Cap Varella."),
    ("VN34", "VN", "Vietnam", "Khánh Hòa", "Khánh Hòa (Nha Trang / Cam Ranh)", "Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang", "Nha-Trang", "Nha Trang", "Annam", "Sede dell'Institut Pasteur (Alexandre Yersin) a Nha Trang e della Baia di Cam Ranh, considerata tra i migliori ancoraggi navali del mondo."),
    ("VN36", "VN", "Vietnam", "Ninh Thuận", "Ninh Thuận (Phan Rang)", "Protectorat de l'Annam — Province de Phan-Rang", "Phan-Rang", "Phan Rang", "Annam", "Regione arida della civiltà Champa ricca di torri sacre e snodo della ferrovia a cremagliera per Dalat."),
    ("VN40", "VN", "Vietnam", "Bình Thuận", "Bình Thuận (Phan Thiết)", "Protectorat de l'Annam — Province de Phan-Thiet", "Phan-Thiet", "Phan Thiết", "Annam", "Famosa per la produzione intensiva di salsa di pesce (nước mắm) e le piantagioni litoranee."),
    ("VN28", "VN", "Vietnam", "Kon Tum", "Kon Tum (Tỉnh Kon Tum)", "Protectorat de l'Annam — Haut-Plateau de Kontum", "Kontum", "Kon Tum", "Annam", "Altopiani settentrionali dominati da missioni cattoliche francesi e dalle etnie montanare Bahnar e Sedang."),
    ("VN30", "VN", "Vietnam", "Gia Lai", "Gia Lai (Pleiku)", "Protectorat de l'Annam — Garnison de Pleiku", "Pleiku", "Pleiku", "Annam", "Altopiano centrale strategicamente fortificato per il controllo delle vie d'accesso al Laos e piantagioni di té."),
    ("VN33", "VN", "Vietnam", "Đắk Lắk", "Đắk Lắk (Ban Mê Thuột)", "Protectorat de l'Annam — Province du Darlac", "Ban Mé Thuot", "Buôn Ma Thuột", "Annam", "Centro delle concessioni di caucciù e riserve forestali per le grandi battute di caccia all'elefante."),
    ("VN35", "VN", "Vietnam", "Lâm Đồng", "Lâm Đồng (Đà Lạt / Lang Biang)", "Protectorat de l'Annam — Station Climatique de Dalat", "Dalat", "Đà Lạt", "Annam", "Capitale estiva dell'Indocina voluta dal Governatore Paul Doumer, rinomata per il clima alpino e il palazzo estivo di Bảo Đại."),
    ("VN72", "VN", "Vietnam", "Đắk Nông", "Đắk Nông (Cao nguyên M'Nông)", "Protectorat de l'Annam — Plateau des Mnong", "Gia Nghĩa", "Gia Nghĩa", "Annam", "Altopiani boscosi dell'estremità meridionale dell'Annam abitati dal fiero popolo M'Nông."),

    # =========================================================================
    # VIETNAM - COCHINCHINE (19 PROVINCE)
    # =========================================================================
    ("VNSG", "VN", "Vietnam", "Hồ Chí Minh city", "Thành phố Hồ Chí Minh (Sài Gòn - Chợ Lớn)", "Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient')", "Saïgon", "Hồ Chí Minh", "Cochinchine", "Capitale della Colonia della Cocincina, 'Perla dell'Estremo Oriente', sede del Governatore, della Banque de l'Indochine e del porto fluviale oceanico."),
    ("VNCT", "VN", "Vietnam", "Can Tho", "Cần Thơ (Thành phố Cần Thơ)", "Colonie de la Cochinchine — Métropole du Bassac (Can-Tho)", "Can-Tho", "Cần Thơ", "Cochinchine", "Capitale economica del Delta occidentale del Mekong sul fiume Bassac e grande mercato di riso."),
    ("VN37", "VN", "Vietnam", "Tây Ninh", "Tây Ninh (Tỉnh Tây Ninh)", "Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh)", "Tay-Ninh", "Tây Ninh", "Cochinchine", "Sede della Santa Sede della religione Cao Đài con il celebre Tempio Divino e frontiera con la Cambogia."),
    ("VN39", "VN", "Vietnam", "Đông Nam Bộ", "Đồng Nai / Biên Hòa (Đông Nam Bộ)", "Colonie de la Cochinchine — Province de Bien-Hoa", "Bien-Hoa", "Biên Hòa", "Cochinchine", "Grandi piantagioni di gomma della Michelin lungo il fiume Dong Nai e cave di granito."),
    ("VN41", "VN", "Vietnam", "Long An", "Long An (Tân An)", "Colonie de la Cochinchine — Province de Tan-An", "Tan-An", "Tân An", "Cochinchine", "Cerniera fluviale e canale di transito privilegiato tra Saigon e il Delta del Mekong."),
    ("VN43", "VN", "Vietnam", "Bà Rịa - Vũng Tàu", "Bà Rịa - Vũng Tàu (Cap Saint-Jacques)", "Colonie de la Cochinchine — Cap Saint-Jacques & Baria", "Cap Saint-Jacques", "Vũng Tàu", "Cochinchine", "Capo fortificato all'imbocco marittimo del fiume Saigon, stazione di vedetta navale e rinomata stazione balneare."),
    ("VN44", "VN", "Vietnam", "An Giang", "An Giang (Châu Đốc & Long Xuyên)", "Colonie de la Cochinchine — Province de Chau-Doc", "Chau-Doc", "Long Xuyên", "Cochinchine", "Regione fluviale di confine sulla biforcazione Mekong-Bassac con forte presenza di comunità Khmer Krom e Cham."),
    ("VN45", "VN", "Vietnam", "Ðong Tháp", "Đồng Tháp (Sa Đéc)", "Colonie de la Cochinchine — Circonscription de Sadec", "Sadec", "Cao Lãnh", "Cochinchine", "Fascia fluviale affacciata sulla vasta 'Plaine des Joncs' (Pianura dei Giunchi), ricca di frutteti e commercio risicolo."),
    ("VN46", "VN", "Vietnam", "Tiền Giang", "Tiền Giang (Mỹ Tho)", "Colonie de la Cochinchine — Province de Mytho", "Mytho", "Mỹ Tho", "Cochinchine", "Storico avamposto fluviale francese e capolinea della prima ferrovia d'Indocina inaugurata nel 1885 (Saigon-Mytho)."),
    ("VN47", "VN", "Vietnam", "Kiên Giang", "Kiên Giang (Rạch Giá & Hà Tiên)", "Colonie de la Cochinchine — Province de Hatien & Rach-Gia", "Rach-Gia", "Rạch Giá", "Cochinchine", "Vasto litorale sul Golfo del Siam comprendente l'antico principato di Hà Tiên e l'isola di Phú Quốc."),
    ("VN49", "VN", "Vietnam", "Vĩnh Long", "Vĩnh Long (Tỉnh Vĩnh Long)", "Colonie de la Cochinchine — Province de Vinh-Long", "Vinh-Long", "Vĩnh Long", "Cochinchine", "Cuore fertile incastonato tra i due bracci principali del Mekong, celebre per la navigazione fluviale."),
    ("VN50", "VN", "Vietnam", "Bến Tre", "Bến Tre (Tỉnh Bến Tre)", "Colonie de la Cochinchine — Province de Ben-Tre", "Ben-Tre", "Bến Tre", "Cochinchine", "Provincia insulare del delta solcata da fitti canali e dominata da sterminate piantagioni di palme da cocco."),
    ("VN51", "VN", "Vietnam", "Trà Vinh", "Trà Vinh (Tỉnh Trà Vinh)", "Colonie de la Cochinchine — Province de Tra-Vinh", "Tra-Vinh", "Trà Vinh", "Cochinchine", "Caratterizzata da antiche pagode khmer theravada e coltivazioni costiere di riso."),
    ("VN52", "VN", "Vietnam", "Sóc Trăng", "Sóc Trăng (Tỉnh Sóc Trăng)", "Colonie de la Cochinchine — Province de Soc-Trang", "Soc-Trang", "Sóc Trăng", "Cochinchine", "Grande centro commerciale risicolo con una vivace e influente comunità mercantile cinese."),
    ("VN55", "VN", "Vietnam", "Bạc Liêu", "Bạc Liêu (Tỉnh Bạc Liêu)", "Colonie de la Cochinchine — Province de Bac-Lieu", "Bac-Lieu", "Bạc Liêu", "Cochinchine", "Terra dei ricchi proprietari terrieri coloniali ('Công tử Bạc Liêu') e immense saline marine."),
    ("VN57", "VN", "Vietnam", "Bình Dương", "Bình Dương (Thủ Dầu Một)", "Colonie de la Cochinchine — Province de Thu-Dau-Mot", "Thu-Dau-Mot", "Thủ Dầu Một", "Cochinchine", "Rinomata per le piantagioni di hevea e la produzione di ceramiche e lacche tradizionali."),
    ("VN58", "VN", "Vietnam", "Bình Phước", "Bình Phước (Hớn Quản / Lộc Ninh)", "Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh)", "Loc-Ninh", "Đồng Xoài", "Cochinchine", "Cuore delle leggendarie 'Terres Rouges' della Michelin, dominate dalle più vaste piantagioni industriali di caucciù del mondo."),
    ("VN59", "VN", "Vietnam", "Cà Mau", "Cà Mau (Mũi Cà Mau)", "Colonie de la Cochinchine — Pointe de Camau", "Camau", "Cà Mau", "Cochinchine", "Estremo lembo meridionale della penisola indocinese dominato da fittissime foreste di mangrovie e paludi costiere."),
    ("VN73", "VN", "Vietnam", "Hau Giang", "Hậu Giang (Vị Thanh)", "Colonie de la Cochinchine — Bassin du Bas-Bassac", "Vi-Thanh", "Vị Thanh", "Cochinchine", "Pianura alluvionale del basso corso del fiume Bassac con estesi canali di bonifica agricola."),
]

print(f"Configurate {len(PROVINCES_CONFIG)} province (attese 106).")
assert len(PROVINCES_CONFIG) == 106


def to_js_str(s):
    return json.dumps(str(s).strip(), ensure_ascii=False)

def generate_ts():
    lines = []
    lines.append("""/**
 * Dettaglio Geocartografico Storico delle 106 Province dell'Indocina Francese (1936-1941)
 * Union Indochinoise (Gouvernement Général de l'Indochine)
 *
 * Copertura integrale di tutte le 106 province e territori:
 * - Cambogia: 25 province (Protectorat du Cambodge — Re Sisowath Monivong fino ad apr 1941, poi Norodom Sihanouk)
 * - Laos: 18 province (Protectorat du Laos — Regno di Luang Prabang con Re Sisavang Vong & Résidence Supérieure a Vientiane)
 * - Vietnam: 63 province suddivise nelle 3 regioni storiche:
 *   - Tonchino (Bắc Kỳ): 25 province (Capitale Hanoi, Haiphong, territori militari di frontiera sino-tonchinese)
 *   - Annam (Trung Kỳ): 19 province (Capitale Imperiale Huế con l'Imperatore Bảo Đại, Tourane, Baia di Cam Ranh, Altipiani)
 *   - Cocincina (Nam Kỳ): 19 province (Capitale Saigon-Cholon, Delta del Mekong, Grandi Concessioni Michelin)
 *
 * Evoluzione Geopolitica (Step 0 - 8):
 * - Step 0-1 (1936-mar 1938): Fronte Popolare (Léon Blum) e Governatore Jules Brévié; riforme e sviluppo delle infrastrutture.
 * - Step 2-4 (ott 1938-apr 1939): Presa giapponese di Canton e Hainan; la ferrovia Haiphong-Kunming diventa vitale per la Cina.
 * - Step 5 (set 1939-mag 1940): Scoppio della guerra in Europa, mobilitazione dei Tirailleurs Indochinois e governo Catroux.
 * - Step 6 (giu-ago 1940): Armistizio francese, allineamento al Regime di Vichy e nomina del Governatore Jean Decoux.
 * - Step 7 (sett 1940-feb 1941): Accordo di Hanoi (22 sett 1940), invasione/battaglia di Lạng Sơn, bombardamento di Haiphong e stazionamento giapponese; scoppio della Guerra Franco-Thailandese.
 * - Step 8 (apr-mag 1941): Battaglia navale di Koh Chang; Trattato di Tokyo (9 mag 1941) con cessione forzata a Phibunsongkhram di Battambang, Siem Reap, Sayaboury e Champasak; incoronazione di Norodom Sihanouk.
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';

export interface FrenchIndochinaProvinceInfo {
  id: string;
  cntrCode: 'KH' | 'LA' | 'VN';
  cntrName: string;
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  historicalToponym: string;
  adminTitle: string;
  sovereign: string;
  overlord?: string;
  capital: string;
  subRegion: 'Cambodge' | 'Laos' | 'Tonkin' | 'Annam' | 'Cochinchine';
  regionKind: 'INDOCHINA_PROVINCE';
  faction: FactionType;
  s0_1: string;
  s2_4: string;
  s5_6: string;
  s7: string;
  s8: string;
  getNote: (s: number) => string;
  getFaction?: (s: number) => FactionType;
  getHistoricalName?: (s: number) => string;
  getAdminTitle?: (s: number) => string;
  getSovereign?: (s: number) => string;
}

export const FRENCH_INDOCHINA_PROVINCES_META: Record<string, FrenchIndochinaProvinceInfo> = {
""")

    for pid, c, cname, raw_name, mod_name, hist_name, hist_toponym, cap, subreg, specifics in PROVINCES_CONFIG:
        is_kh_ceded = pid in ['KH2', 'KH17', 'KH22']
        is_la_ceded = pid in ['LAXA', 'LACH']

        if subreg == 'Cambodge':
            s0_1 = f"Protettorato del Cambogia nell'Union Indochinoise (Capitale {cap}). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. {specifics} Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap."
            s2_4 = f"Protettorato del Cambogia (Capitale {cap}). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. {specifics} Il Résidente Superiore intensifica la sorveglianza militare."
            s5_6 = f"Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux."
            if is_kh_ceded:
                s7 = f"Protettorato del Cambogia (Amministrazione di Vichy). Post-Accordo di Hanoi del settembre 1940, mentre l'Esercito Giapponese staziona nel Tonchino, il regime thailandese di Plaek Phibunsongkhram lancia l'offensiva della Guerra Franco-Thailandese per rivendicare le province occidentali cambogiane. {specifics}"
                s8 = f"Territorio cambogiano ceduto al Regno di Thailandia (Siam) col Trattato di Pace di Tokyo del 9 maggio 1941 imposto dall'arbitrato giapponese dopo la vittoria navale francese di Koh Chang (provincia di Phra Tabong / Siam Nakhon). Nel contempo a Phnom Penh, alla morte di Re Monivong (aprile 1941), ascende al trono Re Norodom Sihanouk."
            else:
                s7 = f"Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. {specifics}"
                s8 = f"Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. {specifics}"

        elif subreg == 'Laos':
            is_lp = pid == 'LALP'
            s0_1 = f"Protettorato del Laos nell'Union Indochinoise (Capoluogo {cap}). " + (f"Sede della Corte Reale del Regno di Luang Prabang sotto il Re Sisavang Vong (1904-1959). " if is_lp else f"Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. ") + f"{specifics} Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens."
            s2_4 = f"Protettorato del Laos (Capoluogo {cap}). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. {specifics} L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13."
            s5_6 = f"Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux."
            if is_la_ceded:
                s7 = f"Protettorato del Laos (Amministrazione di Vichy). Post-Accordo di Hanoi del settembre 1940, la Thailandia di Phibunsongkhram scatena la Guerra Franco-Thailandese bombardando le postazioni francesi sul Mekong e avanzando a ovest del fiume. {specifics}"
                s8 = f"Territorio laotiano a ovest del Mekong ceduto forzatamente alla Thailandia col Trattato di Pace di Tokyo del 9 maggio 1941 imposto dall'arbitrato giapponese (provincia di Lan Chang / Nakhon Champassak). Presidio strategico di confine sul corso fluviale del Mekong."
            else:
                s7 = f"Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. {specifics}"
                s8 = f"Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. {specifics}"

        elif subreg == 'Tonkin':
            is_ls = pid == 'VN09'
            is_hp = pid == 'VNHP'
            is_hn = pid == 'VNHN'
            s0_1 = f"Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo {cap}). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. {specifics} Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani."
            s2_4 = f"Protettorato del Tonchino (Capoluogo {cap}). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. {specifics} Tokyo intensifica i voli di ricognizione dopo la presa di Hainan."
            s5_6 = f"Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy)."
            if is_ls:
                s7 = f"Teatro della celebre Battaglia di Lạng Sơn (22-25 settembre 1940). Nonostante l'Accordo di Hanoi firmato da Decoux il 22 settembre, la 5ª Divisione dell'Esercito Giapponese attraversa a sorpresa il confine dal Guangxi assaltando la fortezza di Lạng Sơn; dopo aspri combattimenti contro la guarnigione coloniale e i tiratori indocinesi, la piazzaforte capitola prima del cessate il fuoco ordinato da Tokyo."
                s8 = f"Piazzaforte di frontiera strategica del Tonchino sotto stazionamento dell'Esercito Imperiale Giapponese e amministrazione di Vichy. Base operativa avanzata dell'Armata della Cina del Sud a presidio della frontiera sino-tonchinese."
            elif is_hp:
                s7 = f"Porto marittimo di Haiphong teatro dello sbarco e del bombardamento aeronavale giapponese (24-26 settembre 1940). A seguito dell'Accordo di Hanoi, le forze navali di Tokyo sbarcano truppe e mezzi pesanti per tagliare ogni rotta verso la Cina, trasformando lo scalo nella principale testa di ponte logistica giapponese nel Golfo del Tonchino."
                s8 = f"Principale scalo marittimo e base aerea dell'Indocina settentrionale sotto amministrazione di Vichy e controllo militare della Marina Imperiale Giapponese. Snodo nevralgico per i convogli di scorta nel Mar Cinese Meridionale."
            elif is_hn:
                s7 = f"Hanoi, Capitale del Gouvernement Général de l'Indochine. Il 22 settembre 1940 l'Ammiraglio Jean Decoux firma lo storico Accordo di Hanoi con la missione giapponese del Gen. Nishihara, concedendo tre basi aeree nel Tonchino (Gia Lam, Lao Cai, Phu Lang Thuong) e lo stazionamento di 25.000 soldati giapponesi. Centro di comando militare di Vichy e delle forze dell'Asse."
                s8 = f"Hanoi, centro politico dell'Union Indochinoise sotto l'amministrazione del Governatore Generale Jean Decoux (Regime di Vichy) e il comando militare dell'Esercito Imperiale Giapponese. Quartier generale della cooperazione economica e militare per l'espansione nel Sud-est Asiatico."
            else:
                s7 = f"Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. {specifics}"
                s8 = f"Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. {specifics}"

        elif subreg == 'Annam':
            is_hue = pid == 'VN26'
            is_danang = pid == 'VNDN'
            is_camranh = pid == 'VN34'
            is_dalat = pid == 'VN35'
            s0_1 = f"Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo {cap}). " + (f"Sede della Corte Imperiale della Dinastia Nguyễn con l'Imperatore Bảo Đại e il Primo Ministro Phạm Quỳnh, affiancati dalla Résidence Supérieure de France. " if is_hue else f"Sotto l'autorità della Résidence Supérieure de France en Annam. ") + f"{specifics} Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central."
            s2_4 = f"Protettorato dell'Annam (Capoluogo {cap}). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. {specifics} Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon."
            s5_6 = f"Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux."
            if is_camranh:
                s7 = f"Baia di Cam Ranh, straordinario porto oceanico naturale della provincia di Khánh Hòa. Post-Accordo di Hanoi del settembre 1940, la baia viene ispezionata dalla Marina Imperiale Giapponese che ne pianifica l'uso come base d'ancoraggio primaria per la futura avanzata verso la Malesia e Singapore."
                s8 = f"Baia di Cam Ranh, trasformata in una delle più formidabili basi d'ancoraggio e rifornimento della Flotta Imperiale Giapponese sotto accordo con l'amministrazione coloniale di Vichy. Punto di concentrazione per le future flotte d'invasione del Pacifico meridionale."
            elif is_hue:
                s7 = f"Huế, Capitale Imperiale dell'Annam. A seguito dell'Accordo di Hanoi del settembre 1940 firmato da Jean Decoux con Tokyo, l'Imperatore Bảo Đại e la corte mantengono il protocollo tradizionale sotto l'autorità di Vichy. L'ingresso giapponese nel Tonchino modifica gli equilibri politici, alimentando fermenti patriottici. {specifics}"
                s8 = f"Huế, sede della corona imperiale di Annam sotto il protettorato francese di Vichy e l'egemonia militare giapponese. Decoux promuove una politica di restaurazione tradizionale filo-francese per arginare l'influenza politica di Tokyo."
            elif is_danang:
                s7 = f"Tourane (Đà Nẵng), porto marittimo militare e concessione francese in Annam. Snodo nevralgico della Route Coloniale 9 verso il Laos e base di supporto navale. Post-Accordo di Hanoi del settembre 1940, le strutture portuali operano sotto sorveglianza militare giapponese."
                s8 = f"Tourane (Đà Nẵng), scalo oceanico dell'Annam centrale a disposizione delle operazioni navali e dei convogli di scorta della Marina Giapponese in cooperazione con le autorità francesi di Vichy."
            elif is_dalat:
                s7 = f"Đà Lạt (Lâm Đồng), stazione climatica d'alta quota e capitale estiva del Governatore Generale dell'Indocina e dell'Imperatore Bảo Đại. Durante le tensioni dell'Accordo di Hanoi del settembre 1940, l'Ammiraglio Decoux vi conduce colloqui riservati organizzando il governo coloniale al riparo dal clima tropicale."
                s8 = f"Đà Lạt, sede del comando estivo di Jean Decoux e rifugio diplomatico nell'Annam meridionale, caratterizzata dal celebre Grand Hotel e dall'architettura coloniale liberty."
            else:
                s7 = f"Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. {specifics}"
                s8 = f"Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. {specifics}"

        elif subreg == 'Cochinchine':
            is_sg = pid == 'VNSG'
            is_csj = pid == 'VN43'
            s0_1 = f"Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo {cap}). " + (f"Saigon-Cholon è la metropoli economica e finanziaria dell'Indocina, la 'Perla dell'Estremo Oriente', sede della Banque de l'Indochine e del grande porto fluviale oceanico. " if is_sg else f"Amministrata dal Governatore della Cocincina con sede a Saigon. ") + f"{specifics} Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges."
            s2_4 = f"Colonia della Cocincina (Capoluogo {cap}). Straordinaria espansione delle esportazioni di riso e lattice grezzo. {specifics} Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali."
            s5_6 = f"Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux."
            if is_sg:
                s7 = f"Saïgon-Cholon, capitale coloniale della Cocincina. Post-Accordo di Hanoi del settembre 1940, la regione è scossa dall'Insurrezione comunista del Nam Kỳ (novembre 1940), duramente repressa dalle truppe di Decoux. Nel contempo missioni militari giapponesi aprono uffici di collegamento permanente a Saigon."
                s8 = f"Saïgon-Cholon, centro nevralgico della Cocincina sotto amministrazione di Vichy e quartier generale avanzato delle forze aeronavali giapponesi del Sud. Cantieri navali, magazzini di riso di Cholon e l'aeroporto di Tan Son Nhut sono integrati nei piani d'invasione della Malesia e dell'Indonesia."
            elif is_csj:
                s7 = f"Cap Saint-Jacques (Vũng Tàu), promontorio fortificato e stazione pilota all'imbocco del fiume Saigon. Le batterie costiere e le stazioni idrovolanti controllano l'accesso navale a Saigon durante la crisi dell'Accordo di Hanoi del settembre 1940."
                s8 = f"Cap Saint-Jacques (Bà Rịa - Vũng Tàu), base aeronavale strategica condivisa tra l'amministrazione francese di Vichy e le squadriglie da ricognizione della Marina Giapponese."
            else:
                s7 = f"Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. {specifics}"
                s8 = f"Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. {specifics}"

        admin_t = f"Union Indochinoise — {hist_name}"

        lines.append(f"  {pid}: {{")
        lines.append(f"    id: {to_js_str(pid)},")
        lines.append(f"    cntrCode: {to_js_str(c)},")
        lines.append(f"    cntrName: {to_js_str(cname)},")
        lines.append(f"    name: {to_js_str(raw_name)},")
        lines.append(f"    nutsName: {to_js_str(mod_name)},")
        lines.append(f"    nameLatn: {to_js_str(raw_name)},")
        lines.append(f"    nameEngl: {to_js_str(f'{raw_name} ({cname})')},")
        lines.append(f"    modernName: {to_js_str(mod_name)},")
        lines.append(f"    historicalName: {to_js_str(hist_name)},")
        lines.append(f"    historicalToponym: {to_js_str(hist_toponym)},")
        lines.append(f"    adminTitle: {to_js_str(admin_t)},")
        lines.append('    sovereign: "F_IND",')
        lines.append('    overlord: "FRA",')
        lines.append(f"    capital: {to_js_str(cap)},")
        lines.append(f"    subRegion: {to_js_str(subreg)},")
        lines.append('    regionKind: "INDOCHINA_PROVINCE",')
        lines.append('    faction: "Alleati",')
        lines.append(f"    s0_1: {to_js_str(s0_1)},")
        lines.append(f"    s2_4: {to_js_str(s2_4)},")
        lines.append(f"    s5_6: {to_js_str(s5_6)},")
        lines.append(f"    s7: {to_js_str(s7)},")
        lines.append(f"    s8: {to_js_str(s8)},")
        lines.append(f"    getNote: (s: number) => {{")
        lines.append(f"      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META[{to_js_str(pid)}].s8;")
        lines.append(f"      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META[{to_js_str(pid)}].s7;")
        lines.append(f"      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META[{to_js_str(pid)}].s5_6;")
        lines.append(f"      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META[{to_js_str(pid)}].s2_4;")
        lines.append(f"      return FRENCH_INDOCHINA_PROVINCES_META[{to_js_str(pid)}].s0_1;")
        lines.append(f"    }},")
        lines.append(f"    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),")
        lines.append(f"    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),")
        lines.append(f"    getHistoricalName: (s: number) => {{")
        if is_kh_ceded or is_la_ceded:
            lines.append(f"      if (s >= 8) return {to_js_str(f'{hist_name} (Occupazione Siamese / Thailandia) [Trattato di Tokyo 1941]')};")
        lines.append(f"      if (s >= 7) return {to_js_str(f'{hist_name} (Stazionamento Militare Giapponese / Vichy)')};")
        lines.append(f"      if (s >= 6) return {to_js_str(f'{hist_name} (Gouvernement de Vichy)')};")
        lines.append(f"      return {to_js_str(hist_name)};")
        lines.append(f"    }},")
        lines.append(f"    getAdminTitle: (s: number) => {{")
        if is_kh_ceded or is_la_ceded:
            lines.append('      if (s >= 8) return "Regno di Thailandia (Amministrazione Phibunsongkhram / Trattato di Tokyo 1941)";')
        lines.append(f"      if (s >= 7) return {to_js_str(f'{admin_t} (Amministrazione Vichy / Stazionamento Giapponese)')};")
        lines.append(f"      if (s >= 6) return {to_js_str(f'{admin_t} (Gouvernement Général de l\'Indochine — Vichy)')};")
        lines.append(f"      return {to_js_str(admin_t)};")
        lines.append(f"    }},")
        lines.append(f"  }},")

    lines.append("""};

/**
 * Risolutore territoriale completo per le province dell'Indocina Francese
 */
export function resolveFrenchIndochinaProvince(ft: any, s: number): ResolvedTerritory {
  const p = ft.properties || {};
  const rawId = String(ft.id || p.id || '').trim();
  const rawName = String(p.NAME || p.name || p.NAME_LATN || p.NUTS_NAME || '').trim();

  // 1. Ricerca diretta per ID
  let meta = FRENCH_INDOCHINA_PROVINCES_META[rawId];

  // 2. Ricerca per fallback se non trovato
  if (!meta) {
    const cleanId = rawId.replace(/[^A-Za-z0-9]/g, '');
    meta = FRENCH_INDOCHINA_PROVINCES_META[cleanId];
  }

  // 3. Ricerca fuzzy per nome
  if (!meta) {
    const nrmRaw = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const key of Object.keys(FRENCH_INDOCHINA_PROVINCES_META)) {
      const item = FRENCH_INDOCHINA_PROVINCES_META[key];
      const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmTop = item.historicalToponym.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (nrmRaw === nrmItem || nrmRaw === nrmTop || (nrmItem.length >= 5 && nrmRaw.includes(nrmItem))) {
        meta = item;
        break;
      }
    }
  }

  // 4. Risoluzione con meta trovato
  if (meta) {
    const sov = meta.getSovereign ? meta.getSovereign(s) : (s >= 7 ? 'VIC_IND' : 'F_IND');
    const fac = meta.getFaction ? meta.getFaction(s) : (s >= 7 ? 'Fantoccio' : 'Alleati');
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // 5. Fallback generico per territori indocinesi
  const defaultHistName = p.HISTORICAL_NAME || rawName || 'Union Indochinoise';
  const defaultAdmin = "Union Indochinoise — Gouvernement Général de l'Indochine (Hanoï)";
  const defaultNote = s >= 7
    ? "Provincia dell'Indocina Francese sotto l'amministrazione coloniale di Vichy (Jean Decoux) e lo stazionamento militare giapponese a seguito dell'Accordo di Hanoi del settembre 1940."
    : "Territorio della Federazione Indocinese sotto sovranità francese (Gouvernement Général de l'Indochine, Hanoï).";
  const defaultFaction: FactionType = s >= 7 ? 'Fantoccio' : 'Alleati';
  const defaultSov = s >= 7 ? 'VIC_IND' : 'F_IND';

  return makeResult(defaultSov, defaultHistName, defaultNote, defaultFaction, defaultAdmin);
}
""")

    with open('src/data/frenchIndochinaProvinces.ts', 'w', encoding='utf-8') as out:
        out.write('\n'.join(lines))
    print(f'Generato con successo src/data/frenchIndochinaProvinces.ts con {len(PROVINCES_CONFIG)} province!')

generate_ts()
