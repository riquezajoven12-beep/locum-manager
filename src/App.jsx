import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Search, Plus, FileText, Receipt, TrendingUp, Calendar, Clock, DollarSign, Building2, Filter, Download, Upload, X, ChevronDown, ChevronUp, Edit2, Trash2, Check, AlertCircle, Printer, BarChart3, CheckCircle2, Settings, ClipboardPaste, FileSpreadsheet, RefreshCw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// DATA — Parsed from Google Sheets Master Chart (230 entries)
// ═══════════════════════════════════════════════════════════════════════════
const INITIAL_DATA = [{"id":1,"date":"2025-05-18","week":20,"clinic":"POLIKLINIK AN-NUR","location":"BANTING","company":"","companyReg":"","contactNo":"601111000363","email":"","shift":"NIGHT","start":"00:00","end":"08:00","hours":8.0,"rate":null,"payable":250.0,"paymentDate":"2025-05-21","cash":0.0,"transfer":259.0,"total":259.0,"reference":"000148073","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":2,"date":"2025-05-21","week":21,"clinic":"KLINIK MEDIVIRON","location":"DAMANSARA DAMAI","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"15:00","end":"21:30","hours":6.5,"rate":45.0,"payable":292.5,"paymentDate":"2025-05-21","cash":295.0,"transfer":0.0,"total":295.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":3,"date":"2025-05-22","week":21,"clinic":"KLINIK MEDIVIRON","location":"DAMANSARA DAMAI","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:30","end":"21:30","hours":13.0,"rate":45.0,"payable":585.0,"paymentDate":"2025-05-22","cash":585.0,"transfer":0.0,"total":585.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":4,"date":"2025-05-24","week":21,"clinic":"KELINIK NASIONAL","location":"SS3","company":"","companyReg":"","contactNo":"60123252015","email":"","shift":"DAY","start":"15:00","end":"17:00","hours":2.0,"rate":40.0,"payable":80.0,"paymentDate":"2025-05-24","cash":80.0,"transfer":0.0,"total":80.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":5,"date":"2025-05-24","week":21,"clinic":"POLIKLINIK AN-NUR","location":"BANTING","company":"","companyReg":"","contactNo":"601111000363","email":"","shift":"NIGHT","start":"00:00","end":"08:00","hours":8.0,"rate":null,"payable":250.0,"paymentDate":"2025-05-27","cash":0.0,"transfer":253.0,"total":253.0,"reference":"000145633","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":6,"date":"2025-05-27","week":22,"clinic":"POLIKLINIK MEDIPRIMA","location":"SEPANG","company":"","companyReg":"","contactNo":"60102688523","email":"","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-05-27","cash":161.0,"transfer":0.0,"total":161.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":7,"date":"2025-05-28","week":22,"clinic":"POLIKLINIK SG BERTEK","location":"TELUK PULAI","company":"","companyReg":"","contactNo":"60137447322","email":"drhabibah70@gmail.com","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-05-28","cash":180.0,"transfer":0.0,"total":180.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":8,"date":"2025-05-28","week":22,"clinic":"KELINIK NASIONAL","location":"SS3","company":"","companyReg":"","contactNo":"60123252015","email":"","shift":"DAY","start":"14:30","end":"17:30","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-05-28","cash":130.0,"transfer":0.0,"total":130.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":9,"date":"2025-05-29","week":22,"clinic":"KLINIK MEDIVIRON","location":"BANTING","company":"","companyReg":"","contactNo":"60146322357","email":"","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-05-29","cash":177.0,"transfer":0.0,"total":177.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":10,"date":"2025-05-29","week":22,"clinic":"KLINIK NG DAN SINGH","location":"BANDAR COUNTRY HOMES","company":"","companyReg":"","contactNo":"601136870209","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":50.0,"payable":250.0,"paymentDate":"2025-05-29","cash":250.0,"transfer":0.0,"total":250.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":11,"date":"2025-05-30","week":22,"clinic":"KLINIK MEDIVIRON","location":"TELUK PANGLIMA GARANG","company":"","companyReg":"","contactNo":"60102530344","email":"","shift":"DAY","start":"14:00","end":"17:00","hours":2.0,"rate":45.0,"payable":90.0,"paymentDate":"2025-05-30","cash":100.0,"transfer":0.0,"total":100.0,"reference":"","invoiceNo":"0","paymentNo":"","declare":false,"paid":true},{"id":12,"date":"2025-05-31","week":22,"clinic":"POLIKLINIK AN-NUR","location":"BANTING","company":"","companyReg":"","contactNo":"601111000363","email":"","shift":"DAY","start":"20:00","end":"00:00","hours":4.0,"rate":45.0,"payable":180.0,"paymentDate":"","cash":0.0,"transfer":180.0,"total":180.0,"reference":"000215019","invoiceNo":"","paymentNo":"","declare":true,"paid":false},{"id":13,"date":"2025-06-01","week":22,"clinic":"POLIKLINIK AN-NUR","location":"BANTING","company":"","companyReg":"","contactNo":"601111000363","email":"","shift":"NIGHT","start":"00:00","end":"08:00","hours":8.0,"rate":null,"payable":250.0,"paymentDate":"","cash":0.0,"transfer":263.0,"total":263.0,"reference":"000215019","invoiceNo":"","paymentNo":"","declare":true,"paid":false},{"id":14,"date":"2025-06-02","week":23,"clinic":"POLIKLINIK AN-NUR","location":"BANTING","company":"","companyReg":"","contactNo":"601111000363","email":"","shift":"NIGHT","start":"00:00","end":"08:00","hours":8.0,"rate":null,"payable":250.0,"paymentDate":"","cash":0.0,"transfer":252.0,"total":252.0,"reference":"000215776","invoiceNo":"","paymentNo":"","declare":true,"paid":false},{"id":15,"date":"2025-06-04","week":23,"clinic":"MORRAZ MEDICARE","location":"PUCHONG","company":"","companyReg":"","contactNo":"60162627690","email":"","shift":"DAY","start":"18:00","end":"21:00","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-06-09","cash":0.0,"transfer":120.0,"total":120.0,"reference":"CR N0.: 000036028\n THIVYASHWINI A/P KOMARAN\n LOCUM","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":16,"date":"2025-06-05","week":23,"clinic":"QUALITAS HEALTH \nCLINIC KUMPULAN CITY","location":"SERI PETALING","company":"PROFESSIONAL OMEGA SDN","companyReg":"","contactNo":"60127031255","email":"","shift":"DAY","start":"15:00","end":"22:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-06-09","cash":0.0,"transfer":280.0,"total":280.0,"reference":"000048756","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":17,"date":"2025-06-06","week":23,"clinic":"PRIMER CHERANG","location":"BANDAR SAUJANA PUTRA","company":"","companyReg":"","contactNo":"60142177063","email":"","shift":"DAY","start":"10:00","end":"22:00","hours":12.0,"rate":40.0,"payable":480.0,"paymentDate":"","cash":0.0,"transfer":492.0,"total":492.0,"reference":"000170600","invoiceNo":"","paymentNo":"","declare":true,"paid":false},{"id":18,"date":"2025-06-07","week":23,"clinic":"KLINIK UTAMA 24 JAM","location":"PJ NEWTOWN","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"00:00","hours":15.0,"rate":40.0,"payable":600.0,"paymentDate":"2025-06-08","cash":900.0,"transfer":0.0,"total":900.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":19,"date":"2025-06-08","week":23,"clinic":"KLINIK UTAMA 24 JAM","location":"PJ NEWTOWN","company":"","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"00:00","end":"09:00","hours":9.0,"rate":null,"payable":250.0,"paymentDate":"","cash":0,"transfer":0.0,"total":250.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":false},{"id":20,"date":"2025-06-08","week":23,"clinic":"KLINIK MEDIVIRON","location":"BANTING","company":"","companyReg":"","contactNo":"60146322357","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-06-08","cash":208.0,"transfer":0.0,"total":208.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":21,"date":"2025-06-09","week":24,"clinic":"KLINIK WECARE","location":"PUCHONG","company":"WRM INTEGRATED (M) SDN BHD","companyReg":"","contactNo":"60179240061","email":"wrmintegres8@gmail.com","shift":"DAY","start":"09:00","end":"17:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-06-23","cash":0.0,"transfer":325.0,"total":325.0,"reference":"000031709","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":22,"date":"2025-06-10","week":24,"clinic":"POLIKLINIK SG BERTEK","location":"TELUK PULAI","company":"","companyReg":"","contactNo":"60137447322","email":"drhabibah70@gmail.com","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-06-10","cash":175.0,"transfer":0.0,"total":175.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":23,"date":"2025-06-10","week":24,"clinic":"KELINIK NASIONAL","location":"SG WAY","company":"","companyReg":"","contactNo":"60123252015","email":"","shift":"DAY","start":"14:30","end":"17:30","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-06-10","cash":130.0,"transfer":0.0,"total":130.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":24,"date":"2025-06-11","week":24,"clinic":"KELINIK NASIONAL + OMRON","location":"SG WAY","company":"","companyReg":"","contactNo":"60123252015","email":"","shift":"DAY","start":"14:30","end":"17:00","hours":2.5,"rate":40.0,"payable":100.0,"paymentDate":"2025-06-11","cash":110.0,"transfer":0.0,"total":110.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":25,"date":"2025-06-11","week":24,"clinic":"KLINIK MENARA 1","location":"BUKIT JELUTONG, SHAH ALAM","company":"","companyReg":"","contactNo":"60165638552","email":"","shift":"DAY","start":"18:00","end":"23:00","hours":5.0,"rate":50.0,"payable":250.0,"paymentDate":"2025-06-11","cash":250.0,"transfer":0.0,"total":250.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":26,"date":"2025-06-12","week":24,"clinic":"KLINIK MEDIVIRON","location":"BANTING","company":"","companyReg":"","contactNo":"60146322357","email":"","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-06-12","cash":173.0,"transfer":0.0,"total":173.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":27,"date":"2025-06-12","week":24,"clinic":"POLIKLINIK MEDIPRIMA","location":"AMPANG","company":"","companyReg":"","contactNo":"60149603886","email":"","shift":"DAY","start":"16:00","end":"22:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-06-12","cash":249.0,"transfer":0.0,"total":249.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":28,"date":"2025-06-14","week":24,"clinic":"POLIKLINIK MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"13:00","end":"23:00","hours":10.0,"rate":45.0,"payable":450.0,"paymentDate":"2025-06-14","cash":450.0,"transfer":0.0,"total":450.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":29,"date":"2025-06-15","week":24,"clinic":"POLIKLINIK DAN SURGERI DAMAI","location":"PANDAMARAN, KLANG","company":"","companyReg":"","contactNo":"60176530028","email":"","shift":"DAY","start":"09:00","end":"15:00","hours":6.0,"rate":45.0,"payable":270.0,"paymentDate":"2025-06-15","cash":270.0,"transfer":0.0,"total":270.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":30,"date":"2025-06-16","week":25,"clinic":"POLIKLINIK SG BERTEK","location":"TELUK PULAI","company":"","companyReg":"","contactNo":"60137447322","email":"drhabibah70@gmail.com","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-06-16","cash":175.0,"transfer":0.0,"total":175.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":31,"date":"2025-06-18","week":25,"clinic":"KLINIK MEDIVIRON","location":"JUGRA, TAMAN BANTING BARU","company":"","companyReg":"","contactNo":"601156521402","email":"","shift":"DAY","start":"09:30","end":"21:30","hours":10.0,"rate":40.0,"payable":400.0,"paymentDate":"2025-06-18","cash":400.0,"transfer":0.0,"total":400.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":32,"date":"2025-06-19","week":25,"clinic":"O2 CLINIC","location":"KOTA KEMUNING","company":"","companyReg":"","contactNo":"60103843347","email":"","shift":"DAY","start":"19:00","end":"22:00","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-07-10","cash":0.0,"transfer":120.0,"total":120.0,"reference":"IMEPS20250710100002297859907","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":33,"date":"2025-06-20","week":25,"clinic":"KLINIK MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"16:00","end":"23:00","hours":7.0,"rate":45.0,"payable":315.0,"paymentDate":"2025-06-20","cash":315.0,"transfer":0.0,"total":315.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":34,"date":"2025-06-21","week":25,"clinic":"KLINIK MEDIVIRON","location":"BATU BELAH","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-06-21","cash":160.0,"transfer":0.0,"total":160.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":35,"date":"2025-06-22","week":25,"clinic":"KLINIK SURGERI VIJAY","location":"TAMAN SRI ANDALAS","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"00:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-06-22","cash":286.0,"transfer":0.0,"total":286.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":36,"date":"2025-06-23","week":26,"clinic":"POLIKLINIK SG BERTEK","location":"TELUK PULAI","company":"","companyReg":"","contactNo":"60137447322","email":"drhabibah70@gmail.com","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-06-23","cash":185.0,"transfer":0.0,"total":185.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":37,"date":"2025-06-23","week":26,"clinic":"KLINIK PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-06-25","cash":0.0,"transfer":160.0,"total":160.0,"reference":"000174289","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":38,"date":"2025-06-24","week":26,"clinic":"KLINIK WECARE","location":"PUCHONG","company":"WRM INTEGRATED (M) SDN.","companyReg":"","contactNo":"60179240061","email":"wrmintegres8@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-07-06","cash":0.0,"transfer":205.0,"total":205.0,"reference":"000067993","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":39,"date":"2025-06-25","week":26,"clinic":"SELCARE CLINIC","location":"PUCHONG","company":"SELCARE SDN. BHD.","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-07-14","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000231150","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":40,"date":"2025-06-26","week":26,"clinic":"PRIMER CHERANG","location":"SERI KEMBANGAN","company":"PRIMER CHERANG CLINIC SERI","companyReg":"","contactNo":"60149220454","email":"","shift":"DAY","start":"09:00","end":"12:00","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-06-28","cash":0.0,"transfer":126.0,"total":126.0,"reference":"000082685","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":41,"date":"2025-06-26","week":26,"clinic":"SELCARE CLINIC","location":"PUCHONG","company":"SELCARE SDN. BHD.","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-07-14","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000231150","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":42,"date":"2025-06-27","week":26,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"16:00","end":"23:00","hours":7.0,"rate":45.0,"payable":315.0,"paymentDate":"2025-06-27","cash":345.0,"transfer":0.0,"total":345.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":43,"date":"2025-06-28","week":26,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"13:00","end":"23:00","hours":10.0,"rate":45.0,"payable":450.0,"paymentDate":"2025-06-28","cash":450.0,"transfer":0.0,"total":450.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":44,"date":"2025-06-29","week":26,"clinic":"METRO 24 JAM","location":"KOTA KEMUNING","company":"","companyReg":"","contactNo":"60162704615","email":"","shift":"NIGHT","start":"00:00","end":"09:00","hours":9.0,"rate":null,"payable":350.0,"paymentDate":"2025-06-29","cash":350.0,"transfer":0.0,"total":350.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":45,"date":"2025-06-29","week":26,"clinic":"UTAMA 24 JAM","location":"SEK 18","company":"","companyReg":"","contactNo":"60133530096","email":"","shift":"DAY","start":"20:00","end":"00:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-06-29","cash":180.0,"transfer":0.0,"total":180.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":46,"date":"2025-06-30","week":27,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-07-02","cash":0.0,"transfer":175.0,"total":175.0,"reference":"00002185","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":47,"date":"2025-07-01","week":27,"clinic":"MEDILINK","location":"KOTA KEMUNING","company":"KLINIK MEDILINK (KOTA KEMLOCUM 0107)","companyReg":"","contactNo":"60108107600","email":"medilink.kotakemuning@yahoo.com","shift":"DAY","start":"09:00","end":"17:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-07-10","cash":0.0,"transfer":285.0,"total":285.0,"reference":"000044560","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":48,"date":"2025-07-02","week":27,"clinic":"MEDIC 369","location":"TAIPAN","company":"360 MEDIC USJ TAIPAN","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"20:00","end":"08:00","hours":12.0,"rate":null,"payable":400.0,"paymentDate":"2025-07-03","cash":0.0,"transfer":465.0,"total":465.0,"reference":"000248439","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":49,"date":"2025-07-03","week":27,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"16:00","end":"23:00","hours":7.0,"rate":45.0,"payable":315.0,"paymentDate":"2025-07-03","cash":325.0,"transfer":0.0,"total":325.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":50,"date":"2025-07-04","week":27,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"16:00","end":"23:00","hours":7.0,"rate":45.0,"payable":315.0,"paymentDate":"2025-07-04","cash":319.0,"transfer":0.0,"total":319.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":51,"date":"2025-07-05","week":27,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"13:00","end":"23:00","hours":10.0,"rate":45.0,"payable":450.0,"paymentDate":"2025-07-05","cash":450.0,"transfer":0.0,"total":450.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":52,"date":"2025-07-06","week":27,"clinic":"METRO 24 JAM","location":"KOTA KEMUNING","company":"","companyReg":"","contactNo":"60162704615","email":"","shift":"NIGHT","start":"00:00","end":"09:00","hours":9.0,"rate":null,"payable":350.0,"paymentDate":"2025-07-06","cash":350.0,"transfer":0.0,"total":350.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":53,"date":"2025-07-06","week":27,"clinic":"POLIKLINIK MYMEDIK","location":"PUCHONG UTAMA","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"18:00","end":"22:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-07-06","cash":0.0,"transfer":175.0,"total":175.0,"reference":"000127754","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":54,"date":"2025-07-07","week":28,"clinic":"KLINIK SURGERI VIJAY","location":"TAMAN SRI ANDALAS, KLANG","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"00:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-07-07","cash":303.0,"transfer":0.0,"total":303.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":55,"date":"2025-07-08","week":28,"clinic":"KLINIK DR SAKINAH","location":"ALAM IMPIAN","company":"KLINIK DR SHAKINAH PLT LOCUM","companyReg":"","contactNo":"60124353554","email":"klinikdrshakinah@gmail.com","shift":"DAY","start":"18:00","end":"22:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-07-09","cash":0.0,"transfer":163.0,"total":163.0,"reference":"000016214","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":56,"date":"2025-07-09","week":28,"clinic":"MEDILINK","location":"KOTA KEMUNING","company":"KLINIK MEDILINK","companyReg":"","contactNo":"60108107600","email":"medilink.kotakemuning@yahoo.com","shift":"DAY","start":"09:00","end":"17:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-07-25","cash":0.0,"transfer":280.0,"total":280.0,"reference":"000081748","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":57,"date":"2025-07-09","week":28,"clinic":"MEDIC 360","location":"TAIPAN","company":"XXXXXX3930 360 MEDIC USJ TAIPAN","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"20:00","end":"08:00","hours":12.0,"rate":null,"payable":400.0,"paymentDate":"2025-07-11","cash":0.0,"transfer":475.0,"total":475.0,"reference":"000816075","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":58,"date":"2025-07-10","week":28,"clinic":"MEDILINK","location":"KOTA KEMUNING","company":"KLINIK MEDILINK","companyReg":"","contactNo":"60108107600","email":"medilink.kotakemuning@yahoo.com","shift":"DAY","start":"09:00","end":"17:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-07-25","cash":0.0,"transfer":280.0,"total":280.0,"reference":"000081748","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":59,"date":"2025-07-10","week":28,"clinic":"MORRAZ MEDICARE","location":"PUCHONG","company":"","companyReg":"","contactNo":"60162627690","email":"","shift":"DAY","start":"18:00","end":"21:00","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-07-11","cash":0.0,"transfer":120.0,"total":120.0,"reference":"000094005","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":60,"date":"2025-07-11","week":28,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"16:00","end":"23:00","hours":7.0,"rate":45.0,"payable":315.0,"paymentDate":"2025-07-11","cash":319.0,"transfer":0.0,"total":319.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":61,"date":"2025-07-13","week":28,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN BHD","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"08:00","end":"17:00","hours":9.0,"rate":40.0,"payable":360.0,"paymentDate":"2025-07-24","cash":0.0,"transfer":360.0,"total":360.0,"reference":"000220143","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":62,"date":"2025-07-13","week":28,"clinic":"MEDIC 360","location":"TAIPAN","company":"XXXXXX3930 360 MEDIC USJ TAIPAN","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"20:00","end":"08:00","hours":12.0,"rate":null,"payable":400.0,"paymentDate":"2025-07-17","cash":0.0,"transfer":490.0,"total":490.0,"reference":"000965933","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":63,"date":"2025-07-14","week":29,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-07-18","cash":0.0,"transfer":160.0,"total":160.0,"reference":"000018327","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":64,"date":"2025-07-15","week":29,"clinic":"MEDIVIRON","location":"BANTING","company":"","companyReg":"","contactNo":"60146322357","email":"","shift":"DAY","start":"14:00","end":"17:00","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-07-15","cash":126.0,"transfer":0.0,"total":126.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":65,"date":"2025-07-15","week":29,"clinic":"MEDIVIRON","location":"JUGRA","company":"","companyReg":"","contactNo":"","email":"klinikmedivironjugra101@gmail.com","shift":"DAY","start":"17:30","end":"22:00","hours":3.5,"rate":40.0,"payable":140.0,"paymentDate":"2025-07-15","cash":145.0,"transfer":0.0,"total":145.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":66,"date":"2025-07-16","week":29,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN BHD","companyReg":"","contactNo":"60128000487","email":"","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-07-21","cash":0.0,"transfer":160.0,"total":160.0,"reference":"000121790","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":67,"date":"2025-07-17","week":29,"clinic":"MEDIVIRON","location":"JUGRA","company":"","companyReg":"","contactNo":"","email":"klinikmedivironjugra101@gmail.com","shift":"DAY","start":"09:30","end":"21:30","hours":10.0,"rate":40.0,"payable":160.0,"paymentDate":"","cash":0.0,"transfer":0.0,"total":160.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":false},{"id":68,"date":"2025-07-19","week":29,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"13:00","end":"23:00","hours":10.0,"rate":45.0,"payable":450.0,"paymentDate":"2025-07-19","cash":454.0,"transfer":0.0,"total":454.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":69,"date":"2025-07-20","week":29,"clinic":"ANDA 24 JAM","location":"BALAKONG","company":"KAB SDN BHD","companyReg":"","contactNo":"60142649382","email":"","shift":"DAY","start":"09:00","end":"15:00","hours":6.0,"rate":45.0,"payable":270.0,"paymentDate":"2025-07-20","cash":270.0,"transfer":0.0,"total":270.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":70,"date":"2025-07-20","week":29,"clinic":"ANDA 24 JAM","location":"BALAKONG","company":"KAB SDN BHD","companyReg":"","contactNo":"60142649382","email":"","shift":"DAY","start":"18:00","end":"00:00","hours":6.0,"rate":45.0,"payable":270.0,"paymentDate":"2025-07-20","cash":270.0,"transfer":0.0,"total":270.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":71,"date":"2025-07-21","week":30,"clinic":"QUALITAS HEALTH \nKLINIK DAMAI MEDIK","location":"DAMANSARA DAMAI","company":"","companyReg":"","contactNo":"60361435800","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-07-21","cash":210.0,"transfer":0.0,"total":210.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":72,"date":"2025-07-22","week":30,"clinic":"SEHATI 24 JAM","location":"PUCHONG PRIMA","company":"","companyReg":"","contactNo":"60102315255","email":"","shift":"NIGHT","start":"23:00","end":"08:00","hours":9.0,"rate":null,"payable":250.0,"paymentDate":"2025-07-24","cash":0.0,"transfer":250.0,"total":250.0,"reference":"000016659","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":73,"date":"2025-07-23","week":30,"clinic":"WECARE","location":"PUCHONG PRIMA","company":"WRM INTEGRATED (M) SDN","companyReg":"","contactNo":"60179240061","email":"wrmintegres8@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-08-02","cash":0.0,"transfer":210.0,"total":210.0,"reference":"000166611","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":74,"date":"2025-07-23","week":30,"clinic":"SEHATI 24 JAM","location":"PUCHONG PRIMA","company":"WALID HEALTHCARE GROUP","companyReg":"","contactNo":"60102315255","email":"","shift":"NIGHT","start":"23:00","end":"08:00","hours":9.0,"rate":null,"payable":250.0,"paymentDate":"2025-07-24","cash":0.0,"transfer":250.0,"total":250.0,"reference":"000034950","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":75,"date":"2025-07-24","week":30,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN BHD","companyReg":"","contactNo":"60128000487","email":"","shift":"DAY","start":"17:00","end":"23:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-07-29","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000057873","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":76,"date":"2025-07-25","week":30,"clinic":"POLIKLINIK SUNGAI BERTEK","location":"TELUK PULAI, KLANG","company":"","companyReg":"","contactNo":"60137447322","email":"drhabibah70@gmail.com","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-07-25","cash":185.0,"transfer":0.0,"total":185.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":77,"date":"2025-07-25","week":30,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"16:00","end":"23:00","hours":7.0,"rate":45.0,"payable":315.0,"paymentDate":"2025-07-25","cash":271.0,"transfer":0.0,"total":271.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":78,"date":"2025-07-26","week":30,"clinic":"MEDIVIRON","location":"BATU BELAH","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-07-26","cash":164.0,"transfer":0.0,"total":164.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":79,"date":"2025-07-27","week":30,"clinic":"MEDIC 360","location":"SELAYANG JAYA","company":"XXXXXX5224 360 MEDIC SELAYANG","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"14:30","hours":5.5,"rate":40.0,"payable":220.0,"paymentDate":"2025-09-03","cash":0.0,"transfer":220.0,"total":220.0,"reference":"000067759","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":80,"date":"2025-07-27","week":30,"clinic":"ANDA 24 JAM","location":"BANDAR TUN HUSSEIN ONN","company":"KAB SDN BHD","companyReg":"","contactNo":"60142649382","email":"","shift":"DAY","start":"18:00","end":"23:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-07-27","cash":222.0,"transfer":0.0,"total":222.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":81,"date":"2025-07-28","week":31,"clinic":"KLINIK MEDILINK","location":"KOTA KEMUNING","company":"KLINIK MEDILINK","companyReg":"","contactNo":"60108107600","email":"medilink.kotakemuning@yahoo.com","shift":"DAY","start":"18:00","end":"22:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-08-12","cash":0.0,"transfer":160.0,"total":160.0,"reference":"000087167","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":82,"date":"2025-07-29","week":31,"clinic":"MEDIVIRON","location":"JUGRA","company":"","companyReg":"","contactNo":"","email":"klinikmedivironjugra101@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":3.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-07-29","cash":160.0,"transfer":0.0,"total":160.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":83,"date":"2025-07-30","week":31,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN BHD","companyReg":"","contactNo":"60128000487","email":"","shift":"DAY","start":"17:00","end":"23:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-08-04","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000099141","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":84,"date":"2025-08-04","week":32,"clinic":"SINAR CERIA 24 J","location":"SENTUL","company":"RS HEALTHCARE SDN. BHD.","companyReg":"","contactNo":"60136723348","email":"","shift":"NIGHT","start":"22:00","end":"07:00","hours":9.0,"rate":27.78,"payable":250.0,"paymentDate":"2025-08-08","cash":0.0,"transfer":309.0,"total":309.0,"reference":"000092288","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":85,"date":"2025-08-07","week":32,"clinic":"MEDIVIRON","location":"TELOK PANGLIMA GARANG","company":"","companyReg":"","contactNo":"60102530344","email":"","shift":"DAY","start":"14:00","end":"17:00","hours":3.0,"rate":45.0,"payable":135.0,"paymentDate":"2025-08-07","cash":150.0,"transfer":0.0,"total":150.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":86,"date":"2025-08-08","week":32,"clinic":"KLINIK MOHAN","location":"KAMPUNG JAWA","company":"ZENMEDIC WELLNESS SERVICE","companyReg":"","contactNo":"60102257067","email":"","shift":"DAY","start":"15:00","end":"21:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-08-13","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000109707","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":87,"date":"2025-08-09","week":32,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"13:00","end":"23:00","hours":10.0,"rate":45.0,"payable":450.0,"paymentDate":"2025-08-09","cash":470.0,"transfer":0.0,"total":470.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":88,"date":"2025-08-10","week":32,"clinic":"MEDIVIRON","location":"JUGRA","company":"","companyReg":"","contactNo":"","email":"klinikmedivironjugra101@gmail.com","shift":"DAY","start":"09:00","end":"22:00","hours":13.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-08-10","cash":445.0,"transfer":0.0,"total":445.0,"reference":"","invoiceNo":"","paymentNo":"","declare":false,"paid":true},{"id":89,"date":"2025-08-11","week":33,"clinic":"KLINIK DANIAL","location":"SHAH ALAM","company":"KLINIK DANIAL AMBLOCUM","companyReg":"","contactNo":"60126155840","email":"","shift":"DAY","start":"14:30","end":"18:30","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-09-08","cash":0.0,"transfer":160.0,"total":160.0,"reference":"000188348","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":90,"date":"2025-08-11","week":33,"clinic":"SINAR CERIA 24 J","location":"SENTUL","company":"RS HEALTHCARE SDN. BHD.","companyReg":"","contactNo":"60136723348","email":"","shift":"NIGHT","start":"22:00","end":"07:00","hours":9.0,"rate":27.78,"payable":250.0,"paymentDate":"2025-08-17","cash":0.0,"transfer":306.0,"total":306.0,"reference":"000015693","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":91,"date":"2025-08-13","week":33,"clinic":"MEDIPRIMA","location":"SG BULOH","company":"","companyReg":"","contactNo":"60166419050","email":"","shift":"DAY","start":"16:30","end":"22:30","hours":6.0,"rate":45.0,"payable":270.0,"paymentDate":"2025-08-13","cash":287.0,"transfer":0.0,"total":287.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20501","declare":true,"paid":true},{"id":92,"date":"2025-08-14","week":33,"clinic":"MUTIARA","location":"SRI GOMBAK","company":"XXXXXX5834 APK2U HEALTHCARE","companyReg":"","contactNo":"60102688158","email":"","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":45.0,"payable":270.0,"paymentDate":"2025-08-15","cash":0.0,"transfer":283.0,"total":283.0,"reference":"000269995","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":93,"date":"2025-08-15","week":33,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN BHD","companyReg":"","contactNo":"60128000487","email":"","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-08-28","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000113958","invoiceNo":"","paymentNo":"BILL BOOK 20504","declare":true,"paid":true},{"id":94,"date":"2025-08-16","week":33,"clinic":"QUALITAS HEALTH \nKLINIK KUMPULAN MEDIC","location":"PETALING JAYA | PJ NEWTOWN","company":"KUMPULAN MEDIC (KL) SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:30","end":"13:00","hours":4.5,"rate":40.0,"payable":180.0,"paymentDate":"2025-08-17","cash":0.0,"transfer":196.0,"total":196.0,"reference":"000098984","invoiceNo":"","paymentNo":"BILL BOOK 20505","declare":true,"paid":true},{"id":95,"date":"2025-08-17","week":33,"clinic":"KLINIK DAN SURGERI BERJAYA PARK","location":"BERJAYA PARK","company":"GVS MEDIC VENTURES PLT","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"13:30","hours":4.5,"rate":40.0,"payable":180.0,"paymentDate":"2025-08-19","cash":0.0,"transfer":180.0,"total":180.0,"reference":"000167555","invoiceNo":"","paymentNo":"BILL BOOK 20506","declare":true,"paid":true},{"id":96,"date":"2025-08-17","week":33,"clinic":"MEGAKLINIK ZAHRAN","location":"PUTRAJAYA","company":"DUAL RHYTHM HEALTHCARE","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"15:30","end":"22:30","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-08-22","cash":0.0,"transfer":294.0,"total":294.0,"reference":"000085306","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":97,"date":"2025-08-18","week":34,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-08-21","cash":0.0,"transfer":170.0,"total":170.0,"reference":"000179269","invoiceNo":"","paymentNo":"BILL BOOK 20508","declare":true,"paid":true},{"id":98,"date":"2025-08-18","week":34,"clinic":"SINAR CERIA 24 JAM","location":"SENTUL","company":"RS HEALTHCARE SDN. BHD.","companyReg":"","contactNo":"60136723348","email":"","shift":"NIGHT","start":"22:00","end":"07:00","hours":9.0,"rate":27.78,"payable":250.0,"paymentDate":"2025-08-23","cash":0.0,"transfer":275.0,"total":275.0,"reference":"000097852","invoiceNo":"","paymentNo":"BILL BOOK 20509","declare":true,"paid":true},{"id":99,"date":"2025-08-19","week":34,"clinic":"MEDIVIRON","location":"TELOK PANGLIMA GARANG","company":"","companyReg":"","contactNo":"60102530344","email":"","shift":"DAY","start":"14:00","end":"17:00","hours":3.0,"rate":45.0,"payable":135.0,"paymentDate":"2025-08-19","cash":150.0,"transfer":0.0,"total":150.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20510","declare":false,"paid":true},{"id":100,"date":"2025-08-18","week":34,"clinic":"NENO","location":"SOCIAL ENTERPRISE","company":"NENO SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:00","end":"10:00","hours":2.0,"rate":86.66,"payable":260.0,"paymentDate":"2025-08-24","cash":0.0,"transfer":260.0,"total":260.0,"reference":"000074438","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":101,"date":"2025-08-21","week":34,"clinic":"POLIKLINIK NMV","location":"KOTA BAYU EMAS, KLANG","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"18:00","end":"21:00","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-08-21","cash":120.0,"transfer":0.0,"total":120.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20512","declare":false,"paid":true},{"id":102,"date":"2025-08-23","week":34,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"13:00","end":"21:00","hours":8.0,"rate":45.0,"payable":450.0,"paymentDate":"","cash":467.0,"transfer":0.0,"total":467.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20513","declare":false,"paid":false},{"id":103,"date":"2025-08-24","week":34,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN BHD","companyReg":"","contactNo":"60128000487","email":"","shift":"DAY","start":"10:00","end":"22:00","hours":12.0,"rate":40.0,"payable":480.0,"paymentDate":"2025-09-14","cash":0.0,"transfer":492.0,"total":492.0,"reference":"000005448","invoiceNo":"","paymentNo":"BILL BOOK 20514","declare":true,"paid":true},{"id":104,"date":"2025-08-25","week":35,"clinic":"ANDA 24 JAM","location":"BALAKONG","company":"","companyReg":"","contactNo":"60142649382","email":"","shift":"DAY","start":"08:00","end":"14:00","hours":6.0,"rate":45.0,"payable":270.0,"paymentDate":"2025-08-25","cash":270.0,"transfer":0.0,"total":270.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20515","declare":false,"paid":true},{"id":105,"date":"2025-08-25","week":35,"clinic":"O2 CLINIC","location":"KOTA KEMUNING","company":"","companyReg":"","contactNo":"60103843347","email":"hr@o2klinik.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-09-10","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000172864","invoiceNo":"","paymentNo":"BILL BOOK 20516","declare":true,"paid":true},{"id":106,"date":"2025-08-26","week":35,"clinic":"ANDA 24 JAM","location":"BALAKONG","company":"","companyReg":"","contactNo":"60142649382","email":"","shift":"DAY","start":"16:00","end":"00:00","hours":8.0,"rate":45.0,"payable":360.0,"paymentDate":"2025-08-26","cash":380.0,"transfer":0.0,"total":380.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20517","declare":false,"paid":true},{"id":107,"date":"2025-08-27","week":35,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-09-08","cash":0.0,"transfer":160.0,"total":160.0,"reference":"000287722","invoiceNo":"","paymentNo":"","declare":true,"paid":true},{"id":108,"date":"2025-08-28","week":35,"clinic":"UTAMA 24 JAM","location":"KOTA KEMUNING","company":"","companyReg":"","contactNo":"60102756975","email":"klinikutama.kk@gmail.com","shift":"DAY","start":"16:00","end":"22:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-09-02","cash":0.0,"transfer":252.0,"total":252.0,"reference":"000196526","invoiceNo":"","paymentNo":"BILL BOOK 20519","declare":true,"paid":true},{"id":109,"date":"2025-08-29","week":35,"clinic":"MEDIVIRON","location":"BANTING","company":"","companyReg":"","contactNo":"60146322357","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-08-29","cash":226.0,"transfer":0.0,"total":226.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20520","declare":false,"paid":true},{"id":110,"date":"2025-08-31","week":35,"clinic":"UTAMA 24 JAM","location":"JUGRA","company":"","companyReg":"","contactNo":"60172020294","email":"","shift":"DAY","start":"08:00","end":"16:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-08-31","cash":333.0,"transfer":0.0,"total":333.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20521","declare":false,"paid":true},{"id":111,"date":"2025-08-31","week":35,"clinic":"KM 360","location":"TAIPAN","company":"XXXXXX3930 360 MEDIC USJ TAIPAN","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"20:00","end":"08:00","hours":12.0,"rate":33.33,"payable":400.0,"paymentDate":"2025-09-03","cash":0.0,"transfer":445.0,"total":445.0,"reference":"000699271","invoiceNo":"","paymentNo":"BILL BOOK 20522","declare":true,"paid":true},{"id":112,"date":"2025-09-01","week":36,"clinic":"MEDIVIRON","location":"BANTING","company":"","companyReg":"","contactNo":"60146322357","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-09-01","cash":206.0,"transfer":0.0,"total":206.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK  20523","declare":false,"paid":true},{"id":113,"date":"2025-09-04","week":36,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN BHD","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"","cash":0.0,"transfer":0.0,"total":200.0,"reference":"PENDING","invoiceNo":"","paymentNo":"","declare":false,"paid":false},{"id":114,"date":"2025-09-05","week":36,"clinic":"POLIKLINIK CAHAYA","location":"PRESINT 8, PUTRAJAYA","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"","contactNo":"60193081505","email":"","shift":"DAY","start":"15:00","end":"23:00","hours":8.0,"rate":45.0,"payable":360.0,"paymentDate":"2025-09-10","cash":0.0,"transfer":365.0,"total":365.0,"reference":"000220874","invoiceNo":"","paymentNo":"BILL BOOK 20525","declare":true,"paid":true},{"id":115,"date":"2025-09-07","week":36,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-09-10","cash":0.0,"transfer":364.0,"total":364.0,"reference":"000006107","invoiceNo":"","paymentNo":"BILL BOOK 20526","declare":true,"paid":true},{"id":116,"date":"2025-09-08","week":37,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN BHD","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"","cash":0.0,"transfer":0.0,"total":200.0,"reference":"PENDING","invoiceNo":"","paymentNo":"","declare":false,"paid":false},{"id":117,"date":"2025-09-09","week":37,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN BHD","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-09-29","cash":0.0,"transfer":200.0,"total":200.0,"reference":"","invoiceNo":"DRLOC-090925-01","paymentNo":"LOCDR-090925-01","declare":true,"paid":true},{"id":118,"date":"2025-09-10","week":37,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-09-17","cash":0.0,"transfer":450.0,"total":450.0,"reference":"000417532","invoiceNo":"DRLOC-100925-01","paymentNo":"LOCDR-100925-01","declare":true,"paid":true},{"id":119,"date":"2025-09-11","week":37,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN BHD","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"15:00","end":"22:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-09-29","cash":0.0,"transfer":280.0,"total":280.0,"reference":"","invoiceNo":"DRLOC-110925-01","paymentNo":"LOCDR-110925-01","declare":true,"paid":true},{"id":120,"date":"2025-09-12","week":37,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-09-17","cash":0.0,"transfer":455.0,"total":455.0,"reference":"000417532","invoiceNo":"DRLOC-120925-01","paymentNo":"LOCDR-120925-01","declare":true,"paid":true},{"id":121,"date":"2025-09-14","week":37,"clinic":"DR CARE","location":"BANTING","company":"","companyReg":"","contactNo":"60128000487","email":"","shift":"DAY","start":"10:00","end":"16:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-10-01","cash":0.0,"transfer":243.0,"total":243.0,"reference":"","invoiceNo":"DRLOC-140925-01","paymentNo":"LOCDR-140925-01","declare":true,"paid":true},{"id":122,"date":"2025-09-14","week":37,"clinic":"KLINIK SELVAA","location":"BANDAR PUTERI 5","company":"","companyReg":"","contactNo":"60132875020","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-09-17","cash":9.0,"transfer":200.0,"total":209.0,"reference":"000716799","invoiceNo":"DRLOC-140925-02","paymentNo":"LOCDR-140925-02","declare":true,"paid":true},{"id":123,"date":"2025-09-15","week":38,"clinic":"QUALITAS HEALTH \nKUMPULAN MEDIC","location":"PJ NEWTOWN","company":"KUMPULAN MEDIC (KL) SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:30","end":"16:30","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-09-16","cash":0.0,"transfer":320.0,"total":320.0,"reference":"000015190","invoiceNo":"DRLOC-150925-01","paymentNo":"LOCDR-150925-01","declare":true,"paid":true},{"id":124,"date":"2025-09-16","week":38,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN BHD","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"08:00","end":"17:00","hours":9.0,"rate":40.0,"payable":360.0,"paymentDate":"2025-09-29","cash":0.0,"transfer":360.0,"total":360.0,"reference":"","invoiceNo":"DRLOC-160925-01","paymentNo":"LOCDR-160925-01","declare":true,"paid":true},{"id":125,"date":"2025-09-16","week":38,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN BHD","companyReg":"","contactNo":"","email":"selcareclinic.puchong@gmail.com","shift":"NIGHT","start":"22:00","end":"07:00","hours":9.0,"rate":33.0,"payable":300.0,"paymentDate":"2025-09-29","cash":0.0,"transfer":330.0,"total":330.0,"reference":"","invoiceNo":"DRLOC-160925-02","paymentNo":"LOCDR-160925-02","declare":true,"paid":true},{"id":126,"date":"2025-09-17","week":38,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"HEALTH EXPERT ASIA SDN BHD","companyReg":"","contactNo":"60102688057","email":"","shift":"DAY","start":"16:00","end":"23:00","hours":7.0,"rate":45.0,"payable":315.0,"paymentDate":"2025-09-17","cash":327.0,"transfer":0.0,"total":327.0,"reference":"","invoiceNo":"DRLOC-170925-01","paymentNo":"LOCDR-170925-01","declare":false,"paid":true},{"id":127,"date":"2025-09-19","week":38,"clinic":"WECARE","location":"KOI PRIMA","company":"WRM INTEGRATED (M) SDN BHD","companyReg":"","contactNo":"60179240061","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-09-24","cash":0.0,"transfer":206.0,"total":206.0,"reference":"","invoiceNo":"DRLOC-190925-01","paymentNo":"LOCDR-190925-01","declare":true,"paid":true},{"id":128,"date":"2025-09-20","week":38,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"15:00","end":"21:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-09-27","cash":0.0,"transfer":266.8,"total":266.8,"reference":"","invoiceNo":"DRLOC-200925-01","paymentNo":"LOCDR-200925-01","declare":true,"paid":true},{"id":129,"date":"2025-09-21","week":38,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-09-27","cash":0.0,"transfer":346.8,"total":346.8,"reference":"","invoiceNo":"DRLOC-210925-01","paymentNo":"LOCDR-210925-01","declare":true,"paid":true},{"id":130,"date":"2025-09-22","week":39,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-09-27","cash":0.0,"transfer":446.8,"total":446.8,"reference":"","invoiceNo":"DRLOC-220925-01","paymentNo":"LOCDR-220925-01","declare":true,"paid":true},{"id":131,"date":"2025-09-23","week":39,"clinic":"WECARE","location":"KOI PRIMA","company":"WRM INTEGRATED (M) SDN BHD","companyReg":"","contactNo":"60179240061","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-10-02","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000297271","invoiceNo":"","paymentNo":"LOCDR-230925-01","declare":true,"paid":true},{"id":132,"date":"2025-09-24","week":39,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-09-27","cash":0.0,"transfer":446.8,"total":446.8,"reference":"","invoiceNo":"DRLOC-240925-01","paymentNo":"LOCDR-240925-01","declare":true,"paid":true},{"id":133,"date":"2025-09-25","week":39,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-09-27","cash":0.0,"transfer":446.8,"total":446.8,"reference":"","invoiceNo":"DRLOC-250925-01","paymentNo":"LOCDR-250925-01","declare":true,"paid":true},{"id":134,"date":"2025-09-26","week":39,"clinic":"WECARE","location":"KOI PRIMA","company":"WRM INTEGRATED (M) SDN BHD","companyReg":"","contactNo":"60179240061","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-10-02","cash":0.0,"transfer":215.0,"total":215.0,"reference":"000297271","invoiceNo":"","paymentNo":"BILL BOOK 20502","declare":true,"paid":true},{"id":135,"date":"2025-09-27","week":39,"clinic":"BAHARUDIN","location":"SEKSYEN 23 | SHAH ALAM","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"13:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-09-29","cash":0.0,"transfer":164.0,"total":164.0,"reference":"","invoiceNo":"","paymentNo":"BILL BOOK 20528","declare":true,"paid":true},{"id":136,"date":"2025-09-28","week":39,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60166007976","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-10-06","cash":0.0,"transfer":340.0,"total":340.0,"reference":"000079822","invoiceNo":"DRLOC-280925-01","paymentNo":"LOCDR-280925-01","declare":true,"paid":true},{"id":137,"date":"2025-10-01","week":40,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN. BHD.","companyReg":"","contactNo":"60173606277","email":"drcarebanting@gmail.com","shift":"DAY","start":"17:00","end":"20:00","hours":3.0,"rate":40.0,"payable":120.0,"paymentDate":"2025-10-01","cash":0.0,"transfer":120.0,"total":120.0,"reference":"000350689","invoiceNo":"","paymentNo":"NO. 20529","declare":true,"paid":true},{"id":138,"date":"2025-10-02","week":40,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-10-06","cash":0.0,"transfer":460.0,"total":460.0,"reference":"000079822","invoiceNo":"DRLOC-021025-01","paymentNo":"LOCDR-021025-01","declare":true,"paid":true},{"id":139,"date":"2025-10-02","week":40,"clinic":"SINAR CERIA","location":"SENTUL","company":"RS HEALTHCARE SDN. BHD.","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"22:00","end":"07:00","hours":9.0,"rate":0,"payable":250.0,"paymentDate":"2025-10-07","cash":0.0,"transfer":303.0,"total":303.0,"reference":"000210305","invoiceNo":"DRLOC-021025-02","paymentNo":"LOCDR-031025-01","declare":true,"paid":true},{"id":140,"date":"2025-10-05","week":40,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-10-06","cash":0.0,"transfer":340.0,"total":340.0,"reference":"000079822","invoiceNo":"DRLOC-051025-01","paymentNo":"LOCDR-051025-01","declare":true,"paid":true},{"id":141,"date":"2025-10-06","week":41,"clinic":"MEDILINK","location":"KOTA KEMUNING","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"15:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"","cash":0.0,"transfer":0.0,"total":240.0,"reference":"PENDING","invoiceNo":"DRLOC-061025-01","paymentNo":"LOCDR-061025-01","declare":false,"paid":false},{"id":142,"date":"2025-10-07","week":41,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN. BHD.","companyReg":"","contactNo":"601126162234","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"08:00","end":"22:00","hours":14.0,"rate":40.0,"payable":560.0,"paymentDate":"2025-10-29","cash":0.0,"transfer":560.0,"total":560.0,"reference":"000166071","invoiceNo":"DRLOC-071025-01","paymentNo":"LOCDR-071025-01","declare":true,"paid":true},{"id":143,"date":"2025-10-10","week":41,"clinic":"CARECLINICS | CAHAYA","location":"PRESINT 8 | PUTRAJAYA","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"","contactNo":"60388936066","email":"","shift":"DAY","start":"15:00","end":"23:00","hours":8.0,"rate":45.0,"payable":360.0,"paymentDate":"","cash":0.0,"transfer":429.0,"total":429.0,"reference":"000264163","invoiceNo":"DRLOC-101025-01","paymentNo":"LOCDR-101025-01","declare":true,"paid":false},{"id":144,"date":"2025-10-11","week":41,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"18:00","end":"23:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-10-11","cash":234.0,"transfer":0.0,"total":234.0,"reference":"","invoiceNo":"DRLOC-111025-01","paymentNo":"LOCDR-111025-01","declare":false,"paid":true},{"id":145,"date":"2025-10-12","week":41,"clinic":"WECARE","location":"KOI PRIMA | PUCHONG","company":"WRM INTEGRATED (M) SDN.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"13:00","end":"22:00","hours":9.0,"rate":40.0,"payable":360.0,"paymentDate":"2025-10-17","cash":0.0,"transfer":375.0,"total":375.0,"reference":"000021167","invoiceNo":"DRLOC-121025-01","paymentNo":"LOCDR-121025-01","declare":true,"paid":true},{"id":146,"date":"2025-10-13","week":42,"clinic":"SANCTUARY FAMILY CLINIC","location":"ECO SANCTUARI","company":"THE HOLISTIC FAMILY SDN.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"14:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-10-13","cash":0.0,"transfer":225.0,"total":225.0,"reference":"000068511","invoiceNo":"DRLOC-131025-01","paymentNo":"LOCDR-131025-01","declare":true,"paid":true},{"id":147,"date":"2025-10-13","week":42,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"15:30","end":"21:00","hours":5.5,"rate":40.0,"payable":220.0,"paymentDate":"2025-10-20","cash":0.0,"transfer":265.0,"total":265.0,"reference":"000104693","invoiceNo":"DRLOC-131025-02","paymentNo":"LOCDR-131025-02","declare":true,"paid":true},{"id":148,"date":"2025-10-14","week":42,"clinic":"PRIMA","location":"SUNGAI BULOH","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"14:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-10-14","cash":225.0,"transfer":0.0,"total":225.0,"reference":"","invoiceNo":"DRLOC-141025-01","paymentNo":"LOCDR-141025-01","declare":false,"paid":true},{"id":149,"date":"2025-10-14","week":42,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN. BHD.","companyReg":"","contactNo":"601126162234","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-11-07","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000222881","invoiceNo":"DRLOC-141025-02","paymentNo":"LOCDR-141025-02","declare":true,"paid":true},{"id":150,"date":"2025-10-15","week":42,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN. BHD.","companyReg":"","contactNo":"601126162234","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-11-07","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000222881","invoiceNo":"DRLOC-151025-01","paymentNo":"LOCDR-151025-01","declare":true,"paid":true},{"id":151,"date":"2025-10-16","week":42,"clinic":"SANCTUARY FAMILY CLINIC","location":"ECO SANCTUARY","company":"THE HOLISTIC FAMILY SDN.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:30","end":"14:30","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-10-16","cash":0.0,"transfer":225.0,"total":225.0,"reference":"000063431","invoiceNo":"DRLOC-161025-01","paymentNo":"LOCDR-161025-01","declare":true,"paid":true},{"id":152,"date":"2025-10-17","week":42,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"15:00","end":"21:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-10-22","cash":0.0,"transfer":272.5,"total":272.5,"reference":"000116335","invoiceNo":"DRLOC-171025-01","paymentNo":"LOCDR-171025-01","declare":true,"paid":true},{"id":153,"date":"2025-10-18","week":42,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-10-22","cash":0.0,"transfer":472.5,"total":472.5,"reference":"000116335","invoiceNo":"DRLOC-181025-01","paymentNo":"LOCDR-181025-01","declare":true,"paid":true},{"id":154,"date":"2025-10-22","week":43,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:00","end":"15:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-10-28","cash":0.0,"transfer":280.0,"total":280.0,"reference":"000061705","invoiceNo":"DRLOC-221025-01","paymentNo":"LOCDR-221025-01","declare":true,"paid":true},{"id":155,"date":"2025-10-22","week":43,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"18:00","end":"22:30","hours":4.5,"rate":40.0,"payable":180.0,"paymentDate":"2025-10-28","cash":0.0,"transfer":185.0,"total":185.0,"reference":"000061705","invoiceNo":"DRLOC-221025-02","paymentNo":"LOCDR-221025-02","declare":true,"paid":true},{"id":156,"date":"2025-10-23","week":43,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:00","end":"15:00","hours":7.0,"rate":40.0,"payable":280.0,"paymentDate":"2025-10-28","cash":0.0,"transfer":280.0,"total":280.0,"reference":"000061705","invoiceNo":"DRLOC-231025-01","paymentNo":"LOCDR-231025-01","declare":true,"paid":true},{"id":157,"date":"2025-10-24","week":43,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-10-30","cash":0.0,"transfer":170.0,"total":170.0,"reference":"000542971","invoiceNo":"DRLOC-241025-01","paymentNo":"LOCDR-241025-01","declare":true,"paid":true},{"id":158,"date":"2025-10-25","week":43,"clinic":"MEDIPRIMA","location":"BUKIT SENTOSA","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"13:00","end":"23:00","hours":10.0,"rate":45.0,"payable":450.0,"paymentDate":"2025-10-25","cash":461.0,"transfer":0.0,"total":461.0,"reference":"","invoiceNo":"DRLOC-251025-01","paymentNo":"LOCDR-251025-01","declare":false,"paid":true},{"id":159,"date":"2025-10-26","week":43,"clinic":"WECARE","location":"KOI PRIMA | PUCHONG","company":"WRM INTEGRATED (M) SDN B","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"13:00","end":"22:00","hours":9.0,"rate":40.0,"payable":360.0,"paymentDate":"2025-10-28","cash":0.0,"transfer":380.0,"total":380.0,"reference":"000152167","invoiceNo":"DRLOC-261025-01","paymentNo":"LOCDR-261025-01","declare":true,"paid":true},{"id":160,"date":"2025-10-27","week":44,"clinic":"SANCTUARY FAMILY CLINIC","location":"ECO SANCTUARY","company":"THE HOLISTIC FAMILY SDN","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"14:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-10-27","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000062563","invoiceNo":"DRLOC-271025-01","paymentNo":"LOCDR-271025-01","declare":true,"paid":true},{"id":161,"date":"2025-10-27","week":44,"clinic":"UTAMA","location":"KOTA KEMUNING","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"15:00","end":"21:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-10-30","cash":0.0,"transfer":285.0,"total":285.0,"reference":"000601613","invoiceNo":"DRLOC-271025-02","paymentNo":"LOCDR-271025-02","declare":true,"paid":true},{"id":162,"date":"2025-10-28","week":44,"clinic":"WECARE","location":"KOI PRIMA | PUCHONG","company":"WRM INTEGRATED (M) SDN B","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-11-10","cash":0.0,"transfer":210.0,"total":210.0,"reference":"000320566","invoiceNo":"DRLOC-281025-01","paymentNo":"LOCDR-281025-01","declare":true,"paid":true},{"id":163,"date":"2025-10-29","week":44,"clinic":"MEDIVIRON","location":"BUKIT BERUNTUNG","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:00","end":"13:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-10-29","cash":200.0,"transfer":0.0,"total":200.0,"reference":"","invoiceNo":"DRLOC-291025-01","paymentNo":"LOCDR-291025-01","declare":false,"paid":true},{"id":164,"date":"2025-10-29","week":44,"clinic":"SELCARE","location":"PUCHONG","company":"SELCARE CLINIC SDN. BHD.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-11-14","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000223368","invoiceNo":"DRLOC-291025-02","paymentNo":"LOCDR-291025-02","declare":true,"paid":true},{"id":165,"date":"2025-10-31","week":44,"clinic":"AURRALITE","location":"PELANGI DAMANSARA PJU 6","company":"POSH SKINTHETICS SDN BHD","companyReg":"202201045896","contactNo":"","email":"aurraliteclinicpj@gmail.com","shift":"DAY","start":"09:30","end":"15:00","hours":5.5,"rate":40.0,"payable":220.0,"paymentDate":"2025-11-03","cash":0.0,"transfer":220.0,"total":220.0,"reference":"000038984","invoiceNo":"DRLOC-031125-01","paymentNo":"LOCDR-031125-01","declare":true,"paid":true},{"id":166,"date":"2025-10-31","week":44,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-11-05","cash":0.0,"transfer":170.0,"total":170.0,"reference":"00024501","invoiceNo":"DRLOC-311025-02","paymentNo":"LOCDR-311025-02","declare":true,"paid":true},{"id":167,"date":"2025-11-01","week":44,"clinic":"KM 360","location":"SERDANG","company":"XXXXXX1329 360 MEDIC SERDANG","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:00","end":"20:00","hours":12.0,"rate":50.0,"payable":600.0,"paymentDate":"2025-11-21","cash":0.0,"transfer":600.0,"total":600.0,"reference":"000286435","invoiceNo":"DRLOC-011125-01","paymentNo":"LOCDR-011125-01","declare":true,"paid":true},{"id":168,"date":"2025-11-03","week":45,"clinic":"AURRALITE","location":"PELANGI DAMANSARA PJU 6","company":"POSH SKINTHETICS SDN BHD","companyReg":"202201045896","contactNo":"","email":"aurraliteclinicpj@gmail.com","shift":"DAY","start":"15:00","end":"21:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-11-03","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000038984","invoiceNo":"DRLOC-031125-01","paymentNo":"LOCDR-031125-01","declare":true,"paid":true},{"id":169,"date":"2025-11-05","week":45,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN. BHD.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-11-15","cash":0.0,"transfer":160.0,"total":160.0,"reference":"000086011","invoiceNo":"DRLOC-051125-01","paymentNo":"LOCDR-051125-01","declare":true,"paid":true},{"id":170,"date":"2025-11-06","week":45,"clinic":"UNIKLINIK","location":"TELOK PANGLIMA GARANG","company":"FA MEDICAL SDN BHD","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"23:00","end":"09:00","hours":10.0,"rate":35.0,"payable":350.0,"paymentDate":"2025-11-29","cash":0.0,"transfer":360.0,"total":360.0,"reference":"000156504","invoiceNo":"DRLOC-061125-01","paymentNo":"LOCDR-071125-01","declare":true,"paid":true},{"id":171,"date":"2025-11-07","week":45,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-11-12","cash":0.0,"transfer":174.25,"total":174.25,"reference":"000755796","invoiceNo":"DRLOC-071125-02","paymentNo":"LOCDR-071125-02","declare":true,"paid":true},{"id":172,"date":"2025-11-07","week":45,"clinic":"CARECLINICS","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"201701036463","contactNo":"60331878751","email":"unibanting@careclinics","shift":"NIGHT","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-11-10","cash":0.0,"transfer":321.0,"total":321.0,"reference":"000235338","invoiceNo":"DRLOC-071125-03","paymentNo":"LOCDR-081125-01","declare":true,"paid":true},{"id":173,"date":"2025-11-08","week":45,"clinic":"NENO","location":"SOCIAL ENTERPRISE","company":"NENO SDN. BHD.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"10:30","end":"11:00","hours":0.5,"rate":0,"payable":260.0,"paymentDate":"2025-11-13","cash":0.0,"transfer":235.0,"total":235.0,"reference":"000054358","invoiceNo":"DRLOC-081125-02","paymentNo":"LOCDR-081125-02","declare":true,"paid":true},{"id":174,"date":"2025-11-08","week":45,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"15:00","end":"21:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-11-12","cash":0.0,"transfer":254.25,"total":254.25,"reference":"000755796","invoiceNo":"DRLOC-081125-03","paymentNo":"LOCDR-081125-03","declare":true,"paid":true},{"id":175,"date":"2025-11-08","week":45,"clinic":"CARECLINICS","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"201701036463","contactNo":"60331878751","email":"unibanting@careclinics","shift":"NIGHT","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-11-10","cash":0.0,"transfer":310.0,"total":310.0,"reference":"000235339","invoiceNo":"DRLOC-081125-04","paymentNo":"LOCDR-091125-01","declare":true,"paid":true},{"id":176,"date":"2025-11-09","week":45,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-11-12","cash":0.0,"transfer":334.25,"total":334.25,"reference":"000755796","invoiceNo":"DRLOC-091125-02","paymentNo":"LOCDR-091125-02","declare":true,"paid":true},{"id":177,"date":"2025-11-10","week":46,"clinic":"SANCTUARY FAMILY CLINIC","location":"ECO SANCTUARY","company":"THE HOLISTIC FAMILY SDN","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"14:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-11-10","cash":0.0,"transfer":230.0,"total":230.0,"reference":"000026319","invoiceNo":"DRLOC-101125-01","paymentNo":"LOCDR-101125-01","declare":true,"paid":true},{"id":178,"date":"2025-11-10","week":46,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-11-12","cash":0.0,"transfer":174.25,"total":174.25,"reference":"000755796","invoiceNo":"DRLOC-101125-02","paymentNo":"LOCDR-101125-02","declare":true,"paid":true},{"id":179,"date":"2025-11-11","week":46,"clinic":"SANCTUARY FAMILY CLINIC","location":"ECO SANCTUARY","company":"THE HOLISTIC FAMILY SDN","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"14:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-11-11","cash":0.0,"transfer":230.0,"total":230.0,"reference":"000501455","invoiceNo":"DRLOC-111125-01","paymentNo":"LOCDR-111125-01","declare":true,"paid":true},{"id":180,"date":"2025-11-11","week":46,"clinic":"WECARE","location":"KOI PRIMA | PUCHONG","company":"WRM INTEGRATED (M) SDN.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-11-21","cash":0.0,"transfer":210.0,"total":210.0,"reference":"000053705","invoiceNo":"DRLOC-111125-02","paymentNo":"LOCDR-111125-02","declare":true,"paid":true},{"id":181,"date":"2025-11-12","week":46,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-11-19","cash":0.0,"transfer":162.0,"total":162.0,"reference":"000131579","invoiceNo":"DRLOC-121125-01","paymentNo":"LOCDR-121125-01","declare":true,"paid":true},{"id":182,"date":"2025-11-17","week":47,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-11-19","cash":0.0,"transfer":162.0,"total":162.0,"reference":"000131579","invoiceNo":"DRLOC-171125-01","paymentNo":"LOCDR-171125-01","declare":true,"paid":true},{"id":183,"date":"2025-11-18","week":47,"clinic":"WECARE","location":"KOI PRIMA | PUCHONG","company":"WRM INTEGRATED (M) SDN. B","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-11-28","cash":0.0,"transfer":210.0,"total":210.0,"reference":"000133017","invoiceNo":"DRLOC-181125-01","paymentNo":"LOCDR-181125-01","declare":true,"paid":true},{"id":184,"date":"2025-11-19","week":47,"clinic":"DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN. BHD.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-11-25","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000111499","invoiceNo":"DRLOC-191125-01","paymentNo":"LOCDR-191125-01","declare":true,"paid":true},{"id":185,"date":"2025-11-21","week":47,"clinic":"PERDANA POLYCLINICS","location":"SELAYANG","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"09:00","end":"15:00","hours":6.0,"rate":45.0,"payable":270.0,"paymentDate":"2025-11-21","cash":270.0,"transfer":0.0,"total":270.0,"reference":"","invoiceNo":"DRLOC-211125-01","paymentNo":"LOCDR-211125-01","declare":false,"paid":true},{"id":186,"date":"2025-11-21","week":47,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-11-29","cash":0.0,"transfer":160.0,"total":160.0,"reference":"000036492","invoiceNo":"DRLOC-211125-02","paymentNo":"LOCDR-211125-02","declare":true,"paid":true},{"id":187,"date":"2025-11-22","week":47,"clinic":"CARECLINIC","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-11-27","cash":0.0,"transfer":301.0,"total":301.0,"reference":"000118218","invoiceNo":"DRLOC-221125-01","paymentNo":"LOCDR-231125-01","declare":true,"paid":true},{"id":188,"date":"2025-11-23","week":47,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-11-29","cash":0.0,"transfer":333.0,"total":333.0,"reference":"000036492","invoiceNo":"DRLOC-231125-02","paymentNo":"LOCDR-231125-02","declare":true,"paid":true},{"id":189,"date":"2025-11-24","week":48,"clinic":"MEDIVIRON","location":"BUKIT BERUNTUNG","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:00","end":"13:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-11-24","cash":250.0,"transfer":0.0,"total":250.0,"reference":"","invoiceNo":"DRLOC-241125-01","paymentNo":"LOCDR-241125-01","declare":false,"paid":true},{"id":190,"date":"2025-11-26","week":48,"clinic":"MEDIVIRON","location":"BUKIT BERUNTUNG","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:00","end":"13:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-11-26","cash":225.0,"transfer":0.0,"total":225.0,"reference":"","invoiceNo":"DRLOC-261125-01","paymentNo":"LOCDR-261125-01","declare":false,"paid":true},{"id":191,"date":"2025-11-27","week":48,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-12-07","cash":0.0,"transfer":443.0,"total":443.0,"reference":"000118699","invoiceNo":"DRLOC-271125-01","paymentNo":"LOCDR-271125-01","declare":true,"paid":true},{"id":192,"date":"2025-11-28","week":48,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-12-07","cash":0.0,"transfer":443.0,"total":443.0,"reference":"000118699","invoiceNo":"DRLOC-281125-01","paymentNo":"LOCDR-281125-01","declare":true,"paid":true},{"id":193,"date":"2025-11-29","week":48,"clinic":"PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-12-07","cash":0.0,"transfer":443.0,"total":443.0,"reference":"000118699","invoiceNo":"DRLOC-291125-01","paymentNo":"LOCDR-291125-01","declare":true,"paid":true},{"id":194,"date":"2025-11-29","week":48,"clinic":"CARECLINIC KLINIK BANTING","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-12-01","cash":0.0,"transfer":304.0,"total":304.0,"reference":"IMEPS20251201100002050778229","invoiceNo":"DRLOC-291125-02","paymentNo":"LOCDR-301125-01","declare":true,"paid":true},{"id":195,"date":"2025-12-01","week":49,"clinic":"SANCTUARY FAMILY CLINIC","location":"TELUK PANGLIMA GARANG","company":"THE HOLISTIC FAMILY SDN.","companyReg":"","contactNo":"60386859461\n60102072722","email":"contact@sanctuaryfamilyclinic.com","shift":"DAY","start":"09:00","end":"14:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-12-01","cash":0.0,"transfer":225.0,"total":225.0,"reference":"000119478","invoiceNo":"DRLOC-011225-01","paymentNo":"LOCDR-011225-01","declare":true,"paid":true},{"id":196,"date":"2025-12-01","week":49,"clinic":"AURRALITE CLINIC","location":"PELANGI DAMANSARA PJU 6","company":"POSH SKINTHETICS SDN BHD","companyReg":"202201045896","contactNo":"","email":"aurraliteclinicpj@gmail.com","shift":"DAY","start":"15:00","end":"21:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-12-23","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000027906","invoiceNo":"DRLOC-011225-02","paymentNo":"LOCDR-011225-02","declare":true,"paid":true},{"id":197,"date":"2025-12-02","week":49,"clinic":"AURRALITE CLINIC","location":"PELANGI DAMANSARA PJU 6","company":"POSH SKINTHETICS SDN BHD","companyReg":"202201045896","contactNo":"","email":"aurraliteclinicpj@gmail.com","shift":"DAY","start":"15:00","end":"21:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-12-23","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000027906","invoiceNo":"DRLOC-021225-01","paymentNo":"LOCDR-021225-01","declare":true,"paid":true},{"id":198,"date":"2025-12-03","week":49,"clinic":"KLINIK WECARE","location":"","company":"WRM INTEGRATED (M) SDN. B","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-12-09","cash":0.0,"transfer":207.5,"total":207.5,"reference":"000110011","invoiceNo":"DRLOC-031225-01","paymentNo":"LOCDR-031225-01","declare":true,"paid":true},{"id":199,"date":"2025-12-05","week":49,"clinic":"KLINIK WECARE","location":"","company":"WRM INTEGRATED (M) SDN. B","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-12-09","cash":0.0,"transfer":207.5,"total":207.5,"reference":"000110011","invoiceNo":"DRLOC-051225-01","paymentNo":"LOCDR-051225-01","declare":true,"paid":true},{"id":200,"date":"2025-12-07","week":49,"clinic":"KLINIK PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-12-12","cash":0.0,"transfer":339.0,"total":339.0,"reference":"000027675","invoiceNo":"DRLOC-071225-01","paymentNo":"LOCDR-071225-01","declare":true,"paid":true},{"id":201,"date":"2025-12-08","week":50,"clinic":"SANCTUARY FAMILY CLINIC","location":"TELUK PANGLIMA GARANG","company":"THE HOLISTIC FAMILY SDN.","companyReg":"","contactNo":"60386859461\n60102072722","email":"contact@sanctuaryfamilyclinic.com","shift":"DAY","start":"09:00","end":"14:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-12-08","cash":0.0,"transfer":225.0,"total":225.0,"reference":"000068267","invoiceNo":"DRLOC-081225-01","paymentNo":"LOCDR-081225-01","declare":true,"paid":true},{"id":202,"date":"2025-12-08","week":50,"clinic":"KLINIK PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"17:00","end":"21:00","hours":4.0,"rate":40.0,"payable":160.0,"paymentDate":"2025-12-12","cash":0.0,"transfer":170.0,"total":170.0,"reference":"000027675","invoiceNo":"DRLOC-081225-02","paymentNo":"LOCDR-081225-02","declare":true,"paid":true},{"id":203,"date":"2025-12-08","week":50,"clinic":"KLINIK CARECLINIC BANTING","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"","contactNo":"","email":"","shift":"NIGHT","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-12-12","cash":0.0,"transfer":300.0,"total":300.0,"reference":"000222120","invoiceNo":"DRLOC-081225-03","paymentNo":"LOCDR-091225-01","declare":true,"paid":true},{"id":204,"date":"2025-12-10","week":50,"clinic":"KLINIK UTAMA 24 JAM","location":"JUGRA","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"16:00","end":"00:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-12-10","cash":328.0,"transfer":0.0,"total":328.0,"reference":"","invoiceNo":"DRLOC-101225-01","paymentNo":"LOCDR-101225-01","declare":false,"paid":true},{"id":205,"date":"2025-12-11","week":50,"clinic":"KLINIK PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-12-16","cash":0.0,"transfer":460.0,"total":460.0,"reference":"000015275","invoiceNo":"DRLOC-111225-01","paymentNo":"LOCDR-111225-01","declare":true,"paid":true},{"id":206,"date":"2025-12-12","week":50,"clinic":"KLINIK PEARL CITY","location":"BUKIT JALIL","company":"PEARL CITY CLINIC SDN BHD","companyReg":"","contactNo":"60388994767","email":"pearlcityclinic@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-12-16","cash":0.0,"transfer":460.0,"total":460.0,"reference":"000015275","invoiceNo":"DRLOC-121225-01","paymentNo":"LOCDR-121225-01","declare":true,"paid":true},{"id":207,"date":"2025-12-13","week":50,"clinic":"KLINIK UTAMA 24 JAM","location":"JUGRA","company":"","companyReg":"","contactNo":"60166019450","email":"","shift":"DAY","start":"16:00","end":"00:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-12-13","cash":324.0,"transfer":0.0,"total":324.0,"reference":"","invoiceNo":"DRLOC-131225-01","paymentNo":"LOCDR-131225-01","declare":false,"paid":true},{"id":208,"date":"2025-12-15","week":51,"clinic":"SANCTUARY FAMILY CLINIC","location":"TELOK PANGLIMA GARANG","company":"THE HOLISTIC FAMILY SDN.","companyReg":"","contactNo":"60386859461\n60102072722","email":"contact@sanctuaryfamilyclinic.com","shift":"DAY","start":"09:30","end":"14:30","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-12-15","cash":0.0,"transfer":225.0,"total":225.0,"reference":"000051072","invoiceNo":"DRLOC-151225-01","paymentNo":"LOCDR-151225-01","declare":true,"paid":true},{"id":209,"date":"2025-12-15","week":51,"clinic":"KLINIK DR CARE","location":"BANTING","company":"TOMS HEALTHCARE SDN. BHD.","companyReg":"","contactNo":"60173606277","email":"drcarebanting@gmail.com","shift":"DAY","start":"17:00","end":"23:00","hours":6.0,"rate":40.0,"payable":240.0,"paymentDate":"2025-12-27","cash":0.0,"transfer":240.0,"total":240.0,"reference":"000057831","invoiceNo":"DRLOC-151225-02","paymentNo":"LOCDR-151225-02","declare":true,"paid":true},{"id":210,"date":"2025-12-15","week":51,"clinic":"KLINIK CARECLINICS BANTING","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-12-17","cash":0.0,"transfer":300.0,"total":300.0,"reference":"000220032","invoiceNo":"DRLOC-151225-03","paymentNo":"LOCDR-161225-01","declare":true,"paid":true},{"id":211,"date":"2025-12-16","week":51,"clinic":"SELCARE CLINIC","location":"PUCHONG","company":"SELCARE CLINIC SDN. BHD.","companyReg":"","contactNo":"601126162234","email":"selcareclinic.puchong@gmail.com","shift":"DAY","start":"16:00","end":"00:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2026-01-12","cash":0.0,"transfer":320.0,"total":320.0,"reference":"000181282","invoiceNo":"DRLOC-161225-02","paymentNo":"LOCDR-161225-02","declare":true,"paid":true},{"id":212,"date":"2025-12-17","week":51,"clinic":"KLINIK UTAMA 24 JAM","location":"JUGRA","company":"","companyReg":"","contactNo":"60166019450","email":"","shift":"DAY","start":"16:00","end":"00:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-12-17","cash":334.0,"transfer":0.0,"total":334.0,"reference":"","invoiceNo":"DRLOC-171225-01","paymentNo":"LOCDR-171225-01","declare":false,"paid":true},{"id":213,"date":"2025-12-19","week":51,"clinic":"AURRALITE CLINIC","location":"PELANGI DAMANSARA PJU 6","company":"POSH SKINTHETICS SDN BHD","companyReg":"202201045896","contactNo":"","email":"aurraliteclinicpj@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-12-23","cash":0.0,"transfer":440.0,"total":440.0,"reference":"000027906","invoiceNo":"DRLOC-191225-01","paymentNo":"LOCDR-191225-01","declare":true,"paid":true},{"id":214,"date":"2025-12-20","week":51,"clinic":"AURRALITE CLINIC","location":"PELANGI DAMANSARA PJU 6","company":"POSH SKINTHETICS SDN BHD","companyReg":"202201045896","contactNo":"","email":"aurraliteclinicpj@gmail.com","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-12-23","cash":0.0,"transfer":320.0,"total":320.0,"reference":"000027906","invoiceNo":"DRLOC-201225-01","paymentNo":"LOCDR-201225-01","declare":true,"paid":true},{"id":215,"date":"2025-12-21","week":51,"clinic":"KLINIK UTAMA 24 JAM","location":"JUGRA","company":"","companyReg":"","contactNo":"60166019450","email":"","shift":"DAY","start":"08:00","end":"00:00","hours":16.0,"rate":40.0,"payable":640.0,"paymentDate":"2025-12-21","cash":651.0,"transfer":0.0,"total":651.0,"reference":"","invoiceNo":"DRLOC-211225-01","paymentNo":"LOCDR-211225-01","declare":false,"paid":true},{"id":216,"date":"2025-12-22","week":52,"clinic":"SANCTUARY FAMILY CLINIC","location":"TELOK PANGLIMA GARANG","company":"THE HOLISTIC FAMILY SDN.","companyReg":"","contactNo":"60386859461\n60102072722","email":"contact@sanctuaryfamilyclinic.com","shift":"DAY","start":"10:00","end":"15:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-12-22","cash":0.0,"transfer":225.0,"total":225.0,"reference":"000033622","invoiceNo":"DRLOC-221225-01","paymentNo":"LOCDR-221225-01","declare":true,"paid":true},{"id":217,"date":"2025-12-22","week":52,"clinic":"KLINIK WECARE","location":"","company":"WRM INTEGRATED (M) SDN.","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2025-12-26","cash":0.0,"transfer":210.0,"total":210.0,"reference":"000122262","invoiceNo":"DRLOC-221225-02","paymentNo":"LOCDR-221225-02","declare":true,"paid":true},{"id":218,"date":"2025-12-22","week":52,"clinic":"KLINIK CARECLINICS BANTING","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-12-24","cash":0.0,"transfer":310.0,"total":310.0,"reference":"000221399","invoiceNo":"DRLOC-221225-03","paymentNo":"LOCDR-231225-01","declare":true,"paid":true},{"id":219,"date":"2025-12-23","week":52,"clinic":"KLINIK WECARE","location":"","company":"WRM INTEGRATED (M) SDN. B","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2026-01-02","cash":0.0,"transfer":212.5,"total":212.5,"reference":"000130116","invoiceNo":"DRLOC-231225-02","paymentNo":"LOCDR-231225-02","declare":true,"paid":true},{"id":220,"date":"2025-12-24","week":52,"clinic":"KLINIK UTAMA 24 JAM","location":"JUGRA","company":"","companyReg":"","contactNo":"60166019450","email":"","shift":"DAY","start":"08:00","end":"00:00","hours":16.0,"rate":40.0,"payable":640.0,"paymentDate":"2025-12-24","cash":674.0,"transfer":0.0,"total":674.0,"reference":"","invoiceNo":"DRLOC-241225-01","paymentNo":"LOCDR-241225-01","declare":false,"paid":true},{"id":221,"date":"2025-12-25","week":52,"clinic":"POLIKLINIK MEDIPRIMA","location":"BUKIT SENTOSA","company":"","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"08:00","end":"23:00","hours":15.0,"rate":45.0,"payable":675.0,"paymentDate":"2025-12-25","cash":681.0,"transfer":0.0,"total":681.0,"reference":"","invoiceNo":"DRLOC-251225-01","paymentNo":"LOCDR-251225-01","declare":false,"paid":true},{"id":222,"date":"2025-12-26","week":52,"clinic":"AURRALITE CLINIC","location":"PELANGI DAMANSARA PJU 6","company":"POSH SKINTHETICS SDN BHD","companyReg":"202201045896","contactNo":"","email":"aurraliteclinicpj@gmail.com","shift":"DAY","start":"10:00","end":"21:00","hours":11.0,"rate":40.0,"payable":440.0,"paymentDate":"2025-12-30","cash":0.0,"transfer":440.0,"total":440.0,"reference":"000043348","invoiceNo":"DRLOC-261225-01","paymentNo":"LOCDR-261225-01","declare":true,"paid":true},{"id":223,"date":"2025-12-27","week":52,"clinic":"AURRALITE CLINIC","location":"PELANGI DAMANSARA PJU 6","company":"POSH SKINTHETICS SDN BHD","companyReg":"202201045896","contactNo":"","email":"aurraliteclinicpj@gmail.com","shift":"DAY","start":"10:00","end":"18:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-12-30","cash":0.0,"transfer":320.0,"total":320.0,"reference":"000043348","invoiceNo":"DRLOC-271225-01","paymentNo":"LOCDR-271225-01","declare":true,"paid":true},{"id":224,"date":"2025-12-27","week":52,"clinic":"KLINIK CARECLINICS BANTING","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"","contactNo":"","email":"","shift":"DAY","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-12-30","cash":0.0,"transfer":305.0,"total":305.0,"reference":"000172161","invoiceNo":"DRLOC-271225-02","paymentNo":"LOCDR-281225-01","declare":true,"paid":true},{"id":225,"date":"2025-12-28","week":52,"clinic":"KLINIK UTAMA 24 JAM","location":"JUGRA","company":"","companyReg":"","contactNo":"60166019450","email":"","shift":"DAY","start":"16:00","end":"00:00","hours":8.0,"rate":40.0,"payable":320.0,"paymentDate":"2025-12-28","cash":340.0,"transfer":0.0,"total":340.0,"reference":"","invoiceNo":"DRLOC-281225-02","paymentNo":"LOCDR-281225-02","declare":false,"paid":true},{"id":226,"date":"2025-12-29","week":53,"clinic":"SANCTUARY FAMILY CLINIC","location":"TELOK PANGLIMA GARANG","company":"THE HOLISTIC FAMILY SDN.","companyReg":"","contactNo":"60386859461\n60102072722","email":"contact@sanctuaryfamilyclinic.com","shift":"DAY","start":"10:00","end":"15:00","hours":5.0,"rate":45.0,"payable":225.0,"paymentDate":"2025-01-29","cash":0.0,"transfer":225.0,"total":225.0,"reference":"000255724","invoiceNo":"DRLOC-291225-01","paymentNo":"LOCDR-291225-01","declare":true,"paid":true},{"id":227,"date":"2025-12-29","week":53,"clinic":"KLINIK WECARE","location":"KOI PRIMA","company":"WRM INTEGRATED (M) SDN BHD","companyReg":"","contactNo":"60179240061","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2026-01-02","cash":0.0,"transfer":212.5,"total":212.5,"reference":"000130116","invoiceNo":"DRLOC-291225-02","paymentNo":"LOCDR-291225-02","declare":true,"paid":true},{"id":228,"date":"2025-12-29","week":53,"clinic":"KLINIK CARECLINICS BANTING","location":"BANTING","company":"CARECLINICS HEALTHCARE SERVICES SDN BHD","companyReg":"201701036463","contactNo":"60331878751","email":"unibanting@careclinics","shift":"DAY","start":"23:00","end":"09:00","hours":10.0,"rate":30.0,"payable":300.0,"paymentDate":"2025-12-31","cash":0.0,"transfer":311.0,"total":311.0,"reference":"000229716","invoiceNo":"DRLOC-291225-03","paymentNo":"LOCDR-301225-01","declare":true,"paid":true},{"id":229,"date":"2025-12-30","week":53,"clinic":"KLINIK WECARE","location":"KOI PRIMA","company":"WRM INTEGRATED (M) SDN BHD","companyReg":"","contactNo":"60179240061","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2026-01-10","cash":0.0,"transfer":200.0,"total":200.0,"reference":"000113037","invoiceNo":"DRLOC-301225-02","paymentNo":"LOCDR-301225-02","declare":true,"paid":true},{"id":230,"date":"2025-12-31","week":53,"clinic":"KLINIK WECARE","location":"KOI PRIMA","company":"WRM INTEGRATED (M) SDN BHD","companyReg":"","contactNo":"60179240061","email":"","shift":"DAY","start":"17:00","end":"22:00","hours":5.0,"rate":40.0,"payable":200.0,"paymentDate":"2026-01-10","cash":0.0,"transfer":195.0,"total":195.0,"reference":"000113037","invoiceNo":"DRLOC-311225-01","paymentNo":"LOCDR-311225-01","declare":true,"paid":true}];

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════
const RM = (n) => `RM ${Number(n||0).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const fmtDate = (d) => { try { return new Date(d).toLocaleDateString('en-MY',{day:'2-digit',month:'short',year:'numeric'}); } catch { return d; }};
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const weekNum = (d) => { const dt=new Date(d); dt.setHours(0,0,0,0); dt.setDate(dt.getDate()+3-((dt.getDay()+6)%7)); const w1=new Date(dt.getFullYear(),0,4); return 1+Math.round(((dt-w1)/864e5-3+((w1.getDay()+6)%7))/7); };

// ═══════════════════════════════════════════════════════════════════════════
// GOOGLE SHEETS CSV PARSER
// ═══════════════════════════════════════════════════════════════════════════
function parseGoogleSheetsCSV(csvText) {
  const lines = csvText.split('\n');
  const entries = [];
  let id = Date.now();
  
  for (let i = 0; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    if (row.length < 15) continue;
    
    const clinic = (row[4]||'').trim();
    if (!clinic || clinic === 'OFF' || clinic === 'CLINIC NAME') continue;
    if ((row[1]||'').includes('TOTAL') || (row[1]||'').includes('MONTH')) continue;
    
    const date = parseFlexDate(row[2]);
    if (!date) continue;
    
    let shift = (row[10]||'').trim().toUpperCase();
    if (shift !== 'DAY' && shift !== 'NIGHT') shift = 'DAY';
    
    const hours = parseDuration(row[14]) || parseDuration(row[15]) || 0;
    const rateStr = (row[16]||'').trim();
    const rate = rateStr === 'N/A' ? null : parseNum(rateStr);
    const payable = parseNum(row[17]);
    const cash = parseNum(row[19]);
    const transfer = parseNum(row[21]);
    const total = (cash + transfer) || payable;
    const declareStr = (row[24]||'').trim().toUpperCase();
    const declare = declareStr === 'Y' || declareStr === 'D';
    const refRaw = (row[20]||'').trim();
    const reference = extractRef(refRaw);
    const company = (row[6]||'').trim() || extractCompany(refRaw);
    const paid = (cash > 0 || transfer > 0) && !refRaw.toUpperCase().includes('PENDING');
    
    entries.push({
      id: id++, date, week: parseInt(row[1])||0, clinic, location: (row[5]||'').trim(),
      company, companyReg: (row[7]||'').trim(), contactNo: (row[8]||'').trim(), email: (row[9]||'').trim(),
      shift, start: parseTime(row[11]), end: parseTime(row[12]), hours, rate, payable,
      paymentDate: parseFlexDate(row[18])||'', cash, transfer, total, reference,
      invoiceNo: (row[22]||'').trim(), paymentNo: (row[23]||'').trim(), declare, paid,
    });
  }
  return entries;
}

function parseCSVLine(line) {
  const result = []; let current = ''; let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQuotes = !inQuotes; }
    else if (c === ',' && !inQuotes) { result.push(current); current = ''; }
    else { current += c; }
  }
  result.push(current);
  return result;
}

function parseFlexDate(d) {
  d = (d||'').trim();
  if (!d) return '';
  // DD-MM-YYYY or DD/MM/YYYY
  let m = d.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (m) { return `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`; }
  // YYYY-MM-DD
  m = d.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);
  if (m) { return `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`; }
  return '';
}

function parseTime(t) {
  t = (t||'').trim().replace(/\./g,':');
  if (!t || t === 'OFF') return '';
  const parts = t.split(':');
  if (parts.length >= 2) {
    try { return `${parseInt(parts[0]).toString().padStart(2,'0')}:${parseInt(parts[1]).toString().padStart(2,'0')}`; } catch {}
  }
  return t.substring(0,5);
}

function parseDuration(d) {
  d = (d||'').trim();
  if (!d || d === 'OFF') return 0;
  const p = d.split(':');
  try { return p.length >= 2 ? Math.round((parseInt(p[0]) + parseInt(p[1])/60)*100)/100 : parseFloat(d)||0; } catch { return 0; }
}

function parseNum(v) {
  v = String(v||'').trim().replace(/,/g,'');
  if (!v || v === 'N/A' || v === 'OFF') return 0;
  return parseFloat(v) || 0;
}

function extractRef(t) {
  t = (t||'').trim();
  if (!t || t === 'N/A') return '';
  let m = t.match(/NO\.?:?\s*(\d+)/);
  if (m) return m[1];
  m = t.match(/(IMEPS\d+)/);
  if (m) return m[1];
  return '';
}

function extractCompany(t) {
  if (!t || t === 'N/A') return '';
  const lines = t.split('\n').map(l=>l.trim()).filter(Boolean);
  for (const l of lines) {
    if (/SDN|BHD|PLT|HEALTHCARE|CLINIC/i.test(l)) {
      return l.replace(/^(CR\s*)?N?O?\.?:?\s*\d+\s*/i,'').trim();
    }
  }
  return '';
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB-SEPARATED PASTE PARSER (for direct Google Sheets paste)
// ═══════════════════════════════════════════════════════════════════════════
function parsePastedSheetData(text) {
  // Convert tab-separated to CSV-like and use the same parser
  const lines = text.split('\n');
  const entries = [];
  let id = Date.now();
  
  for (const line of lines) {
    const cols = line.split('\t');
    if (cols.length < 10) continue;
    
    const clinic = (cols[4]||cols[3]||'').trim();
    if (!clinic || clinic === 'OFF' || clinic === 'CLINIC NAME') continue;
    if ((cols[1]||'').includes('TOTAL') || (cols[0]||'').includes('MONTH')) continue;
    
    const date = parseFlexDate(cols[2]||cols[1]);
    if (!date) continue;
    
    let shift = 'DAY';
    for (const c of cols) { if (c.trim().toUpperCase() === 'NIGHT') { shift = 'NIGHT'; break; } }
    
    // Try to find numeric columns for hours, rate, payable, cash, transfer
    const nums = cols.map(c => parseNum(c)).filter(n => n > 0);
    
    entries.push({
      id: id++, date, week: parseInt(cols[1])||weekNum(date), clinic,
      location: (cols[5]||'').trim(), company: (cols[6]||'').trim(),
      shift, start: '', end: '', hours: 0, rate: null, payable: 0,
      paymentDate: '', cash: 0, transfer: 0, total: 0, reference: '',
      invoiceNo: '', paymentNo: '', declare: false, paid: false,
      companyReg: '', contactNo: '', email: '',
    });
  }
  return entries;
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
:root {
  --bg-0: #060B14; --bg-1: #0C1220; --bg-2: #131B2E; --bg-card: rgba(19,27,46,0.7);
  --border: rgba(0,245,212,0.06); --border-h: rgba(0,245,212,0.18);
  --text-1: #F1F5F9; --text-2: #94A3B8; --text-3: #475569;
  --accent: #00F5D4; --blue: #38BDF8; --yellow: #FBBF24; --pink: #F472B6; --red: #EF4444; --green: #34D399;
  --font: 'Outfit', system-ui, sans-serif; --mono: 'JetBrains Mono', monospace;
  --r: 12px; --r-sm: 8px; --r-lg: 16px;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg-0);color:var(--text-1);min-height:100vh;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(0,245,212,0.12);border-radius:3px}
input:focus,select:focus,textarea:focus{border-color:var(--accent)!important;box-shadow:0 0 0 3px rgba(0,245,212,0.08)!important}
input[type=checkbox]{appearance:none;width:17px;height:17px;border:2px solid var(--text-3);border-radius:4px;cursor:pointer;transition:all .15s;position:relative;flex-shrink:0}
input[type=checkbox]:checked{background:var(--accent);border-color:var(--accent)}
input[type=checkbox]:checked::after{content:'✓';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:11px;font-weight:800;color:var(--bg-0)}
select{cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:32px!important;appearance:none}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
.anim-in{animation:fadeIn .25s ease-out both}
.card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r-lg);backdrop-filter:blur(12px);transition:border-color .2s}
.card:hover{border-color:var(--border-h)}
.input{padding:9px 13px;background:rgba(6,11,20,0.5);border:1px solid var(--border);border-radius:var(--r-sm);color:var(--text-1);font-family:var(--font);font-size:13px;outline:none;transition:all .15s;width:100%}
.input::placeholder{color:var(--text-3)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:9px 18px;border:none;border-radius:var(--r);cursor:pointer;font-family:var(--font);font-weight:600;font-size:13px;transition:all .15s;white-space:nowrap}
.btn:active{transform:scale(.97)}
.btn-p{background:linear-gradient(135deg,var(--accent),var(--blue));color:var(--bg-0)}
.btn-p:hover{box-shadow:0 4px 18px rgba(0,245,212,0.25)}
.btn-g{background:rgba(148,163,184,0.08);color:var(--text-2);border:1px solid var(--border)}
.btn-g:hover{background:rgba(148,163,184,0.12);color:var(--text-1)}
.btn-d{background:rgba(239,68,68,0.1);color:var(--red);border:1px solid rgba(239,68,68,0.15)}
.btn-d:hover{background:rgba(239,68,68,0.2)}
.btn-i{padding:7px;background:rgba(0,245,212,0.06);border:1px solid var(--border);border-radius:var(--r-sm);color:var(--accent);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
.btn-i:hover{background:rgba(0,245,212,0.12);border-color:var(--border-h)}
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.t-day{background:rgba(251,191,36,0.12);color:var(--yellow)}
.t-night{background:rgba(244,114,182,0.12);color:var(--pink)}
.t-paid{background:rgba(0,245,212,0.1);color:var(--accent)}
.t-unpaid{background:rgba(239,68,68,0.1);color:var(--red)}
.t-tax{background:rgba(251,191,36,0.08);color:var(--yellow)}
.label{display:block;color:var(--text-2);font-size:11px;font-weight:600;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px}
.mono{font-family:var(--mono)}
.modal-bg{position:fixed;inset:0;background:rgba(6,11,20,0.85);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px;animation:fadeIn .1s ease-out}
.modal{width:100%;max-height:90vh;overflow:auto;background:var(--bg-1);border:1px solid var(--border-h);border-radius:var(--r-lg);box-shadow:0 8px 40px rgba(0,0,0,0.5);animation:scaleIn .15s ease-out}
.toast{position:fixed;bottom:20px;right:20px;padding:12px 18px;border-radius:var(--r);font-weight:500;font-size:13px;z-index:2000;animation:slideUp .25s ease-out;display:flex;align-items:center;gap:8px;box-shadow:0 8px 32px rgba(0,0,0,0.4)}
.toast-ok{background:rgba(0,245,212,0.12);border:1px solid var(--accent);color:var(--accent)}
.toast-err{background:rgba(239,68,68,0.12);border:1px solid var(--red);color:var(--red)}
@media print{body *{visibility:hidden}.print-area,.print-area *{visibility:visible!important}.print-area{position:absolute;left:0;top:0;width:100%;background:#fff!important;color:#000!important;padding:40px!important}.no-print{display:none!important}}
@media(max-width:768px){.desk{display:none!important}.stat-g{grid-template-columns:repeat(2,1fr)!important}.entry-r{flex-direction:column;align-items:stretch!important}.entry-act{width:100%;justify-content:flex-end;padding-top:8px;border-top:1px solid var(--border);margin-top:8px}.hdr-w{flex-direction:column;align-items:stretch!important}.fil-g{grid-template-columns:1fr 1fr!important}}
@media(max-width:480px){.stat-g{grid-template-columns:1fr!important}.fil-g{grid-template-columns:1fr!important}}
`;

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function Toast({msg, type='ok', onClose}) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return <div className={`toast toast-${type}`} onClick={onClose}>{type==='ok'?<CheckCircle2 size={16}/>:<AlertCircle size={16}/>}{msg}</div>;
}

