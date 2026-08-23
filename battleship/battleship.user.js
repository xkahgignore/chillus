// ==UserScript==
// @name                         BattleShip ShipCheat
// @name:vi                      BattleShip ShipCheat
// @name:zh-CN                   战舰 ShipCheat
// @name:zh-TW                   戰艦 ShipCheat
// @name:ja                      戦艦 ShipCheat
// @name:ko                      전함 ShipCheat
// @name:fr                      BattleShip ShipCheat
// @name:de                      BattleShip ShipCheat
// @name:es                      BattleShip ShipCheat
// @name:pt-BR                   BattleShip ShipCheat
// @name:pt-PT                   BattleShip ShipCheat
// @name:ru                      Морской бой ShipCheat
// @name:ar                      سفينة حربية ShipCheat
// @name:tr                      BattleShip ShipCheat
// @name:id                      BattleShip ShipCheat
// @name:th                      เรือรบ ShipCheat
// @name:pl                      BattleShip ShipCheat
// @name:nl                      BattleShip ShipCheat
// @name:it                      BattleShip ShipCheat
// @name:sv                      BattleShip ShipCheat
// @name:da                      BattleShip ShipCheat
// @name:fi                      BattleShip ShipCheat
// @name:nb                      BattleShip ShipCheat
// @name:cs                      BattleShip ShipCheat
// @name:hu                      BattleShip ShipCheat
// @name:ro                      BattleShip ShipCheat
// @name:uk                      Морський бій ShipCheat
// @name:hi                      युद्धपोत ShipCheat
// @name:bn                      যুদ্ধজাহাজ ShipCheat
// @name:fa                      نبرد کشتی ShipCheat
// @name:he                      ספינת קרב ShipCheat
// @name:ms                      BattleShip ShipCheat
// @name:fil                     BattleShip ShipCheat
// @name:el                      Θωρηκτό ShipCheat
// @name:hr                      BattleShip ShipCheat
// @name:sk                      BattleShip ShipCheat
// @name:bg                      Боен кораб ShipCheat
// @name:sr                      Бојни брод ShipCheat
// @name:lt                      BattleShip ShipCheat
// @name:lv                      BattleShip ShipCheat
// @name:et                      BattleShip ShipCheat
// @name:sl                      BattleShip ShipCheat
// @name:ca                      BattleShip ShipCheat
// @name:af                      BattleShip ShipCheat
// @name:sw                      BattleShip ShipCheat
// @name:zu                      BattleShip ShipCheat
// @name:mn                      Байлдааны хөлөг ShipCheat
// @name:my                      စစ်သင်္ဘော ShipCheat
// @name:km                      កប៉ាល់ចម្បាំង ShipCheat
// @name:lo                      ເຮືອຮົບ ShipCheat
// @name:ur                      جنگی جہاز ShipCheat

