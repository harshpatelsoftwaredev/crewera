-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2026 at 07:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crewera_reality_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `amenity_master`
--

CREATE TABLE `amenity_master` (
  `id` int(11) NOT NULL,
  `amenity_name` varchar(100) NOT NULL,
  `amenity_category` enum('Recreation','Fitness','Sports','Family','Outdoor','Safety','Utility','Business','Commercial','Technology','Luxury','Entertainment','Health','Eco-Friendly','Religious') NOT NULL,
  `icon_name` varchar(50) DEFAULT NULL,
  `is_premium` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `amenity_master`
--

INSERT INTO `amenity_master` (`id`, `amenity_name`, `amenity_category`, `icon_name`, `is_premium`, `created_at`) VALUES
(1, 'Swimming Pool', 'Recreation', 'pool', 0, '2026-02-28 08:15:55'),
(2, 'Gymnasium', 'Fitness', 'dumbbell', 0, '2026-02-28 08:15:55'),
(3, 'Children Play Area', 'Family', 'child', 0, '2026-02-28 08:15:55'),
(4, 'Jogging Track', 'Outdoor', 'running', 0, '2026-02-28 08:15:55'),
(5, 'Club House', 'Recreation', 'building', 0, '2026-02-28 08:15:55'),
(6, '24/7 Security', 'Safety', 'shield', 0, '2026-02-28 08:15:55'),
(7, 'High Speed Elevators', 'Utility', 'elevator', 0, '2026-02-28 08:15:55'),
(8, 'Conference Rooms', 'Business', 'presentation', 0, '2026-02-28 08:15:55'),
(9, 'Food Court', 'Commercial', 'utensils', 0, '2026-02-28 08:15:55'),
(10, 'Smart Building Systems', 'Technology', 'microchip', 1, '2026-02-28 08:15:55'),
(11, 'Helipad', 'Luxury', 'helicopter', 1, '2026-02-28 08:15:55'),
(12, 'Rooftop Garden', 'Recreation', 'tree', 1, '2026-02-28 08:15:55'),
(13, 'Private Terrace', 'Luxury', 'terrace', 1, '2026-02-28 08:15:55'),
(14, 'Jacuzzi', 'Luxury', 'hot-tub', 1, '2026-02-28 08:15:55'),
(15, 'Home Automation', 'Technology', 'smartphone', 1, '2026-02-28 08:15:55'),
(16, 'ATM Facilities', 'Utility', 'credit-card', 0, '2026-02-28 08:15:55'),
(17, 'Central AC', 'Commercial', 'snowflake', 0, '2026-02-28 08:15:55'),
(18, 'Power Backup', 'Utility', 'battery', 0, '2026-02-28 08:15:55'),
(19, 'Tennis Court', 'Sports', 'tennis', 0, '2026-02-28 08:15:55'),
(20, 'Shopping Arcade', 'Commercial', 'shopping-bag', 0, '2026-02-28 08:15:55'),
(21, 'Mini Theater', 'Entertainment', 'film', 1, '2026-02-28 08:15:55'),
(22, 'Loading Docks', 'Commercial', 'truck', 0, '2026-02-28 08:15:55'),
(23, 'Godown Facilities', 'Utility', 'warehouse', 0, '2026-02-28 08:15:55'),
(24, 'Parking Area', 'Utility', 'car', 0, '2026-02-28 08:15:55'),
(25, 'Private Pool', 'Luxury', 'pool', 1, '2026-02-28 08:15:55'),
(26, 'Landscaped Garden', 'Outdoor', 'flower', 0, '2026-02-28 08:15:55'),
(27, 'Security Cabin', 'Safety', 'guard', 0, '2026-02-28 08:15:55'),
(28, 'Community Hall', 'Recreation', 'users', 0, '2026-02-28 08:15:55'),
(29, 'Temple', 'Religious', 'pray', 0, '2026-02-28 08:15:55'),
(30, 'Market Area', 'Commercial', 'store', 0, '2026-02-28 08:15:55'),
(31, 'Rainwater Harvesting', 'Eco-Friendly', 'droplet', 0, '2026-02-28 08:15:55'),
(32, 'Solar Panels', 'Eco-Friendly', 'sun', 0, '2026-02-28 08:15:55'),
(33, 'Park', 'Outdoor', 'trees', 0, '2026-02-28 08:15:55'),
(34, 'Cafeteria', 'Commercial', 'coffee', 0, '2026-02-28 08:15:55'),
(35, 'Banking Zone', 'Commercial', 'landmark', 0, '2026-02-28 08:15:55'),
(36, 'Medical Center', 'Health', 'hospital', 0, '2026-02-28 08:15:55');

-- --------------------------------------------------------

--
-- Table structure for table `audit_activity`
--

CREATE TABLE `audit_activity` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `activity_type` varchar(100) NOT NULL,
  `activity_details` text DEFAULT NULL,
  `related_entity` varchar(100) DEFAULT NULL,
  `related_entity_id` int(11) DEFAULT NULL,
  `severity` enum('Info','Warning','Critical','Emergency') DEFAULT 'Info',
  `ip_address` varchar(45) DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_activity`
--

INSERT INTO `audit_activity` (`id`, `user_id`, `activity_type`, `activity_details`, `related_entity`, `related_entity_id`, `severity`, `ip_address`, `session_id`, `created_at`) VALUES
(1, 1, 'USER_LOGIN', 'Admin logged in from new device', 'users', 1, 'Info', '192.168.1.100', NULL, '2026-02-28 08:24:48'),
(2, 2, 'PROPERTY_SEARCH', 'Searched for 3BHK in Ahmedabad under 1 crore', 'properties', NULL, 'Info', '192.168.1.115', NULL, '2026-02-28 08:24:48'),
(3, 3, 'INQUIRY_SUBMIT', 'Submitted inquiry for GIFT City office', 'inquiries', 2, 'Info', '192.168.1.120', NULL, '2026-02-28 08:24:48'),
(4, 5, 'PROPERTY_UPDATE', 'Updated property pricing for Raceview villas', 'properties', 7, 'Warning', '192.168.1.105', NULL, '2026-02-28 08:24:48'),
(5, 9, 'USER_BLOCK', 'Attempted multiple failed logins from IP', 'users', NULL, 'Critical', '45.123.45.67', NULL, '2026-02-28 08:24:48'),
(6, 1, 'REPORT_GENERATE', 'Generated monthly sales report', NULL, NULL, 'Info', '192.168.1.100', NULL, '2026-02-28 08:24:48');

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action_type` enum('CREATE','UPDATE','DELETE','VIEW','LOGIN','LOGOUT','EXPORT','IMPORT','APPROVE','REJECT') NOT NULL,
  `entity_type` varchar(100) NOT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `old_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_values`)),
  `new_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_values`)),
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `geo_location` varchar(255) DEFAULT NULL,
  `status` enum('Success','Failed','Partial') DEFAULT 'Success',
  `duration_ms` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `user_id`, `action_type`, `entity_type`, `entity_id`, `description`, `old_values`, `new_values`, `ip_address`, `user_agent`, `geo_location`, `status`, `duration_ms`, `created_at`) VALUES
