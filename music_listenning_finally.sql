-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for music_listen
CREATE DATABASE IF NOT EXISTS `music_listen` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `music_listen`;

-- Dumping structure for table music_listen.artists
CREATE TABLE IF NOT EXISTS `artists` (
  `artist_id` int NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_filename` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Artist_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`artist_id`),
  UNIQUE KEY `artist_name` (`artist_name`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table music_listen.artists: ~25 rows (approximately)
DELETE FROM `artists`;
INSERT INTO `artists` (`artist_id`, `artist_name`, `image_filename`, `Artist_date`) VALUES
	(1, 'NONT TANONT', 'nontanon.jpg', '2023-12-05 10:44:55'),
	(3, 'SOMKIAT', 'music2.jpg', '2023-12-05 10:44:55'),
	(4, 'Three Man Down', 'music3.jpg', '2023-12-05 10:44:55'),
	(5, 'FREEHAND', 'music4.jpg', '2023-12-05 10:44:55'),
	(6, 'SHERRY', 'music5.jpg', '2023-12-05 10:44:55'),
	(7, 'Pop Pongkool', 'music6.jpg', '2023-12-05 10:44:55'),
	(10, 'Txrbo', 'music9.jpg', '2023-12-05 10:44:55'),
	(11, 'PURPEECH', 'music10.jpg', '2023-12-05 10:44:55'),
	(13, 'GAVIND', 'music12.jpg', '2023-12-05 10:44:55'),
	(14, 'MEYOU', 'Meyou.jpg', '2023-12-05 10:44:55'),
	(21, 'ไหมไทย หัวใจศิลป์', '311647906_631426528631950_4077131607617460623_n.jpg', '2023-12-06 11:43:51'),
	(32, 'WhatChaLaWaLee', 'วัชราวลี.jpg', '2023-12-24 19:40:09'),
	(33, 'LHAM', 'lham.jpg', '2024-01-03 15:54:50'),
	(34, 'SLAPKISS', 'SLAPKISS.jpg', '2024-01-03 16:00:34'),
	(35, 'LANDOKMAI', 'LANDOKMAI.jpg', '2024-01-03 16:02:36'),
	(36, 'YOASOBI', 'yoasobi.jpg', '2024-01-07 23:40:59'),
	(37, 'Ado', 'Ado.jpg', '2024-01-07 23:53:02'),
	(38, 'atom chanakan', 'อะตอม ชนกันต์.jpg', '2024-01-11 23:00:56'),
	(41, 'tattoo colour', 'tattoo.jpg', '2024-01-28 16:39:16'),
	(42, 'The Toy', 'thetoy.jpg', '2024-02-03 00:54:00'),
	(56, 'NBAYoungBoy', 'NBAyoungboy.jpg', '2024-02-17 18:06:20'),
	(57, 'P-Saderd', 'พีสะเดิด.jpg', '2024-02-17 18:14:30'),
	(58, 'วิด ไฮเปอร์', 'วิดไฮเปอร์.jpg', '2024-02-17 18:31:10'),
	(59, 'Endorphine', 'Endorphine.jpg', '2024-02-17 18:36:21'),
	(60, 'patrickananda', 'patrickananda.jpg', '2024-02-17 18:40:41');

-- Dumping structure for table music_listen.category
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`category_id`) USING BTREE,
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table music_listen.category: ~6 rows (approximately)
DELETE FROM `category`;
INSERT INTO `category` (`category_id`, `category_name`) VALUES
	(40, 'Artist'),
	(1015, 'CPE.65231'),
	(31, 'John smith Ter'),
	(1016, 'Lucaku'),
	(45, 'PrivatePlaylist'),
	(1017, 'Thailand');

-- Dumping structure for table music_listen.playlists
CREATE TABLE IF NOT EXISTS `playlists` (
  `playlist_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `playlist_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `playlist_image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1265 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table music_listen.playlists: ~40 rows (approximately)
DELETE FROM `playlists`;
INSERT INTO `playlists` (`playlist_id`, `category_id`, `user_id`, `playlist_name`, `playlist_image`) VALUES
	(1063, 31, 1, 'Let go', '719179.png'),
	(1064, 31, 1, 'My stupid heart', 'eris_boreas_greyrat___mushoku_tensei_wallpaper_by_deathtototoro_dewqlq6.png'),
	(1065, 31, 1, 'Dont know', '1323628.jpeg'),
	(1067, 45, 2, 'BBthecat', 'บีบี.jpg'),
	(1068, 45, 2, 'GGsport', '2.jpg'),
	(1098, 40, 1, 'TELEVISION OFF', 'music14.jpg'),
	(1121, 45, 2, 'Seesung', 'dasee.jpg'),
	(1184, 40, 1, 'NONT TANONT', 'nontanon.jpg'),
	(1185, 40, 1, 'Three Man Down', 'music3.jpg'),
	(1189, 1015, 1, 'DISK', '1708165252disk.jpg'),
	(1190, 1015, 1, 'OOP', 'Peera.jpg'),
	(1191, 1015, 1, 'GAS', 'Gas.jpg'),
	(1192, 1015, 1, 'หนุ่ยอำพล', 'youngny.jpg'),
	(1193, 1015, 1, 'GOD', 'oop.png'),
	(1194, 1015, 1, 'Rain', 'rain.jpg'),
	(1195, 1015, 1, 'Kla', 'กล้า.jpg'),
	(1206, 40, 1, 'The Toy', 'thetoy.jpg'),
	(1208, 1015, 1, 'pair pretzel', 'pair.jpg'),
	(1238, 45, 2, 'gogo', '57362559_1080699072130268_4692473163559206912_n.jpg'),
	(1241, 45, 6, 'SadPapipa', 'download.jpg'),
	(1242, 45, 8, 'gogo', '17083934801323628.jpeg'),
	(1243, 45, 8, NULL, NULL),
	(1244, 45, 8, NULL, NULL),
	(1245, 45, 8, NULL, NULL),
	(1248, 40, 1, 'FREEHAND', 'music4.jpg'),
	(1249, 40, 1, 'SHERRY', 'music5.jpg'),
	(1250, 1015, 1, 'plamLnwZa', 'plam.jpg'),
	(1251, 1016, 1, 'jame jaynax', 'Jdog.jpg'),
	(1252, 1016, 1, NULL, NULL),
	(1253, 1016, 1, NULL, NULL),
	(1254, 1016, 1, NULL, NULL),
	(1255, 1016, 1, NULL, NULL),
	(1256, 1017, 1, NULL, NULL),
	(1257, 1017, 1, NULL, NULL),
	(1258, 1017, 1, NULL, NULL),
	(1259, 1017, 1, NULL, NULL),
	(1262, 40, 1, 'WhatChaLaWaLee', 'วัชราวลี.jpg'),
	(1263, 40, 1, 'tattoo colour', 'tattoo.jpg'),
	(1264, 40, 1, 'atom chanakan', 'อะตอม ชนกันต์.jpg');

-- Dumping structure for table music_listen.playlist_song
CREATE TABLE IF NOT EXISTS `playlist_song` (
  `playlist_id` int DEFAULT NULL,
  `song_id` int DEFAULT NULL,
  KEY `playlist_id` (`playlist_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `playlist_id` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `song_id` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table music_listen.playlist_song: ~136 rows (approximately)
DELETE FROM `playlist_song`;
INSERT INTO `playlist_song` (`playlist_id`, `song_id`) VALUES
	(1063, 96),
	(1063, 94),
	(1064, 93),
	(1064, 95),
	(1064, 94),
	(1065, 94),
	(1065, 93),
	(1065, 96),
	(1065, 95),
	(1065, 98),
	(1065, 97),
	(1064, 98),
	(1064, 97),
	(1064, 96),
	(1064, 100),
	(1064, 30),
	(1064, 86),
	(1064, 82),
	(1065, 86),
	(1065, 30),
	(1068, 94),
	(1068, 93),
	(1068, 95),
	(1067, 96),
	(1067, 95),
	(1067, 94),
	(1067, 86),
	(1065, 100),
	(1067, 97),
	(1067, 93),
	(1067, 98),
	(1063, 82),
	(1063, 30),
	(1063, 36),
	(1063, 108),
	(1184, 27),
	(1184, 38),
	(1184, 39),
	(1184, 40),
	(1184, 42),
	(1184, 43),
	(1184, 48),
	(1184, 51),
	(1185, 29),
	(1185, 45),
	(1185, 46),
	(1185, 47),
	(1191, 100),
	(1191, 98),
	(1191, 97),
	(1190, 33),
	(1190, 35),
	(1190, 31),
	(1192, 36),
	(1192, 37),
	(1192, 112),
	(1191, 113),
	(1189, 114),
	(1195, 115),
	(1195, 117),
	(1193, 118),
	(1192, 115),
	(1192, 116),
	(1195, 119),
	(1190, 115),
	(1206, 102),
	(1206, 103),
	(1206, 104),
	(1206, 105),
	(1208, 118),
	(1208, 82),
	(1208, 86),
	(1208, 98),
	(1208, 113),
	(1208, 100),
	(1063, 97),
	(1063, 95),
	(1063, 93),
	(1067, 118),
	(1067, 100),
	(1238, 30),
	(1238, 29),
	(1238, 28),
	(1238, 27),
	(1241, 94),
	(1241, 95),
	(1241, 97),
	(1241, 100),
	(1242, 96),
	(1242, 95),
	(1242, 94),
	(1248, 30),
	(1249, 31),
	(1250, 116),
	(1250, 115),
	(1250, 112),
	(1250, 37),
	(1250, 36),
	(1250, 88),
	(1250, 89),
	(1250, 90),
	(1250, 91),
	(1250, 92),
	(1251, 116),
	(1251, 86),
	(1251, 27),
	(1251, 51),
	(1251, 114),
	(1251, 32),
	(1251, 108),
	(1251, 110),
	(1189, 36),
	(1189, 37),
	(1189, 112),
	(1189, 115),
	(1189, 116),
	(1262, 76),
	(1262, 77),
	(1262, 78),
	(1262, 79),
	(1262, 80),
	(1262, 81),
	(1263, 108),
	(1263, 110),
	(1263, 111),
	(1264, 96),
	(1264, 97),
	(1264, 98),
	(1264, 100),
	(1191, 93),
	(1194, 83),
	(1194, 87),
	(1194, 113),
	(1194, 27),
	(1194, 38),
	(1194, 39);

-- Dumping structure for table music_listen.songs
CREATE TABLE IF NOT EXISTS `songs` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int DEFAULT NULL,
  `song_title` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Songs_filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Songs_imgfilename` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`song_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table music_listen.songs: ~60 rows (approximately)
DELETE FROM `songs`;
INSERT INTO `songs` (`song_id`, `artist_id`, `song_title`, `Songs_filename`, `Songs_imgfilename`, `date_added`) VALUES
	(27, 1, 'รักแรก', 'รักแรก (First Love).mp3', 'music7.jpg', '2023-12-05 17:22:34'),
	(28, 3, 'ขอวอน', 'ขอวอน.mp3', 'music2.jpg', '2023-12-05 21:55:32'),
	(29, 4, 'ข้างกัน', 'Three Man Down - ข้างกัน (City).mp3', 'music3.jpg', '2023-12-05 21:56:16'),
	(30, 5, 'ขอให้เธอใจดี', 'ขอให้เธอใจดี.mp3', 'music4.jpg', '2023-12-05 21:57:37'),
	(31, 6, 'เธอไม่ได้สอนให้ฉันอยู่คนเดียว', 'เธอไม่ได้สอนให้ฉันอยู่คนเดียว.mp3', 'music5.jpg', '2023-12-05 21:58:15'),
	(32, 7, 'ภาพจำ', 'ภาพจำ.mp3', 'music6.jpg', '2023-12-05 21:59:30'),
	(33, 7, 'สลักจิต', 'สลักจิต.mp3', 'music8.jpg', '2023-12-05 21:59:30'),
	(34, 10, 'เหลินขูน', 'เหลินขูน.mp3', 'music9.jpg', '2023-12-05 22:00:12'),
	(35, 11, 'อาจเป็นเพราะฉันเอง (me.)', 'อาจเป็นเพราะฉันเอง (me.).mp3', 'music10.jpg', '2023-12-05 22:01:18'),
	(36, 21, 'ลูกไผหว่า', 'ลูกไผหว่า - ไหมไทย หัวใจศิลป์ [MUSIC VIDEO].mp3', 'maxresdefault.jpg', '2023-12-07 22:56:42'),
	(37, 21, 'ปลาแดก', 'ปลาแดก - ไหมไทย ใจตะวัน【OFFICIAL MV】.mp3', 'ปลาแดก.jpg', '2023-12-07 23:10:37'),
	(38, 1, 'มีผลต่อหัวใจ', 'มีผลต่อหัวใจ - นนท์ ธนนท์ [Official Music Video].mp3', 'มีผลต่อหัวใจ.jpg', '2023-12-09 09:39:12'),
	(39, 1, 'ความรักกำลังก่อตัว', 'ความรักกำลังก่อตัว - นนท์ ธนนท์ [Official Music Video].mp3', 'ความรักกำลังก่อตัว.jpg', '2023-12-09 09:39:12'),
	(40, 1, 'น้อยใจ', 'NONT TANONT - น้อยใจ (hurt) [Official MV].mp3', 'น้อยใจ.jpg', '2023-12-10 13:55:33'),
	(42, 1, 'พิง', 'OFFICIAL MVพง [เพลงจากละครกระเชาสดา] - นนท ธนนท.mp3', 'พิง.jpg', '2023-12-10 14:12:47'),
	(43, 1, 'โต๊ะริม', 'NONT TANONT - โตะรม (melt) [Official MV].mp3', 'โต๊ะริม.jpg', '2023-12-10 14:14:58'),
	(45, 4, 'ถ้าเธอรักฉันจริง', 'ถ้าเธอรักฉันจริง - Three Man Down Official MV.mp3', 'ถ้าเธอรักฉันจริง.jpg', '2023-12-13 22:31:44'),
	(46, 4, 'วันเกิดฉันปีนี้', 'วันเกิดฉันปีนี้ (HBD to me) - Three Man Down (JOOX 100x100 SEASON 3) Official MV.mp3', 'วันเกิดฉันปีนี้.jpg', '2023-12-13 22:31:44'),
	(47, 4, 'เปิดตัวเขา', 'เปิดตัวเขา (Rebound) - Three Man Down Official MV.mp3', 'เปิดตัวเขา.jpg', '2023-12-13 22:31:44'),
	(48, 1, 'เจ็บที่ยังรู้สึก', 'เจ็บที่ยังรู้สึก Ost. U-PRINCE Series - นนท ธนนท.mp3', 'เจ็บที่ยังรู้สึก.jpg', '2023-12-14 22:51:23'),
	(51, 1, 'ยังคงคอย - Hers (Cover)', '[MAD] ยังคงคอย - Hers (Cover)  NONT TANONT.mp3', 'ยังคงคอย.jpg', '2023-12-16 21:42:36'),
	(76, 32, 'น้อย', 'Y2meta.app - น้อย - วัชราวลี [Official Audio] (320 kbps).mp3', 'น้อย.jpg', '2023-12-24 19:51:12'),
	(77, 32, 'สถานีดวงจันทร์', 'Y2meta.app - สถานีดวงจันทร์ - วัชราวลี [Official Audio] (320 kbps).mp3', 'สถานีดวงจัน.jpg', '2023-12-24 19:51:12'),
	(78, 32, 'ร่มสีเทา', 'Y2meta.app - ร่มสีเทา - วัชราวลี [Official Audio] (320 kbps).mp3', 'ร่มสีเทา.jpg', '2023-12-24 19:51:12'),
	(79, 32, 'Avenue', 'Y2meta.app - Avenue - วัชราวลี Official MV [HD] (320 kbps).mp3', 'avenue.jpg', '2023-12-24 19:51:12'),
	(80, 32, 'ทราย', 'Y2meta.app - ทราย - วัชราวลี [OFFICIAL-AUDIO] (320 kbps).mp3', 'ทราย.jpg', '2023-12-24 19:51:12'),
	(81, 32, 'ลูกอม', 'Y2meta.app - เพลง ลูกอม - วัชราวลี [official audio] (320 kbps).mp3', 'ลูกอม.jpg', '2023-12-24 19:51:12'),
	(82, 13, 'ไม่มีใครผ่านมาทางนี้', 'Y2meta.app - GAVIN_D - ไม่มีใครผ่านมาทางนี้ (Pause) ft. DIAMOND MQT「Vibez Session」 (320 kbps).mp3', 'ไม่มีใครผ่านมาทางนี้.jpg', '2023-12-24 19:56:27'),
	(83, 33, 'หลงกล', 'หลงกล - LHAM (Rock Quest Project) [Rock Session].mp3', 'หลงกล.jpg', '2024-01-03 15:55:55'),
	(84, 34, 'ไปกันใหญ่(Crush)', 'Slapkiss - ไปกนใหญ (Crush) ft. ตองตา Plastic Plastic [Official MV].mp3', 'ไปกันใหญ่(Crush).jpg', '2024-01-03 16:02:08'),
	(85, 34, 'แฟนเก่าคนโปรด', 'SLAPKISS - แฟนเกาคนโปรด (my fav ex) [Official MV].mp3', 'แฟนก่าคนโปรด.jpg', '2024-01-03 16:02:08'),
	(86, 35, 'เพลงรักเพลงแรก', 'LANDOKMAI - เพลงรกเพลงแรก (Blooming) [Official MV].mp3', 'เพลงรักเพลงแรก.jpg', '2024-01-03 16:02:53'),
	(87, 14, 'วันนี้เมื่อปีที่แล้ว', 'SnapSave.io - MEYOU - วันนี้ปีที่แล้ว [OFFICIAL MV] (320 kbps).mp3', 'วันนี้เมื่อปีที่แล้ว.jpg', '2024-01-06 22:10:45'),
	(88, 36, 'YOASOBI「たぶん」', 'tomp3.cc - YOASOBIたふんOfficial Music  Video_320kbps.mp3', 'YOASOBI「たぶん」.jpg', '2024-01-07 23:44:09'),
	(89, 36, 'YOASOBI「アイドル」', 'YOASOBIアイドル Official Music Video.mp3', 'idol.jpg', '2024-01-07 23:44:09'),
	(90, 36, 'YOASOBI「夜に駆ける」', 'tomp3.cc - YOASOBI夜に駆ける Official Music Video_320kbps.mp3', 'YOASOBI「夜に駆ける」.jpg', '2024-01-07 23:48:23'),
	(91, 36, 'YOASOBI「怪物」', 'tomp3.cc - YOASOBI怪物Official Music Video　YOASOBI  Monster_320kbps.mp3', 'YOASOBI「怪物」.jpg', '2024-01-07 23:48:23'),
	(92, 36, 'YOASOBI「群青」', 'tomp3.cc - YOASOBI群青Official Music Video_320kbps.mp3', 'YOASOBI「群青」.jpg', '2024-01-07 23:48:23'),
	(93, 37, '【Ado】Tot Musica', 'tomp3.cc - AdoTot Musicaウタ from ONE PIECE FILM RED_320kbps.mp3', '【Ado】Tot Musica.jpg', '2024-01-07 23:56:15'),
	(94, 37, '【Ado】逆光', 'tomp3.cc - Ado逆光ウタ from ONE PIECE FILM RED_320kbps.mp3', '【Ado】逆光.jpg', '2024-01-07 23:56:15'),
	(95, 37, '【Ado】うっせぇわ', 'tomp3.cc - Adoうっせぇわ_320kbps.mp3', '【Ado】うっせぇわ.jpg', '2024-01-07 23:57:18'),
	(96, 38, 'PLEASE - Atom ชนกันต์', 'PLEASE - Atom ชนกนตOFFICIAL MV.mp3', 'PLEASE - Atom ชนกันต์.jpg', '2024-01-11 23:04:07'),
	(97, 38, 'Good Morning Teacher', 'Good Morning Teacher - Atom ชนกนต [Official MV].mp3', 'Good Morning Teacher.jpg', '2024-01-11 23:04:07'),
	(98, 38, 'อ้าว - Atom', 'อาว - Atom ชนกนต [Official MV].mp3', 'อ้าว - Atom.jpg', '2024-01-11 23:04:07'),
	(100, 38, 'รถคันเก่า', 'tomp3.cc - รถคนเกา  Atom ชนกนต  Official MV.mp3', 'รถคันเก่า.jpg', '2024-01-14 21:33:31'),
	(102, 42, 'TOY', 'Y2meta.app - THE TOYS - TOY [OFFICIAL AUDIO] (320 kbps).mp3', 'TOY.jpg', '2024-02-03 01:00:29'),
	(103, 42, 'Star', '1706896829Y2meta.app - THE TOYS - Stars ( Official Lyrics Video ) (320 kbps).mp3', 'Stars.jpg', '2024-02-03 01:00:29'),
	(104, 42, 'ก่อนฤดูฝน', 'Y2meta.app - THE TOYS - ก่อนฤดูฝน (Before rain) [Official MV] (320 kbps).mp3', 'ก่แนฤดูฝน.jpg', '2024-02-03 01:00:29'),
	(105, 42, '04:00', 'Y2meta.app - THE TOYS - 04_00 (320 kbps).mp3', 'ตี4.jpg', '2024-02-03 01:00:29'),
	(108, 41, 'โกหก', 'tomp3.cc - TATTOO COLOUR  โกหก Official MV_320kbps.mp3', 'โกหก.jpg', '2024-02-16 23:23:50'),
	(110, 41, 'ขาหมู', 'tomp3.cc - TATTOO COLOUR  ขาหม  Official Music Video_320kbps.mp3', 'ขาหมู.jpg', '2024-02-16 23:24:57'),
	(111, 41, 'แล้วแต่แม่คุณ - Up to your mom', 'tomp3.cc - TATTOO COLOUR  แลวแตแมคณ  My Lady feat TangBadVoice Music Video_320kbps.mp3', 'แล้วแต่แม่คุณ.jpg', '2024-02-16 23:24:57'),
	(112, 21, 'เหนื่อยจังอยากฟังเสียงเธอ', 'tomp3.cc - เหนอยจงอยากฟงเสยง  ไหมไทย ใจตะวนOFFICIAL MV_320kbps.mp3', 'เหนื่อยจังอยากฟังเสียงเธอ.jpg', '2024-02-17 18:03:08'),
	(113, 56, 'B*tch Let Do It', '1708168178tomp3.cc - YoungBoy Never Broke Again  Btch Lets Do It Official Music Video_320kbps.mp3', '1708168178Bitch.jpg', '2024-02-17 18:09:38'),
	(114, 57, 'สาวเกาหลี', 'tomp3.cc - สาวเกาหล  พ สะเดด OFFICIAL MV_320kbps.mp3', 'สาวเกาหลี.jpg', '2024-02-17 18:14:43'),
	(115, 21, 'ดาวมีไว้เบิ่ง - Star have to look', '1708168732tomp3.cc - ดาวมไวเบง  ไหมไทย ใจตะวน OFFICIAL MV_320kbps.mp3', '1708168732ดาวมีใว้เบ่ง.jpg', '2024-02-17 18:18:52'),
	(116, 21, 'นางฟ้าหรือยาพิษ - AngleOrPoison', '1708169362tomp3.cc - นางฟาหรอยาพษ  ไหมไทย หวใจศลป MUSIC VIDEO_320kbps.mp3', '1708169362นางฟ้าหรือยาพิษ.jpg', '2024-02-17 18:29:22'),
	(117, 58, 'รักแท้ในคืนหลอกลวง - True love into fake night', 'tomp3.cc -รกแทในคนหลอกลวง  Hyper Official MV_320kbps.mp3', 'รักแท้ในคืนหลอกลวง.jpg', '2024-02-17 18:31:30'),
	(118, 59, 'เพื่อนสนิท', 'tomp3.cc - เพอนสนท  EndorphineOFFICIAL MV_320kbps.mp3', 'เพื่อนสนิท.jpg', '2024-02-17 18:37:37'),
	(119, 60, 'คนไกล - long people', 'tomp3.cc - คนไกล  Patrickananda  DUMB RECORDINGSOfficial MV_320kbps.mp3', 'คนไกล.jpg', '2024-02-17 18:41:08');

-- Dumping structure for table music_listen.users
CREATE TABLE IF NOT EXISTS `users` (
  `users_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table music_listen.users: ~4 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`users_id`, `username`, `email`, `password`) VALUES
	(1, 'Admin', 'copter1177@gmail.com', '$2y$10$wrf9.phvm8aISafGVLVlL.oK4jV3B6Lt7lQCS3710mGRsgBid0PEO'),
	(2, 'aisaka', 'aisaka1177@gmail.com', '$2y$10$YDzXt20KEu/CId8Bb15F..jnTiHlIkU3LhgB0X/PfztjQE76ALzQO'),
	(6, 'banana', 'banana@gmail.com', '$2y$10$/fFp6ipxeM/LC2YHvBe1T.ruCv61mVHF15stmKknc6s/bqQbm619i'),
	(8, 'pay123', 'paipor@gmail.com', '$2y$10$SEdDSJFJRo.yx0Rc65t6Ye0GNQatW..DqXXgkf1JTefitXSGlptIW');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
