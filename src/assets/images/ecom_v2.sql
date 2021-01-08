-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Ven 08 Janvier 2021 à 22:02
-- Version du serveur :  10.1.21-MariaDB
-- Version de PHP :  7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `ecom_v2`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`id`, `description`, `name`, `photo`) VALUES
(1, NULL, 'Computers', NULL),
(2, NULL, 'Printers', NULL),
(3, NULL, 'Smart phones', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `total_amount` double NOT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `order_item`
--

CREATE TABLE `order_item` (
  `id` bigint(20) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `payment`
--

CREATE TABLE `payment` (
  `id` bigint(20) NOT NULL,
  `card_number` bigint(20) NOT NULL,
  `card_type` varchar(255) DEFAULT NULL,
  `date_payment` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `available` bit(1) NOT NULL,
  `current_price` double NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `photo_name` varchar(255) DEFAULT NULL,
  `promotion` bit(1) NOT NULL,
  `selected` bit(1) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `product`
--

INSERT INTO `product` (`id`, `available`, `current_price`, `description`, `name`, `photo_name`, `promotion`, `selected`, `category_id`) VALUES
(5, b'0', 500000, NULL, ' Dell', 'pc5.jpg', b'1', b'0', 1),
(8, b'0', 3550, NULL, ' Hp', 'pc10.jpg', b'0', b'0', 1),
(9, b'1', 130000, NULL, ' Dell', 'pc19.jpg', b'1', b'1', 1),
(10, b'0', 7731, NULL, ' Accent', 'pc20.jpg', b'1', b'1', 1),
(11, b'0', 2002, NULL, 'WC4weKNO5YmjH5DP37', 'printer1.jpg', b'1', b'1', 2),
(12, b'0', 7918, NULL, 'tKoPXCaUjuIWBVGYWE', 'printer2.jpg', b'0', b'1', 2),
(13, b'1', 5277, NULL, 'WpG1WQaGYeCGs42L09', 'printer3.jpg', b'0', b'1', 2),
(14, b'1', 2146, NULL, '5EWC6cUhfCHqfyeA3p', 'printer4.jpg', b'1', b'1', 2),
(15, b'1', 4019, NULL, 'gzJ2hYNtjz6W8o6njV', 'printer5.jpg', b'1', b'0', 2),
(16, b'0', 2517, NULL, 'hwSsnqvoic4yqHFKtH', 'printer6.jpg', b'1', b'1', 2),
(17, b'1', 1091, NULL, 'yaEUqVYdKE2VPRJaov', 'printer7.jpg', b'1', b'0', 2),
(18, b'0', 6014, NULL, '8CBqVdCDswfA4GtCbp', 'printer8.jpg', b'0', b'0', 2),
(19, b'0', 4526, NULL, 'A6YmOyGggF3Uan81VF', 'printer9.jpg', b'0', b'1', 2),
(20, b'0', 6311, NULL, 'M6B6dfB9jYPTnx0Zg9', 'printer10.jpg', b'0', b'0', 2),
(21, b'1', 7047, 'Galaxy A31 ,batterie 5000mAh ,capteur 48MP,Le Remplacant du Galaxy A30 et du Galaxy A30S est equipe d\'un ecran Super amoled vec lecteur d\'empreinte digitale integre,d\'une immense batterie de 5000mAh et d\'un quadruple capteur d\'ecran', ' Samsung  Galaxy A31', 'smartphone1.jpg', b'0', b'0', 3);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK17yo6gry2nuwg2erwhbaxqbs9` (`client_id`),
  ADD KEY `FKag8ppnkjvx255gj7lm3m18wkj` (`payment_id`);

--
-- Index pour la table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  ADD KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`);

--
-- Index pour la table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK17yo6gry2nuwg2erwhbaxqbs9` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `FKag8ppnkjvx255gj7lm3m18wkj` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`);

--
-- Contraintes pour la table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