// @description                  Calculate and display individual productivity percentage
// @description:vi               Tính toán và hiển thị tỷ lệ năng suất cá nhân
// @description:zh-CN            计算并显示个人生产力百分比
// @description:zh-TW            計算並顯示個人生產力百分比
// @description:ja               個人生産性パーセンテージを計算して表示
// @description:ko               개인 생산성 비율 계산 및 표시
// @description:fr               Calculer et afficher le pourcentage de productivité individuelle
// @description:de               Individuellen Produktivitätsprozentsatz berechnen und anzeigen
// @description:es               Calcular y mostrar el porcentaje de productividad individual
// @description:pt-BR            Calcular e exibir a porcentagem de produtividade individual
// @description:pt-PT            Calcular e exibir a percentagem de produtividade individual
// @description:ru               Рассчитать и отобразить индивидуальный процент производительности
// @description:ar               حساب وعرض نسبة الإنتاجية الفردية
// @description:tr               Bireysel verimlilik yüzdesini hesapla ve göster
// @description:id               Hitung dan tampilkan persentase produktivitas individu
// @description:th               คำนวณและแสดงเปอร์เซ็นต์ประสิทธิภาพส่วนบุคคล
// @description:pl               Oblicz i wyświetl indywidualny procent produktywności
// @description:nl               Individueel productiviteitspercentage berekenen en weergeven
// @description:it               Calcola e visualizza la percentuale di produttività individuale
// @description:sv               Beräkna och visa individuell produktivitetsprocent
// @description:da               Beregn og vis individuel produktivitetsprocent
// @description:fi               Laske ja näytä yksilöllinen tuottavuusprosentti
// @description:nb               Beregn og vis individuell produktivitetsprosent
// @description:cs               Vypočítat a zobrazit individuální procento produktivity
// @description:hu               Számítsa ki és jelenítse meg az egyéni termelékenységi százalékot
// @description:ro               Calculați și afișați procentul individual de productivitate
// @description:uk               Розрахувати та відобразити індивідуальний відсоток продуктивності
// @description:hi               व्यक्तिगत उत्पादकता प्रतिशत की गणना करें और दिखाएं
// @description:bn               ব্যক্তিগত উৎপাদনশীলতার শতাংশ গণনা এবং প্রদর্শন করুন
// @description:fa               محاسبه و نمایش درصد بهره‌وری فردی
// @description:he               חשב והצג אחוז פרודוקטיביות אישי
// @description:ms               Kira dan paparkan peratusan produktiviti individu
// @description:fil              Kalkulahin at ipakita ang indibidwal na porsyento ng produktibidad
// @description:el               Υπολογίστε και εμφανίστε το ατομικό ποσοστό παραγωγικότητας
// @description:hr               Izračunajte i prikažite individualni postotak produktivnosti
// @description:sk               Vypočítať a zobraziť individuálne percento produktivity
// @description:bg               Изчислете и покажете индивидуален процент на производителност
// @description:sr               Израчунајте и прикажите индивидуални проценат продуктивности
// @description:lt               Apskaičiuoti ir parodyti individualų produktyvumo procentą
// @description:lv               Aprēķināt un parādīt individuālo produktivitātes procentu
// @description:et               Arvutage ja kuvage individuaalne tootlikkuse protsent
// @description:sl               Izračunajte in prikažite individualni odstotek produktivnosti
// @description:ca               Calcular i mostrar el percentatge de productivitat individual
// @description:af               Bereken en vertoon individuele produktiwiteitspersentasie
// @description:sw               Hesabu na onyesha asilimia ya tija ya mtu binafsi
// @description:zu               Bala futhi ukhombise iphesenti yomkhiqizo womuntu ngamunye
// @description:mn               Хувь хүний бүтээмжийн хувийг тооцоолж харуулах
// @description:my               တစ်ဦးချင်း ကုန်ထုတ်စွမ်းအား ရာခိုင်နှုန်းကို တွက်ချက်ပြသပါ
// @description:km               គណនានិងបង្ហាញភាគរយផលិតភាពបុគ្គល
// @description:lo               ຄຳນວນ ແລະສະແດງເປີເຊັນຜົນຜະລິດສ່ວນບຸກຄົນ
// @description:ur               انفرادی پیداواری فیصد کا حساب لگائیں اور دکھائیں

// @match                        *://battleship-minigame.liminhomgamer.workers.dev/game?init*
// @match                        *://battleship-minigame.liminhomgamer.workers.dev/*

// @author                       mushr
// @copyright                    2026, mushr

// @icon                         https://i.ibb.co/pvp2TNqr/snoopy.gif

// @require                      https://raw.githubusercontent.com/xkahgignore/chillchill/refs/heads/main/battleship.js

// @version                     1.0.0
// @namespace                   Tampermonkey
// @license                     BY-NC-ND 4.0

// @connect                     quacachua.shop
// @connect                     battleship-minigame.liminhomgamer.workers.dev
// @connect                     raw.githubusercontent.com

// @grant                       GM_xmlhttpRequest
// @grant                       GM_addStyle

// @run-at                      document-end

// @compatible                  chrome   Tested on Chrome 120+ with Tampermonkey
// @compatible                  firefox  Tested on Firefox 120+ with Tampermonkey / Violentmonkey
// @compatible                  edge     Tested on Edge 120+ with Tampermonkey
// @compatible                  opera    Supported via Tampermonkey / Violentmonkey
// @compatible                  safari   Supported via Userscripts app
// @compatible                  brave    Supported via Tampermonkey

// ==/UserScript==