(1, 1, 'CREATE', 'property', 1, 'Created new property: Suncity', NULL, NULL, '192.168.1.100', NULL, NULL, 'Success', NULL, '2026-02-28 08:24:48'),
(2, 1, 'UPDATE', 'property', 2, 'Updated GIFT City project details', NULL, NULL, '192.168.1.100', NULL, NULL, 'Success', NULL, '2026-02-28 08:24:48'),
(3, 5, 'VIEW', 'property', 3, 'Viewed Kalyan penthouse details', NULL, NULL, '192.168.1.105', NULL, NULL, 'Success', NULL, '2026-02-28 08:24:48'),
(4, 9, 'DELETE', 'inquiry', 5, 'Deleted spam inquiry', NULL, NULL, '192.168.1.110', NULL, NULL, 'Success', NULL, '2026-02-28 08:24:48'),
(5, 1, 'LOGIN', 'user', 1, 'Admin login from Ahmedabad', NULL, NULL, '192.168.1.100', NULL, NULL, 'Success', NULL, '2026-02-28 08:24:48'),
(6, 2, 'VIEW', 'property', 5, 'Viewed Diamond project details', NULL, NULL, '192.168.1.115', NULL, NULL, 'Success', NULL, '2026-02-28 08:24:48'),
(7, 3, 'EXPORT', 'property', NULL, 'Exported property list as PDF', NULL, NULL, '192.168.1.120', NULL, NULL, 'Success', NULL, '2026-02-28 08:24:48'),
(8, 11, 'UPDATE', 'users', 11, 'Admin updated user', NULL, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Success', NULL, '2026-02-28 22:00:18'),
(9, 11, 'UPDATE', 'users', 11, 'User deactivated', NULL, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Success', NULL, '2026-03-01 09:05:57'),
(10, 11, 'UPDATE', 'users', 11, 'User deactivated', NULL, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Success', NULL, '2026-03-01 09:06:04'),
(11, 11, 'UPDATE', 'users', 11, 'User activated', NULL, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Success', NULL, '2026-03-01 09:06:17'),
(12, 11, 'UPDATE', 'users', 11, 'Role changed to agent', NULL, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Success', NULL, '2026-03-01 09:07:16'),
(13, 11, 'CREATE', 'properties', 11, 'Property Royal Heights created', NULL, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Success', NULL, '2026-03-01 09:19:10'),
(14, 11, 'UPDATE', 'properties', 2, 'Property core updated', NULL, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Success', NULL, '2026-03-01 09:21:02'),
(15, 11, 'UPDATE', 'properties', 2, 'Status changed to Active', NULL, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Success', NULL, '2026-03-01 09:23:25'),
(16, 11, 'UPDATE', 'users', 14, 'Role changed to admin', NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Success', NULL, '2026-03-01 11:49:40'),
(17, 11, 'CREATE', 'properties', 42, 'Property Sunfarma Testing Property created', NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Success', NULL, '2026-03-05 09:20:30'),
(18, 11, 'UPDATE', 'users', 12, 'Role changed to admin', NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Success', NULL, '2026-03-05 09:23:06');

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `name`, `slug`, `description`, `icon`, `display_order`, `created_at`) VALUES
(1, 'Market Trends', 'market-trends', 'Real estate market analysis and trends', NULL, 1, '2026-02-28 08:24:47'),
(2, 'Investment Guide', 'investment-guide', 'Property investment strategies and tips', NULL, 2, '2026-02-28 08:24:47'),
(3, 'Location Guide', 'location-guide', 'Area-specific property guides', NULL, 3, '2026-02-28 08:24:47'),
(4, 'Buying Guide', 'buying-guide', 'Step-by-step guides for property buyers', NULL, 4, '2026-02-28 08:24:47'),
(5, 'Legal Guide', 'legal-guide', 'Legal aspects of real estate transactions', NULL, 5, '2026-02-28 08:24:47'),
(6, 'NRI Corner', 'nri-corner', 'Property investment guides for NRIs', NULL, 6, '2026-02-28 08:24:47');

-- --------------------------------------------------------

--
-- Table structure for table `blog_comments`
--

CREATE TABLE `blog_comments` (
  `id` int(11) NOT NULL,
  `blog_post_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `parent_comment_id` int(11) DEFAULT NULL,
  `commenter_name` varchar(255) NOT NULL,
  `commenter_email` varchar(255) NOT NULL,
  `comment_text` text NOT NULL,
  `is_approved` tinyint(1) DEFAULT 0,
  `like_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_comments`
--

INSERT INTO `blog_comments` (`id`, `blog_post_id`, `user_id`, `parent_comment_id`, `commenter_name`, `commenter_email`, `comment_text`, `is_approved`, `like_count`, `created_at`) VALUES
(1, 1, 2, NULL, 'Neha Shah', 'neha.shah@email.com', 'Very helpful guide. Can you share more about Vadodara?', 1, 0, '2026-02-28 08:24:48'),
(2, 1, 3, NULL, 'Hitesh Desai', 'hitesh.d@email.com', 'Thanks for the analysis. Surat textile zone info was useful.', 1, 0, '2026-02-28 08:24:48'),
(3, 2, 6, NULL, 'Pooja Joshi', 'pooja.j@email.com', 'Is GIFT City good for small businesses too?', 1, 0, '2026-02-28 08:24:48'),
(4, 2, NULL, NULL, 'Ramesh Patel', 'ramesh.patel@gmail.com', 'I have invested in GIFT City. Great potential!', 1, 0, '2026-02-28 08:24:48'),
(5, 3, 8, NULL, 'Anjali Dave', 'anjali.d@email.com', 'Both cities have merits. I prefer Surat for rental yields.', 1, 0, '2026-02-28 08:24:48'),
(6, 4, 10, NULL, 'Priya Solanki', 'priya.s@email.com', 'Alkapuri is great but too expensive. Any alternatives?', 0, 0, '2026-02-28 08:24:48'),
(7, 5, 4, NULL, 'Komal Mehta', 'komal.mehta@email.com', 'Rajkot is growing fast. Kalavad Road has many new projects.', 1, 0, '2026-02-28 08:24:48'),
(8, 7, 7, NULL, 'Rakesh Trivedi', 'rakesh.t@email.com', 'PMAY subsidy details were very helpful!', 1, 0, '2026-02-28 08:24:48'),
(9, 7, NULL, NULL, 'Suresh Parmar', 'suresh.parmar@yahoo.com', 'Can we get home loan with subsidy for resale property?', 0, 0, '2026-02-28 08:24:48'),
(10, 1, NULL, NULL, 'Harsh', '2084harsh@gmail.com', 'Very informative article!', 0, 0, '2026-02-28 21:30:16'),
(11, 9, 2, NULL, 'Neha Shah', 'neha.shah@email.com', 'Great insights on SG Highway appreciation! Confirms what my broker told me about Thaltej.', 1, 3, '2026-03-02 11:30:43'),
(12, 10, 3, NULL, 'Hitesh Desai', 'hitesh.d@email.com', 'The SG Highway guide is extremely thorough. One thing missing — impact of the Ring Road on Naroda side?', 1, 2, '2026-03-02 11:30:43'),
(13, 14, NULL, NULL, 'Rajesh Mehta', 'rajesh.mehta@gmail.com', 'Dholera article is balanced. Too many people get carried away with hype. The 7-10 year horizon advice is spot on.', 1, 5, '2026-03-02 11:30:43'),
(14, 15, 6, NULL, 'Pooja Joshi', 'pooja.j@email.com', 'I live near the proposed Metro Phase 2 station in Gota. Already seeing construction price jumps!', 1, 4, '2026-03-02 11:30:43'),
(15, 17, 8, NULL, 'Anjali Dave', 'anjali.d@email.com', 'Finally a clear GIFT City investment guide that explains the SEZ vs DTA difference. Very helpful.', 1, 6, '2026-03-02 11:30:43'),
(16, 20, NULL, NULL, 'Suresh Patel', 'suresh.patel@yahoo.com', 'As an NRI in the USA, this is exactly the guide I was looking for. The DTAA section saved me from a big mistake.', 1, 8, '2026-03-02 11:30:43'),
(17, 23, 4, NULL, 'Komal Mehta', 'komal.mehta@email.com', 'South Bopal guide is very accurate. I bought there in 2022 and it has been excellent both for lifestyle and appreciation.', 1, 5, '2026-03-02 11:30:43'),
(18, 25, 10, NULL, 'Priya Solanki', 'priya.s@email.com', 'The GIFT City neighbourhood breakdown is great. One thing — what about the residential projects inside GIFT City boundary itself?', 1, 3, '2026-03-02 11:30:43'),
(19, 29, NULL, NULL, 'Amit Trivedi', 'amit.trivedi@gmail.com', 'Point 2 about carpet area confusion has cost so many buyers in Ahmedabad. This should be mandatory reading before buying.', 1, 7, '2026-03-02 11:30:43'),
(20, 30, 7, NULL, 'Rakesh Trivedi', 'rakesh.t@email.com', 'The comparison of bank rates is useful. Would add that Bank of Baroda is also competitive for MSME owners seeking home loans.', 1, 4, '2026-03-02 11:30:43'),
(21, 33, 2, NULL, 'Neha Shah', 'neha.shah@email.com', 'Used this exact checklist for my recent purchase! Helped me catch a discrepancy in the RERA carpet area.', 1, 6, '2026-03-02 11:30:43'),
(22, 35, 3, NULL, 'Hitesh Desai', 'hitesh.d@email.com', 'RERA has genuinely changed the game. The escrow account requirement alone has prevented so many delays.', 1, 4, '2026-03-02 11:30:43'),
(23, 40, NULL, NULL, 'Kiran NRI', 'kiran.nri@hotmail.com', 'The repatriation section on Form 15CA/CB is very helpful. My CA had no idea about the two property limit — forwarding this!', 1, 9, '2026-03-02 11:30:43'),
(24, 42, NULL, NULL, 'Dhruv Shah', 'dhruv.shah@gmail.com', 'SBI NRI home loan process was smooth for me. The standing instruction from NRE account tip is gold.', 1, 5, '2026-03-02 11:30:43'),
(25, 43, 6, NULL, 'Pooja Joshi', 'pooja.j@email.com', 'The Chandkheda rental yield of 4-5% is real — I rent my flat there to an IT professional and yield is excellent.', 1, 4, '2026-03-02 11:30:43'),
(26, 44, NULL, NULL, 'Harish Patel', 'harish.patel@yahoo.com', 'The FEMA violations section is eye-opening. So many NRIs unknowingly collect cash rent from tenants.', 1, 6, '2026-03-02 11:30:43'),
(27, 47, 8, NULL, 'Anjali Dave', 'anjali.d@email.com', 'The luxury market analysis is spot on. Shela villa projects are selling out faster than builders anticipated.', 1, 3, '2026-03-02 11:30:43'),
(28, 48, 4, NULL, 'Komal Mehta', 'komal.mehta@email.com', 'Finally a balanced vastu article that acknowledges its market impact without dismissing it. Shared this with my family.', 1, 5, '2026-03-02 11:30:43'),
(29, 16, NULL, NULL, 'Maulik Desai', 'maulik.d@gmail.com', 'The top 10 appreciation list matches my experience. GIFT City periphery is phenomenal right now.', 1, 4, '2026-03-02 11:30:43'),
(30, 22, 10, NULL, 'Priya Solanki', 'priya.s@email.com', 'The 8-point due diligence framework should be framed and put in every broker office in Gujarat!', 1, 7, '2026-03-02 11:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext NOT NULL,
  `reading_time_minutes` int(11) DEFAULT 5,
  `is_featured` tinyint(1) DEFAULT 0,
  `view_count` int(11) DEFAULT 0,
  `like_count` int(11) DEFAULT 0,
  `share_count` int(11) DEFAULT 0,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `status` enum('Draft','Published','Scheduled','Archived') DEFAULT 'Draft',
  `published_at` datetime DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `author_id`, `category_id`, `featured_image`, `excerpt`, `content`, `reading_time_minutes`, `is_featured`, `view_count`, `like_count`, `share_count`, `meta_title`, `meta_description`, `status`, `published_at`, `scheduled_at`, `created_at`, `updated_at`) VALUES
(1, 'Gujarat Real Estate Market 2024: Complete Guide', 'gujarat-real-estate-guide-2024', 1, 1, '/uploads/blog/gujarat-market.jpg', 'Complete analysis of Gujarat property market trends for 2024', 'Comprehensive market analysis showing price trends across Gujarat...', 12, 1, 1267, 1, 0, NULL, NULL, 'Published', '2024-01-15 10:30:00', NULL, '2026-02-28 08:24:47', '2026-03-02 11:20:07'),
(2, 'GIFT City: India\'s First Smart City', 'gift-city-smart-city-guide', 5, 2, '/uploads/blog/gift-city.jpg', 'Everything about investing in GIFT City', 'GIFT City is transforming the skyline with world-class infrastructure...', 10, 1, 2116, 0, 0, NULL, NULL, 'Published', '2024-02-10 09:15:00', NULL, '2026-02-28 08:24:47', '2026-03-02 11:20:07'),
(3, 'Ahmedabad vs Surat: Where to Invest?', 'ahmedabad-vs-surat-investment', 9, 2, '/uploads/blog/ahmedabad-surat.jpg', 'Comparative analysis for investors', 'Both cities offer unique advantages...', 8, 0, 891, 0, 0, NULL, NULL, 'Published', '2024-02-20 11:45:00', NULL, '2026-02-28 08:24:47', '2026-03-02 11:20:07'),
(4, 'Vadodara\'s Alkapuri: The Luxury Hub', 'vadodara-alkapuri-luxury', 1, 3, '/uploads/blog/vadodara.jpg', 'Why Alkapuri remains Vadodara\'s most premium address', 'Alkapuri commands premium prices...', 7, 0, 666, 0, 0, NULL, NULL, 'Published', '2024-03-05 14:20:00', NULL, '2026-02-28 08:24:47', '2026-03-02 11:20:07'),
(5, 'Rajkot Development: New Opportunities', 'rajkot-real-estate-growth', 5, 1, '/uploads/blog/rajkot.jpg', 'Rajkot as an emerging real estate hotspot', 'With new infrastructure projects...', 8, 1, 942, 0, 0, NULL, NULL, 'Published', '2024-03-12 10:00:00', NULL, '2026-02-28 08:24:47', '2026-03-02 11:20:07'),
(6, 'Gandhinagar: Government City to IT Hub', 'gandhinagar-it-growth', 9, 3, '/uploads/blog/gandhinagar.jpg', 'Gandhinagar becoming Gujarat\'s IT corridor', 'PDPU, IIT Gandhinagar and Infocity...', 9, 0, 796, 0, 0, NULL, NULL, 'Published', '2024-03-18 13:30:00', NULL, '2026-02-28 08:24:47', '2026-03-02 11:20:07'),
(7, 'First Time Home Buyer Guide - Gujarat', 'first-time-buyer-guide-gujarat', 1, 4, '/uploads/blog/first-time-buyer.jpg', 'Complete guide for first-time buyers', 'From PMAY subsidy to GST rates...', 15, 1, 1866, 0, 0, NULL, NULL, 'Published', '2024-03-25 09:45:00', NULL, '2026-02-28 08:24:47', '2026-03-02 11:20:07'),
(8, 'RERA in Gujarat: 5 Years of Progress', 'rera-gujarat-5-years', 5, 5, '/uploads/blog/rera-gujarat.jpg', 'How RERA has transformed Gujarat RE sector', 'Five years of RERA implementation...', 10, 0, 540, 0, 0, NULL, NULL, 'Draft', NULL, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(9, 'Ahmedabad Real Estate 2025: Price Trends & Hotspots', 'ahmedabad-real-estate-price-trends-2025', 1, 1, '/uploads/blog/ahmedabad-2025.jpg', 'A deep dive into Ahmedabad property prices, fastest-growing micro-markets, and what buyers should expect in 2025.', 'Ahmedabad continues to be one of India\'s most resilient real estate markets. In 2024, average residential prices on SG Highway touched ₹7,500–₹9,000 per sqft, up nearly 14% year-on-year. The western corridor — Thaltej, Bodakdev, South Bopal — has emerged as the city\'s most sought-after residential belt.\n\nKey drivers include the expansion of the Ahmedabad Metro Phase 2, increased IT sector employment, and Gujarat\'s booming industrial output under DMIC. Prahlad Nagar continues to attract premium commercial investment, with Grade-A office rents rising to ₹80–₹100 per sqft per month.\n\nFor buyers, the sweet spot remains the ₹50–₹80 lakh range in emerging localities like Gota, Zundal, and Chandkheda, where infrastructure is catching up fast. The rental market is equally strong, with 3–4% gross yields common across the city.\n\nLooking ahead, the Dholera SIR project and the Mumbai-Ahmedabad Bullet Train corridor are expected to create significant long-term value, making Ahmedabad an attractive destination for both end-users and investors in 2025.', 11, 1, 3200, 45, 12, NULL, NULL, 'Published', '2025-01-10 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(10, 'SG Highway Property Market: The Ultimate 2025 Guide', 'sg-highway-property-market-guide-2025', 5, 1, '/uploads/blog/sg-highway.jpg', 'Everything you need to know about buying or investing along Ahmedabad\'s most dynamic real estate corridor.', 'SG Highway — Sardar Patel Ring Road — has transformed from a dusty outskirts road into Ahmedabad\'s most vibrant commercial and residential corridor. Stretching from Ambli to Vatva, this 72-km ring road has become the spine of new Ahmedabad.\n\nResidential prices here have appreciated nearly 60% over the last five years. Today, 2 BHK apartments range from ₹55 lakh to ₹90 lakh depending on the exact micro-location and builder reputation. Makarba, Shela, and Bopal command the premium end, while Narol and Vatva offer entry-level options.\n\nFor commercial investors, the SG Highway stretch near ISCON and Prahlad Nagar is arguably the most coveted office address in Gujarat, with multinational companies and unicorn startups both setting up bases here.\n\nKey things to watch in 2025: the completion of SP Ring Road connectivity improvements, new Metro stations under Phase 2, and several premium residential launches by Savvy Group, Sun Builders, and Shivalik.', 13, 1, 2800, 38, 9, NULL, NULL, 'Published', '2025-01-18 10:30:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(11, 'Gandhinagar Real Estate: From Government Town to Investment Hub', 'gandhinagar-real-estate-investment-hub-2025', 9, 1, '/uploads/blog/gandhinagar-2025.jpg', 'How Gandhinagar has evolved from a sleepy administrative capital into one of Gujarat\'s most promising real estate markets.', 'Gandhinagar was built to be a planned city, but for decades it remained overshadowed by the commercial bustle of Ahmedabad. That story is changing fast. The GIFT City SEZ, PDPU University, IIT Gandhinagar, and the iCreate innovation centre have collectively repositioned Gandhinagar as Gujarat\'s knowledge and financial capital.\n\nResidential prices across key sectors have risen 20–25% since 2022. Sector 7 and Sector 16 offer affordable entry points (₹4,000–₹5,500 per sqft), while areas closer to GIFT City and Infocity have crossed ₹7,000 per sqft for premium projects.\n\nThe commercial segment is even more compelling. GIFT City office space is now benchmarked globally — with SEZ rents comparable to Mumbai BKC for certain categories of financial services tenants. For domestic investors, GIFT City offers the unique advantage of special regulatory treatment under IFSCA.\n\nLong-term infrastructure catalysts include the planned HSRP (High Speed Rail) connectivity and the Gandhinagar-GIFT-Ahmedabad metro integration, both of which should drive further price appreciation through 2027.', 10, 1, 2100, 29, 7, NULL, NULL, 'Published', '2025-01-25 11:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(12, 'Under-Construction vs Ready-to-Move: Where Does Gujarat Stand in 2025?', 'under-construction-vs-ready-to-move-gujarat-2025', 1, 1, '/uploads/blog/uc-vs-rtm.jpg', 'A data-backed comparison of under-construction and ready-to-move properties across Gujarat\'s major cities.', 'One of the most frequently asked questions from Gujarat home buyers is whether to go for an under-construction property at a lower price or pay a premium for ready-to-move. The answer is nuanced and depends heavily on your timeline, risk appetite, and city.\n\nIn Ahmedabad, under-construction properties on SG Highway are available at 15–25% discount to comparable ready projects. In GIFT City, under-construction commercial space offers even steeper discounts — sometimes 30% — given the long possession timelines of 4–6 years.\n\nHowever, RERA has significantly reduced the risk associated with under-construction purchases in Gujarat. As of early 2025, Gujarat has one of the highest RERA compliance rates in India. Builders who miss possession dates face mandatory compensation, which has acted as a strong deterrent.\n\nFor end-users who need immediate possession, ready-to-move properties in Gandhinagar Sector 16, South Bopal, and Chandkheda are competitively priced. For pure investors with a 3–5 year horizon, under-construction offers superior IRR potential, particularly in GIFT City and Dholera.', 9, 1, 1750, 22, 5, NULL, NULL, 'Published', '2025-02-03 09:30:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(13, 'Gujarat Property Price Index 2024 – Annual Review', 'gujarat-property-price-index-2024-annual-review', 5, 1, '/uploads/blog/price-index.jpg', 'City-by-city breakdown of how property prices moved across Gujarat in 2024, with data on Ahmedabad, Surat, Vadodara, Rajkot, and Gandhinagar.', 'Gujarat\'s property market delivered solid performance in 2024, with aggregate residential prices rising 11–16% across the five major cities. Here is a city-wise breakdown:\n\nAhmedabad: Average residential prices rose from ₹5,800 to ₹6,600 per sqft, driven by western suburbs. Commercial rents in Prahlad Nagar crossed ₹90 per sqft per month.\n\nGandhinagar: Prices in GIFT City Zone 2 surged nearly 22%, making it the highest appreciating micro-market in the state.\n\nSurat: The Vesu-Pal corridor saw 14% appreciation, buoyed by the textile and diamond industry revival. The upcoming Surat Metro has already begun influencing prices.\n\nVadodara: Alkapuri and Gotri held steady with 10–12% growth. The Vadodara Smart City project has created emerging pockets near Manjalpur.\n\nRajkot: Kalavad Road and Kalawad Road saw 13% appreciation — the fastest in Saurashtra — driven by new IT and industrial zones.\n\nFor 2025, analysts project a continuation of these trends, with GIFT City, Dholera, and the Ahmedabad-Gandhinagar corridor expected to outperform.', 12, 0, 1900, 18, 6, NULL, NULL, 'Published', '2025-02-10 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(14, 'Dholera SIR: The Investment Opportunity Decade', 'dholera-sir-investment-opportunity-2025', 9, 1, '/uploads/blog/dholera-sir.jpg', 'Why Dholera Smart Industrial Region is the most talked-about long-term investment in Gujarat real estate.', 'Dholera SIR spans over 920 square kilometres — roughly twice the size of Mumbai — and is being developed as India\'s first greenfield smart city under the Delhi-Mumbai Industrial Corridor (DMIC) initiative. For real estate investors, it represents a once-in-a-generation opportunity, but also comes with significant risks that must be understood.\n\nCurrent land prices in Dholera range from ₹5,000 to ₹18,000 per sqft for plotted developments, depending on zone and proximity to the proposed airport site. The Dholera International Airport — once operational — is expected to be a major catalyst. Phase 1 infrastructure, including a dedicated road from Ahmedabad and trunk utilities, is nearing completion.\n\nMajor players already committed to Dholera include Tata Group, Foxconn, and several semiconductor companies under India\'s Production Linked Incentive (PLI) scheme. The semiconductor ecosystem alone could drive substantial housing demand within 5–8 years.\n\nInvestors should note that Dholera is a long-term play — a 7–10 year horizon is realistic. RERA-registered plotted development schemes from credible developers are the safest entry point. Avoid unregistered agricultural land conversions that are widely marketed but carry legal risk.', 14, 1, 4100, 62, 18, NULL, NULL, 'Published', '2025-02-18 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(15, 'Ahmedabad Metro Phase 2: Impact on Property Prices', 'ahmedabad-metro-phase-2-property-price-impact', 1, 1, '/uploads/blog/ahmedabad-metro.jpg', 'How the expansion of Ahmedabad Metro is reshaping property demand along the new corridors.', 'Ahmedabad\'s Metro Rail Phase 2 is set to add over 28 km of new track, connecting Motera in the north to GIFT City in the east and extending the existing network toward Thaltej and Bopal in the west. For property buyers, this is one of the most significant infrastructure developments of the decade.\n\nHistorically, properties within 500 metres of a Metro station command a 10–18% premium over comparable properties further away. This pattern is already playing out in Ahmedabad. Areas like Gota, Chandkheda, and Science City — all along the Phase 2 alignment — have seen preemptive price jumps of 8–12% since the Phase 2 route announcement.\n\nFor investors, the highest upside zones are those that are currently underpriced but will become Metro-adjacent. New Ranip, Naroda (East Line), and parts of Nikol fall in this category. Residential projects targeting the ₹35–₹55 lakh segment in these areas are seeing robust pre-launch demand.\n\nThe Metro-GIFT City connectivity is particularly significant — it will for the first time create a direct, traffic-free link between Ahmedabad CBD and Gujarat\'s financial SEZ, opening up a new class of long-distance daily commuters who may choose to live in Ahmedabad and work in GIFT City.', 11, 1, 3500, 55, 14, NULL, NULL, 'Published', '2025-03-01 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(16, 'Top 10 Fastest-Appreciating Localities in Ahmedabad (2024–25)', 'top-10-fastest-appreciating-localities-ahmedabad-2025', 5, 1, '/uploads/blog/top-localities-ahmedabad.jpg', 'Data-driven ranking of Ahmedabad localities that delivered the best returns for real estate investors in the last 12 months.', 'Based on property transaction data and listing price trends, here are the top 10 fastest-appreciating localities in Ahmedabad over 2024–2025:\n\n1. GIFT City Periphery (Sector 7, Zundal) – 22% appreciation\n2. Shela – 18%, driven by premium bungalow demand\n3. Thaltej – 17%, Metro Phase 2 effect\n4. Bodakdev – 16%, sustained luxury demand\n5. South Bopal – 15%, strong builder pipeline\n6. Gota – 14%, affordable + Metro\n7. Makarba – 14%, SG Highway commercial spillover\n8. Chandkheda – 13%, new IT campuses\n9. Prahlad Nagar – 13%, Grade-A office demand\n10. ISCON Ambli Road – 12%, luxury residential pipeline\n\nThe common thread across most of these localities is infrastructure — either Metro proximity, highway access, or proximity to employment hubs. Buyers looking for value should look one locality beyond the premium belt: areas like New Bopal, Shela Extension, and Uvarsad are where the next wave of appreciation is likely to originate.', 10, 0, 2700, 41, 11, NULL, NULL, 'Published', '2025-03-08 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(17, 'How to Invest in GIFT City as a Retail Investor', 'how-to-invest-gift-city-retail-investor', 5, 2, '/uploads/blog/gift-city-invest.jpg', 'A practical step-by-step guide for individual investors looking to participate in Gujarat\'s GIFT City real estate opportunity.', 'GIFT City — Gujarat International Finance Tec-City — is one of the few real estate markets in India that operates under a unique regulatory framework (IFSCA) with distinct tax and legal advantages. But how does a retail investor actually participate?\n\nStep 1: Understand the zones. GIFT City has a Special Economic Zone (SEZ) and a Domestic Tariff Area (DTA). Tax benefits, primarily exemption from IGST and special income tax treatment, apply only within the SEZ. Commercial offices in the SEZ are primarily marketed to financial services companies, IT/ITES firms, and banks.\n\nStep 2: Choose your investment vehicle. Retail investors can buy commercial office units directly (starting from ₹2.5 crore for a 250 sqft unit), invest through Real Estate Mutual Funds exposed to GIFT City projects, or participate via pre-IPO real estate companies with GIFT City exposure.\n\nStep 3: Evaluate the tenant mix. The key risk in GIFT City commercial real estate is vacancy. Projects with pre-committed anchor tenants — banks, insurance companies, fund houses — carry significantly lower risk than speculative office purchases.\n\nStep 4: Understand possession timelines. Most GIFT City projects being launched today have possession dates of 2028–2030. Your capital will be locked for 4–6 years. Rental income, when it begins, typically yields 7–9% on invested capital — among the highest in India.\n\nStep 5: Verify RERA registration and builder track record. Despite its special zone status, GIFT City commercial projects are subject to GRERA. Always verify before investing.', 14, 1, 3800, 58, 16, NULL, NULL, 'Published', '2025-01-22 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(18, '5 Reasons Ahmedabad is India\'s Best City for Real Estate ROI', 'ahmedabad-best-city-real-estate-roi-india', 1, 2, '/uploads/blog/ahmedabad-roi.jpg', 'Why Ahmedabad consistently outperforms most Indian cities on real estate return metrics.', 'When sophisticated investors compare Indian cities for real estate ROI, Ahmedabad consistently ranks in the top three, often ahead of Pune, Hyderabad, and Bengaluru. Here\'s why.\n\n1. Low Entry Price, High Appreciation: Average property prices in Ahmedabad\'s premium localities are still 40–60% lower than Mumbai and 20–30% lower than Bengaluru for comparable quality. Yet appreciation rates have been neck-and-neck.\n\n2. Strong Rental Demand: Ahmedabad\'s growing IT/ITES sector and large student population (IIM, NID, NIFT, multiple engineering colleges) create a perpetual demand for rental housing. Gross rental yields of 3.5–4.5% are achievable without aggressive pricing.\n\n3. RERA Compliance: Gujarat has one of India\'s most active RERA regimes. Buyer protection is high, reducing the risk premium associated with under-construction purchases.\n\n4. Infrastructure Pipeline: Bullet Train, Metro Phase 2, SP Ring Road expansion, and DMIC together represent tens of thousands of crores in infrastructure spending around Ahmedabad — all of which historically correlate with property price appreciation.\n\n5. Business-Friendly State Government: Gujarat\'s track record of ease-of-doing-business means industrial and commercial growth — the primary driver of housing demand — continues to outpace the national average.', 12, 1, 2900, 44, 13, NULL, NULL, 'Published', '2025-02-06 09:30:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(19, 'Commercial Real Estate in Gandhinagar: The GIFT City Effect', 'commercial-real-estate-gandhinagar-gift-city-effect', 9, 2, '/uploads/blog/gift-city-commercial.jpg', 'How GIFT City\'s rise is reshaping commercial real estate demand across the entire Gandhinagar district.', 'The gravitational pull of GIFT City is now being felt well beyond its own boundaries. Offices, co-working spaces, retail establishments, and ancillary services that support the GIFT City workforce are springing up across a widening radius — from Sector 11 Gandhinagar to the Ahmedabad-Gandhinagar Expressway.\n\nCommercial rents immediately adjacent to GIFT City have doubled in three years. Grade-B office space in Infocity Phase 2 — a 5-minute drive from GIFT City Gate — now fetches ₹45–₹55 per sqft per month, up from ₹22–₹28 in 2021. These are not GIFT City prices, but they represent a significant step up from traditional Gandhinagar commercial values.\n\nFor investors, Infocity and Sector 11 represent the \'value play\' relative to GIFT City itself. Entry prices for commercial units here are ₹12,000–₹14,000 per sqft, compared to ₹18,000–₹22,000 for GIFT City SEZ space. The rental yield is slightly lower, but the capital risk is also reduced given smaller ticket sizes and a broader tenant universe.\n\nEmerging micro-markets to watch: the DAIICT-iCreate corridor in Infocity, and the Gandhinagar-Ahmedabad Expressway commercial strip between Vaishnodevi Circle and Zundal, where several new business parks are in advanced planning stages.', 13, 0, 1600, 21, 5, NULL, NULL, 'Published', '2025-02-14 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(20, 'NRI Real Estate Investment in Gujarat: A 2025 Complete Guide', 'nri-real-estate-investment-gujarat-2025-complete-guide', 5, 6, '/uploads/blog/nri-investment.jpg', 'Everything NRIs need to know to invest in Gujarat property in 2025 — from FEMA rules to the best cities and localities.', 'Gujarat has one of the largest NRI communities in the world — with significant populations in the USA, UK, Canada, Australia, and East Africa. A large proportion of this diaspora maintains deep ties to Gujarat and frequently looks to invest in property back home. Here is a comprehensive guide for 2025.\n\nLegal Framework: NRIs (Non-Resident Indians) can freely buy residential and commercial property in India under FEMA (Foreign Exchange Management Act). There is no limit on the number of properties. Agricultural land, plantation property, and farmhouses cannot be purchased by NRIs without RBI approval — a common point of confusion.\n\nTax Implications: NRIs are subject to TDS (Tax Deducted at Source) of 20% on long-term capital gains and 30% on short-term gains when they sell. However, Double Taxation Avoidance Agreements (DTAA) with most countries where Gujarati NRIs reside can significantly reduce the effective tax burden. A CA with DTAA expertise is essential.\n\nBest Cities for NRI Investment in Gujarat: GIFT City leads for commercial returns and is globally benchmarked. Ahmedabad (SG Highway, Prahlad Nagar, Bodakdev) is the safest residential market. Gandhinagar (Sector 5, Sector 21) offers steady appreciation with low risk. Surat offers the highest rental yields (4–5%) among Gujarat cities.\n\nPower of Attorney: Most NRIs execute a PoA in favour of a trusted family member or CA for property management. RERA now mandates that all PoA transactions for under-construction projects be registered, adding a layer of buyer protection.\n\nOur recommendation: NRIs new to Gujarat property should start with a RERA-approved residential project from a top-10 builder in Ahmedabad or Gandhinagar before venturing into commercial or plotted development.', 15, 1, 4500, 71, 22, NULL, NULL, 'Published', '2025-03-05 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(21, 'Plotted Development vs Apartment: What Makes More Sense in Gujarat?', 'plotted-development-vs-apartment-gujarat-2025', 1, 2, '/uploads/blog/plot-vs-apartment.jpg', 'A detailed comparison of plotted development and apartment investment strategies for Gujarat buyers in 2025.', 'The choice between a plot and an apartment is one of the most consequential decisions a Gujarat property buyer makes. Both have delivered strong returns historically, but they suit very different buyer profiles.\n\nPlotted Development Pros: Higher long-term appreciation (plots have historically appreciated 2–3x more than apartments in Gujarat over 20-year horizons), complete control over construction timeline and design, no maintenance charges, and no builder dependency post-purchase.\n\nPlotted Development Cons: Requires active management (construction, maintenance of boundary, tax payments). Rental income is zero unless you build. Higher liquidity risk in the short term — plots take longer to sell than apartments.\n\nApartment Pros: Immediate or near-immediate rental income, strong liquidity (easier to sell), modern amenities without personal maintenance burden, and RERA protection during construction.\n\nApartment Cons: Depreciating structure (the land appreciates; the building depreciates). Maintenance charges that grow over time. HOA/society politics.\n\nThe Gujarat Context: In fast-developing areas like Dholera, Shela, and Uvarsad, plotted development from RERA-approved developers offers compelling value. In established markets like Bopal, Thaltej, and Gandhinagar Sector 7, apartments from reputed builders offer better risk-adjusted returns for most buyers.\n\nOur recommendation: If you have a 10+ year horizon and can actively manage, plots in emerging Gujarat localities. If you have a 3–7 year horizon and want passive returns, a quality apartment in an established Ahmedabad or Gandhinagar locality.', 11, 0, 2210, 33, 8, NULL, NULL, 'Published', '2025-03-12 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08'),
(22, 'How to Analyse a Real Estate Project in Gujarat Before Buying', 'how-to-analyse-real-estate-project-gujarat', 9, 2, '/uploads/blog/project-analysis.jpg', 'A systematic due diligence framework for evaluating any Gujarat property investment — before you write a cheque.', 'Most buyers in Gujarat make property decisions based on location, price, and builder reputation alone. While these are important, a rigorous analysis framework can prevent costly mistakes. Here is the eight-point checklist we recommend.\n\n1. RERA Verification: Visit rera.gujarat.gov.in and verify the RERA number. Check the project\'s registered carpet area, approved plan, and any complaints filed against the builder.\n\n2. Builder Track Record: How many projects has the builder delivered? What is their average delay track record? Visit at least two completed projects and speak to residents.\n\n3. Title Due Diligence: Engage a property lawyer to verify the title chain for at least 30 years. Check for encumbrances on the parent land. Verify that the builder holds clear title, not just development rights.\n\n4. Approvals: Verify that the building plan is approved by the relevant authority (AMC, VMC, GDCR). Check environmental clearance for projects above a certain size. Verify fire NOC status.\n\n5. Financial Health of Builder: If the builder is a public company, review their annual report. For private builders, check their credit rating if available. A heavily leveraged builder is a possession-delay risk.\n\n6. Pricing Benchmarking: Compare the price per sqft with three comparable projects within 2 km. If the price is more than 15% below comparable projects, understand why — it may indicate hidden quality issues.\n\n7. Payment Plan Analysis: Construction-linked plans are safer than time-linked plans. Ensure your agreement specifies RERA-mandated compensation for delays.\n\n8. Exit Liquidity: Ask yourself: if you need to sell this flat in 2 years, who is your buyer? Projects in locations with strong resale markets (near schools, hospitals, metro) have significantly better liquidity.', 12, 0, 1860, 28, 7, NULL, NULL, 'Published', '2025-03-19 09:30:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08'),
(23, 'South Bopal: Ahmedabad\'s Most Complete Suburb', 'south-bopal-ahmedabad-suburb-guide-2025', 1, 3, '/uploads/blog/south-bopal.jpg', 'A comprehensive location guide to South Bopal — amenities, connectivity, property prices, and top projects.', 'South Bopal has, in the span of a decade, transformed from agricultural land on Ahmedabad\'s western fringe to one of the city\'s most complete and self-sufficient suburban destinations. It now offers everything a modern family needs — top schools, hospitals, malls, restaurants, parks, and an expanding residential pipeline — all within a walkable radius.\n\nConnectivity: South Bopal is connected to SG Highway via South Bopal-Ambli Road and Sindhu Bhavan Road. The drive to Prahlad Nagar takes 20–25 minutes and to Ahmedabad airport approximately 30 minutes. The upcoming Metro Phase 2 Western Extension will significantly improve public transport access.\n\nSocial Infrastructure: The locality is home to several reputed schools including Zebar School, Euro School, and Udgam School branches. Healthcare is served by Shalby Hospital, HCG, and multiple clinics. The nearby Sobo Centre, Iscon Mega, and D-Mart serve daily retail needs.\n\nProperty Prices (2025): 2 BHK apartments: ₹55–₹75 lakh (800–1,100 sqft). 3 BHK: ₹80 lakh–₹1.20 crore (1,200–1,600 sqft). Bungalow plots: ₹1.2–₹2 crore for 200–350 sqyd.\n\nTop Builders Active: Savvy Group, Sun Builders, Shivalik, Iscon Group, and multiple mid-tier regional developers.\n\nInvestment Outlook: With the Metro extension, South Bopal is expected to see 12–18% price appreciation over 2025–2027. Rental demand is strong, driven by the large professional population working along SG Highway. A solid choice for both end-use and investment.', 12, 1, 3100, 47, 13, NULL, NULL, 'Published', '2025-01-28 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(24, 'Prahlad Nagar: Ahmedabad\'s Business & Lifestyle Epicentre', 'prahlad-nagar-ahmedabad-location-guide', 5, 3, '/uploads/blog/prahlad-nagar.jpg', 'Why Prahlad Nagar remains Ahmedabad\'s most premium business address — and what it means for residential prices nearby.', 'If you draw a circle of 2 km around the Prahlad Nagar Garden, you will find arguably the highest concentration of Grade-A offices, luxury hotels, fine dining restaurants, premium retail, and upscale residences anywhere in Gujarat. Prahlad Nagar is to Ahmedabad what BKC is to Mumbai — a planned commercial district that has become the city\'s prestige address.\n\nOffice Market: Mondeal Heights, Mondeal Square, ISCON Atria, and Westgate are among the landmark commercial towers that house multinationals, top-tier Indian conglomerates, and fast-growing startups. Office rents range from ₹75–₹110 per sqft per month, among the highest in western India.\n\nResidential Market: Living in or near Prahlad Nagar commands a steep premium. 3 BHK apartments in the vicinity range from ₹1.2 crore to ₹2.5 crore. Buyers are typically senior professionals, business owners, and families who prioritize lifestyle over space.\n\nRetail & Dining: The CG Road–Prahlad Nagar–Satellite corridor is home to Ahmedabad\'s finest restaurants, including several renowned Gujarati thali establishments and international cuisine options. VR Mall and AlphaOne Mall are both within a 10-minute radius.\n\nInvestment Thesis: Prahlad Nagar is a low-cap-gain, high-stability market. Prices are already at a premium, but so is demand. Rental yields of 3–3.5% on quality residential property are reliable. Commercial units, if acquired at the right price, can yield 6–8% and appreciate steadily.', 13, 1, 2600, 38, 10, NULL, NULL, 'Published', '2025-02-04 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(25, 'GIFT City Neighbourhood Guide: Where to Live and Work', 'gift-city-neighbourhood-guide-2025', 9, 3, '/uploads/blog/gift-city-neighbourhood.jpg', 'A detailed guide to GIFT City\'s zones, infrastructure, residential options, and what life is like in Gujarat\'s first planned financial city.', 'GIFT City is a unique entity in Indian real estate — it is simultaneously an office park, a planned city, and an international financial centre. Understanding its geography is essential before making any decision to work, live, or invest here.\n\nThe Zones: GIFT City is divided into SEZ (Special Economic Zone) and Domestic Tariff Area (DTA). The SEZ is where most financial services companies, banks, and IT/ITES tenants operate, enjoying significant tax benefits. The DTA has more flexible occupancy but fewer tax advantages.\n\nGIFT One & GIFT Two: These are the two primary commercial towers already operational. GIFT One is almost fully leased; GIFT Two is nearing completion. Several more towers are under construction, including projects by Adani Realty, Tata Realty, and other major developers.\n\nResidential in and around GIFT City: GIFT City itself has limited residential development within its boundaries. Most GIFT City workers live in Gandhinagar Sector 7, Sector 9, or Zundal — all within a 10–20 minute commute. Prices in these areas have risen sharply since GIFT City began operational.\n\nLifestyle: GIFT City has a dedicated bus rapid transit, cycle tracks, and a convention centre. Multiple hotels including Courtyard by Marriott serve business travellers. A retail high street, international school, and hospital are in advanced planning stages.\n\nWhy it matters for investors: The full build-out of GIFT City is projected to create 500,000 jobs over 20 years. Even if half that number materialises, the housing demand created in the immediate vicinity will be transformational.', 14, 1, 3700, 56, 17, NULL, NULL, 'Published', '2025-02-20 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(26, 'Chandkheda: Ahmedabad\'s Rising Northern Suburb', 'chandkheda-ahmedabad-suburb-guide-2025', 1, 3, '/uploads/blog/chandkheda.jpg', 'Why Chandkheda is attracting first-time buyers and investors looking for value in Ahmedabad\'s rapidly developing north zone.', 'Chandkheda sits at the northern gateway of Ahmedabad, straddling the line between the city proper and the fast-developing Gandhinagar periphery. For years it was the domain of middle-income families seeking affordable alternatives to the pricier western suburbs. Today, it is evolving rapidly, driven by infrastructure investment and proximity to employment hubs.\n\nConnectivity: Chandkheda enjoys excellent connectivity via the Ahmedabad-Gandhinagar Highway, the SP Ring Road, and the BRTS corridor. Sabarmati Railway Station — one of Ahmedabad\'s busiest — is minutes away. The Ahmedabad Metro Phase 2 North-South extension is expected to reach Chandkheda, which will be a significant catalyst.\n\nEmployment Proximity: Chandkheda is strategically positioned between Ahmedabad\'s industrial north (Naroda, Kathwada GIDC) and Gandhinagar\'s IT zone (Infocity, GIFT City). Workers from both corridors find Chandkheda a logical residential base.\n\nProperty Prices (2025): 1 BHK: ₹22–₹32 lakh. 2 BHK: ₹40–₹58 lakh. 3 BHK: ₹60–₹80 lakh. These are among the most affordable prices in any part of Ahmedabad with metro-level infrastructure.\n\nBuilder Activity: Vastushilp Group, Safal Group, and a number of regional developers are active. Most projects here are RERA-registered mid-segment projects with possession timelines of 2–3 years.\n\nFor first-time buyers and investors seeking yield, Chandkheda offers one of the best entry points in Ahmedabad in 2025.', 11, 0, 1902, 26, 7, NULL, NULL, 'Published', '2025-03-06 09:30:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:33:00'),
(27, 'Bodakdev: Ahmedabad\'s Most Sought-After Address', 'bodakdev-ahmedabad-luxury-guide-2025', 5, 3, '/uploads/blog/bodakdev.jpg', 'The definitive guide to Bodakdev — Ahmedabad\'s luxury residential heartland.', 'Bodakdev has long held the title of Ahmedabad\'s most aspirational residential address. Sandwiched between Thaltej to the north, Prahlad Nagar to the south, and the ISKCON Temple as its cultural anchor, Bodakdev is where Ahmedabad\'s industrialist families, senior professionals, and successful entrepreneurs choose to live.\n\nWhat makes Bodakdev special is the quality of its built environment: wide tree-lined roads, low-density residential plots, limited high-rises (by Ahmedabad standards), and exceptional social infrastructure. The locality has some of the city\'s best schools (Zebar, Udgam, Vivekananda), leading hospitals (Shalby, HCG), and premium restaurants.\n\nProperty Market: Bodakdev\'s property market is predominantly plotted bungalows and luxury apartments. A 200–300 sqyd plot with construction can cost ₹3–₹6 crore. Luxury 4 BHK apartments in projects like Rajpath Rangoli range from ₹2 crore to ₹4 crore. There is very little supply below ₹1.5 crore, which is a market signal of exclusivity.\n\nRental Market: Bodakdev commands some of Ahmedabad\'s highest rents — ₹35,000–₹75,000 per month for 3–4 BHK apartments. Corporate housing demand from multinationals with offices in nearby Prahlad Nagar sustains this premium.\n\nInvestment Outlook: Capital appreciation in Bodakdev is moderate (10–13% annually) but extremely reliable. The market rarely dips because supply is constrained and demand is sticky. For high-net-worth buyers looking for capital preservation with reasonable returns, Bodakdev is the gold standard.', 12, 1, 2410, 36, 9, NULL, NULL, 'Published', '2025-03-14 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08'),
(28, 'Gandhinagar Sector Guide: Best Sectors for Living and Investing', 'gandhinagar-sector-guide-best-sectors-2025', 9, 3, '/uploads/blog/gandhinagar-sectors.jpg', 'A sector-by-sector breakdown of Gandhinagar — which sectors offer the best lifestyle, connectivity, and investment potential.', 'Gandhinagar\'s unique grid-based planning means that most of the city\'s real estate market is divided into numbered sectors. For buyers and investors unfamiliar with the city, navigating this can be confusing. Here is a plain-English breakdown of the key sectors.\n\nSector 5 (Near Akshardham): Premium residential zone with excellent greenery and proximity to Akshardham Temple and the Gujarat Secretariat. Prices: ₹6,000–₹8,000 per sqft for apartments. Best for: Government officials, high-income families.\n\nSector 7 (GIFT City Gateway): Strategically located between Ahmedabad and GIFT City, this is the fastest-appreciating sector in Gandhinagar. Prices: ₹5,500–₹7,500 per sqft. Best for: GIFT City workers, investors.\n\nSector 11 (Government Hub): Close to Sachivalaya and NID. Established neighbourhood with good social infrastructure. Commercial demand is strong near Sector 11 Market. Prices: ₹5,000–₹6,500 per sqft.\n\nSector 16 (IT Corridor): Proximity to Infocity and GIDC Electronics Estate makes Sector 16 the IT worker\'s preferred home. Prices: ₹4,500–₹6,000 per sqft. Strong rental demand.\n\nSector 21 (Residential Sweet Spot): One of Gandhinagar\'s most livable sectors — broad roads, good parks, well-maintained infrastructure. Prices: ₹5,500–₹7,000 per sqft. Best for: families looking for quality living at moderate prices.\n\nSector 23 (Emerging Premium): The newest development zone, with large villa plots and gated communities. Prices for villas: ₹9,000–₹12,000 per sqft. Best for: luxury buyers.', 13, 0, 2010, 30, 8, NULL, NULL, 'Published', '2025-03-22 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08'),
(29, '10 Mistakes First-Time Home Buyers Make in Gujarat', '10-mistakes-first-time-home-buyers-gujarat', 1, 4, '/uploads/blog/first-time-buyer-mistakes.jpg', 'Avoid these costly errors that first-time buyers commonly make when purchasing property in Gujarat.', 'Buying your first home is one of the most significant financial decisions of your life. Gujarat\'s property market is generally well-regulated, but first-time buyers still make costly mistakes. Here are the top ten to avoid.\n\n1. Not Verifying RERA Registration: Always check rera.gujarat.gov.in before committing. A non-RERA project has no legal protection for the buyer.\n\n2. Confusing Super Built-Up with Carpet Area: In Gujarat, most builders quote super built-up area. The actual usable carpet area is typically 75–82% of this figure. Calculate your effective price per sqft on carpet area.\n\n3. Ignoring the Location\'s Future: A great apartment in a location with poor future connectivity or infrastructure is a poor investment. Study the area\'s development plan (DP) before buying.\n\n4. Not Reading the Agreement Before Signing: The Builder-Buyer Agreement contains critical clauses on delay compensation, parking, maintenance handover, and specification changes. Have a lawyer review it.\n\n5. Underestimating the Total Cost: Registration charges (1%), stamp duty (4.9–5%), GST on under-construction properties (5%), interior costs, and shifting costs can add 15–20% to your stated purchase price.\n\n6. Over-Borrowing on Home Loan: EMI should not exceed 35–40% of your net monthly income. Factor in future interest rate fluctuations.\n\n7. Not Visiting the Site: Model apartments are always better than what gets delivered. Visit the actual under-construction site and ask to see a completed project by the same builder.\n\n8. Ignoring Resale Potential: Ask yourself: can I sell this flat within 2–3 years if needed? Floor, view, facing, and proximity to amenities all affect resale value.\n\n9. Skipping Legal Due Diligence on the Title: Even RERA-registered projects can have title defects. A property lawyer\'s certificate of title is worth every rupee.\n\n10. Making Emotional Decisions: Take at least 72 hours and visit at least three comparable projects before finalising any property.', 12, 1, 4200, 66, 20, NULL, NULL, 'Published', '2025-01-14 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(30, 'Home Loan Guide for Gujarat Property Buyers 2025', 'home-loan-guide-gujarat-property-buyers-2025', 5, 4, '/uploads/blog/home-loan.jpg', 'Everything Gujarat buyers need to know about home loans — eligibility, best banks, interest rates, and tips to save money.', 'A home loan is likely to be the largest financial commitment of your life. Understanding how to navigate Gujarat\'s home loan market can save you lakhs over the loan tenure.\n\nCurrent Interest Rates (2025): Most major banks are offering home loans between 8.5% and 9.25% p.a. for salaried borrowers with good credit. SBI, HDFC, and Kotak Mahindra Bank are the most competitive lenders in Gujarat. For self-employed borrowers (a large segment in Gujarat given the strong MSME base), rates are 25–50 bps higher.\n\nEligibility Basics: Lenders typically allow a maximum EMI of 40–50% of gross monthly income. For a joint loan (spouse co-applicant), both incomes are considered, significantly improving eligibility. Property must be RERA registered for most banks to fund under-construction projects.\n\nPMF (Pre-EMI vs Full EMI): For under-construction properties, banks offer two options — Pre-EMI (you pay only interest on the disbursed amount) or Full EMI from day one. Full EMI reduces your principal faster and reduces total interest outgo. Choose Full EMI if your cash flow allows it.\n\nTop Tips for Gujarat Borrowers:\n- Maintain a CIBIL score above 750 for the best rates\n- Compare the effective APR, not just the nominal rate\n- Check for prepayment penalties (most floating rate loans have none)\n- PMAY-CLSS subsidies (Credit Linked Subsidy Scheme) may apply if your income is below ₹18 lakh annually\n- Consider a shorter tenure (15 years vs 20 years) to save significantly on total interest\n\nBest Banks for Gujarat Buyers: SBI (lowest processing fees), HDFC (fastest disbursal for approved projects), Bank of Baroda (good for self-employed with robust financials), and Axis Bank (competitive for NRI loans).', 13, 0, 3400, 52, 15, NULL, NULL, 'Published', '2025-01-30 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(31, 'Complete Guide to Property Registration in Gujarat 2025', 'property-registration-gujarat-complete-guide-2025', 9, 4, '/uploads/blog/property-registration.jpg', 'Step-by-step walkthrough of property registration in Gujarat — documents, charges, and the online process.', 'Property registration is the legal act that transfers ownership of property in your name. In Gujarat, the process has been significantly digitised, but first-time buyers still find it confusing. Here is a complete walkthrough.\n\nStep 1 – Calculate Your Stamp Duty: Stamp duty in Gujarat ranges from 4.9% (Ahmedabad, Gandhinagar) to 5% (Vadodara, Surat, Rajkot). Women buyers get a 1% concession, bringing the effective rate down to 3.9–4%. This is levied on the higher of the sale price or the government-mandated jantri value.\n\nStep 2 – Registration Charges: Registration fees are 1% of the sale price, subject to a maximum of ₹30,000. This is in addition to stamp duty.\n\nStep 3 – Gather Documents: You will need the original Sale Agreement, identity proof (Aadhaar, PAN) of both buyer and seller, property tax receipts, NOC from the housing society (for resale), and the original title deed chain.\n\nStep 4 – Book an Appointment at the Sub-Registrar Office: Gujarat offers online appointment booking via the IGR Gujarat portal (igrgujaratat.gov.in). Select the Sub-Registrar office in the district where the property is located.\n\nStep 5 – Register and Collect: Visit the Sub-Registrar office on your appointment date with original documents and passport photos. The deed is registered in real-time. You receive a certified copy immediately or within 1–2 working days.\n\nOnline E-Stamp: Gujarat allows e-stamping of sale deeds through authorised stamp vendors. This eliminates the need to purchase physical stamp paper.\n\nTotal Cost Example: For a ₹75 lakh property in Ahmedabad — Stamp Duty ₹3.67 lakh (4.9%) + Registration ₹30,000 (capped) + Legal fees ₹10,000–₹25,000 = approximately ₹4.07–₹4.22 lakh in transaction costs.', 11, 0, 2800, 43, 12, NULL, NULL, 'Published', '2025-02-08 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(32, 'How to Negotiate Property Price in Gujarat: Proven Tactics', 'how-to-negotiate-property-price-gujarat', 1, 4, '/uploads/blog/negotiation-tactics.jpg', 'Practical negotiation strategies that Gujarat property buyers can use to secure the best possible deal.', 'Property negotiation is both an art and a science. In Gujarat\'s competitive market, where builder supply is strong but buyer competition is equally fierce, knowing how to negotiate can mean the difference of ₹5–₹20 lakh on a single transaction.\n\nTactic 1 – Do Your Homework: Come to the negotiation table with hard data. Know the price per sqft of at least three comparable projects. Know the builder\'s launch price, current price, and any recent discounts offered on other units.\n\nTactic 2 – Identify Motivated Sellers: Builders nearing their financial year end (March) are often more flexible on pricing to hit sales targets. Similarly, a project nearing completion but with high unsold inventory is a negotiation opportunity.\n\nTactic 3 – Negotiate the Package, Not Just the Price: If the builder won\'t budge on price, negotiate free parking, modular kitchen, flooring upgrades, or a longer payment plan. These have real monetary value.\n\nTactic 4 – Use Cash as Leverage: Builders prefer buyers who can pay quickly and cleanly. If you are a cash buyer (no loan required) or have a pre-approved loan, use this as a negotiation advantage — offer faster payment in exchange for a price reduction.\n\nTactic 5 – Be Willing to Walk Away: The most powerful negotiating position is genuine willingness to walk away. If you have a backup option, let the builder know. Do not appear desperate.\n\nTactic 6 – Check for Distressed Resale Units: In any large project, there are always original buyers who need to resell. These motivated resellers often price 5–10% below builder rates to ensure a quick sale — and they are negotiable.\n\nFor resale properties (secondary market), negotiation is generally more fluid. Sellers are individuals with personal motivations, and price reductions of 8–15% below asking are achievable if you identify the right seller.', 12, 0, 2100, 32, 9, NULL, NULL, 'Published', '2025-02-22 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(33, 'Buying Property in Ahmedabad: Complete 2025 Checklist', 'buying-property-ahmedabad-complete-checklist-2025', 5, 4, '/uploads/blog/ahmedabad-buying-checklist.jpg', 'A comprehensive, step-by-step checklist for anyone buying residential or commercial property in Ahmedabad.', 'Buying property in Ahmedabad is a structured process when approached systematically. This checklist covers every step from initial search to final registration.\n\nPhase 1 – Pre-Search (Weeks 1-2):\n✓ Define your budget (including registration, GST, interiors, EMI capacity)\n✓ Decide: residential or commercial? Under-construction or ready?\n✓ Shortlist 3–5 localities based on work location, school requirements, lifestyle\n✓ Get home loan pre-approval from your preferred bank\n\nPhase 2 – Property Search (Weeks 2-4):\n✓ Use RERA Gujarat portal to verify all shortlisted projects\n✓ Visit at least 5–7 properties in person\n✓ Check builder\'s completed project quality by visiting an old project\n✓ Verify carpet area vs super built-up area\n✓ Check jantri rates to estimate stamp duty\n\nPhase 3 – Due Diligence (Weeks 4-6):\n✓ Engage a property lawyer for title due diligence\n✓ Verify approvals: AMC/AUDA building plan, environmental clearance, fire NOC\n✓ Review the Builder-Buyer Agreement in detail\n✓ Verify all RERA project disclosures match what the builder has told you\n✓ Check encumbrance certificate for the parent land\n\nPhase 4 – Transaction (Weeks 6-8):\n✓ Sign the sale agreement and pay booking amount (get receipt)\n✓ Apply for home loan and coordinate with bank and builder\n✓ Complete stamp duty payment and registration at Sub-Registrar Office\n✓ Obtain the registered sale deed\n\nPhase 5 – Post-Purchase:\n✓ Transfer property tax records to your name (AMC)\n✓ Update society records / join RWA\n✓ Arrange home insurance\n✓ Set up utility connections', 14, 1, 3600, 54, 16, NULL, NULL, 'Published', '2025-03-10 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43');
INSERT INTO `blog_posts` (`id`, `title`, `slug`, `author_id`, `category_id`, `featured_image`, `excerpt`, `content`, `reading_time_minutes`, `is_featured`, `view_count`, `like_count`, `share_count`, `meta_title`, `meta_description`, `status`, `published_at`, `scheduled_at`, `created_at`, `updated_at`) VALUES
(34, 'GST on Property in Gujarat: What Buyers Must Know in 2025', 'gst-on-property-gujarat-buyers-guide-2025', 9, 4, '/uploads/blog/gst-property.jpg', 'Clear explanation of GST applicability, rates, and ITC rules for Gujarat property buyers in 2025.', 'GST on real estate is one of the most misunderstood aspects of property buying in Gujarat. Here is a clear breakdown of the rules as they stand in 2025.\n\nWhen Does GST Apply? GST applies only on under-construction properties. If you buy a ready-to-move property (where the builder has received the occupancy certificate), no GST is applicable. This is a significant consideration when comparing under-construction and ready-to-move prices.\n\nGST Rates:\n- Affordable housing (carpet area ≤ 60 sqm in metro cities, ≤ 90 sqm elsewhere; price ≤ ₹45 lakh): 1% GST\n- Non-affordable residential under-construction: 5% GST (no Input Tax Credit for builder)\n- Commercial properties under-construction: 12% GST\n- GIFT City SEZ properties: GST exempt (zero-rated supply)\n\nWhat is Included in Taxable Value? GST is levied on the total consideration, excluding the land component. Land is typically valued at 33% of total value (as per government formula), so effective GST is levied on 67% of the total price. Your builder will show this in the payment schedule.\n\nKey Tip: When comparing an under-construction unit (with GST) vs a ready-to-move unit (without GST), add 5% to the under-construction price for an apples-to-apples comparison — unless the project qualifies as affordable housing.\n\nInput Tax Credit: Builders of non-affordable housing cannot claim ITC on construction materials purchased after April 2019. This has partially been factored into pricing, but is worth understanding as context for why under-construction prices have risen.', 11, 0, 2510, 38, 11, NULL, NULL, 'Published', '2025-03-17 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08'),
(35, 'RERA Gujarat: 7 Years On — What Buyers Need to Know', 'rera-gujarat-7-years-buyers-guide-2025', 1, 5, '/uploads/blog/rera-7-years.jpg', 'A comprehensive review of how GRERA has changed the Gujarat property market and what protections buyers now have.', 'Gujarat Real Estate Regulatory Authority (GRERA) marked its seventh year of operation in 2025. In that time, it has fundamentally changed the power balance between builders and buyers in Gujarat\'s property market. Here is what you need to know.\n\nKey Buyer Protections Under RERA:\n1. Mandatory project registration for projects with 8+ units or 500+ sqm area\n2. Builders must deposit 70% of funds received from buyers into a project-specific escrow account, preventing fund diversion\n3. Delays beyond the promised possession date attract interest compensation at the prevailing SBI MCLR + 2% (currently approximately 10.5–11%)\n4. Builders cannot make changes to approved plans without the consent of 2/3 of buyers\n5. A 5-year defect liability period — builders must fix structural defects reported within 5 years of possession\n\nGRERA\'s Track Record (2025): Over 8,500 projects registered, ₹420 crore in compensation orders issued to buyers, 95%+ compliance rate with escrow fund requirements among major builders.\n\nHow to File a Complaint: Visit rera.gujarat.gov.in, create a buyer account, file your complaint online with supporting documents. RERA adjudicators are mandated to resolve disputes within 60 days.\n\nLimitations of RERA: RERA does not cover plotted developments below certain thresholds. Agricultural land conversion projects are outside RERA purview. Completed projects are not subject to RERA jurisdiction — only ongoing ones.\n\nOur Advice: For every property purchase in Gujarat, start with the RERA portal. Verify registration, check the project\'s declared carpet area, promised amenities, and completion date. Any discrepancy between what the builder says and what RERA shows is a red flag.', 14, 1, 3900, 60, 18, NULL, NULL, 'Published', '2025-01-20 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(36, 'Property Title Verification in Gujarat: A Buyer\'s Complete Guide', 'property-title-verification-gujarat-guide', 5, 5, '/uploads/blog/title-verification.jpg', 'How to verify property title in Gujarat — what documents to check, common title defects, and why it matters.', 'Title verification is the single most important due diligence step a property buyer can take — and the one most frequently skipped. A property with a defective title can result in legal disputes that last decades. In Gujarat, where land records have been partially digitalised, verification is easier than in many other states but still requires professional assistance.\n\nWhat is a Title? A property\'s title refers to the legal ownership chain — from the original land owner through all subsequent transfers to the current seller. A clear title means there are no disputes, encumbrances, or legal claims on this chain.\n\nDocuments to Verify:\n1. Mother Deed / Title Deed: The original document establishing ownership. Verify at least a 30-year chain.\n2. Encumbrance Certificate (EC): Available from the Sub-Registrar, this shows all transactions registered on the property. No EC should show pending mortgage or other liens.\n3. 7/12 Extract (Satbara Utara): Gujarat\'s land revenue record. Shows current ownership and agricultural/non-agricultural classification. Verify at the village panchayat or digitally via the AnyROR portal.\n4. NA Order: If the land was converted from agricultural to non-agricultural use, verify the NA (Non-Agricultural) conversion order is valid.\n5. AUDA/AMC Approved Plans: Verify that the building plan matches actual construction.\n\nCommon Title Defects in Gujarat:\n- Undisclosed co-owners (family property without succession proof)\n- Pending mortgage from a previous owner\n- Agricultural land sold without NA conversion\n- Benami transactions\n- Court-disputed ownership\n\nCost of Title Verification: A property lawyer\'s title opinion for a Gujarat property typically costs ₹5,000–₹25,000 depending on complexity. This is one of the best investments a buyer can make.', 12, 0, 2200, 34, 10, NULL, NULL, 'Published', '2025-02-12 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(37, 'Understanding the Builder-Buyer Agreement in Gujarat', 'builder-buyer-agreement-gujarat-guide', 9, 5, '/uploads/blog/builder-buyer-agreement.jpg', 'A clause-by-clause explanation of what to look for — and what to watch out for — in a Gujarat Builder-Buyer Agreement.', 'The Builder-Buyer Agreement (BBA) is the most important document in your property purchase journey. Under RERA, all BBAs for registered projects must follow a standard format, but builders still retain discretion on several clauses. Here is what to watch.\n\nClause 1 – Carpet Area Definition: RERA mandates that price be quoted on carpet area basis. Verify that the carpet area in your BBA matches what is registered on the RERA portal.\n\nClause 2 – Payment Schedule: Should be construction-linked (milestone-based) rather than time-linked. Construction-linked plans protect you if construction stalls.\n\nClause 3 – Possession Date & Delay Compensation: The BBA must specify an exact possession date. Delay compensation must be at RERA-mandated rate (SBI MCLR + 2%). Be wary of excessive grace periods (legitimate is 3 months; some builders try to insert 12–18 months).\n\nClause 4 – Specifications: The BBA should list construction specifications — flooring type, wall finish, bathroom fittings, electrical load, lift brand. Generic language like \'good quality materials\' is a red flag.\n\nClause 5 – Force Majeure: Most BBAs contain a force majeure clause excusing delays for \'acts of God\'. This should be narrowly defined. During COVID-19, many builders misused broadly worded force majeure clauses.\n\nClause 6 – Maintenance & Common Areas: The BBA should specify when maintenance charges begin (should be from possession, not from a date chosen by the builder), and how the common areas will be transferred to the RWA.\n\nClause 7 – Exit Clauses: What happens if you need to exit the agreement? Most BBAs allow cancellation with a penalty of 2–10% of the booking amount. Negotiate this carefully.\n\nAlways have a property lawyer review your BBA before signing. The ₹5,000–₹15,000 fee is trivial compared to the value at stake.', 13, 0, 1900, 29, 8, NULL, NULL, 'Published', '2025-02-26 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(38, 'Encumbrance Certificate in Gujarat: Why, When and How', 'encumbrance-certificate-gujarat-guide', 1, 5, '/uploads/blog/encumbrance-certificate.jpg', 'Everything you need to know about obtaining and interpreting an Encumbrance Certificate for Gujarat property.', 'An Encumbrance Certificate (EC) is one of the most fundamental documents in any property transaction. Yet many Gujarat buyers either skip it or do not know how to read it. This guide fills that gap.\n\nWhat is an Encumbrance Certificate? An EC is a certificate issued by the Sub-Registrar of Assurances showing all registered transactions on a property over a specified period. It tells you whether the property has any outstanding mortgage, charge, lien, or legal claim.\n\nWhy is it Important? If you buy a property with an undisclosed mortgage (loan taken by the previous owner using the property as collateral), the lender has legal right over the property — even after you have purchased it. An EC protects you from this risk.\n\nHow to Obtain an EC in Gujarat:\n1. Visit the Sub-Registrar office in the district where the property is located\n2. Submit Form 22 (Application for EC) with the property details and the period for which you want the EC\n3. Pay the prescribed fee (approximately ₹200–₹500 for the first 10 years, nominal charges per additional year)\n4. EC is typically issued within 2–5 working days\n\nDigital Option: Gujarat has enabled online EC applications through the igrgujaratat.gov.in portal. This is faster and eliminates the need for a physical visit.\n\nHow to Read an EC:\n- Form 15 (with encumbrances): Lists all registered transactions — mortgages, sales, gifts, etc. Check that all mortgages listed have been discharged.\n- Form 16 (nil encumbrance): Means no transactions are registered in the specified period. This is the desired outcome for a property purchase.\n\nImportant Limitation: An EC only captures registered transactions. Unregistered agreements, oral family settlements, and certain court orders may not appear on an EC. This is why EC verification must be combined with a full title investigation by a property lawyer.', 11, 0, 1700, 25, 7, NULL, NULL, 'Published', '2025-03-04 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(39, 'Benami Property Law and Its Impact on Gujarat Real Estate', 'benami-property-law-gujarat-impact', 5, 5, '/uploads/blog/benami-law.jpg', 'How the Benami Transactions (Prohibition) Act affects buyers, sellers, and investors in Gujarat\'s property market.', 'The Benami Transactions (Prohibition) Amendment Act of 2016 significantly strengthened India\'s framework against benami property — property held in a fictitious name or in the name of another person on behalf of the beneficial owner. For Gujarat\'s large trader and business community, understanding this law is essential.\n\nWhat is a Benami Transaction? A transaction where property is purchased in the name of one person (the benamdar) but paid for and controlled by another (the beneficial owner). Classic examples include property registered in a spouse\'s, employee\'s, or relative\'s name to avoid scrutiny.\n\nPenalties: Under the amended Act, benami properties are liable to confiscation by the government. The beneficial owner and the benamdar can face rigorous imprisonment up to 7 years and a fine up to 25% of the fair market value.\n\nImpact on Gujarat Buyers: When buying resale property in Gujarat, buyers must exercise caution if the transaction price is significantly below market value, if the seller cannot provide clear source of funds documentation, or if there are multiple owners with unclear ownership rationale.\n\nRed Flags to Watch:\n- Property transferred for negligible consideration within a family\n- Cash-heavy transactions (increasingly scrutinised post-demonetisation)\n- NRI-owned property with unclear source of funds\n- Corporate property with complex ownership structures\n\nProtection for Bona Fide Buyers: If you buy property in good faith (bona fide purchaser for consideration without notice of benami nature), you are protected under the Act. However, \'good faith\' must be demonstrated — again emphasising the need for proper title due diligence and documented payment through banking channels.', 14, 0, 1410, 20, 5, NULL, NULL, 'Published', '2025-03-21 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08'),
(40, 'Gujarati NRI\'s Guide to Repatriation of Property Sale Proceeds', 'nri-property-sale-repatriation-gujarat-guide', 9, 6, '/uploads/blog/nri-repatriation.jpg', 'How NRIs can legally repatriate money from property sales in Gujarat — a clear guide to FEMA rules and banking procedures.', 'One of the most frequently asked questions from Gujarati NRIs is: after I sell my property in Gujarat, how do I transfer the money back to my country of residence? The answer involves FEMA regulations, income tax compliance, and the right banking procedures. Here is a step-by-step guide.\n\nRules for Repatriation:\n1. Only two residential properties can have their sale proceeds fully repatriated (for properties purchased from foreign inward remittance or NRE funds)\n2. The total amount repatriable is limited to the original purchase price in foreign currency, or the sale proceeds, whichever is lower — unless prior RBI approval is obtained\n3. Commercial property sale proceeds have different (more permissive) rules\n\nRequired Documents:\n- Form 15CA and Form 15CB (CA certificate on tax compliance)\n- Original sale deed and purchase deed\n- Bank statement showing original inward remittance (if purchased from foreign funds)\n- Income tax clearance/NOC from IT department\n- Bank\'s own remittance application forms\n\nTDS Compliance: Before repatriation, ensure the buyer has deducted TDS correctly. For NRI sellers, TDS is 20% on long-term gains (20%+surcharge+cess on gains) and 30% on short-term. If the actual tax liability after indexation is lower, you can file for a refund after filing your India income tax return.\n\nBanking Channel: Repatriation must happen only through NRO or NRE account. NRE funds are fully repatriable; NRO funds (where domestic income and rent is credited) have an annual repatriation ceiling of USD 1 million with proper documentation.\n\nRecommended Approach: Engage both a FEMA-compliant CA and a bank relationship manager who handles NRI repatriation regularly before initiating the sale. The paperwork is manageable but must be completed in sequence.', 14, 1, 3200, 50, 15, NULL, NULL, 'Published', '2025-01-16 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(41, 'Managing Your Gujarat Property from Abroad: A Practical NRI Guide', 'managing-gujarat-property-from-abroad-nri-guide', 1, 6, '/uploads/blog/nri-property-management.jpg', 'How NRIs can effectively manage their Gujarat real estate from the USA, UK, Canada, or anywhere in the world.', 'Owning property in Gujarat while living abroad is a situation millions of Gujarati NRIs navigate every year. With the right setup, it is entirely manageable. Here is a practical guide.\n\nPower of Attorney (PoA): The most fundamental tool for NRI property management. A registered PoA in favour of a trusted person in India allows them to pay property tax, collect rent, manage tenants, and even execute sale agreements on your behalf. PoAs for property transactions must be registered at the Indian consulate in your country of residence or at an Indian Sub-Registrar office.\n\nRental Management:\n- Use a licensed property management company in Ahmedabad or Gandhinagar (fees: 8–12% of monthly rent)\n- OR have a trusted family member manage with clear instructions and documented rent collection\n- Ensure rent agreements are registered (mandatory for agreements over 11 months in Gujarat)\n- Collect rent in NRO account to comply with FEMA\n\nProperty Tax: AMC, VMC, SMC, GMC all offer online property tax payment. Most NRIs set up auto-payment from an Indian bank account or have their PoA handle this.\n\nMaintenance: For apartment projects, the Resident Welfare Association (RWA) manages common areas. Ensure your contact number and email are updated with the RWA. For independent houses, budget ₹15,000–₹40,000 per year for routine maintenance even when the property is unoccupied.\n\nLegal Protection: Register your property with the local police station (for vacant properties, an important deterrent to encroachment). Ensure property tax, electricity, and water bills are in your name and actively paid — dormant utilities can lead to disconnection and subsequent complications.\n\nVisit Frequency: Ideally, visit your Gujarat property at least once every 2–3 years. In your absence, commission a professional property inspection report annually.', 12, 0, 2700, 41, 12, NULL, NULL, 'Published', '2025-02-01 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(42, 'NRI Home Loan in India: Can You Get One and How?', 'nri-home-loan-india-complete-guide-2025', 5, 6, '/uploads/blog/nri-home-loan.jpg', 'A comprehensive guide for NRIs seeking a home loan to buy property in Gujarat or anywhere in India.', 'Many NRIs are surprised to learn that Indian banks actively offer home loans to non-resident Indians. In fact, NRI lending is a priority segment for most major banks, given the typically higher income levels and stronger repayment discipline of NRI borrowers.\n\nEligibility: NRIs with a valid Indian passport, minimum 2 years of overseas employment, and a stable income source in a convertible currency are eligible. The maximum loan-to-value ratio is 75–80% of the property value, same as for resident Indians.\n\nIncome Consideration: Banks assess NRI home loan eligibility based on overseas income (converted to INR at prevailing rates). Most banks also apply a haircut of 25–50% to overseas income to account for exchange rate risk. If you have domestic rental income in India, it can supplement your eligibility.\n\nCurrency of Repayment: EMIs must be paid in INR through an NRE or NRO account. Many NRIs set up a standing instruction from their NRE account (where overseas income is directly credited) for automatic EMI deduction.\n\nBest Banks for NRI Home Loans (2025):\n- SBI: Lowest rates, strong international presence for documentation\n- HDFC: Fastest processing for RERA-approved projects\n- Axis Bank: Best NRI-specific relationship management\n- ICICI Bank: Convenient for USA/UK-based NRIs given their international banking tie-ups\n- Federal Bank: Particularly strong in Kerala and Gujarat NRI communities\n\nDocuments Required (from abroad): Copy of valid passport and visa, overseas employment letter or business proof, last 3 months salary slips and bank statements, 2 years overseas tax returns, NRE/NRO account statements, and the property documents.\n\nKey Tip: Engage a bank relationship manager who specialises in NRI lending before you begin your property search. Getting pre-qualified determines your budget and makes you a credible buyer.', 13, 1, 3100, 48, 14, NULL, NULL, 'Published', '2025-02-15 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(43, 'Best Localities in Ahmedabad for NRI Investment 2025', 'best-localities-ahmedabad-nri-investment-2025', 9, 6, '/uploads/blog/nri-ahmedabad-localities.jpg', 'Curated recommendations for NRIs looking to invest in Ahmedabad property — balanced for appreciation, rental yield, and hassle-free management.', 'When NRIs invest in Ahmedabad, they typically have three priorities: capital appreciation, rental income, and ease of management from abroad. Not every locality scores well on all three. Here are our curated recommendations for 2025.\n\n1. Prahlad Nagar / Satellite: Best for: Professional tenant base (IT employees, corporate expats), reliable rental income, strong resale liquidity. Price Range: ₹1 crore–₹2.5 crore for 3 BHK. Rental Yield: 3–3.5%. Management ease: High (large rental market, multiple professional property managers).\n\n2. South Bopal / Bopal: Best for: Strong appreciation potential (Metro Phase 2), family-friendly (good schools), mid-segment price points. Price Range: ₹60 lakh–₹1.2 crore for 3 BHK. Rental Yield: 3.2–3.8%. Management ease: Medium.\n\n3. Thaltej: Best for: Balance of price, appreciation, and lifestyle. Close to SG Highway employment. Price Range: ₹80 lakh–₹1.6 crore for 3 BHK. Rental Yield: 3.3–4%. Management ease: High.\n\n4. GIFT City Periphery (Zundal, Sector 7): Best for: Maximum appreciation potential, GIFT City-related rental demand. Price Range: ₹45 lakh–₹80 lakh for 2–3 BHK. Rental Yield: 3.5–4.5%. Management ease: Medium (emerging market, fewer established property managers).\n\n5. Chandkheda: Best for: Value play, high rental yield, diversified tenant base. Price Range: ₹35 lakh–₹65 lakh for 2–3 BHK. Rental Yield: 4–5% (highest in Ahmedabad). Management ease: Medium.\n\nOur Recommendation for Most NRIs: A RERA-approved 3 BHK in South Bopal or Thaltej from a reputed builder offers the best combination of all three criteria. Budget ₹80 lakh–₹1.2 crore all-in.', 14, 1, 2900, 44, 13, NULL, NULL, 'Published', '2025-03-02 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(44, 'FEMA Compliance for NRI Property Owners in Gujarat', 'fema-compliance-nri-property-owners-gujarat', 1, 6, '/uploads/blog/fema-compliance.jpg', 'A practical guide to the FEMA rules that govern NRI property ownership, rental income, and sale in Gujarat.', 'The Foreign Exchange Management Act (FEMA) is the primary legislation governing all cross-border financial transactions related to property for NRIs. Non-compliance — even unintentional — can lead to significant penalties. Here is what every Gujarati NRI property owner must know.\n\nAcquisition: NRIs can acquire residential and commercial property in India without any restrictions. Payment must be made through banking channels — NEFT/RTGS from NRE/NRO account or foreign inward remittance. Cash transactions are prohibited.\n\nRental Income: Rental income from Indian property can be credited to an NRO account. NRO funds can be repatriated up to USD 1 million per financial year subject to tax compliance. Rental income is taxable in India (typically 30% for NRIs, subject to DTAA relief).\n\nMortgage: Property in India can be mortgaged to secure a loan from an Indian bank. The loan proceeds must be used only in India — remitting loan proceeds abroad is not permitted under FEMA.\n\nGifting Property: NRIs can gift property to resident Indians or to other NRIs. However, gifting to non-Indian foreign nationals requires RBI approval.\n\nSale Proceeds: Addressed in detail in our repatriation guide (see related articles). Key point: proceeds from sale of up to two residential properties are repatriable subject to documentation. Agricultural land proceeds cannot be repatriated.\n\nCommon FEMA Violations by NRIs:\n- Accepting rent in cash (must be banking channel)\n- Not declaring Indian rental income on overseas tax returns (where DTAA mandates it)\n- Executing property agreements without registered PoA\n- Using FCNR or NRE funds for agricultural land purchase\n\nPenalty for FEMA Violation: Up to 3x the value of the contravention or ₹2 lakh, whichever is higher. Criminal prosecution is possible for wilful violations.', 11, 0, 2110, 32, 9, NULL, NULL, 'Published', '2025-03-18 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08'),
(45, 'Tax Benefits for NRIs Buying Property in Gujarat', 'tax-benefits-nri-buying-property-gujarat-2025', 5, 6, '/uploads/blog/nri-tax-benefits.jpg', 'Complete guide to income tax deductions, DTAA benefits, and tax optimisation strategies for NRI property investors in Gujarat.', 'Investing in Gujarat property as an NRI has several tax implications — but also meaningful tax benefits that many NRIs overlook. Here is a structured overview.\n\nSection 80C Deduction: NRIs are eligible for deduction of home loan principal repayment up to ₹1.5 lakh per year under Section 80C. This reduces Indian taxable income and is available as long as you file an Indian income tax return.\n\nSection 24(b) Deduction: Interest on home loan is deductible up to ₹2 lakh per year for a self-occupied property. For let-out properties, the entire interest amount is deductible against rental income — a significant benefit for NRIs who rent out their Indian properties.\n\nLong-Term Capital Gains (LTCG): Properties held for more than 2 years qualify for LTCG treatment at 20% with indexation benefit. Indexation adjusts the purchase price for inflation, significantly reducing the taxable gain. For properties purchased 10–15 years ago, indexation can reduce taxable gains by 40–60%.\n\nSection 54 Exemption: If you sell one Indian residential property and reinvest the proceeds in another Indian residential property within the prescribed timeline, LTCG is exempt. NRIs can use this exemption just like resident Indians.\n\nDouble Taxation Avoidance Agreement (DTAA): India has DTAA with USA, UK, Canada, UAE, Australia, Singapore, and most countries where Gujarati NRIs reside. Under DTAA, income taxed in India is either exempt in the country of residence or eligible for a tax credit. This eliminates true double taxation — but the mechanics vary by country. A DTAA-knowledgeable CA is essential.\n\nPractical Tip: Many NRIs structure their Gujarat property investments in an optimal way by ensuring all loans are serviced from NRE accounts (interest is tax-free in India for NRE deposits), maximising Section 24(b) deductions, and planning property sales in years when Indian rental income is low.', 13, 1, 2810, 43, 12, NULL, NULL, 'Published', '2025-03-25 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08'),
(46, 'Affordable Housing in Gandhinagar: Options Under ₹50 Lakh', 'affordable-housing-gandhinagar-under-50-lakh-2025', 9, 4, '/uploads/blog/affordable-gandhinagar.jpg', 'A curated guide to the best affordable housing options in Gandhinagar for budget-conscious buyers in 2025.', 'Not every buyer in Gandhinagar is chasing GIFT City glass towers. A large segment of home buyers — particularly young professionals, government employees, and families relocating from smaller Gujarat cities — are looking for quality homes under ₹50 lakh. The good news: Gandhinagar delivers.\n\nSector 7 (Near Zundal): This is arguably the best value zone in Gandhinagar right now. GIDC-developed affordable housing schemes offer 2 BHK apartments at ₹35–₹45 lakh in RERA-registered, government-approved projects. Possession timelines are reliable given the government developer.\n\nSector 16 (IT Corridor): Mid-segment private developer projects offer 1 BHK at ₹22–₹30 lakh and 2 BHK at ₹38–₹48 lakh. Close to the GIDC Electronics Estate, these are popular with IT professionals who find Infocity rents high.\n\nSector 21 (Mature Neighbourhood): Slightly older resale inventory here can be bought at ₹40–₹50 lakh for a well-maintained 2 BHK. The advantage: established neighbourhood, good social infrastructure, no construction risk.\n\nPMF Schemes: Pradhan Mantri Awas Yojana (Urban) has active projects in Gandhinagar. Eligible buyers (household income below ₹18 lakh) can avail credit-linked interest subsidy of up to ₹2.67 lakh, effectively reducing their home loan cost.\n\nBest Builders for Affordable Gandhinagar: GIDC (safest, government-backed), Lotus Infra, Vastushilp Group.\n\nOur Bottom Line: A budget of ₹40–₹50 lakh in Gandhinagar today buys a RERA-registered 2 BHK with good connectivity and appreciation potential, especially if you choose a location along the planned Metro extension.', 10, 0, 1800, 27, 8, NULL, NULL, 'Published', '2025-02-09 10:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(47, 'Luxury Real Estate in Ahmedabad: ₹2 Crore+ Market Review', 'luxury-real-estate-ahmedabad-2-crore-plus-2025', 1, 2, '/uploads/blog/luxury-ahmedabad.jpg', 'An in-depth look at Ahmedabad\'s fast-growing luxury property segment — who is buying, where, and what to expect.', 'Ahmedabad\'s luxury real estate segment — broadly defined as properties above ₹2 crore — has experienced a remarkable transformation over the last three years. Demand for premium homes has grown faster than overall market volumes, driven by wealth creation in Ahmedabad\'s pharmaceutical, diamond, textile, and chemical sectors.\n\nWho is Buying? The typical luxury buyer in Ahmedabad is a 40–55-year-old business owner or senior professional upgrading from a mid-segment apartment or a 20-year-old bungalow. There is also a small but growing class of wealth-inheriting second-generation buyers with sophisticated design tastes.\n\nWhere are They Buying? Bodakdev remains the address of choice for bungalows and premium plots. Prahlad Nagar and ISCON Ambli Road are the go-to for luxury high-rise apartments. Shela has emerged as a new luxury destination with large plotted villa developments.\n\nProduct Profile: Ahmedabad\'s luxury segment is notable for large-format apartments (2,000–4,000 sqft), thoughtful design (vastu-compliant, open kitchen, home automation), and comprehensive amenities (swimming pool, gym, squash court, co-working spaces). The era of marble lobbies alone is over — buyers now demand experiential common areas.\n\nPrice Benchmarks (2025): Luxury apartments ₹10,000–₹14,000 per sqft, villas and bungalows ₹12,000–₹20,000 per sqft depending on location and built quality.\n\nOutlook: The luxury segment is expected to grow 20–25% in volume in 2025, driven by new launches in Bodakdev and ISCON Ambli Road. Supply is still limited relative to demand — a structural positive for luxury values.', 13, 1, 2600, 39, 11, NULL, NULL, 'Published', '2025-02-23 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-02 11:30:43'),
(48, 'Vastu Shastra and Ahmedabad Real Estate: What Buyers Actually Need to Know', 'vastu-shastra-ahmedabad-real-estate-guide', 5, 4, '/uploads/blog/vastu-ahmedabad.jpg', 'A balanced, practical guide to vastu considerations in Ahmedabad property buying — separating evidence-based factors from myths.', 'In Ahmedabad, perhaps more than in any other major Indian city, vastu shastra plays a significant role in property buying decisions. Entire projects are marketed on their vastu compliance; many buyers reject properties solely on vastu grounds. Here is a balanced take for today\'s informed buyer.\n\nThe Real Estate Impact of Vastu: Whether or not one believes in vastu\'s spiritual premises, its market impact is very real. A vastu-deficient property (south or west facing main entrance, toilet in the north-east, kitchen in the north) will sell 10–20% below comparable vastu-compliant units. For resale purposes, vastu compliance materially affects your liquidity.\n\nCommonly Valued Vastu Features in Ahmedabad:\n- East or North-facing main door (most preferred)\n- Kitchen in the south-east\n- Master bedroom in the south-west\n- Avoid south-facing plots with a road on the south side\n- Overhead tank in the west or south-west\n\nPractical Builder Adaptations: Most reputable Ahmedabad builders — Savvy Group, Sun Builders, Shivalik — design their projects with at least some vastu principles baked in: entry gates facing east or north-east, gardens in the north or east, no cut-corner plots.\n\nWhere Vastu Gets Expensive: High-floor apartments with north or east-facing balconies command ₹500–₹1,500 per sqft premium in premium Ahmedabad projects. On a 1,500 sqft apartment, that is ₹75,000–₹2.25 lakh extra — purely for orientation.\n\nOur Practical Advice: For end-use buyers, consider vastu alongside practical factors (view, ventilation, floor plate) and make a balanced decision. For investment properties targeting resale or rental, east and north-facing units with vastu-aligned kitchens will always be easier to sell or let.', 11, 0, 2310, 35, 10, NULL, NULL, 'Published', '2025-03-28 09:00:00', NULL, '2026-03-02 11:30:43', '2026-03-05 05:19:08');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `department` enum('Sales','Support','Complaints','General') DEFAULT 'General',
  `is_read` tinyint(1) DEFAULT 0,
  `replied` tinyint(1) DEFAULT 0,
  `response` text DEFAULT NULL,
  `responded_by` int(11) DEFAULT NULL,
  `responded_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `phone`, `subject`, `message`, `department`, `is_read`, `replied`, `response`, `responded_by`, `responded_at`, `created_at`) VALUES
(1, 'Ramesh Patel', 'ramesh.patel@gmail.com', '+91 98765 12345', 'Property enquiry about Suncity', 'Interested in 2BHK in Suncity. Please share current price.', 'Sales', 0, 0, NULL, NULL, NULL, '2026-02-28 08:24:48'),
(2, 'Dipika Shah', 'dipika.shah@yahoo.com', '+91 98250 67890', 'Loan assistance required', 'Need home loan for GIFT City property. Suggest good lenders?', 'Support', 1, 1, NULL, NULL, NULL, '2026-02-28 08:24:48'),
(3, 'Kaushik Mehta', 'kaushik.m@gmail.com', '+91 99099 11223', 'Commercial property in Surat', 'Looking for textile shop in Surat. Budget 50-60 lakhs.', 'Sales', 0, 0, NULL, NULL, NULL, '2026-02-28 08:24:48'),
(4, 'Bhavna Trivedi', 'bhavna.t@hotmail.com', '+91 94280 44556', 'Sell my property in Vadodara', 'Want to sell my 3BHK in Alkapuri. Help with valuation?', 'Sales', 1, 0, NULL, NULL, NULL, '2026-02-28 08:24:48'),
(5, 'Nilesh Parmar', 'nilesh.p@gmail.com', '+91 98798 77889', 'NRI property investment', 'NRI in USA interested in Gandhinagar. Need guidance.', 'Sales', 0, 0, NULL, NULL, NULL, '2026-02-28 08:24:48'),
(6, 'Hetal Dave', 'hetal.dave@email.com', '+91 99251 33445', 'Property tax query', 'Need help with property tax calculation for Rajkot villa.', 'Support', 1, 1, NULL, NULL, NULL, '2026-02-28 08:24:48'),
(7, 'Mahesh Solanki', 'mahesh.s@gmail.com', '+91 94276 99001', 'Joint venture proposal', 'We have land on SP Ring Road. Interested in JV with builder.', 'Sales', 0, 0, NULL, NULL, NULL, '2026-02-28 08:24:48'),
(8, 'Geeta Joshi', 'geeta.joshi@email.com', '+91 99012 22334', 'First time buyer help', 'First time buyer for 1BHK in Gandhinagar. Need assistance.', 'Support', 1, 0, NULL, NULL, NULL, '2026-02-28 08:24:48'),
(9, 'Harsh Patel', '2084harsh@gmail.com', '7567586809', 'Partnership Inquiry', 'I would like to discuss a partnership opportunity.', '', 1, 1, NULL, 11, '2026-03-01 17:21:38', '2026-02-28 18:57:48'),
(10, 'Harsh Kamleshbhai Patel', '2084harsh@gmail.com', '07567586809', 'Testing Purpose', 'Testing Purpose Testing Purpose Testing Purpose Testing Purpose', 'Sales', 0, 0, NULL, NULL, NULL, '2026-03-02 07:58:10');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` longtext NOT NULL,
  `category` enum('General Questions','Property Listing','Buying Process','Account & Settings','Payment & Pricing','Legal & RERA','Home Loans','NRI Investment') DEFAULT 'General Questions',
  `display_order` int(11) DEFAULT 0,
  `helpful_count` int(11) DEFAULT 0,
  `not_helpful_count` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `helpful_count`, `not_helpful_count`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'What are the current property registration charges in Gujarat?', 'Registration charges are 1% (max ₹30,000). Stamp duty: Ahmedabad 4.9%, Vadodara/Surat/Rajkot 5%, Gandhinagar 4.9%. Women buyers get 1% concession.', 'Buying Process', 1, 1, 0, 1, '2026-02-28 08:24:48', '2026-02-28 18:57:26'),
(2, 'Is RERA registration mandatory for Gujarat properties?', 'Yes, projects with 8+ units or 500+ sqm area must be RERA registered. Always verify the RERA number before investing.', 'Legal & RERA', 2, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(3, 'What is super built-up vs carpet area?', 'Carpet area = actual usable area. Super built-up = carpet + common areas (walls, staircase, lobby). Gujarat builders typically quote super built-up area.', 'Buying Process', 3, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(4, 'Can NRIs buy property in Gujarat?', 'Yes, NRIs can buy residential and commercial property following FEMA guidelines with an Indian bank account.', 'NRI Investment', 4, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(5, 'Essential documents to check before buying?', 'Title Deed, RERA registration, Encumbrance Certificate, Approved Building Plan, Occupancy Certificate, Allotment Letter.', 'Buying Process', 5, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(6, 'How is Ahmedabad property tax calculated?', 'AMC property tax uses annual letting value (ALV) at 5-30% based on property type and zone. Use AMC website for calculations.', 'Payment & Pricing', 6, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(7, 'Major upcoming infrastructure projects?', 'Bullet Train corridor, Dholera SIR, GIFT City expansion, Metro phases in Ahmedabad/Surat, GIFT City development.', 'General Questions', 7, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(8, 'Under construction vs ready possession?', 'Under construction: 10-20% cheaper but possession risk. Ready: higher cost but immediate move-in. Choose based on timeline and risk appetite.', 'Buying Process', 8, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(9, 'Typical maintenance charges in Gujarat?', '₹2-4/sqft standard, ₹5-8/sqft premium in Ahmedabad/Gandhinagar. Surat/Vadodara slightly lower.', 'Payment & Pricing', 9, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(10, 'How to verify a builder?', 'Check RERA website, Google reviews, visit existing projects, talk to residents, verify track record with Credai Gujarat.', 'General Questions', 10, 0, 0, 1, '2026-02-28 08:24:48', '2026-02-28 08:24:48');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `property_id`, `notes`, `created_at`) VALUES
(1, 2, 1, NULL, '2026-02-28 08:24:47'),
(2, 2, 5, NULL, '2026-02-28 08:24:47'),
(3, 2, 7, NULL, '2026-02-28 08:24:47'),
(4, 3, 2, NULL, '2026-02-28 08:24:47'),
(5, 3, 6, NULL, '2026-02-28 08:24:47'),
(6, 3, 10, NULL, '2026-02-28 08:24:47'),
(7, 4, 1, NULL, '2026-02-28 08:24:47'),
(8, 4, 3, NULL, '2026-02-28 08:24:47'),
(9, 4, 8, NULL, '2026-02-28 08:24:47'),
(10, 6, 2, NULL, '2026-02-28 08:24:47'),
(11, 6, 5, NULL, '2026-02-28 08:24:47'),
(12, 6, 9, NULL, '2026-02-28 08:24:47'),
(13, 7, 4, NULL, '2026-02-28 08:24:47'),
(14, 7, 7, NULL, '2026-02-28 08:24:47'),
(15, 8, 1, NULL, '2026-02-28 08:24:47'),
(16, 8, 5, NULL, '2026-02-28 08:24:47'),
(17, 8, 10, NULL, '2026-02-28 08:24:47'),
(18, 10, 3, NULL, '2026-02-28 08:24:47'),
(19, 10, 6, NULL, '2026-02-28 08:24:47'),
(20, 10, 8, NULL, '2026-02-28 08:24:47'),
(22, 11, 1, NULL, '2026-02-28 17:43:03'),
(23, 11, 2, NULL, '2026-02-28 17:46:43'),
(25, 11, 4, NULL, '2026-02-28 17:46:55'),
(36, 11, 3, NULL, '2026-03-02 07:55:44'),
(37, 11, 6, NULL, '2026-03-02 07:55:46'),
(39, 11, 17, NULL, '2026-03-02 12:37:57'),
(40, 11, 22, NULL, '2026-03-05 05:55:03');

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `property_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `inquiry_type` enum('Property Inquiry','General Inquiry','Site Visit','Callback Request') DEFAULT 'Property Inquiry',
  `status` enum('Pending','Viewed','Replied','Closed') DEFAULT 'Pending',
  `priority` enum('Low','Medium','High') DEFAULT 'Medium',
  `admin_response` text DEFAULT NULL,
  `responded_by` int(11) DEFAULT NULL,
  `responded_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`id`, `user_id`, `property_id`, `name`, `email`, `phone`, `message`, `inquiry_type`, `status`, `priority`, `admin_response`, `responded_by`, `responded_at`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Neha Shah', 'neha.shah@email.com', '+91 98240 12345', 'Interested in 3BHK in Suncity. Current rates and possession date?', 'Property Inquiry', 'Viewed', 'High', NULL, NULL, NULL, '2026-02-28 08:24:47', '2026-03-01 12:27:13'),
(2, 3, 2, 'Hitesh Desai', 'hitesh.d@email.com', '+91 99099 88776', 'Need details about commercial space in GIFT City for IT firm.', 'Property Inquiry', 'Viewed', 'High', NULL, NULL, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(3, 4, 3, 'Komal Mehta', 'komal.mehta@email.com', '+91 94280 55667', 'Is the penthouse still available? Want to schedule a site visit.', 'Site Visit', 'Replied', 'Medium', NULL, NULL, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(4, 6, 5, 'Pooja Joshi', 'pooja.j@email.com', '+91 98798 76543', 'Looking for duplex in Vesu for end use. Share best deals.', 'Property Inquiry', 'Pending', 'High', NULL, NULL, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(5, 7, 4, 'Rakesh Trivedi', 'rakesh.t@email.com', '+91 94276 54321', 'Interested in buying shop on VIP Road. Need loan assistance.', 'Property Inquiry', 'Viewed', 'Medium', NULL, NULL, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(6, 8, 6, 'Anjali Dave', 'anjali.d@email.com', '+91 99044 55667', 'Textile market shop required for our family business.', 'Property Inquiry', 'Pending', 'Medium', NULL, NULL, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(7, 10, 8, 'Priya Solanki', 'priya.s@email.com', '+91 98765 11223', '2BHK in Kalavad Road within 60 lakhs budget. Any options?', 'Property Inquiry', 'Viewed', 'Low', NULL, NULL, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(8, NULL, 9, 'Ramesh Prajapati', 'ramesh.p@email.com', '+91 98765 99887', 'Interested in affordable housing in Gandhinagar. Government employee.', 'Callback Request', 'Pending', 'Medium', NULL, NULL, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(9, NULL, 1, 'Harsh Patel', '2084harsh@gmail.com', '7567586809', 'I am interested in 2BHK unit. Please share details.', '', '', 'Medium', NULL, NULL, NULL, '2026-02-28 17:54:37', '2026-02-28 17:54:37'),
(10, NULL, 1, 'Harsh Patel', '2084harsh@gmail.com', '7567586809', 'I am interested in 2BHK unit. Please share details.', '', '', 'Medium', NULL, NULL, NULL, '2026-02-28 17:56:04', '2026-02-28 17:56:04'),
(11, NULL, 1, 'Harsh Patel', '2084harsh@gmail.com', '7567586809', 'I am interested in 2BHK unit. Please share details.', '', '', 'Medium', NULL, NULL, NULL, '2026-02-28 17:56:06', '2026-02-28 17:56:06'),
(12, NULL, 1, 'Harsh Patel', '', '7567586809', 'Preferred time: 10:00 AM - 12:00 PM', '', '', 'Medium', NULL, NULL, NULL, '2026-02-28 17:57:37', '2026-02-28 17:57:37'),
(13, 11, 1, 'Harsh Patel', '2084harsh@gmail.com', '', 'Site visit: 2026-03-15  ', 'Site Visit', '', 'Medium', NULL, NULL, NULL, '2026-02-28 17:58:41', '2026-02-28 17:58:41'),
(14, 11, 15, 'Harsh Patel', '2084harsh@gmail.com', '', 'Site visit: 2026-03-02T11:23:42.344Z  ', 'Site Visit', 'Pending', 'Medium', NULL, NULL, NULL, '2026-03-02 11:23:42', '2026-03-02 11:23:42');

-- --------------------------------------------------------

--
-- Table structure for table `login_history`
--

CREATE TABLE `login_history` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `logout_at` datetime DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `device_type` enum('Desktop','Mobile','Tablet','API') DEFAULT 'Desktop',
  `browser` varchar(100) DEFAULT NULL,
  `os` varchar(100) DEFAULT NULL,
  `geo_city` varchar(100) DEFAULT NULL,
  `geo_country` varchar(100) DEFAULT NULL,
  `status` enum('Success','Failed','Blocked','MFA Required') DEFAULT 'Success',
  `failure_reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_history`
--

INSERT INTO `login_history` (`id`, `user_id`, `login_at`, `logout_at`, `ip_address`, `user_agent`, `device_type`, `browser`, `os`, `geo_city`, `geo_country`, `status`, `failure_reason`) VALUES
(1, 11, '2026-02-28 14:13:59', NULL, '::1', 'PostmanRuntime/7.51.1', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(2, 11, '2026-02-28 21:51:47', NULL, '::1', 'PostmanRuntime/7.51.1', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(3, 11, '2026-02-28 21:53:04', NULL, '::1', 'PostmanRuntime/7.51.1', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(4, 11, '2026-02-28 21:56:10', NULL, '::1', 'PostmanRuntime/7.51.1', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(5, 11, '2026-03-01 11:10:00', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(6, 11, '2026-03-01 11:10:20', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(7, 11, '2026-03-01 11:36:49', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(8, 11, '2026-03-01 11:49:21', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(9, 11, '2026-03-02 07:54:39', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(10, 11, '2026-03-02 11:07:46', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL),
(11, 11, '2026-03-05 05:20:23', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'Desktop', NULL, NULL, NULL, NULL, 'Success', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `media_categories`
--

CREATE TABLE `media_categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `allowed_extensions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`allowed_extensions`)),
  `max_file_size_mb` int(11) DEFAULT 50,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media_categories`
--

INSERT INTO `media_categories` (`id`, `category_name`, `allowed_extensions`, `max_file_size_mb`, `created_at`) VALUES
(1, 'Photo', '[\"jpg\",\"jpeg\",\"png\",\"webp\"]', 10, '2026-02-28 08:24:47'),
(2, '3D Render', '[\"jpg\",\"jpeg\",\"png\",\"webp\"]', 20, '2026-02-28 08:24:47'),
(3, 'Drone Video', '[\"mp4\",\"webm\",\"mov\"]', 200, '2026-02-28 08:24:47'),
(4, 'Aerial Shoot', '[\"mp4\",\"webm\",\"mov\"]', 200, '2026-02-28 08:24:47'),
(5, 'Sample House Tour', '[\"mp4\",\"webm\",\"mov\"]', 500, '2026-02-28 08:24:47'),
(6, 'Floorplan', '[\"pdf\",\"jpg\",\"png\"]', 15, '2026-02-28 08:24:47'),
(7, 'Document', '[\"pdf\",\"doc\",\"docx\"]', 25, '2026-02-28 08:24:47'),
(8, '360 Panorama', '[\"jpg\",\"png\",\"webp\"]', 30, '2026-02-28 08:24:47');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notification_type` enum('Property Update','Inquiry Response','Marketing Email','Newsletter','Price Alert','Milestone Update','System Alert') DEFAULT 'Property Update',
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `action_url` varchar(500) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `read_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `notification_type`, `title`, `message`, `action_url`, `icon`, `is_read`, `read_at`, `expires_at`, `created_at`) VALUES
(1, 2, 'Property Update', 'New project launched in Ahmedabad', 'Savvy Group has launched new project near Suncity!', '/properties/suncity-south-bopal-ahmedabad', NULL, 1, NULL, NULL, '2026-02-28 08:24:48'),
(2, 3, 'Inquiry Response', 'GIFT City inquiry viewed', 'The builder has seen your inquiry and will contact you.', '/inquiries/2', NULL, 0, NULL, NULL, '2026-02-28 08:24:48'),
(3, 4, 'Price Alert', 'Special offers on Vadodara', 'Get festive discounts on select Alkapuri properties.', '/properties?city=vadodara', NULL, 1, NULL, NULL, '2026-02-28 08:24:48'),
(4, 6, 'Price Alert', 'Price reduction in Surat', 'Shivalik Group announces special pricing.', '/properties/diamond-vesu-surat', NULL, 0, NULL, NULL, '2026-02-28 08:24:48'),
(5, 7, 'Inquiry Response', 'VIP Road inquiry replied', 'Sales team replied to your commercial shop inquiry.', '/inquiries/5', NULL, 1, NULL, NULL, '2026-02-28 08:24:48'),
(6, 8, 'Newsletter', 'March 2024 Market Report', 'Check out our latest Gujarat market analysis.', '/blog/gujarat-real-estate-guide-2024', NULL, 0, NULL, NULL, '2026-02-28 08:24:48'),
(7, 10, 'Property Update', 'New villas in Rajkot', 'Ajmera Group launches Phase 2 of Raceview Villas.', '/properties/raceview-villas-racecourse-rajkot', NULL, 1, NULL, NULL, '2026-02-28 08:24:48'),
(8, 1, 'System Alert', 'Investor meet in Ahmedabad', 'Real estate seminar on April 15th at Hotel Hyatt.', '/events/investor-meet-april-2024', NULL, 0, NULL, NULL, '2026-02-28 08:24:48');

-- --------------------------------------------------------

--
-- Table structure for table `notification_templates`
--

CREATE TABLE `notification_templates` (
  `id` int(11) NOT NULL,
  `template_name` varchar(100) NOT NULL,
  `template_type` enum('Email','SMS','Push','In-App') NOT NULL,
  `subject_template` varchar(255) DEFAULT NULL,
  `body_template` text NOT NULL,
  `variables` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`variables`)),
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `property_type` enum('Residential','Commercial','Mixed','Industrial','Agricultural') NOT NULL,
  `special_type` enum('None','Pent House','Duplex','Triplex','Villa','Bungalow','Farmhouse','Studio') DEFAULT 'None',
  `status` enum('Active','Inactive','Pending Approval','Sold Out','Archived') DEFAULT 'Pending Approval',
  `slug` varchar(300) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `project_name`, `property_type`, `special_type`, `status`, `slug`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Suncity', 'Residential', 'None', 'Active', 'suncity-south-bopal-ahmedabad', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 'Royal Heights Premium', 'Residential', 'None', 'Active', 'gift-city-commercial-gandhinagar', 5, '2026-02-28 08:15:54', '2026-03-01 09:21:02'),
(3, 'Kalyan', 'Residential', 'Pent House', 'Active', 'kalyan-alkapuri-vadodara', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 'VIP Road', 'Commercial', 'None', 'Active', 'vip-road-commercial-vadodara', 5, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 'Diamond', 'Residential', 'Duplex', 'Pending Approval', 'diamond-vesu-surat', 9, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 'Textile', 'Commercial', 'None', 'Active', 'textile-market-ringroad-surat', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 'Raceview', 'Residential', 'Villa', 'Active', 'raceview-villas-racecourse-rajkot', 5, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 'Kalavad', 'Mixed', 'None', 'Pending Approval', 'kalavad-township-rajkot', 9, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 'Sector 16', 'Residential', 'None', 'Active', 'sector16-affordable-gandhinagar', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 'Infocity', 'Commercial', 'None', 'Pending Approval', 'infocity-commercial-gandhinagar', 5, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(11, 'Royal Heights', 'Residential', 'None', 'Pending Approval', 'royal-heights-mm7jg54j', 11, '2026-03-01 09:19:10', '2026-03-01 09:19:10'),
(12, 'Shivalay Heights', 'Residential', 'None', 'Active', 'shivalay-heights-sg-highway-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(13, 'Titanium City Centre', 'Commercial', 'None', 'Active', 'titanium-city-centre-anandnagar-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(14, 'Navratna Corporate Park', 'Commercial', 'None', 'Active', 'navratna-corporate-park-ambawadi-ahmedabad', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(15, 'Orion Residency', 'Residential', 'None', 'Active', 'orion-residency-prahlad-nagar-ahmedabad', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(16, 'Sky Bungalows', 'Residential', 'Bungalow', 'Active', 'sky-bungalows-bopal-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(17, 'Vastushilp Vaastu', 'Residential', 'None', 'Active', 'vastushilp-vaastu-chandkheda-ahmedabad', 9, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(18, 'Silver Springs', 'Residential', 'None', 'Active', 'silver-springs-gota-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(19, 'Mondeal Heights', 'Commercial', 'None', 'Active', 'mondeal-heights-prahlad-nagar-ahmedabad', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(20, 'Pakwan Residency', 'Residential', 'Duplex', 'Active', 'pakwan-residency-satellite-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(21, 'Savvy Swaraj', 'Residential', 'None', 'Active', 'savvy-swaraj-thaltej-ahmedabad', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(22, 'Zeal Residency', 'Residential', 'None', 'Active', 'zeal-residency-new-ranip-ahmedabad', 9, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(23, 'Sun Optima', 'Residential', 'None', 'Active', 'sun-optima-south-bopal-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(24, 'Arjun Tower', 'Residential', 'None', 'Active', 'arjun-tower-naroda-ahmedabad', 9, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(25, 'Shyamal Arcade', 'Commercial', 'None', 'Active', 'shyamal-arcade-shyamal-ahmedabad', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(26, 'Rajpath Rangoli', 'Residential', 'None', 'Active', 'rajpath-rangoli-bodakdev-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(27, 'GIFT Two', 'Commercial', 'None', 'Active', 'gift-two-gift-city-gandhinagar', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(28, 'Infocity Square', 'Commercial', 'None', 'Active', 'infocity-square-infocity-gandhinagar', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(29, 'Sector 7 Residences', 'Residential', 'None', 'Active', 'sector7-residences-gandhinagar', 9, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(30, 'Akshardham Greens', 'Residential', 'None', 'Active', 'akshardham-greens-sector5-gandhinagar', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(31, 'iHub Innovation Tower', 'Commercial', 'None', 'Active', 'ihub-innovation-tower-gandhinagar', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(32, 'Gandhinagar Smart Villas', 'Residential', 'Villa', 'Active', 'gandhinagar-smart-villas-sector23', 9, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(33, 'Lotus Petal', 'Residential', 'None', 'Active', 'lotus-petal-sector21-gandhinagar', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(34, 'Capital One Offices', 'Commercial', 'None', 'Active', 'capital-one-offices-sector11-gandhinagar', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(35, 'Vaishnodevi Circle Heights', 'Residential', 'None', 'Active', 'vaishnodevi-circle-heights-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(36, 'Synergy Business Park', 'Commercial', 'None', 'Active', 'synergy-business-park-iscon-ahmedabad', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(37, 'Iscon Elegance', 'Residential', 'Pent House', 'Active', 'iscon-elegance-iscon-ambli-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(38, 'Avadh Viceroy', 'Residential', 'None', 'Active', 'avadh-viceroy-vasna-ahmedabad', 9, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(39, 'Shantiniketan Bungalows', 'Residential', 'Bungalow', 'Active', 'shantiniketan-bungalows-shela-ahmedabad', 1, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(40, 'Swaminarayan Enclave', 'Residential', 'None', 'Active', 'swaminarayan-enclave-zundal-gandhinagar', 9, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(41, 'Palladium Commercial Hub', 'Commercial', 'None', 'Active', 'palladium-commercial-hub-cg-road-ahmedabad', 5, '2026-03-02 11:13:35', '2026-03-02 11:13:35'),
(42, 'Sunfarma Testing Property', 'Residential', 'Pent House', 'Pending Approval', 'sunfarma-testing-property-mmd9996h', 11, '2026-03-05 09:20:30', '2026-03-05 09:20:30');

-- --------------------------------------------------------

--
-- Table structure for table `property_amenities`
--

CREATE TABLE `property_amenities` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `amenity_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `details` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_amenities`
--

INSERT INTO `property_amenities` (`id`, `property_id`, `amenity_id`, `quantity`, `details`, `created_at`) VALUES
(1, 1, 1, 1, NULL, '2026-02-28 08:15:55'),
(2, 1, 2, 1, NULL, '2026-02-28 08:15:55'),
(3, 1, 3, 1, NULL, '2026-02-28 08:15:55'),
(4, 1, 4, 1, NULL, '2026-02-28 08:15:55'),
(5, 1, 5, 1, NULL, '2026-02-28 08:15:55'),
(6, 1, 6, 1, NULL, '2026-02-28 08:15:55'),
(7, 2, 7, 1, NULL, '2026-02-28 08:15:55'),
(8, 2, 8, 1, NULL, '2026-02-28 08:15:55'),
(9, 2, 9, 1, NULL, '2026-02-28 08:15:55'),
(10, 2, 10, 1, NULL, '2026-02-28 08:15:55'),
(11, 2, 11, 1, NULL, '2026-02-28 08:15:55'),
(12, 3, 12, 1, NULL, '2026-02-28 08:15:55'),
(13, 3, 13, 1, NULL, '2026-02-28 08:15:55'),
(14, 3, 14, 1, NULL, '2026-02-28 08:15:55'),
(15, 3, 15, 1, NULL, '2026-02-28 08:15:55'),
(16, 4, 16, 1, NULL, '2026-02-28 08:15:55'),
(17, 4, 17, 1, NULL, '2026-02-28 08:15:55'),
(18, 4, 18, 1, NULL, '2026-02-28 08:15:55'),
(19, 5, 19, 1, NULL, '2026-02-28 08:15:55'),
(20, 5, 20, 1, NULL, '2026-02-28 08:15:55'),
(21, 5, 5, 1, NULL, '2026-02-28 08:15:55'),
(22, 5, 21, 1, NULL, '2026-02-28 08:15:55'),
(23, 6, 22, 1, NULL, '2026-02-28 08:15:55'),
(24, 6, 23, 1, NULL, '2026-02-28 08:15:55'),
(25, 6, 24, 1, NULL, '2026-02-28 08:15:55'),
(26, 7, 25, 1, NULL, '2026-02-28 08:15:55'),
(27, 7, 26, 1, NULL, '2026-02-28 08:15:55'),
(28, 7, 27, 1, NULL, '2026-02-28 08:15:55'),
(29, 8, 28, 1, NULL, '2026-02-28 08:15:55'),
(30, 8, 29, 1, NULL, '2026-02-28 08:15:55'),
(31, 8, 30, 1, NULL, '2026-02-28 08:15:55'),
(32, 9, 31, 1, NULL, '2026-02-28 08:15:55'),
(33, 9, 32, 1, NULL, '2026-02-28 08:15:55'),
(34, 9, 33, 1, NULL, '2026-02-28 08:15:55'),
(35, 10, 34, 1, NULL, '2026-02-28 08:15:55'),
(36, 10, 35, 1, NULL, '2026-02-28 08:15:55'),
(37, 10, 36, 1, NULL, '2026-02-28 08:15:55'),
(38, 2, 1, 1, NULL, '2026-03-01 09:37:42'),
(39, 2, 2, 1, NULL, '2026-03-01 09:37:42'),
(40, 2, 3, 1, NULL, '2026-03-01 09:37:42'),
(41, 2, 4, 1, NULL, '2026-03-01 09:37:42');

-- --------------------------------------------------------

--
-- Table structure for table `property_analytics`
--

CREATE TABLE `property_analytics` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `view_count` int(11) DEFAULT 0,
  `unique_views` int(11) DEFAULT 0,
  `inquiry_count` int(11) DEFAULT 0,
  `share_count` int(11) DEFAULT 0,
  `favorite_count` int(11) DEFAULT 0,
  `avg_time_on_page` int(11) DEFAULT 0,
  `phone_click_count` int(11) DEFAULT 0,
  `brochure_download_count` int(11) DEFAULT 0,
  `last_viewed_at` datetime DEFAULT NULL,
  `trending_score` decimal(8,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_analytics`
--

INSERT INTO `property_analytics` (`id`, `property_id`, `view_count`, `unique_views`, `inquiry_count`, `share_count`, `favorite_count`, `avg_time_on_page`, `phone_click_count`, `brochure_download_count`, `last_viewed_at`, `trending_score`, `created_at`, `updated_at`) VALUES
(1, 1, 2502, 1800, 15, 52, 6, 0, 0, 0, NULL, 82.50, '2026-02-28 08:24:47', '2026-03-02 11:03:43'),
(2, 2, 3513, 2200, 12, 68, 4, 0, 0, 0, NULL, 91.20, '2026-02-28 08:24:47', '2026-03-02 12:31:18'),
(3, 3, 1800, 1200, 8, 25, 3, 0, 0, 0, NULL, 65.80, '2026-02-28 08:24:47', '2026-03-02 07:55:44'),
(4, 4, 1600, 1100, 6, 18, 2, 0, 0, 0, NULL, 55.40, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(5, 5, 2100, 1500, 10, 38, 4, 0, 0, 0, NULL, 72.90, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(6, 6, 1906, 1300, 7, 22, 4, 0, 0, 0, NULL, 60.10, '2026-02-28 08:24:47', '2026-03-05 05:56:31'),
(7, 7, 1400, 950, 5, 30, 3, 0, 0, 0, NULL, 58.70, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(8, 8, 1200, 800, 4, 15, 3, 0, 0, 0, NULL, 45.30, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(9, 9, 2801, 2000, 18, 55, 5, 0, 0, 0, NULL, 88.60, '2026-02-28 08:24:47', '2026-02-28 14:29:41'),
(10, 10, 1500, 1000, 6, 20, 3, 0, 0, 0, NULL, 52.40, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(11, 11, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0.00, '2026-03-01 09:19:10', '2026-03-01 09:19:10'),
(12, 12, 1864, 1300, 12, 40, 5, 0, 0, 0, NULL, 75.20, '2026-03-02 11:18:04', '2026-03-05 09:38:17'),
(13, 13, 1426, 980, 8, 22, 3, 0, 0, 0, NULL, 58.40, '2026-03-02 11:18:04', '2026-03-05 09:38:11'),
(14, 14, 1286, 900, 7, 18, 2, 0, 0, 0, NULL, 52.10, '2026-03-02 11:18:04', '2026-03-02 12:34:08'),
(15, 15, 2104, 1500, 15, 48, 6, 0, 0, 0, NULL, 80.30, '2026-03-02 11:18:04', '2026-03-05 11:29:59'),
(16, 16, 984, 680, 5, 25, 4, 0, 0, 0, NULL, 50.60, '2026-03-02 11:18:04', '2026-03-02 12:15:39'),
(17, 17, 1654, 1150, 10, 30, 5, 0, 0, 0, NULL, 65.80, '2026-03-02 11:18:04', '2026-03-02 12:38:30'),
(18, 18, 1400, 980, 9, 28, 3, 0, 0, 0, NULL, 60.20, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(19, 19, 1920, 1380, 14, 55, 6, 0, 0, 0, NULL, 78.90, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(20, 20, 1100, 760, 6, 20, 2, 0, 0, 0, NULL, 48.30, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(21, 21, 2254, 1600, 16, 52, 7, 0, 0, 0, NULL, 82.60, '2026-03-02 11:18:04', '2026-03-02 12:29:02'),
(22, 22, 1302, 900, 8, 22, 4, 0, 0, 0, NULL, 55.40, '2026-03-02 11:18:04', '2026-03-05 05:55:03'),
(23, 23, 1752, 1220, 11, 35, 5, 0, 0, 0, NULL, 70.10, '2026-03-02 11:18:04', '2026-03-02 11:27:13'),
(24, 24, 1052, 730, 5, 15, 2, 0, 0, 0, NULL, 44.20, '2026-03-02 11:18:04', '2026-03-05 05:54:42'),
(25, 25, 890, 620, 4, 12, 1, 0, 0, 0, NULL, 38.50, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(26, 26, 1602, 1120, 10, 42, 5, 0, 0, 0, NULL, 72.80, '2026-03-02 11:18:04', '2026-03-02 12:40:59'),
(27, 27, 2802, 2000, 20, 75, 9, 0, 0, 0, NULL, 93.50, '2026-03-02 11:18:04', '2026-03-05 09:54:27'),
(28, 28, 1350, 940, 9, 28, 3, 0, 0, 0, NULL, 60.80, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(29, 29, 1900, 1350, 14, 45, 6, 0, 0, 0, NULL, 78.40, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(30, 30, 1700, 1200, 11, 38, 5, 0, 0, 0, NULL, 70.60, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(31, 31, 1150, 800, 7, 20, 2, 0, 0, 0, NULL, 50.20, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(32, 32, 750, 520, 4, 18, 3, 0, 0, 0, NULL, 42.80, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(33, 33, 1450, 1010, 9, 30, 4, 0, 0, 0, NULL, 62.40, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(34, 34, 880, 610, 5, 14, 2, 0, 0, 0, NULL, 40.10, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(35, 35, 1550, 1080, 10, 33, 4, 0, 0, 0, NULL, 65.20, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(36, 36, 1250, 870, 8, 25, 3, 0, 0, 0, NULL, 55.80, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(37, 37, 1380, 960, 8, 30, 4, 0, 0, 0, NULL, 62.00, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(38, 38, 1600, 1120, 10, 35, 4, 0, 0, 0, NULL, 66.40, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(39, 39, 920, 640, 5, 20, 3, 0, 0, 0, NULL, 46.50, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(40, 40, 1100, 770, 7, 22, 3, 0, 0, 0, NULL, 52.30, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(41, 41, 1820, 1280, 12, 45, 5, 0, 0, 0, NULL, 76.00, '2026-03-02 11:18:04', '2026-03-02 11:18:04'),
(42, 42, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0.00, '2026-03-05 09:20:30', '2026-03-05 09:20:30');

-- --------------------------------------------------------

--
-- Table structure for table `property_building_specs`
--

CREATE TABLE `property_building_specs` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `social_class` varchar(100) DEFAULT NULL,
  `storeys` int(11) DEFAULT NULL,
  `basements` int(11) DEFAULT NULL,
  `lifts` int(11) DEFAULT NULL,
  `staircases` int(11) DEFAULT NULL,
  `balconies` int(11) DEFAULT NULL,
  `units_per_floor` int(11) DEFAULT NULL,
  `allocated_parking` int(11) DEFAULT NULL,
  `visitor_parking` int(11) DEFAULT NULL,
  `open_parking` int(11) DEFAULT NULL,
  `covered_parking` int(11) DEFAULT NULL,
  `sample_house_available` tinyint(1) DEFAULT 0,
  `earthquake_zone` varchar(20) DEFAULT NULL,
  `structure_type` enum('RCC','Steel','Composite','Load Bearing') DEFAULT 'RCC',
  `flooring_type` varchar(100) DEFAULT NULL,
  `wall_type` varchar(100) DEFAULT NULL,
  `window_type` varchar(100) DEFAULT NULL,
  `door_type` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_building_specs`
--

INSERT INTO `property_building_specs` (`id`, `property_id`, `social_class`, `storeys`, `basements`, `lifts`, `staircases`, `balconies`, `units_per_floor`, `allocated_parking`, `visitor_parking`, `open_parking`, `covered_parking`, `sample_house_available`, `earthquake_zone`, `structure_type`, `flooring_type`, `wall_type`, `window_type`, `door_type`, `created_at`, `updated_at`) VALUES
(1, 1, 'Upper Middle', 23, 2, 4, NULL, 2, 8, 2, NULL, NULL, NULL, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 2, NULL, 25, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-03-01 09:31:04'),
(3, 3, 'Luxury', 18, 2, 3, NULL, 3, 4, 2, NULL, NULL, NULL, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 4, 'Commercial', 8, 1, 2, NULL, 0, 10, 1, NULL, NULL, NULL, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 5, 'Upper Middle', 16, 2, 3, NULL, 2, 6, 2, NULL, NULL, NULL, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 6, 'Commercial', 4, 0, 2, NULL, 0, 20, 1, NULL, NULL, NULL, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 7, 'Luxury', 2, 0, 0, NULL, 3, 1, 3, NULL, NULL, NULL, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 8, 'Middle', 14, 2, 2, NULL, 2, 8, 1, NULL, NULL, NULL, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 9, 'Lower Middle', 13, 1, 2, NULL, 1, 8, 1, NULL, NULL, NULL, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 10, 'Business', 12, 2, 4, NULL, 0, 6, 2, NULL, NULL, NULL, 1, NULL, 'Steel', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(12, 12, 'Upper Middle', 28, 2, 6, NULL, NULL, 8, 2, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(13, 13, 'Business', 15, 2, 4, NULL, NULL, 10, 2, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(14, 14, 'Business', 14, 1, 4, NULL, NULL, 6, 2, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(15, 15, 'Upper Middle', 20, 2, 4, NULL, NULL, 8, 2, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(16, 16, 'Luxury', 2, 1, 0, NULL, NULL, 1, 4, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(17, 17, 'Lower Middle', 14, 1, 2, NULL, NULL, 10, 1, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(18, 18, 'Middle', 16, 1, 3, NULL, NULL, 8, 1, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(19, 19, 'Business', 22, 2, 6, NULL, NULL, 6, 3, NULL, NULL, 1, 0, NULL, 'Steel', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(20, 20, 'Upper Middle', 18, 2, 4, NULL, NULL, 4, 2, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(21, 21, 'Upper Middle', 24, 2, 6, NULL, NULL, 10, 2, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(22, 22, 'Lower Middle', 12, 1, 2, NULL, NULL, 10, 1, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(23, 23, 'Upper Middle', 18, 2, 4, NULL, NULL, 6, 2, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(24, 24, 'Lower Middle', 14, 1, 2, NULL, NULL, 12, 1, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(25, 25, 'Commercial', 8, 1, 2, NULL, NULL, 8, 1, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(26, 26, 'Luxury', 24, 2, 6, NULL, NULL, 6, 3, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(27, 27, 'Business', 30, 3, 8, NULL, NULL, 6, 3, NULL, NULL, 1, 0, NULL, 'Steel', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(28, 28, 'Business', 14, 2, 4, NULL, NULL, 6, 2, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(29, 29, 'Lower Middle', 13, 1, 2, NULL, NULL, 10, 1, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(30, 30, 'Middle', 18, 1, 4, NULL, NULL, 8, 1, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(31, 31, 'Business', 18, 2, 4, NULL, NULL, 4, 2, NULL, NULL, 1, 0, NULL, 'Steel', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(32, 32, 'Luxury', 2, 1, 0, NULL, NULL, 1, 4, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(33, 33, 'Middle', 16, 1, 3, NULL, NULL, 8, 1, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(34, 34, 'Business', 10, 1, 3, NULL, NULL, 6, 2, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(35, 35, 'Middle', 20, 1, 4, NULL, NULL, 8, 1, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(36, 36, 'Business', 16, 2, 4, NULL, NULL, 6, 2, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(37, 37, 'Luxury', 22, 2, 4, NULL, NULL, 4, 3, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(38, 38, 'Middle', 18, 1, 4, NULL, NULL, 8, 1, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(39, 39, 'Luxury', 2, 1, 0, NULL, NULL, 1, 4, NULL, NULL, 1, 1, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(40, 40, 'Lower Middle', 14, 1, 2, NULL, NULL, 10, 1, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53'),
(41, 41, 'Business', 12, 2, 4, NULL, NULL, 10, 2, NULL, NULL, 1, 0, NULL, 'RCC', NULL, NULL, NULL, NULL, '2026-03-02 11:17:53', '2026-03-02 11:17:53');

-- --------------------------------------------------------

--
-- Table structure for table `property_comparisons`
--

CREATE TABLE `property_comparisons` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comparison_name` varchar(100) DEFAULT 'My Comparison',
  `property_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`property_ids`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_comparisons`
--

INSERT INTO `property_comparisons` (`id`, `user_id`, `comparison_name`, `property_ids`, `created_at`, `updated_at`) VALUES
(1, 11, 'Mumbai 2BHK Comparison', '[1,2,3]', '2026-02-28 19:01:48', '2026-02-28 19:01:48');

-- --------------------------------------------------------

--
-- Table structure for table `property_construction`
--

CREATE TABLE `property_construction` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `construction_stage` enum('Pre-Launch','Newly Launched','Under Construction','Nearing Completion','Ready to Move') NOT NULL,
  `completion_percent` decimal(5,2) DEFAULT 0.00,
  `project_start_date` date DEFAULT NULL,
  `expected_completion` date DEFAULT NULL,
  `actual_completion` date DEFAULT NULL,
  `possession_date` date DEFAULT NULL,
  `last_inspection_date` date DEFAULT NULL,
  `last_inspection_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_construction`
--

INSERT INTO `property_construction` (`id`, `property_id`, `construction_stage`, `completion_percent`, `project_start_date`, `expected_completion`, `actual_completion`, `possession_date`, `last_inspection_date`, `last_inspection_notes`, `created_at`, `updated_at`) VALUES
(1, 1, 'Under Construction', 65.00, '2023-06-01', '2025-12-31', NULL, '2025-12-31', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 2, 'Under Construction', 45.00, NULL, NULL, NULL, '2029-06-30', NULL, NULL, '2026-02-28 08:15:54', '2026-03-01 09:25:54'),
(3, 3, 'Ready to Move', 100.00, '2023-09-15', '2024-06-30', NULL, '2024-06-30', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 4, 'Under Construction', 72.00, '2023-03-20', '2025-09-30', NULL, '2025-09-30', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 5, 'Pre-Launch', 5.00, '2024-02-01', '2026-12-31', NULL, '2026-12-31', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 6, 'Under Construction', 58.00, '2023-11-15', '2025-03-31', NULL, '2025-03-31', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 7, 'Under Construction', 40.00, '2023-08-10', '2025-11-30', NULL, '2025-11-30', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 8, 'Pre-Launch', 8.00, '2024-03-01', '2026-08-31', NULL, '2026-08-31', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 9, 'Under Construction', 80.00, '2023-05-15', '2024-12-31', NULL, '2024-12-31', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 10, 'Pre-Launch', 3.00, '2024-04-01', '2026-06-30', NULL, '2026-06-30', NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(11, 11, 'Under Construction', 0.00, NULL, '2028-12-31', NULL, '2029-03-31', NULL, NULL, '2026-03-01 09:19:10', '2026-03-01 09:19:10'),
(13, 12, 'Under Construction', 55.00, '2023-06-01', '2026-06-30', NULL, '2026-09-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(14, 13, 'Ready to Move', 100.00, '2021-03-01', '2023-03-31', NULL, '2023-06-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(15, 14, 'Ready to Move', 100.00, '2020-09-01', '2022-09-30', NULL, '2022-12-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(16, 15, 'Under Construction', 60.00, '2023-09-01', '2026-03-31', NULL, '2026-06-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(17, 16, 'Under Construction', 40.00, '2024-01-01', '2026-12-31', NULL, '2027-03-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(18, 17, 'Under Construction', 70.00, '2023-04-01', '2025-12-31', NULL, '2026-03-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(19, 18, 'Under Construction', 50.00, '2023-10-01', '2026-06-30', NULL, '2026-09-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(20, 19, 'Ready to Move', 100.00, '2021-06-01', '2023-06-30', NULL, '2023-09-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(21, 20, 'Under Construction', 65.00, '2023-07-01', '2025-12-31', NULL, '2026-03-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(22, 21, 'Under Construction', 45.00, '2024-01-01', '2026-12-31', NULL, '2027-03-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(23, 22, 'Under Construction', 75.00, '2023-03-01', '2025-09-30', NULL, '2025-12-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(24, 23, 'Under Construction', 60.00, '2023-08-01', '2026-03-31', NULL, '2026-06-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(25, 24, 'Ready to Move', 100.00, '2022-01-01', '2024-01-31', NULL, '2024-03-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(26, 25, 'Ready to Move', 100.00, '2021-01-01', '2022-12-31', NULL, '2023-03-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(27, 26, 'Under Construction', 35.00, '2024-03-01', '2027-03-31', NULL, '2027-06-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(28, 27, 'Under Construction', 30.00, '2024-01-01', '2028-12-31', NULL, '2029-06-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(29, 28, 'Under Construction', 50.00, '2023-11-01', '2026-06-30', NULL, '2026-09-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(30, 29, 'Under Construction', 65.00, '2023-06-01', '2025-12-31', NULL, '2026-03-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(31, 30, 'Under Construction', 70.00, '2023-05-01', '2025-09-30', NULL, '2025-12-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(32, 31, 'Under Construction', 25.00, '2024-06-01', '2027-06-30', NULL, '2027-09-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(33, 32, 'Pre-Launch', 5.00, '2024-09-01', '2027-09-30', NULL, '2027-12-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(34, 33, 'Under Construction', 55.00, '2023-09-01', '2026-03-31', NULL, '2026-06-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(35, 34, 'Ready to Move', 100.00, '2021-04-01', '2023-04-30', NULL, '2023-07-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(36, 35, 'Under Construction', 40.00, '2024-02-01', '2026-09-30', NULL, '2026-12-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(37, 36, 'Under Construction', 50.00, '2023-12-01', '2026-06-30', NULL, '2026-09-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(38, 37, 'Under Construction', 45.00, '2024-01-01', '2027-03-31', NULL, '2027-06-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(39, 38, 'Under Construction', 60.00, '2023-07-01', '2026-03-31', NULL, '2026-06-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(40, 39, 'Under Construction', 30.00, '2024-04-01', '2027-06-30', NULL, '2027-09-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(41, 40, 'Pre-Launch', 8.00, '2024-11-01', '2027-12-31', NULL, '2028-03-31', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(42, 41, 'Ready to Move', 100.00, '2020-06-01', '2022-06-30', NULL, '2022-09-30', NULL, NULL, '2026-03-02 11:17:22', '2026-03-02 11:17:22'),
(43, 42, 'Ready to Move', 0.00, NULL, NULL, NULL, '2012-12-09', NULL, NULL, '2026-03-05 09:20:30', '2026-03-05 09:20:30');

-- --------------------------------------------------------

--
-- Table structure for table `property_contacts`
--

CREATE TABLE `property_contacts` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `contact_type` enum('Sales Head','Developer','Support','Channel Partner','Legal Advisor') NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `alternate_mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `available_hours` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_contacts`
--

INSERT INTO `property_contacts` (`id`, `property_id`, `contact_type`, `name`, `mobile`, `alternate_mobile`, `email`, `designation`, `is_primary`, `available_hours`, `created_at`, `updated_at`) VALUES
(1, 1, 'Sales Head', 'Amit Patel', '+91 98250 12345', NULL, 'amit.p@savvygroup.com', 'Senior Sales Manager - Ahmedabad', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(2, 1, 'Developer', 'Rajiv Shah', '+91 98765 43210', NULL, 'rajiv.shah@savvygroup.com', 'Project Director - Savvy Group', 0, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(3, 2, 'Sales Head', 'Vikas Mehta', '+91 99099 88776', NULL, 'vikas.m@adanirealty.com', 'Commercial Sales Head - GIFT', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(4, 2, 'Developer', 'Sanjay Gupta', '+91 98240 55667', NULL, 'sanjay.g@adanirealty.com', 'VP - Adani Realty', 0, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(5, 3, 'Developer', 'Kaushik Desai', '+91 94280 99887', NULL, 'kaushik.d@transcon.com', 'Managing Director - Transcon', 0, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(6, 3, 'Sales Head', 'Meena Joshi', '+91 99251 33445', NULL, 'meena.j@transcon.com', 'Luxury Sales Head', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(7, 4, 'Developer', 'Pravin Patel', '+91 98798 22334', NULL, 'pravin.p@savvygroup.com', 'Project Manager - Savvy', 0, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(8, 4, 'Sales Head', 'Dhara Trivedi', '+91 94276 55667', NULL, 'dhara.t@savvygroup.com', 'Commercial Sales Director', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(9, 5, 'Sales Head', 'Ketan Shah', '+91 99044 66778', NULL, 'ketan.s@shivalik.com', 'Vesu Project Head', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(10, 5, 'Developer', 'Nilesh Mehta', '+91 98255 88990', NULL, 'nilesh.m@shivalik.com', 'Director - Shivalik Group', 0, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(11, 6, 'Sales Head', 'Hiren Patel', '+91 98765 44556', NULL, 'hiren.p@savvygroup.com', 'Textile Market Specialist', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(12, 7, 'Sales Head', 'Jignesh Thakkar', '+91 99252 11223', NULL, 'jignesh.t@ajmera.com', 'Villa Specialist - Rajkot', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(13, 7, 'Developer', 'Ramesh Gajjar', '+91 94285 33445', NULL, 'ramesh.g@ajmera.com', 'Chief Architect', 0, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(14, 8, 'Sales Head', 'Dipak Vora', '+91 99012 44556', NULL, 'dipak.v@neodev.com', 'Township Sales Manager', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(15, 9, 'Developer', 'Mahendra Solanki', '+91 98244 55667', NULL, 'mahendra.s@gidc.com', 'Project Officer - GIDC', 0, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(16, 9, 'Sales Head', 'Rekha Parmar', '+91 98777 88990', NULL, 'rekha.p@gidc.com', 'Affordable Housing Cell', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(17, 10, 'Sales Head', 'Chirag Desai', '+91 94268 99001', NULL, 'chirag.d@savvygroup.com', 'Infocity Project Head', 1, NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(18, 2, '', 'Rahul Shah', '9876543210', NULL, 'rahul@adani.com', NULL, 0, NULL, '2026-03-01 09:39:28', '2026-03-01 09:39:28'),
(19, 12, 'Sales Head', 'Nishant Patel', '+91 98250 34561', NULL, 'nishant.p@shivalik.com', 'SG Highway Project Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(20, 13, 'Sales Head', 'Bhavin Shah', '+91 99099 12345', NULL, 'bhavin.s@titanium.com', 'Commercial Sales Manager', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(21, 14, 'Sales Head', 'Geeta Mehta', '+91 94280 67890', NULL, 'geeta.m@navratna.com', 'Office Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(22, 15, 'Sales Head', 'Parth Trivedi', '+91 99251 54321', NULL, 'parth.t@orion.com', 'Prahlad Nagar Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(23, 16, 'Sales Head', 'Hetal Desai', '+91 98798 11223', NULL, 'hetal.d@skyinfra.com', 'Bungalow Project Manager', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(24, 17, 'Sales Head', 'Rakesh Joshi', '+91 94276 22334', NULL, 'rakesh.j@vastushilp.com', 'Chandkheda Project Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(25, 18, 'Sales Head', 'Dimple Parmar', '+91 99044 33445', NULL, 'dimple.p@silverinfra.com', 'Gota Project Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(26, 19, 'Sales Head', 'Vikram Solanki', '+91 98255 44556', NULL, 'vikram.s@mondeal.com', 'Commercial Sales Director', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(27, 20, 'Sales Head', 'Smita Patel', '+91 98765 55667', NULL, 'smita.p@pakwan.com', 'Satellite Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(28, 21, 'Sales Head', 'Anand Shah', '+91 99252 66778', NULL, 'anand.s@savvygroup.com', 'Thaltej Project Manager', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(29, 22, 'Sales Head', 'Dhruv Vora', '+91 94285 77889', NULL, 'dhruv.v@zealbuilders.com', 'New Ranip Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(30, 23, 'Sales Head', 'Prachi Dave', '+91 99012 88990', NULL, 'prachi.d@sunbuilders.com', 'South Bopal Project Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(31, 24, 'Sales Head', 'Suresh Thakkar', '+91 98244 99001', NULL, 'suresh.t@arjunrealty.com', 'Naroda Sales Manager', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(32, 25, 'Sales Head', 'Nilam Gajjar', '+91 98777 01122', NULL, 'nilam.g@shyamal.com', 'Shyamal Commercial Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(33, 26, 'Sales Head', 'Mihir Kapoor', '+91 94268 12233', NULL, 'mihir.k@rajpath.com', 'Bodakdev Luxury Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(34, 27, 'Sales Head', 'Rajan Mehta', '+91 98250 23344', NULL, 'rajan.m@adanirealty.com', 'GIFT City Zone 2 Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(35, 28, 'Sales Head', 'Pooja Shah', '+91 99099 34455', NULL, 'pooja.s@savvygroup.com', 'Infocity Phase 2 Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(36, 29, 'Sales Head', 'Mohan Patel', '+91 94280 45566', NULL, 'mohan.p@gidc.com', 'Sector 7 Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(37, 30, 'Sales Head', 'Kiran Desai', '+91 99251 56677', NULL, 'kiran.d@akshardham.com', 'Sector 5 Project Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(38, 31, 'Sales Head', 'Jayesh Trivedi', '+91 98798 67788', NULL, 'jayesh.t@githl.com', 'iHub Sales Manager', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(39, 32, 'Sales Head', 'Varsha Joshi', '+91 94276 78899', NULL, 'varsha.j@neodev.com', 'Smart Villas Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(40, 33, 'Sales Head', 'Ashish Parmar', '+91 99044 89900', NULL, 'ashish.p@lotusinfra.com', 'Sector 21 Project Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(41, 34, 'Sales Head', 'Bhavna Solanki', '+91 98255 90011', NULL, 'bhavna.s@capital.com', 'Sector 11 Office Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(42, 35, 'Sales Head', 'Tejas Patel', '+91 98765 01122', NULL, 'tejas.p@vaishnodevi.com', 'Vaishnodevi Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(43, 36, 'Sales Head', 'Mansi Shah', '+91 99252 12233', NULL, 'mansi.s@synergy.com', 'ISCON Business Park Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(44, 37, 'Sales Head', 'Rahul Vora', '+91 94285 23344', NULL, 'rahul.v@iscongroup.com', 'ISCON Ambli Sales Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(45, 38, 'Sales Head', 'Sheetal Dave', '+91 99012 34455', NULL, 'sheetal.d@avadh.com', 'Vasna Project Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(46, 39, 'Sales Head', 'Keyur Thakkar', '+91 98244 45566', NULL, 'keyur.t@shantiniketan.com', 'Shela Bungalow Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(47, 40, 'Sales Head', 'Dipti Gajjar', '+91 98777 56677', NULL, 'dipti.g@zealbuilders.com', 'Zundal Project Manager', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14'),
(48, 41, 'Sales Head', 'Sagar Kapoor', '+91 94268 67788', NULL, 'sagar.k@palladium.com', 'CG Road Commercial Head', 1, NULL, '2026-03-02 11:18:14', '2026-03-02 11:18:14');

-- --------------------------------------------------------

--
-- Table structure for table `property_details`
--

CREATE TABLE `property_details` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `builder_name` varchar(255) NOT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `highlights` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`highlights`)),
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `total_units` int(11) DEFAULT NULL,
  `available_units` int(11) DEFAULT NULL,
  `total_towers` int(11) DEFAULT NULL,
  `total_floors` int(11) DEFAULT NULL,
  `project_area_acres` decimal(10,2) DEFAULT NULL,
  `green_area_percent` decimal(5,2) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_premium` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_details`
--

INSERT INTO `property_details` (`id`, `property_id`, `builder_name`, `team_name`, `date`, `description`, `short_description`, `highlights`, `tags`, `total_units`, `available_units`, `total_towers`, `total_floors`, `project_area_acres`, `green_area_percent`, `is_featured`, `is_premium`, `created_at`, `updated_at`) VALUES
(1, 1, 'Savvy Group', 'Alpha Team', '2024-01-15', 'Premium residential apartments in South Bopal with modern amenities, club house, and swimming pool', 'Luxury living in South Bopal', NULL, NULL, 250, 85, 4, 23, NULL, NULL, 1, 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 2, 'Adani Realty Ltd', NULL, '2024-02-20', 'Updated description', NULL, NULL, NULL, 250, NULL, NULL, NULL, NULL, NULL, 1, 0, '2026-02-28 08:15:54', '2026-03-01 09:25:00'),
(3, 3, 'Transcon Developers', 'Gamma Team', '2024-03-10', 'Luxury apartments in Alkapuri with exclusive penthouses offering city views', 'Penthouses in Alkapuri', NULL, NULL, 120, 25, 2, 18, NULL, NULL, 0, 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 4, 'Savvy Group', 'Delta Team', '2024-01-05', 'Prime commercial shops and offices on VIP Road, high footfall area', 'Commercial hub on VIP Road', NULL, NULL, 80, 30, 1, 8, NULL, NULL, 0, 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 5, 'Shivalik Group', 'Epsilon Team', '2024-04-01', 'Premium duplex apartments in Vesu, close to diamond industry hub', 'Duplexes near diamond hub', NULL, NULL, 300, 120, 5, 16, NULL, NULL, 1, 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 6, 'Savvy Group', 'Zeta Team', '2024-05-15', 'Textile market complex with modern facilities for Surat\'s textile traders', 'Modern textile market complex', NULL, NULL, 200, 60, 1, 4, NULL, NULL, 0, 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 7, 'Ajmera Group', 'Eta Team', '2024-06-10', 'Exclusive villas near Race Course with modern architecture and gardens', 'Luxury villas by Race Course', NULL, NULL, 60, 18, 0, 2, NULL, NULL, 1, 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 8, 'Neo Developers', 'Theta Team', '2024-07-20', 'Integrated township with residential and commercial on Kalavad Road', 'Mixed-use township', NULL, NULL, 180, 75, 3, 14, NULL, NULL, 0, 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 9, 'GIDC', 'Iota Team', '2024-08-05', 'Affordable housing project near IT/ITES hub, government approved', 'Affordable homes near IT hub', NULL, NULL, 400, 150, 6, 13, NULL, NULL, 1, 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 10, 'Savvy Group', 'Kappa Team', '2024-09-12', 'Premium office spaces in Infocity, close to educational institutions', 'Premium offices in Infocity', NULL, NULL, 90, 35, 2, 12, NULL, NULL, 0, 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(11, 11, 'Adani Realty', NULL, NULL, 'A luxurious residential tower in South Mumbai', NULL, NULL, NULL, 200, 150, NULL, NULL, NULL, NULL, 1, 0, '2026-03-01 09:19:10', '2026-03-01 09:19:10'),
(13, 12, 'Shivalik Group', 'Alpha Team', '2024-01-20', 'Premium residential towers on SG Highway with panoramic city views and world-class amenities', 'Luxury towers on SG Highway', NULL, NULL, 320, 110, 4, 28, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(14, 13, 'Titanium Group', 'Beta Team', '2023-11-10', 'Premium commercial complex in Anandnagar with retail and office spaces', 'Mixed commercial hub Anandnagar', NULL, NULL, 180, 60, 2, 15, NULL, NULL, 0, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(15, 14, 'Navratna Group', 'Gamma Team', '2023-09-05', 'Grade-A offices in Ambawadi business district, ideal for IT and finance sectors', 'Grade-A offices Ambawadi', NULL, NULL, 90, 30, 1, 14, NULL, NULL, 0, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(16, 15, 'Orion Developers', 'Delta Team', '2024-02-15', 'Modern 2 & 3 BHK apartments near Prahlad Nagar Garden with clubhouse and pool', 'Modern apartments Prahlad Nagar', NULL, NULL, 240, 80, 3, 20, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(17, 16, 'Sky Infra', 'Epsilon Team', '2024-04-10', 'Exclusive row bungalows in Bopal with private gardens and smart home features', 'Exclusive bungalows in Bopal', NULL, NULL, 48, 15, 0, 2, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(18, 17, 'Vastushilp Group', 'Zeta Team', '2024-03-01', 'Affordable 1 & 2 BHK homes in Chandkheda near Ahmedabad Ring Road', 'Affordable homes Chandkheda', NULL, NULL, 280, 120, 4, 14, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(19, 18, 'Silver Infra', 'Eta Team', '2024-05-20', '2 & 3 BHK residences in Gota near upcoming metro corridor', 'Residences near metro Gota', NULL, NULL, 200, 90, 2, 16, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(20, 19, 'Mondeal Developers', 'Theta Team', '2023-10-12', 'Landmark commercial towers in Prahlad Nagar – Ahmedabads top business hub', 'Premium offices Prahlad Nagar', NULL, NULL, 120, 40, 2, 22, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(21, 20, 'Pakwan Group', 'Iota Team', '2024-01-08', 'Spacious duplex apartments in Satellite with premium interiors', 'Duplex living in Satellite', NULL, NULL, 100, 35, 2, 18, NULL, NULL, 0, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(22, 21, 'Savvy Group', 'Kappa Team', '2024-06-01', 'RERA-certified 2 & 3 BHK homes in Thaltej near SG Highway', 'Quality homes in Thaltej', NULL, NULL, 350, 140, 5, 24, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(23, 22, 'Zeal Builders', 'Lambda Team', '2024-07-15', 'Budget-friendly residences in New Ranip near AMTS bus depot', 'Affordable flats New Ranip', NULL, NULL, 220, 100, 3, 12, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(24, 23, 'Sun Builders', 'Mu Team', '2024-02-28', 'Premium 3 BHK apartments in South Bopal – serene green surroundings', 'Green living South Bopal', NULL, NULL, 180, 70, 2, 18, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(25, 24, 'Arjun Realty', 'Nu Team', '2024-08-10', 'Economical 1 & 2 BHK flats in Naroda industrial corridor', 'Affordable flats Naroda', NULL, NULL, 300, 130, 4, 14, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(26, 25, 'Shyamal Developers', 'Xi Team', '2023-12-01', 'Retail shops and office spaces on Shyamal Cross Road', 'Commercial space Shyamal', NULL, NULL, 80, 25, 1, 8, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(27, 26, 'Rajpath Group', 'Omicron Team', '2024-03-20', 'Ultra-luxury 3 & 4 BHK residences in Bodakdev near ISKCON', 'Luxury living Bodakdev', NULL, NULL, 160, 55, 2, 24, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(28, 27, 'Adani Realty Ltd', 'Pi Team', '2024-01-05', 'Next-gen commercial towers in GIFT City Zone 2 – international grade offices', 'International offices GIFT City', NULL, NULL, 200, 80, 3, 30, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(29, 28, 'Savvy Group', 'Rho Team', '2024-04-25', 'IT and commercial office spaces in Gandhinagar Infocity Phase 2', 'IT offices Infocity Phase 2', NULL, NULL, 100, 40, 2, 14, NULL, NULL, 0, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(30, 29, 'GIDC', 'Sigma Team', '2024-06-15', 'Government approved affordable housing in Sector 7 near GIFT City', 'Affordable housing Sector 7', NULL, NULL, 400, 180, 6, 13, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(31, 30, 'Akshardham Developers', 'Tau Team', '2024-03-10', '2 & 3 BHK apartments near Akshardham Temple with temple views', 'Serene living near Akshardham', NULL, NULL, 250, 100, 3, 18, NULL, NULL, 1, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(32, 31, 'Gujarat IT Hub Ltd', 'Upsilon Team', '2024-07-01', 'Innovation-focused commercial tower near iCreate and DAIICT Gandhinagar', 'Innovation tower Gandhinagar', NULL, NULL, 80, 30, 1, 18, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(33, 32, 'Neo Developers', 'Phi Team', '2024-08-20', 'Smart villas in Sector 23 Gandhinagar with solar power and EV charging', 'Smart solar villas Gandhinagar', NULL, NULL, 60, 20, 0, 2, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(34, 33, 'Lotus Infra', 'Chi Team', '2024-05-05', 'Spacious 2 & 3 BHK flats in Sector 21 Gandhinagar in prime location', 'Spacious flats Sector 21', NULL, NULL, 220, 90, 3, 16, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(35, 34, 'Capital Group', 'Psi Team', '2024-02-10', 'Premium office suites in Sector 11 Gandhinagar near Government offices', 'Offices near Govt hub Sector 11', NULL, NULL, 60, 22, 1, 10, NULL, NULL, 0, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(36, 35, 'Vaishnodevi Builders', 'Omega Team', '2024-09-01', '2 & 3 BHK residences near Vaishnodevi Circle – Ahmedabads emerging suburb', 'Homes near Vaishnodevi Circle', NULL, NULL, 280, 120, 4, 20, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(37, 36, 'Synergy Realty', 'Alpha2 Team', '2024-10-01', 'Premium business park near ISCON Cross Road with Grade-A offices', 'Business park near ISCON', NULL, NULL, 100, 35, 2, 16, NULL, NULL, 0, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(38, 37, 'Iscon Group', 'Beta2 Team', '2024-04-01', 'Luxury penthouses on ISCON Ambli Road with terrace pools', 'Penthouse living ISCON Ambli', NULL, NULL, 80, 20, 1, 22, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(39, 38, 'Avadh Builders', 'Gamma2 Team', '2024-11-01', 'Mid-segment 2 & 3 BHK in Vasna near law garden', 'Mid-segment flats Vasna', NULL, NULL, 240, 100, 3, 18, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(40, 39, 'Shantiniketan Infra', 'Delta2 Team', '2024-06-20', 'Premium row houses in Shela – gated community with club amenities', 'Row houses in Shela', NULL, NULL, 72, 28, 0, 2, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(41, 40, 'Zeal Builders', 'Epsilon2 Team', '2024-12-01', 'Affordable 2 BHK apartments near Zundal on Gandhinagar Highway', 'Affordable homes near Zundal', NULL, NULL, 300, 140, 4, 14, NULL, NULL, 0, 0, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(42, 41, 'Palladium Group', 'Zeta2 Team', '2024-03-15', 'Iconic commercial complex on CG Road – shops, showrooms and offices', 'Commercial landmark CG Road', NULL, NULL, 150, 50, 2, 12, NULL, NULL, 1, 1, '2026-03-02 11:16:05', '2026-03-02 11:16:05'),
(43, 42, '', NULL, NULL, 'Nalanda School Godhra is a reputed educational institution situated in Bhuravav, Godhra, Gujarat. The school was established in 2009 and is operated by Shree Narayan Education Trust, which is registered under the Bombay Public Trust Act, 1950. It offers education from Kindergarten to Standard 12 (Science stream) and provides both Gujarati and English medium education to students.\n\nThe school is affiliated with the Gujarat State Board of Secondary and Higher Secondary Education (GSEB). In Gujarati medium, the curriculum follows the Gujarat State Education Board syllabus, while the English medium uses a CBSE-based curriculum up to Standard 8 and shifts to the GSEB curriculum from Standard 9 onwards.\n\nNalanda School focuses on the holistic development of students by combining academic learning with co-curricular and extracurricular activities such as sports, creative writing, arts, music, and public speaking. The institution aims to nurture students’ intellectual and creative abilities while developing important values like human dignity, equality, discipline, and leadership.\n\nThe school also encourages personality development, critical thinking, and lifelong learning through modern teaching methods, inquiry-based learning, and regular academic evaluation. With a supportive learning environment and dedicated teaching staff, Nalanda School strives to prepare students to become confident, responsible, and socially aware individuals who can face future challenges successfully.', 'Nalanda School Godhra is a well-known educational institution located in Bhuravav, Godhra, Gujarat. Established in 2009 and managed by Shree Narayan Education Trust, the school provides quality education from Kindergarten to Standard 12 (Science) in both Gujarati and English medium. The school focuses on academic excellence and overall development of students.', NULL, NULL, 3, NULL, 0, 5, NULL, NULL, 0, 0, '2026-03-05 09:20:30', '2026-03-05 09:20:30');

-- --------------------------------------------------------

--
-- Table structure for table `property_leads`
--

CREATE TABLE `property_leads` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `property_id` int(11) NOT NULL,
  `lead_name` varchar(255) NOT NULL,
  `lead_email` varchar(255) NOT NULL,
  `lead_phone` varchar(20) NOT NULL,
  `lead_type` enum('Buyer','Investor','Tenant','Channel Partner','NRI') DEFAULT 'Buyer',
  `lead_source` enum('Website','Walk-In','Referral','Social Media','Ad Campaign','Cold Call') DEFAULT 'Website',
  `budget_min` decimal(15,2) DEFAULT NULL,
  `budget_max` decimal(15,2) DEFAULT NULL,
  `interested_bhk` varchar(50) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `lead_status` enum('New','Contacted','Qualified','Site Visit Done','Negotiating','Booked','Lost','Junk') DEFAULT 'New',
  `lead_score` int(11) DEFAULT 0,
  `assigned_to` int(11) DEFAULT NULL,
  `next_follow_up` date DEFAULT NULL,
  `lost_reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_leads`
--

INSERT INTO `property_leads` (`id`, `user_id`, `property_id`, `lead_name`, `lead_email`, `lead_phone`, `lead_type`, `lead_source`, `budget_min`, `budget_max`, `interested_bhk`, `message`, `lead_status`, `lead_score`, `assigned_to`, `next_follow_up`, `lost_reason`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Neha Shah', 'neha.shah@email.com', '+91 98240 12345', 'Buyer', 'Website', 7000000.00, 12000000.00, '3 BHK', NULL, 'Contacted', 75, 6, '2026-03-15', NULL, '2026-02-28 08:24:47', '2026-03-05 10:51:26'),
(2, 3, 2, 'Hitesh Desai', 'hitesh.d@email.com', '+91 99099 88776', 'Investor', 'Referral', 30000000.00, 50000000.00, 'Commercial', NULL, 'Negotiating', 90, 6, '2024-04-05', NULL, '2026-02-28 08:24:47', '2026-03-05 09:32:11'),
(3, 4, 3, 'Komal Mehta', 'komal.mehta@email.com', '+91 94280 55667', 'Buyer', 'Website', 5000000.00, 7000000.00, '2 BHK', NULL, 'Site Visit Done', 60, 6, '2024-04-08', NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(4, NULL, 9, 'Ramesh Prajapati', 'ramesh.p@email.com', '+91 98765 99887', 'Buyer', 'Walk-In', 2500000.00, 3500000.00, '1 BHK', NULL, 'New', 30, 9, '2024-04-12', NULL, '2026-02-28 08:24:47', '2026-02-28 08:24:47');

-- --------------------------------------------------------

--
-- Table structure for table `property_legal`
--

CREATE TABLE `property_legal` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `rera_number` varchar(100) DEFAULT NULL,
  `rera_status` enum('Approved','Applied','Not Required','Expired') DEFAULT 'Applied',
  `rera_expiry_date` date DEFAULT NULL,
  `legal_status` varchar(255) DEFAULT NULL,
  `paper_ratio` decimal(5,2) DEFAULT NULL,
  `encumbrance_clear` tinyint(1) DEFAULT 0,
  `title_clear` tinyint(1) DEFAULT 0,
  `occupancy_certificate` tinyint(1) DEFAULT 0,
  `completion_certificate` tinyint(1) DEFAULT 0,
  `environment_clearance` tinyint(1) DEFAULT 0,
  `noc_fire` tinyint(1) DEFAULT 0,
  `noc_aviation` tinyint(1) DEFAULT 0,
  `approved_by` varchar(255) DEFAULT NULL,
  `approval_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_legal`
--

INSERT INTO `property_legal` (`id`, `property_id`, `rera_number`, `rera_status`, `rera_expiry_date`, `legal_status`, `paper_ratio`, `encumbrance_clear`, `title_clear`, `occupancy_certificate`, `completion_certificate`, `environment_clearance`, `noc_fire`, `noc_aviation`, `approved_by`, `approval_date`, `created_at`, `updated_at`) VALUES
(1, 1, 'PR/GJ/230215/0001', 'Approved', NULL, 'RERA Approved', 82.50, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 2, 'P51900032847', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-03-01 09:30:01'),
(3, 3, 'PR/GJ/221115/0089', 'Approved', NULL, 'RERA Approved', 91.25, 1, 1, 1, 0, 0, 1, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 4, 'PR/GJ/230405/0056', 'Approved', NULL, 'RERA Approved', 78.50, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 5, 'PR/GJ/240115/0123', 'Applied', NULL, 'RERA Applied', 75.00, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 6, 'PR/GJ/230815/0078', 'Approved', NULL, 'RERA Approved', 84.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 7, 'PR/GJ/230615/0094', 'Approved', NULL, 'RERA Approved', 92.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 8, 'PR/GJ/240205/0145', 'Applied', NULL, 'RERA Applied', 76.80, 0, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 9, 'PR/GJ/221215/0034', 'Approved', NULL, 'RERA Approved', 95.50, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 10, 'PR/GJ/240305/0189', 'Applied', NULL, 'RERA Applied', 81.20, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(12, 12, 'PR/GJ/230612/0210', 'Approved', NULL, 'RERA Approved', 85.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(13, 13, 'PR/GJ/210315/0044', 'Approved', NULL, 'RERA Approved', 92.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(14, 14, 'PR/GJ/200901/0018', 'Approved', NULL, 'RERA Approved', 94.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(15, 15, 'PR/GJ/230912/0278', 'Approved', NULL, 'RERA Approved', 82.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(16, 16, 'PR/GJ/240115/0301', 'Applied', NULL, 'RERA Applied', 78.00, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(17, 17, 'PR/GJ/230404/0199', 'Approved', NULL, 'RERA Approved', 88.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(18, 18, 'PR/GJ/231010/0254', 'Approved', NULL, 'RERA Approved', 83.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(19, 19, 'PR/GJ/210601/0067', 'Approved', NULL, 'RERA Approved', 96.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(20, 20, 'PR/GJ/230715/0223', 'Approved', NULL, 'RERA Approved', 87.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(21, 21, 'PR/GJ/240105/0312', 'Applied', NULL, 'RERA Applied', 76.00, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(22, 22, 'PR/GJ/230310/0178', 'Approved', NULL, 'RERA Approved', 89.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(23, 23, 'PR/GJ/230805/0237', 'Approved', NULL, 'RERA Approved', 84.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(24, 24, 'PR/GJ/220105/0098', 'Approved', NULL, 'RERA Approved', 91.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(25, 25, 'PR/GJ/210102/0029', 'Approved', NULL, 'RERA Approved', 93.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(26, 26, 'PR/GJ/240310/0334', 'Applied', NULL, 'RERA Applied', 74.00, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(27, 27, 'PR/GJ/240110/0298', 'Approved', NULL, 'RERA Approved', 80.00, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(28, 28, 'PR/GJ/231110/0267', 'Approved', NULL, 'RERA Approved', 85.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(29, 29, 'PR/GJ/230604/0214', 'Approved', NULL, 'RERA Approved', 90.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(30, 30, 'PR/GJ/230508/0207', 'Approved', NULL, 'RERA Approved', 88.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(31, 31, 'PR/GJ/240601/0356', 'Applied', NULL, 'RERA Applied', 72.00, 0, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(32, 32, 'PR/GJ/240901/0389', 'Applied', NULL, 'RERA Applied', 70.00, 0, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(33, 33, 'PR/GJ/230910/0248', 'Approved', NULL, 'RERA Approved', 86.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(34, 34, 'PR/GJ/210408/0052', 'Approved', NULL, 'RERA Approved', 95.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(35, 35, 'PR/GJ/240205/0317', 'Applied', NULL, 'RERA Applied', 77.00, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(36, 36, 'PR/GJ/231205/0281', 'Approved', NULL, 'RERA Approved', 83.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(37, 37, 'PR/GJ/240110/0305', 'Applied', NULL, 'RERA Applied', 75.00, 1, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(38, 38, 'PR/GJ/230710/0228', 'Approved', NULL, 'RERA Approved', 82.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(39, 39, 'PR/GJ/240410/0348', 'Applied', NULL, 'RERA Applied', 73.00, 0, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(40, 40, 'PR/GJ/241101/0401', 'Applied', NULL, 'RERA Applied', 68.00, 0, 1, 0, 0, 0, 0, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39'),
(41, 41, 'PR/GJ/200606/0011', 'Approved', NULL, 'RERA Approved', 97.00, 1, 1, 0, 0, 0, 1, 0, NULL, NULL, '2026-03-02 11:17:39', '2026-03-02 11:17:39');

-- --------------------------------------------------------

--
-- Table structure for table `property_locations`
--

CREATE TABLE `property_locations` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `address` text NOT NULL,
  `locality` varchar(150) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT 'India',
  `zip_code` varchar(20) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `landmarks` text DEFAULT NULL,
  `nearest_metro` varchar(255) DEFAULT NULL,
  `nearest_railway` varchar(255) DEFAULT NULL,
  `nearest_airport` varchar(255) DEFAULT NULL,
  `nearest_highway` varchar(255) DEFAULT NULL,
  `walkability_score` tinyint(4) DEFAULT NULL,
  `transit_score` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_locations`
--

INSERT INTO `property_locations` (`id`, `property_id`, `address`, `locality`, `city`, `district`, `state`, `country`, `zip_code`, `latitude`, `longitude`, `area`, `landmarks`, `nearest_metro`, `nearest_railway`, `nearest_airport`, `nearest_highway`, `walkability_score`, `transit_score`, `created_at`, `updated_at`) VALUES
(1, 1, 'Near South Bopal Cross Road, Opp. Sun City Club', 'South Bopal', 'Ahmedabad', NULL, 'Gujarat', 'India', '380058', 23.02250000, 72.57140000, 'South Bopal', 'Near Sobo Center, 5 mins from BRTS, 10 mins from SG Highway', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 2, 'Marine Drive, South Mumbai', NULL, 'Mumbai', NULL, 'Maharashtra', 'India', NULL, 18.94320000, 72.82370000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-03-01 09:27:01'),
(3, 3, 'Alkapuri, Opp. Inox Multiplex', 'Alkapuri', 'Vadodara', NULL, 'Gujarat', 'India', '390007', 22.30720000, 73.18120000, 'Alkapuri', 'Near Gotri Road, Opposite Alkapuri Railway Station', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 4, 'VIP Road, Near Manjalpur Circle', 'Manjalpur', 'Vadodara', NULL, 'Gujarat', 'India', '390011', 22.26700000, 73.19020000, 'Manjalpur', 'Next to Big Bazaar, Near Baroda Cricket Association Ground', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 5, 'Vesu Main Road, Near DPS School', 'Vesu', 'Surat', NULL, 'Gujarat', 'India', '395007', 21.17020000, 72.83110000, 'Vesu', 'Near SDB Diamond, 5 mins from Surat Airport', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 6, 'Textile Market, Ring Road', 'Ring Road', 'Surat', NULL, 'Gujarat', 'India', '395003', 21.19500000, 72.82040000, 'Ring Road', 'Adjacent to Surat Textile Market, Near Railway Station', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 7, 'Race Course Road, Near Jaydeep Hotel', 'Race Course', 'Rajkot', NULL, 'Gujarat', 'India', '360001', 22.30390000, 70.80220000, 'Race Course', 'Opp. Race Course Ground, Near Kristi Plaza', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 8, 'Kalavad Road, Near Dharmendrasinhji College', 'Kalavad Road', 'Rajkot', NULL, 'Gujarat', 'India', '360005', 22.29150000, 70.81580000, 'Kalavad Road', 'Near Aims Hospital, 5 mins from Raiya Circle', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 9, 'Sector 16, Near GIDC Electronics Estate', 'Sector 16', 'Gandhinagar', NULL, 'Gujarat', 'India', '382016', 23.21560000, 72.63690000, 'Sector 16', 'Near Gujarat High Court, 2 km from Akshardham Temple', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 10, 'Infocity, Near PDPU University', 'Infocity', 'Gandhinagar', NULL, 'Gujarat', 'India', '382421', 23.17560000, 72.63780000, 'Infocity', 'Opp. PDPU University, Near iCreate Centre', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(11, 11, 'Marine Drive', NULL, 'Mumbai', NULL, 'Maharashtra', 'India', '400002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 09:19:10', '2026-03-01 09:19:10'),
(13, 12, 'SG Highway, Near Makarba Circle', 'Makarba', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380051', 23.00800000, 72.50600000, 'SG Highway', 'Near Makarba Flyover, 2km from Sardar Patel Ring Road', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(14, 13, 'Anandnagar Cross Road, Satellite', 'Anandnagar', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380015', 23.02300000, 72.52900000, 'Satellite', 'Near Titanium Cross Road, Opp. Karnavati Club', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(15, 14, 'Ambawadi, Near Navrangpura Bus Stand', 'Ambawadi', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380006', 23.03700000, 72.56200000, 'Ambawadi', 'Near Gujarat High Court, Opp. HDFC Bank HQ', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(16, 15, 'Prahlad Nagar, Near Iscon Temple', 'Prahlad Nagar', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380015', 23.01900000, 72.52100000, 'Prahlad Nagar', 'Near Prahlad Nagar Garden, 5 mins from ISCON Temple', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(17, 16, 'Bopal Main Road, Near Euro School', 'Bopal', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380058', 23.03100000, 72.46600000, 'Bopal', 'Near Euro School, Opp. D-Mart Bopal', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(18, 17, 'Chandkheda, Near Sabarmati Railway Station', 'Chandkheda', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '382424', 23.10900000, 72.58800000, 'Chandkheda', 'Near Chandkheda BRTS, 3km from Sabarmati Railway Station', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(19, 18, 'Gota, Near SP Ring Road', 'Gota', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '382481', 23.08100000, 72.56400000, 'Gota', 'Near Gota Circle, Opp. Zydus Hospital', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(20, 19, 'Prahlad Nagar, Opp. Courtyard Marriott', 'Prahlad Nagar', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380015', 23.01500000, 72.51800000, 'Prahlad Nagar', 'Adjacent Mondeal Square, Near Courtyard by Marriott', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(21, 20, 'Satellite Road, Near Pakwan Cross Road', 'Satellite', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380015', 23.02900000, 72.53800000, 'Satellite', 'Near Pakwan Restaurant, 5 mins from IIM Ahmedabad', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(22, 21, 'Thaltej, Near SG Highway Underpass', 'Thaltej', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380054', 23.05100000, 72.50200000, 'Thaltej', 'Near Thaltej Metro Station, Opp. Zydus Cadila', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(23, 22, 'New Ranip, Near AMTS Depot', 'New Ranip', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '382480', 23.07400000, 72.56100000, 'New Ranip', 'Near New Ranip Circle, 10 mins from Chandkheda', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(24, 23, 'South Bopal, Near Sindhu Bhavan Road', 'South Bopal', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380058', 23.02100000, 72.46900000, 'South Bopal', 'Near Sindhu Bhavan Road Junction, 3km from Bopal', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(25, 24, 'Naroda GIDC, Near Naroda Railway Station', 'Naroda', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '382330', 23.07900000, 72.65200000, 'Naroda', 'Near Naroda GIDC, 1km from Naroda Railway Station', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(26, 25, 'Shyamal Cross Road, Near Shyamal Circle', 'Shyamal', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380015', 23.02000000, 72.53500000, 'Shyamal', 'Adjacent Shyamal Circle, Near VR Ahmedabad Mall', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(27, 26, 'Bodakdev, Near ISKCON Temple', 'Bodakdev', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380054', 23.04500000, 72.50900000, 'Bodakdev', 'Near ISKCON Temple Bodakdev, 5 mins from Thaltej', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(28, 27, 'GIFT City, Zone 2, Sector 9', 'GIFT City', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382355', 23.16300000, 72.67800000, 'GIFT City', 'Adjacent GIFT City SEZ, Near IFSCA Headquarters', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(29, 28, 'Infocity Phase 2, Near PDPU Road', 'Infocity', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382421', 23.17100000, 72.63400000, 'Infocity', 'Near PDPU University Gate 2, Opp. iCreate Centre', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(30, 29, 'Sector 7, Near GIFT City Entry', 'Sector 7', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382007', 23.20800000, 72.65100000, 'Sector 7', 'Near GIFT City Entrance Road, 4km from Gandhinagar Bus Stand', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(31, 30, 'Sector 5, Near Akshardham Temple', 'Sector 5', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382005', 23.21900000, 72.63200000, 'Sector 5', 'Near Akshardham Temple Main Gate, 2km from Gujarat Secretariat', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(32, 31, 'Near iCreate, Gandhinagar', 'Infocity', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382421', 23.17500000, 72.63600000, 'Infocity', 'Adjacent iCreate Centre, Near DAIICT Campus', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(33, 32, 'Sector 23, Gandhinagar', 'Sector 23', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382023', 23.24800000, 72.65400000, 'Sector 23', 'Near Sector 23 Park, 10 mins from Gandhinagar Bus Terminus', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(34, 33, 'Sector 21, Gandhinagar', 'Sector 21', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382021', 23.24100000, 72.65100000, 'Sector 21', 'Near Sector 21 Market, 3km from Civil Hospital Gandhinagar', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(35, 34, 'Sector 11, Near Sachivalaya', 'Sector 11', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382011', 23.22400000, 72.65000000, 'Sector 11', 'Near Gujarat Sachivalaya, Opp. NID Gandhinagar', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(36, 35, 'Vaishnodevi Circle, SG Highway', 'Vaishnodevi', 'Ahmedabad', 'Gandhinagar', 'Gujarat', 'India', '382421', 23.09800000, 72.56900000, 'Vaishnodevi', 'Near Vaishnodevi Circle Flyover, 5km from Ahmedabad Airport', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(37, 36, 'ISCON Cross Road, Satellite', 'Satellite', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380054', 23.03300000, 72.52600000, 'Satellite', 'Near ISCON Cross Road, Adjacent VR Mall Ahmedabad', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(38, 37, 'ISCON Ambli Road, Near Shela', 'ISCON Ambli', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380058', 23.03600000, 72.47800000, 'ISCON Ambli', 'Near ISCON Ambli Road Junction, 5 mins from Shela', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(39, 38, 'Vasna, Near Law Garden', 'Vasna', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380007', 23.02000000, 72.56900000, 'Vasna', 'Near Law Garden, 5 mins from Navrangpura', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(40, 39, 'Shela, Near Sindhu Bhavan', 'Shela', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '382213', 23.02800000, 72.44900000, 'Shela', 'Near Shela Village Road, 7 mins from Bopal', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(41, 40, 'Zundal, Near Gandhinagar Highway', 'Zundal', 'Gandhinagar', 'Gandhinagar', 'Gujarat', 'India', '382421', 23.10200000, 72.59800000, 'Zundal', 'Near Zundal Circle, On Ahmedabad-Gandhinagar Express Highway', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(42, 41, 'CG Road, Near Navrangpura', 'CG Road', 'Ahmedabad', 'Ahmedabad', 'Gujarat', 'India', '380009', 23.03200000, 72.57000000, 'CG Road', 'Near CG Road Cross Road, Opp. Sakar Complex', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 11:16:30', '2026-03-02 11:16:30'),
(43, 42, 'Nalanda School Bhuravav Godhra', NULL, 'Mahisagar', NULL, 'Gujarat', 'India', NULL, 22.78730000, 73.62690000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-05 09:20:30', '2026-03-05 09:20:30');

-- --------------------------------------------------------

--
-- Table structure for table `property_media`
--

CREATE TABLE `property_media` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `media_url` varchar(500) NOT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `file_size_kb` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `duration_seconds` int(11) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_media`
--

INSERT INTO `property_media` (`id`, `property_id`, `category_id`, `media_url`, `thumbnail_url`, `file_type`, `file_size_kb`, `width`, `height`, `duration_seconds`, `display_order`, `title`, `description`, `alt_text`, `is_primary`, `created_at`) VALUES
(1, 1, 1, '/uploads/ahmedabad/suncity/exterior1.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'Suncity - Main Tower Exterior View', NULL, NULL, 1, '2026-02-28 08:24:47'),
(2, 1, 1, '/uploads/ahmedabad/suncity/interior1.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 2, '3BHK Living Room Sample', NULL, NULL, 0, '2026-02-28 08:24:47'),
(3, 1, 2, '/uploads/ahmedabad/suncity/render1.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 3, 'Project Completion 3D View', NULL, NULL, 0, '2026-02-28 08:24:47'),
(4, 1, 6, '/uploads/ahmedabad/suncity/floorplan-2bhk.pdf', NULL, 'pdf', NULL, NULL, NULL, NULL, 4, '2 BHK Floor Plan - 1150 sqft', NULL, NULL, 0, '2026-02-28 08:24:47'),
(5, 1, 3, '/uploads/ahmedabad/suncity/drone.mp4', NULL, 'mp4', NULL, NULL, NULL, NULL, 5, 'Aerial View of South Bopal Location', NULL, NULL, 0, '2026-02-28 08:24:47'),
(6, 2, 1, '/uploads/ahmedabad/giftcity/tower1.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'GIFT City - Tower 1 Exterior', NULL, NULL, 1, '2026-02-28 08:24:47'),
(7, 2, 1, '/uploads/ahmedabad/giftcity/interior-office.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 2, 'Sample Office Interior', NULL, NULL, 0, '2026-02-28 08:24:47'),
(8, 2, 3, '/uploads/ahmedabad/giftcity/aerial.mp4', NULL, 'mp4', NULL, NULL, NULL, NULL, 3, 'GIFT City Master Plan View', NULL, NULL, 0, '2026-02-28 08:24:47'),
(9, 3, 1, '/uploads/vadodara/kalyan/exterior.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'Kalyan - Alkapuri Exterior', NULL, NULL, 1, '2026-02-28 08:24:47'),
(10, 3, 5, '/uploads/vadodara/kalyan/virtualtour.mp4', NULL, 'mp4', NULL, NULL, NULL, NULL, 2, 'Penthouse Virtual Tour', NULL, NULL, 0, '2026-02-28 08:24:47'),
(11, 3, 6, '/uploads/vadodara/kalyan/floorplan-penthouse.pdf', NULL, 'pdf', NULL, NULL, NULL, NULL, 3, 'Penthouse Floor Plan', NULL, NULL, 0, '2026-02-28 08:24:47'),
(12, 4, 1, '/uploads/vadodara/viproad/complex.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'VIP Road Commercial Complex', NULL, NULL, 1, '2026-02-28 08:24:47'),
(13, 5, 1, '/uploads/surat/vesu/duplex.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'Diamond Project - Duplex Exterior', NULL, NULL, 1, '2026-02-28 08:24:47'),
(14, 5, 4, '/uploads/surat/vesu/aerial.mp4', NULL, 'mp4', NULL, NULL, NULL, NULL, 2, 'Vesu Location Overview', NULL, NULL, 0, '2026-02-28 08:24:47'),
(15, 5, 1, '/uploads/surat/vesu/amenities.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 3, 'Club House and Pool Area', NULL, NULL, 0, '2026-02-28 08:24:47'),
(16, 6, 1, '/uploads/surat/textile/market.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'Textile Market Complex', NULL, NULL, 1, '2026-02-28 08:24:47'),
(17, 7, 1, '/uploads/rajkot/raceview/villa1.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'Raceview - Villa Exterior', NULL, NULL, 1, '2026-02-28 08:24:47'),
(18, 7, 1, '/uploads/rajkot/raceview/interior.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 2, 'Villa Living Room', NULL, NULL, 0, '2026-02-28 08:24:47'),
(19, 7, 7, '/uploads/rajkot/raceview/brochure.pdf', NULL, 'pdf', NULL, NULL, NULL, NULL, 3, 'Villa Estates Brochure', NULL, NULL, 0, '2026-02-28 08:24:47'),
(20, 8, 1, '/uploads/rajkot/kalavad/township.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'Kalavad Road Township', NULL, NULL, 1, '2026-02-28 08:24:47'),
(21, 9, 1, '/uploads/gandhinagar/sector16/apartments.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'Sector 16 - Affordable Housing', NULL, NULL, 1, '2026-02-28 08:24:47'),
(22, 9, 6, '/uploads/gandhinagar/sector16/floorplan.pdf', NULL, 'pdf', NULL, NULL, NULL, NULL, 2, '1BHK and 2BHK Floor Plans', NULL, NULL, 0, '2026-02-28 08:24:47'),
(23, 10, 1, '/uploads/gandhinagar/infocity/office.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 1, 'Infocity - Commercial Tower', NULL, NULL, 1, '2026-02-28 08:24:47'),
(24, 10, 2, '/uploads/gandhinagar/infocity/render.jpg', NULL, 'jpg', NULL, NULL, NULL, NULL, 2, 'Project Completion Render', NULL, NULL, 0, '2026-02-28 08:24:47');

-- --------------------------------------------------------

--
-- Table structure for table `property_milestones`
--

CREATE TABLE `property_milestones` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `milestone_name` varchar(255) NOT NULL,
  `milestone_type` enum('Foundation','Structure','Plumbing','Electrical','Finishing','Landscaping','Handover','Other') NOT NULL,
  `target_date` date DEFAULT NULL,
  `actual_date` date DEFAULT NULL,
  `completion_percent` decimal(5,2) DEFAULT 0.00,
  `status` enum('Upcoming','In Progress','Completed','Delayed') DEFAULT 'Upcoming',
  `notes` text DEFAULT NULL,
  `photo_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_milestones`
--

INSERT INTO `property_milestones` (`id`, `property_id`, `milestone_name`, `milestone_type`, `target_date`, `actual_date`, `completion_percent`, `status`, `notes`, `photo_url`, `created_at`, `updated_at`) VALUES
(2, 1, 'Structure Up - 15th Floor', 'Structure', '2024-06-30', '2024-06-15', 100.00, 'Completed', NULL, NULL, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(3, 1, 'Structure Complete', 'Structure', '2024-12-31', NULL, 65.00, 'In Progress', NULL, NULL, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(4, 1, 'Plumbing & Electrical', 'Plumbing', '2025-04-30', NULL, 30.00, 'In Progress', NULL, NULL, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(5, 1, 'Finishing & Handover', 'Finishing', '2025-12-31', NULL, 0.00, 'Upcoming', NULL, NULL, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(6, 9, 'Foundation Complete', 'Foundation', '2023-08-31', '2023-08-25', 100.00, 'Completed', NULL, NULL, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(7, 9, 'Structure Complete', 'Structure', '2024-04-30', '2024-05-10', 100.00, 'Completed', NULL, NULL, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(8, 9, 'Internal Finishing', 'Finishing', '2024-09-30', NULL, 60.00, 'In Progress', NULL, NULL, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(9, 9, 'Landscaping & Handover', 'Landscaping', '2024-12-31', NULL, 0.00, 'Upcoming', NULL, NULL, '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(10, 2, 'Foundation Complete', 'Foundation', '2026-06-01', NULL, 60.00, 'In Progress', NULL, NULL, '2026-03-05 10:36:44', '2026-03-05 10:36:44');

-- --------------------------------------------------------

--
-- Table structure for table `property_price_history`
--

CREATE TABLE `property_price_history` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `bhk_type` varchar(50) DEFAULT NULL,
  `old_price` decimal(15,2) DEFAULT NULL,
  `new_price` decimal(15,2) NOT NULL,
  `old_price_per_sqft` decimal(10,2) DEFAULT NULL,
  `new_price_per_sqft` decimal(10,2) DEFAULT NULL,
  `change_percent` decimal(6,2) DEFAULT NULL,
  `change_reason` varchar(255) DEFAULT NULL,
  `changed_by` int(11) DEFAULT NULL,
  `effective_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_price_history`
--

INSERT INTO `property_price_history` (`id`, `property_id`, `bhk_type`, `old_price`, `new_price`, `old_price_per_sqft`, `new_price_per_sqft`, `change_percent`, `change_reason`, `changed_by`, `effective_date`, `created_at`) VALUES
(1, 1, '2 BHK', 7500000.00, 6000000.00, 6521.00, NULL, -20.00, 'Market adjustment Q2 2026', 11, '2026-03-01', '2026-03-01 09:42:17');

-- --------------------------------------------------------

--
-- Table structure for table `property_pricing`
--

CREATE TABLE `property_pricing` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `bhk_type` varchar(50) NOT NULL,
  `tower` varchar(100) DEFAULT NULL,
  `floor_range` varchar(50) DEFAULT NULL,
  `total_units` int(11) NOT NULL,
  `available_units` int(11) NOT NULL,
  `size_super_buildup` decimal(10,2) DEFAULT NULL,
  `size_carpet` decimal(10,2) DEFAULT NULL,
  `size_balcony` decimal(10,2) DEFAULT NULL,
  `price` decimal(15,2) NOT NULL,
  `price_per_sqft` decimal(10,2) DEFAULT NULL,
  `booking_amount` decimal(15,2) DEFAULT NULL,
  `revenue` decimal(15,2) DEFAULT NULL,
  `roi` decimal(5,2) DEFAULT NULL,
  `rental_yield` decimal(5,2) DEFAULT NULL,
  `expected_appreciation` decimal(5,2) DEFAULT NULL,
  `price_last_updated` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_pricing`
--

INSERT INTO `property_pricing` (`id`, `property_id`, `bhk_type`, `tower`, `floor_range`, `total_units`, `available_units`, `size_super_buildup`, `size_carpet`, `size_balcony`, `price`, `price_per_sqft`, `booking_amount`, `revenue`, `roi`, `rental_yield`, `expected_appreciation`, `price_last_updated`, `created_at`, `updated_at`) VALUES
(1, 1, '2 BHK', 'A', NULL, 100, 35, 1150.00, 925.00, NULL, 6000000.00, 6521.00, NULL, 262500000.00, 9.50, 3.20, NULL, '2026-03-01', '2026-02-28 08:15:55', '2026-03-01 09:42:17'),
(2, 1, '3 BHK', 'B', NULL, 150, 50, 1550.00, 1275.00, NULL, 10850000.00, 7000.00, NULL, 542500000.00, 10.20, 3.50, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(3, 2, 'Commercial', 'Tower 1', NULL, 75, 25, 2500.00, 2200.00, NULL, 37500000.00, 15000.00, NULL, 937500000.00, 12.50, 6.80, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(4, 2, 'Commercial', 'Tower 2', NULL, 75, 20, 3000.00, 2700.00, NULL, 48000000.00, 16000.00, NULL, 960000000.00, 13.00, 7.20, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(5, 3, '2 BHK', 'A', NULL, 60, 12, 1050.00, 850.00, NULL, 6300000.00, 6000.00, NULL, 75600000.00, 8.80, 3.00, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(6, 3, '3 BHK', 'Penthouse', NULL, 20, 3, 1850.00, 1525.00, NULL, 15725000.00, 8500.00, NULL, 47175000.00, 7.50, 2.80, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(7, 4, 'Shop', 'Plaza', NULL, 50, 20, 500.00, 450.00, NULL, 7500000.00, 15000.00, NULL, 150000000.00, 11.20, 5.50, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(8, 4, 'Office', 'Tower', NULL, 30, 10, 1200.00, 1000.00, NULL, 14400000.00, 12000.00, NULL, 144000000.00, 10.80, 5.00, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(9, 5, '3 BHK', 'Duplex', NULL, 150, 60, 1650.00, 1380.00, NULL, 12375000.00, 7500.00, NULL, 743000000.00, 10.50, 3.80, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(10, 5, '4 BHK', 'Duplex+', NULL, 150, 60, 2100.00, 1750.00, NULL, 16800000.00, 8000.00, NULL, 1008000000.00, 11.00, 4.00, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(11, 6, 'Shop', 'Market', NULL, 120, 35, 400.00, 350.00, NULL, 6000000.00, 15000.00, NULL, 210000000.00, 12.80, 6.00, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(12, 6, 'Godown', 'Warehouse', NULL, 80, 25, 1500.00, 1400.00, NULL, 13500000.00, 9000.00, NULL, 337500000.00, 14.20, 7.00, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(13, 7, '3 BHK', 'Villa', NULL, 30, 9, 2000.00, 1750.00, NULL, 16000000.00, 8000.00, NULL, 144000000.00, 9.20, 2.50, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(14, 7, '4 BHK', 'Villa+', NULL, 30, 9, 2500.00, 2150.00, NULL, 21250000.00, 8500.00, NULL, 191250000.00, 9.80, 2.80, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(15, 8, '2 BHK', 'A', NULL, 90, 40, 1050.00, 880.00, NULL, 5775000.00, 5500.00, NULL, 231000000.00, 10.00, 3.50, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(16, 8, 'Shop', 'Plaza', NULL, 90, 35, 450.00, 400.00, NULL, 5400000.00, 12000.00, NULL, 189000000.00, 11.50, 5.20, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(17, 9, '1 BHK', 'A', NULL, 200, 80, 650.00, 550.00, NULL, 2925000.00, 4500.00, NULL, 234000000.00, 8.50, 4.00, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(18, 9, '2 BHK', 'B', NULL, 200, 70, 950.00, 800.00, NULL, 5225000.00, 5500.00, NULL, 365750000.00, 9.00, 3.80, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(19, 10, 'Office', 'Infocity', NULL, 45, 18, 1800.00, 1550.00, NULL, 23400000.00, 13000.00, NULL, 421200000.00, 11.80, 6.50, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(20, 10, 'Commercial', 'Plaza', NULL, 45, 17, 2000.00, 1700.00, NULL, 30000000.00, 15000.00, NULL, 510000000.00, 12.20, 7.00, NULL, NULL, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(21, 2, '2BHK', NULL, NULL, 50, 30, 1100.00, 850.00, NULL, 5500000.00, 6470.00, 500000.00, NULL, 12.50, NULL, NULL, '2026-03-01', '2026-03-01 09:41:13', '2026-03-01 09:41:13'),
(22, 12, '2 BHK', 'A', NULL, 160, 55, 1100.00, 900.00, NULL, 7700000.00, 7000.00, 500000.00, NULL, 10.00, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(23, 12, '3 BHK', 'B', NULL, 160, 55, 1600.00, 1300.00, NULL, 12800000.00, 8000.00, 800000.00, NULL, 10.50, 3.60, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(24, 13, 'Shop', 'Main', NULL, 100, 35, 600.00, 520.00, NULL, 9000000.00, 15000.00, 900000.00, NULL, 12.00, 6.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(25, 13, 'Office', 'Tower', NULL, 80, 25, 1200.00, 1050.00, NULL, 14400000.00, 12000.00, 1000000.00, NULL, 11.50, 5.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(26, 14, 'Office', 'Tower', NULL, 90, 30, 1500.00, 1300.00, NULL, 19500000.00, 13000.00, 1500000.00, NULL, 12.00, 6.20, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(27, 15, '2 BHK', 'A', NULL, 120, 40, 1050.00, 865.00, NULL, 7350000.00, 7000.00, 500000.00, NULL, 9.80, 3.30, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(28, 15, '3 BHK', 'B', NULL, 120, 40, 1500.00, 1240.00, NULL, 12000000.00, 8000.00, 700000.00, NULL, 10.20, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(29, 16, '4 BHK', 'Bungalow', NULL, 48, 15, 2800.00, 2400.00, NULL, 25200000.00, 9000.00, 2000000.00, NULL, 9.00, 2.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(30, 17, '1 BHK', 'A', NULL, 140, 60, 650.00, 540.00, NULL, 2925000.00, 4500.00, 200000.00, NULL, 8.50, 4.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(31, 17, '2 BHK', 'B', NULL, 140, 60, 950.00, 790.00, NULL, 4750000.00, 5000.00, 300000.00, NULL, 9.00, 3.80, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(32, 18, '2 BHK', 'A', NULL, 100, 45, 1000.00, 820.00, NULL, 5500000.00, 5500.00, 350000.00, NULL, 9.20, 3.60, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(33, 18, '3 BHK', 'B', NULL, 100, 45, 1400.00, 1150.00, NULL, 8400000.00, 6000.00, 500000.00, NULL, 9.50, 3.70, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(34, 19, 'Office', 'Tower 1', NULL, 60, 20, 2000.00, 1750.00, NULL, 30000000.00, 15000.00, 2500000.00, NULL, 13.00, 7.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(35, 19, 'Office', 'Tower 2', NULL, 60, 20, 2500.00, 2200.00, NULL, 40000000.00, 16000.00, 3000000.00, NULL, 13.50, 7.20, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(36, 20, '3 BHK', 'Duplex', NULL, 100, 35, 1800.00, 1500.00, NULL, 14400000.00, 8000.00, 1000000.00, NULL, 10.00, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(37, 21, '2 BHK', 'A', NULL, 175, 70, 1050.00, 860.00, NULL, 7350000.00, 7000.00, 500000.00, NULL, 10.00, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(38, 21, '3 BHK', 'B', NULL, 175, 70, 1550.00, 1270.00, NULL, 11625000.00, 7500.00, 700000.00, NULL, 10.50, 3.60, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(39, 22, '1 BHK', 'A', NULL, 110, 50, 620.00, 510.00, NULL, 2480000.00, 4000.00, 150000.00, NULL, 8.00, 4.20, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(40, 22, '2 BHK', 'B', NULL, 110, 50, 950.00, 780.00, NULL, 4275000.00, 4500.00, 250000.00, NULL, 8.50, 3.80, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(41, 23, '3 BHK', 'A', NULL, 90, 35, 1500.00, 1230.00, NULL, 10500000.00, 7000.00, 700000.00, NULL, 10.00, 3.40, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(42, 23, '3 BHK', 'B', NULL, 90, 35, 1700.00, 1390.00, NULL, 13600000.00, 8000.00, 900000.00, NULL, 10.50, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(43, 24, '1 BHK', 'A', NULL, 150, 65, 600.00, 490.00, NULL, 2400000.00, 4000.00, 150000.00, NULL, 8.00, 4.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(44, 24, '2 BHK', 'B', NULL, 150, 65, 900.00, 740.00, NULL, 4050000.00, 4500.00, 250000.00, NULL, 8.50, 4.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(45, 25, 'Shop', 'Ground', NULL, 50, 16, 450.00, 390.00, NULL, 6750000.00, 15000.00, 700000.00, NULL, 12.50, 6.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(46, 25, 'Office', 'Upper', NULL, 30, 9, 1000.00, 870.00, NULL, 10000000.00, 10000.00, 800000.00, NULL, 11.00, 5.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(47, 26, '3 BHK', 'A', NULL, 80, 28, 1600.00, 1320.00, NULL, 14400000.00, 9000.00, 1000000.00, NULL, 10.00, 3.20, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(48, 26, '4 BHK', 'B', NULL, 80, 27, 2200.00, 1800.00, NULL, 22000000.00, 10000.00, 1500000.00, NULL, 10.50, 3.30, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(49, 27, 'Commercial', 'Tower 1', NULL, 100, 40, 2800.00, 2500.00, NULL, 56000000.00, 20000.00, 5000000.00, NULL, 14.00, 8.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(50, 27, 'Commercial', 'Tower 2', NULL, 100, 40, 3500.00, 3100.00, NULL, 70000000.00, 20000.00, 6000000.00, NULL, 14.50, 8.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(51, 28, 'Office', 'Tower', NULL, 100, 40, 1600.00, 1400.00, NULL, 20800000.00, 13000.00, 1500000.00, NULL, 12.00, 6.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(52, 29, '1 BHK', 'A', NULL, 200, 90, 640.00, 530.00, NULL, 2880000.00, 4500.00, 200000.00, NULL, 8.50, 4.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(53, 29, '2 BHK', 'B', NULL, 200, 90, 940.00, 775.00, NULL, 5170000.00, 5500.00, 300000.00, NULL, 9.00, 3.80, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(54, 30, '2 BHK', 'A', NULL, 125, 50, 1050.00, 860.00, NULL, 6300000.00, 6000.00, 400000.00, NULL, 9.50, 3.60, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(55, 30, '3 BHK', 'B', NULL, 125, 50, 1500.00, 1230.00, NULL, 10500000.00, 7000.00, 600000.00, NULL, 9.80, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(56, 31, 'Office', 'Tower', NULL, 80, 30, 1800.00, 1580.00, NULL, 25200000.00, 14000.00, 2000000.00, NULL, 12.50, 7.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(57, 32, '4 BHK', 'Villa', NULL, 60, 20, 3000.00, 2600.00, NULL, 27000000.00, 9000.00, 2500000.00, NULL, 9.50, 2.80, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(58, 33, '2 BHK', 'A', NULL, 110, 45, 1000.00, 820.00, NULL, 6000000.00, 6000.00, 400000.00, NULL, 9.00, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(59, 33, '3 BHK', 'B', NULL, 110, 45, 1400.00, 1150.00, NULL, 9800000.00, 7000.00, 600000.00, NULL, 9.50, 3.40, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(60, 34, 'Office', 'Tower', NULL, 60, 22, 1500.00, 1300.00, NULL, 18000000.00, 12000.00, 1500000.00, NULL, 11.50, 6.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(61, 35, '2 BHK', 'A', NULL, 140, 60, 1000.00, 820.00, NULL, 5500000.00, 5500.00, 350000.00, NULL, 9.00, 3.60, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(62, 35, '3 BHK', 'B', NULL, 140, 60, 1400.00, 1150.00, NULL, 8400000.00, 6000.00, 500000.00, NULL, 9.50, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(63, 36, 'Office', 'Tower 1', NULL, 50, 18, 1800.00, 1580.00, NULL, 25200000.00, 14000.00, 2000000.00, NULL, 12.00, 6.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(64, 36, 'Shop', 'Ground', NULL, 50, 17, 600.00, 520.00, NULL, 9000000.00, 15000.00, 900000.00, NULL, 12.50, 6.20, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(65, 37, '3 BHK', 'Penthouse', NULL, 80, 20, 2200.00, 1820.00, NULL, 22000000.00, 10000.00, 2000000.00, NULL, 9.50, 2.80, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(66, 38, '2 BHK', 'A', NULL, 120, 50, 1000.00, 820.00, NULL, 5500000.00, 5500.00, 350000.00, NULL, 9.00, 3.50, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(67, 38, '3 BHK', 'B', NULL, 120, 50, 1400.00, 1150.00, NULL, 8400000.00, 6000.00, 500000.00, NULL, 9.50, 3.40, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(68, 39, '4 BHK', 'Row House', NULL, 72, 28, 2600.00, 2200.00, NULL, 23400000.00, 9000.00, 2000000.00, NULL, 9.20, 2.60, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(69, 40, '2 BHK', 'A', NULL, 150, 70, 950.00, 780.00, NULL, 4275000.00, 4500.00, 250000.00, NULL, 8.80, 3.80, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(70, 40, '2 BHK', 'B', NULL, 150, 70, 1050.00, 860.00, NULL, 5250000.00, 5000.00, 300000.00, NULL, 9.00, 3.70, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(71, 41, 'Shop', 'Ground', NULL, 75, 25, 700.00, 600.00, NULL, 14000000.00, 20000.00, 1500000.00, NULL, 13.00, 7.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08'),
(72, 41, 'Office', 'Upper', NULL, 75, 25, 1400.00, 1200.00, NULL, 19600000.00, 14000.00, 1800000.00, NULL, 12.00, 6.00, NULL, NULL, '2026-03-02 11:17:08', '2026-03-02 11:17:08');

-- --------------------------------------------------------

--
-- Table structure for table `property_requests`
--

CREATE TABLE `property_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `your_name` varchar(255) NOT NULL,
  `your_email` varchar(255) NOT NULL,
  `your_phone` varchar(20) NOT NULL,
  `your_address` text NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `property_type` enum('Residential','Commercial','Mixed','Industrial') NOT NULL,
  `special_type` enum('None','Pent House','Duplex','Triplex','Villa','Bungalow','Farmhouse') DEFAULT 'None',
  `builder_developer_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `property_location` text NOT NULL,
  `property_city` varchar(100) DEFAULT NULL,
  `property_state` varchar(100) DEFAULT NULL,
  `property_pincode` varchar(10) DEFAULT NULL,
  `property_landmarks` text DEFAULT NULL,
  `bhk_type` varchar(50) DEFAULT NULL,
  `total_units` int(11) DEFAULT NULL,
  `available_units` int(11) DEFAULT NULL,
  `size_super_buildup` decimal(10,2) DEFAULT NULL,
  `size_carpet` decimal(10,2) DEFAULT NULL,
  `facing` enum('East','West','North','South','North-East','North-West','South-East','South-West') DEFAULT NULL,
  `construction_stage` enum('Pre-Launch','Under Construction','Ready to Move') DEFAULT NULL,
  `project_start_date` date DEFAULT NULL,
  `expected_completion` date DEFAULT NULL,
  `possession_date` date DEFAULT NULL,
  `price_per_unit` decimal(15,2) NOT NULL,
  `price_per_sqft` decimal(10,2) DEFAULT NULL,
  `total_project_cost` decimal(18,2) DEFAULT NULL,
  `expected_revenue` decimal(18,2) NOT NULL,
  `roi` decimal(5,2) NOT NULL,
  `rental_yield` decimal(5,2) DEFAULT NULL,
  `expected_appreciation` decimal(5,2) DEFAULT NULL,
  `booking_amount` decimal(15,2) DEFAULT NULL,
  `price_negotiable` tinyint(1) DEFAULT 0,
  `request_reason` text DEFAULT NULL,
  `photos_path` varchar(500) DEFAULT NULL,
  `video_url` varchar(500) DEFAULT NULL,
  `brochure_path` varchar(500) DEFAULT NULL,
  `financial_docs_path` varchar(500) DEFAULT NULL,
  `proposed_amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`proposed_amenities`)),
  `contact_person_name` varchar(255) DEFAULT NULL,
  `contact_person_phone` varchar(20) DEFAULT NULL,
  `contact_person_email` varchar(255) DEFAULT NULL,
  `contact_person_designation` varchar(100) DEFAULT NULL,
  `status` enum('Pending','Under Review','Approved','Rejected','Completion Pending','Listed') DEFAULT 'Pending',
  `completion_status` enum('Not Started','In Progress','Submitted','Complete') DEFAULT 'Not Started',
  `admin_notes` text DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `reviewed_by` int(11) DEFAULT NULL,
  `reviewed_at` datetime DEFAULT NULL,
  `listed_property_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_requests`
--

INSERT INTO `property_requests` (`id`, `user_id`, `your_name`, `your_email`, `your_phone`, `your_address`, `project_name`, `property_type`, `special_type`, `builder_developer_name`, `description`, `property_location`, `property_city`, `property_state`, `property_pincode`, `property_landmarks`, `bhk_type`, `total_units`, `available_units`, `size_super_buildup`, `size_carpet`, `facing`, `construction_stage`, `project_start_date`, `expected_completion`, `possession_date`, `price_per_unit`, `price_per_sqft`, `total_project_cost`, `expected_revenue`, `roi`, `rental_yield`, `expected_appreciation`, `booking_amount`, `price_negotiable`, `request_reason`, `photos_path`, `video_url`, `brochure_path`, `financial_docs_path`, `proposed_amenities`, `contact_person_name`, `contact_person_phone`, `contact_person_email`, `contact_person_designation`, `status`, `completion_status`, `admin_notes`, `rejection_reason`, `reviewed_by`, `reviewed_at`, `listed_property_id`, `created_at`, `updated_at`) VALUES
(1, 11, 'Harsh V Patel', '2084harsh@gmail.com', '7567586809', 'Ahmedabad, Gujarat', 'SG Skyline Residences', 'Residential', 'None', 'Adani Realty', 'Premium 3BHK apartments on SG Highway with modern amenities', 'SG Highway, Ahmedabad', 'Ahmedabad', 'Gujarat', '380054', 'Near ISCON Mall', '3BHK', 120, 85, 1650.00, 1200.00, 'East', 'Under Construction', '2025-01-01', '2027-12-31', '2027-06-30', 8500000.00, 5150.00, 1020000000.00, 1200000000.00, 17.60, 3.50, 12.00, 500000.00, 0, 'Looking for investment opportunity', NULL, NULL, NULL, NULL, '[1,2,3,4,6]', 'Harsh Patel', '7567586809', '2084harsh@gmail.com', 'Owner', 'Pending', 'Not Started', NULL, NULL, NULL, NULL, NULL, '2026-02-28 13:28:36', '2026-02-28 18:08:28'),
(2, 11, 'Harsh Patel', '2084harsh@gmail.com', '7567586809', 'Ahmedabad, Gujarat', 'SG Skyline Residences', 'Residential', 'None', 'Adani Realty', 'Premium 3BHK apartments on SG Highway with modern amenities', 'SG Highway, Ahmedabad', 'Ahmedabad', 'Gujarat', '380054', 'Near ISCON Mall', '3BHK', 120, 85, 1650.00, 1200.00, 'East', 'Under Construction', '2025-01-01', '2027-12-31', '2027-06-30', 8500000.00, 5150.00, 1020000000.00, 1200000000.00, 17.60, 3.50, 12.00, 500000.00, 0, 'Looking for investment opportunity', NULL, NULL, NULL, NULL, '[1,2,3,4,6]', 'Harsh Patel', '7567586809', '2084harsh@gmail.com', 'Owner', 'Pending', 'Not Started', NULL, NULL, NULL, NULL, NULL, '2026-02-28 18:05:24', '2026-02-28 18:05:24');

-- --------------------------------------------------------

--
-- Table structure for table `property_reviews`
--

CREATE TABLE `property_reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `rating_construction` tinyint(4) DEFAULT NULL CHECK (`rating_construction` >= 1 and `rating_construction` <= 5),
  `rating_location` tinyint(4) DEFAULT NULL CHECK (`rating_location` >= 1 and `rating_location` <= 5),
  `rating_amenities` tinyint(4) DEFAULT NULL CHECK (`rating_amenities` >= 1 and `rating_amenities` <= 5),
  `rating_value_for_money` tinyint(4) DEFAULT NULL CHECK (`rating_value_for_money` >= 1 and `rating_value_for_money` <= 5),
  `review_title` varchar(255) DEFAULT NULL,
  `review_text` text NOT NULL,
  `pros` text DEFAULT NULL,
  `cons` text DEFAULT NULL,
  `is_verified_purchase` tinyint(1) DEFAULT 0,
  `helpful_count` int(11) DEFAULT 0,
  `report_count` int(11) DEFAULT 0,
  `status` enum('Pending','Approved','Rejected','Flagged') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_reviews`
--

INSERT INTO `property_reviews` (`id`, `user_id`, `property_id`, `rating`, `rating_construction`, `rating_location`, `rating_amenities`, `rating_value_for_money`, `review_title`, `review_text`, `pros`, `cons`, `is_verified_purchase`, `helpful_count`, `report_count`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 5, 5, 5, 4, 5, 'Excellent Project!', 'Suncity by Savvy Group is excellent! Great location in South Bopal, amenities are world-class.', NULL, NULL, 1, 26, 1, 'Flagged', '2026-02-28 08:24:47', '2026-02-28 19:02:58'),
(2, 3, 2, 4, 4, 5, 4, 3, 'Future-Ready Office', 'GIFT City office space is future-ready. Good investment. Only concern is high maintenance cost.', NULL, NULL, 1, 18, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(3, 4, 3, 5, 5, 4, 5, 4, 'Stunning Penthouses', 'Kalyan penthouses in Alkapuri are stunning! Best investment in Vadodara.', NULL, NULL, 1, 30, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(4, 6, 1, 4, 4, 5, 4, 4, 'Good Value for Money', 'Good value for money in Ahmedabad. Construction quality is impressive.', NULL, NULL, 1, 12, 0, NULL, '2026-02-28 08:24:47', '2026-03-01 11:50:55'),
(5, 7, 4, 3, 3, 4, 2, 3, 'Good Location, Limited Parking', 'VIP Road shops have good footfall but parking is limited during peak hours.', NULL, NULL, 1, 8, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(6, 8, 5, 5, 4, 5, 5, 4, 'Perfect for Surat', 'Diamond Project in Vesu is perfect for Surat. Close to diamond industry.', NULL, NULL, 1, 22, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(7, 10, 6, 4, 4, 4, 3, 4, 'Well Designed Complex', 'Textile market complex is well designed. Good for traders.', NULL, NULL, 1, 15, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(8, 2, 7, 5, 5, 5, 5, 4, 'Premium Villas', 'Raceview villas in Rajkot are premium quality. Private garden and modern architecture.', NULL, NULL, 0, 12, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(9, 4, 8, 4, 3, 4, 3, 5, 'Great Appreciation Potential', 'Kalavad Road township is developing fast. Good potential for appreciation.', NULL, NULL, 1, 9, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(10, 6, 9, 5, 4, 4, 4, 5, 'Excellent Value', 'GIDC affordable housing in Gandhinagar is excellent value.', NULL, NULL, 1, 35, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(11, 8, 10, 4, 4, 5, 4, 3, 'Premium IT Location', 'Infocity office spaces are premium. PDPU nearby is advantage.', NULL, NULL, 1, 14, 0, 'Approved', '2026-02-28 08:24:47', '2026-02-28 08:24:47'),
(12, 11, 1, 5, 4, 4, 4, 3, 'Great location and amenities', 'Updated â€” even better after site visit!', 'Good location, modern design', 'Slightly expensive', 0, 0, 0, 'Pending', '2026-02-28 18:39:25', '2026-02-28 19:12:34');

-- --------------------------------------------------------

--
-- Table structure for table `property_tags`
--

CREATE TABLE `property_tags` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_tags`
--

INSERT INTO `property_tags` (`id`, `property_id`, `tag_id`, `created_at`) VALUES
(1, 1, 1, '2026-02-28 08:24:48'),
(2, 1, 2, '2026-02-28 08:24:48'),
(3, 1, 4, '2026-02-28 08:24:48'),
(4, 2, 3, '2026-02-28 08:24:48'),
(5, 2, 6, '2026-02-28 08:24:48'),
(6, 2, 7, '2026-02-28 08:24:48'),
(7, 3, 4, '2026-02-28 08:24:48'),
(8, 3, 9, '2026-02-28 08:24:48'),
(9, 5, 1, '2026-02-28 08:24:48'),
(10, 5, 10, '2026-02-28 08:24:48'),
(11, 7, 2, '2026-02-28 08:24:48'),
(12, 7, 9, '2026-02-28 08:24:48'),
(13, 8, 8, '2026-02-28 08:24:48'),
(14, 9, 8, '2026-02-28 08:24:48'),
(15, 9, 10, '2026-02-28 08:24:48'),
(16, 9, 12, '2026-02-28 08:24:48'),
(17, 10, 3, '2026-02-28 08:24:48'),
(18, 10, 6, '2026-02-28 08:24:48'),
(19, 10, 7, '2026-02-28 08:24:48'),
(20, 2, 1, '2026-03-01 09:38:29'),
(21, 2, 2, '2026-03-01 09:38:29');

-- --------------------------------------------------------

--
-- Table structure for table `property_utilities`
--

CREATE TABLE `property_utilities` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `electricity_provider` varchar(255) DEFAULT NULL,
  `electricity_billing` enum('Monthly','Bi-Monthly','Quarterly','Yearly') DEFAULT 'Monthly',
  `electricity_backup` enum('None','Partial','Full') DEFAULT 'Partial',
  `backup_power_type` varchar(100) DEFAULT NULL,
  `gas_provider` varchar(255) DEFAULT NULL,
  `gas_pipeline` tinyint(1) DEFAULT 0,
  `water_supply_provider` varchar(255) DEFAULT NULL,
  `water_source` enum('Municipal','Borewell','Both') DEFAULT 'Municipal',
  `rainwater_harvesting` tinyint(1) DEFAULT 0,
  `sewage_treatment` tinyint(1) DEFAULT 0,
  `waste_management` enum('None','Segregation','Composting','Full Treatment') DEFAULT 'Segregation',
  `internet_provider` varchar(255) DEFAULT NULL,
  `fiber_optic` tinyint(1) DEFAULT 0,
  `maintenance_cost` decimal(10,2) DEFAULT NULL,
  `maintenance_per_sqft` decimal(8,2) DEFAULT NULL,
  `maintenance_billing` enum('Monthly','Quarterly','Yearly') DEFAULT 'Monthly',
  `price_negotiable` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_utilities`
--

INSERT INTO `property_utilities` (`id`, `property_id`, `electricity_provider`, `electricity_billing`, `electricity_backup`, `backup_power_type`, `gas_provider`, `gas_pipeline`, `water_supply_provider`, `water_source`, `rainwater_harvesting`, `sewage_treatment`, `waste_management`, `internet_provider`, `fiber_optic`, `maintenance_cost`, `maintenance_per_sqft`, `maintenance_billing`, `price_negotiable`, `created_at`, `updated_at`) VALUES
(1, 1, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 0, 'Segregation', NULL, 0, 3200.00, NULL, 'Monthly', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 2, 'MSEDCL', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-03-01 09:36:31'),
(3, 3, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'VMC', 'Both', 0, 0, 'Segregation', NULL, 0, 5500.00, NULL, 'Monthly', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 4, 'Torrent Power', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'VMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 4200.00, NULL, 'Monthly', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 5, 'Surat Electricity', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'SMC', 'Both', 1, 0, 'Segregation', NULL, 0, 3800.00, NULL, 'Monthly', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 6, 'Surat Electricity', 'Monthly', 'Partial', NULL, NULL, 0, 'SMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 2800.00, NULL, 'Monthly', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 7, 'Paschim Gujarat Vij', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'RMC', 'Borewell', 1, 0, 'Segregation', NULL, 0, 4500.00, NULL, 'Monthly', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 8, 'Paschim Gujarat Vij', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'RMC', 'Both', 0, 0, 'Segregation', NULL, 0, 2200.00, NULL, 'Monthly', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 9, 'Uttar Gujarat Vij', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 1, 0, 'Segregation', NULL, 0, 1500.00, NULL, 'Monthly', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 10, 'Uttar Gujarat Vij', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 5800.00, NULL, 'Monthly', 1, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(12, 12, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 1, 'Segregation', NULL, 0, 3500.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(13, 13, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 5000.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(14, 14, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 6000.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(15, 15, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 0, 'Segregation', NULL, 0, 3200.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(16, 16, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 0, 'Segregation', NULL, 0, 4500.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(17, 17, 'Torrent Power', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 1, 0, 'Segregation', NULL, 0, 1800.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(18, 18, 'Torrent Power', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 0, 0, 'Segregation', NULL, 0, 2200.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(19, 19, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 0, 1, 'Segregation', NULL, 0, 7000.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(20, 20, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 0, 0, 'Segregation', NULL, 0, 4000.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(21, 21, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 1, 'Segregation', NULL, 0, 3800.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(22, 22, 'Torrent Power', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 1500.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(23, 23, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 0, 'Segregation', NULL, 0, 3200.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(24, 24, 'Torrent Power', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 1200.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(25, 25, 'Torrent Power', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 0, 'AMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 2500.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(26, 26, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 1, 'Segregation', NULL, 0, 5500.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(27, 27, 'UGVCL', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 0, 1, 'Full Treatment', NULL, 0, 8000.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(28, 28, 'Uttar Gujarat Vij', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 5500.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(29, 29, 'Uttar Gujarat Vij', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 1, 0, 'Segregation', NULL, 0, 1500.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(30, 30, 'Uttar Gujarat Vij', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 1, 0, 'Segregation', NULL, 0, 2000.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(31, 31, 'Uttar Gujarat Vij', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 0, 1, 'Segregation', NULL, 0, 6500.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(32, 32, 'Uttar Gujarat Vij', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'GMC', 'Borewell', 1, 0, 'Composting', NULL, 0, 4500.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(33, 33, 'Uttar Gujarat Vij', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 2200.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(34, 34, 'Uttar Gujarat Vij', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 5000.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(35, 35, 'Torrent Power', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 1, 0, 'Segregation', NULL, 0, 2200.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(36, 36, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 0, 1, 'Segregation', NULL, 0, 6000.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(37, 37, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 1, 'Segregation', NULL, 0, 7000.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(38, 38, 'Torrent Power', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 2500.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(39, 39, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Both', 1, 0, 'Segregation', NULL, 0, 5000.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(40, 40, 'Uttar Gujarat Vij', 'Monthly', 'Partial', NULL, 'Gujarat Gas', 1, 'GMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 1600.00, NULL, 'Monthly', 0, '2026-03-02 11:18:37', '2026-03-02 11:18:37'),
(41, 41, 'Torrent Power', 'Monthly', 'Full', NULL, 'Gujarat Gas', 1, 'AMC', 'Municipal', 0, 0, 'Segregation', NULL, 0, 5500.00, NULL, 'Monthly', 1, '2026-03-02 11:18:37', '2026-03-02 11:18:37');

-- --------------------------------------------------------

--
-- Table structure for table `property_view_logs`
--

CREATE TABLE `property_view_logs` (
  `id` bigint(20) NOT NULL,
  `property_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  `device_type` enum('Desktop','Mobile','Tablet') DEFAULT 'Desktop',
  `duration_seconds` int(11) DEFAULT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_view_logs`
--

INSERT INTO `property_view_logs` (`id`, `property_id`, `user_id`, `session_id`, `ip_address`, `user_agent`, `referrer`, `device_type`, `duration_seconds`, `viewed_at`) VALUES
(1, 9, 11, NULL, '::1', 'PostmanRuntime/7.51.1', NULL, 'Desktop', NULL, '2026-02-28 14:29:41'),
(2, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:06:57'),
(3, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:06:57'),
(4, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:07:19'),
(5, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:07:39'),
(6, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:07:47'),
(7, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:07:47'),
(8, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:08:09'),
(9, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:08:09'),
(10, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-01 11:08:56'),
(11, 6, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 06:25:43'),
(12, 6, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 06:25:43'),
(13, 6, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 06:26:08'),
(14, 6, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 06:26:08'),
(15, 1, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:03:43'),
(16, 1, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:03:43'),
(17, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:06:32'),
(18, 2, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:06:32'),
(19, 15, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:22:08'),
(20, 15, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:22:08'),
(21, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:24:41'),
(22, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:24:41'),
(23, 14, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:24:45'),
(24, 14, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:24:45'),
(25, 13, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:24:47'),
(26, 13, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:24:47'),
(27, 16, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:24:52'),
(28, 16, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:24:52'),
(29, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:27:09'),
(30, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:27:09'),
(31, 23, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:27:13'),
(32, 23, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:27:13'),
(33, 22, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:27:19'),
(34, 22, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:27:19'),
(35, 21, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:27:25'),
(36, 21, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 11:27:25'),
(37, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:12:56'),
(38, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:12:57'),
(39, 16, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:15:39'),
(40, 16, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:15:39'),
(41, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:16:42'),
(42, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:16:42'),
(43, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:22:06'),
(44, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:22:06'),
(45, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:25:30'),
(46, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:25:57'),
(47, 14, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:26:28'),
(48, 14, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:26:29'),
(49, 17, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:28:35'),
(50, 17, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:28:35'),
(51, 21, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:29:02'),
(52, 21, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:29:02'),
(53, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:29:33'),
(54, 12, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:29:33'),
(55, 2, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:31:18'),
(56, 2, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:31:18'),
(57, 13, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:33:26'),
(58, 13, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:33:28'),
(59, 14, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:34:05'),
(60, 14, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:34:07'),
(61, 17, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:38:30'),
(62, 17, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:38:30'),
(63, 26, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:40:59'),
(64, 26, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-02 12:40:59'),
(65, 24, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 05:54:42'),
(66, 24, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 05:54:42'),
(67, 6, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 05:56:31'),
(68, 6, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 05:56:31'),
(69, 13, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 09:38:11'),
(70, 13, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 09:38:11'),
(71, 27, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 09:54:27'),
(72, 27, 11, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 09:54:27'),
(73, 15, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 11:29:59'),
(74, 15, NULL, NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', NULL, 'Desktop', NULL, '2026-03-05 11:29:59');

-- --------------------------------------------------------

--
-- Table structure for table `saved_searches`
--

CREATE TABLE `saved_searches` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `search_name` varchar(100) NOT NULL,
  `search_criteria` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`search_criteria`)),
  `alert_enabled` tinyint(1) DEFAULT 0,
  `alert_frequency` enum('Instant','Daily','Weekly') DEFAULT 'Daily',
  `last_alerted_at` datetime DEFAULT NULL,
  `result_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_searches`
--

INSERT INTO `saved_searches` (`id`, `user_id`, `search_name`, `search_criteria`, `alert_enabled`, `alert_frequency`, `last_alerted_at`, `result_count`, `created_at`, `updated_at`) VALUES
(1, 11, 'Mumbai 2BHK Updated', '{\"city\":\"Mumbai\",\"bhk\":\"2BHK\",\"price_max\":10000000}', 1, 'Daily', NULL, 0, '2026-02-28 18:15:35', '2026-02-28 18:17:32');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tag_name` varchar(50) NOT NULL,
  `tag_group` enum('Feature','Lifestyle','Investment','Location','Custom') DEFAULT 'Custom',
  `usage_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tag_name`, `tag_group`, `usage_count`, `created_at`) VALUES
(1, 'Vaastu Compliant', 'Feature', 0, '2026-02-28 08:24:48'),
(2, 'Gated Community', 'Feature', 0, '2026-02-28 08:24:48'),
(3, 'Smart Home', 'Feature', 0, '2026-02-28 08:24:48'),
(4, 'Premium Location', 'Location', 0, '2026-02-28 08:24:48'),
(5, 'Near Metro', 'Location', 0, '2026-02-28 08:24:48'),
(6, 'Near IT Hub', 'Location', 0, '2026-02-28 08:24:48'),
(7, 'High ROI', 'Investment', 0, '2026-02-28 08:24:48'),
(8, 'Under 1 Crore', 'Investment', 0, '2026-02-28 08:24:48'),
(9, 'Luxury Living', 'Lifestyle', 0, '2026-02-28 08:24:48'),
(10, 'Eco-Friendly', 'Feature', 0, '2026-02-28 08:24:48'),
(11, 'Pet Friendly', 'Lifestyle', 0, '2026-02-28 08:24:48'),
(12, 'Senior Friendly', 'Lifestyle', 0, '2026-02-28 08:24:48');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_image` varchar(500) DEFAULT NULL,
  `user_designation` varchar(150) DEFAULT NULL,
  `testimonial_text` text NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `property_id` int(11) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_video` tinyint(1) DEFAULT 0,
  `video_url` varchar(500) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `user_id`, `user_name`, `user_image`, `user_designation`, `testimonial_text`, `rating`, `property_id`, `is_featured`, `is_video`, `video_url`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Neha Shah', '/uploads/testimonials/neha.jpg', 'Software Engineer', 'Crewera Reality helped me find my dream home in Ahmedabad. Highly recommended!', 5, 1, 1, 0, NULL, 'Approved', '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(2, 3, 'Hitesh Desai', '/uploads/testimonials/hitesh.jpg', 'Business Owner', 'Excellent advice and smooth transaction for GIFT City investment.', 5, 2, 1, 0, NULL, 'Approved', '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(3, 4, 'Komal Mehta', NULL, 'Teacher', 'Good experience. Found a nice 2BHK in Vadodara within my budget.', 4, 3, 0, 0, NULL, 'Approved', '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(4, 6, 'Pooja Joshi', '/uploads/testimonials/pooja.jpg', 'Real Estate Agent', 'Great platform. Appreciate their transparency and market knowledge.', 5, NULL, 1, 0, NULL, 'Approved', '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(5, 8, 'Anjali Dave', NULL, 'Trader', 'Helped me find investment property in Surat. Smooth process.', 4, 5, 0, 0, NULL, 'Approved', '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(6, 10, 'Priya Solanki', '/uploads/testimonials/priya.jpg', 'Govt Employee', 'First time buyer and they made it easy! Got PMAY subsidy too!', 5, 9, 1, 0, NULL, 'Approved', '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(7, NULL, 'Mukeshbhai Patel', NULL, 'Retired Professional', 'Senior citizen friendly. Helped sell my Rajkot property at good price.', 5, 7, 0, 0, NULL, 'Pending', '2026-02-28 08:24:48', '2026-02-28 08:24:48'),
(8, NULL, 'Darshana Thakkar', NULL, 'Homemaker', 'Good platform for property search in Gujarat. Many options.', 4, NULL, 0, 0, NULL, 'Approved', '2026-02-28 08:24:48', '2026-02-28 08:24:48');

-- --------------------------------------------------------

--
-- Table structure for table `unit_specifications`
--

CREATE TABLE `unit_specifications` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `bhk_type` varchar(50) NOT NULL,
  `tower` varchar(100) DEFAULT NULL,
  `floor_number` int(11) DEFAULT NULL,
  `unit_number` varchar(20) DEFAULT NULL,
  `front_dimension` decimal(10,2) DEFAULT NULL,
  `back_dimension` decimal(10,2) DEFAULT NULL,
  `right_dimension` decimal(10,2) DEFAULT NULL,
  `left_dimension` decimal(10,2) DEFAULT NULL,
  `ceiling_height` decimal(5,2) DEFAULT NULL,
  `facing` enum('East','West','North','South','North-East','North-West','South-East','South-West') DEFAULT NULL,
  `ventilation_score` tinyint(4) DEFAULT NULL,
  `natural_light_score` tinyint(4) DEFAULT NULL,
  `special_feature` varchar(255) DEFAULT NULL,
  `is_corner_unit` tinyint(1) DEFAULT 0,
  `has_servant_room` tinyint(1) DEFAULT 0,
  `has_study_room` tinyint(1) DEFAULT 0,
  `has_pooja_room` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unit_specifications`
--

INSERT INTO `unit_specifications` (`id`, `property_id`, `bhk_type`, `tower`, `floor_number`, `unit_number`, `front_dimension`, `back_dimension`, `right_dimension`, `left_dimension`, `ceiling_height`, `facing`, `ventilation_score`, `natural_light_score`, `special_feature`, `is_corner_unit`, `has_servant_room`, `has_study_room`, `has_pooja_room`, `created_at`, `updated_at`) VALUES
(1, 1, '2 BHK', 'A', NULL, NULL, 38.50, 38.50, 28.50, 28.50, NULL, 'North-East', NULL, NULL, 'Garden view, Vaastu compliant', 0, 0, 0, 1, '2026-02-28 08:15:55', '2026-03-01 09:45:27'),
(2, 1, '3 BHK', 'B', NULL, NULL, 42.80, 42.80, 32.50, 32.50, NULL, 'North', NULL, NULL, 'Pool facing, corner unit', 1, 0, 0, 1, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(3, 2, 'Commercial', 'Tower 1', NULL, NULL, 55.00, 55.00, 45.00, 45.00, NULL, 'West', NULL, NULL, 'Glass facade, GIFT City view', 0, 0, 0, 0, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(4, 3, '2 BHK', 'A', NULL, NULL, 35.00, 35.00, 30.00, 30.00, NULL, 'South', NULL, NULL, 'Alkapuri skyline view', 0, 0, 0, 0, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(5, 3, '3 BHK', 'Penthouse', NULL, NULL, 50.00, 50.00, 35.00, 35.00, NULL, 'East', NULL, NULL, 'Private terrace with jacuzzi', 0, 1, 0, 1, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(6, 4, 'Shop', 'Plaza', NULL, NULL, 25.00, 25.00, 20.00, 20.00, NULL, 'West', NULL, NULL, 'VIP Road frontage', 0, 0, 0, 0, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(7, 5, '3 BHK', 'Duplex', NULL, NULL, 45.00, 45.00, 38.00, 38.00, NULL, 'North', NULL, NULL, 'Double height living room', 0, 0, 0, 1, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(8, 5, '4 BHK', 'Duplex+', NULL, NULL, 52.00, 52.00, 42.00, 42.00, NULL, 'East', NULL, NULL, 'Private garden on terrace', 0, 1, 0, 1, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(9, 6, 'Shop', 'Market', NULL, NULL, 22.00, 22.00, 18.00, 18.00, NULL, 'South', NULL, NULL, 'Ring Road visibility', 0, 0, 0, 0, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(10, 7, '3 BHK', 'Villa', NULL, NULL, 48.00, 48.00, 42.00, 42.00, NULL, 'East', NULL, NULL, 'Private garden, car porch', 0, 1, 0, 1, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(11, 7, '4 BHK', 'Villa+', NULL, NULL, 55.00, 55.00, 48.00, 48.00, NULL, 'North', NULL, NULL, 'Swimming pool, servant room', 0, 1, 0, 1, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(12, 8, '2 BHK', 'A', NULL, NULL, 35.50, 35.50, 28.00, 28.00, NULL, 'West', NULL, NULL, 'Kalavad Road view', 0, 0, 0, 0, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(13, 9, '1 BHK', 'A', NULL, NULL, 28.00, 28.00, 22.00, 22.00, NULL, 'East', NULL, NULL, 'Park facing, affordable housing', 0, 0, 0, 0, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(14, 9, '2 BHK', 'B', NULL, NULL, 34.00, 34.00, 26.00, 26.00, NULL, 'South', NULL, NULL, 'GIDC view, Vaastu compliant', 0, 0, 0, 1, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(15, 10, 'Office', 'Infocity', NULL, NULL, 42.00, 42.00, 38.00, 38.00, NULL, 'North', NULL, NULL, 'PDPU University view', 0, 0, 0, 0, '2026-02-28 08:15:55', '2026-02-28 08:15:55'),
(16, 2, '2BHK', NULL, 5, 'A-501', NULL, NULL, NULL, NULL, NULL, 'East', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-01 09:44:59', '2026-03-01 09:44:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','agent','builder') DEFAULT 'user',
  `email_verified` tinyint(1) DEFAULT 0,
  `email_verification_token` varchar(255) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `password_reset_expires` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(45) DEFAULT NULL,
  `login_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `phone`, `password`, `role`, `email_verified`, `email_verification_token`, `password_reset_token`, `password_reset_expires`, `is_active`, `last_login_at`, `last_login_ip`, `login_count`, `created_at`, `updated_at`) VALUES
(1, 'rajesh.patel@email.com', '+91 98765 43210', '$2y$10$YourHashedPasswordHere', 'admin', 1, NULL, NULL, NULL, 1, NULL, NULL, 152, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 'neha.shah@email.com', '+91 98240 12345', '$2y$10$YourHashedPasswordHere', 'user', 1, NULL, NULL, NULL, 1, NULL, NULL, 38, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(3, 'hitesh.d@email.com', '+91 99099 88776', '$2y$10$YourHashedPasswordHere', 'user', 1, NULL, NULL, NULL, 1, NULL, NULL, 45, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 'komal.mehta@email.com', '+91 94280 55667', '$2y$10$YourHashedPasswordHere', 'user', 0, NULL, NULL, NULL, 1, NULL, NULL, 12, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 'dinesh.b@email.com', '+91 99251 22334', '$2y$10$YourHashedPasswordHere', 'admin', 1, NULL, NULL, NULL, 1, NULL, NULL, 98, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 'pooja.j@email.com', '+91 98798 76543', '$2y$10$YourHashedPasswordHere', 'agent', 1, NULL, NULL, NULL, 1, NULL, NULL, 210, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 'rakesh.t@email.com', '+91 94276 54321', '$2y$10$YourHashedPasswordHere', 'user', 0, NULL, NULL, NULL, 1, NULL, NULL, 22, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 'anjali.d@email.com', '+91 99044 55667', '$2y$10$YourHashedPasswordHere', 'user', 1, NULL, NULL, NULL, 1, NULL, NULL, 30, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 'mukesh.g@email.com', '+91 98255 77889', '$2y$10$YourHashedPasswordHere', 'admin', 1, NULL, NULL, NULL, 1, NULL, NULL, 175, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 'priya.s@email.com', '+91 98765 11223', '$2y$10$YourHashedPasswordHere', 'user', 0, NULL, NULL, NULL, 1, NULL, NULL, 8, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(11, '2084harsh@gmail.com', '7567586809', '$2a$12$XDC6BviBbDEkZZE3N92/0.tprjD3c85O4Q34Ay6P77N1RGCAHN6DG', 'admin', 1, '9e353ba0fdf5772b970123c3d4862dd0c238b2fb76ab534d535d673ecf6880ec', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjIwODRoYXJzaEBnbWFpbC5jb20iLCJpZCI6MTEsImlhdCI6MTc3MjMxMzgzMiwiZXhwIjoxNzcyMzE3NDMyfQ.sVVGFZbus1780S1HRr1hwwCgojVCSW8Bg1-pnWCrCDg', '2026-03-01 03:53:52', 1, '2026-03-05 10:50:23', '::1', 12, '2026-02-28 11:05:29', '2026-03-05 05:20:23'),
(12, 'jinilprajapati18@gmail.com', '856578', '$2a$12$oFoxwwFqMgNipQIfethAVuaEerT8yYHnfHO43NLo6DmcFB82zr5ZG', 'admin', 0, '7cc5508b8f7bdeabd4afabd04f32c1e97e924263ef75322b4ffe2ed0389dd4b0', NULL, NULL, 1, NULL, NULL, 0, '2026-02-28 15:49:53', '2026-03-05 09:23:06'),
(13, 'prajapatijinil2002@gmail.com', '9999999999', '$2a$12$O1NaNdJ4MeOlP.z7jeXqz.Xgf8EtqvNgAYrBVC4aIQl7WWedlZd.C', 'user', 0, 'e1a836c36ec59cdb3d77b1a2cf4f314eb4341e05b9983138adde6f4d592a886d', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWphcGF0aWppbmlsMjAwMkBnbWFpbC5jb20iLCJpZCI6MTMsImlhdCI6MTc3MjI5NDAxMCwiZXhwIjoxNzcyMjk3NjEwfQ.1SRJ39KxxZEQpsbq1jc0hCSd-3HKkvbGdJCde1rwlI8', '2026-02-28 22:23:30', 1, NULL, NULL, 0, '2026-02-28 15:53:18', '2026-02-28 15:53:30'),
(14, 'crewultimasocialmedia@gmail.com', '9723587252', '$2a$12$etRdLLUR3R1UTZkqA.gXoe85uVFCaueVZMbZnoucvP2LZDGdAGwkC', 'admin', 0, '323e7b2bbcd62ab6240df14949655993702cc419239557bf1f92b2492ccb0d14', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyZXd1bHRpbWFzb2NpYWxtZWRpYUBnbWFpbC5jb20iLCJpZCI6MTQsImlhdCI6MTc3MjMxMzk5MSwiZXhwIjoxNzcyMzE3NTkxfQ.69OuyVHRhVwGHmrcAClGQm-OJFBZ-TCtqgY317FrhXw', '2026-03-01 03:56:31', 1, NULL, NULL, 0, '2026-02-28 21:21:28', '2026-03-01 11:49:40'),
(15, 'sachinvegad1433@gmail.com', '9723588252', '$2a$12$s6aK41Vnphz1aYeRHIPG2.Aeu7yIDR0y7a46IrlYWKw.2YAtO1IIu', 'user', 0, '2ffcbc29e5b960776879ab8db1a4de221f0e6e8586aeaeca06c003f70bbe5e0d', NULL, NULL, 1, NULL, NULL, 0, '2026-03-02 06:27:58', '2026-03-02 06:27:58'),
(16, 'rathodnisarg01@gmail.com', '973541252', '$2a$12$N5LKSKyMQosbPays1HlLuuS704wuTHxj..z.G8C6k7qYJZNhCyo9a', 'user', 0, '4bbf40c21a3197c90344a6ccfaee6831e71be61e62b41c06fed35bbe12e69b7a', NULL, NULL, 1, NULL, NULL, 0, '2026-03-02 06:29:19', '2026-03-02 06:29:19');

-- --------------------------------------------------------

--
-- Table structure for table `user_preferences`
--

CREATE TABLE `user_preferences` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `property_updates` tinyint(1) DEFAULT 1,
  `inquiry_responses` tinyint(1) DEFAULT 1,
  `marketing_emails` tinyint(1) DEFAULT 0,
  `newsletter` tinyint(1) DEFAULT 1,
  `sms_notifications` tinyint(1) DEFAULT 0,
  `push_notifications` tinyint(1) DEFAULT 1,
  `show_profile_publicly` tinyint(1) DEFAULT 0,
  `show_favorites` tinyint(1) DEFAULT 0,
  `allow_developer_contact` tinyint(1) DEFAULT 1,
  `show_activity_status` tinyint(1) DEFAULT 1,
  `preferred_currency` enum('INR','USD','AED') DEFAULT 'INR',
  `preferred_language` enum('English','Hindi','Gujarati') DEFAULT 'English',
  `dark_mode` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_preferences`
--

INSERT INTO `user_preferences` (`id`, `user_id`, `property_updates`, `inquiry_responses`, `marketing_emails`, `newsletter`, `sms_notifications`, `push_notifications`, `show_profile_publicly`, `show_favorites`, `allow_developer_contact`, `show_activity_status`, `preferred_currency`, `preferred_language`, `dark_mode`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 2, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(3, 3, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 4, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 5, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 7, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 8, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 9, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 10, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 'INR', 'English', 0, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(11, 11, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 11:05:29', '2026-02-28 11:05:29'),
(12, 12, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 15:49:53', '2026-02-28 15:49:53'),
(13, 13, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 15:53:18', '2026-02-28 15:53:18'),
(14, 14, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-02-28 21:21:28', '2026-02-28 21:21:28'),
(15, 15, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-03-02 06:27:58', '2026-03-02 06:27:58'),
(16, 16, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 'INR', 'English', 0, '2026-03-02 06:29:19', '2026-03-02 06:29:19');

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `profile_picture` varchar(500) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other','Prefer Not to Say') DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `occupation` varchar(150) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `alternate_phone` varchar(20) DEFAULT NULL,
  `languages_spoken` varchar(255) DEFAULT NULL,
  `social_linkedin` varchar(255) DEFAULT NULL,
  `social_twitter` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `user_id`, `first_name`, `last_name`, `profile_picture`, `date_of_birth`, `gender`, `bio`, `occupation`, `company_name`, `city`, `state`, `address`, `pincode`, `alternate_phone`, `languages_spoken`, `social_linkedin`, `social_twitter`, `created_at`, `updated_at`) VALUES
(1, 1, 'Rajesh', 'Patel', NULL, '1980-05-15', 'Male', 'Senior Real Estate Developer with 20 years experience in Gujarat market', 'Real Estate Developer', NULL, 'Ahmedabad', 'Gujarat', '42, Judges Bungalow Road, Bodakdev', '380015', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(2, 2, 'Neha', 'Shah', NULL, '1988-08-22', 'Female', 'Home buyer looking for premium properties', 'Software Engineer', NULL, 'Vadodara', 'Gujarat', '15, Alkapuri Society, Opp. Inox', '390007', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(3, 3, 'Hitesh', 'Desai', NULL, '1985-11-30', 'Male', 'Real estate investor, owns multiple commercial properties', 'Business Owner', NULL, 'Surat', 'Gujarat', '7, Vesu Main Road, Near Dumas Road', '395007', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(4, 4, 'Komal', 'Mehta', NULL, '1992-03-18', 'Female', 'First-time property buyer, looking for 2BHK', 'Teacher', NULL, 'Rajkot', 'Gujarat', '23, Race Course Road, Opp. Kotecha Chowk', '360001', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(5, 5, 'Dinesh', 'Bhatt', NULL, '1978-09-25', 'Male', 'Government approved property valuer', 'Property Valuer', NULL, 'Gandhinagar', 'Gujarat', '5, Sector 11, GHB Complex', '382011', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(6, 6, 'Pooja', 'Joshi', NULL, '1995-12-10', 'Female', 'Real estate agent specializing in luxury properties', 'Real Estate Agent', NULL, 'Ahmedabad', 'Gujarat', '101, Shivalik High Street, Satellite', '380015', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(7, 7, 'Rakesh', 'Trivedi', NULL, '1982-04-03', 'Male', 'Property investor looking for rental income', 'Chartered Accountant', NULL, 'Vadodara', 'Gujarat', '8, Race Course Circle, Near PVR', '390007', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(8, 8, 'Anjali', 'Dave', NULL, '1987-08-14', 'Female', 'Looking for investment property in textile zone', 'Trader', NULL, 'Surat', 'Gujarat', '12, Adajan Gam, Opp. Swaminarayan Temple', '395009', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(9, 9, 'Mukesh', 'Gandhi', NULL, '1975-01-27', 'Male', 'Property consultant with 25 years experience', 'Property Consultant', NULL, 'Rajkot', 'Gujarat', '34, Kalavad Road, Near Jaydeep Hotel', '360005', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(10, 10, 'Priya', 'Solanki', NULL, '1993-06-08', 'Female', 'Government employee looking for home loan property', 'Govt Employee', NULL, 'Gandhinagar', 'Gujarat', '18, Sector 28, Near Akshardham Temple', '382028', NULL, NULL, NULL, NULL, '2026-02-28 08:15:54', '2026-02-28 08:15:54'),
(11, 11, 'Harsh', 'Patel', '/uploads/avatars/avatar-11-1772438350821.png', NULL, NULL, 'Real estate enthusiast', 'Software Engineer', 'Crewera', 'Ahmedabad', '', NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 11:05:29', '2026-03-02 07:59:10'),
(12, 12, 'Jinil', 'Prajapati', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 15:49:53', '2026-02-28 15:49:53'),
(13, 13, 'Jinil', 'Prajapati', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 15:53:18', '2026-02-28 15:53:18'),
(14, 14, 'Kaushik', 'Khandhar', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-02-28 21:21:28', '2026-02-28 21:21:28'),
(15, 15, 'Sachin', 'Vegad', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 06:27:58', '2026-03-02 06:27:58'),
(16, 16, 'Nisarg', 'Rathod', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-02 06:29:19', '2026-03-02 06:29:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amenity_master`
--
ALTER TABLE `amenity_master`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `amenity_name` (`amenity_name`);

--
-- Indexes for table `audit_activity`
--
ALTER TABLE `audit_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_activity_user` (`user_id`),
  ADD KEY `idx_activity_type` (`activity_type`),
  ADD KEY `idx_activity_date` (`created_at`),
  ADD KEY `idx_activity_severity` (`severity`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_audit_user` (`user_id`),
  ADD KEY `idx_audit_action` (`action_type`),
  ADD KEY `idx_audit_entity` (`entity_type`,`entity_id`),
  ADD KEY `idx_audit_date` (`created_at`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_comment_post` (`blog_post_id`),
  ADD KEY `idx_comment_user` (`user_id`),
  ADD KEY `idx_comment_parent` (`parent_comment_id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_blog_author` (`author_id`),
  ADD KEY `idx_blog_slug` (`slug`),
  ADD KEY `idx_blog_cat` (`category_id`),
  ADD KEY `idx_blog_status` (`status`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_contact_read` (`is_read`),
  ADD KEY `idx_contact_dept` (`department`),
  ADD KEY `responded_by` (`responded_by`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_faq_category` (`category`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_favorite` (`user_id`,`property_id`),
  ADD KEY `idx_fav_user` (`user_id`),
  ADD KEY `idx_fav_prop` (`property_id`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_inq_user` (`user_id`),
  ADD KEY `idx_inq_prop` (`property_id`),
  ADD KEY `idx_inq_status` (`status`),
  ADD KEY `responded_by` (`responded_by`);

--
-- Indexes for table `login_history`
--
ALTER TABLE `login_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_login_user` (`user_id`),
  ADD KEY `idx_login_date` (`login_at`),
  ADD KEY `idx_login_status` (`status`);

--
-- Indexes for table `media_categories`
--
ALTER TABLE `media_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_notif_user` (`user_id`),
  ADD KEY `idx_notif_read` (`is_read`),
  ADD KEY `idx_notif_type` (`notification_type`);

--
-- Indexes for table `notification_templates`
--
ALTER TABLE `notification_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `template_name` (`template_name`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_prop_type` (`property_type`),
  ADD KEY `idx_prop_status` (`status`),
  ADD KEY `idx_prop_slug` (`slug`),
  ADD KEY `idx_prop_created_by` (`created_by`);

--
-- Indexes for table `property_amenities`
--
ALTER TABLE `property_amenities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_prop_amenity` (`property_id`,`amenity_id`),
  ADD KEY `idx_amenities_prop` (`property_id`),
  ADD KEY `idx_amenities_amenity` (`amenity_id`);

--
-- Indexes for table `property_analytics`
--
ALTER TABLE `property_analytics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_id` (`property_id`),
  ADD KEY `idx_analytics_prop` (`property_id`),
  ADD KEY `idx_analytics_trending` (`trending_score`);

--
-- Indexes for table `property_building_specs`
--
ALTER TABLE `property_building_specs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_id` (`property_id`),
  ADD KEY `idx_specs_prop` (`property_id`);

--
-- Indexes for table `property_comparisons`
--
ALTER TABLE `property_comparisons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_comp_user` (`user_id`);

--
-- Indexes for table `property_construction`
--
ALTER TABLE `property_construction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_id` (`property_id`),
  ADD KEY `idx_construction_prop` (`property_id`),
  ADD KEY `idx_construction_stage` (`construction_stage`);

--
-- Indexes for table `property_contacts`
--
ALTER TABLE `property_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_contacts_prop` (`property_id`),
  ADD KEY `idx_contacts_type` (`contact_type`);

--
-- Indexes for table `property_details`
--
ALTER TABLE `property_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_id` (`property_id`),
  ADD KEY `idx_details_prop` (`property_id`);

--
-- Indexes for table `property_leads`
--
ALTER TABLE `property_leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_leads_user` (`user_id`),
  ADD KEY `idx_leads_prop` (`property_id`),
  ADD KEY `idx_leads_status` (`lead_status`),
  ADD KEY `idx_leads_assigned` (`assigned_to`),
  ADD KEY `idx_leads_followup` (`next_follow_up`);

--
-- Indexes for table `property_legal`
--
ALTER TABLE `property_legal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_id` (`property_id`),
  ADD KEY `idx_legal_prop` (`property_id`),
  ADD KEY `idx_legal_rera` (`rera_status`);

--
-- Indexes for table `property_locations`
--
ALTER TABLE `property_locations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_id` (`property_id`),
  ADD KEY `idx_loc_prop` (`property_id`),
  ADD KEY `idx_loc_city` (`city`),
  ADD KEY `idx_loc_state` (`state`),
  ADD KEY `idx_loc_coords` (`latitude`,`longitude`);

--
-- Indexes for table `property_media`
--
ALTER TABLE `property_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_media_prop` (`property_id`),
  ADD KEY `idx_media_cat` (`category_id`),
  ADD KEY `idx_media_order` (`display_order`);

--
-- Indexes for table `property_milestones`
--
ALTER TABLE `property_milestones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_milestone_prop` (`property_id`),
  ADD KEY `idx_milestone_status` (`status`);

--
-- Indexes for table `property_price_history`
--
ALTER TABLE `property_price_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_price_hist_prop` (`property_id`),
  ADD KEY `idx_price_hist_date` (`effective_date`),
  ADD KEY `changed_by` (`changed_by`);

--
-- Indexes for table `property_pricing`
--
ALTER TABLE `property_pricing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_pricing_prop` (`property_id`),
  ADD KEY `idx_pricing_bhk` (`bhk_type`);

--
-- Indexes for table `property_requests`
--
ALTER TABLE `property_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_req_user` (`user_id`),
  ADD KEY `idx_req_status` (`status`),
  ADD KEY `idx_req_roi` (`roi`),
  ADD KEY `reviewed_by` (`reviewed_by`),
  ADD KEY `listed_property_id` (`listed_property_id`);

--
-- Indexes for table `property_reviews`
--
ALTER TABLE `property_reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_user_prop_review` (`user_id`,`property_id`),
  ADD KEY `idx_reviews_user` (`user_id`),
  ADD KEY `idx_reviews_prop` (`property_id`),
  ADD KEY `idx_reviews_rating` (`rating`);

--
-- Indexes for table `property_tags`
--
ALTER TABLE `property_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_prop_tag` (`property_id`,`tag_id`),
  ADD KEY `idx_ptag_prop` (`property_id`),
  ADD KEY `idx_ptag_tag` (`tag_id`);

--
-- Indexes for table `property_utilities`
--
ALTER TABLE `property_utilities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_id` (`property_id`),
  ADD KEY `idx_util_prop` (`property_id`);

--
-- Indexes for table `property_view_logs`
--
ALTER TABLE `property_view_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_views_prop` (`property_id`),
  ADD KEY `idx_views_user` (`user_id`),
  ADD KEY `idx_views_date` (`viewed_at`);

--
-- Indexes for table `saved_searches`
--
ALTER TABLE `saved_searches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_search_user` (`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tag_name` (`tag_name`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_testimonial_user` (`user_id`),
  ADD KEY `idx_testimonial_status` (`status`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `unit_specifications`
--
ALTER TABLE `unit_specifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_unitspec_prop` (`property_id`),
  ADD KEY `idx_unitspec_bhk` (`bhk_type`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_role` (`role`),
  ADD KEY `idx_users_active` (`is_active`);

--
-- Indexes for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `idx_prefs_user` (`user_id`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `idx_profiles_user` (`user_id`),
  ADD KEY `idx_profiles_city` (`city`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amenity_master`
--
ALTER TABLE `amenity_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `audit_activity`
--
ALTER TABLE `audit_activity`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_comments`
--
ALTER TABLE `blog_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `login_history`
--
ALTER TABLE `login_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `media_categories`
--
ALTER TABLE `media_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notification_templates`
--
ALTER TABLE `notification_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `property_amenities`
--
ALTER TABLE `property_amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `property_analytics`
--
ALTER TABLE `property_analytics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `property_building_specs`
--
ALTER TABLE `property_building_specs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `property_comparisons`
--
ALTER TABLE `property_comparisons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `property_construction`
--
ALTER TABLE `property_construction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `property_contacts`
--
ALTER TABLE `property_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `property_details`
--
ALTER TABLE `property_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `property_leads`
--
ALTER TABLE `property_leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `property_legal`
--
ALTER TABLE `property_legal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `property_locations`
--
ALTER TABLE `property_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `property_media`
--
ALTER TABLE `property_media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `property_milestones`
--
ALTER TABLE `property_milestones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `property_price_history`
--
ALTER TABLE `property_price_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `property_pricing`
--
ALTER TABLE `property_pricing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `property_requests`
--
ALTER TABLE `property_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `property_reviews`
--
ALTER TABLE `property_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `property_tags`
--
ALTER TABLE `property_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `property_utilities`
--
ALTER TABLE `property_utilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `property_view_logs`
--
ALTER TABLE `property_view_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `saved_searches`
--
ALTER TABLE `saved_searches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `unit_specifications`
--
ALTER TABLE `unit_specifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_preferences`
--
ALTER TABLE `user_preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit_activity`
--
ALTER TABLE `audit_activity`
  ADD CONSTRAINT `audit_activity_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD CONSTRAINT `blog_comments_ibfk_1` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `blog_comments_ibfk_3` FOREIGN KEY (`parent_comment_id`) REFERENCES `blog_comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `blog_posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_posts_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD CONSTRAINT `contact_messages_ibfk_1` FOREIGN KEY (`responded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD CONSTRAINT `inquiries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `inquiries_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inquiries_ibfk_3` FOREIGN KEY (`responded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `login_history`
--
ALTER TABLE `login_history`
  ADD CONSTRAINT `login_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `property_amenities`
--
ALTER TABLE `property_amenities`
  ADD CONSTRAINT `property_amenities_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_amenities_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenity_master` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_analytics`
--
ALTER TABLE `property_analytics`
  ADD CONSTRAINT `property_analytics_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_building_specs`
--
ALTER TABLE `property_building_specs`
  ADD CONSTRAINT `property_building_specs_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_comparisons`
--
ALTER TABLE `property_comparisons`
  ADD CONSTRAINT `property_comparisons_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_construction`
--
ALTER TABLE `property_construction`
  ADD CONSTRAINT `property_construction_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_contacts`
--
ALTER TABLE `property_contacts`
  ADD CONSTRAINT `property_contacts_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_details`
--
ALTER TABLE `property_details`
  ADD CONSTRAINT `property_details_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_leads`
--
ALTER TABLE `property_leads`
  ADD CONSTRAINT `property_leads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `property_leads_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_leads_ibfk_3` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `property_legal`
--
ALTER TABLE `property_legal`
  ADD CONSTRAINT `property_legal_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_locations`
--
ALTER TABLE `property_locations`
  ADD CONSTRAINT `property_locations_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_media`
--
ALTER TABLE `property_media`
  ADD CONSTRAINT `property_media_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_media_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `media_categories` (`id`);

--
-- Constraints for table `property_milestones`
--
ALTER TABLE `property_milestones`
  ADD CONSTRAINT `property_milestones_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_price_history`
--
ALTER TABLE `property_price_history`
  ADD CONSTRAINT `property_price_history_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_price_history_ibfk_2` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `property_pricing`
--
ALTER TABLE `property_pricing`
  ADD CONSTRAINT `property_pricing_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_requests`
--
ALTER TABLE `property_requests`
  ADD CONSTRAINT `property_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_requests_ibfk_2` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `property_requests_ibfk_3` FOREIGN KEY (`listed_property_id`) REFERENCES `properties` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `property_reviews`
--
ALTER TABLE `property_reviews`
  ADD CONSTRAINT `property_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_reviews_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_tags`
--
ALTER TABLE `property_tags`
  ADD CONSTRAINT `property_tags_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_utilities`
--
ALTER TABLE `property_utilities`
  ADD CONSTRAINT `property_utilities_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_view_logs`
--
ALTER TABLE `property_view_logs`
  ADD CONSTRAINT `property_view_logs_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_view_logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `saved_searches`
--
ALTER TABLE `saved_searches`
  ADD CONSTRAINT `saved_searches_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `testimonials_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `unit_specifications`
--
ALTER TABLE `unit_specifications`
  ADD CONSTRAINT `unit_specifications_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
