-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Mar 08, 2017 at 04:28 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `mechofes_event`
--
CREATE DATABASE IF NOT EXISTS `mechofes_event` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mechofes_event`;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2017_03_05_094201_create_participant_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Participants`
--

CREATE TABLE `Participants` (
  `id` int(10) unsigned NOT NULL,
  `ParticipantName` text COLLATE utf8_unicode_ci NOT NULL,
  `ParticipantGender` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `ParticipantCollege` text COLLATE utf8_unicode_ci NOT NULL,
  `Year` smallint(6) NOT NULL,
  `Department` text COLLATE utf8_unicode_ci NOT NULL,
  `ParticipantEmail` text COLLATE utf8_unicode_ci NOT NULL,
  `ParticipantPhone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `ParticipantEvents` text COLLATE utf8_unicode_ci NOT NULL,
  `PresentationTopic` text COLLATE utf8_unicode_ci NOT NULL,
  `CreateDate` text COLLATE utf8_unicode_ci NOT NULL,
  `ModifiedDate` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Participants`
--

INSERT INTO `Participants` (`id`, `ParticipantName`, `ParticipantGender`, `ParticipantCollege`, `Year`, `Department`, `ParticipantEmail`, `ParticipantPhone`, `ParticipantEvents`, `PresentationTopic`, `CreateDate`, `ModifiedDate`) VALUES
(3, 'Nagaraju', 'M', 'eac', 2017, 'EAC', 'dkfjalsdfj', '2323923', '-', '-', '-', '-'),
(4, 'Nagaraju', 'M', 'eac', 2017, 'EAC', 'dkfjalsdfj', '2323923', '-', '-', '-', '-'),
(5, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(6, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(7, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(8, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(9, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(10, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(11, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(12, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(13, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(14, 'Nagaraju', 'M', 'Eac', 2001, 'EAC', 'nagarajueac12@gmail.com', '9524422460', '-', '-', '-', '-'),
(15, 'WELCOME', 'M', 'DFAJSDF', 2323, 'KLDFJASDFL', 'DKAFDSF@KJFD.COM', '34343434', '-', '-', '-', '-');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Participants`
--
ALTER TABLE `Participants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Participants`
--
ALTER TABLE `Participants`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
