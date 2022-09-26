-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 17 Lut 2022, 16:31
-- Wersja serwera: 8.0.26
-- Wersja PHP: 8.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `s402340`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `basket`
--

CREATE TABLE `basket` (
  `id` int NOT NULL,
  `id_customer` int NOT NULL,
  `id_wine` int NOT NULL,
  `amount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `basket`
--

INSERT INTO `basket` (`id`, `id_customer`, `id_wine`, `amount`) VALUES
(34, 19, 22, 1),
(35, 19, 22, 1),
(39, 19, 20, 1),
(40, 19, 20, 1),
(41, 19, 20, 1),
(42, 19, 20, 1),
(43, 19, 20, 1),
(44, 19, 16, 1),
(45, 19, 16, 1),
(46, 19, 16, 1),
(47, 19, 16, 1),
(48, 19, 17, 1),
(49, 19, 17, 1),
(50, 19, 17, 1),
(51, 19, 17, 1),
(52, 19, 18, 1),
(53, 19, 18, 1),
(54, 19, 18, 1),
(55, 19, 18, 1),
(56, 19, 19, 1),
(57, 19, 19, 1),
(58, 19, 19, 1),
(59, 19, 19, 1),
(61, 22, 16, 1),
(63, 22, 23, 1);

--
-- Wyzwalacze `basket`
--
DELIMITER $$
CREATE TRIGGER `decreaseWineQuantity` BEFORE INSERT ON `basket` FOR EACH ROW IF (SELECT wine.quantity FROM wine WHERE wine.id = new.id_wine) - new.amount>=0 THEN
UPDATE wine SET wine.quantity = wine.quantity - new.amount WHERE wine.id = new.id_wine;
ELSE
SIGNAL SQLSTATE '45000';
END IF
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `increaseWineQuantityAfterDelete` AFTER DELETE ON `basket` FOR EACH ROW UPDATE wine SET wine.quantity = wine.quantity + old.amount WHERE wine.id = old.id_wine
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `customers`
--

CREATE TABLE `customers` (
  `id` int NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_postal_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_street` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `address_city`, `address_postal_code`, `address_street`, `login`, `password`, `email`, `mobile`) VALUES
(19, 'Test', 'Testowy', 'Testowo', '32-011', 'Testowa', '', 'test', 'test@test.pl', '123456789'),
(20, 'michal', 'kowalski', 'Kraków', '33-333', 'Ulica', '', 'michal', 'michal@mail.pl', '666666666'),
(21, '', '', '', '', '', '', 'xx', 'x@x.pl', ''),
(22, 'Wiktor', 'Tekiela', 'Biały Kościół', '32-089', 'Sąsiedzka', '', 'test', 'test@onet.pl', '998');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `importer`
--

CREATE TABLE `importer` (
  `id_importer` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `krs` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `importer`
--

INSERT INTO `importer` (`id_importer`, `name`, `krs`, `login`, `password`) VALUES
(6, 'DISNET', '1234567', 'disnetImporter', 'abc123'),
(7, 'WhiteChurchAlco', '222111333', 'whiteChurchImporter', 'abc123'),
(8, 'test', '1234567890', 'test', 'test');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `imports`
--

CREATE TABLE `imports` (
  `id_import` int NOT NULL,
  `id_importer` int DEFAULT NULL,
  `id_wine` int DEFAULT NULL,
  `quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `imports`
--

INSERT INTO `imports` (`id_import`, `id_importer`, `id_wine`, `quantity`) VALUES
(37, 6, 16, 10),
(38, 6, 17, 11),
(39, 6, 18, 15),
(40, 6, 19, 21),
(41, 7, 20, 6),
(42, 7, 21, 12),
(43, 7, 22, 12),
(44, 8, 23, 5);

--
-- Wyzwalacze `imports`
--
DELIMITER $$
CREATE TRIGGER `UpdateWineQuantity` AFTER INSERT ON `imports` FOR EACH ROW UPDATE wine SET wine.quantity = wine.quantity + new.quantity WHERE wine.id = new.id_wine AND wine.id_importer = new.id_importer
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wine`
--

CREATE TABLE `wine` (
  `id` int NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(10,2) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wine_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_importer` int NOT NULL,
  `capacity` double(10,2) NOT NULL,
  `alcoholic_strength` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `img_path` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `wine`
--

INSERT INTO `wine` (`id`, `country`, `price`, `name`, `wine_type`, `id_importer`, `capacity`, `alcoholic_strength`, `quantity`, `img_path`) VALUES
(16, 'Włochy', 300.00, 'BAROLO RISERVA', 'Czerwone', 6, 700.00, 13, 5, '/wineImages/BAROLO_RISERVA.jpg'),
(17, 'USA', 30.00, 'MILES ZINFANDEL', 'Różowe', 6, 750.00, 11, 7, '/wineImages/MILES_ZINFANDEL_ROSE.jpg'),
(18, 'RPA', 22.00, 'AFRICAN HORIZON', 'Białe', 6, 500.00, 14, 11, '/wineImages/AFRICAN_HORIZON_CHENIN.jpg'),
(19, 'Włochy', 99.00, 'SESSANTANNI PRIMITIVO', 'Czerwone', 6, 700.00, 14, 17, '/wineImages/SESSANTANNI_PRIMITIVO.jpg'),
(20, 'Włochy', 46.00, 'BEPI N DE ETO', 'Musujące', 7, 700.00, 14, 1, '/wineImages/BEPI_N_DE_ETO.jpg'),
(21, 'USA', 33.00, 'BARBANERA FIANO', 'Białe', 7, 700.00, 16, 12, '/wineImages/BARBANERA_FIANO.jpg'),
(22, 'Polska', 55.00, 'SAINT WINCENT', 'Czerwone', 7, 750.00, 22, 10, '/wineImages/SAINT_WINCENT.jpg'),
(23, 'Polska', 15.00, 'Kadarka', 'Czerwone', 8, 700.00, 13, 4, '/wineImages/WINO_BACH.jpg');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `basket_ibfk_1` (`id_wine`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Indeksy dla tabeli `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `importer`
--
ALTER TABLE `importer`
  ADD PRIMARY KEY (`id_importer`);

--
-- Indeksy dla tabeli `imports`
--
ALTER TABLE `imports`
  ADD PRIMARY KEY (`id_import`),
  ADD KEY `id_wine` (`id_wine`),
  ADD KEY `id_importer` (`id_importer`);

--
-- Indeksy dla tabeli `wine`
--
ALTER TABLE `wine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_importer` (`id_importer`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `basket`
--
ALTER TABLE `basket`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT dla tabeli `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT dla tabeli `importer`
--
ALTER TABLE `importer`
  MODIFY `id_importer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `imports`
--
ALTER TABLE `imports`
  MODIFY `id_import` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT dla tabeli `wine`
--
ALTER TABLE `wine`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`id_wine`) REFERENCES `wine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `basket_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `imports`
--
ALTER TABLE `imports`
  ADD CONSTRAINT `imports_ibfk_1` FOREIGN KEY (`id_wine`) REFERENCES `wine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `imports_ibfk_2` FOREIGN KEY (`id_importer`) REFERENCES `importer` (`id_importer`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `wine`
--
ALTER TABLE `wine`
  ADD CONSTRAINT `wine_ibfk_1` FOREIGN KEY (`id_importer`) REFERENCES `importer` (`id_importer`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
