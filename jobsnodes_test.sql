CREATE DATABASE  IF NOT EXISTS `jobsnodes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jobsnodes`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: jobsnodes
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `priority` int NOT NULL DEFAULT '1',
  `status` int NOT NULL DEFAULT '0',
  `expiresAt` datetime NOT NULL,
  `creatorId` int NOT NULL,
  `performerId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creatorId` (`creatorId`),
  KEY `performerId` (`performerId`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`performerId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Написать программу','Почему ещё не написана?',1,0,'2023-05-08 22:00:00',1,2,'2023-05-08 20:00:18','2023-05-08 20:00:18'),(2,'Отладить программу','Куча багов в последнем коммите!',2,1,'2023-05-12 00:00:00',1,1,'2023-05-08 20:00:18','2023-05-10 01:20:58'),(3,'Выбросить мусор','До ближайшей помойки',0,1,'2023-05-11 00:00:00',1,2,'2023-05-08 20:00:18','2023-05-10 01:24:31'),(4,'Поменять термопасту','Видеокарта уже задыхается',1,3,'2023-05-20 00:00:00',1,2,'2023-05-08 20:00:18','2023-05-08 20:00:18'),(5,'Рефакторинг кода','Код мог бы быть лучше',2,0,'2023-05-20 00:00:00',2,2,'2023-05-08 20:00:18','2023-05-08 20:00:18'),(6,'Прочитать статью','Про алгоритмы',0,1,'2023-05-30 00:00:00',2,2,'2023-05-08 20:00:18','2023-05-08 20:00:18'),(7,'Выгулять кошку','Когда-то это ведь надо сделать?',2,0,'2023-05-24 00:00:00',2,5,'2023-05-08 20:00:18','2023-05-10 01:25:04'),(8,'Отправить письмо','На деревню дедушке',1,3,'2023-05-13 00:00:00',2,6,'2023-05-08 20:00:18','2023-05-08 20:00:18'),(9,'Созвон с коллегами','Координация задач',1,0,'2023-05-11 00:00:00',1,4,'2023-05-08 20:00:18','2023-05-08 20:00:18'),(10,'Добраться с вечеринки домой','Без комментариев',2,1,'2023-05-13 00:00:00',1,3,'2023-05-08 20:00:18','2023-05-08 20:00:18'),(11,'Запаковать приложение','Наконец-то запускаемся!',2,1,'2023-05-01 00:52:39',1,1,'2023-05-10 00:53:05','2023-05-10 01:06:41'),(12,'Последняя проверка','Всё должно пройти хорошо',0,2,'2023-05-11 01:21:03',1,1,'2023-05-10 01:21:42','2023-05-10 01:21:42'),(13,'Ещё одна задача','Теперь уж точно последняя...',1,1,'2023-05-24 01:39:36',1,1,'2023-05-10 01:40:01','2023-05-10 01:40:01');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `managerId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `managerId` (`managerId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`managerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Админ','Админович','Админов','admin','$2y$10$mvP2/ghwXy5xeKRZJUiE5e21OC4JQRdELHepYRnRYDewP9lnPfH7O',NULL,'2023-05-06 19:54:40','2023-05-06 19:54:40'),(2,'Иван','Иванович','Иванов','user1','$2y$10$mvP2/ghwXy5xeKRZJUiE5e21OC4JQRdELHepYRnRYDewP9lnPfH7O',1,'2023-05-06 19:55:30','2023-05-06 19:55:30'),(3,'Макар','Макарович','Макаров','user2','$2y$10$mvP2/ghwXy5xeKRZJUiE5e21OC4JQRdELHepYRnRYDewP9lnPfH7O',1,'2023-05-06 19:55:30','2023-05-06 19:55:30'),(4,'Сидор','Сидорович','Сидоров','user3','$2y$10$mvP2/ghwXy5xeKRZJUiE5e21OC4JQRdELHepYRnRYDewP9lnPfH7O',1,'2023-05-08 18:55:11','2023-05-08 18:55:11'),(5,'Петр','Петрович','Петров','user4','$2y$10$mvP2/ghwXy5xeKRZJUiE5e21OC4JQRdELHepYRnRYDewP9lnPfH7O',2,'2023-05-08 18:55:11','2023-05-08 18:55:11'),(6,'Кирилл','Анатольевич','Васильев','user5','$2y$10$mvP2/ghwXy5xeKRZJUiE5e21OC4JQRdELHepYRnRYDewP9lnPfH7O',2,'2023-05-08 18:55:11','2023-05-08 18:55:11'),(7,'Евгений','Васильевич','Демьянов','user6','$2y$10$mvP2/ghwXy5xeKRZJUiE5e21OC4JQRdELHepYRnRYDewP9lnPfH7O',2,'2023-05-08 18:55:11','2023-05-08 18:55:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-10  6:42:07