function Confirm({msg, onYes, onNo}) {
  return (
    <div className="modal-bg" onClick={onNo}>
      <div className="modal" style={{maxWidth:380,padding:24}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:18}}>
          <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(239,68,68,0.12)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><AlertCircle size={18} color="var(--red)"/></div>
          <p style={{fontSize:14}}>{msg}</p>
        </div>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button className="btn btn-g" onClick={onNo}>Cancel</button>
          <button className="btn btn-d" onClick={onYes}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function Stat({icon:I, label, value, color, sub, delay=0}) {
  return (
    <div className="card anim-in" style={{padding:18,animationDelay:`${delay}ms`}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
        <div style={{width:34,height:34,borderRadius:9,background:`${color}10`,display:'flex',alignItems:'center',justifyContent:'center'}}><I size={16} color={color}/></div>
        {sub && <span style={{fontSize:11,color:'var(--text-3)'}}>{sub}</span>}
      </div>
      <div style={{color:'var(--text-2)',fontSize:11,fontWeight:600,marginBottom:3,textTransform:'uppercase',letterSpacing:'.5px'}}>{label}</div>
      <div className="mono" style={{fontSize:20,fontWeight:700,color,lineHeight:1.2}}>{value}</div>
    </div>
  );
}

function BarChart({data, height=140}) {
  if (!data.length) return null;
  const max = Math.max(...data.map(d=>d.v), 1);
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:3,height,padding:'0 2px'}}>
      {data.map((d,i) => (
        <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
          <div className="mono" style={{fontSize:9,color:'var(--text-3)',whiteSpace:'nowrap'}}>{d.v>0?`${(d.v/1000).toFixed(1)}k`:''}</div>
          <div style={{width:'100%',maxWidth:28,height:`${Math.max((d.v/max)*(height-36),2)}px`,background:`linear-gradient(180deg,var(--accent),var(--blue))`,borderRadius:'3px 3px 0 0',opacity:.8,transition:'all .4s ease-out'}} title={`${d.l}: ${RM(d.v)}`}/>
          <div style={{fontSize:9,color:'var(--text-3)',textAlign:'center'}}>{d.l}</div>
        </div>
      ))}
    </div>
  );
}

