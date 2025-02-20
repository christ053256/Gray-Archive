-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: user_management
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `public_chats`
--

DROP TABLE IF EXISTS `public_chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `public_chats` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `message` text,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `username` (`username`),
  CONSTRAINT `public_chats_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10067 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `public_chats`
--

LOCK TABLES `public_chats` WRITE;
/*!40000 ALTER TABLE `public_chats` DISABLE KEYS */;
INSERT INTO `public_chats` VALUES (10000,'admin1','Hi!','2025-02-07 15:59:51'),(10001,'admin0','Hello?','2025-02-07 15:59:58'),(10002,'admin1','Who are you?','2025-02-07 16:00:05'),(10003,'admin0','I don\'t know? how about you?','2025-02-07 16:00:22'),(10004,'admin1','I don\'t know either?','2025-02-07 16:00:40'),(10005,'admin0','Okay?','2025-02-07 16:00:46'),(10006,'admin1','asd','2025-02-07 16:04:11'),(10007,'admin0','asdasd','2025-02-07 16:04:20'),(10008,'admin0','asd','2025-02-07 16:04:20'),(10009,'admin0','asd','2025-02-07 16:04:21'),(10010,'admin0','sd','2025-02-07 16:04:21'),(10011,'admin0','sd','2025-02-07 16:04:21'),(10012,'admin0','sd','2025-02-07 16:04:21'),(10013,'admin0','asd','2025-02-07 16:04:22'),(10014,'admin0','asd','2025-02-07 16:04:22'),(10015,'admin0','as','2025-02-07 16:04:22'),(10016,'admin0','das','2025-02-07 16:04:22'),(10017,'admin0','da','2025-02-07 16:04:22'),(10018,'admin0','sda','2025-02-07 16:04:23'),(10019,'admin0','sd','2025-02-07 16:04:23'),(10020,'admin0','asd','2025-02-07 16:04:23'),(10021,'admin0','asd','2025-02-07 16:04:23'),(10022,'admin0','as','2025-02-07 16:04:24'),(10023,'admin0','das','2025-02-07 16:04:24'),(10024,'admin0','da','2025-02-07 16:04:24'),(10025,'admin0','sd','2025-02-07 16:04:24'),(10026,'admin0','asd','2025-02-07 16:04:24'),(10027,'admin0','as','2025-02-07 16:04:25'),(10028,'admin0','das','2025-02-07 16:04:25'),(10029,'admin0','das','2025-02-07 16:04:25'),(10030,'admin0','das','2025-02-07 16:04:25'),(10031,'admin0','da','2025-02-07 16:04:26'),(10032,'admin0','d','2025-02-07 16:04:26'),(10033,'admin1','asd','2025-02-07 16:05:46'),(10034,'admin0','asd','2025-02-07 16:05:50'),(10035,'admin1','asd','2025-02-07 16:07:04'),(10036,'admin0','asdasd','2025-02-07 16:07:21'),(10037,'admin1','asd','2025-02-07 16:07:55'),(10038,'admin1','asd','2025-02-07 16:08:56'),(10039,'admin1','asd','2025-02-07 16:09:02'),(10040,'admin1','asd','2025-02-07 16:09:08'),(10041,'admin1','asd','2025-02-07 16:09:35'),(10042,'admin1','asdasd','2025-02-07 16:09:43'),(10043,'admin0','asd','2025-02-07 16:09:46'),(10044,'admin1','Hello','2025-02-07 16:09:53'),(10045,'admin0','asd','2025-02-07 16:10:15'),(10046,'admin0','asd','2025-02-07 16:10:25'),(10047,'admin0','asd','2025-02-07 16:10:37'),(10048,'admin0','asdasd','2025-02-07 16:10:51'),(10049,'admin0','asdasd','2025-02-07 16:11:05'),(10050,'admin0','asd','2025-02-07 16:11:18'),(10051,'admin0','asd','2025-02-07 16:11:25'),(10052,'admin0','asd','2025-02-07 16:12:10'),(10053,'admin0','sad','2025-02-07 16:12:38'),(10054,'admin1','asdasd','2025-02-07 16:13:12'),(10055,'admin1','asd','2025-02-07 16:13:16'),(10056,'admin1','asdasd','2025-02-07 16:14:02'),(10057,'admin1','asdasd','2025-02-07 16:14:30'),(10058,'admin1','asd','2025-02-07 16:16:37'),(10059,'admin0','asd','2025-02-07 16:16:43'),(10060,'admin1','Hi','2025-02-18 10:32:00'),(10061,'admin1','Hey step bro!','2025-02-18 10:36:28'),(10062,'admin0','Oh hey step sister!','2025-02-18 10:36:38'),(10063,'admin1','Wanna bang tonight','2025-02-18 10:37:19'),(10064,'Japan','Japan joined the group.','2025-02-18 10:38:16'),(10065,'Japan','I\'m going to conquer you\'ll shits!','2025-02-18 10:39:07'),(10066,'admin1','Okay?','2025-02-18 16:08:53');
/*!40000 ALTER TABLE `public_chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag` varchar(10) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_salt`
--

DROP TABLE IF EXISTS `user_salt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_salt` (
  `username` varchar(20) NOT NULL,
  `salt` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `user_salt_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_salt`
--

LOCK TABLES `user_salt` WRITE;
/*!40000 ALTER TABLE `user_salt` DISABLE KEYS */;
INSERT INTO `user_salt` VALUES ('admin0','177,158,208,233,3,51,88,219,196,139,225,198,123,33,118,165'),('admin1','169,46,28,152,9,213,21,173,218,29,96,145,141,57,162,187'),('christ111503','123,160,52,133,51,242,100,62,82,189,17,139,152,162,191,123'),('Japan','1,40,194,161,116,81,161,89,149,156,7,120,97,179,3,184');
/*!40000 ALTER TABLE `user_salt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tags`
--

DROP TABLE IF EXISTS `user_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tags` (
  `user_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `user_tags_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tags`
--

LOCK TABLES `user_tags` WRITE;
/*!40000 ALTER TABLE `user_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `bio` varchar(101) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10000,'admin0','admin0@gmail.com','123dd96ddb96ac5a5fdad6b5695b97aae30c660239e02f2d46c977a28fb03096','admin0','To be or not to be.'),(10001,'admin1','admin1@gmail.com','72ed18c6cce026a34f7686ebd2fed10dbbacb230058a68c881f4dfd5bbac9852','admin1','Therefor I am'),(10002,'christ111503','amadeus@gmail.com','5f0eae01ec35094b207ada4940fe3c8d4bbd9af5c751d9240022b07b9c3e1751','Amadeus','I don\'t know'),(10003,'Japan','japan@gmail.com','b04dd0a16ef8b7e959b8cf69cbe5692dbde3c58e92f2a0e4c73c59ff508925b1','Imperial Japan',NULL);
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

-- Dump completed on 2025-02-20 10:46:42