function EntryForm({initial, onSave, onClose, clinics}) {
  const [f, setF] = useState(initial || {
    date:new Date().toISOString().split('T')[0], clinic:'', location:'', shift:'DAY',
    start:'09:00', end:'17:00', hours:8, rate:40, payable:320, cash:0, transfer:0,
    total:320, paid:false, declare:false, reference:'', company:'', paymentDate:'',
    week:1, companyReg:'', contactNo:'', email:'', invoiceNo:'', paymentNo:'',
  });
  const up = useCallback((k,v) => {
    setF(p => {
      const u = {...p, [k]:v};
      if (k==='start'||k==='end') {
        const [sh,sm]=(u.start||'00:00').split(':').map(Number);
        const [eh,em]=(u.end||'00:00').split(':').map(Number);
        let s=sh*60+sm, e=eh*60+em;
        if(e<=s) e+=1440;
        u.hours=parseFloat(((e-s)/60).toFixed(1));
      }
      if(k==='hours'||k==='rate'){u.payable=parseFloat(((u.hours||0)*(u.rate||0)).toFixed(2));if(!u.cash&&!u.transfer)u.total=u.payable;}
      if(k==='cash'||k==='transfer'){u.total=(parseFloat(u.cash)||0)+(parseFloat(u.transfer)||0);}
      if(k==='date')u.week=weekNum(v);
      return u;
    });
  },[]);
  const save = () => { if(!f.clinic.trim()||!f.date) return; onSave({...f, week:weekNum(f.date)}); };
  
  const fields = [
    {l:'Date',k:'date',t:'date',s:2},{l:'Clinic',k:'clinic',t:'text',dl:clinics},{l:'Location',k:'location',t:'text'},
    {l:'Shift',k:'shift',t:'select',opts:[{v:'DAY',l:'Day'},{v:'NIGHT',l:'Night'}]},{l:'Company',k:'company',t:'text'},
    {l:'Start',k:'start',t:'time'},{l:'End',k:'end',t:'time'},{l:'Hours',k:'hours',t:'number'},
    {l:'Rate/hr',k:'rate',t:'number'},{l:'Cash (RM)',k:'cash',t:'number'},{l:'Transfer (RM)',k:'transfer',t:'number'},
    {l:'Total (RM)',k:'total',t:'number',hi:1},{l:'Reference',k:'reference',t:'text'},{l:'Payment Date',k:'paymentDate',t:'date'},
    {l:'Contact No.',k:'contactNo',t:'text'},{l:'Email',k:'email',t:'text'},
    {l:'Invoice No.',k:'invoiceNo',t:'text'},{l:'Payment No.',k:'paymentNo',t:'text'},
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
      {fields.map(fi=>(
        <div key={fi.k} style={{gridColumn:fi.s?`span ${fi.s}`:undefined}}>
          <label className="label">{fi.l}</label>
          {fi.t==='select'?
            <select className="input" value={f[fi.k]} onChange={e=>up(fi.k,e.target.value)}>{fi.opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>
          :
            <><input className="input" type={fi.t} value={fi.t==='number'?(f[fi.k]??''):f[fi.k]} onChange={e=>up(fi.k,fi.t==='number'?(parseFloat(e.target.value)||(fi.k==='rate'?null:0)):e.target.value)} list={fi.dl?`dl-${fi.k}`:undefined} style={fi.hi?{background:'rgba(0,245,212,0.05)',borderColor:'rgba(0,245,212,0.15)'}:undefined} step={fi.t==='number'?'0.01':undefined}/>
            {fi.dl&&<datalist id={`dl-${fi.k}`}>{fi.dl.map(c=><option key={c} value={c}/>)}</datalist>}</>
          }
        </div>
      ))}
      <div style={{gridColumn:'span 2',display:'flex',gap:16,alignItems:'center',padding:'6px 0'}}>
        <label style={{display:'flex',alignItems:'center',gap:7,cursor:'pointer',fontSize:13}}><input type="checkbox" checked={f.paid} onChange={e=>up('paid',e.target.checked)}/>Paid</label>
        <label style={{display:'flex',alignItems:'center',gap:7,cursor:'pointer',fontSize:13}}><input type="checkbox" checked={f.declare} onChange={e=>up('declare',e.target.checked)}/>Declare for Tax</label>
      </div>
      <div style={{gridColumn:'span 2',display:'flex',gap:8,justifyContent:'flex-end',paddingTop:8,borderTop:'1px solid var(--border)'}}>
        <button className="btn btn-g" onClick={onClose}>Cancel</button>
        <button className="btn btn-p" onClick={save}><Check size={14}/>{initial?.id?'Update':'Save'}</button>
      </div>
    </div>
  );
}

function PrintDoc({entry, type, onClose, name, mmc}) {
  const ref = useRef();
  const isInv = type==='invoice';
  const num = isInv?`INV-${entry.date.replace(/-/g,'')}`:`RCP-${entry.date.replace(/-/g,'')}`;
  const print = () => {
    const w = window.open('','_blank','width=800,height=600');
    w.document.write(`<html><head><title>${isInv?'Invoice':'Receipt'} ${num}</title><style>body{font-family:'Outfit',system-ui;margin:0;padding:40px;color:#1a1a1a}.hdr{display:flex;justify-content:space-between;margin-bottom:28px;padding-bottom:16px;border-bottom:3px solid #00C9A7}.title{font-size:26px;font-weight:700;letter-spacing:2px}.sub{font-size:12px;color:#666;margin-top:4px}.sec{background:#f8fafb;padding:14px 18px;border-radius:8px;margin-bottom:14px;border-left:3px solid #00C9A7}.row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid #eee}.row:last-child{border:none}.total{font-size:26px;font-weight:700;color:#00A896;text-align:center;padding:20px 0}.stamp{text-align:center;border:2px solid #00A896;color:#00A896;padding:10px 24px;font-weight:700;border-radius:8px;display:inline-block}.ft{margin-top:32px;padding-top:14px;border-top:1px solid #ddd;font-size:11px;color:#999;text-align:center}</style></head><body>`);
    w.document.write(ref.current.innerHTML);
    w.document.write('</body></html>');
    w.document.close(); w.focus(); setTimeout(()=>w.print(),300);
  };
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" style={{maxWidth:520}} onClick={e=>e.stopPropagation()}>
        <div ref={ref} style={{background:'#fff',color:'#1a1a1a',padding:28}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:24,paddingBottom:14,borderBottom:'3px solid #00C9A7'}}>
            <div><div style={{fontSize:24,fontWeight:700,letterSpacing:2}}>{isInv?'INVOICE':'PAYMENT RECEIPT'}</div><div style={{fontSize:12,color:'#666',marginTop:4}}>#{num}</div></div>
            <div style={{textAlign:'right',fontSize:12,color:'#666'}}><div>Date: {fmtDate(new Date().toISOString())}</div><div>Shift: {fmtDate(entry.date)}</div></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
            <div><div style={{fontSize:10,color:'#999',textTransform:'uppercase',letterSpacing:1,marginBottom:3}}>From</div><div style={{fontWeight:600,fontSize:14}}>{name||'Dr. ________________'}</div>{mmc&&<div style={{fontSize:12,color:'#666'}}>MMC: {mmc}</div>}</div>
            <div><div style={{fontSize:10,color:'#999',textTransform:'uppercase',letterSpacing:1,marginBottom:3}}>Bill To</div><div style={{fontWeight:600,fontSize:14}}>{entry.company||entry.clinic}</div><div style={{fontSize:12,color:'#666'}}>{entry.location}</div></div>
          </div>
          <div style={{background:'#f8fafb',padding:'12px 16px',borderRadius:8,marginBottom:14,borderLeft:'3px solid #00C9A7'}}>
            <div style={{fontWeight:600,marginBottom:4}}>{entry.clinic}</div>
            <div style={{fontSize:12,color:'#666'}}>{entry.location} — {entry.shift} shift • {entry.start}–{entry.end}</div>
          </div>
          {[{l:'Hours Worked',v:`${entry.hours}h`},{l:'Rate',v:entry.rate?`RM ${entry.rate}/hr`:'Flat Rate'},{l:'Amount',v:RM(entry.payable)},
            ...(!isInv?[{l:'Payment',v:entry.cash>0?'Cash':'Transfer'},...(entry.reference?[{l:'Reference',v:entry.reference}]:[]),...(entry.paymentDate?[{l:'Paid On',v:fmtDate(entry.paymentDate)}]:[])]:[])]
            .map((r,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #eee'}}><span style={{color:'#666',fontSize:13}}>{r.l}</span><span style={{fontWeight:500,fontSize:13}}>{r.v}</span></div>)}
          <div style={{fontSize:26,fontWeight:700,color:'#00A896',textAlign:'center',padding:'20px 0'}}>{RM(isInv?entry.payable:entry.total)}</div>
          {!isInv&&entry.paid&&<div style={{textAlign:'center',marginBottom:14}}><span style={{border:'2px solid #00A896',color:'#00A896',padding:'8px 24px',fontWeight:700,borderRadius:8,display:'inline-block',letterSpacing:1}}>✓ PAID</span></div>}
          <div style={{marginTop:28,paddingTop:14,borderTop:'1px solid #ddd',fontSize:10,color:'#999',textAlign:'center'}}>Generated by Locum Manager • {new Date().toLocaleDateString('en-MY')}</div>
        </div>
        <div className="no-print" style={{display:'flex',gap:8,padding:16,background:'var(--bg-1)',borderTop:'1px solid var(--border)'}}>
          <button className="btn btn-g" style={{flex:1}} onClick={onClose}>Close</button>
          <button className="btn btn-p" style={{flex:1}} onClick={print}><Printer size={14}/>Print</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GOOGLE SHEETS IMPORT MODAL
// ═══════════════════════════════════════════════════════════════════════════
function ImportModal({onClose, onImportCSV, onImportPaste, onImportJSON, toast}) {
  const [tab, setTab] = useState('csv');
  const [pasteText, setPasteText] = useState('');
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();
  const jsonRef = useRef();
  
  const handleCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const entries = parseGoogleSheetsCSV(ev.target.result);
      setPreview({count:entries.length, data:entries, source:'csv'});
    };
    reader.readAsText(file);
  };
  
  const handleJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (Array.isArray(d)) setPreview({count:d.length, data:d, source:'json'});
      } catch { toast('Invalid JSON','err'); }
    };
    reader.readAsText(file);
  };
  
  const handlePaste = () => {
    if (!pasteText.trim()) return;
    // Check if it's CSV or tab-separated
    const entries = pasteText.includes('\t') ? parsePastedSheetData(pasteText) : parseGoogleSheetsCSV(pasteText);
    setPreview({count:entries.length, data:entries, source:'paste'});
  };
  
  const confirmImport = (mode) => {
    if (!preview?.data?.length) return;
    if (mode === 'replace') {
      onImportCSV(preview.data);
    } else {
      onImportCSV(preview.data, true); // append
    }
    onClose();
  };
  
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" style={{maxWidth:560,padding:24}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <h2 style={{fontSize:17,fontWeight:700}}>Import Data</h2>
          <button className="btn-i" onClick={onClose}><X size={16}/></button>
        </div>
        
        {/* Tabs */}
        <div style={{display:'flex',gap:4,marginBottom:16,padding:4,background:'rgba(6,11,20,0.5)',borderRadius:10}}>
          {[{id:'csv',icon:FileSpreadsheet,label:'Google Sheets CSV'},{id:'paste',icon:ClipboardPaste,label:'Paste Data'},{id:'json',icon:FileText,label:'JSON Backup'}].map(t=>(
            <button key={t.id} className="btn" onClick={()=>{setTab(t.id);setPreview(null);}} style={{flex:1,background:tab===t.id?'rgba(0,245,212,0.1)':'transparent',color:tab===t.id?'var(--accent)':'var(--text-3)',border:tab===t.id?'1px solid rgba(0,245,212,0.15)':'1px solid transparent',borderRadius:8,padding:'8px 12px',fontSize:12}}>
              <t.icon size={14}/>{t.label}
            </button>
          ))}
        </div>
        
        {/* CSV Tab */}
        {tab==='csv' && (
          <div>
            <p style={{fontSize:13,color:'var(--text-2)',marginBottom:12,lineHeight:1.5}}>
              Export your Google Sheet as CSV: <span style={{color:'var(--accent)'}}>File → Download → Comma-separated values (.csv)</span>
            </p>
            <div style={{border:'2px dashed var(--border)',borderRadius:12,padding:28,textAlign:'center',cursor:'pointer',transition:'all .2s'}} onClick={()=>fileRef.current?.click()} onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor='var(--accent)'}} onDragLeave={e=>{e.currentTarget.style.borderColor=''}} onDrop={e=>{e.preventDefault();e.currentTarget.style.borderColor='';const f=e.dataTransfer.files[0];if(f){const r=new FileReader();r.onload=ev=>{const entries=parseGoogleSheetsCSV(ev.target.result);setPreview({count:entries.length,data:entries,source:'csv'});};r.readAsText(f);}}}>
              <Upload size={28} color="var(--text-3)" style={{marginBottom:8}}/>
              <div style={{fontSize:13,color:'var(--text-2)'}}>Drop CSV file here or click to browse</div>
              <div style={{fontSize:11,color:'var(--text-3)',marginTop:4}}>Supports your Master Chart format</div>
            </div>
            <input ref={fileRef} type="file" accept=".csv,.txt" style={{display:'none'}} onChange={handleCSV}/>
          </div>
        )}
        
        {/* Paste Tab */}
        {tab==='paste' && (
          <div>
            <p style={{fontSize:13,color:'var(--text-2)',marginBottom:12,lineHeight:1.5}}>
              Select rows in Google Sheets → <span style={{color:'var(--accent)'}}>Ctrl+C</span> → Paste below (or paste CSV text)
            </p>
            <textarea className="input" rows={8} value={pasteText} onChange={e=>setPasteText(e.target.value)} placeholder="Paste your Google Sheets data here..." style={{fontFamily:'var(--mono)',fontSize:11,resize:'vertical',marginBottom:10}}/>
            <button className="btn btn-p" onClick={handlePaste} style={{width:'100%'}}><ClipboardPaste size={14}/>Parse Pasted Data</button>
          </div>
        )}
        
        {/* JSON Tab */}
        {tab==='json' && (
          <div>
            <p style={{fontSize:13,color:'var(--text-2)',marginBottom:12}}>Import a previously exported JSON backup file.</p>
            <button className="btn btn-g" onClick={()=>jsonRef.current?.click()} style={{width:'100%'}}><Upload size={14}/>Choose JSON File</button>
            <input ref={jsonRef} type="file" accept=".json" style={{display:'none'}} onChange={handleJSON}/>
          </div>
        )}
        
        {/* Preview */}
        {preview && (
          <div className="anim-in" style={{marginTop:16,padding:14,background:'rgba(0,245,212,0.04)',borderRadius:10,border:'1px solid rgba(0,245,212,0.1)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
              <CheckCircle2 size={16} color="var(--accent)"/>
              <span style={{fontWeight:600,fontSize:13}}>{preview.count} entries found</span>
            </div>
            <div style={{maxHeight:120,overflow:'auto',fontSize:11,color:'var(--text-2)',marginBottom:12}}>
              {preview.data.slice(0,5).map((e,i)=>(
                <div key={i} style={{padding:'4px 0',borderBottom:'1px solid var(--border)'}}>{e.date} • {e.clinic} • {e.location} • {RM(e.total)}</div>
              ))}
              {preview.count>5&&<div style={{padding:'4px 0',color:'var(--text-3)'}}>...and {preview.count-5} more</div>}
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-p" style={{flex:1}} onClick={()=>confirmImport('replace')}><RefreshCw size={14}/>Replace All Data</button>
              <button className="btn btn-g" style={{flex:1}} onClick={()=>confirmImport('append')}><Plus size={14}/>Append to Existing</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SETTINGS MODAL
// ═══════════════════════════════════════════════════════════════════════════
function SettingsModal({onClose, name, setName, mmc, setMmc, onExport, onReset}) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" style={{maxWidth:440,padding:24}} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <h2 style={{fontSize:17,fontWeight:700}}>Settings</h2>
          <button className="btn-i" onClick={onClose}><X size={16}/></button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div><label className="label">Doctor Name</label><input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Dr. John Doe"/></div>
          <div><label className="label">MMC Number</label><input className="input" value={mmc} onChange={e=>setMmc(e.target.value)} placeholder="e.g. 12345"/></div>
          <div style={{borderTop:'1px solid var(--border)',paddingTop:14,marginTop:4}}>
            <label className="label" style={{marginBottom:10}}>Export Data</label>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <button className="btn btn-g" onClick={()=>onExport('json')}><Download size={14}/>JSON</button>
              <button className="btn btn-g" onClick={()=>onExport('csv')}><Download size={14}/>CSV</button>
              <button className="btn btn-d" onClick={onReset}><Trash2 size={14}/>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
export default function LocumManager() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({month:'',year:'',shift:'',clinic:'',paid:''});
  const [showFilters, setShowFilters] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [printEntry, setPrintEntry] = useState(null);
  const [printType, setPrintType] = useState('invoice');
  const [showSettings, setShowSettings] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [delConfirm, setDelConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [name, setName] = useState('');
  const [mmc, setMmc] = useState('');
  const [page, setPage] = useState(0);
  const PER_PAGE = 25;

  // Load/Save
  useEffect(() => {
    try {
      const s = localStorage.getItem('locum-data');
      setData(s ? JSON.parse(s) : INITIAL_DATA);
      setName(localStorage.getItem('locum-name')||'');
      setMmc(localStorage.getItem('locum-mmc')||'');
    } catch { setData(INITIAL_DATA); }
    setLoaded(true);
  }, []);

  useEffect(() => { if(loaded&&data.length) localStorage.setItem('locum-data',JSON.stringify(data)); }, [data,loaded]);
  useEffect(() => { if(loaded){localStorage.setItem('locum-name',name);localStorage.setItem('locum-mmc',mmc);} }, [name,mmc,loaded]);

  const notify = (m,t='ok') => setToast({m,t});

  // Derived
  const clinics = useMemo(() => [...new Set(data.map(d=>d.clinic))].sort(), [data]);
  const years = useMemo(() => [...new Set(data.map(d=>new Date(d.date).getFullYear()))].sort((a,b)=>b-a), [data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(e => {
      if(q && !e.clinic.toLowerCase().includes(q) && !e.location.toLowerCase().includes(q) && !(e.company||'').toLowerCase().includes(q) && !(e.reference||'').toLowerCase().includes(q)) return false;
      const d = new Date(e.date);
      if(filters.month && d.getMonth()!==parseInt(filters.month)) return false;
      if(filters.year && d.getFullYear()!==parseInt(filters.year)) return false;
      if(filters.shift && e.shift!==filters.shift) return false;
      if(filters.clinic && e.clinic!==filters.clinic) return false;
      if(filters.paid && (filters.paid==='paid'?!e.paid:e.paid)) return false;
      return true;
    }).sort((a,b) => new Date(b.date)-new Date(a.date));
  }, [data,search,filters]);

  const stats = useMemo(() => {
    let s={earn:0,hrs:0,n:data.length,cash:0,xfer:0,dec:0,clinics:new Set(),rateS:0,rateN:0};
    data.forEach(d=>{s.earn+=d.total||0;s.hrs+=d.hours||0;s.cash+=d.cash||0;s.xfer+=d.transfer||0;if(d.declare)s.dec+=d.total||0;s.clinics.add(d.clinic);if(d.rate){s.rateS+=d.rate;s.rateN++;}});
    s.avgRate=s.rateN?s.rateS/s.rateN:0;s.cN=s.clinics.size;return s;
  }, [data]);

  const monthly = useMemo(() => {
    const m={};
    data.forEach(e=>{const d=new Date(e.date);const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;if(!m[k])m[k]={t:0,h:0,n:0,d:0,c:0,x:0};m[k].t+=e.total||0;m[k].h+=e.hours||0;m[k].n++;if(e.declare)m[k].d+=e.total||0;m[k].c+=e.cash||0;m[k].x+=e.transfer||0;});
    return Object.entries(m).sort((a,b)=>a[0].localeCompare(b[0]));
  }, [data]);

  const clinicRank = useMemo(() => {
    const m={};
    data.forEach(e=>{if(!m[e.clinic])m[e.clinic]={t:0,h:0,n:0};m[e.clinic].t+=e.total||0;m[e.clinic].h+=e.hours||0;m[e.clinic].n++;});
    return Object.entries(m).sort((a,b)=>b[1].t-a[1].t);
  }, [data]);

  // Handlers
  const addEntry = e => { setData(p=>[...p,{...e,id:Date.now()}]); setShowAdd(false); notify('Entry added'); };
  const updateEntry = e => { setData(p=>p.map(d=>d.id===e.id?e:d)); setEditEntry(null); notify('Entry updated'); };
  const deleteEntry = id => { setData(p=>p.filter(d=>d.id!==id)); setDelConfirm(null); notify('Entry deleted'); };

  const handleImport = (entries, append=false) => {
    if(append) { setData(p=>[...p,...entries.map((e,i)=>({...e,id:Date.now()+i}))]); notify(`Appended ${entries.length} entries`); }
    else { setData(entries); notify(`Imported ${entries.length} entries`); }
  };

  const handleExport = (fmt) => {
    if(fmt==='csv'){
      const h=['Date','Week','Clinic','Location','Shift','Start','End','Hours','Rate','Payable','Cash','Transfer','Total','Paid','Declare','Payment Date','Reference','Company','Invoice No','Payment No','Contact','Email'];
      const rows=data.map(d=>[d.date,d.week,d.clinic,d.location,d.shift,d.start,d.end,d.hours,d.rate||'',d.payable,d.cash,d.transfer,d.total,d.paid?'Y':'N',d.declare?'Y':'N',d.paymentDate||'',d.reference||'',d.company||'',d.invoiceNo||'',d.paymentNo||'',d.contactNo||'',d.email||'']);
      const csv=[h.join(','),...rows.map(r=>r.map(c=>`"${c}"`).join(','))].join('\n');
      dl(csv,'text/csv',`locum-${new Date().toISOString().split('T')[0]}.csv`);
    } else {
      dl(JSON.stringify(data,null,2),'application/json',`locum-${new Date().toISOString().split('T')[0]}.json`);
    }
    notify(`${fmt.toUpperCase()} exported`);
  };

  const dl = (content,type,name) => { const b=new Blob([content],{type}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download=name; a.click(); URL.revokeObjectURL(u); };
  const handleReset = () => { if(confirm('Reset all data to original 230 entries?')){ setData(INITIAL_DATA); localStorage.setItem('locum-data',JSON.stringify(INITIAL_DATA)); notify('Data reset'); }};

  // Pagination
  const pageData = useMemo(() => filtered.slice(page*PER_PAGE, (page+1)*PER_PAGE), [filtered, page]);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  useEffect(() => setPage(0), [search, filters]);

  const tabs = [{id:'dashboard',l:'Dashboard',i:TrendingUp},{id:'entries',l:'Entries',i:Calendar},{id:'analytics',l:'Analytics',i:BarChart3}];

  if(!loaded) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg-0)'}}>
      <style>{CSS}</style>
      <div style={{textAlign:'center'}}><div style={{width:32,height:32,border:'3px solid var(--border)',borderTopColor:'var(--accent)',borderRadius:'50%',animation:'spin .7s linear infinite',margin:'0 auto 12px'}}/><div style={{color:'var(--text-2)',fontSize:13}}>Loading 230 entries...</div></div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <><style>{CSS}</style>
    <div style={{maxWidth:1100,margin:'0 auto',padding:'14px 16px 36px'}}>
      {/* Header */}
      <header className="card hdr-w" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 20px',marginBottom:16,flexWrap:'wrap',gap:10}}>
        <div>
          <h1 style={{fontSize:23,fontWeight:800,background:'linear-gradient(135deg,var(--accent),var(--blue))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1.2}}>Locum Manager</h1>
          <p style={{color:'var(--text-3)',fontSize:12,marginTop:1}}>{stats.n} shifts • {stats.cN} clinics • {RM(stats.earn)}</p>
        </div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <button className="btn-i" onClick={()=>setShowImport(true)} title="Import from Google Sheets" style={{width:36,height:36}}><FileSpreadsheet size={16}/></button>
          <button className="btn-i" onClick={()=>setShowSettings(true)} title="Settings" style={{width:36,height:36}}><Settings size={16}/></button>
          <button className="btn btn-p" onClick={()=>setShowAdd(true)}><Plus size={14}/>Add</button>
        </div>
      </header>

      {/* Nav */}
      <nav className="card" style={{display:'flex',gap:3,padding:5,marginBottom:16}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className="btn" style={{flex:1,background:tab===t.id?'rgba(0,245,212,0.08)':'transparent',border:tab===t.id?'1px solid rgba(0,245,212,0.12)':'1px solid transparent',color:tab===t.id?'var(--accent)':'var(--text-3)',borderRadius:9,padding:'9px 14px',fontSize:12}}>
            <t.i size={14}/>{t.l}
          </button>
        ))}
      </nav>

      {/* ═══ DASHBOARD ═══ */}
      {tab==='dashboard'&&(
        <div className="anim-in" style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="stat-g" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:10}}>
            <Stat icon={DollarSign} label="Total Earnings" value={RM(stats.earn)} color="var(--accent)" sub={`~${RM(stats.earn/Math.max(stats.n,1))}/shift`}/>
            <Stat icon={Clock} label="Total Hours" value={`${stats.hrs.toFixed(1)}h`} color="var(--blue)" sub={`~${(stats.hrs/Math.max(stats.n,1)).toFixed(1)}h/shift`} delay={50}/>
            <Stat icon={Calendar} label="Total Shifts" value={stats.n} color="var(--yellow)" sub={`${stats.cN} clinics`} delay={100}/>
            <Stat icon={TrendingUp} label="Tax Declarable" value={RM(stats.dec)} color="var(--pink)" sub={`${Math.round(stats.dec/Math.max(stats.earn,1)*100)}% of total`} delay={150}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:10}}>
            <div className="card" style={{padding:18}}>
              <h3 style={{color:'var(--text-3)',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:14}}>Payment Breakdown</h3>
              {[{l:'Cash',v:stats.cash,c:'var(--accent)'},{l:'Transfer',v:stats.xfer,c:'var(--blue)'},{l:'Tax Declarable',v:stats.dec,c:'var(--yellow)'}].map((x,i)=>(
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><span style={{color:'var(--text-2)',fontSize:12}}>{x.l}</span><span className="mono" style={{color:x.c,fontWeight:600,fontSize:12}}>{RM(x.v)}</span></div>
                  <div style={{height:3,background:'rgba(255,255,255,0.04)',borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:`${x.v/Math.max(stats.earn,1)*100}%`,background:x.c,borderRadius:2,transition:'width .8s'}}/></div>
                </div>
              ))}
              <div style={{borderTop:'1px solid var(--border)',marginTop:6,paddingTop:10,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontWeight:600,fontSize:12}}>Avg Rate</span><span className="mono" style={{color:'var(--accent)',fontWeight:600,fontSize:12}}>RM {stats.avgRate.toFixed(2)}/hr</span>
              </div>
            </div>
            <div className="card" style={{padding:18,maxHeight:320,overflow:'auto'}}>
              <h3 style={{color:'var(--text-3)',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:14}}>Monthly Summary</h3>
              {[...monthly].reverse().map(([k,d])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 10px',background:'rgba(0,245,212,0.02)',borderRadius:7,marginBottom:5,border:'1px solid var(--border)'}}>
                  <div><div style={{fontWeight:600,fontSize:13}}>{MONTHS[parseInt(k.split('-')[1])-1]} {k.split('-')[0]}</div><div style={{fontSize:11,color:'var(--text-3)'}}>{d.n} shifts • {d.h.toFixed(1)}h</div></div>
                  <div style={{textAlign:'right'}}><div className="mono" style={{fontWeight:600,color:'var(--accent)',fontSize:13}}>{RM(d.t)}</div>{d.d>0&&<div style={{fontSize:10,color:'var(--yellow)'}}>Tax: {RM(d.d)}</div>}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ ENTRIES ═══ */}
      {tab==='entries'&&(
        <div className="anim-in">
          <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
            <div className="card" style={{flex:1,minWidth:200,display:'flex',alignItems:'center',gap:8,padding:'0 12px'}}>
              <Search size={14} color="var(--text-3)"/>
              <input type="text" placeholder="Search clinics, locations, refs..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:1,background:'transparent',border:'none',color:'var(--text-1)',fontSize:13,padding:'10px 0',outline:'none',fontFamily:'var(--font)'}}/>
              {search&&<button style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-3)',padding:3}} onClick={()=>setSearch('')}><X size={12}/></button>}
            </div>
            <button className={`btn ${showFilters?'btn-p':'btn-g'}`} onClick={()=>setShowFilters(!showFilters)}>
              <Filter size={14}/>Filters{Object.values(filters).filter(Boolean).length>0&&<span style={{width:5,height:5,borderRadius:'50%',background:'var(--pink)'}}/>}
            </button>
          </div>
          {showFilters&&(
            <div className="card anim-in fil-g" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:8,marginBottom:14,padding:12}}>
              <select className="input" value={filters.month} onChange={e=>setFilters(f=>({...f,month:e.target.value}))}><option value="">All Months</option>{MONTHS.map((m,i)=><option key={i} value={i}>{m}</option>)}</select>
              <select className="input" value={filters.year} onChange={e=>setFilters(f=>({...f,year:e.target.value}))}><option value="">All Years</option>{years.map(y=><option key={y} value={y}>{y}</option>)}</select>
              <select className="input" value={filters.shift} onChange={e=>setFilters(f=>({...f,shift:e.target.value}))}><option value="">All Shifts</option><option value="DAY">Day</option><option value="NIGHT">Night</option></select>
              <select className="input" value={filters.clinic} onChange={e=>setFilters(f=>({...f,clinic:e.target.value}))}><option value="">All Clinics</option>{clinics.map(c=><option key={c} value={c}>{c}</option>)}</select>
              <select className="input" value={filters.paid} onChange={e=>setFilters(f=>({...f,paid:e.target.value}))}><option value="">All Status</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option></select>
              <button className="btn btn-g" style={{fontSize:12}} onClick={()=>setFilters({month:'',year:'',shift:'',clinic:'',paid:''})}><X size={12}/>Clear</button>
            </div>
          )}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,padding:'0 2px',flexWrap:'wrap',gap:6}}>
            <span style={{color:'var(--text-3)',fontSize:12}}>{filtered.length} entries <span className="mono" style={{color:'var(--accent)',fontWeight:600,marginLeft:6}}>{RM(filtered.reduce((s,d)=>s+(d.total||0),0))}</span></span>
            <button className="btn btn-g" style={{fontSize:11,padding:'5px 10px'}} onClick={()=>handleExport('csv')}><Download size={12}/>Export</button>
          </div>

          {/* Entry list */}
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {pageData.length===0&&<div className="card" style={{padding:32,textAlign:'center'}}><Search size={28} color="var(--text-3)" style={{marginBottom:8}}/><div style={{color:'var(--text-2)',fontSize:13}}>No entries found</div></div>}
            {pageData.map((e,idx)=>(
              <div key={e.id} className="card entry-r" style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px'}}>
                <div style={{minWidth:48,textAlign:'center',padding:'7px 4px',background:'rgba(0,245,212,0.04)',borderRadius:7,flexShrink:0}}>
                  <div className="mono" style={{fontSize:16,fontWeight:700,color:'var(--accent)',lineHeight:1}}>{new Date(e.date).getDate()}</div>
                  <div style={{fontSize:10,color:'var(--text-3)',marginTop:1}}>{MONTHS[new Date(e.date).getMonth()]}</div>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:13,marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.clinic}</div>
                  <div style={{fontSize:11,color:'var(--text-3)',marginBottom:3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.location}{e.company?` • ${e.company}`:''}</div>
                  <div style={{display:'flex',gap:5,flexWrap:'wrap',alignItems:'center'}}>
                    <span className={`badge t-${e.shift.toLowerCase()}`}>{e.shift}</span>
                    <span style={{fontSize:11,color:'var(--text-3)'}}>{e.start}–{e.end}</span>
                    <span style={{fontSize:11,color:'var(--text-2)'}}>{e.hours}h</span>
                  </div>
                </div>
                <div style={{textAlign:'right',minWidth:80,flexShrink:0}}>
                  <div className="mono" style={{fontSize:15,fontWeight:700,color:'var(--accent)'}}>{RM(e.total)}</div>
                  <div style={{display:'flex',gap:3,justifyContent:'flex-end',marginTop:3,flexWrap:'wrap'}}>
                    <span className={`badge ${e.paid?'t-paid':'t-unpaid'}`}>{e.paid?'PAID':'DUE'}</span>
                    {e.declare&&<span className="badge t-tax">TAX</span>}
                  </div>
                </div>
                <div className="entry-act desk" style={{display:'flex',gap:5,flexShrink:0}}>
                  <button className="btn-i" title="Invoice" onClick={()=>{setPrintEntry(e);setPrintType('invoice');}}><FileText size={14}/></button>
                  <button className="btn-i" title="Receipt" onClick={()=>{setPrintEntry(e);setPrintType('receipt');}}><Receipt size={14}/></button>
                  <button className="btn-i" title="Edit" onClick={()=>setEditEntry(e)}><Edit2 size={14}/></button>
                  <button className="btn-i" title="Delete" style={{color:'var(--pink)'}} onClick={()=>setDelConfirm(e.id)}><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages>1&&(
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:10,marginTop:14}}>
              <button className="btn btn-g" disabled={page===0} onClick={()=>setPage(p=>p-1)} style={{padding:'7px 12px',opacity:page===0?.4:1}}><ChevronLeft size={14}/></button>
              <span style={{fontSize:12,color:'var(--text-2)'}}>Page {page+1} of {totalPages}</span>
              <button className="btn btn-g" disabled={page>=totalPages-1} onClick={()=>setPage(p=>p+1)} style={{padding:'7px 12px',opacity:page>=totalPages-1?.4:1}}><ChevronRight size={14}/></button>
            </div>
          )}
        </div>
      )}

      {/* ═══ ANALYTICS ═══ */}
      {tab==='analytics'&&(
        <div className="anim-in" style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card" style={{padding:18}}>
            <h3 style={{color:'var(--text-3)',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:16}}>Monthly Earnings</h3>
            <BarChart data={monthly.map(([k,d])=>({l:MONTHS[parseInt(k.split('-')[1])-1],v:d.t}))} height={150}/>
          </div>
          <div className="card" style={{padding:18}}>
            <h3 style={{color:'var(--text-3)',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:14}}>Top Clinics by Revenue</h3>
            {clinicRank.slice(0,12).map(([c,d],i)=>(
              <div key={c} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<Math.min(clinicRank.length,12)-1?'1px solid var(--border)':'none'}}>
                <div className="mono" style={{width:20,color:'var(--text-3)',fontSize:11,textAlign:'right'}}>{i+1}</div>
                <div style={{flex:1,minWidth:0}}><div style={{fontWeight:500,fontSize:12,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c}</div><div style={{fontSize:10,color:'var(--text-3)'}}>{d.n} shifts • {d.h.toFixed(1)}h</div></div>
                <div style={{flex:1,maxWidth:160}}><div style={{height:5,background:'rgba(255,255,255,0.03)',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',width:`${d.t/Math.max(clinicRank[0]?.[1]?.t||1,1)*100}%`,background:'linear-gradient(90deg,var(--accent),var(--blue))',borderRadius:3}}/></div></div>
                <div className="mono" style={{fontWeight:600,color:'var(--accent)',fontSize:12,minWidth:70,textAlign:'right'}}>{RM(d.t)}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:10}}>
            <div className="card" style={{padding:18}}>
              <h3 style={{color:'var(--text-3)',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:14}}>Shift Distribution</h3>
              {(()=>{const day=data.filter(d=>d.shift==='DAY'),ngt=data.filter(d=>d.shift==='NIGHT');return[{l:'Day',n:day.length,t:day.reduce((s,d)=>s+d.total,0),c:'var(--yellow)'},{l:'Night',n:ngt.length,t:ngt.reduce((s,d)=>s+d.total,0),c:'var(--pink)'}].map((s,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:!i?'1px solid var(--border)':'none'}}><div><div style={{fontSize:12,fontWeight:500}}>{s.l} Shifts</div><div style={{fontSize:11,color:'var(--text-3)'}}>{s.n} shifts</div></div><div className="mono" style={{fontWeight:600,color:s.c,fontSize:13}}>{RM(s.t)}</div></div>
              ));})()}
            </div>
            <div className="card" style={{padding:18}}>
              <h3 style={{color:'var(--text-3)',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:14}}>Payment Split</h3>
              {[{l:'Cash',t:stats.cash,c:'var(--accent)'},{l:'Transfer',t:stats.xfer,c:'var(--blue)'}].map((s,i)=>(
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><span style={{fontSize:12,fontWeight:500}}>{s.l}</span><span className="mono" style={{fontWeight:600,color:s.c,fontSize:12}}>{RM(s.t)}</span></div>
                  <div style={{height:7,background:'rgba(255,255,255,0.03)',borderRadius:4,overflow:'hidden'}}><div style={{height:'100%',width:`${s.t/Math.max(stats.earn,1)*100}%`,background:s.c,borderRadius:4,transition:'width 1s'}}/></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MODALS ═══ */}
      {showAdd&&<div className="modal-bg" onClick={()=>setShowAdd(false)}><div className="modal" style={{maxWidth:500,padding:22}} onClick={e=>e.stopPropagation()}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}><h2 style={{fontSize:16,fontWeight:700}}>New Entry</h2><button className="btn-i" onClick={()=>setShowAdd(false)}><X size={16}/></button></div><EntryForm onSave={addEntry} onClose={()=>setShowAdd(false)} clinics={clinics}/></div></div>}

      {editEntry&&<div className="modal-bg" onClick={()=>setEditEntry(null)}><div className="modal" style={{maxWidth:500,padding:22}} onClick={e=>e.stopPropagation()}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}><h2 style={{fontSize:16,fontWeight:700}}>Edit Entry</h2><button className="btn-i" onClick={()=>setEditEntry(null)}><X size={16}/></button></div><EntryForm initial={editEntry} onSave={updateEntry} onClose={()=>setEditEntry(null)} clinics={clinics}/></div></div>}

      {printEntry&&<PrintDoc entry={printEntry} type={printType} onClose={()=>setPrintEntry(null)} name={name} mmc={mmc}/>}

      {showImport&&<ImportModal onClose={()=>setShowImport(false)} onImportCSV={handleImport} toast={notify}/>}

      {showSettings&&<SettingsModal onClose={()=>setShowSettings(false)} name={name} setName={setName} mmc={mmc} setMmc={setMmc} onExport={handleExport} onReset={handleReset}/>}

      {delConfirm&&<Confirm msg="Delete this entry? This cannot be undone." onYes={()=>deleteEntry(delConfirm)} onNo={()=>setDelConfirm(null)}/>}

      {toast&&<Toast msg={toast.m} type={toast.t} onClose={()=>setToast(null)}/>}
    </div>
    </>
  );
}
